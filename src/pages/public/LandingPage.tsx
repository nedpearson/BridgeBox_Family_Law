import { Link } from 'react-router-dom';
import { Scale, Shield, Brain, DollarSign } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <Scale className="h-8 w-8 text-bridgebox-600" />
            <span className="ml-2 text-xl font-bold text-gray-900 tracking-tight">Bridgebox</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/app" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Sign In
            </Link>
            <Link to="/app" className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800">
              Go to Command Center
            </Link>
          </div>
        </nav>
      </header>

      <main>
        <div className="relative pt-20 pb-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
                The Family Law <span className="text-bridgebox-600">Command Center</span>
              </h1>
              <p className="mt-6 text-xl text-gray-500 leading-8">
                Unify matter intelligence, financial forensics, and chronology generation. Build the definitive evidence layer that sits above Clio, OurFamilyWizard, and SoberLink.
              </p>
              <div className="mt-10 flex justify-center gap-4">
                <Link to="/app" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-bridgebox-600 hover:bg-bridgebox-700 md:py-4 md:text-lg md:px-10 shadow-lg shadow-bridgebox-500/30 transition-all">
                  Access Platform
                </Link>
                <a href="#features" className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition-all">
                  View Features
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-2xl bg-gray-900 shadow-2xl overflow-hidden aspect-video border border-gray-800">
              <div className="absolute inset-0 bg-gradient-to-tr from-gray-800 to-gray-900 flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <Shield className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">Dashboard Preview Placeholder</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="features" className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base text-bridgebox-600 font-semibold tracking-wide uppercase">Core Intelligence</h2>
              <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                A purpose-built engine for high-conflict matters
              </p>
            </div>

            <div className="mt-20 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition-shadow">
                <Brain className="h-8 w-8 text-bridgebox-600 mb-6" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">AI Evidence Classification</h3>
                <p className="text-gray-500">Automatically ingest, tag, and organize thousands of documents into a unified, court-ready chronology.</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition-shadow">
                <DollarSign className="h-8 w-8 text-bridgebox-600 mb-6" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">Financial Forensics</h3>
                <p className="text-gray-500">Segregate recoverable expenses, track court costs, and generate audit-friendly financial narratives.</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition-shadow">
                <Scale className="h-8 w-8 text-bridgebox-600 mb-6" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">Compliance Tracking</h3>
                <p className="text-gray-500">Intelligently summarize OFW exchanges, SoberLink tests, and behavioral evaluations in one place.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
