import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Scale, 
  Files, 
  Clock, 
  DollarSign, 
  Settings,
  Share2,
  Search,
  Command,
  X
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

const navigation = [
  { name: 'Portfolio', href: '/app/portfolio', icon: Building2 },
  { name: 'Evidence', href: '/app/evidence', icon: Files },
  { name: 'Requests', href: '/app/requests', icon: Share2 },
  { name: 'Chronology', href: '/app/chronology', icon: Clock },
  { name: 'Financials', href: '/app/financials', icon: DollarSign },
  { name: 'Settings', href: '/app/settings', icon: Settings },
];

export default function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Global Search State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  // Capture Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Debounced Supabase search
  useEffect(() => {
    if (query.trim().length === 0) {
      setResults([]);
      return;
    }
    const fetchResults = async () => {
      const { data } = await supabase
        .from('matters')
        .select('id, name, status, posture')
        .ilike('name', `%${query}%`)
        .limit(5);
      if (data) setResults(data);
    };
    const debounce = setTimeout(fetchResults, 200);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleSelect = (matterId: string) => {
    setIsSearchOpen(false);
    setQuery('');
    navigate(`/app/matter/${matterId}`);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <div className="w-64 flex flex-col border-r bg-white shadow-sm shrink-0">
        <div className="h-16 flex items-center px-6 border-b">
          <Scale className="w-6 h-6 text-bridgebox-600 mr-2" />
          <span className="text-lg font-bold text-gray-900 tracking-tight">Bridgebox</span>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive 
                    ? 'bg-bridgebox-50 text-bridgebox-700' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-bridgebox-600' : 'text-gray-400'}`} />
                {item.name}
              </Link>
            )
          })}
        </nav>
        
        <div className="p-4 border-t">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-bridgebox-100 flex items-center justify-center">
              <span className="text-sm font-medium text-bridgebox-700">NP</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">Ned Pearson</p>
              <p className="text-xs text-gray-500">Super Admin</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm z-10 shrink-0">
          <div className="flex-1 flex items-center">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="w-full max-w-lg relative group flex items-center"
            >
              <div className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-left text-sm text-gray-500 group-hover:bg-white transition-colors">
                Search matters, evidence, or financial records...
              </div>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-hover:text-bridgebox-500" />
              </div>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-xs text-gray-400 font-medium flex items-center border rounded px-1.5 py-0.5 bg-white shadow-sm">
                  <Command className="w-3 h-3 mr-0.5" /> K
                </span>
              </div>
            </button>
          </div>
          <div className="ml-4 flex items-center">
            <button className="text-sm font-medium text-gray-700 hover:text-gray-900 mx-4">
              Alerts
            </button>
          </div>
        </header>

        {/* Global Search Overlay Modal */}
        {isSearchOpen && (
          <div className="absolute inset-0 z-50 flex justify-center items-start pt-20 bg-gray-900/40 backdrop-blur-sm px-4">
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              <div className="relative border-b flex items-center">
                <Search className="w-5 h-5 absolute left-4 text-bridgebox-500" />
                <input 
                  autoFocus
                  type="text"
                  placeholder="Type a matter name or keyword..."
                  className="w-full pl-12 pr-12 py-4 outline-none text-gray-900"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button 
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-4 text-gray-400 hover:text-gray-600 border rounded-md px-2 py-1 text-xs font-medium"
                >
                  ESC
                </button>
              </div>
              
              {query.length > 0 && (
                <div className="max-h-96 overflow-y-auto">
                  {results.length === 0 ? (
                    <div className="p-8 text-center text-gray-500 text-sm">No matters found matching "{query}"</div>
                  ) : (
                    <ul className="py-2">
                      <li className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Matters</li>
                      {results.map((r) => (
                        <li 
                          key={r.id}
                          className="px-4 py-3 hover:bg-bridgebox-50 cursor-pointer flex justify-between items-center group border-l-2 border-transparent hover:border-bridgebox-500"
                          onClick={() => handleSelect(r.id)}
                        >
                          <div>
                            <span className="text-sm font-medium text-gray-900 group-hover:text-bridgebox-700 flex items-center gap-2">
                              <Building2 className="w-4 h-4 text-gray-400" /> {r.name}
                            </span>
                            <span className="text-xs text-gray-500 ml-6">{r.posture}</span>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-md font-medium ${r.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                            {r.status.toUpperCase()}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        <main className="flex-1 overflow-auto bg-gray-50 relative z-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
