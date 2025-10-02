"use client";
import { useRouter } from "next/router";
import { ContestInfo } from "@/components/LeaderboardDetail/ContestInfo";
import { StandingsRow } from "@/components/LeaderboardDetail/StandingsRow";
import { dailyTournamentEntries } from "@/utils/types/dummy/daily";
import { userDictionary, mergeUsers } from "@/utils/types/user";
import { useEffect, useState } from "react";

const trackNames: Record<string, string> = {
  track1: "Mountain Trace",
  track2: "Snow Caps",
  track3: "Forest Hills",
  track4: "Sand Town",
  track5: "Hell's Kitchen",
  track6: "Devils Ridge",
  track7: "River Town",
  track8: "Doom Valley",
  track9: "Cactus Grasslands",
  track10: "Terry's Lane",
  track11: "Water World",
  track12: "Savage Swamps",
};

export default function LeaderboardDetail() {
  const router = useRouter();
  const _id = router.query.id;

  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      setShowWarning(window.innerWidth < 1560);
    };

    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  // Merge and sort entries
  const mergedEntries = mergeUsers(dailyTournamentEntries, userDictionary);
  const sortedEntries = mergedEntries
    .map((entry) => ({
      ...entry,
      fastestTime: entry.races.length > 0 ? Math.min(...entry.races.map((r) => r.time)) : Infinity,
    }))
    .sort((a, b) => a.fastestTime - b.fastestTime);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = ms % 1000;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}:${milliseconds.toString().padStart(3, "0")}`;
  };

  const getCountryFlag = (countryCode?: string) => {
    if (!countryCode) return "🌐";
    return countryCode
      .toUpperCase()
      .split("")
      .map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
      .join("");
  };

  const winner = sortedEntries[0];

  return (
    <div className="min-h-screen bg-[#0B0A1B] p-8 font-family-inter relative">
      {/* Screen Width Warning */}
      {showWarning && (
        <div className="fixed top-4 right-4 bg-yellow-500 text-black px-4 py-2 rounded-lg shadow-lg z-50 flex items-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm font-medium">Screen width below 1560px - some content may not display optimally</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-orange-500 mb-2">
                Single Player Daily Tournament
              </h1>
              <p className="text-xl text-white mb-2">2/5/2025</p>
              <p className="text-gray-400 text-sm">
                All contestants must complete at least 10 levels to qualify.
              </p>
              <p className="text-gray-400 text-sm">Best race time of the day wins.</p>
            </div>

            <div className="flex gap-8">
              <div className="text-right">
                <div className="text-gray-400 text-sm mb-1">Prize Pool</div>
                <div className="flex items-center gap-2">
                  <img src="/assets/coin.svg" alt="Prize" className="w-8 h-8" />
                  <span className="text-white text-2xl font-bold">5 USD</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-gray-400 text-sm mb-1">Players</div>
                <div className="text-orange-500 text-2xl font-bold">{sortedEntries.length}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Contest Info */}
        <ContestInfo
          contestType="Time Trials"
          winnerUsername={winner?.user.username || "TBD"}
          winnerFlag={getCountryFlag(winner?.user.countryCode)}
          rules={[
            "Lowest race time wins. To qualify for the tournament you need to race at lease 10 races in one day.",
            "Best time for the day will receive $5.",
            "Best time every week gets $25",
            "Best time every month gets $250",
          ]}
        />

        {/* Standings */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">Standings</h2>
          <div className="grid grid-cols-[80px_1fr_100px_100px_140px] items-center mb-4 px-4">
            <div className="text-gray-400 text-sm text-center"></div>
            <div className="text-gray-400 text-sm">Race</div>
            <div className="text-gray-400 text-sm text-center">Qualify</div>
            <div className="text-gray-400 text-sm text-center"></div>
            <div className="text-gray-400 text-sm text-center">Best time</div>
          </div>

          <div className="space-y-3">
            {sortedEntries.map((entry, index) => (
              <StandingsRow
                key={entry.userId}
                place={index + 1}
                username={entry.user.username}
                countryFlag={getCountryFlag(entry.user.countryCode)}
                raceCount={entry.races.length}
                qualified={entry.qualified}
                bestTime={formatTime(entry.fastestTime)}
                isWinner={index === 0}
                races={entry.races.sort((a, b) => a.time - b.time)}
                trackNames={trackNames}
              />
            ))}
          </div>
        </div>

        {/* Calendar Placeholder */}
        <div className="fixed bottom-8 right-8 bg-purple-900/50 border border-purple-500 rounded-lg p-4 backdrop-blur-sm">
          <div className="text-red-500 text-sm mb-2 flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            Ended 13 hours ago
          </div>
          <div className="text-white text-center mb-2">February 2025</div>
          <div className="grid grid-cols-7 gap-1 text-xs text-gray-400 mb-1">
            <div>S</div>
            <div>M</div>
            <div>T</div>
            <div>W</div>
            <div>T</div>
            <div>F</div>
            <div>S</div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-xs">
            {[...Array(35)].map((_, i) => {
              const day = i - 2;
              if (day < 1 || day > 28) {
                return <div key={i} className="w-6 h-6 text-gray-600">{day < 1 ? 28 + day : day - 28}</div>;
              }
              return (
                <div
                  key={i}
                  className={`w-6 h-6 flex items-center justify-center ${
                    day === 5 ? "bg-green-500 text-white rounded-full" : day === 6 ? "bg-white text-black rounded-full" : "text-white"
                  }`}
                >
                  {day}
                </div>
              );
            })}
          </div>
          <div className="text-white text-center mt-2 text-sm">9:00 AM EST</div>
        </div>
      </div>
    </div>
  );
}
