import { MergedEntry } from "@/utils/types/leaderboard";
import { LeaderboardHeader } from "./LeaderboardHeader";
import { LeaderboardRow } from "./LeaderboardRow";
import Link from "next/link";

interface TournamentLeaderboardProps {
  title: string;
  date: string;
  type: string;
  description: string;
  endedTime: string;
  memberCount: number;
  prize: string;
  entries: MergedEntry[];
  leaderboardId: string;
  backgroundColor?: string;
  initialDisplayCount?: number;
}

export const TournamentLeaderboard = ({
  title,
  date,
  type,
  description,
  endedTime,
  memberCount,
  prize,
  entries,
  leaderboardId,
  backgroundColor = "bg-black",
  initialDisplayCount = 6,
}: TournamentLeaderboardProps) => {
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = ms % 1000;

    return `00:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}${milliseconds > 0 ? `.${milliseconds}` : ""}`;
  };

  const getFastestTime = (entry: MergedEntry) => {
    if (!entry.races || entry.races.length === 0) return 0;
    return Math.min(...entry.races.map((r) => r.time));
  };

  const displayedEntries = entries.slice(0, initialDisplayCount);

  return (
    <div className={`${backgroundColor} border border-purple-500 rounded-lg p-3 md:p-4 lg:p-6 font-family-inter`}>
      <LeaderboardHeader
        title={title}
        date={date}
        type={type}
        description={description}
        endedTime={endedTime}
        memberCount={memberCount}
        prize={prize}
      />

      {/* Table Header */}
      <div className="grid grid-cols-[60px_1fr_140px_100px_120px] items-center pb-2 mb-2 border-b border-gray-700">
        <div className="text-gray-400 text-sm">Place</div>
        <div className="text-gray-400 text-sm">Player</div>
        <div className="text-gray-400 text-sm flex justify-center">Score</div>
        <div className="text-gray-400 text-sm flex justify-center">Races</div>
        <div className="text-gray-400 text-sm flex justify-center">Qualification</div>
      </div>

      {/* Leaderboard Rows */}
      <div>
        {displayedEntries.map((entry, index) => (
          <LeaderboardRow
            key={entry.userId}
            place={index + 1}
            username={entry.user.username}
            countryCode={entry.user.countryCode}
            score={formatTime(getFastestTime(entry))}
            races={entry.races.length}
            qualified={entry.qualified}
          />
        ))}
      </div>

      {/* See More Button */}
      {entries.length > initialDisplayCount && (
        <div className="flex justify-end mt-2 md:mt-3 lg:mt-4">
          <Link href={`/leaderboard/${leaderboardId}`}>
            <button className="text-yellow-500 border border-yellow-500 px-4 py-2 rounded-full text-sm hover:bg-yellow-500 hover:text-black transition-colors font-family-inter">
              See More
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};
