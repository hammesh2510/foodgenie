import React from 'react';
import { DollarSign, ShoppingBag, Users, TrendingUp } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, trend }) => (
  <div className="bg-white dark:bg-dark-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-dark-700">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-gray-500 dark:text-gray-400 font-medium">{title}</h3>
      <div className="p-2 bg-orange-50 dark:bg-orange-900/20 text-orange-600 rounded-lg">
        <Icon className="w-5 h-5" />
      </div>
    </div>
    <div className="flex items-end justify-between">
      <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
      <span className={`text-sm font-semibold flex items-center ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        {trend >= 0 ? '+' : ''}{trend}%
        <TrendingUp className="w-4 h-4 ml-1" />
      </span>
    </div>
  </div>
);

export default function OwnerDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in text-left text-gray-900">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Restaurant Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Welcome back! Here's what's happening at Pizza Palace today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Revenue" value="$4,823" icon={DollarSign} trend={12.5} />
        <StatCard title="Orders Today" value="156" icon={ShoppingBag} trend={8.2} />
        <StatCard title="Active Customers" value="89" icon={Users} trend={-2.4} />
        <StatCard title="Avg. Order Value" value="$30.85" icon={DollarSign} trend={5.1} />
      </div>

      <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-sm border border-gray-100 dark:border-dark-700 p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-dark-700">
                <th className="pb-4 font-semibold">Order ID</th>
                <th className="pb-4 font-semibold">Customer</th>
                <th className="pb-4 font-semibold">Status</th>
                <th className="pb-4 font-semibold">Amount</th>
                <th className="pb-4 font-semibold">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-dark-700">
              {[1,2,3,4,5].map((i) => (
                <tr key={i} className="group hover:bg-gray-50 dark:hover:bg-dark-700/50 transition-colors">
                  <td className="py-4 font-medium text-gray-900 dark:text-white">#ORD-00{i}</td>
                  <td className="py-4 text-gray-600 dark:text-gray-300">John Doe</td>
                  <td className="py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Preparing
                    </span>
                  </td>
                  <td className="py-4 text-gray-900 dark:text-white font-medium">$45.00</td>
                  <td className="py-4 text-gray-500 dark:text-gray-400">10 mins ago</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
