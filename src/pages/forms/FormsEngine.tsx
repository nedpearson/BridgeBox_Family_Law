import { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileSignature, ChevronLeft, Save, Download, Printer, 
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight,
  Sparkles, History, Search, CheckCircle2, MessageSquare, Play, RefreshCw, DollarSign
} from 'lucide-react';

export default function FormsEngine() {
  const { id } = useParams();
  const [documentTitle, setDocumentTitle] = useState("Motion for Temporary Spousal Support");
  const [isCopilotThinking, setIsCopilotThinking] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState<number | null>(null);
  const [editorContent, setEditorContent] = useState(
    `IN THE DISTRICT COURT OF THE 405TH JUDICIAL DISTRICT\nIN AND FOR THE COUNTY OF TRAVIS, STATE OF TEXAS\n\nIN THE MATTER OF THE MARRIAGE OF:\nMARIA PEARSON, Petitioner\nAND\nJOHN PEARSON, Respondent\n\nMOTION FOR TEMPORARY SPOUSAL SUPPORT\n\nTO THE HONORABLE JUDGE OF SAID COURT:\n\nCOMES NOW, MARIA PEARSON, Petitioner in the above-entitled and numbered cause, and files this Motion for Temporary Spousal Support, respectfully showing the Court the following:\n\n1. The parties were married on June 15, 2010, and separated on or about September 1, 2023.\n2. Petitioner lacks sufficient property, including property distributed to her under this decree, to provide for her minimum reasonable needs.`
  );

  const copilotActions = [
    { id: 1, title: "Draft Financial Hardship Argument", icon: <DollarSign className="w-4 h-4" />, prompt: "Using the Wells Fargo statements from the Evidence tab, draft a summary of the Respondent's recent $45,000 withdrawal." },
    { id: 2, title: "Insert Chronology Timeline", icon: <History className="w-4 h-4" />, prompt: "Insert the 3 most critical dates regarding the separation timeline." },
    { id: 3, title: "Review for ABA Compliance", icon: <CheckCircle2 className="w-4 h-4" />, prompt: "Scan this draft for mandatory local rules compliance." }
  ];

  const handleCopilotGenerate = (actionId: number) => {
    setActiveSuggestion(actionId);
    setIsCopilotThinking(true);
    
    // Simulate AI generation time
    setTimeout(() => {
      setIsCopilotThinking(false);
      if (actionId === 1) {
         setEditorContent(prev => prev + `\n\n3. FINANCIAL DISPARITY: Forensic analysis of the Respondent's Wells Fargo Account (Acct #XXXX-1234) reveals a unilateral withdrawal of $45,000.00 on October 14, 2023. This transfer to "Cayman Securities LLC" occurred precisely 6 weeks post-separation, severely compromising the community estate and the Petitioner's ability to maintain the marital standard of living.`);
      } else if (actionId === 2) {
         setEditorContent(prev => prev + `\n\n4. CHRONOLOGY OF EVENTS:\n   - June 15, 2010: Date of Marriage.\n   - Sept 01, 2023: Date of Separation.\n   - Oct 14, 2023: Respondent withdraws $45,000 from joint accounts.`);
      }
      setActiveSuggestion(null);
    }, 2500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-slate-50 overflow-hidden">
      
      {/* Top Toolbar */}
      <header className="h-14 border-b border-slate-200 bg-white flex items-center justify-between px-6 shrink-0 z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <Link to={`/app/matter/${id || 'mrt-882'}`} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-500">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <FileSignature className="w-5 h-5 text-indigo-500" />
            <input 
              type="text" 
              value={documentTitle}
              onChange={(e) => setDocumentTitle(e.target.value)}
              className="text-lg font-bold text-slate-800 border-none outline-none focus:ring-0 w-80 truncate"
            />
          </div>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 ml-2">Auto-saved</span>
        </div>

        <div className="flex items-center gap-2">
           <button className="flex items-center px-3 py-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors">
             <Printer className="w-4 h-4 mr-2" /> Print
           </button>
           <button className="flex items-center px-3 py-1.5 text-sm font-medium text-white bg-slate-900 rounded-md hover:bg-slate-800 transition-colors">
             <Download className="w-4 h-4 mr-2" /> Export PDF
           </button>
        </div>
      </header>

      {/* Main Dual-Pane Area */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT PANE: Rich Text Editor */}
        <div className="flex-1 flex flex-col items-center overflow-y-auto bg-slate-100/50 p-8">
           {/* Formatting Toolbar */}
           <div className="w-full max-w-4xl bg-white border border-slate-200 rounded-t-xl p-2 flex items-center gap-1 shadow-sm shrink-0">
              <select className="text-sm border-none bg-slate-50 rounded px-2 py-1 outline-none mr-2">
                <option>Times New Roman</option>
                <option>Arial</option>
              </select>
              <select className="text-sm border-none bg-slate-50 rounded px-2 py-1 outline-none mr-4">
                <option>12pt</option>
                <option>10pt</option>
                <option>14pt</option>
              </select>
              <div className="w-px h-6 bg-slate-200 mx-2"></div>
              <button className="p-1.5 hover:bg-slate-100 rounded transition-colors text-slate-700"><Bold className="w-4 h-4" /></button>
              <button className="p-1.5 hover:bg-slate-100 rounded transition-colors text-slate-700"><Italic className="w-4 h-4" /></button>
              <button className="p-1.5 hover:bg-slate-100 rounded transition-colors text-slate-700"><Underline className="w-4 h-4" /></button>
              <div className="w-px h-6 bg-slate-200 mx-2"></div>
              <button className="p-1.5 bg-slate-100 rounded transition-colors text-slate-900"><AlignLeft className="w-4 h-4" /></button>
              <button className="p-1.5 hover:bg-slate-100 rounded transition-colors text-slate-700"><AlignCenter className="w-4 h-4" /></button>
              <button className="p-1.5 hover:bg-slate-100 rounded transition-colors text-slate-700"><AlignRight className="w-4 h-4" /></button>
           </div>
           
           {/* Document Surface */}
           <div className="w-full max-w-4xl bg-white min-h-[1056px] border-x border-b border-slate-200 rounded-b-xl shadow-md p-16 pb-32 mb-16">
               <textarea
                 value={editorContent}
                 onChange={(e) => setEditorContent(e.target.value)}
                 className="w-full h-full min-h-[800px] resize-none border-none outline-none text-slate-900 font-serif text-[15px] leading-relaxed tracking-wide"
                 style={{ whiteSpace: 'pre-wrap' }}
               />
           </div>
        </div>

        {/* RIGHT PANE: Generative Drafting Copilot */}
        <div className="w-96 border-l border-slate-200 bg-white shadow-[-10px_0_30px_rgba(0,0,0,0.02)] flex flex-col shrink-0 relative overflow-hidden">
           
           {/* Copilot Header Gradients */}
           <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-indigo-50/80 to-transparent pointer-events-none"></div>

           <div className="p-6 border-b border-slate-100 relative z-10 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center">
                  <Sparkles className="w-5 h-5 text-indigo-500 mr-2" />
                  Matter Copilot
                </h3>
                <p className="text-xs text-slate-500 mt-1">Context: <strong className="text-slate-700">Pearson vs Pearson</strong></p>
              </div>
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
           </div>

           <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10">
              
              <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4">
                <p className="text-sm text-indigo-900 leading-relaxed font-medium">
                  I am analyzing your active draft and mapping it against the 45 admitted exhibits in the Master Chronology. How can I help you construct this argument?
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {copilotActions.map(action => (
                  <button 
                    key={action.id}
                    onClick={() => handleCopilotGenerate(action.id)}
                    disabled={isCopilotThinking}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-300 relative overflow-hidden group ${
                      activeSuggestion === action.id 
                        ? 'border-indigo-400 bg-indigo-50 shadow-md ring-2 ring-indigo-500/20' 
                        : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50 bg-white disabled:opacity-50 disabled:cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-start gap-3 relative z-10">
                       <div className={`mt-0.5 p-1.5 rounded-lg ${activeSuggestion === action.id ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors'}`}>
                         {action.icon}
                       </div>
                       <div>
                         <h4 className={`font-bold text-sm ${activeSuggestion === action.id ? 'text-indigo-900' : 'text-slate-800'}`}>{action.title}</h4>
                         <p className="text-xs text-slate-500 mt-1 line-clamp-2">{action.prompt}</p>
                       </div>
                    </div>

                    {/* Scanning Animation */}
                    {activeSuggestion === action.id && isCopilotThinking && (
                      <motion.div 
                        initial={{ left: '-100%' }}
                        animate={{ left: '100%' }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                        className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-indigo-600/10 to-transparent skew-x-12"
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Real-time generation feedback */}
              <AnimatePresence>
                {isCopilotThinking && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center py-8"
                  >
                    <RefreshCw className="w-8 h-8 text-indigo-500 animate-spin mb-3" />
                    <p className="text-sm font-bold text-indigo-800 tracking-wide">Synthesizing Argument...</p>
                    <p className="text-xs text-indigo-600/70 mt-1 font-mono">Cross-referencing Wells_Fargo_Q3.pdf</p>
                  </motion.div>
                )}
              </AnimatePresence>

           </div>

           {/* Manual Prompt Input */}
           <div className="p-4 border-t border-slate-100 bg-slate-50 mt-auto">
             <div className="relative">
               <textarea 
                 placeholder="Instruct Copilot..."
                 className="w-full h-24 bg-white border border-slate-200 rounded-xl p-3 pr-10 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium text-slate-700"
               />
               <button className="absolute bottom-3 right-3 p-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-sm">
                 <Play className="w-4 h-4" />
               </button>
             </div>
             <p className="text-[10px] text-center text-slate-400 mt-2 font-medium">AI-generated content should be reviewed prior to filing.</p>
           </div>
        </div>

      </div>
    </div>
  );
}


