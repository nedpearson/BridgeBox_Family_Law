import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Maximize2, FileText, ChevronLeft, ChevronRight, 
  Clock, Map, Scale, ShieldAlert, MonitorPlay 
} from 'lucide-react';

export default function PresentationMode() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'exhibit' | 'timeline' | 'assets'>('exhibit');
  const [currentSlide, setCurrentSlide] = useState(1);

  // Mock Evidence
  const totalSlides = 3;

  const handleExit = () => {
    navigate(`/app/matter/${id || 'mrt-882'}`);
  };

  const nextSlide = () => setCurrentSlide(prev => Math.min(prev + 1, totalSlides));
  const prevSlide = () => setCurrentSlide(prev => Math.max(prev - 1, 1));

  return (
    <div className="fixed inset-0 bg-slate-950 text-slate-100 flex flex-col z-[100] overflow-hidden selection:bg-emerald-500/30">
      
      {/* Immersive Header */}
      <header className="h-20 border-b border-white/10 bg-black/40 backdrop-blur-xl flex items-center justify-between px-8 select-none">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-full border border-emerald-500/20">
            <MonitorPlay className="w-4 h-4 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest">Live Presentation</span>
          </div>
          <div className="h-6 w-px bg-white/10"></div>
          <div>
            <h1 className="text-xl font-bold font-display text-white tracking-tight">Pearson vs Pearson</h1>
            <p className="text-xs font-medium text-slate-400">File No: FF-2024-88A9 • Hon. Judge Martinez</p>
          </div>
        </div>

        {/* Touch-optimized Navigation Pills */}
        <div className="flex items-center gap-2 bg-black/40 p-1 rounded-2xl border border-white/5">
          <button 
            onClick={() => setActiveTab('exhibit')}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center ${activeTab === 'exhibit' ? 'bg-white text-slate-900 shadow-lg scale-105' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <FileText className="w-4 h-4 mr-2" /> Exhibits
          </button>
          <button 
            onClick={() => setActiveTab('timeline')}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center ${activeTab === 'timeline' ? 'bg-white text-slate-900 shadow-lg scale-105' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <Clock className="w-4 h-4 mr-2" /> Chronology
          </button>
          <button 
            onClick={() => setActiveTab('assets')}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center ${activeTab === 'assets' ? 'bg-white text-slate-900 shadow-lg scale-105' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <Map className="w-4 h-4 mr-2" /> Asset Map
          </button>
        </div>

        <button 
          onClick={handleExit}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all"
        >
          <X className="w-6 h-6" />
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative flex items-center justify-center p-8">
        
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black pointer-events-none"></div>

        <AnimatePresence mode="wait">
          {activeTab === 'exhibit' && (
            <motion.div 
              key="exhibit"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, type: 'spring' }}
              className="w-full h-full max-w-6xl bg-white rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col"
            >
              <div className="h-14 bg-slate-100 border-b flex items-center justify-between px-6">
                <div className="flex items-center gap-3">
                   <div className="w-3 h-3 rounded-full bg-red-400"></div>
                   <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                   <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                </div>
                <h3 className="text-slate-700 font-bold font-mono">Exhibit_A_Wells_Fargo_Q3.pdf</h3>
                <button className="text-slate-500 hover:text-slate-900"><Maximize2 className="w-5 h-5" /></button>
              </div>
              <div className="flex-1 bg-slate-200 p-8 flex items-center justify-center relative">
                 {/* Mock Document Page */}
                 <div className="bg-white w-full max-w-3xl h-full shadow-lg p-12 text-slate-800 font-serif flex flex-col">
                    <div className="border-b-2 border-slate-900 pb-4 mb-8 flex items-center justify-between">
                       <div>
                         <h2 className="text-2xl font-bold uppercase tracking-widest">Wells Fargo</h2>
                         <p className="text-sm">Account Summary: Oct 1 - Dec 31</p>
                       </div>
                       <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Wells_Fargo_Bank.svg/512px-Wells_Fargo_Bank.svg.png" className="h-8 grayscale opacity-50" alt="WF" />
                    </div>
                    
                    <div className="flex-1">
                      {currentSlide === 1 && (
                        <div className="space-y-6">
                          <p className="p-4 bg-red-50 border-l-4 border-red-500 text-lg">
                            <strong className="text-red-700">10/14/2023</strong>: Wire Transfer OUT - $45,000.00 (Cayman Securities LLC)
                          </p>
                          <p className="p-4 bg-slate-50 border-l-4 border-slate-300">
                            <strong>10/16/2023</strong>: Deposit - $4,200.00 (Salary)
                          </p>
                          <p className="p-4 bg-slate-50 border-l-4 border-slate-300">
                            <strong>10/22/2023</strong>: Debit - $850.00 (Automotive)
                          </p>
                        </div>
                      )}
                      {currentSlide === 2 && (
                        <div className="space-y-6">
                           <h3 className="text-xl font-bold mb-4">Admitted Evidence Focus</h3>
                           <div className="border-4 border-red-500 p-6 relative">
                              <span className="absolute -top-3 left-4 bg-red-500 text-white font-bold px-2 py-0.5 text-xs">DISPUTED TRANSACTION</span>
                              <p className="text-2xl font-mono">11/02/2023: W/D - $12,500.00</p>
                              <p className="text-sm mt-2 font-sans italic text-slate-500">Note: Matches exact target property downpayment window.</p>
                           </div>
                        </div>
                      )}
                      {currentSlide === 3 && (
                        <div className="flex flex-col items-center justify-center h-full opacity-50">
                           <ShieldAlert className="w-16 h-16 mb-4" />
                           <p className="text-2xl font-bold">End of Exhibit A</p>
                        </div>
                      )}
                    </div>
                 </div>
                 
                 {/* Floating Navigation Controls */}
                 <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md rounded-full border border-white/20 p-2 flex items-center gap-4 shadow-2xl">
                    <button 
                      onClick={prevSlide} disabled={currentSlide === 1}
                      className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white disabled:opacity-30 disabled:hover:bg-white/10 transition-all"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <span className="text-white font-bold font-mono tracking-widest text-lg w-16 text-center">
                      {currentSlide} / {totalSlides}
                    </span>
                    <button 
                      onClick={nextSlide} disabled={currentSlide === totalSlides}
                      className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white disabled:opacity-30 disabled:hover:bg-white/10 transition-all"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                 </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'timeline' && (
            <motion.div 
              key="timeline"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, type: 'spring' }}
              className="w-full max-w-5xl text-center"
            >
               <Scale className="w-24 h-24 mx-auto text-bridgebox-500 mb-8 opacity-50" />
               <h2 className="text-5xl font-display font-bold text-white mb-6">Master Chronology</h2>
               <p className="text-2xl text-slate-400 font-light max-w-3xl mx-auto leading-relaxed">
                 The Timeline Map is optimized for dark-mode projection. It connects the 45 admitted exhibits chronologically without distraction.
               </p>
            </motion.div>
          )}

          {activeTab === 'assets' && (
            <motion.div 
              key="assets"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, type: 'spring' }}
              className="w-full max-w-5xl text-center"
            >
               <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center mb-8 shadow-[0_0_60px_rgba(16,185,129,0.4)]">
                 <Map className="w-16 h-16 text-white" />
               </div>
               <h2 className="text-5xl font-display font-bold text-white mb-6">Global Asset Division Map</h2>
               <p className="text-2xl text-slate-400 font-light max-w-3xl mx-auto leading-relaxed">
                 Visualize the 55/45 macro-allocation scenario dynamically. The high-contrast color scheme is ADA compliant for courtroom visibility.
               </p>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}
