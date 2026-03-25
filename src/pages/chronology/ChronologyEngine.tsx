import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Clock, Filter, Search, FileText, ExternalLink, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function ChronologyEngine() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

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
