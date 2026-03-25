-- Mock Database Seed for Local Development and Drill-Down UI

-- Use standard Nil UUID for default tenant
DO $$ 
DECLARE 
    tenant uuid := '00000000-0000-0000-0000-000000000000';
    workspace uuid := '11111111-1111-1111-1111-111111111111';
    matter_1 uuid := '22222222-2222-2222-2222-222222222222';
    matter_2 uuid := '33333333-3333-3333-3333-333333333333';
BEGIN
    INSERT INTO "public"."workspaces" (id, tenant_id, name, domain) 
    VALUES (workspace, tenant, 'Pearson Legal Group', 'pearsonlegal')
    ON CONFLICT (id) DO NOTHING;

    INSERT INTO "public"."matters" (id, tenant_id, workspace_id, name, status, posture) 
    VALUES 
    (matter_1, tenant, workspace, 'Smith v. Smith', 'active', 'Trial Prep'),
    (matter_2, tenant, workspace, 'Johnson Custody mod', 'active', 'Discovery')
    ON CONFLICT (id) DO NOTHING;

    INSERT INTO "public"."parties" (tenant_id, workspace_id, matter_id, role, first_name, last_name, email)
    VALUES 
    (tenant, workspace, matter_1, 'client', 'John', 'Smith', 'john.smith@example.com'),
    (tenant, workspace, matter_1, 'opposing', 'Jane', 'Smith', 'jane.smith@example.com')
    ON CONFLICT DO NOTHING;

    -- Financial Ledger
    INSERT INTO "public"."expenses" (tenant_id, workspace_id, matter_id, date, amount, payee, category, is_recoverable, is_advanced_by_firm, invoice_status)
    VALUES 
    (tenant, workspace, matter_1, '2026-10-05', 150.00, 'Acme Process Servers', 'Service Fee', true, true, 'unbilled'),
    (tenant, workspace, matter_1, '2026-10-02', 325.00, 'District Court', 'Filing Fee', true, true, 'unbilled'),
    (tenant, workspace, matter_1, '2026-09-28', 2500.00, 'Dr. Sarah Jenkins', 'Mental Health Eval', false, false, 'billed');

    -- Timeline Engine
    INSERT INTO "public"."timeline_events" (tenant_id, workspace_id, matter_id, source_system, event_date, title, description, issue_tags)
    VALUES 
    (tenant, workspace, matter_1, 'soberlink', '2026-10-02 20:00:00Z', 'SoberLink Missed Test', 'Testing window 8:00 PM - 9:00 PM entirely missed.', ARRAY['substance_abuse', 'schedule_violation']),
    (tenant, workspace, matter_1, 'ofw', '2026-09-28 14:30:00Z', 'OFW Message Exchange', 'Hostile exchange regarding medical pickup time.', ARRAY['co_parenting', 'medical']);

    -- Workflow Engine
    INSERT INTO "public"."evaluations" (tenant_id, workspace_id, matter_id, type, status, evaluator_name, cost)
    VALUES
    (tenant, workspace, matter_1, 'mental_health', 'scheduled', 'Dr. Sarah Jenkins', 2500.00);

    -- Alerts Engine
    INSERT INTO "public"."alerts" (tenant_id, workspace_id, matter_id, severity, title, description, status)
    VALUES
    (tenant, workspace, matter_1, 'critical', 'SoberLink Compliance Failure', 'Test scheduled for Oct 2 missed.', 'active'),
    (tenant, workspace, matter_2, 'high', 'Missing Evidence', 'Opposing counsel failed to produce Bank Statements.', 'active');
END $$;
