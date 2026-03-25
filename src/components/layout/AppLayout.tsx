import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  Building2, 
  Scale, 
  Files, 
  Clock, 
  DollarSign, 
  Settings 
} from 'lucide-react';

const navigation = [
  { name: 'Portfolio', href: '/app/portfolio', icon: Building2 },
  { name: 'Evidence', href: '/app/evidence', icon: Files },
  { name: 'Chronology', href: '/app/chronology', icon: Clock },
  { name: 'Financials', href: '/app/financials', icon: DollarSign },
  { name: 'Settings', href: '/app/settings', icon: Settings },
];

export default function AppLayout() {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <div className="w-64 flex flex-col border-r bg-white shadow-sm">
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
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Global Command Bar / Header placeholder */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm z-10">
          <div className="flex-1 flex items-center">
            <div className="w-full max-w-lg relative">
              <input
                type="text"
                placeholder="Search matters, evidence, or financial records..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-bridgebox-500 focus:border-bridgebox-500 text-sm"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          <div className="ml-4 flex items-center">
            <button className="text-sm font-medium text-gray-700 hover:text-gray-900 mx-4">
              Alerts
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
