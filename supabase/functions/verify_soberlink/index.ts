import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from 'npm:@supabase/supabase-js@2'

Deno.serve(async (req) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 })

  try {
    // payload contains soberlink test info (status = passed / missed / positive)
    const { test_event, tenantId, matterId } = await req.json()

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    let tags = ['substance_abuse']
    let title = 'SoberLink Test - Passed'
    let description = 'Routine BAC test cleared.'
    
    if (test_event.status === 'positive') {
      tags.push('positive_bac_violation')
      title = 'SoberLink - POSITIVE BAC'
      description = `Violation detected: Level ${test_event.bac_level}`
    } else if (test_event.status === 'missed') {
      tags.push('schedule_violation')
      title = 'SoberLink - MISSED TEST'
      description = `Failed to test during window: ${test_event.scheduled_window}`
    }

    // 1. Insert into Unified Chronology Timeline
    const { error: timelineErr } = await supabase
      .from('timeline_events')
      .insert({
        tenant_id: tenantId,
        matter_id: matterId,
        source_system: 'soberlink',
        source_record_id: test_event.id,
        event_date: test_event.timestamp,
        title,
        description,
        issue_tags: tags
      })
    
    if (timelineErr) throw timelineErr

    // 2. Trigger high severity alert to dashboard if failed/missed
    if (test_event.status !== 'passed') {
      await supabase
        .from('alerts')
        .insert({
          tenant_id: tenantId,
          matter_id: matterId,
          severity: test_event.status === 'positive' ? 'critical' : 'high',
          title: `Compliance Failure: ${title}`,
          description,
          status: 'active'
        })
    }

    return new Response(JSON.stringify({ success: true, processed: true }), { headers: { "Content-Type": "application/json" } })
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
})
