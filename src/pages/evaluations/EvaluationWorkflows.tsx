import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Stethoscope, FileText, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

export default function EvaluationWorkflows() {
  const [activeTab, setActiveTab] = useState<'mental' | 'substance'>('mental');

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Evaluation Workflows</h1>
          <p className="text-gray-500 mt-1">Track ordered evaluations, document requests, interviews, and final report statuses.</p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button 
            onClick={() => setActiveTab('mental')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'mental' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Mental Health (MHE)
          </button>
          <button 
            onClick={() => setActiveTab('substance')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'substance' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Substance Abuse
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-bridgebox-50 border-bridgebox-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-bridgebox-800">1. Ordered / Retained</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-bridgebox-600" />
              <span className="text-sm font-semibold text-bridgebox-900">Completed (Oct 01)</span>
            </div>
            <p className="text-xs text-bridgebox-600 mt-2">Dr. Sarah Jenkins assigned.</p>
          </CardContent>
        </Card>
        <Card className="bg-bridgebox-50 border-bridgebox-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-bridgebox-800">2. Records Requested</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-bridgebox-600" />
              <span className="text-sm font-semibold text-bridgebox-900">Completed (Oct 05)</span>
            </div>
            <p className="text-xs text-bridgebox-600 mt-2">Medical history submitted.</p>
          </CardContent>
        </Card>
        <Card className="border-bridgebox-400 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold text-gray-900">3. Interviews Scheduled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-bridgebox-600 animate-pulse" />
              <span className="text-sm font-semibold text-bridgebox-700">In Progress</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">Child interviews pending for Oct 15.</p>
            <button className="mt-4 w-full text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 py-1.5 rounded font-medium">
              Mark Complete
            </button>
          </CardContent>
        </Card>
        <Card className="opacity-50 grayscale">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">4. Report Received</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-500">Pending</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white shadow-sm rounded-xl border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Workflow Details & Tasks</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-start p-4 border rounded-lg hover:border-bridgebox-300 transition-colors">
            <div className="flex gap-4">
              <div className="mt-1">
                <input type="checkbox" checked readOnly className="h-4 w-4 text-bridgebox-600 rounded" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Draft and submit HIPAA Releases</p>
                <p className="text-xs text-gray-500 mt-1">Assigned to: Paralegal Team</p>
              </div>
            </div>
            <Badge variant="success">Done</Badge>
          </div>

          <div className="flex justify-between items-start p-4 border rounded-lg hover:border-bridgebox-300 transition-colors border-l-4 border-l-bridgebox-500 bg-bridgebox-50/50">
            <div className="flex gap-4">
              <div className="mt-1">
                <input type="checkbox" className="h-4 w-4 text-bridgebox-600 rounded" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Coordinate school observation schedule</p>
                <p className="text-xs text-gray-500 mt-1">Pending scheduling with Principal Adams.</p>
              </div>
            </div>
            <Badge variant="warning">Due Tomorrow</Badge>
          </div>

          <div className="flex justify-between items-start p-4 border rounded-lg hover:border-bridgebox-300 transition-colors">
            <div className="flex gap-4">
              <div className="mt-1">
                <input type="checkbox" disabled className="h-4 w-4 rounded border-gray-300" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Extract recommendations from Final Report</p>
                <p className="text-xs text-gray-400 mt-1">Blocked: Waiting on report delivery.</p>
              </div>
            </div>
            <Badge variant="outline">Blocked</Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
