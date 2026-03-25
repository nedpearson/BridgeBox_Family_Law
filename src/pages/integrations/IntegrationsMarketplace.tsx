import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Plug, CheckCircle2, AlertCircle, ArrowRight, Server, Globe2, Activity, Settings2, ShieldCheck, HelpCircle } from 'lucide-react';

const INTEGRATIONS = [
  {
    id: 'qbo',
    name: 'QuickBooks Online',
    type: 'Accounting & Payroll',
    description: 'Sync invoices, trial balances, and trust accounting ledgers via the Intuit OAuth 2.0 flow.',
    status: 'connected',
    lastSync: '10 mins ago',
    icon: Globe2,
    color: 'text-green-600',
    bg: 'bg-green-50'
  },
  {
    id: 'qbd',
    name: 'QuickBooks Desktop',
    type: 'Accounting & Payroll',
    description: 'Bridge on-premise company files (.qbw) using the XML Web Connector bridging protocol.',
    status: 'disconnected',
    lastSync: 'Never',
    icon: Server,
    color: 'text-emerald-700',
    bg: 'bg-emerald-50'
  },
  {
    id: 'clio',
    name: 'Clio Manage',
    type: 'Practice Management',
    description: 'One-way sync for Matter IDs, Client Contacts, and active billing thresholds.',
    status: 'connected',
    lastSync: '2 hours ago',
    icon: Activity,
    color: 'text-blue-600',
    bg: 'bg-blue-50'
  },
  {
    id: 'ofw',
    name: 'OurFamilyWizard',
    type: 'Communication Intelligence',
    description: 'Automated hostility mapping and message ingestion logic. Extracts "Tonemeter" anomalies.',
    status: 'syncing',
    lastSync: 'Syncing now...',
    icon: ShieldCheck,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50'
  },
  {
    id: 'soberlink',
    name: 'SoberLink',
    type: 'Compliance Testing',
    description: 'Daily breathalyzer ingestion pipeline mapped against chronological custody schedules.',
    status: 'disconnected',
    lastSync: 'Never',
    icon: Settings2,
    color: 'text-slate-600',
    bg: 'bg-slate-50'
  }
];

export default function IntegrationsMarketplace() {
  const [activeTab, setActiveTab] = useState<'all' | 'connected' | 'accounting'>('all');

  const filteredIntegrations = INTEGRATIONS.filter(integration => {
    if (activeTab === 'connected') return integration.status === 'connected';
    if (activeTab === 'accounting') return integration.type.includes('Accounting');
    return true;
  });

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 min-h-[calc(100vh-4rem)]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 font-display flex items-center tracking-tight">
            <Plug className="w-7 h-7 mr-3 text-bridgebox-600" /> 
            Integration Marketplace
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Manage global data connectors for accounting forensics and practice intelligence.</p>
        </div>
        
        <div className="flex bg-slate-100 p-1 rounded-xl shadow-sm">
          <button 
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${activeTab === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            All Plugins
          </button>
          <button 
            onClick={() => setActiveTab('accounting')}
            className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${activeTab === 'accounting' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Financial & QBO
          </button>
          <button 
            onClick={() => setActiveTab('connected')}
            className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors flex items-center ${activeTab === 'connected' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <CheckCircle2 className="w-4 h-4 mr-1.5" /> Active
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIntegrations.map((app) => (
          <Card key={app.id} className="border-slate-200 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col group relative overflow-hidden">
            {app.status === 'connected' && <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-emerald-100 to-transparent flex items-start justify-end p-3"><CheckCircle2 className="w-5 h-5 text-emerald-600" /></div>}
            
            <CardHeader className="pb-4 border-b border-slate-100">
              <div className="flex items-start justify-between">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${app.bg} ring-1 ring-slate-900/5 group-hover:scale-110 transition-transform`}>
                  <app.icon className={`w-7 h-7 ${app.color}`} />
                </div>
                {app.status === 'connected' && (
                   <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                     Connected
                   </span>
                )}
                {app.status === 'syncing' && (
                   <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20 animate-pulse">
                     Syncing...
                   </span>
                )}
                {app.status === 'disconnected' && (
                   <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-500/10">
                     Not Configured
                   </span>
                )}
              </div>
              <CardTitle className="text-xl font-bold text-slate-900">{app.name}</CardTitle>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">{app.type}</p>
            </CardHeader>
            <CardContent className="p-6 flex flex-col flex-1">
              <p className="text-sm text-slate-600 leading-relaxed font-medium mb-6 flex-1">
                {app.description}
              </p>
              
              <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-auto">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Last Sync</span>
                  <span className="text-xs font-medium text-slate-700">{app.lastSync}</span>
                </div>
                
                <button className={`inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                  app.status === 'connected' 
                  ? 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200' 
                  : 'bg-bridgebox-600 hover:bg-bridgebox-700 text-white shadow-sm'
                }`}>
                  {app.status === 'connected' ? 'Configure' : 'Connect'} 
                  {app.status !== 'connected' && <ArrowRight className="w-4 h-4 ml-1.5" />}
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Knowledge/Support Banner */}
      <div className="mt-8 bg-bridgebox-50 border border-bridgebox-200 rounded-2xl p-6 flex items-start sm:items-center justify-between flex-col sm:flex-row gap-4 shadow-inner">
         <div className="flex items-start sm:items-center">
            <div className="w-12 h-12 rounded-full bg-bridgebox-100 flex items-center justify-center shrink-0 mr-4">
               <HelpCircle className="w-6 h-6 text-bridgebox-600" />
            </div>
            <div>
               <h3 className="text-lg font-bold text-bridgebox-900">Need help with QuickBooks Desktop?</h3>
               <p className="text-sm font-medium text-bridgebox-800/70 mt-1">Downloading the QWC XML file requires an active mapping configuration. Check our integration docs.</p>
            </div>
         </div>
         <button className="whitespace-nowrap px-5 py-2.5 bg-white border border-bridgebox-200 text-bridgebox-700 text-sm font-bold rounded-xl hover:bg-bridgebox-50 shadow-sm shrink-0">
            View Documentation
         </button>
      </div>
    </div>
  );
}
