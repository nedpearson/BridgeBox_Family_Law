import React, { useState, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { UploadCloud, FileType, CheckCircle, AlertCircle, X, FileText, BrainCircuit, Smartphone, QrCode } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { QRCodeSVG } from 'qrcode.react';

export default function EvidenceIntake() {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploadStatus, setUploadStatus] = useState<Record<string, string>>({}); // 'pending', 'uploading', 'success', 'error'
  const [intakeMode, setIntakeMode] = useState<'standard' | 'deposition'>('standard');
  const [mobileToken, setMobileToken] = useState<string | null>(null);

  const generateMobileSession = () => {
    const token = Math.random().toString(36).substring(2, 10);
    setMobileToken(token);
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      setFiles(prev => [...prev, ...droppedFiles]);
      droppedFiles.forEach(f => {
        setUploadStatus(prev => ({ ...prev, [f.name]: 'pending' }));
      });
    }
  }, []);

  const uploadFiles = async () => {
    // Determine target matter and tenant (Hardcoded 'Smith v Smith' mock ID for drilldown demonstration)
    const matterId = '22222222-2222-2222-2222-222222222222';
    const tenantId = '00000000-0000-0000-0000-000000000000';
    const workspaceId = '11111111-1111-1111-1111-111111111111';

    for (const file of files) {
      if (uploadStatus[file.name] === 'success') continue;
      
      setUploadStatus(prev => ({ ...prev, [file.name]: 'uploading' }));
      try {
        const filePath = `${tenantId}/${matterId}/${Date.now()}_${file.name}`;
        
        // 1. Upload to Storage
        const { error: storageErr } = await supabase.storage
          .from('evidence_bucket')
          .upload(filePath, file);

        if (storageErr) throw storageErr;

        // 2. Insert Evidence Record
        const { error: dbErr } = await supabase.from('evidence_items').insert({
          tenant_id: tenantId,
          workspace_id: workspaceId,
          matter_id: matterId,
          source_system: 'user_upload',
          title: file.name,
          type: file.type.includes('image') ? 'image' : 'document',
          file_url: filePath
        });

        if (dbErr) throw dbErr;

        setUploadStatus(prev => ({ ...prev, [file.name]: 'success' }));
      } catch (err) {
        setUploadStatus(prev => ({ ...prev, [file.name]: 'error' }));
      }
    }
  };

  const removeFile = (name: string) => {
    setFiles(files.filter(f => f.name !== name));
    setUploadStatus(prev => { const n = {...prev}; delete n[name]; return n; });
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Evidence & Transcript Intake</h1>
        <p className="text-gray-500 mt-1">Upload raw exports and loose documents. Files are strictly isolated to active matters and routed through the selected intelligence pipeline.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="flex bg-gray-100 p-1 rounded-lg w-full max-w-sm mb-2">
            <button 
              onClick={() => setIntakeMode('standard')}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center justify-center ${intakeMode === 'standard' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Standard Evidence
            </button>
            <button 
              onClick={() => setIntakeMode('deposition')}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center justify-center ${intakeMode === 'deposition' ? 'bg-white shadow-sm text-bridgebox-700' : 'text-gray-500 hover:text-gray-900'}`}
            >
              <BrainCircuit className="w-4 h-4 mr-1.5" /> Deposition Parser
            </button>
          </div>

          <div 
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${isDragging ? 'border-bridgebox-500 bg-bridgebox-50 select-none' : 'border-gray-300 hover:border-gray-400 bg-gray-50'}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {intakeMode === 'standard' ? (
              <UploadCloud className={`mx-auto h-12 w-12 ${isDragging ? 'text-bridgebox-600 animate-bounce' : 'text-gray-400'}`} />
            ) : (
              <FileText className={`mx-auto h-12 w-12 ${isDragging ? 'text-bridgebox-600 animate-bounce' : 'text-bridgebox-400'}`} />
            )}
            <h3 className="mt-4 text-sm font-medium text-gray-900">
              {intakeMode === 'standard' ? 'Drag and drop raw evidence exports here' : 'Drop verbatim .txt or .pdf deposition transcripts here'}
            </h3>
            <p className="mt-1 text-xs text-gray-500">
              {intakeMode === 'standard' 
                ? 'Supports PDF, PNG, JPG, MSG, and JSON exports from SoberLink or OFW.' 
                : 'The AI will parse Q&A pairs, tag critical admissions, and inject them into the Timeline chronologically.'}
            </p>
            <label className="mt-6 inline-flex cursor-pointer items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-bridgebox-600 hover:bg-bridgebox-700">
              Browse Files
              <input type="file" className="hidden" multiple onChange={(e) => {
                if (e.target.files) {
                  const arr = Array.from(e.target.files);
                  setFiles(prev => [...prev, ...arr]);
                  arr.forEach(f => setUploadStatus(prev => ({ ...prev, [f.name]: 'pending' })));
                }
              }} />
            </label>
          </div>

          {files.length > 0 && (
            <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b flex justify-between items-center bg-gray-50">
                <h3 className="text-sm font-medium text-gray-900">Pending Uploads ({files.length})</h3>
                <button onClick={uploadFiles} className="text-xs bg-gray-900 text-white px-3 py-1.5 rounded hover:bg-gray-800">Process All</button>
              </div>
              <ul className="divide-y divide-gray-100">
                {files.map((f, i) => (
                  <li key={i} className="px-4 py-3 flex items-center justify-between hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <FileType className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{f.name}</p>
                        <p className="text-xs text-gray-500">{(f.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {uploadStatus[f.name] === 'success' && <CheckCircle className="w-5 h-5 text-green-500" />}
                      {uploadStatus[f.name] === 'error' && <AlertCircle className="w-5 h-5 text-red-500" />}
                      {uploadStatus[f.name] === 'uploading' && <div className="text-xs font-medium text-blue-600 animate-pulse">Uploading...</div>}
                      {uploadStatus[f.name] === 'pending' && <button onClick={() => removeFile(f.name)}><X className="w-4 h-4 text-gray-400 hover:text-red-500" /></button>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Batch Auto-Assignment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase">Target Matter</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-bridgebox-500 focus:ring-bridgebox-500 sm:text-sm">
                  <option>Smith v. Smith</option>
                  <option>Johnson Custody Mod</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase">Override Source Tracker</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-bridgebox-500 focus:ring-bridgebox-500 sm:text-sm">
                  <option>Auto-Detect</option>
                  <option>Client Upload (Portal)</option>
                  <option>OurFamilyWizard Export</option>
                </select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center"><Smartphone className="w-4 h-4 mr-2" /> Field Intake Portal</CardTitle>
            </CardHeader>
            <CardContent>
              {mobileToken ? (
                <div className="flex flex-col items-center justify-center p-4 bg-slate-50 border border-bridgebox-200 rounded-lg">
                  <div className="bg-white p-2 rounded-xl shadow-sm mb-3">
                    <QRCodeSVG value={`${window.location.origin}/m/${mobileToken}`} size={128} />
                  </div>
                  <p className="text-xs text-center font-bold text-bridgebox-700 mb-2">Scan to open Secure Upload</p>
                  <p className="text-[10px] text-center text-slate-500 break-all bg-slate-200 p-2 rounded-md w-full font-mono font-medium border border-slate-300">
                    {window.location.origin}/m/{mobileToken}
                  </p>
                  <button onClick={() => setMobileToken(null)} className="mt-3 text-xs font-semibold text-slate-400 hover:text-slate-600">Close Session</button>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-xs font-medium text-slate-500 mb-4 leading-relaxed">Generate an encrypted QR code session for your client to upload files directly from their camera roll.</p>
                  <button onClick={generateMobileSession} className="w-full flex items-center justify-center px-4 py-2 bg-bridgebox-600 hover:bg-bridgebox-700 text-white text-sm font-semibold rounded-md shadow-sm transition-colors">
                    <QrCode className="w-4 h-4 mr-2" /> Generate Pairing Link
                  </button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
