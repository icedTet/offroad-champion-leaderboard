import React, { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { useRequireAdmin } from '@/contexts/AdminAuthContext';
import { adminApi } from '@/services/adminApi';
import { TrophyIcon, PencilIcon } from '@heroicons/react/24/outline';

interface PrizeConfig {
  configId: string;
  period: string;
  mode: string;
  firstPlacePrize: string;
  secondPlacePrize: string;
  thirdPlacePrize: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface EditingConfig {
  period: string;
  mode: string;
  firstPlacePrize: string;
  secondPlacePrize: string;
  thirdPlacePrize: string;
}

export default function PrizesPage() {
  const { isLoading: authLoading, isAuthenticated } = useRequireAdmin();
  const [configs, setConfigs] = useState<PrizeConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingConfig, setEditingConfig] = useState<EditingConfig | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      loadPrizes();
    }
  }, [isAuthenticated]);

  const loadPrizes = async () => {
    try {
      setLoading(true);
      const data = await adminApi.getPrizes() as PrizeConfig[];
      setConfigs(data);
    } catch (err) {
      setError((err as Error).message || 'Failed to load prize configurations');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (config: PrizeConfig) => {
    setEditingConfig({
      period: config.period,
      mode: config.mode,
      firstPlacePrize: parseFloat(config.firstPlacePrize).toString(),
      secondPlacePrize: parseFloat(config.secondPlacePrize).toString(),
      thirdPlacePrize: parseFloat(config.thirdPlacePrize).toString(),
    });
    setError('');
  };

  const handleSave = async () => {
    if (!editingConfig) return;

    const first = parseFloat(editingConfig.firstPlacePrize);
    const second = parseFloat(editingConfig.secondPlacePrize);
    const third = parseFloat(editingConfig.thirdPlacePrize);

    if (isNaN(first) || isNaN(second) || isNaN(third)) {
      setError('All prize values must be valid numbers');
      return;
    }

    if (first < 0 || second < 0 || third < 0) {
      setError('Prize values cannot be negative');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await adminApi.updatePrizeConfig(editingConfig.period, editingConfig.mode, {
        firstPlacePrize: first,
        secondPlacePrize: second,
        thirdPlacePrize: third,
      });

      setEditingConfig(null);
      await loadPrizes();
    } catch (err) {
      setError((err as Error).message || 'Failed to update prize configuration');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatPeriod = (period: string) => {
    return period.charAt(0).toUpperCase() + period.slice(1);
  };

  const formatMode = (mode: string) => {
    return mode === 'singleplayer' ? 'Single-Player' : 'Multi-Player';
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

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Prize Configuration</h1>
          <p className="mt-2 text-gray-400">
            Manage tournament prize amounts. Changes are reflected instantly in the mobile game.
          </p>
        </div>

        {error && (
          <div className="rounded-lg bg-red-900/30 border border-red-500/50 p-4">
            <p className="text-red-200">{error}</p>
          </div>
        )}

        {/* Prize Configs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {configs.map((config) => {
            const isEditing =
              editingConfig?.period === config.period && editingConfig?.mode === config.mode;

            return (
              <div
                key={config.configId}
                className="bg-[#0E0A1B] border border-purple-900/30 rounded-lg p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <TrophyIcon className="h-6 w-6 text-purple-400 mr-2" />
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {formatPeriod(config.period)}
                      </h3>
                      <p className="text-sm text-gray-400">{formatMode(config.mode)}</p>
                    </div>
                  </div>
                  {!isEditing && (
                    <button
                      onClick={() => handleEdit(config)}
                      className="text-purple-400 hover:text-purple-300"
                      title="Edit"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">1st Place ($)</label>
                      <input
                        type="number"
                        value={editingConfig.firstPlacePrize}
                        onChange={(e) =>
                          setEditingConfig({ ...editingConfig, firstPlacePrize: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-[#190F31] border border-purple-900/30 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        step="0.01"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">2nd Place ($)</label>
                      <input
                        type="number"
                        value={editingConfig.secondPlacePrize}
                        onChange={(e) =>
                          setEditingConfig({ ...editingConfig, secondPlacePrize: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-[#190F31] border border-purple-900/30 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        step="0.01"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">3rd Place ($)</label>
                      <input
                        type="number"
                        value={editingConfig.thirdPlacePrize}
                        onChange={(e) =>
                          setEditingConfig({ ...editingConfig, thirdPlacePrize: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-[#190F31] border border-purple-900/30 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        step="0.01"
                        min="0"
                      />
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={handleSave}
                        disabled={isSubmitting}
                        className="flex-1 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Saving...' : 'Save'}
                      </button>
                      <button
                        onClick={() => setEditingConfig(null)}
                        disabled={isSubmitting}
                        className="flex-1 px-3 py-2 bg-[#190F31] hover:bg-purple-900/30 text-gray-300 rounded-lg text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center bg-[#190F31] rounded-lg p-3">
                      <span className="text-sm text-gray-400">1st Place</span>
                      <span className="text-lg font-bold text-yellow-400">
                        ${parseFloat(config.firstPlacePrize).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center bg-[#190F31] rounded-lg p-3">
                      <span className="text-sm text-gray-400">2nd Place</span>
                      <span className="text-lg font-bold text-gray-300">
                        ${parseFloat(config.secondPlacePrize).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center bg-[#190F31] rounded-lg p-3">
                      <span className="text-sm text-gray-400">3rd Place</span>
                      <span className="text-lg font-bold text-orange-400">
                        ${parseFloat(config.thirdPlacePrize).toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Info Box */}
        <div className="bg-purple-900/20 border border-purple-500/50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-purple-300 mb-2">Important Notes</h3>
          <ul className="text-sm text-purple-200 space-y-1 list-disc list-inside">
            <li>Prize changes are instantly reflected in the mobile game</li>
            <li>All changes are logged with your admin ID and timestamp</li>
            <li>Prize values must be non-negative</li>
            <li>Changes affect future tournaments immediately</li>
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
}
