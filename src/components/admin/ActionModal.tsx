import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => Promise<void>;
  title: string;
  description: string;
  confirmText?: string;
  confirmColor?: string;
  placeholder?: string;
}

export function ActionModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirm',
  confirmColor = 'bg-purple-600 hover:bg-purple-700',
  placeholder = 'Enter reason...',
}: ActionModalProps) {
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) {
      setError('Reason is required');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await onConfirm(reason);
      setReason('');
      onClose();
    } catch (err) {
      setError((err as Error).message || 'Action failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setReason('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div
          className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
          onClick={handleClose}
        />

        {/* Center modal */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

        <div className="inline-block align-bottom bg-[#0E0A1B] border border-purple-900/30 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full relative z-50">
          <form onSubmit={handleSubmit}>
            <div className="bg-[#0E0A1B] px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-medium text-white">{title}</h3>
                <button
                  type="button"
                  onClick={handleClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <p className="text-sm text-gray-400 mb-4">{description}</p>

              {error && (
                <div className="mb-4 rounded-md bg-red-900/30 border border-red-500/50 p-3">
                  <p className="text-sm text-red-200">{error}</p>
                </div>
              )}

              <div>
                <label htmlFor="reason" className="block text-sm font-medium text-gray-300 mb-2">
                  Reason
                </label>
                <textarea
                  id="reason"
                  rows={4}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-3 py-2 bg-[#190F31] border border-purple-900/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder={placeholder}
                  required
                />
              </div>
            </div>

            <div className="bg-[#190F31] px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm ${confirmColor} disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isSubmitting ? 'Processing...' : confirmText}
              </button>
              <button
                type="button"
                onClick={handleClose}
                disabled={isSubmitting}
                className="mt-3 w-full inline-flex justify-center rounded-lg border border-purple-900/30 shadow-sm px-4 py-2 bg-[#0E0A1B] text-base font-medium text-gray-300 hover:bg-purple-900/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
