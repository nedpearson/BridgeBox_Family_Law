import { useState } from 'react';
import { 
  MessageSquare, Search, Phone, Video, MoreVertical, 
  Paperclip, Send, ShieldCheck, CheckCheck, Smile 
} from 'lucide-react';
import { Badge } from '../../components/ui/Badge';

export default function SecureMessages() {
  const [activeThread, setActiveThread] = useState(1);
  const [message, setMessage] = useState('');

  const threads = [
    { id: 1, name: "Maria Pearson", role: "Client", preview: "I found the hidden Wells Fargo account statement.", time: "10:42 AM", unread: 2, avatar: "MP" },
    { id: 2, name: "David Martinez, Esq.", role: "Opposing Counsel", preview: "We reject the 55/45 asset split proposal.", time: "Yesterday", unread: 0, avatar: "DM" },
    { id: 3, name: "Team: Pearson vs Pearson", role: "Internal Matter", preview: "Paralegal: The QDRO forms are drafted.", time: "Tuesday", unread: 0, avatar: "PP" },
    { id: 4, name: "Dr. Evans (Custody Eval)", role: "Expert Witness", preview: "The psychological evaluation is complete.", time: "Monday", unread: 0, avatar: "DE" }
  ];

  const chatHistory = [
    { id: 1, sender: "Maria Pearson", isMe: false, text: "Hi! Are you available to review the documents I uploaded to the portal last night?", time: "09:15 AM" },
    { id: 2, sender: "Me", isMe: true, text: "Yes, our paralegal team is running them through the forensic extraction pipeline right now. Should have an update by noon.", time: "09:22 AM" },
    { id: 3, sender: "Maria Pearson", isMe: false, text: "Okay, perfect. Also, I found the hidden Wells Fargo account statement. It shows the $45,000 transfer.", time: "10:42 AM" }
  ];

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-white overflow-hidden">
      
      {/* Sidebar: Threads */}
      <div className="w-80 border-r border-slate-200 flex flex-col bg-slate-50">
        <div className="p-4 border-b border-slate-200 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center">
              <ShieldCheck className="w-5 h-5 text-emerald-500 mr-2" />
              Secure Inbox
            </h2>
            <button className="p-2 hover:bg-slate-100 rounded-full transition-colors hidden md:block">
              <MoreVertical className="w-5 h-5 text-slate-500" />
            </button>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search encrypted channels..." 
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500/50 outline-none"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {threads.map(thread => (
            <button 
              key={thread.id}
              onClick={() => setActiveThread(thread.id)}
              className={`w-full p-4 border-b border-slate-100 flex items-start gap-3 text-left transition-colors ${activeThread === thread.id ? 'bg-emerald-50 border-emerald-100' : 'hover:bg-slate-100 bg-white'}`}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white font-bold flex-shrink-0 shadow-sm">
                {thread.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className={`font-semibold truncate ${activeThread === thread.id ? 'text-emerald-900' : 'text-slate-900'}`}>{thread.name}</h3>
                  <span className={`text-xs ${thread.unread > 0 ? 'text-emerald-600 font-bold' : 'text-slate-400'}`}>{thread.time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className={`text-xs truncate max-w-[160px] ${thread.unread > 0 ? 'text-slate-900 font-medium' : 'text-slate-500'}`}>{thread.preview}</p>
                  {thread.unread > 0 && (
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">
                      {thread.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-slate-50/50 relative">
        {/* Chat Header */}
        <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-6 shadow-sm z-10">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white font-bold">
               MP
             </div>
             <div>
               <h2 className="font-bold text-slate-900">Maria Pearson</h2>
               <div className="flex items-center gap-2">
                 <Badge variant="default" className="text-[10px] px-1.5 py-0 h-4 bg-blue-100 text-blue-700">Client</Badge>
                 <span className="text-xs text-emerald-600 font-medium flex items-center">
                   <ShieldCheck className="w-3 h-3 mr-1" /> E2E Encrypted
                 </span>
               </div>
             </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-400 hover:bg-slate-100 hover:text-bridgebox-600 rounded-full transition-colors"><Phone className="w-5 h-5" /></button>
            <button className="p-2 text-slate-400 hover:bg-slate-100 hover:text-bridgebox-600 rounded-full transition-colors"><Video className="w-5 h-5" /></button>
            <div className="w-px h-6 bg-slate-200 mx-2"></div>
            <button className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-full transition-colors"><Search className="w-5 h-5" /></button>
          </div>
        </header>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
           <div className="text-center my-6">
             <span className="text-xs font-bold text-slate-400 bg-slate-200/50 px-3 py-1 rounded-full uppercase tracking-widest">Today</span>
           </div>
           
           {chatHistory.map(msg => (
             <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
               <div className={`max-w-[70%] rounded-2xl p-4 shadow-sm ${msg.isMe ? 'bg-bridgebox-600 text-white rounded-br-none' : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none'}`}>
                 <p className="text-sm leading-relaxed">{msg.text}</p>
                 <div className={`text-[10px] mt-2 flex items-center justify-end font-medium ${msg.isMe ? 'text-bridgebox-200' : 'text-slate-400'}`}>
                   {msg.time}
                   {msg.isMe && <CheckCheck className="w-3 h-3 ml-1" />}
                 </div>
               </div>
             </div>
           ))}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-200">
          <div className="flex items-end gap-2 bg-slate-50 border border-slate-200 rounded-2xl p-2 focus-within:border-bridgebox-400 focus-within:ring-2 focus-within:ring-bridgebox-500/20 transition-all">
            <button className="p-2 text-slate-400 hover:text-bridgebox-600 transition-colors">
              <Paperclip className="w-5 h-5" />
            </button>
            <textarea 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a secure message..."
              className="flex-1 max-h-32 min-h-[40px] bg-transparent resize-none p-2 outline-none text-sm text-slate-800 placeholder:text-slate-400"
              rows={1}
            />
            <button className="p-2 text-slate-400 hover:text-bridgebox-600 transition-colors">
              <Smile className="w-5 h-5" />
            </button>
            <button 
              className={`p-2 rounded-xl transition-all ${message.length > 0 ? 'bg-bridgebox-600 text-white shadow-md' : 'bg-slate-200 text-slate-400'}`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-center text-[10px] text-slate-400 font-medium mt-2 flex items-center justify-center">
            <ShieldCheck className="w-3 h-3 mr-1" /> Messages are secured with AES-256 and compliant with ABA Model Rule 1.6
          </p>
        </div>
      </div>
      
    </div>
  );
}
