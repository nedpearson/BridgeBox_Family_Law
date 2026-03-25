import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { ArrowLeft, Calculator, Plus, Save, Activity, Download } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function AssetDivisionEngine() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [matter, setMatter] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Marital Balance Sheet specific state
  const [assets, setAssets] = useState([
    { id: 1, description: 'Marital Home - 123 Main St', value: 850000, partyA: 850000, partyB: 0, debt: 420000 },
    { id: 2, description: 'Chase Checking ...4492', value: 45000, partyA: 20000, partyB: 25000, debt: 0 },
    { id: 3, description: 'Fidelity 401(k) - Husband', value: 310000, partyA: 310000, partyB: 0, debt: 0 },
    { id: 4, description: 'Vanguard IRA - Wife', value: 180000, partyA: 0, partyB: 180000, debt: 0 },
    { id: 5, description: 'American Express Platinum', value: 0, partyA: 0, partyB: 0, debt: 15000 },
  ]);

  useEffect(() => {
    async function fetchMatter() {
      if (!id) return;
      const { data } = await supabase.from('matters').select('*').eq('id', id).single();
      if (data) setMatter(data);
      setLoading(false);
    }
    fetchMatter();
  }, [id]);

  const updateAsset = (assetId: number, field: string, value: string) => {
    setAssets(assets.map(a => a.id === assetId ? { ...a, [field]: Number(value) || 0 } : a));
  };

  const totals = assets.reduce((acc, a) => {
    acc.value += a.value;
    acc.debt += a.debt;
    acc.partyA += a.partyA;
    acc.partyB += a.partyB;
    return acc;
  }, { value: 0, debt: 0, partyA: 0, partyB: 0 });

  const netEstate = totals.value - totals.debt;
  const targetSplit = netEstate / 2;
  
  // Calculate equalization
  const partyANet = totals.partyA; // Subtracting specific debts assigned to party A would make this more complex, keeping it simple for now based on gross assigned values.
  const partyBNet = totals.partyB;
  
  // Actually, standard math: Net Estate / 2 = Target.
  // Party A requires: Target - Party A current holdings.
  const partyATracking = totals.partyA - (assets.reduce((sum, a) => sum + (a.partyA > 0 ? a.debt : 0), 0));
  const partyBTracking = totals.partyB - (assets.reduce((sum, a) => sum + (a.partyB > 0 ? a.debt : 0), 0));
  
  const equalizationValue = (targetSplit - partyATracking);
  const equalizationDirection = equalizationValue > 0 ? 'Party B owes Party A' : 'Party A owes Party B';

  if (loading) return <div className="p-8 text-center text-slate-500 animate-pulse">Loading Balance Sheet...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <button onClick={() => navigate(`/app/matter/${id}`)} className="flex items-center text-sm font-medium text-bridgebox-600 mb-2 hover:underline">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to {matter?.name}
          </button>
          <h1 className="text-2xl font-bold text-slate-900 font-display">Marital Balance Sheet</h1>
          <p className="text-slate-500 mt-1 flex items-center">
            <Calculator className="w-4 h-4 mr-1 text-bridgebox-500" />
            Equitable Distribution & Property Equalization Engine
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border rounded-md text-sm font-semibold flex items-center hover:bg-slate-50">
            <Download className="w-4 h-4 mr-2" /> PDF Export
          </button>
          <button className="px-4 py-2 bg-slate-900 text-white rounded-md text-sm font-semibold flex items-center hover:bg-slate-800">
            <Save className="w-4 h-4 mr-2" /> Save Scenario
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-slate-500">Gross Marital Estate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">${totals.value.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-slate-500">Total Marital Debt</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">${totals.debt.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-slate-500">Net Marital Estate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-bridgebox-600">${netEstate.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-50 border-bridgebox-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold text-bridgebox-700 uppercase">Equalization Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-slate-900">${Math.abs(equalizationValue).toLocaleString()}</div>
            <p className="text-xs font-semibold text-bridgebox-600 mt-1">{equalizationDirection}</p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-4 border-b bg-slate-50 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-900">Asset & Debt Ledger</h2>
          <button className="px-3 py-1.5 bg-bridgebox-600 text-white rounded-md text-sm font-semibold hover:bg-bridgebox-700 flex items-center">
            <Plus className="w-4 h-4 mr-1" /> Add Line Item
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Asset / Debt Description</th>
                <th className="px-6 py-3 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Gross Value ($)</th>
                <th className="px-6 py-3 text-right text-xs font-bold text-red-500 uppercase tracking-wider">Debt/Lien ($)</th>
                <th className="px-6 py-3 text-right text-xs font-bold text-bridgebox-600 uppercase tracking-wider">Party A To Retain ($)</th>
                <th className="px-6 py-3 text-right text-xs font-bold text-indigo-600 uppercase tracking-wider">Party B To Retain ($)</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100">
              {assets.map((asset) => (
                <tr key={asset.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <input type="text" className="w-full bg-transparent border-0 focus:ring-0 p-0 text-sm font-semibold text-slate-900" defaultValue={asset.description} />
                  </td>
                  <td className="px-6 py-4">
                    <input type="number" className="w-full text-right bg-transparent border-slate-200 rounded-md text-sm" value={asset.value} onChange={(e) => updateAsset(asset.id, 'value', e.target.value)} />
                  </td>
                  <td className="px-6 py-4">
                    <input type="number" className="w-full text-right bg-transparent border-slate-200 rounded-md text-sm text-red-600" value={asset.debt} onChange={(e) => updateAsset(asset.id, 'debt', e.target.value)} />
                  </td>
                  <td className="px-6 py-4">
                    <input type="number" className="w-full text-right bg-slate-100 border-slate-200 rounded-md text-sm text-bridgebox-700 font-bold focus:bg-white" value={asset.partyA} onChange={(e) => updateAsset(asset.id, 'partyA', e.target.value)} />
                  </td>
                  <td className="px-6 py-4">
                    <input type="number" className="w-full text-right bg-slate-100 border-slate-200 rounded-md text-sm text-indigo-700 font-bold focus:bg-white" value={asset.partyB} onChange={(e) => updateAsset(asset.id, 'partyB', e.target.value)} />
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-slate-50 font-bold border-t-2 border-slate-200">
              <tr>
                <td className="px-6 py-4 text-right text-sm text-slate-900">COLUMN TOTALS</td>
                <td className="px-6 py-4 text-right text-sm text-slate-900">${totals.value.toLocaleString()}</td>
                <td className="px-6 py-4 text-right text-sm text-red-600">${totals.debt.toLocaleString()}</td>
                <td className="px-6 py-4 text-right text-sm text-bridgebox-600">${totals.partyA.toLocaleString()}</td>
                <td className="px-6 py-4 text-right text-sm text-indigo-600">${totals.partyB.toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
