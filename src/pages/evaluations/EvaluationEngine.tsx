import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { ArrowLeft, UserCircle, Calendar, CheckCircle2, Clock, AlertTriangle, FileText } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function EvaluationEngine() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [matter, setMatter] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMatter() {
      if (!id) return;
      const { data } = await supabase.from('matters').select('*').eq('id', id).single();
      if (data) setMatter(data);
      setLoading(false);
    }
    fetchMatter();
  }, [id]);

  if (loading) return <div className="p-8 text-center text-slate-500 animate-pulse">Loading Evaluation Tracker...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <button onClick={() => navigate(`/app/matter/${id}`)} className="flex items-center text-sm font-medium text-bridgebox-600 mb-2 hover:underline">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to {matter?.name}
          </button>
          <h1 className="text-2xl font-bold text-slate-900 font-display">Evaluation & Expert Pipeline</h1>
          <p className="text-slate-500 mt-1 flex items-center">
            <UserCircle className="w-4 h-4 mr-1 text-bridgebox-500" />
            Track 604.10(b) Custody Evals, Financial Audits, and GAL investigations.
          </p>
        </div>
        <button className="px-4 py-2 bg-slate-900 text-white rounded-md text-sm font-semibold hover:bg-slate-800">
          Order New Evaluation
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Active Evaluation Card */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="bg-slate-50 border-b p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 bg-bridgebox-100 text-bridgebox-800 rounded-full text-xs font-bold border border-bridgebox-200 uppercase tracking-wider">604.10(b) Custody</span>
                <span className="text-sm font-semibold text-slate-900">Dr. Alan Peterson, Psy.D</span>
              </div>
              <p className="text-sm text-slate-500">Ordered by Hon. Judge Smith • Cost Split 50/50 • Retainer $10,000</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-3 py-1.5 bg-white border rounded-md text-sm font-semibold text-slate-700 hover:bg-slate-50 flex items-center">
                <FileText className="w-4 h-4 mr-1 text-slate-400" /> View Order
              </button>
              <button className="px-3 py-1.5 bg-white border rounded-md text-sm font-semibold text-bridgebox-700 hover:bg-bridgebox-50 flex items-center">
                <Calendar className="w-4 h-4 mr-1 text-bridgebox-400" /> Schedule Interview
              </button>
            </div>
          </div>

          <div className="p-8">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Procedural Milestones</h4>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
              
              {/* Step 1 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-green-500 bg-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="font-bold text-slate-900 text-sm">Retainer Paid</h5>
                    <span className="text-xs font-medium text-slate-400">March 1st, 2026</span>
                  </div>
                  <p className="text-sm text-slate-600">Both parties remitted $5,000 to Dr. Peterson's trust account.</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-green-500 bg-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="font-bold text-slate-900 text-sm">Intake Questionnaires</h5>
                    <span className="text-xs font-medium text-slate-400">March 10th, 2026</span>
                  </div>
                  <p className="text-sm text-slate-600">MMPI-3 and standard intake forms completed by both parents.</p>
                </div>
              </div>

              {/* Step 3 (Current) */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-bridgebox-500 bg-bridgebox-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 animate-pulse">
                  <Clock className="w-4 h-4 text-bridgebox-600" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl border-2 border-bridgebox-300 shadow-md">
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="font-bold text-bridgebox-900 text-sm">Clinical Interviews</h5>
                    <span className="text-xs font-bold text-bridgebox-600 uppercase">Awaiting Action</span>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">Party B has not scheduled their mandatory 2-hour clinical interview.</p>
                  <button className="text-xs font-semibold px-3 py-1.5 bg-bridgebox-100 text-bridgebox-700 hover:bg-bridgebox-200 rounded border border-bridgebox-200 transition-colors">Draft 214 Compliance Letter</button>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-slate-200 bg-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-dashed border-slate-300 bg-slate-50/50 opacity-70">
                  <h5 className="font-bold text-slate-500 text-sm">Collateral Observations</h5>
                  <p className="text-sm text-slate-400">Home visits and child observations to be scheduled.</p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-slate-200 bg-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-dashed border-slate-300 bg-slate-50/50 opacity-70">
                  <h5 className="font-bold text-slate-500 text-sm">Final Report Issued</h5>
                  <p className="text-sm text-slate-400">Target release 60 days post-interviews.</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
