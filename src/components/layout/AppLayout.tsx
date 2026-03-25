import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import CommandPalette from './CommandPalette';
import AlertsPopover from './AlertsPopover';
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
  Calendar,
  Users,
  Plug
} from 'lucide-react';

const navigation = [
  { name: 'Portfolio', href: '/app/portfolio', icon: Building2 },
  { name: 'Evidence', href: '/app/evidence', icon: Files },
  { name: 'Requests', href: '/app/requests', icon: Share2 },
  { name: 'Chronology', href: '/app/chronology', icon: Clock },
  { name: 'Financials', href: '/app/financials', icon: DollarSign },
  { name: 'Calendar', href: '/app/calendar', icon: Calendar },
  { name: 'Experts', href: '/app/experts', icon: Users },
  { name: 'Integrations', href: '/app/integrations', icon: Plug },
  { name: 'Settings', href: '/app/settings', icon: Settings },
];

export default function AppLayout() {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-50">
      <CommandPalette />
      
      {/* Sidebar Navigation */}
      <div className="w-64 flex flex-col border-r bg-white shadow-sm shrink-0 z-10">
        <div className="h-16 flex items-center px-6 border-b bg-white">
          <div className="w-8 h-8 bg-gradient-to-br from-bridgebox-500 to-bridgebox-700 rounded-lg flex items-center justify-center shadow-sm mr-3 shrink-0">
            <Scale className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight font-display">Bridgebox</span>
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
        <div className="flex flex-col gap-2 p-3">
           <button 
             className="w-full p-3 flex items-center justify-center text-slate-400 hover:text-bridgebox-500 hover:bg-bridgebox-50 rounded-xl transition-colors"
             onClick={() => window.dispatchEvent(new Event('bridgebox-open-command'))}
           >
             <Search className="w-5 h-5" />
           </button>
           <button 
             className="w-full p-3 flex items-center justify-center text-slate-400 hover:text-bridgebox-500 hover:bg-bridgebox-50 rounded-xl transition-colors group relative"
             onClick={() => window.dispatchEvent(new Event('bridgebox-open-command'))}
           >
             <Command className="w-5 h-5" />
             <div className="absolute left-14 bg-slate-900 text-white text-xs font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
               Cmd+K
             </div>
           </button>
        </div>
        
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
      <div className="flex-1 flex flex-col min-w-0 bg-slate-50 relative">
        <header className="h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm z-10 shrink-0">
          <div className="flex-1 flex items-center">
            <button 
              onClick={() => window.dispatchEvent(new Event('bridgebox-open-command'))}
              className="w-full max-w-lg relative group flex items-center cursor-text"
            >
              <div className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-left text-sm text-gray-500 group-hover:bg-white transition-colors">
                Search matters, integrations, or financial records...
              </div>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-hover:text-bridgebox-500 transition-colors" />
              </div>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-xs text-gray-400 font-medium flex items-center border rounded px-1.5 py-0.5 bg-white shadow-sm">
                  <Command className="w-3 h-3 mr-0.5" /> K
                </span>
              </div>
            </button>
          </div>
          <div className="ml-4 flex items-center gap-4">
            <button className="text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">
              Help
            </button>
            <AlertsPopover />
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-gray-50 relative z-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
