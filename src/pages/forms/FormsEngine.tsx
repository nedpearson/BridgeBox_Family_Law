import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { FileText, Download, Wand2, ArrowLeft, Bot, AlertTriangle, Play, Loader2, Sparkles, Copy, Check } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const MOCK_ANOMALIES = [
  { id: 1, type: 'financial', text: 'Unexplained $45,000 transfer to offshore shell (Jan 12)', selected: true },
  { id: 2, type: 'custody', text: 'Failed GPS check-in during custody exchange (Feb 4)', selected: true },
  { id: 3, type: 'compliance', text: 'Missed Soberlink Breathalyzer (Mar 1)', selected: false },
];

const MOCK_LLM_RESPONSE = `REQUEST FOR PRODUCTION OF DOCUMENTS

TO: OPPOSING PARTY
FROM: PEARSON LEGAL GROUP

You are hereby requested to produce the following designated documents within 28 days for inspection and copying:

REQUEST NO. 1: Complete and unredacted bank statements, wire transfer receipts, and swift confirmation codes for the offshore entity associated with the $45,000 outgoing transfer logged on January 12th.

REQUEST NO. 2: All Geolocation metadata, text messages, and Uber receipts surrounding the failed custody exchange at the designated police station on February 4th.

REQUEST NO. 3: Proof of compliance and device calibration logs for all Soberlink breathalyzer devices registered to the Respondent.

Pursuant to local rules, failure to produce these documents will result in an immediate Motion to Compel and request for sanctions.`;

export default function FormsEngine() {
  const { id } = useParams();
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  const [matter, setMatter] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const [anomalies, setAnomalies] = useState(MOCK_ANOMALIES);
  const [isDrafting, setIsDrafting] = useState(false);
  const [draftedText, setDraftedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchMatter() {
      if (!id) return;
      const { data } = await supabase.from('matters').select('*').eq('id', id).single();
      if (data) setMatter(data);
      setLoading(false);
    }
    fetchMatter();
  }, [id]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [draftedText]);

  const toggleAnomaly = (aid: number) => {
    setAnomalies(prev => prev.map(a => a.id === aid ? { ...a, selected: !a.selected } : a));
  };

  const handleGenerate = () => {
    setIsDrafting(true);
    setDraftedText('');
    setIsComplete(false);
    
    let currentIndex = 0;
    const words = MOCK_LLM_RESPONSE.split(' ');
    
    const interval = setInterval(() => {
      if (currentIndex < words.length) {
        setDraftedText(prev => prev + (prev.length ? ' ' : '') + words[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(interval);
        setIsDrafting(false);
        setIsComplete(true);
      }
    }, 40); // 40ms per word simulates streaming speed
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(draftedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) return <div className="p-8 text-center text-slate-500 animate-pulse">Initializing LLM Form Engine...</div>;
  if (!matter) return <div className="p-8 text-center text-red-500 font-medium">Matter not found.</div>;

  const selectedCount = anomalies.filter(a => a.selected).length;

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] p-6 bg-slate-50 relative overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 shrink-0">
        <div>
          <button onClick={() => navigate(`/app/matter/${id}`)} className="flex items-center text-sm font-bold text-bridgebox-600 mb-1 hover:underline">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to {matter.name}
          </button>
          <h1 className="text-2xl font-bold text-slate-900 font-display flex items-center">
            <Sparkles className="w-6 h-6 mr-2 text-indigo-500" /> Generative AI Discovery
          </h1>
        </div>
      </div>

      <div className="flex flex-1 gap-6 overflow-hidden">
        {/* Left Sidebar: Context Vector Injection */}
        <div className="w-1/3 flex flex-col gap-4 overflow-y-auto pr-2">
          <Card className="border-indigo-100 shadow-md">
            <CardHeader className="bg-indigo-50/50 border-b border-indigo-100 pb-4">
              <CardTitle className="text-sm font-bold text-indigo-900 flex items-center">
                <AlertTriangle className="w-4 h-4 mr-2 text-indigo-500" /> Detected Timeline Anomalies
              </CardTitle>
              <p className="text-xs text-indigo-600/80 mt-1 font-medium">Select the infractions to inject into the LLM context window.</p>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="divide-y divide-slate-100">
                {anomalies.map(anomaly => (
                  <li 
                    key={anomaly.id}
                    onClick={() => toggleAnomaly(anomaly.id)}
                    className={`p-4 cursor-pointer transition-colors flex items-start gap-3 hover:bg-slate-50 ${anomaly.selected ? 'bg-indigo-50/30' : ''}`}
                  >
                    <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${anomaly.selected ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300'}`}>
                      {anomaly.selected && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <div>
                      <span className={`text-xs font-bold uppercase tracking-widest ${anomaly.type === 'financial' ? 'text-emerald-600' : anomaly.type === 'custody' ? 'text-orange-600' : 'text-blue-600'}`}>
                        {anomaly.type}
                      </span>
                      <p className={`text-sm mt-1 leading-snug ${anomaly.selected ? 'text-slate-900 font-medium' : 'text-slate-500'}`}>{anomaly.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="p-6 bg-slate-900 text-white relative overflow-hidden shadow-xl mt-auto items-center justify-center flex flex-col shrink-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent"></div>
            <Bot className="w-8 h-8 text-indigo-400 mb-3" />
            <h3 className="font-bold text-lg text-white text-center">Draft Request for Production</h3>
            <p className="text-sm text-slate-400 text-center mt-2 mb-6">Injects {selectedCount} vector(s) into prompt</p>
            <button 
              onClick={handleGenerate}
              disabled={isDrafting || selectedCount === 0}
              className="w-full py-3 bg-indigo-500 hover:bg-indigo-400 text-white font-bold rounded-xl shadow-[0_0_15px_rgba(99,102,241,0.4)] disabled:opacity-50 disabled:shadow-none flex items-center justify-center transition-all active:scale-95"
            >
              {isDrafting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Drafting...</> : <><Play className="w-4 h-4 mr-2" /> Start Generation</>}
            </button>
          </Card>
        </div>

        {/* Right Area: LLM Streaming View */}
        <div className="w-2/3 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden relative">
          <div className="h-14 bg-slate-50 border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isDrafting ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`}></div>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Bridgebox Legal LLM-7B</span>
            </div>
            {isComplete && (
               <div className="flex gap-2">
                 <button onClick={copyToClipboard} className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded hover:bg-slate-50 flex items-center transition-colors">
                   {copied ? <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 mr-1.5" />} {copied ? 'Copied' : 'Copy'}
                 </button>
                 <button className="px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded hover:bg-slate-800 flex items-center shadow-sm">
                   <Download className="w-3.5 h-3.5 mr-1.5" /> Export .docx
                 </button>
               </div>
            )}
          </div>
          
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 font-serif text-lg leading-relaxed text-slate-800 whitespace-pre-wrap selection:bg-indigo-200">
            {!draftedText && !isDrafting && (
              <div className="h-full flex flex-col items-center justify-center text-slate-400">
                <FileText className="w-16 h-16 mb-4 opacity-20" />
                <p className="font-sans font-medium text-sm">Awaiting context injection...</p>
              </div>
            )}
            {draftedText}
            {isDrafting && <span className="inline-block w-2 h-5 bg-indigo-500 ml-1 animate-pulse align-middle"></span>}
          </div>
        </div>
      </div>
    </div>
  );
}
