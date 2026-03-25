import { TimelineEntry, Alert } from '../../types/domain';

export interface SoberLinkTest {
  id: string;
  scheduledTime: string;
  submittedTime: string | null;
  result: 'Pass' | 'Fail' | 'Missed';
  bacLevel?: number;
  patientId: string;
}

export class SoberLinkIntegration {
  /**
   * Converts a SoberLink test into a chronology/timeline event
   */
  static normalizeTest(test: SoberLinkTest, matterId: string): TimelineEntry {
    const isViolation = test.result === 'Fail' || test.result === 'Missed';
    
    return {
      id: `soberlink_${test.id}`,
      matter_id: matterId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      tenant_id: 'context_tenant',
      workspace_id: 'context_workspace',
      source_system: 'soberlink',
      source_record_id: test.id,
      event_date: test.scheduledTime,
      title: `SoberLink Test: ${test.result}`,
      description: isViolation 
        ? `Compliance violation detected. Test result: ${test.result}${test.bacLevel ? ` (BAC: ${test.bacLevel})` : ''}`
        : 'Routine test passed successfully.',
      issue_tags: ['substance_abuse', isViolation ? 'compliance_violation' : 'compliance_pass'],
    };
  }

  /**
   * Triggers global platform alerts if test results violate compliance
   */
  static evaluateComplianceAlerts(test: SoberLinkTest, matterId: string): Alert | null {
    if (test.result === 'Pass') return null;

    return {
      id: `alert_soberlink_${test.id}`,
      matter_id: matterId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      tenant_id: 'context_tenant',
      workspace_id: 'context_workspace',
      severity: test.result === 'Fail' ? 'critical' : 'high',
      title: `SoberLink Compliance Failure`,
      description: `Test scheduled for ${new Date(test.scheduledTime).toLocaleString()} resulted in ${test.result}.`,
      status: 'active'
    };
  }
}
