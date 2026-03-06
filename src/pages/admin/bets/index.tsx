import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import dayjs from 'dayjs';

// Bet interface definition
interface Player {
  id: string;
  username: string;
  countryCode: string; // e.g., 'JP' for Japan, 'NO' for Norway
}

interface Bet {
  id: string;
  player1: Player;
  player1Wager: number;
  player1Car: string;
  player2: Player;
  player2Wager: number;
  player2Car: string;
  level: string;
  winner: Player | null;
  createdAt: string; // ISO date string
  isCompleted: boolean;
}

interface TaxFormData {
  id: string;
  username: string;
  countryCode: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  totalIncome: number;
  taxFormType: string; // e.g., '1099', 'W-8BEN'
  createdAt: string;
}

// Mock data generator
const generateMockBets = (): Bet[] => {
  const mockBets: Bet[] = [];

  const player1 = {
    id: '1',
    username: 'Lizardman_021',
    countryCode: 'JP',
  };

  const player2 = {
    id: '2',
    username: 'Mega39_021',
    countryCode: 'NO',
  };

  // Create 7 identical bets as shown in the Figma
  for (let i = 0; i < 7; i++) {
    mockBets.push({
      id: `bet-${i}`,
      player1,
      player1Wager: 300,
      player1Car: 'Car #5',
      player2,
      player2Wager: 300,
      player2Car: 'Car #3',
      level: '#2',
      winner: player1,
      createdAt: '2026-01-13T09:30:00Z',
      isCompleted: true,
    });
  }

  return mockBets;
};

// Mock tax form data generator
const generateMockTaxForms = (): TaxFormData[] => {
  return [
    {
      id: 'tax-1',
      username: 'Lizardman_021',
      countryCode: 'US',
      firstName: 'Sam',
      lastName: 'Altman',
      address: '3849 Wilson Ave.',
      city: 'Los Angeles',
      state: 'CA',
      zip: '90291',
      country: 'USA',
      totalIncome: 8500,
      taxFormType: '1099',
      createdAt: '2026-01-13T09:30:00Z',
    },
    {
      id: 'tax-2',
      username: 'Bodwim02',
      countryCode: 'JP',
      firstName: 'Si-Hu',
      lastName: 'Lin',
      address: '3840 Shin Ave.',
      city: 'Tokyo',
      state: 'Chugoku',
      zip: '348042',
      country: 'Japan',
      totalIncome: 4350,
      taxFormType: 'W-8BEN',
      createdAt: '2026-01-13T09:30:00Z',
    },
  ];
};

type TabType = 'live' | 'open' | 'tax';

export default function BetsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('open');
  const [page, setPage] = useState(0);
  const [taxYear, setTaxYear] = useState(2026);
  const limit = 10;

  // Reset page when changing tabs
  useEffect(() => {
    setPage(0);
  }, [activeTab]);

  const bets = generateMockBets();
  const paginatedBets = bets.slice(page * limit, (page + 1) * limit);
  const totalPages = Math.ceil(bets.length / limit);

  const taxForms = generateMockTaxForms();
  const paginatedTaxForms = taxForms.slice(page * limit, (page + 1) * limit);
  const taxTotalPages = Math.ceil(taxForms.length / limit);

  // Calculate metrics
  const weeklyTotalBets = bets.reduce(
    (sum, bet) => sum + bet.player1Wager + bet.player2Wager,
    0
  );
  const houseCutPercentage = 0.25;
  const weeklyRevenue = Math.round(
    bets.reduce((sum, bet) => {
      const pot = bet.player1Wager + bet.player2Wager;
      return sum + pot * houseCutPercentage;
    }, 0)
  );

  const calculatePot = (bet: Bet) => bet.player1Wager + bet.player2Wager;
  const calculateHousePot = (bet: Bet) => Math.round(calculatePot(bet) * houseCutPercentage);
  const calculateTransfer = (bet: Bet) => {
    const pot = calculatePot(bet);
    const housePot = calculateHousePot(bet);
    return pot - housePot;
  };

  // Country flag emoji mapping
  const getFlagEmoji = (countryCode: string) => {
    const flags: Record<string, string> = {
      JP: '🇯🇵',
      NO: '🇳🇴',
      US: '🇺🇸',
      GB: '🇬🇧',
      DE: '🇩🇪',
      FR: '🇫🇷',
    };
    return flags[countryCode] || '🏁';
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center">
            <div className="text-3xl">🏆</div>
          </div>
          <h1 className="text-3xl font-bold text-yellow-500">ORC Bet & Burn Data</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('live')}
            className={`px-8 py-3 rounded-full font-semibold transition-all ${
              activeTab === 'live'
                ? 'bg-yellow-500 text-black'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Live Bets
          </button>
          <button
            onClick={() => setActiveTab('open')}
            className={`px-8 py-3 rounded-full font-semibold transition-all ${
              activeTab === 'open'
                ? 'bg-yellow-500 text-black'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Open Bets
          </button>
          <button
            onClick={() => setActiveTab('tax')}
            className={`px-8 py-3 rounded-full font-semibold transition-all ${
              activeTab === 'tax'
                ? 'bg-yellow-500 text-black'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Tax Forms
          </button>
        </div>

        {/* Metrics - Conditional rendering based on active tab */}
        {activeTab !== 'tax' ? (
          <div className="flex gap-8">
            <div className="flex items-center gap-3">
              <button className="w-8 h-8 bg-gray-600 hover:bg-gray-500 flex items-center justify-center">
                <ChevronLeftIcon className="w-5 h-5 text-white" />
              </button>
              <div className="bg-black border border-gray-600 px-6 py-2 rounded">
                <span className="text-white mr-2">Weekly Total Bets:</span>
                <span className="text-green-400 font-semibold">${weeklyTotalBets.toLocaleString()}</span>
              </div>
              <button className="w-8 h-8 bg-gray-600 hover:bg-gray-500 flex items-center justify-center">
                <ChevronRightIcon className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button className="w-8 h-8 bg-gray-600 hover:bg-gray-500 flex items-center justify-center">
                <ChevronLeftIcon className="w-5 h-5 text-white" />
              </button>
              <div className="bg-black border border-gray-600 px-6 py-2 rounded">
                <span className="text-white mr-2">Weekly Revenue:</span>
                <span className="text-green-400 font-semibold">${weeklyRevenue.toLocaleString()}</span>
              </div>
              <button className="w-8 h-8 bg-gray-600 hover:bg-gray-500 flex items-center justify-center">
                <ChevronRightIcon className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex gap-8">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setTaxYear(taxYear - 1)}
                className="w-8 h-8 bg-gray-600 hover:bg-gray-500 flex items-center justify-center"
              >
                <ChevronLeftIcon className="w-5 h-5 text-white" />
              </button>
              <div className="bg-black border border-gray-600 px-6 py-2 rounded">
                <span className="text-white mr-2">Annual Taxes:</span>
                <span className="text-yellow-400 font-semibold">{taxYear}</span>
              </div>
              <button
                onClick={() => setTaxYear(taxYear + 1)}
                className="w-8 h-8 bg-gray-600 hover:bg-gray-500 flex items-center justify-center"
              >
                <ChevronRightIcon className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button className="w-8 h-8 bg-gray-600 hover:bg-gray-500 flex items-center justify-center">
                <ChevronLeftIcon className="w-5 h-5 text-white" />
              </button>
              <div className="bg-black border border-gray-600 px-6 py-2 rounded">
                <span className="text-white">Tax Status</span>
              </div>
              <button className="w-8 h-8 bg-gray-600 hover:bg-gray-500 flex items-center justify-center">
                <ChevronRightIcon className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        )}

        {/* Open Bets Content */}
        {activeTab === 'open' && (
          <div className="bg-[#0E0A1B] border border-purple-900/30 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-black border-b border-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Date/Time
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Player 1
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Player 1 Wager
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Player 1 Car
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Player 2
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Player 2 Wager
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Player 2 Car
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Level
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Winner
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Pot
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Total Transfer
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      House Pot
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {paginatedBets.map((bet) => (
                    <tr key={bet.id} className="hover:bg-purple-900/10">
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                        {dayjs(bet.createdAt).format('MM/DD/YYYY')}
                        <br />
                        <span className="text-xs text-gray-500">
                          ({dayjs(bet.createdAt).format('h:mma')} EST)
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{getFlagEmoji(bet.player1.countryCode)}</span>
                          <span className="text-sm text-white">{bet.player1.username}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-yellow-400 font-semibold">
                        ${bet.player1Wager}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                        {bet.player1Car}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{getFlagEmoji(bet.player2.countryCode)}</span>
                          <span className="text-sm text-white">{bet.player2.username}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-yellow-400 font-semibold">
                        ${bet.player2Wager}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                        {bet.player2Car}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                        {bet.level}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        {bet.winner ? (
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{getFlagEmoji(bet.winner.countryCode)}</span>
                            <span className="text-sm text-white">{bet.winner.username}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">Pending</span>
                        )}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-green-400 font-semibold">
                        ${calculatePot(bet)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                        ${calculateTransfer(bet)}{' '}
                        <span className="text-xs text-gray-500">(-{houseCutPercentage * 100}% fee)</span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-green-400 font-semibold">
                        ${calculateHousePot(bet)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="bg-black py-6 flex items-center justify-center gap-8 border-t border-gray-700">
              <button
                onClick={() => setPage(Math.max(0, page - 1))}
                disabled={page === 0}
                className="w-12 h-12 bg-gray-700 hover:bg-gray-600 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center rounded"
              >
                <ChevronLeftIcon className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
                disabled={page >= totalPages - 1}
                className="w-12 h-12 bg-gray-700 hover:bg-gray-600 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center rounded"
              >
                <ChevronRightIcon className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        )}

        {/* Live Bets placeholder */}
        {activeTab === 'live' && (
          <div className="bg-[#0E0A1B] border border-purple-900/30 rounded-lg p-12 text-center">
            <p className="text-gray-400 text-lg">Live Bets view coming soon...</p>
          </div>
        )}

        {/* Tax Forms Content */}
        {activeTab === 'tax' && (
          <div className="bg-[#0E0A1B] border border-purple-900/30 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-black border-b border-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Date/Time
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Player
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      First Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Last Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Address
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      City
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      State
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Zip
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Country
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Total Income
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Tax Form
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {paginatedTaxForms.map((form) => (
                    <tr key={form.id} className="hover:bg-purple-900/10">
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                        {dayjs(form.createdAt).format('MM/DD/YYYY')}
                        <br />
                        <span className="text-xs text-gray-500">
                          ({dayjs(form.createdAt).format('h:mma')} EST)
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{getFlagEmoji(form.countryCode)}</span>
                          <span className="text-sm text-white">{form.username}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                        {form.firstName}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                        {form.lastName}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                        {form.address}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                        {form.city}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                        {form.state}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                        {form.zip}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                        {form.country}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-green-400 font-semibold">
                        ${form.totalIncome.toLocaleString()}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                        {form.taxFormType}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="bg-black py-6 flex items-center justify-center gap-8 border-t border-gray-700">
              <button
                onClick={() => setPage(Math.max(0, page - 1))}
                disabled={page === 0}
                className="w-12 h-12 bg-gray-700 hover:bg-gray-600 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center rounded"
              >
                <ChevronLeftIcon className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={() => setPage(Math.min(taxTotalPages - 1, page + 1))}
                disabled={page >= taxTotalPages - 1}
                className="w-12 h-12 bg-gray-700 hover:bg-gray-600 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center rounded"
              >
                <ChevronRightIcon className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
