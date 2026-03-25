import { useState, useEffect } from 'react';
import { Play, Square, Clock, PlusCircle } from 'lucide-react';

export default function BillableTimer() {
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [showLogModal, setShowLogModal] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const stopAndLog = () => {
    setIsActive(false);
    setShowLogModal(true);
    // In production, this would pop a modal to select the matter, 
    // assign a task code (e.g., A101 - Drafting), and POST to /api/time-entries
    setTimeout(() => {
       setShowLogModal(false);
       setSeconds(0);
    }, 2000);
  };

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    
    const parts = [];
    if (h > 0) parts.push(h.toString().padStart(2, '0'));
    parts.push(m.toString().padStart(2, '0'));
    parts.push(s.toString().padStart(2, '0'));
    
    return parts.join(':');
  };

  return (
    <div className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-full px-2 py-1 shadow-inner transition-colors">
      {/* Time Display */}
      <div className={`flex items-center px-2 py-1 ${isActive ? 'text-emerald-600' : 'text-slate-600'}`}>
        <Clock className={`w-4 h-4 mr-2 ${isActive ? 'animate-pulse text-emerald-500' : 'text-slate-400'}`} />
        <span className="text-sm font-mono font-bold tracking-wider w-16 text-center">
          {formatTime(seconds)}
        </span>
      </div>

      <div className="h-4 w-px bg-slate-300 mx-1"></div>

      {/* Controls */}
      {!isActive ? (
        <button 
          onClick={toggleTimer}
          className="p-1.5 text-slate-500 hover:text-bridgebox-600 hover:bg-bridgebox-100 rounded-full transition-colors group relative"
          title="Start Timer"
        >
          <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
        </button>
      ) : (
        <div className="flex gap-1">
          <button 
            onClick={toggleTimer}
            className="p-1.5 text-amber-500 hover:text-amber-600 hover:bg-amber-100 rounded-full transition-colors"
            title="Pause Timer"
          >
            <div className="w-3 h-3 border-l-2 border-r-2 border-current mx-0.5"></div>
          </button>
          <button 
            onClick={stopAndLog}
            className="p-1.5 text-emerald-500 hover:text-emerald-700 hover:bg-emerald-100 rounded-full transition-colors group"
            title="Stop & Log Time"
          >
            {showLogModal ? (
               <PlusCircle className="w-4 h-4 animate-spin text-emerald-600" />
            ) : (
               <Square className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
            )}
          </button>
        </div>
      )}

      {showLogModal && (
        <div className="absolute top-16 right-32 bg-slate-900 border border-slate-700 text-white text-xs font-bold px-4 py-2 rounded-lg shadow-xl animate-in fade-in slide-in-from-top-4 z-50">
          Syncing {formatTime(seconds)} to Pearson vs Pearson...
        </div>
      )}
    </div>
  );
}
