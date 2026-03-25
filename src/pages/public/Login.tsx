import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Scale, ArrowRight, ShieldCheck, Mail, Lock } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate Authentication
    setTimeout(() => {
      setIsLoading(false);
      navigate('/app');
    }, 800);
  };

  const handleOAuth = (provider: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/app');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-white flex w-full">
      
      {/* Left Pane - Marketing / Branding */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] bg-slate-950 text-white p-12 relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-bridgebox-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-bridgebox-500 to-bridgebox-700 flex items-center justify-center shadow-lg group-hover:shadow-bridgebox-500/25 transition-all">
              <Scale className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight font-display bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
              Bridgebox
            </span>
          </Link>
        </div>

        <div className="relative z-10 max-w-md">
          <div className="inline-flex items-center px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-bridgebox-400 border border-white/10 mb-6 backdrop-blur-sm">
            <ShieldCheck className="w-3.5 h-3.5 mr-1.5" /> SOC-2 Type II Certified
          </div>
          <h1 className="text-4xl font-display font-bold leading-tight mb-6">
            The Master Intelligence Platform for Modern Family Law.
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed mb-12 font-medium">
            Centralize evidence, deploy AI-driven chronologies, and orchestrate complex discovery workflows in one secure, multi-tenant environment.
          </p>

          {/* Testimonial */}
          <div className="border border-white/10 bg-white/5 rounded-2xl p-6 backdrop-blur-sm relative">
             <div className="absolute top-0 right-8 -translate-y-1/2 text-6xl text-bridgebox-500/20 font-serif leading-none">"</div>
             <p className="text-slate-300 italic mb-4 relative z-10 pr-4 leading-relaxed font-medium">
                Bridgebox completely eliminated our paralegal bottleneck. The AI Chronology mapped a 10-year financial marriage in under two minutes.
             </p>
             <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 mr-3"></div>
                <div>
                   <p className="text-sm font-bold text-white">Sarah Jenkins, Esq.</p>
                   <p className="text-xs text-slate-500 font-medium tracking-wide">Managing Partner, Chicago</p>
                </div>
             </div>
          </div>
        </div>
        
        <div className="relative z-10 text-xs text-slate-600 font-medium">
          &copy; {new Date().getFullYear()} Bridgebox AI Legal Systems. All rights reserved.
        </div>
      </div>

      {/* Right Pane - Auth Form */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-24">
        <div className="w-full max-w-md mx-auto">
          
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-display font-bold text-slate-900">Welcome back</h2>
            <p className="text-slate-500 mt-2 font-medium">Sign in to your firm's secure workspace.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Work Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-bridgebox-500 focus:border-bridgebox-500 sm:text-sm font-medium text-slate-900 transition-colors"
                  placeholder="attorney@firm.com"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-bold text-slate-700">Password</label>
                <a href="#" className="text-xs font-bold text-bridgebox-600 hover:text-bridgebox-700">Forgot password?</a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-bridgebox-500 focus:border-bridgebox-500 sm:text-sm font-medium text-slate-900 transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>Sign into Workspace <ArrowRight className="ml-2 w-4 h-4" /></>
              )}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white text-slate-500 font-medium">Or continue with SSO</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                onClick={() => handleOAuth('google')}
                className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-slate-300 rounded-xl shadow-sm bg-white text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Google
              </button>
              <button
                onClick={() => handleOAuth('microsoft')}
                className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-slate-300 rounded-xl shadow-sm bg-white text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <svg className="w-5 h-5 mr-2 text-[#00a4ef]" viewBox="0 0 23 23" fill="currentColor"><path d="M0 0h11v11H0zM12 0h11v11H12zM0 12h11v11H0zM12 12h11v11H12z"/></svg>
                Microsoft 365
              </button>
            </div>
          </div>
          
          <p className="mt-8 text-center text-sm text-slate-600 font-medium">
            Does your firm need an account? <a href="#" className="font-bold text-bridgebox-600 hover:text-bridgebox-700 border-b-2 border-bridgebox-200 hover:border-bridgebox-500 pb-0.5 transition-colors">Request a demo</a>
          </p>
        </div>
      </div>
    </div>
  );
}
