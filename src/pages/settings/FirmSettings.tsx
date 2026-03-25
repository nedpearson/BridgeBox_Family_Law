import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Save, Building2, Paintbrush, Users, Shield, CreditCard, Plus, CheckCircle2, AlertCircle, Link as LinkIcon, Upload, ArrowRight } from 'lucide-react';

export default function FirmSettings() {
  const [activeTab, setActiveTab] = useState('billing');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 min-h-[calc(100vh-4rem)]">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 font-display">Firm Management & Settings</h1>
        <p className="text-slate-500 mt-1">Configure user roles, billing rules, and external portal whitelabeling for the entire tenant.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 shrink-0 space-y-2">
          {[
            { id: 'general', label: 'Firm Identity', icon: Building2 },
            { id: 'users', label: 'User Roles & Access', icon: Users },
            { id: 'billing', label: 'Subscription & Quotas', icon: CreditCard },
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
          <Card className="border-slate-200 shadow-sm overflow-hidden">
            <CardHeader className="border-b border-slate-100 bg-white flex flex-row items-center justify-between py-5">
              <CardTitle className="text-lg font-bold text-slate-900">
                {activeTab === 'general' && 'Firm Identity Profile'}
                {activeTab === 'users' && 'Staff Role Matrix'}
                {activeTab === 'billing' && 'Subscription & Matter Quotas'}
                {activeTab === 'whitelabel' && 'External Portal Whitelabeling'}
                {activeTab === 'security' && 'Tenant Security Controls'}
              </CardTitle>
              <button 
                onClick={handleSave} 
                className={`px-4 py-2 ${saved ? 'bg-emerald-600' : 'bg-slate-900 hover:bg-slate-800'} text-white text-sm font-bold rounded-lg transition-colors flex items-center shadow-sm`}
              >
                {saved ? <><CheckCircle2 className="w-4 h-4 mr-2" /> Saved</> : <><Save className="w-4 h-4 mr-2" /> Save Settings</>}
              </button>
            </CardHeader>
            <CardContent className="p-8 space-y-8 bg-slate-50/50">
              
              {/* BILLING / SAAS TAB */}
              {activeTab === 'billing' && (
                <div className="space-y-8">
                  <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 flex items-center">
                          Active Plan: <span className="ml-2 px-2.5 py-0.5 bg-indigo-100 text-indigo-700 text-sm rounded-md font-bold uppercase tracking-wider">Pro Tier</span>
                        </h3>
                        <p className="text-slate-500 text-sm mt-1">$499 / active attorney / month</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Next Invoice</p>
                        <p className="text-xl font-extrabold text-slate-900">$998.00</p>
                      </div>
                    </div>
                    
                    <div className="border-t border-slate-100 pt-6">
                      <div className="flex justify-between items-end mb-2">
                        <span className="text-sm font-bold text-slate-700 shrink-0">Matter Storage Quota</span>
                        <span className="text-sm font-bold text-slate-900">42 / 50 Active Matters</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-3 mb-2 overflow-hidden shadow-inner">
                        <div className="bg-bridgebox-500 h-3 rounded-full" style={{ width: '84%' }}></div>
                      </div>
                      <p className="text-xs font-medium text-slate-500 mt-2 flex items-center">
                        <AlertCircle className="w-3.5 h-3.5 mr-1 text-amber-500" /> You are approaching your Pro Tier cap.
                      </p>
                    </div>
                  </div>

                  <div className="bg-bridgebox-950 border border-slate-800 rounded-xl p-6 relative overflow-hidden text-white shadow-xl">
                     <div className="absolute inset-0 bg-[linear-gradient(to_right_bottom,rgba(16,185,129,0.2),transparent)]"></div>
                     <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                          <h4 className="text-lg font-bold text-white flex items-center">
                             Upgrade to Enterprise <ArrowRight className="w-4 h-4 ml-2 text-bridgebox-400" />
                          </h4>
                          <ul className="mt-3 space-y-1 text-sm text-slate-300 font-medium">
                             <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-bridgebox-500" /> Unlimited Active Matters</li>
                             <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-bridgebox-500" /> Dedicated ML Training Node</li>
                             <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-bridgebox-500" /> White-glove Soberlink Migration</li>
                          </ul>
                        </div>
                        <button className="px-6 py-3 bg-bridgebox-500 hover:bg-bridgebox-400 text-white font-bold rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all shrink-0">
                           Contact Sales
                        </button>
                     </div>
                  </div>
                </div>
              )}

              {/* WHITELABEL PORTAL TAB */}
              {activeTab === 'whitelabel' && (
                <div className="space-y-8 max-w-2xl">
                  <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Custom Domain Mapping</h3>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700">Mobile Intake CNAME</label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-slate-300 bg-slate-50 text-slate-500 text-sm font-medium">
                          https://
                        </span>
                        <input type="text" defaultValue="evidence.pearsonlegal.com" className="flex-1 block w-full rounded-none rounded-r-md border-slate-300 focus:border-bridgebox-500 focus:ring-bridgebox-500 sm:text-sm font-mono text-slate-900" />
                      </div>
                      <p className="text-xs text-slate-500 mt-2 flex items-start">
                         <LinkIcon className="w-3.5 h-3.5 mr-1.5 mt-0.5 shrink-0" />
                         Clients scanning your QR codes will be routed to your firm's domain instead of bridgebox.ai. Requires DNS verification.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Firm Branding</h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Primary Logo</label>
                        <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer group">
                           <Upload className="w-8 h-8 mx-auto text-slate-400 group-hover:text-bridgebox-500 transition-colors mb-2" />
                           <span className="text-sm font-bold text-slate-600">Upload SVG or PNG</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Accent Color</label>
                        <div className="flex items-center space-x-3">
                           <input type="color" defaultValue="#0f172a" className="w-12 h-12 rounded border-0 cursor-pointer" />
                           <div className="flex flex-col">
                             <span className="text-sm font-bold text-slate-900">#0f172a</span>
                             <span className="text-xs text-slate-500">Used for client buttons</span>
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SECURITY TAB */}
              {activeTab === 'security' && (
                <div className="space-y-6 max-w-xl">
                  <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm space-y-6">
                    <div>
                      <h3 className="text-md font-bold text-slate-900 flex items-center">
                        <Shield className="w-4 h-4 mr-2 text-indigo-500" /> Two-Factor Authentication
                      </h3>
                      <p className="text-sm text-slate-500 mt-1 mb-4 leading-relaxed">Enforce hardware keys or authenticator apps (TOTP) for all paralegals and attorneys accessing this tenant workspace.</p>
                      
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                         <span className="text-sm font-bold text-slate-700">Global 2FA Requirement</span>
                         <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-bridgebox-600"></div>
                        </label>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-slate-100">
                      <h3 className="text-md font-bold text-slate-900">Session Timeout</h3>
                      <p className="text-sm text-slate-500 mt-1 mb-3">Automatically log out idle staff to prevent unauthorized terminal access.</p>
                      <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-bridgebox-500 focus:border-bridgebox-500 sm:text-sm rounded-md font-medium text-slate-700 bg-slate-50">
                        <option>15 Minutes</option>
                        <option>30 Minutes</option>
                        <option>1 Hour</option>
                        <option>4 Hours</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* ORIGINAL GENERAL TAB */}
              {activeTab === 'general' && (
                <div className="space-y-6 max-w-lg bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700">Firm Name</label>
                    <input type="text" defaultValue="Pearson Legal Group LLC" className="mt-1 block w-full rounded-md border-slate-300 bg-slate-50 shadow-sm focus:border-bridgebox-500 focus:ring-bridgebox-500 text-slate-900 font-medium" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700">Support Email</label>
                    <input type="email" defaultValue="admin@pearsonlegal.com" className="mt-1 block w-full rounded-md border-slate-300 bg-slate-50 shadow-sm focus:border-bridgebox-500 focus:ring-bridgebox-500 text-slate-900 font-medium" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700">Primary Jurisdiction / State</label>
                    <input type="text" defaultValue="Illinois" className="mt-1 block w-full rounded-md border-slate-300 bg-slate-50 shadow-sm focus:border-bridgebox-500 focus:ring-bridgebox-500 text-slate-900 font-medium" />
                    <p className="text-xs text-slate-500 mt-2 font-medium">This automatically populates the header for AI Discovery Forms.</p>
                  </div>
                </div>
              )}

              {/* ORIGINAL USERS TAB */}
              {activeTab === 'users' && (
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <div className="bg-orange-50 border border-orange-200 text-orange-800 p-4 rounded-lg mb-6 text-sm flex">
                    <Shield className="w-5 h-5 mr-3 shrink-0 text-orange-600" />
                    <p><strong>RBAC Notice:</strong> Paralegals cannot modify financial ledger line items or permanently delete evidence buckets. To alter permissions, contact Support.</p>
                  </div>
                  <table className="min-w-full divide-y divide-slate-100 border rounded-lg overflow-hidden">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-50">
                      <tr>
                        <td className="px-6 py-4 text-sm font-bold text-slate-900">Ned Pearson</td>
                        <td className="px-6 py-4 text-sm"><span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 rounded-lg font-bold text-xs ring-1 ring-inset ring-indigo-600/20">Super Admin / Partner</span></td>
                        <td className="px-6 py-4 text-sm text-slate-400 font-medium">Current User</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm font-bold text-slate-900">Sarah Jenkins</td>
                        <td className="px-6 py-4 text-sm"><span className="px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded-lg font-bold text-xs ring-1 ring-inset ring-slate-500/10">Paralegal</span></td>
                        <td className="px-6 py-4 text-sm text-bridgebox-600 font-bold hover:underline cursor-pointer">Edit Access</td>
                      </tr>
                    </tbody>
                  </table>
                  <button className="mt-6 text-sm font-bold text-white bg-slate-900 px-4 py-2 rounded-lg hover:bg-slate-800 flex items-center shadow-sm">
                    <Plus className="w-4 h-4 mr-2" /> Invite New User
                  </button>
                </div>
              )}

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
