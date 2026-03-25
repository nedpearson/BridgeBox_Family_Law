import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Folder, Settings, Plug, Users, Calendar, X, Building2 } from 'lucide-react';

const STATIC_COMMANDS = [
  { id: 'm1', label: 'Pearson vs Pearson (Divorce)', icon: Folder, route: '/app/matter/d9b2e2d9-1c97-4b6d-a1c2-3e4f5g6h7i8j' },
  { id: 'm2', label: 'Jones Custody Modification', icon: Folder, route: '/app/portfolio' },
  { id: 'nav-i', label: 'Open Integrations Hub (QBO/QBD)', icon: Plug, route: '/app/integrations' },
  { id: 'nav-s', label: 'Manage Firm Settings & Billing', icon: Settings, route: '/app/settings' },
  { id: 'nav-e', label: 'Browse Expert Roster (GALs)', icon: Users, route: '/app/experts' },
  { id: 'nav-c', label: 'View Firm Docket Calendar', icon: Calendar, route: '/app/calendar' },
  { id: 'nav-a', label: 'God-Mode Platform Oversight', icon: Building2, route: '/app/admin' },
];

export default function CommandPalette() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Global Keyboard Listener (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle logic
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      
      // Close logic
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    // Listen for manual trigger from Sidebar icons
    const handleManualTrigger = () => setIsOpen(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('bridgebox-open-command', handleManualTrigger);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('bridgebox-open-command', handleManualTrigger);
    };
  }, [isOpen]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuery(''); // Reset query
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSelect = (route: string) => {
    navigate(route);
    setIsOpen(false);
  };

  if (!isOpen) return null;

  const filteredCommands = STATIC_COMMANDS.filter((cmd) => 
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 transition-opacity" 
        onClick={() => setIsOpen(false)}
      />
      <div className="fixed top-[20%] left-1/2 -translate-x-1/2 w-[90%] max-w-2xl bg-white rounded-2xl shadow-2xl z-50 overflow-hidden ring-1 ring-slate-200 animate-in fade-in slide-in-from-top-4 duration-200">
        
        {/* Search Input Area */}
        <div className="flex items-center px-4 border-b border-slate-100">
          <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
          <input 
            ref={inputRef}
            type="text" 
            placeholder="Search matters, settings, or integrations..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 h-16 bg-transparent border-0 focus:ring-0 text-lg text-slate-900 placeholder-slate-400 font-medium"
          />
          <kbd className="hidden sm:inline-block px-2 py-1 bg-slate-100 border border-slate-200 rounded text-xs font-bold text-slate-500 font-mono tracking-widest shrink-0 ml-3">
            ESC
          </kbd>
        </div>

        {/* Results Graph */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {filteredCommands.length === 0 ? (
            <div className="p-8 text-center text-slate-500 font-medium">
              No results found for "<span className="text-slate-900 font-bold">{query}</span>"
            </div>
          ) : (
             <div className="space-y-1">
               <p className="px-3 py-2 text-xs font-bold uppercase tracking-widest text-slate-400">Suggestions</p>
               {filteredCommands.map((cmd) => (
                 <button 
                    key={cmd.id}
                    onClick={() => handleSelect(cmd.route)}
                    className="w-full flex items-center px-3 py-4 hover:bg-slate-50 rounded-xl transition-colors text-left group"
                 >
                   <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center mr-4 group-hover:bg-white group-hover:shadow-sm transition-all border border-slate-200">
                      <cmd.icon className="w-4 h-4 text-slate-500 group-hover:text-bridgebox-600 transition-colors" />
                   </div>
                   <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900 flex-1">{cmd.label}</span>
                 </button>
               ))}
             </div>
          )}
        </div>
      </div>
    </>
  );
}
