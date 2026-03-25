import { Expense, SyncableRecord } from '../../types/domain';

// Standardized Clio API response shapes mockup
export interface ClioMatter {
  id: number;
  display_number: string;
  description: string;
  client_id: number;
}

export interface ClioExpense {
  id: number;
  date: string;
  quantity: number;
  price: number;
  total: number;
  note: string;
}

export class ClioIntegration {
  private static API_BASE = 'https://app.clio.com/api/v4';

  /**
   * Maps a Bridgebox recoverable expense to a Clio Expense record
   */
  static mapToClioExpense(expense: Expense): Partial<ClioExpense> {
    return {
      date: expense.date,
      quantity: 1,
      price: expense.amount,
      note: `[Bridgebox Auto-Sync] ${expense.payee} - ${expense.category}\n${expense.notes || ''}`
    };
  }

  /**
   * Simulates a secure OAuth payload generation for Clio
   */
  static generateOAuthPayload(workspaceId: string) {
    return {
      client_id: import.meta.env.VITE_CLIO_CLIENT_ID,
      redirect_uri: `${window.location.origin}/auth/clio/callback`,
      response_type: 'code',
      state: workspaceId,
    };
  }

  /**
   * Identifies any duplicates between Bridgebox sync queue and existing Clio records
   */
  static detectDuplicates(bridgeboxExpense: Expense, clioRecords: ClioExpense[]): boolean {
    return clioRecords.some(cr => 
      cr.total === bridgeboxExpense.amount && 
      cr.date === bridgeboxExpense.date
    );
  }
}
