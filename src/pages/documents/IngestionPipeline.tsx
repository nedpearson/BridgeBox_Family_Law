import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FileText, Activity, BrainCircuit, CheckCircle2, 
  ArrowLeft, Cpu, Database, Network
} from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';

export default function IngestionPipeline() {
  const { id } = useParams();
  
  // Simulated Pipeline State
  const [pipelineState, setPipelineState] = useState(0);
  
  useEffect(() => {
    // Stage 1: OCR & Text Extraction (2s)
    const t1 = setTimeout(() => setPipelineState(1), 2000);
    // Stage 2: Entity & Account Resolution (4s)
    const t2 = setTimeout(() => setPipelineState(2), 6000);
    // Stage 3: Chronology Mapping (6s)
    const t3 = setTimeout(() => setPipelineState(3), 12000);
    // Stage 4: Complete
    const t4 = setTimeout(() => setPipelineState(4), 16000);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  const stages = [
    { 
      title: "OCR & Deep Text Extraction", 
      desc: "Reading 482 pages of structured and unstructured PDF data",
      icon: <FileText className="w-5 h-5" />,
      color: "blue"
    },
    { 
      title: "Entity & Semantic Resolution", 
      desc: "Identifying hidden accounts, property addresses, and child-related expenses",
      icon: <Cpu className="w-5 h-5" />,
      color: "indigo"
    },
    { 
      title: "Transaction & Chronology Mapping", 
      desc: "Aligning 1,482 debit/credit events into the Master Timeline",
      icon: <Network className="w-5 h-5" />,
      color: "emerald"
    },
    { 
      title: "Forensic Vault Encryption", 
      desc: "Sealing artifacts using AES-256 for courtroom admittance",
      icon: <Database className="w-5 h-5" />,
      color: "bridgebox"
    }
  ];

  return (
    <div className="flex-1 overflow-auto bg-slate-50 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Navigation */}
        <div className="flex items-center gap-4 mb-8">
          <Link to={`/app/matters/${id || 'mrt-882'}`} className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-500">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold flex items-center text-slate-900">
              <BrainCircuit className="w-6 h-6 mr-3 text-bridgebox-600" />
              Bridgebox AI Processing Matrix
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Currently ingesting: <strong className="text-slate-700">Wells_Fargo_Master_Statements_2021_2024.pdf (482 pages)</strong>
            </p>
          </div>
          
          <div className="ml-auto">
             <div className="flex items-center px-4 py-2 bg-slate-900 border border-slate-700 rounded-full shadow-lg">
                <Activity className="w-4 h-4 text-emerald-400 mr-2 animate-pulse" />
                <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">
                  {pipelineState === 4 ? "Idle" : "Compute Active"}
                </span>
             </div>
          </div>
        </div>

        {/* Global Progress Bar */}
        <Card className="mb-8 border-none shadow-xl bg-slate-950 overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900 to-slate-950"></div>
          <CardContent className="p-8 relative z-10">
            <div className="flex justify-between items-end mb-4">
               <div>
                 <h3 className="text-lg font-bold text-white mb-1">Total Ingestion Progress</h3>
                 <p className="text-sm text-slate-400">GPU Cluster: Tensor-4x • Latency: 42ms</p>
               </div>
               <div className="text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-bridgebox-400 to-emerald-400">
                 {pipelineState === 0 ? "14%" : pipelineState === 1 ? "42%" : pipelineState === 2 ? "87%" : pipelineState === 3 ? "98%" : "100%"}
               </div>
            </div>
            
            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: "0%" }}
                 animate={{ width: pipelineState === 0 ? "14%" : pipelineState === 1 ? "42%" : pipelineState === 2 ? "87%" : pipelineState === 3 ? "98%" : "100%" }}
                 transition={{ duration: 1.5, ease: "easeOut" }}
                 className="h-full bg-gradient-to-r from-bridgebox-500 to-emerald-400 relative"
               >
                 {pipelineState < 4 && (
                   <div className="absolute inset-0 w-full h-full bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem] animate-[stripes_1s_linear_infinite]"></div>
                 )}
               </motion.div>
            </div>
          </CardContent>
        </Card>

        {/* Stage Nodes */}
        <div className="space-y-4">
          {stages.map((stage, idx) => {
            const isActive = pipelineState === idx;
            const isComplete = pipelineState > idx;
            const isPending = pipelineState < idx;

            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`flex border rounded-2xl p-6 transition-all duration-500 bg-white ${
                  isActive 
                    ? 'border-bridgebox-400 shadow-[0_0_30px_rgba(2,132,199,0.1)] scale-[1.02]' 
                    : isComplete 
                      ? 'border-emerald-200' 
                      : 'border-slate-200 opacity-60'
                }`}
              >
                <div className="mr-6 flex-shrink-0 flex flex-col items-center">
                   <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 ${
                     isActive ? 'border-bridgebox-500 bg-bridgebox-50 text-bridgebox-600 shadow-inner' :
                     isComplete ? 'border-emerald-500 bg-emerald-50 text-emerald-600' :
                     'border-slate-200 bg-slate-50 text-slate-400'
                   }`}>
                     {isComplete ? <CheckCircle2 className="w-6 h-6" /> : stage.icon}
                   </div>
                   {idx !== stages.length - 1 && (
                     <div className={`w-0.5 h-full min-h-[4rem] mt-2 ${isComplete ? 'bg-emerald-500' : 'bg-slate-200'}`}></div>
                   )}
                </div>
                
                <div className="flex-1 pb-4">
                   <div className="flex justify-between items-start mb-2">
                     <h3 className={`text-lg font-bold ${isActive ? 'text-gray-900' : isComplete ? 'text-emerald-900' : 'text-slate-500'}`}>
                       {stage.title}
                     </h3>
                     
                     <div className="flex items-center space-x-2">
                       {isActive && (
                         <span className="flex items-center text-xs font-bold text-bridgebox-600 bg-bridgebox-50 px-3 py-1 rounded-full border border-bridgebox-100 animate-pulse">
                           <Activity className="w-3 h-3 mr-1.5" /> PROCESSING
                         </span>
                       )}
                       {isComplete && (
                         <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                           <CheckCircle2 className="w-3 h-3 mr-1.5" /> COMPLETE
                         </span>
                       )}
                       {isPending && (
                         <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                           QUEUED
                         </span>
                       )}
                     </div>
                   </div>
                   
                   <p className="text-sm text-slate-600 mb-4">{stage.desc}</p>

                   {/* Micro-metrics for Active State */}
                   {isActive && (
                     <motion.div 
                       initial={{ opacity: 0, height: 0 }}
                       animate={{ opacity: 1, height: 'auto' }}
                       className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex gap-4"
                     >
                        <div className="flex-1">
                          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Throughput</p>
                          <p className="text-sm font-mono text-slate-800">24.5 pages/sec</p>
                        </div>
                        <div className="flex-1 border-l pl-4">
                          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Tokens Streamed</p>
                          <p className="text-sm font-mono text-slate-800 tracking-wider">{(Math.random() * 80000 + 20000).toFixed(0)}</p>
                        </div>
                        <div className="flex-1 border-l pl-4">
                          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Confidence Score</p>
                          <p className="text-sm font-mono text-emerald-600 font-bold">99.8%</p>
                        </div>
                     </motion.div>
                   )}

                   {/* Success Output for Completed State */}
                   {isComplete && idx === 1 && (
                     <div className="flex gap-2 mt-2">
                       <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">14 Accounts Found</span>
                       <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">8 Properties Found</span>
                     </div>
                   )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Global Action */}
        <div className="mt-8 flex justify-end">
          <Link 
            to={`/app/matters/${id || 'mrt-882'}/financials`}
            className={`px-8 py-3 rounded-xl font-bold text-white transition-all shadow-lg ${
              pipelineState === 4 
                ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/30' 
                : 'bg-slate-300 cursor-not-allowed text-slate-500 shadow-none'
            }`}
          >
            {pipelineState === 4 ? "Review Extracted Forensics" : "Awaiting Matrix Authorization..."}
          </Link>
        </div>

      </div>
    </div>
  );
}
