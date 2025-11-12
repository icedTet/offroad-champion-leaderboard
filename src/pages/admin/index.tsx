import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { useRequireAdmin } from '@/contexts/AdminAuthContext';
import { adminApi } from '@/services/adminApi';
import { UsersIcon, ShieldExclamationIcon, TrophyIcon, ClockIcon } from '@heroicons/react/24/outline';

interface DashboardStats {
  totalPlayers: number;
  frozenAccounts: number;
  activeTournaments: number;
  recentActions: number;
}

export default function AdminDashboard() {
  const { isLoading: authLoading, isAuthenticated } = useRequireAdmin();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      loadDashboard();
    }
  }, [isAuthenticated]);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const data = await adminApi.getDashboard() as DashboardStats;
      setStats(data);
    } catch (err) {
      setError((err as Error).message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-white text-lg">Loading...</div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="rounded-lg bg-red-900/30 border border-red-500/50 p-4">
          <p className="text-red-200">{error}</p>
        </div>
      </AdminLayout>
    );
  }

  const statCards = [
    {
      name: 'Total Players',
      value: stats?.totalPlayers || 0,
      icon: UsersIcon,
      color: 'bg-blue-500',
    },
    {
      name: 'Frozen Accounts',
      value: stats?.frozenAccounts || 0,
      icon: ShieldExclamationIcon,
      color: 'bg-red-500',
    },
    {
      name: 'Active Tournaments',
      value: stats?.activeTournaments || 0,
      icon: TrophyIcon,
      color: 'bg-purple-500',
    },
    {
      name: 'Recent Actions',
      value: stats?.recentActions || 0,
      icon: ClockIcon,
      color: 'bg-green-500',
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="mt-2 text-gray-400">Overview of your admin panel</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.name}
                className="bg-[#0E0A1B] border border-purple-900/30 rounded-lg overflow-hidden shadow"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 ${stat.color} rounded-md p-3`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-400 truncate">
                          {stat.name}
                        </dt>
                        <dd className="text-3xl font-semibold text-white">
                          {stat.value}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="bg-[#0E0A1B] border border-purple-900/30 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/admin/players"
              className="block p-4 bg-purple-900/30 hover:bg-purple-900/50 rounded-lg transition-colors text-center"
            >
              <UsersIcon className="h-8 w-8 mx-auto text-purple-400 mb-2" />
              <p className="text-white font-medium">Manage Players</p>
            </Link>
            <Link
              href="/admin/prizes"
              className="block p-4 bg-purple-900/30 hover:bg-purple-900/50 rounded-lg transition-colors text-center"
            >
              <TrophyIcon className="h-8 w-8 mx-auto text-purple-400 mb-2" />
              <p className="text-white font-medium">Configure Prizes</p>
            </Link>
            <Link
              href="/admin/logs"
              className="block p-4 bg-purple-900/30 hover:bg-purple-900/50 rounded-lg transition-colors text-center"
            >
              <ClockIcon className="h-8 w-8 mx-auto text-purple-400 mb-2" />
              <p className="text-white font-medium">View Logs</p>
            </Link>
            <button
              onClick={loadDashboard}
              className="block w-full p-4 bg-purple-900/30 hover:bg-purple-900/50 rounded-lg transition-colors text-center"
            >
              <svg className="h-8 w-8 mx-auto text-purple-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <p className="text-white font-medium">Refresh Data</p>
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
