import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from 'npm:@supabase/supabase-js@2'

Deno.serve(async (req) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 })

  try {
    const { payload, tenantId, matterId } = await req.json()
    // payload represents an OFW message export JSON or Webhook data

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '' // Bypass RLS for backend ingestion
    )

    // Simulate basic NLP hostile language detection
    const hostileKeywords = ['never', 'refuse', 'lawyer', 'court', 'ridiculous']
    const isHostile = hostileKeywords.some(kw => payload.body.toLowerCase().includes(kw))
    
    let tags = ['communication']
    if (isHostile) tags.push('hostile_exchange', 'co_parenting_conflict')
    if (payload.body.toLowerCase().includes('doctor') || payload.body.toLowerCase().includes('sick')) tags.push('medical')

    const { data, error } = await supabase
      .from('timeline_events')
      .insert({
        tenant_id: tenantId,
        matter_id: matterId,
        source_system: 'ofw',
        source_record_id: payload.id,
        event_date: payload.sent_at,
        title: `OFW Message from ${payload.sender}`,
        description: payload.body,
        issue_tags: tags,
        confidence_score: 0.95
      })

    if (error) throw error

    return new Response(JSON.stringify({ success: true, tags_applied: tags }), { headers: { "Content-Type": "application/json" } })
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
})
