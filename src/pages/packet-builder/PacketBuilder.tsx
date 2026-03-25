import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { FileText, Download, CheckSquare, Clock, ArrowLeft } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function PacketBuilder() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [matter, setMatter] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPacketData() {
      if (!id) return;
      const [matterRes, eventsRes] = await Promise.all([
        supabase.from('matters').select('*').eq('id', id).single(),
        supabase.from('timeline_events').select('*').eq('matter_id', id).order('event_date', { ascending: false })
      ]);
      
      if (matterRes.data) setMatter(matterRes.data);
      if (eventsRes.data) setEvents(eventsRes.data);
      setLoading(false);
    }
    fetchPacketData();
  }, [id]);

  const toggleSelect = (eventId: string) => {
    const next = new Set(selectedItems);
    if (next.has(eventId)) next.delete(eventId);
    else next.add(eventId);
    setSelectedItems(next);
  };

  const handleGeneratePDF = () => {
    alert(`Assembling ${selectedItems.size} verified artifacts into a secure PDF bundle...`);
  };

  if (loading) return <div className="p-8 text-center text-gray-500 animate-pulse">Loading Assembler...</div>;
  if (!matter) return <div className="p-8 text-center text-red-500 font-medium">Matter not found.</div>;

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <button onClick={() => navigate(`/app/matter/${id}`)} className="flex items-center text-sm font-medium text-bridgebox-600 mb-2 hover:underline">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to {matter.name}
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Hearing Packet Builder</h1>
          <p className="text-gray-500 mt-1">Select structured timeline events and financial records to compile into a court-ready exhibit index.</p>
        </div>
        <button 
          onClick={handleGeneratePDF}
          disabled={selectedItems.size === 0}
          className="px-4 py-2 bg-bridgebox-600 border border-transparent text-white rounded-md text-sm font-medium hover:bg-bridgebox-700 shadow-sm flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="w-4 h-4 mr-2" />
          Compile PDF Packet ({selectedItems.size})
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-bridgebox-500" /> Source Selection Engine
            </CardTitle>
          </CardHeader>
          <CardContent>
            {events.length === 0 ? (
              <p className="text-sm text-gray-500 py-4 text-center">No timeline events available for assembly.</p>
            ) : (
              <ul className="divide-y divide-gray-100 border-t mt-4">
                {events.map((e) => (
                  <li key={e.id} className="py-4 flex items-start gap-4">
                    <input 
                      type="checkbox" 
                      className="mt-1 h-4 w-4 rounded text-bridgebox-600 focus:ring-bridgebox-500 border-gray-300"
                      checked={selectedItems.has(e.id)}
                      onChange={() => toggleSelect(e.id)}
                    />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="text-sm font-medium text-gray-900">{e.title}</h4>
                        <span className="text-xs text-gray-500 font-medium flex items-center bg-gray-100 px-2 py-0.5 rounded-full"><Clock className="w-3 h-3 mr-1" /> {new Date(e.event_date).toLocaleDateString()}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 break-words">{e.description}</p>
                      <div className="mt-2 flex gap-2">
                        {e.issue_tags?.map((tag: string) => (
                          <span key={tag} className="text-[10px] uppercase font-bold text-orange-600 bg-orange-50 border border-orange-100 px-1.5 py-0.5 rounded">
                            {tag.replace('_', ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
