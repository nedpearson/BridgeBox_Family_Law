import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Shield, Users, Bell, Database, HardDrive, Key } from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState<'firm' | 'integrations' | 'security'>('firm');

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Platform Settings</h1>
        <p className="text-gray-500 mt-1">Manage firm-wide intelligence rules, integration connections, and multitenant security.</p>
      </div>

      <div className="flex gap-8">
        {/* Settings Sidebar */}
        <div className="w-64 shrink-0 space-y-2">
          <button 
            onClick={() => setActiveTab('firm')}
            className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${activeTab === 'firm' ? 'bg-bridgebox-50 text-bridgebox-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Users className="w-5 h-5" /> Firm & Team
          </button>
          <button 
            onClick={() => setActiveTab('integrations')}
            className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${activeTab === 'integrations' ? 'bg-bridgebox-50 text-bridgebox-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Database className="w-5 h-5" /> Integrations & APIs
          </button>
          <button 
            onClick={() => setActiveTab('security')}
            className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${activeTab === 'security' ? 'bg-bridgebox-50 text-bridgebox-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Shield className="w-5 h-5" /> Security & Backup
          </button>
        </div>

        {/* Settings Content */}
        <div className="flex-1 space-y-6">
          {activeTab === 'firm' && (
            <Card>
              <CardHeader>
                <CardTitle>Tenancy & Workspaces</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Firm Name</label>
                    <input type="text" defaultValue="Pearson Legal Group" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-bridgebox-500 focus:ring-bridgebox-500 sm:text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Tenant ID</label>
                    <input type="text" readOnly defaultValue="tnt_8xyz29dk" className="mt-1 block w-full rounded-md bg-gray-50 border-gray-300 text-gray-500 shadow-sm sm:text-sm cursor-not-allowed" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'integrations' && (
            <div className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 border-b mb-4">
                  <div className="flex items-center gap-2">
                    <Database className="text-blue-500 w-5 h-5" />
                    <CardTitle className="text-lg">Clio Manage</CardTitle>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Connected</span>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">Push recoverable court costs and advanced expenses directly to Clio matter ledgers.</p>
                  <button className="text-sm font-medium text-bridgebox-600 hover:text-bridgebox-800">Configure Cost Mapping <span>&rarr;</span></button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 border-b mb-4">
                  <div className="flex items-center gap-2">
                    <Bell className="text-purple-500 w-5 h-5" />
                    <CardTitle className="text-lg">OurFamilyWizard</CardTitle>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Auth Required</span>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">Automatically ingest daily journals, messages, and tracked expenses into the Unified Chronology.</p>
                  <button className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    Connect Account
                  </button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 border-b mb-4">
                  <div className="flex items-center gap-2">
                    <Key className="text-teal-500 w-5 h-5" />
                    <CardTitle className="text-lg">SoberLink</CardTitle>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Connected</span>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">Sync testing windows, BAC reports, and compliance failures directly to risk dashboards.</p>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'security' && (
            <Card>
              <CardHeader>
                <CardTitle>Triple-Layer Backup Strategy & Audit</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border">
                  <HardDrive className="w-6 h-6 text-gray-400 mt-1" />
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">Immutable Backups</h4>
                    <p className="text-sm text-gray-500 mt-1">Tenant-scoped snapshots occur daily at 02:00 UTC. Next backup scheduled in 14 hours.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border">
                  <Shield className="w-6 h-6 text-green-500 mt-1" />
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">Row Level Security (RLS)</h4>
                    <p className="text-sm text-gray-500 mt-1">Active restriction applied. All queries are strictly scoped to <code className="bg-gray-200 px-1 rounded">auth.uid()</code> and <code className="bg-gray-200 px-1 rounded">tenant_id</code> via Postgres.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

        </div>
      </div>
    </div>
  );
}
