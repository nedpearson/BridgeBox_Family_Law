export type SourceSystem = 'clio' | 'ofw' | 'soberlink' | 'bridgebox' | 'user_upload';

export interface BaseRecord {
  id: string;
  created_at: string;
  updated_at: string;
  tenant_id: string;
  workspace_id: string;
}

export interface SyncableRecord extends BaseRecord {
  source_system: SourceSystem;
  source_record_id?: string;
  source_url?: string;
  source_created_at?: string;
  source_updated_at?: string;
  synced_at?: string;
  sync_version?: number;
  dedupe_key?: string;
  confidence_score?: number;
}

export interface Workspace extends BaseRecord {
  name: string;
  domain?: string;
}

export interface Matter extends BaseRecord {
  name: string;
  status: 'active' | 'pending' | 'closed';
  posture: string;
}

export interface Party extends BaseRecord {
  matter_id: string;
  role: 'client' | 'opposing' | 'child' | 'professional' | 'other';
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
}

export interface EvidenceItem extends SyncableRecord {
  matter_id: string;
  title: string;
  type: 'document' | 'image' | 'communication' | 'financial' | 'other';
  content?: string;
  file_url?: string;
  metadata?: Record<string, any>;
  issue_tags: string[];
}

export interface TimelineEntry extends SyncableRecord {
  matter_id: string;
  event_date: string;
  title: string;
  description?: string;
  evidence_id?: string;
  issue_tags: string[];
}

export interface Expense extends SyncableRecord {
  matter_id: string;
  date: string;
  amount: number;
  payee: string;
  category: string;
  is_recoverable: boolean;
  is_advanced_by_firm: boolean;
  invoice_status: 'unbilled' | 'billed' | 'paid';
  notes?: string;
}

export interface EvaluationWorkflow extends BaseRecord {
  matter_id: string;
  type: 'mental_health' | 'substance_abuse';
  status: 'requested' | 'ordered' | 'scheduled' | 'report_pending' | 'completed';
  evaluator_name?: string;
  due_date?: string;
  cost?: number;
}

export interface Alert extends BaseRecord {
  matter_id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  status: 'active' | 'snoozed' | 'resolved';
}
