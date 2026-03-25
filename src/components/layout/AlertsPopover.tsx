import { useState, useRef, useEffect } from 'react';
import { Bell, CheckCircle2, ShieldAlert, FileText, Check, Plug } from 'lucide-react';

const MOCK_ALERTS = [
  {
    id: 1,
    title: 'SoberLink Violation Detected',
    message: 'A BAC of 0.04% was recorded in the Jones Custody timeline.',
    time: '2 mins ago',
    type: 'critical',
    icon: ShieldAlert,
    unread: true
  },
  {
    id: 2,
    title: 'QuickBooks Sync Completed',
    message: 'Successfully pulled 142 new transactions into the Trial Balance.',
    time: '1 hour ago',
    type: 'success',
    icon: Plug,
    unread: true
  },
  {
    id: 3,
    title: 'New Evidence Uploaded',
    message: 'Client uploaded 4 new bank statements via Mobile Portal.',
    time: '3 hours ago',
    type: 'info',
    icon: FileText,
    unread: false
  }
];

export default function AlertsPopover() {
  const [isOpen, setIsOpen] = useState(false);
  const [alerts, setAlerts] = useState(MOCK_ALERTS);
  const popoverRef = useRef<HTMLDivElement>(null);

  const unreadCount = alerts.filter(a => a.unread).length;

  // Handle clicking outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const markAllRead = () => {
    setAlerts(alerts.map(a => ({ ...a, unread: false })));
  };

  const getIconColor = (type: string) => {
    if (type === 'critical') return 'text-red-500 bg-red-50';
    if (type === 'success') return 'text-emerald-500 bg-emerald-50';
    return 'text-blue-500 bg-blue-50';
  };

  return (
    <div className="relative" ref={popoverRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-500 hover:text-gray-900 transition-colors rounded-full hover:bg-slate-100"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 lg:w-96 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/50">
            <h3 className="text-sm font-bold text-slate-900">Notifications</h3>
            {unreadCount > 0 && (
              <button 
                onClick={markAllRead}
                className="text-xs font-semibold text-bridgebox-600 hover:text-bridgebox-700 flex items-center"
              >
                <Check className="w-3.5 h-3.5 mr-1" /> Mark all read
              </button>
            )}
          </div>
          
          <div className="max-h-[400px] overflow-y-auto">
            {alerts.length === 0 ? (
              <div className="p-8 text-center bg-slate-50">
                <CheckCircle2 className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-sm font-medium text-slate-500">You're all caught up!</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {alerts.map((alert) => (
                  <div 
                    key={alert.id} 
                    className={`p-4 hover:bg-slate-50 transition-colors flex gap-4 cursor-pointer relative ${alert.unread ? 'bg-bridgebox-50/30' : ''}`}
                  >
                    {alert.unread && (
                       <span className="absolute left-0 top-0 bottom-0 w-1 bg-bridgebox-500"></span>
                    )}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${getIconColor(alert.type)}`}>
                      <alert.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{alert.title}</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{alert.message}</p>
                      <p className="text-[11px] font-bold text-slate-400 mt-2 uppercase tracking-wider">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="p-2 border-t border-slate-100 bg-slate-50/50">
            <button 
              onClick={() => setIsOpen(false)}
              className="w-full py-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors rounded-lg hover:bg-slate-100"
            >
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
