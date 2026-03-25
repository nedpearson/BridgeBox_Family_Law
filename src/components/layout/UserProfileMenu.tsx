import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, CreditCard, Settings, Moon } from 'lucide-react';

export default function UserProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleSignOut = () => {
    setIsOpen(false);
    // Explicitly redirect to Login, breaking the SaaS Session
    navigate('/login');
  };

  const handleNavigate = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 pl-4 border-l border-slate-200 hover:bg-slate-50 transition-colors py-1 px-2 rounded-r-lg"
      >
        <div className="w-8 h-8 rounded-full bg-bridgebox-100 flex items-center justify-center text-bridgebox-700 font-bold text-sm shadow-sm border border-bridgebox-200/50">
          NP
        </div>
        <div className="hidden sm:block text-left">
          <p className="text-sm font-bold text-slate-900 leading-tight">Ned Pearson</p>
          <p className="text-xs text-slate-500 font-medium">Managing Partner</p>
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          
          <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
             <p className="text-xs font-bold text-bridgebox-600 uppercase tracking-widest mb-1">Active Tenant</p>
             <p className="text-sm font-bold text-slate-900">Pearson Legal Group</p>
          </div>

          <div className="p-2 border-b border-slate-100">
             <button 
               onClick={() => handleNavigate('/app/settings')}
               className="w-full flex items-center px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
             >
               <User className="w-4 h-4 mr-3 text-slate-400" /> My Profile
             </button>
             <button 
               onClick={() => handleNavigate('/app/settings')}
               className="w-full flex items-center px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
             >
               <CreditCard className="w-4 h-4 mr-3 text-slate-400" /> Billing & Plan
             </button>
             <button 
               onClick={() => handleNavigate('/app/settings')}
               className="w-full flex items-center px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
             >
               <Settings className="w-4 h-4 mr-3 text-slate-400" /> Firm Settings
             </button>
             <button 
               className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
             >
               <div className="flex items-center">
                 <Moon className="w-4 h-4 mr-3 text-slate-400" /> Dark Mode
               </div>
               <span className="text-[10px] font-bold px-1.5 py-0.5 bg-slate-200 text-slate-500 rounded-md">BETA</span>
             </button>
          </div>

          <div className="p-2 bg-slate-50">
             <button 
               onClick={handleSignOut}
               className="w-full flex items-center px-3 py-2 text-sm font-bold text-red-600 hover:bg-red-50 rounded-lg transition-colors"
             >
               <LogOut className="w-4 h-4 mr-3 text-red-500" /> Sign Out
             </button>
          </div>

        </div>
      )}
    </div>
  );
}
