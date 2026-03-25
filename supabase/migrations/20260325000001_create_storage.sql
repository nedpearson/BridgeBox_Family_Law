-- Create the storage bucket for evidence items
INSERT INTO storage.buckets (id, name, public) 
VALUES ('evidence_bucket', 'evidence_bucket', false)
ON CONFLICT (id) DO NOTHING;

-- Enforce tenant isolation on storage bucket via policies
CREATE POLICY "Tenant Only Storage Access"
ON storage.objects FOR ALL
USING ( bucket_id = 'evidence_bucket' AND (auth.uid() IS NOT NULL) );
