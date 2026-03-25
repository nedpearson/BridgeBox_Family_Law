import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from 'npm:@supabase/supabase-js@2'

Deno.serve(async (req) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 })

  try {
    const { matterId } = await req.json()
    if (!matterId) return new Response('Matter ID required', { status: 400 })

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    // 1. Fetch unbilled recoverable expenses for this matter (RLS enforced by Auth header)
    const { data: expenses, error } = await supabase
      .from('expenses')
      .select('*')
      .eq('matter_id', matterId)
      .eq('is_recoverable', true)
      .eq('invoice_status', 'unbilled')

    if (error) throw error
    if (!expenses?.length) return new Response(JSON.stringify({ message: "No unbilled expenses found" }), { status: 200 })

    // 2. Here we would theoretically call the Clio API
    // const clioToken = Deno.env.get('CLIO_API_TOKEN')
    // await fetch('https://app.clio.com/api/v4/activities', { ... })

    // 3. Mark as billed in Bridgebox
    const expenseIds = expenses.map(e => e.id)
    const { error: updateError } = await supabase
      .from('expenses')
      .update({ invoice_status: 'billed' })
      .in('id', expenseIds)

    if (updateError) throw updateError

    return new Response(JSON.stringify({ success: true, count: expenses.length }), { headers: { "Content-Type": "application/json" } })
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
})
