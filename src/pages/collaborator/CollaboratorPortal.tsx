import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { UploadCloud, FileType, CheckCircle, Scale, ShieldCheck, Lock, ArrowRight, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CollaboratorPortal() {
  const { requestId } = useParams();
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Simulated Database Row
  const targetName = "Dr. Jane Smith";
  const requestingFirm = "Bridgebox Legal Partners";
  const matterReference = "Matter #882-C (Pearson Custody)";

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleUpload = () => {
    setIsUploading(true);
    // Simulate secure transmission to Edge Function
    setTimeout(() => {
      setIsUploading(false);
      setUploadComplete(true);
    }, 2000);
  };

  if (uploadComplete) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden relative z-10"
        >
          <div className="h-2 w-full bg-gradient-to-r from-emerald-400 to-emerald-600"></div>
          <div className="pt-12 pb-10 px-8 text-center flex flex-col items-center">
            
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.2)]"
            >
              <CheckCircle className="w-10 h-10 text-emerald-400" />
            </motion.div>

            <h2 className="text-3xl font-display font-bold text-white mb-3">Transmission Secure</h2>
            <p className="text-sm text-slate-300 mb-8 leading-relaxed font-medium">
              Thank you, {targetName}. Your documents have been 256-bit AES encrypted and routed directly to the isolated partition for <strong>{requestingFirm}</strong>.
            </p>

            <div className="w-full bg-black/40 border border-white/5 rounded-xl p-4 mb-8 text-left">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Destination</span>
                <span className="text-xs font-bold text-emerald-400 flex items-center"><Activity className="w-3 h-3 mr-1" /> Verified</span>
              </div>
              <p className="text-sm text-white font-medium">{matterReference}</p>
            </div>

            <div className="flex items-center justify-center w-full mt-2">
               <ShieldCheck className="w-4 h-4 text-slate-500 mr-2" />
               <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">SOC-2 Compliant Transfer</span>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-bridgebox-900/40 via-slate-900 to-slate-950"></div>
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-bridgebox-600/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>
      
      {/* Strict Isolated Navbar */}
      <motion.div 
         initial={{ y: -50, opacity: 0 }}
         animate={{ y: 0, opacity: 1 }}
         className="absolute top-0 w-full h-20 bg-black/40 backdrop-blur-xl border-b border-white/10 flex items-center px-6 sm:px-12 shadow-sm justify-between z-20"
      >
        <Link to="/" className="flex items-center group cursor-pointer">
          <div className="w-10 h-10 bg-gradient-to-br from-bridgebox-500 to-bridgebox-700 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform border border-white/10">
            <Scale className="w-5 h-5 text-white" />
          </div>
          <span className="ml-3 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300 tracking-tight font-display">
            Bridgebox
          </span>
        </Link>
        <div className="flex items-center px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-bold text-emerald-400">
          <ShieldCheck className="w-3.5 h-3.5 mr-1.5" /> E2E Encrypted Gateway
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] z-10 mt-16 overflow-hidden"
      >
        <div className="p-8 sm:p-12">
          
          <div className="text-center space-y-3 mb-10">
            <h1 className="text-3xl font-display font-bold text-white tracking-tight">Secure Evidence Upload</h1>
            <p className="text-sm text-slate-400 font-medium max-w-lg mx-auto leading-relaxed">
              <strong className="text-slate-200">{requestingFirm}</strong> has requested documents for <strong className="text-slate-200">{matterReference}</strong>. 
              Files dropped here are AES-256 encrypted before leaving your browser.
            </p>
            <div className="mt-4 inline-flex items-center justify-center">
               <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase bg-black/40 px-3 py-1 rounded-full border border-white/5">
                 <Lock className="w-3 h-3 inline mr-1 -mt-0.5" /> Request ID: {requestId?.substring(0,8) || 'CHK-992A'}
               </span>
            </div>
          </div>

          <div 
            className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
              isDragging 
                ? 'border-bridgebox-400 bg-bridgebox-500/10 shadow-[0_0_30px_rgba(56,189,248,0.2)]' 
                : 'border-slate-700 bg-black/20 hover:bg-black/40 hover:border-slate-600'
            }`}
            onDragEnter={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <UploadCloud className={`mx-auto h-14 w-14 transition-all duration-300 ${isDragging ? 'text-bridgebox-400 scale-110' : 'text-slate-600'}`} />
            <h3 className="mt-5 text-base font-bold text-white">Drag and drop requested files here</h3>
            <p className="mt-2 text-sm text-slate-400 font-medium">Supports PDF, DOCX, CSV, and ZIP up to 100MB.</p>
            
            <label className="mt-8 inline-flex cursor-pointer items-center px-6 py-2.5 border border-slate-600 shadow-sm text-sm font-bold rounded-xl text-white bg-slate-800 hover:bg-slate-700 hover:border-slate-500 transition-all">
              Select Files from Computer
              <input type="file" className="hidden" multiple onChange={(e) => setFiles(e.target.files ? Array.from(e.target.files) : [])} />
            </label>
          </div>

          {files.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-8"
            >
              <div className="flex items-center justify-between mb-3">
                 <h4 className="text-sm font-bold text-slate-300 tracking-wide">Files Ready for Transmission</h4>
                 <span className="text-xs font-bold text-bridgebox-400 bg-bridgebox-500/10 px-2.5 py-1 rounded-full">{files.length} Item(s)</span>
              </div>
              
              <ul className="divide-y divide-white/5 border border-white/10 rounded-xl bg-black/40 overflow-hidden backdrop-blur-sm">
                {files.map((f, i) => (
                  <li key={i} className="px-5 py-3.5 flex items-center justify-between hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-4">
                      <FileType className="w-5 h-5 text-slate-500" />
                      <div>
                        <p className="text-sm font-bold text-slate-200">{f.name}</p>
                        <p className="text-[11px] font-medium text-slate-500 mt-0.5">{(f.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={handleUpload}
                disabled={isUploading}
                className="w-full mt-6 py-4 px-4 border border-transparent rounded-xl shadow-[0_0_20px_rgba(2,132,199,0.3)] text-sm font-bold text-white bg-bridgebox-600 hover:bg-bridgebox-500 focus:outline-none focus:ring-2 focus:ring-bridgebox-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all disabled:opacity-75 disabled:cursor-wait flex items-center justify-center group"
              >
                {isUploading ? (
                  <div className="flex items-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                    Encrypting Payload...
                  </div>
                ) : (
                  <>Encrypt and Transmit to Firm <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                )}
              </button>
            </motion.div>
          )}

        </div>
      </motion.div>
      
      <p className="mt-8 text-xs text-center text-slate-500 font-medium max-w-md relative z-10">
        Uploaded materials are immediately placed into Bridgebox Isolated Storage. Your link will automatically expire upon successful transmission to protect chain-of-custody.
      </p>
    </div>
  );
}
