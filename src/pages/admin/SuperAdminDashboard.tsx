import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { ShieldAlert, Users, Database, Activity, TrendingUp, Building2, Server, Key, AlertTriangle } from 'lucide-react';

// Mock Data for Platform-Wide Oversight
const PLATFORM_METRICS = [
  { label: 'Active Firms (Tenants)', value: '14', change: '+2 this month', icon: Building2, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { label: 'Total Matters Tracked', value: '428', change: '+52 this month', icon: Database, color: 'text-bridgebox-600', bg: 'bg-bridgebox-50' },
  { label: 'Evidence Processed (TB)', value: '1.2', change: '+0.1 TB', icon: Server, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Platform MRR', value: '$6,986', change: '+12%', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
];

const TENANTS = [
  { id: 't-100', name: 'Pearson Legal Group', matters: 142, mrr: '$998', status: 'Active', plan: 'Enterprise' },
  { id: 't-101', name: 'Williams & Cohen Strategy', matters: 89, mrr: '$499', status: 'Active', plan: 'Pro' },
  { id: 't-102', name: 'Chicago Family Defense', matters: 21, mrr: '$199', status: 'Active', plan: 'Starter' },
  { id: 't-103', name: 'Boutique Matrimonial LLC', matters: 4, mrr: '$0', status: 'Trial', plan: 'Trial' },
];

export default function SuperAdminDashboard() {
  const [authorized, setAuthorized] = useState(false);
  const [verifying, setVerifying] = useState(true);

  // In production, this verifies the user's role against Supabase auth.users or a roles table
  useEffect(() => {
    setTimeout(() => {
      setAuthorized(true); // Assuming 'nedpearson@gmail.com' for demo purposes
      setVerifying(false);
    }, 800);
  }, []);

  if (verifying) return (
    <div className="flex-1 flex flex-col items-center justify-center h-full text-slate-400 bg-slate-900">
      <Key className="w-12 h-12 mb-4 animate-pulse text-indigo-500" />
      <p className="font-display font-bold tracking-widest uppercase">Verifying God-Mode Clearance...</p>
    </div>
  );

  if (!authorized) return (
    <div className="flex-1 flex flex-col items-center justify-center h-full text-red-500">
      <ShieldAlert className="w-16 h-16 mb-4" />
      <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
      <p>Your account lacks platform-level super admin privileges.</p>
    </div>
  );

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 bg-slate-50 min-h-[calc(100vh-4rem)]">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 font-display flex items-center tracking-tight">
            <ShieldAlert className="w-7 h-7 mr-3 text-indigo-600" /> 
            Super Admin <span className="text-slate-400 ml-2 font-light">| Platform Oversight</span>
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Global metrics across all isolated multi-tenant workspaces.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-200 rounded-lg text-indigo-700 text-sm font-bold shadow-sm">
          <Activity className="w-4 h-4 animate-pulse" /> Platform Operational
        </div>
      </div>

      {/* Global Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PLATFORM_METRICS.map(metric => (
          <div key={metric.label} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${metric.bg}`}>
              <metric.icon className={`w-6 h-6 ${metric.color}`} />
            </div>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">{metric.label}</p>
            <h3 className="text-3xl font-extrabold text-slate-900 mt-1">{metric.value}</h3>
            <p className="text-emerald-600 text-sm font-medium mt-2 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" /> {metric.change}
            </p>
          </div>
        ))}
      </div>

      {/* Tenants Table */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="bg-white border-b border-slate-100 pb-4">
          <CardTitle className="text-lg font-bold text-slate-900">Registered Workspaces (Firms)</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-xs border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Tenant ID</th>
                  <th className="px-6 py-4">Firm/Organization Name</th>
                  <th className="px-6 py-4">Active Plan</th>
                  <th className="px-6 py-4">Matters</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">MRR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {TENANTS.map((tenant) => (
                  <tr key={tenant.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-slate-400">{tenant.id}</td>
                    <td className="px-6 py-4 font-bold text-slate-900 flex items-center">
                      <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center mr-3 text-slate-500">
                        {tenant.name.charAt(0)}
                      </div>
                      {tenant.name}
                    </td>
                    <td className="px-6 py-4">
                       <span className={`px-2 py-1 rounded-md text-xs font-bold ${tenant.plan === 'Enterprise' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-700'}`}>
                         {tenant.plan}
                       </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-600">{tenant.matters}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold ${tenant.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                        <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${tenant.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                        {tenant.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-slate-900">{tenant.mrr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      {/* Danger Zone */}
      <div className="mt-8 border border-red-200 bg-red-50 rounded-2xl p-6">
         <h3 className="text-red-800 font-bold text-lg flex items-center"><AlertTriangle className="w-5 h-5 mr-2" /> Global Emergency Controls</h3>
         <p className="text-red-600/80 text-sm font-medium mt-1 mb-4">Actions taken here affect all active tenants and matters simultaneously.</p>
         <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-lg shadow-sm transition-colors">
            Trigger Platform Maintenance Mode
         </button>
      </div>
    </div>
  );
}
