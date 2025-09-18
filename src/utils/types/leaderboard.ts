// Leaderboard related types and interfaces

import { PublicUser } from "./user";

// Represents a leaderboard for a specific tournament event
export type Leaderboard = {
    id: string;
    name: string;
    description?: string; // Optional, brief description of the leaderboard
    eventId: string; // ID of the associated TournamentEvent
    startDate: string; // ISO date string
    endDate: string;   // ISO date string
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    reward: string; // Description of the reward for the leaderboard
}
// Entry for a user in a leaderboard 
export type LeaderboardEntry = {
    userId: string; // ID of the user
    leaderboardId: string; // ID of the associated Leaderboard
    time: number; // Time in milliseconds
    races: number; // Number of races participated
    qualified: boolean; // Whether the user qualified for the leaderboard
}
// Combined type for easier data handling
export type LeaderboardData<T extends LeaderboardEntry | MergedEntry = LeaderboardEntry> = {
    leaderboard: Leaderboard;
    entries: T[];
}

// Merged entry for displaying in the leaderboard, consists of LeaderboardEntry and a user: field
export type MergedEntry = LeaderboardEntry & {
    user: PublicUser;
}

