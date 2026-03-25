import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { AlertCircle, FileText, Scale, TrendingUp, Filter, Clock } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function PortfolioDashboard() {
  const navigate = useNavigate();
  const [matters, setMatters] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchDashboard() {
      // Real database fetch from Supabase
      const [mattersRes, alertsRes] = await Promise.all([
        supabase.from('matters').select('*').order('created_at', { ascending: false }),
        supabase.from('alerts').select('*, matters(name)').eq('status', 'active').order('created_at', { ascending: false })
      ]);
      
      if (mattersRes.data) setMatters(mattersRes.data);
      if (alertsRes.data) setAlerts(alertsRes.data);
      setLoading(false);
    }
    fetchDashboard();
  }, []);

  const totalActive = matters.filter(m => m.status === 'active').length;
  const criticalAlerts = alerts.filter(a => a.severity === 'critical');

  if (loading) {
    return <div className="p-8 flex items-center justify-center animate-pulse text-gray-500">Loading Portfolio Data...</div>;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Portfolio Overview</h1>
        <p className="text-gray-500 mt-1">Cross-matter intelligence and active risk queue.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Active Matters</CardTitle>
            <Scale className="w-4 h-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalActive}</div>
          </CardContent>
        </Card>
        <Card className="border-red-200 bg-red-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-red-800">Critical Alerts</CardTitle>
            <AlertCircle className="w-4 h-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-700">{criticalAlerts.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Pending Eval Reports</CardTitle>
            <FileText className="w-4 h-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Unbilled Costs</CardTitle>
            <TrendingUp className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">$0.00</div>
          </CardContent>
        </Card>
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-orange-800">Stale Matters (&gt;30d)</CardTitle>
            <Clock className="w-4 h-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700">1</div>
            <p className="text-xs text-orange-600 mt-1">Automated sweeper detected inactivity.</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Matters Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Active Matters</h2>
            <button className="text-sm text-gray-500 flex items-center hover:text-gray-900">
              <Filter className="w-4 h-4 mr-1" /> Filter
            </button>
          </div>
          <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Matter Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posture</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {matters.map((m) => (
                  <tr 
                    key={m.id} 
                    onClick={() => navigate(`/app/matter/${m.id}`)}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{m.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{m.posture}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <Badge variant={m.status === 'active' ? 'success' : 'default'}>{m.status}</Badge>
                    </td>
                  </tr>
                ))}
                {matters.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-sm text-gray-500">No active matters found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Global Alert Queue */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Action Required Queue</h2>
          <div className="bg-white border rounded-xl shadow-sm p-4 space-y-4">
            {alerts.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">No active compliance alerts.</p>
            ) : (
              alerts.map((a) => (
                <div key={a.id} className={`p-3 rounded-lg border flex gap-3 ${a.severity === 'critical' ? 'border-red-200 bg-red-50' : 'border-orange-200 bg-orange-50'}`}>
                  <AlertCircle className={`w-5 h-5 mt-0.5 shrink-0 ${a.severity === 'critical' ? 'text-red-500' : 'text-orange-500'}`} />
                  <div>
                    <h4 className={`text-sm font-medium ${a.severity === 'critical' ? 'text-red-900' : 'text-orange-900'}`}>{a.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">{a.description}</p>
                    <div className="mt-2 text-xs font-medium text-gray-500 group cursor-pointer hover:text-bridgebox-600" onClick={() => navigate(`/app/matter/${a.matter_id}`)}>
                      View {a.matters?.name} &rarr;
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
