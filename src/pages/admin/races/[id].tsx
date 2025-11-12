import React, { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { useRequireAdmin } from '@/contexts/AdminAuthContext';
import { adminApi } from '@/services/adminApi';
import { useRouter } from 'next/router';
import { ActionModal } from '@/components/admin/ActionModal';
import {
  ArrowLeftIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  FlagIcon,
} from '@heroicons/react/24/outline';
import dayjs from 'dayjs';
import Link from 'next/link';

interface RaceDetail {
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
    isFrozen: boolean;
  };
}

export default function RaceDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { isLoading: authLoading, isAuthenticated } = useRequireAdmin();
  const [data, setData] = useState<RaceDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Modals
  const [showFlagModal, setShowFlagModal] = useState(false);
  const [showUnflagModal, setShowUnflagModal] = useState(false);

  useEffect(() => {
    if (isAuthenticated && id) {
      loadRace();
    }
  }, [isAuthenticated, id]);

  const loadRace = async () => {
    try {
      setLoading(true);
      const result = await adminApi.getRaceValidation(id as string) as RaceDetail;
      setData(result);
    } catch (err) {
      setError((err as Error).message || 'Failed to load race details');
    } finally {
      setLoading(false);
    }
  };

  const handleFlag = async (reason: string) => {
    if (!id) return;
    try {
      setError('');
      setSuccess('');
      await adminApi.flagRace(id as string, reason);
      await loadRace();
      setSuccess('Race flagged successfully');
      setTimeout(() => setSuccess(''), 5000);
    } catch (err) {
      throw err;
    }
  };

  const handleUnflag = async (reason: string) => {
    if (!id) return;
    try {
      setError('');
      setSuccess('');
      await adminApi.unflagRace(id as string, reason);
      await loadRace();
      setSuccess('Race unflagged successfully');
      setTimeout(() => setSuccess(''), 5000);
    } catch (err) {
      throw err;
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

  if (error || !data) {
    return (
      <AdminLayout>
        <div className="space-y-4">
          <button
            onClick={() => router.back()}
            className="flex items-center text-purple-400 hover:text-purple-300"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back
          </button>
          <div className="rounded-lg bg-red-900/30 border border-red-500/50 p-4">
            <p className="text-red-200">{error || 'Race not found'}</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const checkpoints = Object.entries(data.checkpointData).sort((a, b) => {
    const numA = parseInt(a[0].replace(/\D/g, '')) || 0;
    const numB = parseInt(b[0].replace(/\D/g, '')) || 0;
    return numA - numB;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center text-purple-400 hover:text-purple-300"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Races
          </button>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-white">Race Validation Details</h1>
          <p className="mt-2 text-gray-400">Review checkpoint data and flag status</p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="rounded-lg bg-green-900/30 border border-green-500/50 p-4">
            <p className="text-green-200">{success}</p>
          </div>
        )}

        {/* Flag Status Banner */}
        {data.flagged && (
          <div className="rounded-lg bg-red-900/30 border border-red-500/50 p-4">
            <div className="flex items-center">
              <ExclamationTriangleIcon className="h-6 w-6 text-red-300 mr-3" />
              <div>
                <p className="text-red-200 font-medium">This race is flagged as suspicious</p>
                <p className="text-red-300 text-sm mt-1">{data.flagReason}</p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          {data.flagged ? (
            <button
              onClick={() => setShowUnflagModal(true)}
              className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              <CheckCircleIcon className="h-5 w-5 mr-2" />
              Unflag Race
            </button>
          ) : (
            <button
              onClick={() => setShowFlagModal(true)}
              className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              <FlagIcon className="h-5 w-5 mr-2" />
              Flag Race
            </button>
          )}
          <Link
            href={`/admin/players/${data.userId}`}
            className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            View Player
          </Link>
        </div>

        {/* Race Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Info */}
          <div className="bg-[#0E0A1B] border border-purple-900/30 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Race Information</h2>
            <dl className="space-y-3">
              <div>
                <dt className="text-sm text-gray-400">Validation ID</dt>
                <dd className="text-sm text-white font-mono break-all">{data.validationId}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-400">Player</dt>
                <dd className="text-sm text-white">
                  {data.user.username} ({data.user.name})
                  {data.user.isFrozen && (
                    <span className="ml-2 text-xs text-red-400">(Frozen)</span>
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-400">Track ID</dt>
                <dd className="text-sm">
                  <code className="bg-purple-900/30 px-2 py-1 rounded text-white">
                    {data.trackId}
                  </code>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-400">Race Time</dt>
                <dd className="flex items-center">
                  <ClockIcon className="h-4 w-4 text-purple-400 mr-2" />
                  <span className="text-lg font-mono text-white">{data.raceTime}s</span>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-400">Created At</dt>
                <dd className="text-sm text-white">
                  {dayjs(data.createdAt).format('MMMM D, YYYY h:mm A')}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-400">Validation Hash</dt>
                <dd className="text-xs text-gray-500 font-mono break-all">
                  {data.validationHash}
                </dd>
              </div>
            </dl>
          </div>

          {/* Checkpoint Data */}
          <div className="bg-[#0E0A1B] border border-purple-900/30 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Checkpoint Times</h2>
            <div className="space-y-3">
              {checkpoints.map(([checkpoint, time], index) => {
                const prevTime = index > 0 ? checkpoints[index - 1][1] : 0;
                const splitTime = time - prevTime;

                return (
                  <div key={checkpoint} className="bg-[#190F31] rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-400">
                        {checkpoint.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="text-lg font-mono text-white">{time.toFixed(3)}s</span>
                    </div>
                    {index > 0 && (
                      <div className="text-xs text-gray-500">
                        Split: +{splitTime.toFixed(3)}s
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Checkpoint Timeline Visualization */}
        <div className="bg-[#0E0A1B] border border-purple-900/30 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Checkpoint Timeline</h2>
          <div className="relative">
            <div className="flex items-center justify-between">
              {checkpoints.map(([checkpoint, time], index) => (
                <div key={checkpoint} className="flex flex-col items-center relative">
                  <div className="w-4 h-4 bg-purple-500 rounded-full border-4 border-[#0E0A1B] z-10"></div>
                  <div className="mt-2 text-xs text-gray-400 text-center whitespace-nowrap">
                    CP{index + 1}
                  </div>
                  <div className="mt-1 text-sm font-mono text-white">{time.toFixed(2)}s</div>
                  {index < checkpoints.length - 1 && (
                    <div className="absolute left-1/2 top-2 w-full h-0.5 bg-purple-900/50" style={{ width: 'calc(100vw / ' + checkpoints.length + ')' }}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ActionModal
        isOpen={showFlagModal}
        onClose={() => setShowFlagModal(false)}
        onConfirm={handleFlag}
        title="Flag Race as Suspicious"
        description="Please provide a detailed reason for flagging this race. This will be logged for review."
        confirmText="Flag Race"
        confirmColor="bg-red-600 hover:bg-red-700"
        placeholder="e.g., Impossible checkpoint times - split between CP2 and CP3 indicates speed hack..."
      />

      <ActionModal
        isOpen={showUnflagModal}
        onClose={() => setShowUnflagModal(false)}
        onConfirm={handleUnflag}
        title="Unflag Race"
        description="Please explain why this race should be unflagged. This will be logged for audit purposes."
        confirmText="Unflag Race"
        confirmColor="bg-green-600 hover:bg-green-700"
        placeholder="e.g., Reviewed checkpoint data - times are legitimate, player had speed boost powerup..."
      />
    </AdminLayout>
  );
}
