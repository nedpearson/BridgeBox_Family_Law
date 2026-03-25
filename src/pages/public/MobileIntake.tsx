import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Camera, Image as ImageIcon, CheckCircle2, Shield, UploadCloud, X, FileText } from 'lucide-react';

export default function MobileIntake() {
  const { token } = useParams();
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [complete, setComplete] = useState(false);

  // In production, fetch token validity from Supabase
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
    // Simulate Supabase Storage upload
    setTimeout(() => {
      setUploading(false);
      setComplete(true);
    }, 1500);
  };

  if (!isValid) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-center">
        <Shield className="w-16 h-16 text-slate-500 mb-4" />
        <h1 className="text-2xl font-bold text-white mb-2">Link Expired</h1>
        <p className="text-slate-400">This secure upload session has expired or is invalid. Please request a new link from your attorney.</p>
      </div>
    );
  }

  if (complete) {
    return (
      <div className="min-h-[100dvh] bg-emerald-500 flex flex-col items-center justify-center p-6 text-center">
        <CheckCircle2 className="w-24 h-24 text-white mb-6" />
        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Transmission Complete</h1>
        <p className="text-emerald-100 font-medium text-lg leading-snug">
          {files.length} items have been securely encrypted and deposited directly into {firmName}'s isolated vault.
        </p>
        <p className="text-emerald-200 mt-8 text-sm">You may safely close this window.</p>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-slate-50 flex flex-col pb-safe">
      {/* Mobile Branding Header */}
      <header className="bg-slate-900 pt-12 pb-6 px-6 shadow-md rounded-b-[2rem]">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="w-5 h-5 text-bridgebox-400" />
          <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Secure Field Intake</span>
        </div>
        <h1 className="text-2xl font-bold text-white font-display leading-tight">
          Upload Evidence to {firmName}
        </h1>
      </header>

      {/* Main Upload Actions */}
      <main className="flex-1 px-6 py-8 flex flex-col">
        {!files.length ? (
          <div className="flex-1 flex flex-col justify-center space-y-6">
            <div className="text-center mb-4">
              <p className="text-slate-500 font-medium">Select what you would like to securely upload to your matter file today.</p>
            </div>
            
            {/* Camera Button */}
            <label className="relative flex flex-col items-center justify-center p-8 bg-bridgebox-600 text-white rounded-3xl shadow-lg shadow-bridgebox-600/30 active:scale-95 transition-transform overflow-hidden group">
              <div className="absolute inset-0 bg-white/10 group-active:bg-transparent transition-colors"></div>
              <Camera className="w-12 h-12 mb-3" />
              <span className="text-lg font-bold">Take Photo / Video</span>
              <span className="text-xs text-bridgebox-200 mt-1">Capture right now</span>
              <input 
                type="file" 
                accept="image/*,video/*" 
                capture="environment"
                className="hidden" 
                onChange={handleFileSelect}
                multiple
              />
            </label>

            <div className="flex items-center gap-4 text-slate-400 text-sm font-bold uppercase tracking-widest my-2">
              <div className="h-px bg-slate-200 flex-1"></div>
              OR
              <div className="h-px bg-slate-200 flex-1"></div>
            </div>

            {/* Library Button */}
            <label className="flex flex-col items-center justify-center p-6 bg-white border-2 border-slate-200 text-slate-700 rounded-3xl active:bg-slate-50 transition-colors">
              <ImageIcon className="w-8 h-8 mb-2 text-slate-400" />
              <span className="text-base font-bold">Choose from Library</span>
              <span className="text-xs text-slate-500 mt-1">Select previous screenshots</span>
              <input 
                type="file" 
                accept="image/*,video/*,.pdf" 
                className="hidden" 
                onChange={handleFileSelect} 
                multiple
              />
            </label>
          </div>
        ) : (
          <div className="flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-slate-900">Queued for Upload ({files.length})</h2>
              <label className="text-sm font-bold text-bridgebox-600 active:text-bridgebox-700">
                + Add More
                <input type="file" className="hidden" onChange={handleFileSelect} multiple />
              </label>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-3 -mx-2 px-2 pb-24">
              {files.map((file, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                  <div className="flex items-center overflow-hidden">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 mr-3">
                      {file.type.startsWith('image/') ? <ImageIcon className="w-5 h-5 text-slate-400" /> : <FileText className="w-5 h-5 text-slate-400" />}
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-sm font-bold text-slate-800 truncate">{file.name}</p>
                      <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <button onClick={() => removeFile(idx)} className="p-2 text-slate-400 active:text-red-500 rounded-full bg-slate-50 active:bg-red-50">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-xl border-t border-slate-200 pb-safe">
              <button 
                onClick={submitFiles} 
                disabled={uploading}
                className="w-full flex items-center justify-center p-4 bg-slate-900 text-white rounded-2xl font-bold text-lg active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {uploading ? (
                  <span className="flex items-center animate-pulse"><UploadCloud className="w-5 h-5 mr-2" /> Encrypting & Transmitting...</span>
                ) : (
                  `Upload ${files.length} Item${files.length > 1 ? 's' : ''} Now`
                )}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
