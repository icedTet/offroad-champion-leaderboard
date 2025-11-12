import React, { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { useRequireAdmin } from '@/contexts/AdminAuthContext';
import { adminApi } from '@/services/adminApi';
import {
  FunnelIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ShieldExclamationIcon,
  ShieldCheckIcon,
  BanknotesIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

interface AdminLog {
  logId: string;
  adminId: string;
  action: string;
  targetUserId: string | null;
  details: Record<string, unknown>;
  ipAddress: string;
  userAgent: string;
  createdAt: string;
  admin: {
    id: string;
    username: string;
    name: string;
  };
  targetUser: {
    id: string;
    username: string;
    name: string;
  } | null;
}

interface LogsResponse {
  total: number;
  logs: AdminLog[];
  limit: number;
  offset: number;
}

export default function AdminLogsPage() {
  const { isLoading: authLoading, isAuthenticated } = useRequireAdmin();
  const [data, setData] = useState<LogsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filters
  const [filterAction, setFilterAction] = useState<string>('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [page, setPage] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const limit = 50;

  useEffect(() => {
    if (isAuthenticated) {
      loadLogs();
    }
  }, [isAuthenticated, filterAction, startDate, endDate, page]);

  const loadLogs = async () => {
    try {
      setLoading(true);
      const params: Record<string, string | number> = {
        limit,
        offset: page * limit,
      };

      if (filterAction !== 'all') {
        params.action = filterAction;
      }

      if (startDate) {
        params.startDate = startDate;
      }

      if (endDate) {
        params.endDate = endDate;
      }

      const result = await adminApi.getLogs(params) as LogsResponse;
      setData(result);
    } catch (err) {
      setError((err as Error).message || 'Failed to load logs');
    } finally {
      setLoading(false);
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'freeze_account':
        return ShieldExclamationIcon;
      case 'unfreeze_account':
        return ShieldCheckIcon;
      case 'adjust_funds':
        return BanknotesIcon;
      case 'update_prize_config':
        return TrophyIcon;
      default:
        return null;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'freeze_account':
        return 'text-red-400';
      case 'unfreeze_account':
        return 'text-green-400';
      case 'adjust_funds':
        return 'text-purple-400';
      case 'update_prize_config':
        return 'text-yellow-400';
      default:
        return 'text-gray-400';
    }
  };

  const formatAction = (action: string) => {
    return action
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const totalPages = data ? Math.ceil(data.total / limit) : 0;

  if (authLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-white text-lg">Loading...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Admin Action Logs</h1>
          <p className="mt-2 text-gray-400">
            Complete audit trail of all administrative actions
          </p>
        </div>

        {error && (
          <div className="rounded-lg bg-red-900/30 border border-red-500/50 p-4">
            <p className="text-red-200">{error}</p>
          </div>
        )}

        {/* Filters */}
        <div className="bg-[#0E0A1B] border border-purple-900/30 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Filters</h2>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center text-purple-400 hover:text-purple-300"
            >
              <FunnelIcon className="h-5 w-5 mr-2" />
              {showFilters ? 'Hide' : 'Show'} Filters
            </button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Action Type</label>
                <select
                  value={filterAction}
                  onChange={(e) => {
                    setFilterAction(e.target.value);
                    setPage(0);
                  }}
                  className="w-full px-3 py-2 bg-[#190F31] border border-purple-900/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">All Actions</option>
                  <option value="freeze_account">Freeze Account</option>
                  <option value="unfreeze_account">Unfreeze Account</option>
                  <option value="adjust_funds">Adjust Funds</option>
                  <option value="update_prize_config">Update Prize Config</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                    setPage(0);
                  }}
                  className="w-full px-3 py-2 bg-[#190F31] border border-purple-900/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                    setPage(0);
                  }}
                  className="w-full px-3 py-2 bg-[#190F31] border border-purple-900/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          )}
        </div>

        {/* Logs */}
        <div className="bg-[#0E0A1B] border border-purple-900/30 rounded-lg overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-400">Loading logs...</div>
          ) : data && data.logs.length > 0 ? (
            <>
              <div className="divide-y divide-purple-900/30">
                {data.logs.map((log) => {
                  const ActionIcon = getActionIcon(log.action);
                  const actionColor = getActionColor(log.action);

                  return (
                    <div key={log.logId} className="p-4 hover:bg-purple-900/20">
                      <div className="flex items-start gap-4">
                        {ActionIcon && (
                          <div className={`${actionColor} mt-1`}>
                            <ActionIcon className="h-6 w-6" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className={`text-base font-medium ${actionColor}`}>
                                {formatAction(log.action)}
                              </h3>
                              <p className="text-sm text-gray-400 mt-1">
                                by{' '}
                                <span className="text-white font-medium">
                                  {log?.admin?.username || "Unknown Admin"}
                                </span>
                                {log.targetUser && (
                                  <>
                                    {' '}
                                    on{' '}
                                    <span className="text-white font-medium">
                                      {log.targetUser.username}
                                    </span>
                                  </>
                                )}
                              </p>
                            </div>
                            <span className="text-xs text-gray-500 whitespace-nowrap">
                              {dayjs(log.createdAt).fromNow()}
                            </span>
                          </div>

                          {'reason' in log.details && typeof log.details.reason === 'string' && (
                            <div className="bg-[#190F31] rounded-lg p-3 mb-2">
                              <p className="text-sm text-gray-300">{log.details.reason}</p>
                            </div>
                          )}

                          {log.action === 'adjust_funds' && (
                            <div className="flex gap-4 text-xs">
                              {'oldCoins' in log.details && 'newCoins' in log.details && (
                                <div>
                                  <span className="text-gray-500">Coins: </span>
                                  <span className="text-gray-400">{String(log.details.oldCoins)}</span>
                                  <span className="text-gray-500"> → </span>
                                  <span className="text-purple-400">{String(log.details.newCoins)}</span>
                                </div>
                              )}
                              {'oldGains' in log.details && 'newGains' in log.details && (
                                <div>
                                  <span className="text-gray-500">Gains: </span>
                                  <span className="text-gray-400">${String(log.details.oldGains)}</span>
                                  <span className="text-gray-500"> → </span>
                                  <span className="text-green-400">${String(log.details.newGains)}</span>
                                </div>
                              )}
                            </div>
                          )}

                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                            <span>{dayjs(log.createdAt).format('MMM D, YYYY h:mm A')}</span>
                            <span>IP: {log.ipAddress}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              <div className="bg-[#190F31] px-4 py-3 flex items-center justify-between border-t border-purple-900/30">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() => setPage(Math.max(0, page - 1))}
                    disabled={page === 0}
                    className="relative inline-flex items-center px-4 py-2 border border-purple-900/30 text-sm font-medium rounded-md text-gray-300 bg-[#0E0A1B] hover:bg-purple-900/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setPage(page + 1)}
                    disabled={page >= totalPages - 1}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-purple-900/30 text-sm font-medium rounded-md text-gray-300 bg-[#0E0A1B] hover:bg-purple-900/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-400">
                      Showing <span className="font-medium">{page * limit + 1}</span> to{' '}
                      <span className="font-medium">
                        {Math.min((page + 1) * limit, data.total)}
                      </span>{' '}
                      of <span className="font-medium">{data.total}</span> logs
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                      <button
                        onClick={() => setPage(Math.max(0, page - 1))}
                        disabled={page === 0}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-purple-900/30 bg-[#0E0A1B] text-sm font-medium text-gray-400 hover:bg-purple-900/30 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeftIcon className="h-5 w-5" />
                      </button>
                      <span className="relative inline-flex items-center px-4 py-2 border border-purple-900/30 bg-[#0E0A1B] text-sm font-medium text-gray-300">
                        Page {page + 1} of {totalPages}
                      </span>
                      <button
                        onClick={() => setPage(page + 1)}
                        disabled={page >= totalPages - 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-purple-900/30 bg-[#0E0A1B] text-sm font-medium text-gray-400 hover:bg-purple-900/30 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronRightIcon className="h-5 w-5" />
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="p-8 text-center text-gray-400">No logs found</div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
