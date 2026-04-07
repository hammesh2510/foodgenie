import React from 'react';
import { Activity, Users, Store, AlertCircle } from 'lucide-react';

const AdminStatCard = ({ title, value, icon: Icon, alert }) => (
  <div className="bg-white dark:bg-dark-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-dark-700 relative overflow-hidden text-left">
    <div className="flex items-center justify-between mb-4 relative z-10">
      <h3 className="text-gray-500 dark:text-gray-400 font-medium">{title}</h3>
      <div className={`p-2 rounded-lg ${alert ? 'bg-red-50 text-red-600' : 'bg-brand-50 text-brand-600'}`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
    <div className="flex items-end justify-between relative z-10">
      <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
      {alert && (
        <span className="text-sm font-semibold flex items-center text-red-500 bg-red-50 px-2 py-1 rounded-full">
          Needs Action
        </span>
      )}
    </div>
  </div>
);

export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in text-left text-gray-900">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Control Center</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">System overview and pending actions.</p>
        </div>
        <button className="btn-secondary">Download Report</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <AdminStatCard title="Total Users" value="12,489" icon={Users} />
        <AdminStatCard title="Active Restaurants" value="342" icon={Store} />
        <AdminStatCard title="Pending Approvals" value="14" icon={AlertCircle} alert />
        <AdminStatCard title="System Health" value="99.9%" icon={Activity} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-sm border border-gray-100 dark:border-dark-700 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Pending Restaurant Approvals</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-900/50 rounded-xl border border-gray-100 dark:border-dark-700">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-200 dark:bg-dark-700 rounded-lg flex items-center justify-center font-bold text-gray-500">
                    B{i}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">New Burger Place {i}</h4>
                    <p className="text-sm text-gray-500">Applied 2 hours ago</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 text-sm font-medium rounded-lg text-red-600 hover:bg-red-50 transition-colors">Reject</button>
                  <button className="px-3 py-1.5 text-sm font-medium rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors shadow-sm">Approve</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-sm border border-gray-100 dark:border-dark-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Recent System Alerts</h2>
            <div className="space-y-4 text-left">
              <div className="p-4 border-l-4 border-yellow-400 bg-yellow-50 dark:bg-yellow-900/10 rounded-r-xl">
                <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">High API latency detected in US-East region.</p>
                <p className="text-xs text-yellow-600 mt-1">15 mins ago</p>
              </div>
              <div className="p-4 border-l-4 border-brand-500 bg-brand-50 rounded-r-xl">
                 <p className="text-sm font-medium text-brand-800">Database backup completed successfully.</p>
                 <p className="text-xs text-brand-600 mt-1">2 hours ago</p>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
