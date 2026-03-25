import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Share2, FileText, CheckCircle, Clock, Plus, Copy } from 'lucide-react';
// import { supabase } from '../../lib/supabase';

export default function RequestManager() {
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    // Stubbing the request state for demonstration
    setRequests([
      { id: 'req-1234', target: 'Dr. Jane Smith (Evaluator)', matter: 'Smith v. Smith', status: 'pending', created: '2026-03-22', due: '2026-04-01' },
      { id: 'req-5678', target: 'John Doe, GAL', matter: 'Johnson Custody Mod', status: 'fulfilled', created: '2026-03-10', due: '2026-03-20', file_count: 2 },
    ]);
  }, []);

  const handleCreateLink = () => {
    alert("In production, this generates a cryptographic token and inserts a 'records_request' row in Supabase, then emails the secure link.");
  };

  const copyLink = (id: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/portal/${id}`);
    alert('Secure link copied to clipboard!');
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Collaborator Records Requests</h1>
          <p className="text-gray-500 mt-1">Issue secure, matter-isolated upload links to evaluators, GALs, and experts.</p>
        </div>
        <button onClick={handleCreateLink} className="flex items-center px-4 py-2 bg-bridgebox-600 border border-transparent text-white rounded-md text-sm font-medium hover:bg-bridgebox-700 shadow-sm">
          <Plus className="w-4 h-4 mr-2" /> New Request Link
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Pending Uploads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">1</div>
            <p className="text-xs text-gray-500 mt-1">Awaiting external submission</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Recently Fulfilled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">1</div>
            <p className="text-xs text-gray-500 mt-1">Artifacts added to Evidence Intake</p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">External Party</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target Matter</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {requests.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Share2 className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{r.target}</div>
                      <div className="text-xs text-gray-500">ID: {r.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{r.matter}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  <div className="flex items-center text-gray-500">
                    <Clock className="w-4 h-4 mr-1.5" /> {new Date(r.due).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {r.status === 'pending' ? (
                    <Badge variant="warning">PENDING UPLOAD</Badge>
                  ) : (
                    <Badge variant="success">FULFILLED ({r.file_count} files)</Badge>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {r.status === 'pending' ? (
                    <button onClick={() => copyLink(r.id)} className="text-bridgebox-600 hover:text-bridgebox-800 flex items-center justify-end w-full">
                      <Copy className="w-4 h-4 mr-1" /> Copy Portal Link
                    </button>
                  ) : (
                    <span className="text-green-600 flex items-center justify-end w-full">
                      <CheckCircle className="w-4 h-4 mr-1" /> Complete
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
