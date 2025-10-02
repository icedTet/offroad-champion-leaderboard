import { Leaderboard, LeaderboardEntry } from "../leaderboard";

export const dailyTournamentLeaderboard: Leaderboard = {
  id: "daily",
  name: "Daily Speed Challenge - September 18th",
  description:
    "Single player daily tournament featuring the top 20 competitive racers",
  eventId: "event_daily_sp_20250918",
  startDate: "2025-09-18T00:00:00.000Z",
  endDate: "2025-09-18T23:59:59.999Z",
  createdAt: "2025-09-18T00:00:00.000Z",
  updatedAt: "2025-09-18T23:59:59.999Z",
  reward: "$10",
};

export const dailyTournamentEntries: LeaderboardEntry[] = [
  {
    userId: "user_001",
    leaderboardId: "daily",
    races: [
      { time: 43200, date: "2025-09-18T08:15:00.000Z", trackID: "track1" },
      { time: 45100, date: "2025-09-18T09:30:00.000Z", trackID: "track3" },
      { time: 44890, date: "2025-09-18T10:45:00.000Z", trackID: "track5" },
      { time: 46200, date: "2025-09-18T12:00:00.000Z", trackID: "track2" },
      { time: 43850, date: "2025-09-18T13:15:00.000Z", trackID: "track7" },
      { time: 45650, date: "2025-09-18T14:30:00.000Z", trackID: "track4" },
      { time: 44320, date: "2025-09-18T15:45:00.000Z", trackID: "track6" },
      { time: 46890, date: "2025-09-18T17:00:00.000Z", trackID: "track8" },
      { time: 45230, date: "2025-09-18T18:15:00.000Z", trackID: "track9" },
      { time: 44780, date: "2025-09-18T19:30:00.000Z", trackID: "track10" },
      { time: 45980, date: "2025-09-18T20:45:00.000Z", trackID: "track11" },
      { time: 43690, date: "2025-09-18T22:00:00.000Z", trackID: "track12" }
    ],
    qualified: true,
  },
  {
    userId: "user_002",
    leaderboardId: "lb_daily_2025_09_18",
    races: [
      { time: 48200, date: "2025-09-18T08:30:00.000Z", trackID: "track2" },
      { time: 47650, date: "2025-09-18T10:15:00.000Z", trackID: "track4" },
      { time: 47850, date: "2025-09-18T12:45:00.000Z", trackID: "track6" },
      { time: 48920, date: "2025-09-18T14:20:00.000Z", trackID: "track8" },
      { time: 46780, date: "2025-09-18T16:10:00.000Z", trackID: "track1" },
      { time: 48450, date: "2025-09-18T18:00:00.000Z", trackID: "track10" },
      { time: 47320, date: "2025-09-18T19:45:00.000Z", trackID: "track12" },
      { time: 48680, date: "2025-09-18T21:30:00.000Z", trackID: "track5" }
    ],
    qualified: true,
  },
  {
    userId: "user_003",
    leaderboardId: "lb_daily_2025_09_18",
    races: [
      { time: 49850, date: "2025-09-18T07:45:00.000Z", trackID: "track3" },
      { time: 48920, date: "2025-09-18T08:50:00.000Z", trackID: "track1" },
      { time: 49120, date: "2025-09-18T10:10:00.000Z", trackID: "track7" },
      { time: 50200, date: "2025-09-18T11:25:00.000Z", trackID: "track9" },
      { time: 48650, date: "2025-09-18T12:40:00.000Z", trackID: "track2" },
      { time: 49780, date: "2025-09-18T13:55:00.000Z", trackID: "track11" },
      { time: 49430, date: "2025-09-18T15:10:00.000Z", trackID: "track4" },
      { time: 50120, date: "2025-09-18T16:25:00.000Z", trackID: "track6" },
      { time: 48890, date: "2025-09-18T17:40:00.000Z", trackID: "track8" },
      { time: 49560, date: "2025-09-18T18:55:00.000Z", trackID: "track10" },
      { time: 49220, date: "2025-09-18T20:10:00.000Z", trackID: "track12" },
      { time: 48970, date: "2025-09-18T21:25:00.000Z", trackID: "track5" },
      { time: 49680, date: "2025-09-18T22:40:00.000Z", trackID: "track1" },
      { time: 49340, date: "2025-09-18T23:15:00.000Z", trackID: "track3" },
      { time: 50050, date: "2025-09-18T23:45:00.000Z", trackID: "track7" }
    ],
    qualified: true,
  },
  {
    userId: "user_004",
    leaderboardId: "lb_daily_2025_09_18",
    races: [
      { time: 52100, date: "2025-09-18T09:00:00.000Z", trackID: "track5" },
      { time: 51640, date: "2025-09-18T11:30:00.000Z", trackID: "track8" },
      { time: 53200, date: "2025-09-18T14:15:00.000Z", trackID: "track2" },
      { time: 50890, date: "2025-09-18T17:45:00.000Z", trackID: "track11" },
      { time: 52450, date: "2025-09-18T20:20:00.000Z", trackID: "track6" },
      { time: 51870, date: "2025-09-18T22:10:00.000Z", trackID: "track9" }
    ],
    qualified: true,
  },
  {
    userId: "user_005",
    leaderboardId: "lb_daily_2025_09_18",
    races: [
      { time: 53200, date: "2025-09-18T08:20:00.000Z", trackID: "track4" },
      { time: 52650, date: "2025-09-18T09:35:00.000Z", trackID: "track7" },
      { time: 52890, date: "2025-09-18T10:50:00.000Z", trackID: "track1" },
      { time: 53450, date: "2025-09-18T12:05:00.000Z", trackID: "track10" },
      { time: 52100, date: "2025-09-18T13:20:00.000Z", trackID: "track3" },
      { time: 53780, date: "2025-09-18T14:35:00.000Z", trackID: "track12" },
      { time: 52320, date: "2025-09-18T15:50:00.000Z", trackID: "track5" },
      { time: 53920, date: "2025-09-18T17:05:00.000Z", trackID: "track8" },
      { time: 52580, date: "2025-09-18T18:20:00.000Z", trackID: "track2" },
      { time: 53150, date: "2025-09-18T19:35:00.000Z", trackID: "track6" },
      { time: 52790, date: "2025-09-18T20:50:00.000Z", trackID: "track11" }
    ],
    qualified: true,
  },
  {
    userId: "user_006",
    leaderboardId: "lb_daily_2025_09_18",
    races: [
      { time: 54850, date: "2025-09-18T08:45:00.000Z", trackID: "track9" },
      { time: 54320, date: "2025-09-18T10:20:00.000Z", trackID: "track4" },
      { time: 55100, date: "2025-09-18T12:30:00.000Z", trackID: "track7" },
      { time: 53890, date: "2025-09-18T14:40:00.000Z", trackID: "track1" },
      { time: 54670, date: "2025-09-18T16:50:00.000Z", trackID: "track12" },
      { time: 55450, date: "2025-09-18T18:25:00.000Z", trackID: "track3" },
      { time: 54120, date: "2025-09-18T20:15:00.000Z", trackID: "track6" },
      { time: 54920, date: "2025-09-18T21:40:00.000Z", trackID: "track10" },
      { time: 54580, date: "2025-09-18T23:05:00.000Z", trackID: "track8" }
    ],
    qualified: true,
  },
  {
    userId: "user_007",
    leaderboardId: "lb_daily_2025_09_18",
    races: [
      { time: 56200, date: "2025-09-18T07:30:00.000Z", trackID: "track2" },
      { time: 55780, date: "2025-09-18T08:45:00.000Z", trackID: "track5" },
      { time: 56450, date: "2025-09-18T10:00:00.000Z", trackID: "track8" },
      { time: 55320, date: "2025-09-18T11:15:00.000Z", trackID: "track11" },
      { time: 56890, date: "2025-09-18T12:30:00.000Z", trackID: "track4" },
      { time: 55650, date: "2025-09-18T13:45:00.000Z", trackID: "track9" },
      { time: 56120, date: "2025-09-18T15:00:00.000Z", trackID: "track1" },
      { time: 55950, date: "2025-09-18T16:15:00.000Z", trackID: "track7" },
      { time: 56580, date: "2025-09-18T17:30:00.000Z", trackID: "track3" },
      { time: 55480, date: "2025-09-18T18:45:00.000Z", trackID: "track12" },
      { time: 56320, date: "2025-09-18T20:00:00.000Z", trackID: "track6" },
      { time: 55850, date: "2025-09-18T21:15:00.000Z", trackID: "track10" },
      { time: 56680, date: "2025-09-18T22:30:00.000Z", trackID: "track2" }
    ],
    qualified: true,
  },
  {
    userId: "user_008",
    leaderboardId: "lb_daily_2025_09_18",
    races: [
      { time: 58100, date: "2025-09-18T09:20:00.000Z", trackID: "track6" },
      { time: 57450, date: "2025-09-18T11:40:00.000Z", trackID: "track3" },
      { time: 58650, date: "2025-09-18T13:25:00.000Z", trackID: "track9" },
      { time: 57120, date: "2025-09-18T15:50:00.000Z", trackID: "track1" },
      { time: 58320, date: "2025-09-18T17:35:00.000Z", trackID: "track12" },
      { time: 57890, date: "2025-09-18T19:20:00.000Z", trackID: "track5" },
      { time: 58560, date: "2025-09-18T21:45:00.000Z", trackID: "track8" }
    ],
    qualified: true,
  },
  {
    userId: "user_009",
    leaderboardId: "lb_daily_2025_09_18",
    races: [
      { time: 59450, date: "2025-09-18T08:10:00.000Z", trackID: "track7" },
      { time: 58920, date: "2025-09-18T09:25:00.000Z", trackID: "track2" },
      { time: 59680, date: "2025-09-18T10:40:00.000Z", trackID: "track11" },
      { time: 58650, date: "2025-09-18T11:55:00.000Z", trackID: "track4" },
      { time: 59320, date: "2025-09-18T13:10:00.000Z", trackID: "track8" },
      { time: 58780, date: "2025-09-18T14:25:00.000Z", trackID: "track10" },
      { time: 59890, date: "2025-09-18T15:40:00.000Z", trackID: "track6" },
      { time: 59120, date: "2025-09-18T16:55:00.000Z", trackID: "track1" },
      { time: 58540, date: "2025-09-18T18:10:00.000Z", trackID: "track9" },
      { time: 59750, date: "2025-09-18T19:25:00.000Z", trackID: "track3" }
    ],
    qualified: true,
  },
  {
    userId: "user_010",
    leaderboardId: "lb_daily_2025_09_18",
    races: [
      { time: 60890, date: "2025-09-18T07:15:00.000Z", trackID: "track12" },
      { time: 60150, date: "2025-09-18T08:30:00.000Z", trackID: "track5" },
      { time: 61200, date: "2025-09-18T09:45:00.000Z", trackID: "track8" },
      { time: 59650, date: "2025-09-18T11:00:00.000Z", trackID: "track2" },
      { time: 60780, date: "2025-09-18T12:15:00.000Z", trackID: "track11" },
      { time: 60320, date: "2025-09-18T13:30:00.000Z", trackID: "track4" },
      { time: 61450, date: "2025-09-18T14:45:00.000Z", trackID: "track7" },
      { time: 59890, date: "2025-09-18T16:00:00.000Z", trackID: "track1" },
      { time: 60650, date: "2025-09-18T17:15:00.000Z", trackID: "track9" },
      { time: 60420, date: "2025-09-18T18:30:00.000Z", trackID: "track3" },
      { time: 61120, date: "2025-09-18T19:45:00.000Z", trackID: "track6" },
      { time: 60250, date: "2025-09-18T21:00:00.000Z", trackID: "track10" },
      { time: 60980, date: "2025-09-18T22:15:00.000Z", trackID: "track12" },
      { time: 60580, date: "2025-09-18T23:30:00.000Z", trackID: "track5" }
    ],
    qualified: true,
  },
  {
    userId: "user_011",
    leaderboardId: "lb_daily_2025_09_18",
    races: [
      { time: 63200, date: "2025-09-18T10:30:00.000Z", trackID: "track1" },
      { time: 62430, date: "2025-09-18T13:45:00.000Z", trackID: "track8" },
      { time: 64100, date: "2025-09-18T16:20:00.000Z", trackID: "track5" },
      { time: 61890, date: "2025-09-18T18:50:00.000Z", trackID: "track11" },
      { time: 63650, date: "2025-09-18T21:15:00.000Z", trackID: "track3" }
    ],
    qualified: false,
  },
  {
    userId: "user_012",
    leaderboardId: "lb_daily_2025_09_18",
    races: [
      { time: 65200, date: "2025-09-18T08:40:00.000Z", trackID: "track4" },
      { time: 64680, date: "2025-09-18T10:55:00.000Z", trackID: "track7" },
      { time: 65890, date: "2025-09-18T13:10:00.000Z", trackID: "track2" },
      { time: 64120, date: "2025-09-18T15:25:00.000Z", trackID: "track9" },
      { time: 65450, date: "2025-09-18T17:40:00.000Z", trackID: "track12" },
      { time: 64350, date: "2025-09-18T19:55:00.000Z", trackID: "track6" },
      { time: 65780, date: "2025-09-18T21:30:00.000Z", trackID: "track10" },
      { time: 64920, date: "2025-09-18T23:20:00.000Z", trackID: "track1" }
    ],
    qualified: false,
  },
  {
    userId: "user_013",
    leaderboardId: "lb_daily_2025_09_18",
    races: [
      { time: 66890, date: "2025-09-18T07:20:00.000Z", trackID: "track8" },
      { time: 66290, date: "2025-09-18T08:35:00.000Z", trackID: "track3" },
      { time: 67450, date: "2025-09-18T09:50:00.000Z", trackID: "track11" },
      { time: 65850, date: "2025-09-18T11:05:00.000Z", trackID: "track5" },
      { time: 66780, date: "2025-09-18T12:20:00.000Z", trackID: "track1" },
      { time: 66120, date: "2025-09-18T13:35:00.000Z", trackID: "track7" },
      { time: 67250, date: "2025-09-18T14:50:00.000Z", trackID: "track4" },
      { time: 66540, date: "2025-09-18T16:05:00.000Z", trackID: "track9" },
      { time: 66950, date: "2025-09-18T17:20:00.000Z", trackID: "track2" },
      { time: 66380, date: "2025-09-18T18:35:00.000Z", trackID: "track12" },
      { time: 67100, date: "2025-09-18T19:50:00.000Z", trackID: "track6" },
      { time: 66650, date: "2025-09-18T21:05:00.000Z", trackID: "track10" }
    ],
    qualified: false,
  },
  {
    userId: "user_014",
    leaderboardId: "lb_daily_2025_09_18",
    races: [
      { time: 69200, date: "2025-09-18T09:15:00.000Z", trackID: "track6" },
      { time: 68750, date: "2025-09-18T12:40:00.000Z", trackID: "track9" },
      { time: 70100, date: "2025-09-18T15:25:00.000Z", trackID: "track2" },
      { time: 68320, date: "2025-09-18T18:10:00.000Z", trackID: "track12" },
      { time: 69650, date: "2025-09-18T20:55:00.000Z", trackID: "track4" },
      { time: 69890, date: "2025-09-18T22:45:00.000Z", trackID: "track7" }
    ],
    qualified: false,
  },
  {
    userId: "user_015",
    leaderboardId: "lb_daily_2025_09_18",
    races: [
      { time: 71450, date: "2025-09-18T08:25:00.000Z", trackID: "track1" },
      { time: 70920, date: "2025-09-18T09:40:00.000Z", trackID: "track10" },
      { time: 72200, date: "2025-09-18T10:55:00.000Z", trackID: "track5" },
      { time: 70580, date: "2025-09-18T12:10:00.000Z", trackID: "track8" },
      { time: 71780, date: "2025-09-18T13:25:00.000Z", trackID: "track3" },
      { time: 71120, date: "2025-09-18T14:40:00.000Z", trackID: "track11" },
      { time: 72450, date: "2025-09-18T15:55:00.000Z", trackID: "track7" },
      { time: 70850, date: "2025-09-18T17:10:00.000Z", trackID: "track6" },
      { time: 71950, date: "2025-09-18T18:25:00.000Z", trackID: "track2" }
    ],
    qualified: false,
  },
  {
    userId: "user_016",
    leaderboardId: "lb_daily_2025_09_18",
    races: [
      { time: 73200, date: "2025-09-18T07:50:00.000Z", trackID: "track12" },
      { time: 72580, date: "2025-09-18T09:05:00.000Z", trackID: "track4" },
      { time: 73890, date: "2025-09-18T10:20:00.000Z", trackID: "track9" },
      { time: 72120, date: "2025-09-18T11:35:00.000Z", trackID: "track1" },
      { time: 73450, date: "2025-09-18T12:50:00.000Z", trackID: "track8" },
      { time: 72780, date: "2025-09-18T14:05:00.000Z", trackID: "track3" },
      { time: 73650, date: "2025-09-18T15:20:00.000Z", trackID: "track11" },
      { time: 72350, date: "2025-09-18T16:35:00.000Z", trackID: "track5" },
      { time: 73980, date: "2025-09-18T17:50:00.000Z", trackID: "track7" },
      { time: 72920, date: "2025-09-18T19:05:00.000Z", trackID: "track2" },
      { time: 73150, date: "2025-09-18T20:20:00.000Z", trackID: "track10" }
    ],
    qualified: false,
  },
  {
    userId: "user_017",
    leaderboardId: "lb_daily_2025_09_18",
    races: [
      { time: 75100, date: "2025-09-18T11:20:00.000Z", trackID: "track6" },
      { time: 74320, date: "2025-09-18T14:45:00.000Z", trackID: "track8" },
      { time: 76200, date: "2025-09-18T17:30:00.000Z", trackID: "track2" },
      { time: 74850, date: "2025-09-18T20:15:00.000Z", trackID: "track11" }
    ],
    qualified: false,
  },
  {
    userId: "user_018",
    leaderboardId: "lb_daily_2025_09_18",
    races: [
      { time: 77450, date: "2025-09-18T08:55:00.000Z", trackID: "track3" },
      { time: 76890, date: "2025-09-18T11:20:00.000Z", trackID: "track7" },
      { time: 78200, date: "2025-09-18T13:45:00.000Z", trackID: "track1" },
      { time: 76520, date: "2025-09-18T16:10:00.000Z", trackID: "track9" },
      { time: 77780, date: "2025-09-18T18:35:00.000Z", trackID: "track12" },
      { time: 77120, date: "2025-09-18T21:00:00.000Z", trackID: "track5" },
      { time: 78450, date: "2025-09-18T23:25:00.000Z", trackID: "track4" }
    ],
    qualified: false,
  },
  {
    userId: "user_019",
    leaderboardId: "lb_daily_2025_09_18",
    races: [
      { time: 80100, date: "2025-09-18T07:40:00.000Z", trackID: "track10" },
      { time: 79450, date: "2025-09-18T08:55:00.000Z", trackID: "track6" },
      { time: 80850, date: "2025-09-18T10:10:00.000Z", trackID: "track8" },
      { time: 79120, date: "2025-09-18T11:25:00.000Z", trackID: "track2" },
      { time: 80650, date: "2025-09-18T12:40:00.000Z", trackID: "track11" },
      { time: 79780, date: "2025-09-18T13:55:00.000Z", trackID: "track4" },
      { time: 80320, date: "2025-09-18T15:10:00.000Z", trackID: "track1" },
      { time: 79890, date: "2025-09-18T16:25:00.000Z", trackID: "track7" },
      { time: 80580, date: "2025-09-18T17:40:00.000Z", trackID: "track3" },
      { time: 79650, date: "2025-09-18T18:55:00.000Z", trackID: "track12" },
      { time: 80920, date: "2025-09-18T20:10:00.000Z", trackID: "track9" },
      { time: 80250, date: "2025-09-18T21:25:00.000Z", trackID: "track5" },
      { time: 79980, date: "2025-09-18T22:40:00.000Z", trackID: "track6" }
    ],
    qualified: false,
  },
  {
    userId: "user_020",
    leaderboardId: "lb_daily_2025_09_18",
    races: [
      { time: 82890, date: "2025-09-18T10:45:00.000Z", trackID: "track5" },
      { time: 82120, date: "2025-09-18T13:20:00.000Z", trackID: "track9" },
      { time: 83450, date: "2025-09-18T15:55:00.000Z", trackID: "track7" },
      { time: 81780, date: "2025-09-18T18:30:00.000Z", trackID: "track1" },
      { time: 82650, date: "2025-09-18T21:05:00.000Z", trackID: "track12" }
    ],
    qualified: false,
  },
];