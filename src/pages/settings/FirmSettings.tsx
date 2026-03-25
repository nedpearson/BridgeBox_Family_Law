import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Save, Building2, Paintbrush, Users, Shield, CreditCard, Plus } from 'lucide-react';

export default function FirmSettings() {
  const [activeTab, setActiveTab] = useState('general');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 font-display">Firm Management & Settings</h1>
        <p className="text-slate-500 mt-1">Configure user roles, billing rules, and external portal whitelabeling for the entire tenant.</p>
      </div>

      <div className="flex gap-8">
        <div className="w-64 shrink-0 space-y-2">
          {[
            { id: 'general', label: 'Firm Identity', icon: Building2 },
            { id: 'users', label: 'User Roles & Access', icon: Users },
            { id: 'billing', label: 'Billing Rates', icon: CreditCard },
            { id: 'whitelabel', label: 'Whitelabel Portal', icon: Paintbrush },
            { id: 'security', label: 'Security & Auth', icon: Shield },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center px-4 py-3 text-sm font-semibold rounded-lg transition-colors ${
                activeTab === tab.id 
                  ? 'bg-bridgebox-50 text-bridgebox-700 border border-bridgebox-200 shadow-sm' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <tab.icon className={`w-5 h-5 mr-3 ${activeTab === tab.id ? 'text-bridgebox-600' : 'text-slate-400'}`} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex-1 space-y-6">
          <Card>
            <CardHeader className="border-b bg-slate-50 flex flex-row items-center justify-between py-4">
              <CardTitle className="text-lg">
                {activeTab === 'general' && 'Firm Identity Profile'}
                {activeTab === 'users' && 'Staff Role Matrix'}
                {activeTab === 'billing' && 'Hourly Rate Overrides'}
                {activeTab === 'whitelabel' && 'External Portal Whitelabeling'}
                {activeTab === 'security' && 'Tenant Security Controls'}
              </CardTitle>
              <button onClick={handleSave} className="px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-md hover:bg-slate-800 flex items-center">
                <Save className="w-4 h-4 mr-2" /> {saved ? 'Saved!' : 'Save Settings'}
              </button>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              {activeTab === 'general' && (
                <div className="space-y-6 max-w-lg">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700">Firm Name</label>
                    <input type="text" defaultValue="Pearson Legal Group LLC" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-bridgebox-500 focus:ring-bridgebox-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700">Support Email</label>
                    <input type="email" defaultValue="admin@pearsonlegal.com" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-bridgebox-500 focus:ring-bridgebox-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700">Primary Jurisdiction / State</label>
                    <input type="text" defaultValue="Illinois" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-bridgebox-500 focus:ring-bridgebox-500" />
                    <p className="text-xs text-slate-500 mt-1">This populates the header for AI Discovery Forms.</p>
                  </div>
                </div>
              )}

              {activeTab === 'users' && (
                <div>
                  <div className="bg-orange-50 border border-orange-200 text-orange-800 p-4 rounded-lg mb-6 text-sm flex">
                    <Shield className="w-5 h-5 mr-3 shrink-0" />
                    <p><strong>RBAC Notice:</strong> Paralegals cannot modify financial ledger line items or permanently delete evidence buckets.</p>
                  </div>
                  <table className="min-w-full divide-y divide-slate-200 border rounded-lg overflow-hidden">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      <tr>
                        <td className="px-6 py-4 text-sm font-semibold text-slate-900">Ned Pearson</td>
                        <td className="px-6 py-4 text-sm"><span className="px-2.5 py-0.5 bg-bridgebox-100 text-bridgebox-800 rounded-full font-bold text-xs border border-bridgebox-200">Super Admin / Partner</span></td>
                        <td className="px-6 py-4 text-sm text-slate-400">Current User</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm font-semibold text-slate-900">Sarah Jenkins</td>
                        <td className="px-6 py-4 text-sm"><span className="px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded-full font-bold text-xs border border-slate-200">Paralegal</span></td>
                        <td className="px-6 py-4 text-sm text-bridgebox-600 font-bold hover:underline cursor-pointer">Edit Access</td>
                      </tr>
                    </tbody>
                  </table>
                  <button className="mt-4 text-sm font-bold text-bridgebox-600 hover:text-bridgebox-700 flex items-center">
                    <Plus className="w-4 h-4 mr-1" /> Invite New User
                  </button>
                </div>
              )}

              {activeTab !== 'general' && activeTab !== 'users' && (
                <div className="py-12 text-center text-slate-500">
                  <Paintbrush className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <h3 className="text-lg font-bold text-slate-900">Module Configuration</h3>
                  <p>Settings panel components load dynamically based on tenant selection.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
