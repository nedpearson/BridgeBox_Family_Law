import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Search, Filter, ShieldAlert, Award, AlertTriangle, FileText, ChevronRight } from 'lucide-react';

export default function ExpertRoster() {
  const [searchQuery, setSearchQuery] = useState('');

  const experts = [
    { id: 1, name: 'Dr. Alan Peterson, Psy.D', role: 'Custody Evaluator 604.10(b)', matches: 14, bias: 'Leans 50/50', risk: 'Low', location: 'Chicago, IL', active: 2 },
    { id: 2, name: 'Susan Walker, CPA, ABV', role: 'Forensic Accountant', matches: 8, bias: 'Meticulous on Cash', risk: 'Low', location: 'Evanston, IL', active: 1 },
    { id: 3, name: 'Robert Vance, Esq.', role: 'Guardian Ad Litem', matches: 22, bias: 'Pro-Mother historically', risk: 'High', location: 'Skokie, IL', active: 0 },
    { id: 4, name: 'Hon. Judge Thomas (Ret.)', role: 'Mediator', matches: 5, bias: 'Splits the baby', risk: 'Medium', location: 'Chicago, IL', active: 3 },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-display">Global Expert Roster</h1>
          <p className="text-slate-500 mt-1">Cross-matter intelligence on GALs, Evaluators, and Judges mapping historical biases.</p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-2.5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search experts..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm w-72 focus:ring-bridgebox-500 focus:border-bridgebox-500" 
            />
          </div>
          <button className="flex items-center px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Total Tracked Experts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">142</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Active Retainers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-bridgebox-600">6</div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Professional</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Classification</th>
              <th className="px-6 py-3 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">Firm History</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Identified Bias</th>
              <th className="px-6 py-3 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Risk Profile</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-100">
            {experts.map(expert => (
              <tr key={expert.id} className="hover:bg-slate-50 cursor-pointer">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold mr-3">
                      {expert.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">{expert.name}</div>
                      <div className="text-xs text-slate-500">{expert.location}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {expert.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-slate-600 font-medium">
                  {expert.matches} Matters
                  {expert.active > 0 && <span className="ml-2 text-xs text-bridgebox-600 font-bold">({expert.active} Active)</span>}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm font-medium text-slate-700">
                    <Award className="w-4 h-4 mr-1.5 text-amber-500" />
                    {expert.bias}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold ${
                    expert.risk === 'High' ? 'bg-red-50 text-red-700 border border-red-200' :
                    expert.risk === 'Medium' ? 'bg-orange-50 text-orange-700 border border-orange-200' :
                    'bg-green-50 text-green-700 border border-green-200'
                  }`}>
                    {expert.risk === 'High' && <AlertTriangle className="w-3 h-3 mr-1" />}
                    {expert.risk} Risk
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-slate-400 hover:text-bridgebox-600">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
