// @ts-nocheck
import { Link } from 'react-router-dom';
import { Scale, Shield, Brain, DollarSign, ArrowRight, Lock, Activity, Command, FileText, CheckCircle2, AlertTriangle, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 selection:bg-bridgebox-200 selection:text-bridgebox-900 font-sans overflow-hidden">
      {/* Navigation */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed w-full top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/50"
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center group cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-bridgebox-500 to-bridgebox-700 rounded-xl flex items-center justify-center shadow-[0_8px_16px_rgba(2,132,199,0.3)] transform group-hover:scale-110 transition-all duration-300">
              <Scale className="h-5 w-5 text-white" />
            </div>
            <span className="ml-3 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 tracking-tight font-display">
              Bridgebox
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/app" className="text-sm font-semibold text-slate-600 hover:text-bridgebox-600 transition-colors hidden sm:block">
              Client Portal
            </Link>
            <Link to="/app" className="relative inline-flex h-10 overflow-hidden rounded-lg p-[1px] focus:outline-none focus:ring-2 focus:ring-bridgebox-400 focus:ring-offset-2 focus:ring-offset-slate-50 group">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2E8F0_0%,#38BDF8_50%,#E2E8F0_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-bold text-white backdrop-blur-3xl group-hover:bg-slate-800 transition-colors">
                Access Command Center
              </span>
            </Link>
          </div>
        </nav>
      </motion.header>

      <main>
        {/* Elite Hero Section */}
        <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-950">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-bridgebox-900/40 via-slate-900 to-slate-950"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-bridgebox-500/20 rounded-full blur-[120px] opacity-50 mix-blend-screen pointer-events-none"></div>
            <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-slate-50 to-transparent"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-bridgebox-500/10 border border-bridgebox-500/30 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-8 shadow-[0_0_15px_rgba(16,185,129,0.15)] backdrop-blur-md"
            >
              <Activity className="w-3.5 h-3.5 animate-pulse" /> The Intelligence Layer is Live
            </motion.div>
            
            <motion.h1 
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-5xl md:text-7xl font-extrabold tracking-tight text-white font-display leading-[1.1] max-w-5xl mx-auto"
            >
              The Modern High-Conflict <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-bridgebox-400 via-emerald-300 to-indigo-400 drop-shadow-[0_0_30px_rgba(56,189,248,0.3)]">
                Command Center
              </span>
            </motion.h1>
            
            <motion.p 
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
              className="mt-6 text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto font-medium"
            >
              Unify financial forensics, automated AI Discovery templates, and interactive timeline intelligence into a single secure workspace.
            </motion.p>
            
            <motion.div 
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
            >
              <Link to="/app" className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-xl text-white bg-bridgebox-600 hover:bg-bridgebox-500 shadow-[0_0_40px_rgba(2,132,199,0.4)] transform hover:-translate-y-1 hover:scale-105 transition-all duration-300">
                Launch Platform <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <a href="#features" className="inline-flex items-center justify-center px-8 py-4 border border-slate-700/50 text-lg font-bold rounded-xl text-slate-300 bg-slate-800/40 hover:bg-slate-800 border-t-slate-600/50 shadow-inner backdrop-blur-md transition-all duration-300 hover:-translate-y-1">
                Explore Architecture
              </a>
            </motion.div>
          </div>

          {/* Floating UI Mockups */}
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20"
          >
            <div className="relative rounded-2xl bg-white/5 backdrop-blur-xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden border border-white/10 ring-1 ring-white/20 transform hover:-translate-y-2 transition-transform duration-700">
              <div className="h-10 bg-black/40 border-b border-white/10 flex items-center px-4 gap-2 backdrop-blur-md">
                <div className="w-3 h-3 rounded-full bg-slate-600 hover:bg-red-500 transition-colors"></div>
                <div className="w-3 h-3 rounded-full bg-slate-600 hover:bg-yellow-500 transition-colors"></div>
                <div className="w-3 h-3 rounded-full bg-slate-600 hover:bg-green-500 transition-colors"></div>
                <div className="mx-auto flex items-center justify-center bg-white/5 rounded-md px-32 py-1 border border-white/5">
                  <Search className="w-3 h-3 text-slate-400 mr-2" />
                  <span className="text-[10px] text-slate-400 font-medium tracking-wide">bridgebox.local/app/matter/c29d...</span>
                </div>
              </div>
              
              <div className="aspect-[21/9] bg-gradient-to-br from-slate-900 to-slate-950 flex p-6 relative overflow-hidden">
                {/* Simulated Sidebar */}
                <div className="w-48 bg-black/20 border-r border-white/10 rounded-l-lg p-4 space-y-4">
                  <div className="h-6 w-32 bg-white/10 rounded-md mb-8"></div>
                  <div className="space-y-3">
                    <div className="h-4 w-full bg-bridgebox-500/20 rounded border border-bridgebox-500/30"></div>
                    <div className="h-4 w-5/6 bg-white/5 rounded"></div>
                    <div className="h-4 w-4/6 bg-white/5 rounded"></div>
                    <div className="h-4 w-full bg-white/5 rounded"></div>
                  </div>
                </div>

                {/* Simulated Main Content Area */}
                <div className="flex-1 p-6 relative">
                  <div className="flex justify-between items-start mb-8">
                     <div>
                       <div className="h-8 w-64 bg-white/10 rounded-md"></div>
                       <div className="h-4 w-48 bg-white/5 rounded-md mt-2"></div>
                     </div>
                     <div className="flex gap-2">
                       <div className="h-8 w-24 bg-white/5 border border-white/10 rounded-md"></div>
                       <div className="h-8 w-32 bg-bridgebox-600 rounded-md"></div>
                     </div>
                  </div>

                  {/* Simulated Cards */}
                  <div className="grid grid-cols-3 gap-6">
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="bg-white/5 border border-white/10 rounded-xl p-5 shadow-lg backdrop-blur-sm">
                      <div className="h-4 w-24 bg-red-400/20 rounded mb-4"></div>
                      <div className="h-10 w-32 bg-white/10 rounded"></div>
                    </motion.div>
                    <motion.div animate={{ y: [0, -7, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }} className="bg-bridgebox-900/40 border border-bridgebox-500/30 rounded-xl p-5 shadow-[0_0_20px_rgba(2,132,199,0.15)] backdrop-blur-sm">
                      <div className="h-4 w-24 bg-bridgebox-400/30 rounded mb-4"></div>
                      <div className="h-10 w-32 bg-bridgebox-400/20 rounded"></div>
                    </motion.div>
                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 2 }} className="bg-white/5 border border-white/10 rounded-xl p-5 shadow-lg backdrop-blur-sm">
                      <div className="h-4 w-24 bg-emerald-400/20 rounded mb-4"></div>
                      <div className="h-10 w-32 bg-white/10 rounded"></div>
                    </motion.div>
                  </div>
                  
                  {/* Glowing Overlay */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-64 h-64 bg-bridgebox-500/20 rounded-full blur-[80px] pointer-events-none mix-blend-screen"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Intelligence Features Grid */}
        <div id="features" className="py-32 bg-slate-50 relative border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="text-center max-w-3xl mx-auto mb-20"
            >
              <h2 className="text-sm text-bridgebox-600 font-bold tracking-widest uppercase mb-3">Core Modules</h2>
              <p className="text-3xl md:text-5xl font-extrabold text-slate-900 font-display">
                A purpose-built engine for high-conflict litigation
              </p>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {[
                { icon: Brain, title: "AI Evidence Classification", desc: "Automatically ingest, tag, and organize thousands of documents into a unified chronology via the Deposition Parser." },
                { icon: DollarSign, title: "Ghost Asset Forensics", desc: "Flag missing financial distributions and visualize hidden shell transfers with automated offset discovery." },
                { icon: Lock, title: "Tenant Isolation", desc: "Ensure absolute ethical firewalls. Every sub-matter is isolated via Supabase Row-Level Security." },
                { icon: FileText, title: "Intelligent Forms Engine", desc: "Generate Subpoenas and Request for Productions automatically rooted in actual timeline anomalies." },
                { icon: Shield, title: "OC Secure Portal", desc: "Generate expiring, cryptographic links for opposing counsel to drop GAL records natively into Bridgebox." },
                { icon: AlertTriangle, title: "Custody Violation Tracking", desc: "Cross-reference OurFamilyWizard hostility indexes and GPS logs against court-ordered exchange schedules." },
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  variants={fadeUp}
                  className="bg-white rounded-2xl p-8 border border-slate-200 hover:border-bridgebox-300 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-bridgebox-50 group-hover:border-bridgebox-200 transition-all duration-300">
                    <feature.icon className="h-7 w-7 text-bridgebox-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 font-display">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed font-medium">{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Call to Action CTA Section */}
        <div className="relative bg-slate-900 overflow-hidden py-32">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-bridgebox-600/30 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>
          
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-4xl md:text-5xl font-extrabold text-white font-display"
            >
              Control the Narrative. <span className="text-bridgebox-400">Master the Matter.</span>
            </motion.h2>
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="mt-6 text-xl text-slate-400 font-medium max-w-2xl mx-auto"
            >
              Join elite matrimonial firms treating unstructured litigation data as their greatest asset.
            </motion.p>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="mt-10"
            >
              <Link to="/app" className="inline-flex items-center justify-center px-10 py-5 border border-transparent text-xl font-bold rounded-xl text-white bg-gradient-to-r from-bridgebox-600 to-bridgebox-500 hover:from-bridgebox-500 hover:to-bridgebox-400 shadow-[0_10px_40px_rgba(2,132,199,0.5)] transform hover:-translate-y-1 transition-all">
                Access the AI Sandbox <ArrowRight className="ml-2 w-6 h-6" />
              </Link>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Premium Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
          <div className="flex items-center mb-4 md:mb-0">
            <Scale className="h-5 w-5 text-bridgebox-600 mr-2" />
            <span className="font-bold text-slate-400 tracking-wider uppercase">Bridgebox Law</span>
          </div>
          <div className="flex gap-6 font-medium">
             <a href="#" className="hover:text-bridgebox-400 transition-colors">Security Architecture</a>
             <a href="#" className="hover:text-bridgebox-400 transition-colors">Terms of Service</a>
             <a href="#" className="hover:text-bridgebox-400 transition-colors">API Documentation</a>
             <a href="#" className="hover:text-bridgebox-400 transition-colors">System Status <span className="text-emerald-500 animate-pulse ml-1">●</span></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
