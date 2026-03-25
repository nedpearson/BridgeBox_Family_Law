import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent } from '../../components/ui/Card';
import { UploadCloud, FileType, CheckCircle, Scale, ShieldCheck } from 'lucide-react';
// import { supabase } from '../../lib/supabase';

export default function CollaboratorPortal() {
  const { requestId } = useParams();
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploadComplete, setUploadComplete] = useState(false);

  // In production, we would use useEffect to fetch the records_request row using reqId
  // to ensure the token is still valid, not expired, and belongs to a specific matter.
  const targetName = "Dr. Jane Smith";
  const requestingFirm = "Bridgebox Legal Partners";

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleUpload = () => {
    // In production, these push into the 'evidence_bucket' linked specifically via the requestId's matter_id 
    // to prevent cross-tenant leakage.
    setTimeout(() => {
      setUploadComplete(true);
    }, 1500);
  };

  if (uploadComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl border-t-8 border-t-bridgebox-600 relative overflow-hidden">
          <CardContent className="pt-12 pb-10 px-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Complete</h2>
            <p className="text-sm text-gray-600 mb-6">
              Thank you, {targetName}. Your documents have been safely encrypted and transferred directly to {requestingFirm}.
            </p>
            <div className="flex items-center text-xs text-gray-400 font-medium">
              <ShieldCheck className="w-4 h-4 mr-1" /> End-to-End Encrypted Transfer
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {/* Strict Isolated Navbar */}
      <div className="absolute top-0 w-full h-16 bg-white border-b flex items-center px-8 shadow-sm justify-between">
        <div className="flex items-center">
          <Scale className="w-6 h-6 text-bridgebox-600 mr-2" />
          <span className="text-xl font-bold text-gray-900 tracking-tight">Bridgebox</span>
        </div>
        <div className="flex items-center text-sm font-medium text-gray-500">
          <ShieldCheck className="w-4 h-4 mr-1.5 text-green-600" /> Secure External Portal
        </div>
      </div>

      <Card className="w-full max-w-2xl shadow-xl mt-12">
        <CardContent className="p-10 space-y-6">
          <div className="text-center space-y-2 mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Secure File Request</h1>
            <p className="text-sm text-gray-600">
              {requestingFirm} has requested you upload official evaluation documents or records.
              These files will be handled strictly within the active matter's protected partition.
            </p>
            <p className="text-xs text-gray-400 font-medium mt-4 bg-gray-100 py-1 px-3 rounded-full inline-block">Request ID: {requestId}</p>
          </div>

          <div 
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${isDragging ? 'border-bridgebox-500 bg-bridgebox-50' : 'border-gray-300 bg-white hover:bg-gray-50'}`}
            onDragEnter={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <UploadCloud className={`mx-auto h-12 w-12 ${isDragging ? 'text-bridgebox-600 animate-bounce' : 'text-gray-400'}`} />
            <h3 className="mt-4 text-sm font-medium text-gray-900">Drag and drop requested files here</h3>
            <p className="mt-1 text-xs text-gray-500">PDF, DOCX, or Excel schedules up to 50MB</p>
            <label className="mt-6 inline-flex cursor-pointer items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Select Files
              <input type="file" className="hidden" multiple onChange={(e) => setFiles(e.target.files ? Array.from(e.target.files) : [])} />
            </label>
          </div>

          {files.length > 0 && (
            <div className="mt-6">
              <ul className="divide-y divide-gray-100 border rounded-lg bg-gray-50 overflow-hidden">
                {files.map((f, i) => (
                  <li key={i} className="px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileType className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{f.name}</p>
                        <p className="text-xs text-gray-500">{(f.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={handleUpload}
                className="w-full mt-6 flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-bridgebox-600 hover:bg-bridgebox-700"
              >
                Encrypt and Transmit to Firm
              </button>
            </div>
          )}
        </CardContent>
      </Card>
      
      <p className="mt-8 text-xs text-center text-gray-400 max-w-md">
        Uploaded materials are immediately placed into Bridgebox Isolated Storage. Your link will automatically expire upon successful transmission.
      </p>
    </div>
  );
}
