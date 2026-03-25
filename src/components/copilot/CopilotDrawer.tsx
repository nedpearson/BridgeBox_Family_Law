import { useState, useEffect, useRef } from 'react';
import { Sparkles, X, Send, Bot, User, Loader2, FileText, ChevronRight } from 'lucide-react';

const INITIAL_MESSAGES = [
  {
    id: 'msg-1',
    role: 'assistant',
    content: "I'm Bridgebox AI, your contextual legal copilot. I currently have access to the **Pearson vs Pearson** active matter.",
    type: 'text'
  },
  {
    id: 'msg-2',
    role: 'assistant',
    content: "I've detected 3 unreviewed financial anomalies in the recent bank statement uploads.",
    type: 'insight',
    action: 'Review Anomalies'
  }
];

export default function CopilotDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Global Toggle Listener
  useEffect(() => {
    const handleToggle = () => setIsOpen((prev) => !prev);
    window.addEventListener('bridgebox-toggle-copilot', handleToggle);
    return () => window.removeEventListener('bridgebox-toggle-copilot', handleToggle);
  }, []);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { id: Date.now().toString(), role: 'user', content: input, type: 'text' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate LLM Contextual Stream
    setTimeout(() => {
      setIsTyping(false);
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Based on the transaction history in Chase Account ending in 4421, I have drafted the following discovery request targeting the hidden crypto exchanges.",
        type: 'generative_ui',
        action: 'Draft Request for Production'
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity" 
        onClick={() => setIsOpen(false)}
      />
      <div className="fixed top-0 right-0 h-screen w-full sm:w-[450px] bg-white shadow-2xl z-50 flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="h-16 border-b border-slate-100 flex items-center justify-between px-6 bg-slate-50 shrink-0">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mr-3 shadow-inner">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 tracking-tight">Bridgebox Copilot</h2>
              <p className="text-[11px] font-semibold text-emerald-600 flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span> Matter Context Active
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Feed */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-white">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              
              {/* Avatar */}
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 mr-3 border border-indigo-100">
                  <Bot className="w-4 h-4 text-indigo-600" />
                </div>
              )}

              <div className={`max-w-[85%] ${msg.role === 'user' ? 'order-1' : 'order-2'}`}>
                {msg.type === 'text' && (
                  <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-slate-900 text-white rounded-tr-none' : 'bg-slate-50 border border-slate-100 text-slate-800 rounded-tl-none'}`}>
                    {msg.content}
                  </div>
                )}

                {msg.type === 'insight' && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 shadow-sm w-full">
                    <div className="flex items-start">
                      <Sparkles className="w-4 h-4 text-amber-500 mr-2 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-amber-900 leading-relaxed mb-3">{msg.content}</p>
                        <button className="w-full py-2 bg-white border border-amber-200 text-xs font-bold text-amber-700 rounded-lg shadow-sm hover:bg-amber-100 transition-colors flex items-center justify-center">
                          {msg.action} <ChevronRight className="w-3 h-3 ml-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {msg.type === 'generative_ui' && (
                  <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden w-full">
                     <div className="bg-slate-50 border-b border-slate-100 p-3 flex items-center justify-between">
                       <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center">
                         <FileText className="w-3 h-3 mr-1.5" /> Generative Draft
                       </span>
                     </div>
                     <div className="p-4 bg-white">
                        <p className="text-sm font-medium text-slate-700 leading-relaxed mb-4">{msg.content}</p>
                        <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center justify-center">
                           {msg.action} <ChevronRight className="w-3 h-3 ml-1" />
                        </button>
                     </div>
                  </div>
                )}
              </div>

            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
               <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 mr-3 border border-indigo-100">
                  <Bot className="w-4 h-4 text-indigo-600" />
               </div>
               <div className="bg-slate-50 border border-slate-100 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1">
                 <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                 <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                 <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-100 shrink-0">
          <form onSubmit={handleSend} className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Copilot about this matter..."
              className="w-full pl-4 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
            />
            <button 
              type="submit"
              disabled={!input.trim() || isTyping}
              className="absolute right-2 top-1.5 bottom-1.5 px-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center shadow-sm"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </form>
          <p className="text-center text-[10px] font-semibold text-slate-400 mt-3 flex items-center justify-center">
            <Sparkles className="w-3 h-3 mr-1 opacity-50" /> AI can make mistakes. Verify legal outputs.
          </p>
        </div>

      </div>
    </>
  );
}
