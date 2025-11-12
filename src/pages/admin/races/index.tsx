import React, { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { useRequireAdmin } from '@/contexts/AdminAuthContext';
import { adminApi } from '@/services/adminApi';
import Link from 'next/link';
import {
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ExclamationTriangleIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import dayjs from 'dayjs';

interface RaceValidation {
  validationId: string;
  userId: string;
  raceTime: string;
  trackId: string;
  checkpointData: Record<string, number>;
  validationHash: string;
  flagged: boolean;
  flagReason: string | null;
  createdAt: string;
  user: {
    id: string;
    username: string;
    name: string;
  };
}

interface FlaggedRacesResponse {
  total: number;
  races: RaceValidation[];
  limit: number;
  offset: number;
}

export default function FlaggedRacesPage() {
  const { isLoading: authLoading, isAuthenticated } = useRequireAdmin();
  const [data, setData] = useState<FlaggedRacesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filters
  const [searchUserId, setSearchUserId] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [filterTrack, setFilterTrack] = useState('');
  const [page, setPage] = useState(0);
  const limit = 20;

  useEffect(() => {
    if (isAuthenticated) {
      loadRaces();
    }
  }, [isAuthenticated, searchUserId, filterTrack, page]);

  const loadRaces = async () => {
    try {
      setLoading(true);
      const params: Record<string, string | number> = {
        limit,
        offset: page * limit,
      };

      if (searchUserId) {
        params.userId = searchUserId;
      }

      if (filterTrack) {
        params.trackId = filterTrack;
      }

      const result = await adminApi.getFlaggedRaces(params) as FlaggedRacesResponse;
      setData(result);
    } catch (err) {
      setError((err as Error).message || 'Failed to load flagged races');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchUserId(searchInput);
    setPage(0);
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
          <h1 className="text-3xl font-bold text-white">Flagged Races</h1>
          <p className="mt-2 text-gray-400">
            Review and manage flagged race validations for potential cheating
          </p>
        </div>

        {error && (
          <div className="rounded-lg bg-red-900/30 border border-red-500/50 p-4">
            <p className="text-red-200">{error}</p>
          </div>
        )}

        {/* Filters */}
        <div className="bg-[#0E0A1B] border border-purple-900/30 rounded-lg p-4">
          <form onSubmit={handleSearch} className="space-y-4">
            {/* Search Bar */}
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search by User ID..."
                  className="w-full pl-10 pr-4 py-2 bg-[#190F31] border border-purple-900/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                Search
              </button>
            </div>

            {/* Track Filter */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm text-gray-400 mb-1">Track ID</label>
                <input
                  type="text"
                  value={filterTrack}
                  onChange={(e) => {
                    setFilterTrack(e.target.value);
                    setPage(0);
                  }}
                  placeholder="e.g., desert_canyon_01"
                  className="w-full px-3 py-2 bg-[#190F31] border border-purple-900/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </form>
        </div>

        {/* Results */}
        <div className="bg-[#0E0A1B] border border-purple-900/30 rounded-lg overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-400">Loading flagged races...</div>
          ) : data && data.races.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-purple-900/30">
                  <thead className="bg-[#190F31]">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Player
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Track
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Race Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Flag Reason
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-900/30">
                    {data.races.map((race) => (
                      <tr key={race.validationId} className="hover:bg-purple-900/20">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-white flex items-center">
                              <ExclamationTriangleIcon className="h-4 w-4 text-red-400 mr-2" />
                              {race.user.username}
                            </div>
                            <div className="text-sm text-gray-400">{race.user.name}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          <code className="bg-purple-900/30 px-2 py-1 rounded text-xs">
                            {race.trackId}
                          </code>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <ClockIcon className="h-4 w-4 text-purple-400 mr-2" />
                            <span className="text-sm font-mono text-white">{race.raceTime}s</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-red-300 max-w-xs truncate">
                            {race.flagReason || 'N/A'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {dayjs(race.createdAt).format('MMM D, YYYY h:mm A')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <Link
                            href={`/admin/races/${race.validationId}`}
                            className="text-purple-400 hover:text-purple-300"
                          >
                            Review
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
                      of <span className="font-medium">{data.total}</span> flagged races
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
            <div className="p-8 text-center text-gray-400">
              {searchUserId || filterTrack
                ? 'No flagged races found matching your criteria'
                : 'No flagged races found'}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
