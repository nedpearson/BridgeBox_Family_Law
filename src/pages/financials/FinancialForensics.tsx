import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { DownloadCloud, ArrowUpRight, ArrowDownRight, Printer, Plus, X, Search, AlertTriangle, Eye, ShieldAlert } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function FinancialForensics() {
  const [activeTab, setActiveTab] = useState<'ledger' | 'petitions' | 'anomalies' | 'calculator'>('ledger');
  const [expenses, setExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State
  const [newExpense, setNewExpense] = useState({ date: '', payee: '', category: '', amount: '', is_recoverable: true });
  
  // Calculator State
  const [calcData, setCalcData] = useState({ partyAGross: 12500, partyAHealth: 800, partyBGross: 6200, partyBHealth: 200 });
  const partyANet = calcData.partyAGross - calcData.partyAHealth;
  const partyBNet = calcData.partyBGross - calcData.partyBHealth;
  const estimatedSupport = Math.max(0, (partyANet * 0.30) - (partyBNet * 0.20));

  const fetchExpenses = async () => {
    // Hardcoded mock matter ID for global fetch
    const matterId = '22222222-2222-2222-2222-222222222222';
    const { data } = await supabase
      .from('expenses')
      .select('*')
      .eq('matter_id', matterId)
      .order('date', { ascending: false });
    
    if (data) setExpenses(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const totalRecoverable = expenses
    .filter(l => l.is_recoverable && l.invoice_status === 'unbilled')
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    const matterId = '22222222-2222-2222-2222-222222222222';
    const tenantId = '00000000-0000-0000-0000-000000000000';
    const workspaceId = '11111111-1111-1111-1111-111111111111';

    await supabase.from('expenses').insert({
      tenant_id: tenantId,
      workspace_id: workspaceId,
      matter_id: matterId,
      ...newExpense,
      amount: parseFloat(newExpense.amount),
      invoice_status: 'unbilled',
    });

    setIsAddModalOpen(false);
    fetchExpenses(); // Refresh list
  };

  if (loading) return <div className="p-8 text-center text-gray-500 animate-pulse">Loading Ledger...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Financial Forensics</h1>
          <p className="text-gray-500 mt-1">Manage recoverable court costs, audit ledgers, and export petition schedules.</p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button 
            onClick={() => setActiveTab('ledger')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'ledger' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Expense Ledger
          </button>
          <button 
            onClick={() => setActiveTab('petitions')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'petitions' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Court Cost Petitions
          </button>
          <button 
            onClick={() => setActiveTab('anomalies')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center ${activeTab === 'anomalies' ? 'bg-orange-50 text-orange-700 shadow-sm border border-orange-200' : 'text-gray-500 hover:text-gray-900'}`}
          >
            <ShieldAlert className="w-4 h-4 mr-1.5" /> Ghost Asset Scanner
          </button>
          <button 
            onClick={() => setActiveTab('calculator')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'calculator' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Support Calculator
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Unbilled Recoverable Costs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">${totalRecoverable.toFixed(2)}</div>
            <p className="text-xs text-gray-500 mt-1">Ready for Clio Export or Court Petition</p>
          </CardContent>
        </Card>
      </div>

      {activeTab === 'ledger' && (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Matter Financial Ledger</h2>
            <div className="flex gap-4">
              <button onClick={() => setIsAddModalOpen(true)} className="flex items-center text-sm font-medium text-white bg-bridgebox-600 hover:bg-bridgebox-700 px-3 py-1.5 rounded-md shadow-sm">
                <Plus className="w-4 h-4 mr-1" /> Add Expense
              </button>
              <button className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 border px-3 py-1.5 rounded-md bg-white">
                <DownloadCloud className="w-4 h-4 mr-2" /> Export to Clio
              </button>
            </div>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Payee / Description</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Recoverable?</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {expenses.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{new Date(row.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.payee}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.category}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-right flex justify-end items-center gap-2 ${row.amount > 0 ? 'text-gray-900' : 'text-green-600'}`}>
                    {row.amount > 0 ? <ArrowUpRight className="w-4 h-4 text-gray-400" /> : <ArrowDownRight className="w-4 h-4 text-green-500" />}
                    ${Math.abs(row.amount).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {row.is_recoverable ? <Badge variant="success">Yes</Badge> : <span className="text-xs text-gray-400">-</span>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <Badge variant={row.invoice_status === 'unbilled' ? 'warning' : 'success'}>
                      {row.invoice_status.toUpperCase()}
                    </Badge>
                  </td>
                </tr>
              ))}
              {expenses.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-sm text-gray-500">No expenses recorded for this matter.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'petitions' && (
        <div className="bg-white rounded-xl shadow-sm border p-12 text-center flex flex-col items-center justify-center">
          <Printer className="h-12 w-12 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">Generate Court Cost Petition</h3>
          <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
            Automatically compile all unbilled recoverable expenses into a court-ready petition schedule with attached evidentary receipts.
          </p>
          <button className="mt-6 px-4 py-2 bg-bridgebox-600 text-white rounded-md text-sm font-medium hover:bg-bridgebox-700 shadow-sm">
            Generate Schedule
          </button>
        </div>
      )}

      {activeTab === 'anomalies' && (
        <div className="space-y-6">
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-orange-900 flex items-center"><Search className="w-5 h-5 mr-2" /> Financial Anomaly Scan Complete</h3>
              <p className="text-orange-700 text-sm mt-1">Found 3 unclassified high-risk transfers from uploaded bank statements.</p>
            </div>
            <button className="px-4 py-2 bg-white text-orange-700 border border-orange-200 rounded-md text-sm font-semibold hover:bg-orange-100 shadow-sm">
              Run Full Bank Sweep
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {[
              { date: '2026-03-01', amount: 50000, desc: 'WIRE TRANSFER TO KRAKEN EXCHANGE', risk: 'High - Undisclosed Crypto', source: 'Chase Checking ...4492' },
              { date: '2026-02-15', amount: 15000, desc: 'CASH WITHDRAWAL BRANCH 049', risk: 'Medium - Cash Dissipation', source: 'Chase Checking ...4492' },
              { date: '2026-01-10', amount: -4500, desc: 'LIFESTYLE DEFLATE - RENT PROJECTION', risk: 'Low - Altered Spending', source: 'Amex Platinum ...1004' }
            ].map((a, i) => (
              <div key={i} className="bg-white rounded-xl border p-5 flex items-center justify-between shadow-sm hover:border-orange-300 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-orange-100 p-2 rounded-full">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold text-gray-900">{a.desc}</h4>
                      <Badge variant="warning">{a.risk}</Badge>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Detected on {new Date(a.date).toLocaleDateString()} from {a.source}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">${Math.abs(a.amount).toLocaleString()}</div>
                    <div className="text-xs font-semibold text-gray-400">TRANSACTION</div>
                  </div>
                  <button className="text-bridgebox-600 hover:text-bridgebox-800 flex items-center text-sm font-medium">
                    <Eye className="w-4 h-4 mr-1" /> Inspect Source
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'calculator' && (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden p-8">
          <div className="flex items-center justify-between border-b pb-6 mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 font-display">Temporary Support Calculator</h2>
              <p className="text-sm text-gray-500 mt-1">Simulates generic Pendente Lite alimony offset formula (30% Payor - 20% Payee)</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">Est. Monthly Support</p>
              <p className="text-4xl font-bold text-bridgebox-600">${estimatedSupport.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Party A (Higher Earner)</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700">Gross Monthly Income</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><span className="text-gray-500 sm:text-sm">$</span></div>
                  <input type="number" className="pl-7 block w-full rounded-md border-gray-300 focus:border-bridgebox-500 focus:ring-bridgebox-500" value={calcData.partyAGross} onChange={e => setCalcData({...calcData, partyAGross: Number(e.target.value)})} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Mandatory Deductions (Health, Union)</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><span className="text-gray-500 sm:text-sm">$</span></div>
                  <input type="number" className="pl-7 block w-full rounded-md border-gray-300 focus:border-bridgebox-500 focus:ring-bridgebox-500" value={calcData.partyAHealth} onChange={e => setCalcData({...calcData, partyAHealth: Number(e.target.value)})} />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Party B (Lower Earner)</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700">Gross Monthly Income</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><span className="text-gray-500 sm:text-sm">$</span></div>
                  <input type="number" className="pl-7 block w-full rounded-md border-gray-300 focus:border-bridgebox-500 focus:ring-bridgebox-500" value={calcData.partyBGross} onChange={e => setCalcData({...calcData, partyBGross: Number(e.target.value)})} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Mandatory Deductions (Health, Union)</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><span className="text-gray-500 sm:text-sm">$</span></div>
                  <input type="number" className="pl-7 block w-full rounded-md border-gray-300 focus:border-bridgebox-500 focus:ring-bridgebox-500" value={calcData.partyBHealth} onChange={e => setCalcData({...calcData, partyBHealth: Number(e.target.value)})} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Expense Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900">Log New Expense</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleAddExpense} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input required type="date" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-bridgebox-500 focus:ring-bridgebox-500 text-sm" value={newExpense.date} onChange={e => setNewExpense({...newExpense, date: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Payee / Description</label>
                <input required type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-bridgebox-500 focus:ring-bridgebox-500 text-sm" value={newExpense.payee} onChange={e => setNewExpense({...newExpense, payee: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Amount ($)</label>
                  <input required type="number" step="0.01" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-bridgebox-500 focus:ring-bridgebox-500 text-sm" value={newExpense.amount} onChange={e => setNewExpense({...newExpense, amount: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-bridgebox-500 focus:ring-bridgebox-500 text-sm" value={newExpense.category} onChange={e => setNewExpense({...newExpense, category: e.target.value})}>
                    <option value="">Select...</option>
                    <option value="Filing Fee">Filing Fee</option>
                    <option value="Service Fee">Service Fee</option>
                    <option value="Mental Health Eval">Evaluator Fee</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <label className="flex items-center text-sm text-gray-700 gap-2 mt-2">
                <input type="checkbox" checked={newExpense.is_recoverable} onChange={e => setNewExpense({...newExpense, is_recoverable: e.target.checked})} className="rounded text-bridgebox-600 focus:ring-bridgebox-500" />
                Flag as Court-Recoverable
              </label>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 border rounded-md text-sm font-medium text-gray-700">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-bridgebox-600 text-white rounded-md text-sm font-medium hover:bg-bridgebox-700">Save Expense</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
