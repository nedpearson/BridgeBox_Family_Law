import { TimelineEntry, SyncableRecord } from '../../types/domain';

export interface OFWMessage {
  id: string;
  sentAt: string;
  senderId: string;
  recipientId: string;
  subject: string;
  body: string;
  toneAnalysis?: {
    hostilityScore: number;
  };
}

export class OFWIntegration {
  /**
   * Normalizes an OFW message into a Bridgebox Unified Chronology Event
   */
  static normalizeMessage(message: OFWMessage, matterId: string): TimelineEntry {
    const isHostile = message.toneAnalysis && message.toneAnalysis.hostilityScore > 0.7;
    
    return {
      id: `ofw_msg_${message.id}`,
      matter_id: matterId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      tenant_id: 'context_tenant',
      workspace_id: 'context_workspace',
      source_system: 'ofw',
      source_record_id: message.id,
      event_date: message.sentAt,
      title: `OFW Message: ${message.subject}`,
      description: message.body.substring(0, 150) + '...',
      issue_tags: isHostile ? ['co_parenting', 'high_conflict'] : ['co_parenting'],
      confidence_score: 1.0 // Sourced via API
    };
  }

  /**
   * Generates attorney-facing summaries of escalation patterns
   */
  static detectEscalation(messages: OFWMessage[]): { isEscalating: boolean; summary: string } {
    const hostileCount = messages.filter(m => (m.toneAnalysis?.hostilityScore ?? 0) > 0.7).length;
    
    if (hostileCount > 3) {
      return {
        isEscalating: true,
        summary: `Detected escalation: ${hostileCount} hostile messages in recent exchange window.`
      };
    }
    
    return { isEscalating: false, summary: 'Normal communication pattern detected.' };
  }
}
