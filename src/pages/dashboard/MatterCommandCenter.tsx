import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Scale, Clock, ShieldAlert, DollarSign, Activity, LineChart, Share, X, ShieldCheck, Copy } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function MatterCommandCenter() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [matter, setMatter] = useState<any>(null);
  const [timeline, setTimeline] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchMatterDetails() {
      if (!id) return;
      const [matterRes, timeRes, alertRes] = await Promise.all([
        supabase.from('matters').select('*').eq('id', id).single(),
        supabase.from('timeline_events').select('*').eq('matter_id', id).order('event_date', { ascending: false }),
        supabase.from('alerts').select('*').eq('matter_id', id).eq('status', 'active')
      ]);

      if (matterRes.data) setMatter(matterRes.data);
      if (timeRes.data) setTimeline(timeRes.data);
      if (alertRes.data) setAlerts(alertRes.data);
      setLoading(false);
    }
    fetchMatterDetails();
  }, [id]);

  if (loading) {
    return <div className="p-8 text-center text-gray-500 animate-pulse">Loading Matter Profile...</div>;
  }

  if (!matter) {
    return <div className="p-8 text-center text-red-500">Matter not found or access restricted.</div>;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div>
          <button onClick={() => navigate('/app/portfolio')} className="text-sm font-medium text-bridgebox-600 mb-2 hover:underline">&larr; Back to Portfolio</button>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">{matter.name}</h1>
            <Badge variant={matter.status === 'active' ? 'success' : 'default'}>{matter.status.toUpperCase()}</Badge>
            <Badge variant="warning">{matter.posture}</Badge>
          </div>
          <p className="text-sm text-gray-500 mt-1">Tenant Sub-ID: {matter.id.split('-')[0]} • Created {new Date(matter.created_at).toLocaleDateString()}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setIsShareModalOpen(true)} className="px-4 py-2 border rounded-md text-sm font-semibold bg-white hover:bg-slate-50 text-slate-700 shadow-sm flex items-center"><Share className="w-4 h-4 mr-2 text-slate-400" /> Share with OC</button>
          <button onClick={() => navigate(`/app/matter/${matter.id}/forms`)} className="px-4 py-2 border rounded-md text-sm font-semibold bg-white hover:bg-bridgebox-50 text-bridgebox-700 border-bridgebox-200 shadow-sm">AI Forms</button>
          <button onClick={() => navigate('/app/evidence')} className="px-4 py-2 border rounded-md text-sm font-semibold bg-white hover:bg-slate-50 text-slate-700 shadow-sm">Upload Evidence</button>
          <button onClick={() => navigate(`/app/matter/${matter.id}/packet`)} className="px-4 py-2 bg-slate-900 text-white rounded-md text-sm font-semibold hover:bg-slate-800 shadow-md">Generate Report</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Upcoming Hearing</CardTitle>
            <Scale className="w-4 h-4 text-bridgebox-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">Oct 14, 2026</div>
            <p className="text-xs text-gray-500 mt-1">Temporary Orders (Status)</p>
          </CardContent>
        </Card>
        <Card className={`${alerts.some(a => a.severity === 'critical') ? 'bg-red-50 border-red-200' : ''}`}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className={`text-sm font-medium ${alerts.some(a => a.severity === 'critical') ? 'text-red-800' : 'text-gray-500'}`}>Active Alerts</CardTitle>
            <ShieldAlert className={`w-4 h-4 ${alerts.some(a => a.severity === 'critical') ? 'text-red-500' : 'text-gray-400'}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${alerts.some(a => a.severity === 'critical') ? 'text-red-700' : 'text-gray-900'}`}>{alerts.length}</div>
            {alerts.length > 0 && <p className="text-xs text-red-600 mt-1">{alerts[0].title}</p>}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Unbilled Recoverables</CardTitle>
            <DollarSign className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 cursor-pointer hover:underline" onClick={() => navigate('/app/financials')}>Check Ledger</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Unified Chronology Preview</h2>
            <button onClick={() => navigate('/app/chronology')} className="text-sm text-bridgebox-600 font-medium hover:underline">View Full Interactive Engine</button>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="relative border-l border-gray-200 ml-3 space-y-8">
              {timeline.length === 0 ? (
                <p className="text-sm text-gray-500 pl-6">No chronology events detected for this matter.</p>
              ) : (
                timeline.map((event) => (
                  <div key={event.id} className="relative pl-8">
                    <span className="absolute -left-3 top-1 flex items-center justify-center w-6 h-6 bg-bridgebox-100 rounded-full ring-8 ring-white">
                      <Clock className="w-3 h-3 text-bridgebox-600" />
                    </span>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-sm font-semibold text-gray-900">{event.title} <span className="text-gray-400 font-normal ml-2">{event.source_system}</span></h3>
                      <time className="text-xs text-gray-500 font-medium">{new Date(event.event_date).toLocaleString()}</time>
                    </div>
                    {event.description && <p className="text-sm text-gray-600 mt-1 bg-gray-50 border p-3 rounded-lg border-gray-100">{event.description}</p>}
                    <div className="mt-3 flex gap-2 flex-wrap">
                      {event.issue_tags?.map((tag: string) => (
                        <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800">
                          {tag.replace('_', ' ').toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Action Widgets */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Intelligence Predictors</h2>
          <Card className="border-t-4 border-t-orange-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex justify-between">
                <span>Co-Parenting Hostility Index</span>
                <LineChart className="w-4 h-4 text-orange-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-1 h-12 mt-2">
                {[12, 18, 15, 25, 45, 60, 85].map((val, i) => (
                  <div key={i} className={`flex-1 rounded-t-sm ${val > 50 ? 'bg-red-500' : val > 20 ? 'bg-orange-400' : 'bg-green-400'}`} style={{ height: `${val}%` }}></div>
                ))}
              </div>
              <p className="text-xs font-semibold text-red-600 mt-3 flex items-center">
                <ShieldAlert className="w-3 h-3 mr-1" /> Severe Escalation Detected
              </p>
              <p className="text-xs text-gray-500 mt-1">Based on 64 OFW messages parsed this week.</p>
            </CardContent>
          </Card>

          <h2 className="text-lg font-semibold text-gray-900 mt-6">Compliance Monitors</h2>
          <Card className="border-t-4 border-t-bridgebox-500">
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between text-sm">
                <span>OurFamilyWizard</span>
                <span className="text-green-600 font-medium">Syncing</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mt-2">
                <Activity className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-500">Last sync: 10 mins ago</span>
              </div>
            </CardContent>
          </Card>
          <Card className={`${alerts.some(a => a.severity === 'critical') ? 'border-t-4 border-t-red-500' : 'border-t-4 border-t-green-500'}`}>
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between text-sm">
                <span>SoberLink Compliance</span>
                <span className={`${alerts.some(a => a.severity === 'critical') ? 'text-red-600' : 'text-green-600'} font-medium`}>
                  {alerts.some(a => a.severity === 'critical') ? 'Failing' : 'Active'}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mt-2">
                <Activity className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-500">1 violation detected</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Opposing Counsel Share Link Modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b flex justify-between items-center bg-slate-50">
              <h3 className="text-lg font-bold text-slate-900">Secure Disclosure Link</h3>
              <button onClick={() => setIsShareModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-8 pb-10">
              <div className="w-16 h-16 bg-bridgebox-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-8 h-8 text-bridgebox-600" />
              </div>
              <h4 className="text-center font-bold text-xl text-slate-900 mb-2">Opposing Counsel Portal Link</h4>
              <p className="text-center text-sm text-slate-500 mb-8 max-w-xs mx-auto">
                Generate a strict, tokenized link allowing external counsel to view *only* explicitly shared discovery exhibits.
              </p>
              
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex items-center gap-3">
                <code className="text-sm text-slate-600 flex-1 truncate font-mono">
                  https://bridgebox.ai/portal/disclosure/vE9xLp2...
                </code>
                <button 
                  onClick={() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-md text-sm font-semibold transition-colors flex items-center"
                >
                  {copied ? 'Copied!' : <><Copy className="w-4 h-4 mr-1" /> Copy</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
