

import LeaderboardPreview from "../components/LeaderboardPreview";
import { RecentEvents } from "../components/RecentEvents";
import { dummyEvents } from "../utils/types/events";
import { LeaderboardData, LeaderboardEntry, MergedEntry } from "../utils/types/leaderboard";
import { PublicUser } from "../utils/types/user";

type DashboardLeaderboardPageProps = {
    dailySinglePlayer: LeaderboardData<MergedEntry>;
    dailyMultiplayer: LeaderboardData<MergedEntry>;
    weeklySinglePlayer: LeaderboardData<MergedEntry>;
    weeklyMultiplayer: LeaderboardData<MergedEntry>;
    monthlySinglePlayer: LeaderboardData<MergedEntry>;
    monthlyMultiplayer: LeaderboardData<MergedEntry>;
};

export const DashboardLeaderboardPage = (props: DashboardLeaderboardPageProps) => {
  return (
    <div className={`flex flex-col gap-8 w-full min-h-screen relative overflow-hidden`}
    >
      <div className="absolute top-0 left-0 w-full h-full animate-[spin_20s_ease_infinite] scale-200 dark:opacity-30 dark:saturate-200"     style={{
      background: `radial-gradient(at 2% 50%, hsla(275,79%,74%,0.4) 0px, transparent 50%),
      radial-gradient(at 18% 20%, hsla(275,88%,72%,0.4) 0px, transparent 50%),
      radial-gradient(at 16% 20%, hsla(265,83%,72%,0.4) 0px, transparent 50%),
      radial-gradient(at 45% 55%, hsla(214,77%,67%,0.4) 0px, transparent 50%),
      radial-gradient(at 63% 89%, hsla(330,89%,76%,0.4) 0px, transparent 50%),
      radial-gradient(at 47% 72%, hsla(327,61%,75%,0.4) 0px, transparent 50%),
      radial-gradient(at 6% 7%, hsla(320,84%,68%,0.4) 0px, transparent 50%)`,

    }}
    />
      <div className="py-8 h-96 grid grid-cols-1 md:grid-cols-2 lg:grid-cols gap-8 mx-auto max-w-7xl ">
        <RecentEvents events={dummyEvents} />

      </div>
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols gap-8 mx-auto max-w-7xl">
        <LeaderboardPreview {...props.dailySinglePlayer} />
        <LeaderboardPreview {...props.dailyMultiplayer} />
        <LeaderboardPreview {...props.weeklySinglePlayer} />
        <LeaderboardPreview {...props.weeklyMultiplayer} />
        <LeaderboardPreview {...props.monthlySinglePlayer} />
        <LeaderboardPreview {...props.monthlyMultiplayer} />
      </div>
    </div>
  );
};
export default DashboardLeaderboardPage;

export const getServerSideProps = async () => {
  const mergeUsers = (
    entries: LeaderboardEntry[],
    users: Record<string, PublicUser>
  ) => {
    return entries.map((entry) => ({
      ...entry,
      user: users[entry.userId],
    })) as MergedEntry[];
  };

  const users = (await import("../utils/types/user")).userDictionary;

  const dailySinglePlayer = {
    leaderboard: (await import("../utils/types/dummy/daily"))
      .dailyTournamentLeaderboard,
    entries: mergeUsers(
      (await import("../utils/types/dummy/daily")).dailyTournamentEntries,
      users
    ),
  };
  const dailyMultiplayer = {
    leaderboard: (await import("../utils/types/dummy/dailymulti"))
      .multiplayerTournamentLeaderboard,
    entries: mergeUsers(
      (await import("../utils/types/dummy/dailymulti"))
        .multiplayerTournamentEntries,
      users
    ),
  };
  const weeklySinglePlayer = {
    leaderboard: (await import("../utils/types/dummy/singleweekly"))
      .singlePlayerWeeklyLeaderboard,
    entries: mergeUsers(
      (await import("../utils/types/dummy/singleweekly"))
        .singlePlayerWeeklyEntries,
      users
    ),
  };
  const weeklyMultiplayer = {
    leaderboard: (await import("../utils/types/dummy/multiplayerweekly"))
      .multiplayerWeeklyLeaderboard,
    entries: mergeUsers(
      (await import("../utils/types/dummy/multiplayerweekly"))
        .multiplayerWeeklyEntries,
      users
    ),
  };
  const monthlySinglePlayer = {
    leaderboard: (await import("../utils/types/dummy/singlemonthly"))
      .singlePlayerMonthlyLeaderboard,
    entries: mergeUsers(
      (await import("../utils/types/dummy/singlemonthly"))
        .singlePlayerMonthlyEntries,
      users
    ),
  };
  const monthlyMultiplayer = {
    leaderboard: (await import("../utils/types/dummy/multiplayermonthly"))
      .multiplayerMonthlyLeaderboard,
    entries: mergeUsers(
      (await import("../utils/types/dummy/multiplayermonthly"))
        .multiplayerMonthlyEntries,
      users
    ),
  };

  return {
    props: {
      dailySinglePlayer,
      dailyMultiplayer,
      weeklySinglePlayer,
      weeklyMultiplayer,
      monthlySinglePlayer,
      monthlyMultiplayer,
    } as DashboardLeaderboardPageProps,
  };
};
