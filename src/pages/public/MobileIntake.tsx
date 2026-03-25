import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Camera, Image as ImageIcon, CheckCircle2, Shield, UploadCloud, X, FileText, Lock, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MobileIntake() {
  const { token } = useParams();
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [complete, setComplete] = useState(false);

  // In production, fetch token validity from Supabase Edge Function
  const firmName = "Pearson Legal Group";
  const isValid = token?.length && token.length > 5;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const submitFiles = () => {
    setUploading(true);
    // Simulate Edge Function AES-256 upload
    setTimeout(() => {
      setUploading(false);
      setComplete(true);
    }, 2000);
  };

  if (!isValid) {
    return (
      <div className="min-h-[100dvh] bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <Shield className="w-16 h-16 text-slate-700 mb-4" />
        <h1 className="text-2xl font-bold text-white mb-2">Token Expired</h1>
        <p className="text-slate-500 font-medium">This secure session has expired. Please rescan the live QR code from your attorney's dashboard.</p>
      </div>
    );
  }

  if (complete) {
    return (
      <div className="min-h-[100dvh] bg-slate-950 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-emerald-500/20 rounded-full blur-[80px] pointer-events-none mix-blend-screen"></div>
        
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="w-24 h-24 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(16,185,129,0.3)] relative z-10"
        >
          <CheckCircle2 className="w-12 h-12 text-emerald-400" />
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.3 }}
           className="relative z-10"
        >
           <h1 className="text-3xl font-bold text-white mb-3 tracking-tight font-display">Transmission Secure</h1>
           <p className="text-slate-300 font-medium text-base leading-relaxed mb-8 max-w-[280px] mx-auto">
             {files.length} payload{files.length !== 1 ? 's have' : ' has'} been AES-256 encrypted and deposited into <strong>{firmName}</strong>'s isolated vault.
           </p>

           <div className="w-full bg-black/40 border border-white/5 rounded-xl p-4 mb-8 text-left backdrop-blur-md">
             <div className="flex justify-between items-center mb-2">
               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Connection</span>
               <span className="text-[10px] font-bold text-emerald-400 flex items-center"><Activity className="w-3 h-3 mr-1" /> Terminated</span>
             </div>
             <p className="text-xs text-slate-400 font-medium">Chain of custody secured. You may safely close this browser window.</p>
           </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-slate-950 flex flex-col pb-safe relative overflow-hidden font-sans">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-bridgebox-600/20 rounded-full blur-[80px] pointer-events-none mix-blend-screen"></div>
      
      {/* Mobile Branding Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 bg-black/40 backdrop-blur-xl pt-14 pb-6 px-6 border-b border-white/10 rounded-b-[2rem]"
      >
        <div className="flex items-center justify-between mb-3">
           <div className="flex items-center gap-2">
             <Shield className="w-4 h-4 text-emerald-400" />
             <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest pl-1">E2E Secure Link</span>
           </div>
           <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
             Token: {token?.substring(0,6)}
           </span>
        </div>
        <h1 className="text-2xl font-bold text-white font-display leading-tight shadow-sm">
          Evidence Portal
        </h1>
        <p className="text-sm font-medium text-slate-400 mt-1">Connected to <strong className="text-slate-300">{firmName}</strong></p>
      </motion.header>

      {/* Main Upload Actions */}
      <main className="relative z-10 flex-1 px-6 py-8 flex flex-col">
        {!files.length ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col justify-center space-y-5"
          >
            <div className="text-center mb-2">
              <p className="text-slate-400 font-medium text-sm leading-relaxed">
                Select photos, videos, or documents to securely encrypt and transmit to your matter file.
              </p>
            </div>
            
            {/* Camera Button */}
            <label className="relative flex flex-col items-center justify-center p-8 bg-gradient-to-br from-bridgebox-600 to-bridgebox-800 text-white rounded-3xl shadow-[0_10px_40px_rgba(2,132,199,0.3)] border border-bridgebox-400/30 active:scale-[0.98] transition-transform overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 bg-white/0 group-active:bg-black/10 transition-colors"></div>
              <Camera className="w-12 h-12 mb-3 drop-shadow-md" />
              <span className="text-lg font-bold">Launch Camera</span>
              <span className="text-xs text-bridgebox-200 mt-1 font-medium tracking-wide">Take a secure photo now</span>
              <input 
                type="file" 
                accept="image/*,video/*" 
                capture="environment"
                className="hidden" 
                onChange={handleFileSelect}
                multiple
              />
            </label>

            <div className="flex items-center gap-4 text-slate-600 text-[10px] font-bold uppercase tracking-widest my-1">
              <div className="h-px bg-slate-800 flex-1"></div>
              OR
              <div className="h-px bg-slate-800 flex-1"></div>
            </div>

            {/* Library Button */}
            <label className="flex flex-col items-center justify-center p-6 bg-white/5 border border-white/10 text-white rounded-3xl active:bg-white/10 transition-colors backdrop-blur-md cursor-pointer">
              <ImageIcon className="w-8 h-8 mb-2 text-slate-400" />
              <span className="text-base font-bold text-slate-200">Select Files</span>
              <span className="text-xs text-slate-500 mt-1 font-medium tracking-wide">Choose from gallery or iCloud</span>
              <input 
                type="file" 
                accept="image/*,video/*,.pdf" 
                className="hidden" 
                onChange={handleFileSelect} 
                multiple
              />
            </label>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex flex-col"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-base font-bold text-white flex items-center">
                 <Lock className="w-4 h-4 mr-2 text-slate-400" /> Encrypted Payload
              </h2>
              <label className="text-xs font-bold text-bridgebox-400 bg-bridgebox-500/10 border border-bridgebox-500/20 px-3 py-1.5 rounded-full active:bg-bridgebox-500/20 transition-colors">
                + Add More
                <input type="file" className="hidden" onChange={handleFileSelect} multiple />
              </label>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-3 -mx-2 px-2 pb-32">
              <AnimatePresence>
                {files.map((file, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex items-center justify-between p-4 bg-white/5 backdrop-blur-md rounded-2xl shadow-sm border border-white/10"
                  >
                    <div className="flex items-center overflow-hidden">
                      <div className="w-10 h-10 rounded-xl bg-black/40 border border-white/5 flex items-center justify-center shrink-0 mr-4">
                        {file.type.startsWith('image/') ? <ImageIcon className="w-4 h-4 text-bridgebox-400" /> : <FileText className="w-4 h-4 text-emerald-400" />}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-sm font-bold text-slate-200 truncate">{file.name}</p>
                        <p className="text-[11px] font-medium text-slate-500 mt-0.5">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <button onClick={() => removeFile(idx)} className="p-2 ml-2 text-slate-500 hover:text-red-400 active:text-red-400 rounded-full hover:bg-white/5 transition-colors shrink-0">
                      <X className="w-5 h-5" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <motion.div 
               initial={{ y: 100 }}
               animate={{ y: 0 }}
               className="fixed bottom-0 left-0 right-0 p-6 bg-slate-950/80 backdrop-blur-2xl border-t border-white/10 pb-safe z-50"
            >
              <button 
                onClick={submitFiles} 
                disabled={uploading}
                className="w-full flex items-center justify-center p-4 bg-emerald-500 text-white rounded-2xl font-bold text-lg active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-wait shadow-[0_0_30px_rgba(16,185,129,0.2)]"
              >
                {uploading ? (
                  <span className="flex items-center animate-pulse"><UploadCloud className="w-5 h-5 mr-3" /> Encrypting & Routing...</span>
                ) : (
                  `Transmit ${files.length} Payload${files.length > 1 ? 's' : ''}`
                )}
              </button>
            </motion.div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
