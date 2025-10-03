import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { RecentEvents } from "../components/v2/RecentEvents/RecentEvents";
import { dummyEvents } from "../utils/types/events";
import { Podium } from "../components/v2/AllTimeBest/Podium";
import { TournamentLeaderboard } from "../components/v2/TournamentLeaderboard/TournamentLeaderboard";
import { dailyTournamentEntries } from "../utils/types/dummy/daily";
import { multiplayerTournamentEntries } from "../utils/types/dummy/dailymulti";
import { userDictionary, mergeUsers } from "../utils/types/user";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  // Merge entries with user data and sort by fastest time
  const mergedSingleEntries = mergeUsers(dailyTournamentEntries, userDictionary);
  const sortedSingleEntries = mergedSingleEntries
    .map((entry) => ({
      ...entry,
      fastestTime: entry.races.length > 0 ? Math.min(...entry.races.map((r) => r.time)) : Infinity,
    }))
    .sort((a, b) => a.fastestTime - b.fastestTime);

  const mergedMultiEntries = mergeUsers(multiplayerTournamentEntries, userDictionary);
  const sortedMultiEntries = mergedMultiEntries
    .map((entry) => ({
      ...entry,
      fastestTime: entry.races.length > 0 ? Math.min(...entry.races.map((r) => r.time)) : Infinity,
    }))
    .sort((a, b) => a.fastestTime - b.fastestTime);

  return (
    <div
      className={`${geistSans.className} ${geistMono.className} font-sans grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen p-4 pb-12 gap-8 md:p-6 md:pb-16 md:gap-12 lg:p-8 lg:pb-20 lg:gap-16 relative`}
    >
      {/* Background Gradient */}
      <svg className="absolute inset-0 w-full h-full -z-10" viewBox="0 0 2906 3521" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <rect width="2906" height="3521" fill="url(#paint0_linear_1_3)"/>
        <defs>
          <linearGradient id="paint0_linear_1_3" x1="1453" y1="0" x2="1453" y2="3521" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0E0A1B"/>
            <stop offset="0.4375" stopColor="#190F31"/>
          </linearGradient>
        </defs>
      </svg>

      <main className="flex flex-col gap-4 md:gap-6 lg:gap-8 row-start-2 max-w-7xl w-full">
        {/* Top Section - Recent Events and Podium */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 items-stretch">
          <RecentEvents events={dummyEvents} />
          <Podium entries={sortedSingleEntries} />
        </div>

        {/* Tournament Leaderboards - 2x3 Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
          {/* Single-Player Column */}
          <div className="flex flex-col gap-4 md:gap-5 lg:gap-6">
            <TournamentLeaderboard
              title="Single-Player: Daily Tournament:"
              date="2/5/2024"
              type="Time Trials"
              description="Best times today"
              endedTime="3 hours ago"
              memberCount={57}
              prize="$5"
              entries={sortedSingleEntries}
              leaderboardId="daily"
              backgroundColor="bg-black"
            />

            <TournamentLeaderboard
              title="Single-Player: Weekly Tournament"
              date="2/5/2024"
              type="Time Trials"
              description="Best weeks times"
              endedTime="21 hours ago"
              memberCount={34}
              prize="$25"
              entries={sortedSingleEntries}
              leaderboardId="weekly"
              backgroundColor="bg-[#0A0520]"
            />

            <TournamentLeaderboard
              title="Single-Player:  Monthly Tournament:"
              date="2/1/2024"
              type="Time Trials"
              description="Best months times"
              endedTime="2 days ago"
              memberCount={14}
              prize="$200"
              entries={sortedSingleEntries}
              leaderboardId="monthly"
              backgroundColor="bg-black"
            />
          </div>

          {/* Multi-Player Column */}
          <div className="flex flex-col gap-4 md:gap-5 lg:gap-6">
            <TournamentLeaderboard
              title="Multi-Player: Daily Tournament:"
              date="2/5/2024"
              type="Time Trials"
              description="Best times today"
              endedTime="3 hours ago"
              memberCount={57}
              prize="$5"
              entries={sortedMultiEntries}
              leaderboardId="daily-multi"
              backgroundColor="bg-black"
            />

            <TournamentLeaderboard
              title="Multi-Player: Weekly Tournament:"
              date="2/5/2024"
              type="Time Trials"
              description="Best weeks times"
              endedTime="3 hours ago"
              memberCount={34}
              prize="$25"
              entries={sortedMultiEntries}
              leaderboardId="weekly-multi"
              backgroundColor="bg-[#0A0520]"
            />

            <TournamentLeaderboard
              title="Multi-Player: Monthly Tournament"
              date="2/5/2024"
              type="Time Trials"
              description="Best months times"
              endedTime="3 hours ago"
              memberCount={34}
              prize="$200"
              entries={sortedMultiEntries}
              leaderboardId="monthly-multi"
              backgroundColor="bg-black"
            />
          </div>
        </div>
      </main>
      {/* <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer> */}
    </div>
  );
}
