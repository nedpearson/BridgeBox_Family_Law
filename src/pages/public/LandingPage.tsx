import { Link } from 'react-router-dom';
import { Scale, Shield, Brain, DollarSign, ArrowRight, Lock, Activity, Command } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 selection:bg-bridgebox-200 selection:text-bridgebox-900 font-sans">
      {/* Navigation */}
      <header className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50 transition-all">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center group cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-bridgebox-500 to-bridgebox-700 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-all">
              <Scale className="h-5 w-5 text-white" />
            </div>
            <span className="ml-3 text-2xl font-bold text-slate-900 tracking-tight font-display">
              Bridgebox
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/app" className="text-sm font-semibold text-slate-600 hover:text-bridgebox-600 transition-colors hidden sm:block">
              Client Portal
            </Link>
            <Link to="/app" className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg shadow-md text-sm font-bold text-white bg-slate-900 hover:bg-bridgebox-600 hover:shadow-bridgebox-500/25 transition-all transform hover:-translate-y-0.5">
              Access Command Center
            </Link>
          </div>
        </nav>
      </header>

      <main>
        {/* Elite Hero Section */}
        <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-900">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
            <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-slate-900 to-transparent"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bridgebox-500/10 border border-bridgebox-500/20 text-bridgebox-400 text-xs font-bold uppercase tracking-widest mb-8 animate-pulse">
              <Activity className="w-3 h-3" /> The Intelligence Layer
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white font-display leading-tight max-w-5xl mx-auto">
              The Family Law <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-bridgebox-400 to-emerald-200">
                Command Center
              </span>
            </h1>
            <p className="mt-6 text-xl text-slate-400 leading-relaxed max-w-3xl mx-auto font-medium">
              Unify matter intelligence, financial forensics, and chronological evidence. Build the definitive legal advantage sitting above Clio, OurFamilyWizard, and SoberLink.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/app" className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-xl text-white bg-bridgebox-600 hover:bg-bridgebox-500 shadow-xl shadow-bridgebox-600/20 transform hover:-translate-y-1 transition-all duration-300">
                Launch Platform <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <a href="#features" className="inline-flex items-center justify-center px-8 py-4 border border-slate-700 text-lg font-bold rounded-xl text-slate-300 bg-slate-800/50 hover:bg-slate-800 backdrop-blur-sm transition-all duration-300">
                Explore Architecture
              </a>
            </div>
          </div>

          {/* Hero Dashboard Preview */}
          <div className="mt-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
            <div className="relative rounded-2xl bg-slate-950 shadow-2xl shadow-bridgebox-900/50 overflow-hidden border border-slate-800 transform hover:-translate-y-2 transition-transform duration-500">
              <div className="h-8 bg-slate-900 border-b border-slate-800 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              </div>
              <div className="aspect-[21/9] bg-gradient-to-br from-slate-900 to-slate-950 flex flex-col items-center justify-center text-slate-500 p-8">
                <Command className="h-16 w-16 mb-6 text-bridgebox-500 opacity-80" />
                <h3 className="text-2xl font-display font-bold text-slate-300">Bridgebox Master Intelligence</h3>
                <p className="mt-2 max-w-md text-center">Securely compiling Hostility Indexes, Ghost Assets, and Timeline events behind strict RLS isolation.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Intelligence Features Grid */}
        <div id="features" className="py-32 bg-slate-50 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-sm text-bridgebox-600 font-bold tracking-widest uppercase mb-3">Core Modules</h2>
              <p className="text-3xl md:text-5xl font-extrabold text-slate-900 font-display">
                A purpose-built engine for high-conflict litigation
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white rounded-2xl p-8 border border-slate-200 hover:border-bridgebox-300 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-14 h-14 bg-bridgebox-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Brain className="h-7 w-7 text-bridgebox-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 font-display">AI Evidence Classification</h3>
                <p className="text-slate-600 leading-relaxed">Automatically ingest, tag, and organize thousands of documents into a unified, court-ready chronology via the Deposition Parser.</p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white rounded-2xl p-8 border border-slate-200 hover:border-bridgebox-300 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-14 h-14 bg-bridgebox-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <DollarSign className="h-7 w-7 text-bridgebox-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 font-display">Financial Forensics</h3>
                <p className="text-slate-600 leading-relaxed">Segregate recoverable expenses, track court costs, and generate audit-friendly financial narratives with the integrated Ghost Asset detector.</p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white rounded-2xl p-8 border border-slate-200 hover:border-bridgebox-300 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-14 h-14 bg-bridgebox-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="h-7 w-7 text-bridgebox-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 font-display">Compliance Tracking</h3>
                <p className="text-slate-600 leading-relaxed">Intelligently summarize OFW exchanges, calculate hostility indexes, and monitor SoberLink BAC testing violations in real time.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Security Banner */}
        <div className="bg-bridgebox-900 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-bridgebox-800 rounded-full">
                <Lock className="w-8 h-8 text-bridgebox-400" />
              </div>
              <div>
                <h3 className="text-white font-bold text-xl font-display">Enterprise-Grade Isolation</h3>
                <p className="text-bridgebox-200 mt-1">Strict Row-Level Security ensuring absolute client data confidentiality.</p>
              </div>
            </div>
            <Link to="/app" className="px-6 py-3 bg-white text-bridgebox-900 font-bold rounded-lg hover:bg-slate-100 transition-colors shrink-0">
              Verify Architecture
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Scale className="h-6 w-6 text-slate-400" />
            <span className="text-lg font-bold text-slate-900 font-display">Bridgebox</span>
          </div>
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} Bridgebox Intelligence Systems. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
