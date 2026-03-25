import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Calendar as CalendarIcon, Filter, Search, ChevronLeft, ChevronRight, Clock, AlertTriangle, Users } from 'lucide-react';

export default function FirmCalendar() {
  const [currentMonth, setCurrentMonth] = useState('March 2026');

  const events = [
    { id: 1, type: 'hearing', date: '2026-03-22', title: 'Smith vs Smith - Motion to Compel', time: '9:30 AM', attorney: 'Ned Pearson', location: 'Daley Center Rm 1902', urgent: true },
    { id: 2, type: 'deadline', date: '2026-03-24', title: 'Williams Post-Decree - Discovery Answers Due', time: '5:00 PM', attorney: 'Sarah Jenkins', location: 'E-Filing Portal', urgent: true },
    { id: 3, type: 'evaluation', date: '2026-03-28', title: 'Johnson Custody - Dr. Peterson Interview', time: '1:00 PM', attorney: 'Ned Pearson', location: 'Dr. Peterson Office', urgent: false },
    { id: 4, type: 'hearing', date: '2026-04-02', title: 'Peters vs Peters - Prove Up', time: '10:00 AM', attorney: 'Ned Pearson', location: 'Zoom Rm B', urgent: false },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-display">Firm Strategy Calendar</h1>
          <p className="text-slate-500 mt-1">Global deadline tracking across all active litigation matters.</p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-2.5 text-slate-400" />
            <input type="text" placeholder="Search events..." className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm w-72 focus:ring-bridgebox-500 focus:border-bridgebox-500" />
          </div>
          <button className="flex items-center px-4 py-2 bg-slate-900 text-white rounded-md text-sm font-semibold hover:bg-slate-800 shadow-md">
            + New Event
          </button>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Filters */}
        <div className="w-64 shrink-0 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Attorney Scope</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <label className="flex items-center text-sm text-slate-700 gap-2 cursor-pointer">
                <input type="radio" name="scope" defaultChecked className="text-bridgebox-600 focus:ring-bridgebox-500" /> My Matters
              </label>
              <label className="flex items-center text-sm text-slate-700 gap-2 cursor-pointer">
                <input type="radio" name="scope" className="text-bridgebox-600 focus:ring-bridgebox-500" /> Entire Firm
              </label>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Event Types</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <label className="flex items-center text-sm text-slate-700 gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-bridgebox-600 focus:ring-bridgebox-500" />
                <span className="w-3 h-3 rounded-full bg-red-500 inline-block mr-1"></span> Hearings / Trials
              </label>
              <label className="flex items-center text-sm text-slate-700 gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-bridgebox-600 focus:ring-bridgebox-500" />
                <span className="w-3 h-3 rounded-full bg-orange-500 inline-block mr-1"></span> Discovery Deadlines
              </label>
              <label className="flex items-center text-sm text-slate-700 gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-bridgebox-600 focus:ring-bridgebox-500" />
                <span className="w-3 h-3 rounded-full bg-bridgebox-500 inline-block mr-1"></span> Evaluations
              </label>
            </CardContent>
          </Card>
        </div>

        {/* Main List View (Simulation of Agenda/Month) */}
        <div className="flex-1 space-y-6">
          <div className="bg-white border rounded-xl shadow-sm p-4 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-900 flex items-center">
              <CalendarIcon className="w-5 h-5 mr-2 text-bridgebox-600" /> {currentMonth}
            </h2>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-slate-100 rounded-md text-slate-600"><ChevronLeft className="w-5 h-5" /></button>
              <button className="px-3 py-1.5 bg-slate-100 text-sm font-semibold text-slate-700 rounded-md">Today</button>
              <button className="p-2 hover:bg-slate-100 rounded-md text-slate-600"><ChevronRight className="w-5 h-5" /></button>
            </div>
            <div className="flex bg-slate-100 p-1 rounded-lg">
              <button className="px-4 py-1.5 text-xs font-bold rounded-md transition-colors bg-white shadow-sm text-slate-900">Agenda</button>
              <button className="px-4 py-1.5 text-xs font-bold rounded-md transition-colors text-slate-500 hover:text-slate-900">Month</button>
            </div>
          </div>

          <div className="space-y-4">
            {events.map(event => (
              <div key={event.id} className="bg-white rounded-xl border p-5 flex items-center justify-between shadow-sm hover:border-bridgebox-300 transition-colors group cursor-pointer">
                <div className="flex items-start gap-5">
                  <div className="text-center w-16 shrink-0 mt-1">
                    <p className="text-xs font-bold text-slate-400 uppercase">{new Date(event.date).toLocaleDateString('en-US', { weekday: 'short' })}</p>
                    <p className="text-2xl font-bold text-slate-900 leading-none">{new Date(event.date).getDate()}</p>
                  </div>
                  <div className={`w-1 rounded-full ${event.type === 'hearing' ? 'bg-red-500' : event.type === 'deadline' ? 'bg-orange-500' : 'bg-bridgebox-500'} self-stretch mx-2`} />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-lg font-bold text-slate-900 group-hover:text-bridgebox-700 transition-colors">{event.title}</h4>
                      {event.urgent && <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-red-50 text-red-700 border border-red-200 uppercase tracking-wider"><AlertTriangle className="w-3 h-3 mr-1" /> Priority</span>}
                    </div>
                    <div className="mt-2 flex items-center gap-4 text-sm text-slate-500 font-medium">
                      <span className="flex items-center"><Clock className="w-4 h-4 mr-1.5 text-slate-400" /> {event.time}</span>
                      <span className="flex items-center"><CalendarIcon className="w-4 h-4 mr-1.5 text-slate-400" /> {event.location}</span>
                      <span className="flex items-center"><Users className="w-4 h-4 mr-1.5 text-slate-400" /> {event.attorney}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
