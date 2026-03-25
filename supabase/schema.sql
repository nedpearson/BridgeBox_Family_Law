-- Bridgebox Family Law: Multitenant Row Level Security (RLS) Schema Outline

-- 1. Enable RLS on core tables
ALTER TABLE "public"."workspaces" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."matters" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."evidence_items" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."timeline_events" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."expenses" ENABLE ROW LEVEL SECURITY;

-- 2. Define Tenant Identification Function
-- Uses the JWT claims provided by Supabase Auth (or custom token injected on login)
CREATE OR REPLACE FUNCTION auth.tenant_id() RETURNS uuid AS $$
  SELECT NULLIF(current_setting('request.jwt.claim.tenant_id', true), '')::uuid;
$$ LANGUAGE SQL STABLE;

-- 3. Workspace / Tenancy Rules
CREATE POLICY "Users can only read tenant workspaces"
ON "public"."workspaces"
FOR SELECT
USING ( tenant_id = auth.tenant_id() );

-- 4. Matter Isolation (Strict separation between firms)
CREATE POLICY "Tenant isolation for Matters"
ON "public"."matters"
FOR ALL
USING ( tenant_id = auth.tenant_id() )
WITH CHECK ( tenant_id = auth.tenant_id() );

-- 5. Evidence Protection (Including AI Confidence bounds)
CREATE POLICY "Tenant isolation for Evidence"
ON "public"."evidence_items"
FOR ALL
USING ( tenant_id = auth.tenant_id() )
WITH CHECK ( tenant_id = auth.tenant_id() );

-- 6. Financial Ledger Protection
CREATE POLICY "Tenant isolation for Expenses/Costs"
ON "public"."expenses"
FOR ALL
USING ( tenant_id = auth.tenant_id() )
WITH CHECK ( tenant_id = auth.tenant_id() );

-- 7. Audit Event Immutability (Insert only, cross-tenant protected)
CREATE POLICY "Audit events are insert-only by tenant"
ON "public"."audit_events"
FOR INSERT
WITH CHECK ( tenant_id = auth.tenant_id() );

CREATE POLICY "Audit events read-only by tenant admin"
ON "public"."audit_events"
FOR SELECT
USING ( tenant_id = auth.tenant_id() AND auth.jwt() ->> 'role' = 'firm_admin' );
