import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { FileText, Download, Wand2, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function FormsEngine() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [matter, setMatter] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedForm, setSelectedForm] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDoc, setGeneratedDoc] = useState(false);

  useEffect(() => {
    async function fetchMatter() {
      if (!id) return;
      const { data } = await supabase.from('matters').select('*').eq('id', id).single();
      if (data) setMatter(data);
      setLoading(false);
    }
    fetchMatter();
  }, [id]);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedDoc(true);
    }, 2000);
  };

  if (loading) return <div className="p-8 text-center text-slate-500 animate-pulse">Loading AI Forms Engine...</div>;
  if (!matter) return <div className="p-8 text-center text-red-500 font-medium">Matter not found.</div>;

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <button onClick={() => navigate(`/app/matter/${id}`)} className="flex items-center text-sm font-medium text-bridgebox-600 mb-2 hover:underline">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to {matter.name}
          </button>
          <h1 className="text-2xl font-bold text-slate-900 font-display">AI Discovery & Subpoena Engine</h1>
          <p className="text-slate-500 mt-1 flex items-center">
            <Wand2 className="w-4 h-4 mr-1 text-bridgebox-500" />
            Auto-populate state court forms using flagged timeline anomalies & Ghost Assets.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-4">
          <Card>
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-sm font-semibold text-slate-700">Form Templates</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="divide-y divide-slate-100">
                {['Subpoena Duces Tecum (Banking)', 'First Interrogatories', 'Request for Production', 'Notice of Deposition'].map(form => (
                  <li 
                    key={form}
                    onClick={() => { setSelectedForm(form); setGeneratedDoc(false); }}
                    className={`px-4 py-3 text-sm cursor-pointer transition-colors border-l-2 ${selectedForm === form ? 'border-bridgebox-500 bg-bridgebox-50 text-bridgebox-900 font-medium' : 'border-transparent text-slate-600 hover:bg-slate-50'}`}
                  >
                    {form}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          {selectedForm ? (
            <Card className="h-full border-bridgebox-200">
              <CardHeader className="bg-slate-50 border-b">
                <CardTitle className="text-lg text-slate-900 font-display flex items-center justify-between">
                  {selectedForm}
                  {!generatedDoc && (
                    <button 
                      onClick={handleGenerate}
                      disabled={isGenerating}
                      className="px-4 py-2 bg-bridgebox-600 text-white text-sm font-bold rounded-md hover:bg-bridgebox-700 disabled:opacity-50 flex items-center shadow-sm shadow-bridgebox-500/20"
                    >
                      {isGenerating ? 'Drafting...' : 'Auto-Generate Form'}
                    </button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                {isGenerating ? (
                  <div className="text-center py-12">
                    <Wand2 className="w-12 h-12 text-bridgebox-400 mx-auto animate-spin" />
                    <p className="mt-4 text-slate-600 font-medium">Extracting financial anomalies and compiling state-specific requests...</p>
                  </div>
                ) : generatedDoc ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Document Drafted Successfully</h3>
                    <p className="text-slate-500 text-sm max-w-sm mx-auto">
                      14 targeted production requests were generated based on the undocumented Chase bank transfers found in the Ghost Asset queue.
                    </p>
                    <button className="mt-4 px-6 py-3 bg-slate-900 text-white text-sm font-bold rounded-md hover:bg-slate-800 inline-flex items-center shadow-md">
                      <Download className="w-4 h-4 mr-2" /> Download Document (.docx)
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-12 text-slate-400">
                    <FileText className="w-16 h-16 mx-auto mb-4 opacity-20" />
                    <p>Select "Auto-Generate" to populate the template with intelligence from the active matter profile.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="h-full border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-500">
              Select a template to begin compilation.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
