-- Base schema creation for Bridgebox Family Law

-- Create ENUMs for domains
CREATE TYPE source_system AS ENUM ('clio', 'ofw', 'soberlink', 'bridgebox', 'user_upload');
CREATE TYPE matter_status AS ENUM ('active', 'pending', 'closed');
CREATE TYPE party_role AS ENUM ('client', 'opposing', 'child', 'professional', 'other');
CREATE TYPE evidence_type AS ENUM ('document', 'image', 'communication', 'financial', 'other');
CREATE TYPE expense_status AS ENUM ('unbilled', 'billed', 'paid');
CREATE TYPE evaluation_type AS ENUM ('mental_health', 'substance_abuse');
CREATE TYPE alert_severity AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE alert_status AS ENUM ('active', 'snoozed', 'resolved');

-- Base Table definitions
CREATE TABLE "public"."workspaces" (
    "id" uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    "created_at" timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    "updated_at" timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    "tenant_id" uuid NOT NULL,
    "name" text NOT NULL,
    "domain" text
);

CREATE TABLE "public"."matters" (
    "id" uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    "created_at" timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    "updated_at" timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    "tenant_id" uuid NOT NULL,
    "workspace_id" uuid REFERENCES "public"."workspaces"(id) ON DELETE CASCADE,
    "name" text NOT NULL,
    "status" matter_status DEFAULT 'active',
    "posture" text
);

CREATE TABLE "public"."parties" (
    "id" uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    "created_at" timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    "updated_at" timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    "tenant_id" uuid NOT NULL,
    "workspace_id" uuid REFERENCES "public"."workspaces"(id) ON DELETE CASCADE,
    "matter_id" uuid REFERENCES "public"."matters"(id) ON DELETE CASCADE,
    "role" party_role NOT NULL,
    "first_name" text NOT NULL,
    "last_name" text NOT NULL,
    "email" text,
    "phone" text
);

CREATE TABLE "public"."evidence_items" (
    "id" uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    "created_at" timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    "updated_at" timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    "tenant_id" uuid NOT NULL,
    "workspace_id" uuid REFERENCES "public"."workspaces"(id) ON DELETE CASCADE,
    "matter_id" uuid REFERENCES "public"."matters"(id) ON DELETE CASCADE,
    "source_system" source_system DEFAULT 'user_upload',
    "source_record_id" text,
    "title" text NOT NULL,
    "type" evidence_type NOT NULL,
    "content" text,
    "file_url" text,
    "metadata" jsonb DEFAULT '{}'::jsonb,
    "issue_tags" text[] DEFAULT '{}'::text[]
);

CREATE TABLE "public"."timeline_events" (
    "id" uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    "created_at" timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    "updated_at" timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    "tenant_id" uuid NOT NULL,
    "workspace_id" uuid REFERENCES "public"."workspaces"(id) ON DELETE CASCADE,
    "matter_id" uuid REFERENCES "public"."matters"(id) ON DELETE CASCADE,
    "source_system" source_system DEFAULT 'bridgebox',
    "source_record_id" text,
    "event_date" timestamp with time zone NOT NULL,
    "title" text NOT NULL,
    "description" text,
    "evidence_id" uuid REFERENCES "public"."evidence_items"(id) ON DELETE SET NULL,
    "issue_tags" text[] DEFAULT '{}'::text[],
    "confidence_score" float DEFAULT 1.0
);

CREATE TABLE "public"."expenses" (
    "id" uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    "created_at" timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    "updated_at" timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    "tenant_id" uuid NOT NULL,
    "workspace_id" uuid REFERENCES "public"."workspaces"(id) ON DELETE CASCADE,
    "matter_id" uuid REFERENCES "public"."matters"(id) ON DELETE CASCADE,
    "date" date NOT NULL,
    "amount" decimal(10,2) NOT NULL,
    "payee" text NOT NULL,
    "category" text NOT NULL,
    "is_recoverable" boolean DEFAULT false,
    "is_advanced_by_firm" boolean DEFAULT false,
    "invoice_status" expense_status DEFAULT 'unbilled',
    "notes" text
);

CREATE TABLE "public"."evaluations" (
    "id" uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    "created_at" timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    "updated_at" timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    "tenant_id" uuid NOT NULL,
    "workspace_id" uuid REFERENCES "public"."workspaces"(id) ON DELETE CASCADE,
    "matter_id" uuid REFERENCES "public"."matters"(id) ON DELETE CASCADE,
    "type" evaluation_type NOT NULL,
    "status" text NOT NULL,
    "evaluator_name" text,
    "due_date" date,
    "cost" decimal(10,2)
);

CREATE TABLE "public"."alerts" (
    "id" uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    "created_at" timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    "updated_at" timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    "tenant_id" uuid NOT NULL,
    "workspace_id" uuid REFERENCES "public"."workspaces"(id) ON DELETE CASCADE,
    "matter_id" uuid REFERENCES "public"."matters"(id) ON DELETE CASCADE,
    "severity" alert_severity NOT NULL,
    "title" text NOT NULL,
    "description" text NOT NULL,
    "status" alert_status DEFAULT 'active'
);

-- RLS Enforcement
ALTER TABLE "public"."workspaces" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."matters" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."parties" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."evidence_items" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."timeline_events" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."expenses" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."evaluations" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."alerts" ENABLE ROW LEVEL SECURITY;

-- Tenant Helper (falls back to testing if empty, otherwise uses proper JWT)
CREATE OR REPLACE FUNCTION auth.tenant_id() RETURNS uuid AS $$
  SELECT COALESCE(
    NULLIF(current_setting('request.jwt.claim.tenant_id', true), ''),
    '00000000-0000-0000-0000-000000000000'
  )::uuid;
$$ LANGUAGE SQL STABLE;

-- Unified Read/Write Policy Generation
-- (In a real system, granular policies per role apply. This strictly segments by tenant.)
CREATE POLICY "Tenant-Only Read-Write" ON "public"."workspaces" FOR ALL USING ( tenant_id = auth.tenant_id() );
CREATE POLICY "Tenant-Only Read-Write" ON "public"."matters" FOR ALL USING ( tenant_id = auth.tenant_id() );
CREATE POLICY "Tenant-Only Read-Write" ON "public"."parties" FOR ALL USING ( tenant_id = auth.tenant_id() );
CREATE POLICY "Tenant-Only Read-Write" ON "public"."evidence_items" FOR ALL USING ( tenant_id = auth.tenant_id() );
CREATE POLICY "Tenant-Only Read-Write" ON "public"."timeline_events" FOR ALL USING ( tenant_id = auth.tenant_id() );
CREATE POLICY "Tenant-Only Read-Write" ON "public"."expenses" FOR ALL USING ( tenant_id = auth.tenant_id() );
CREATE POLICY "Tenant-Only Read-Write" ON "public"."evaluations" FOR ALL USING ( tenant_id = auth.tenant_id() );
CREATE POLICY "Tenant-Only Read-Write" ON "public"."alerts" FOR ALL USING ( tenant_id = auth.tenant_id() );
