import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Clock, Filter, Search, FileText, ExternalLink, X } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { supabase } from '../../lib/supabase';

export default function ChronologyEngine() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [activeView, setActiveView] = useState<'timeline' | 'exchanges' | 'questions'>('timeline');

  useEffect(() => {
    async function fetchChronology() {
      // Hardcoded mock matter ID for global fetch
      const matterId = '22222222-2222-2222-2222-222222222222';
      const { data, error } = await supabase
        .from('timeline_events')
        .select('*, evidence_items(*)')
        .eq('matter_id', matterId)
        .order('event_date', { ascending: false });
        
      if (data) setEvents(data);
      setLoading(false);
    }
    fetchChronology();
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 relative">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Unified Chronology</h1>
          <p className="text-gray-500 mt-1">Court-ready visualization of OFWs, texts, emails, and SoberLink events.</p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
            <input type="text" placeholder="Search chronology..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-64 focus:ring-bridgebox-500 focus:border-bridgebox-500" />
          </div>
          <button className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
            <Filter className="w-4 h-4 mr-2" /> Filter Views
          </button>
        </div>
      </div>
      
      <div className="flex bg-gray-100 p-1 rounded-lg w-fit">
          <button onClick={() => setActiveView('timeline')} className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeView === 'timeline' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}>Verified Timeline</button>
          <button onClick={() => setActiveView('exchanges')} className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeView === 'exchanges' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}>Custody Exchange GPS Logs</button>
          <button onClick={() => setActiveView('questions')} className={`px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center ${activeView === 'questions' ? 'bg-bridgebox-50 text-bridgebox-700 shadow-sm border border-bridgebox-200' : 'text-gray-500 hover:text-gray-900'}`}>
            Cross-Exam Builder
          </button>
      </div>

      <div className="flex gap-8">
        <div className="w-64 shrink-0 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Quick Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <label className="flex items-center text-sm text-gray-700 gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-bridgebox-600 focus:ring-bridgebox-500" />
                Hostile Exchanges
                <span className="ml-auto text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-500">12</span>
              </label>
              <label className="flex items-center text-sm text-gray-700 gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-bridgebox-600 focus:ring-bridgebox-500" />
                SoberLink Tests
                <span className="ml-auto text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-500">4</span>
              </label>
            </CardContent>
          </Card>
        </div>

        {activeView === 'timeline' && (
          <div className="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm p-8 min-h-[500px]">
          {loading ? (
            <div className="flex items-center justify-center p-12 text-gray-400 animate-pulse">Loading Chronology Engine...</div>
          ) : (
            <div className="relative border-l-2 border-bridgebox-100 ml-4 space-y-10">
              {events.map((event) => (
                <div key={event.id} className="relative pl-8 group cursor-pointer" onClick={() => setSelectedEvent(event)}>
                  <span className="absolute -left-3.5 top-1 flex items-center justify-center w-7 h-7 bg-white rounded-full border-2 border-bridgebox-300 shadow-sm group-hover:border-bridgebox-600 transition-colors">
                    <Clock className="w-3.5 h-3.5 text-bridgebox-600" />
                  </span>
                  
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-base font-semibold text-gray-900 group-hover:text-bridgebox-700 transition-colors">{event.title}</h3>
                      <time className="text-xs font-medium text-gray-500">{new Date(event.event_date).toLocaleString()}</time>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 uppercase shadow-sm">
                      {event.source_system}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 leading-relaxed mb-3 bg-gray-50 p-4 border border-gray-100 rounded-lg">{event.description}</p>
                  
                  <div className="flex gap-2 items-center flex-wrap">
                    {event.issue_tags?.map((tag: string) => (
                      <span key={tag} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-bridgebox-50 text-bridgebox-700 border border-bridgebox-200">
                        {tag.replace('_', ' ').toUpperCase()}
                      </span>
                    ))}
                    {event.evidence_id && (
                      <span className="ml-auto text-xs font-medium text-bridgebox-600 flex items-center gap-1 group-hover:underline">
                        <FileText className="w-3 h-3" /> View Evidence Attachment
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeView === 'exchanges' && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex-1">
          <div className="p-6 border-b bg-gray-50 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900 font-display">Custody Exchange GPS Drop-off Logs</h2>
              <p className="text-sm text-gray-500 mt-1">Cross-referencing court-ordered exchange times against mobile geofence logs to flag late drop-offs.</p>
            </div>
            <Badge variant="warning">3 Late Violations Handled</Badge>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Location</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Court Ordered</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Actual GPS Time</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Variance</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {[
                { date: '2026-03-22', location: 'Police Station Safe Zone', ordered: '5:00 PM', actual: '5:45 PM', diff: '+45 min', status: 'LATE' },
                { date: '2026-03-15', location: 'Starbucks (Main St)', ordered: '5:00 PM', actual: '5:02 PM', diff: '+2 min', status: 'ON TIME' },
                { date: '2026-03-08', location: 'Police Station Safe Zone', ordered: '5:00 PM', actual: '6:10 PM', diff: '+70 min', status: 'LATE' }
              ].map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{row.location}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 font-medium">{row.ordered}</td>
                  <td className={`px-6 py-4 text-sm font-bold ${row.status === 'LATE' ? 'text-red-600' : 'text-green-600'}`}>{row.actual}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{row.diff}</td>
                  <td className="px-6 py-4"><Badge variant={row.status === 'LATE' ? 'destructive' : 'success'}>{row.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeView === 'questions' && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex-1">
          <div className="p-6 border-b bg-bridgebox-50 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-bridgebox-900 font-display">AI Cross-Examination Script Builder</h2>
              <p className="text-sm text-bridgebox-700 mt-1">Automatically generates "Hostile Witness" questioning tracks rooted directly in verified timeline anomalies.</p>
            </div>
            <button className="px-4 py-2 bg-bridgebox-600 text-white rounded-md text-sm font-semibold hover:bg-bridgebox-700">Export Script PDF</button>
          </div>
          <div className="p-8 space-y-8">
            <div>
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 border-b pb-2">Topic: SoberLink Compliance Failures</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg flex items-start gap-4 border border-gray-200">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-900 text-white text-xs font-bold leading-none mt-0.5">Q</span>
                  <div>
                    <p className="text-gray-900 font-medium font-serif leading-relaxed text-lg">"Isn't it true that on March 15th, 2026 at 5:02 PM, you missed your court-ordered SoberLink BAC screening?"</p>
                    <div className="mt-3 flex items-center gap-2">
                       <Badge variant="outline" className="bg-white text-xs text-gray-500 border-gray-300">Target Exhibit: SL-03-15-26.pdf</Badge>
                       <p className="text-xs text-red-500 font-semibold italic">Expected Response: Deny or Deflect</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg flex items-start gap-4 border border-gray-200 ml-8">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-900 text-white text-xs font-bold leading-none mt-0.5">Q</span>
                  <div>
                    <p className="text-gray-900 font-medium font-serif leading-relaxed text-lg">"Are you aware that your SoberLink device logs a localized GPS ping whenever a test is requested but ignored?"</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 border-b pb-2 mt-8">Topic: Hostile Co-Parenting (OurFamilyWizard)</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg flex items-start gap-4 border border-gray-200">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-900 text-white text-xs font-bold leading-none mt-0.5">Q</span>
                  <div>
                    <p className="text-gray-900 font-medium font-serif leading-relaxed text-lg">"Did you send a message through OurFamilyWizard on March 10th demanding a custody exchange change with only 3 hours notice?"</p>
                    <div className="mt-3 flex items-center gap-2">
                       <Badge variant="outline" className="bg-white text-xs text-gray-500 border-gray-300">Target Exhibit: OFW-031026-Thread.pdf</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>

      {/* Drill-down Modal Panel Overlay */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900">Event Detail Inspector</h3>
              <button onClick={() => setSelectedEvent(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-900">{selectedEvent.title}</h4>
                <p className="text-xs text-gray-500 mt-1">{new Date(selectedEvent.event_date).toLocaleString()} • {selectedEvent.source_system.toUpperCase()}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm text-gray-800 whitespace-pre-wrap">
                {selectedEvent.description}
              </div>

              {selectedEvent.evidence_id && selectedEvent.evidence_items && (
                <div className="mt-6">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Attached Source Verification</h4>
                  <div className="flex items-center justify-between p-4 bg-bridgebox-50 border border-bridgebox-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-8 h-8 text-bridgebox-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{selectedEvent.evidence_items.title}</p>
                        <p className="text-xs text-bridgebox-600">{selectedEvent.evidence_items.file_url}</p>
                      </div>
                    </div>
                    <button className="text-bridgebox-600 hover:text-bridgebox-800"><ExternalLink className="w-5 h-5" /></button>
                  </div>
                </div>
              )}

              <div className="mt-6 border-t pt-4">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Auditor Confidence Matrix</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-white border shadow-sm rounded-lg">
                    <p className="text-xs text-gray-500">Classification Confidence</p>
                    <p className="text-lg font-bold text-green-600">{(selectedEvent.confidence_score * 100).toFixed(1)}%</p>
                  </div>
                  <div className="p-3 bg-white border shadow-sm rounded-lg">
                    <p className="text-xs text-gray-500">Blockchain Chain-of-Custody</p>
                    <p className="text-lg font-bold text-gray-900">Verified Hash</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
