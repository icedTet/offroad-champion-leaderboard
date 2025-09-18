export type TournamentEvent = {
    id: string;
    name: string;
    startDate: string; // ISO date string
    endDate: string;   // ISO date string
    winningUserId?: string; // Optional, user ID of the winner
    iconURL?: string; // Optional, URL to an icon representing the event
    description?: string; // Optional, brief description of the event
    prizeType?: 'cash' | 'points' | 'other' | string; // Optional, type of prize
    prizeAmount?: number; // Optional, amount of the prize
};


export const dummyEvents: TournamentEvent[] = [
    // Singleplayer Daily
    {
        id: "sp-daily-916",
        name: "Daily Speed Challenge 9/17",
        startDate: "2025-09-17T07:00:00Z",
        endDate: "2025-09-18T06:59:00.0Z",
        winningUserId: "tet0",
        iconURL: "logo.png",
        description: "Complete as many levels as possible in a single day!",
        prizeType: 'points',
        prizeAmount: 1000
    },

    // Multiplayer Daily
    {
        id: "mp-daily-001",
        name: "Daily Battle Royale 9/18",
        startDate: "2025-09-18T12:00:00Z",
        endDate: "2025-09-18T23:59:59Z",
        iconURL: "logo.png",
        description: "Compete against other players in real-time matches throughout the day",
        prizeType: 'cash',
        prizeAmount: 50
    },

    // Singleplayer Weekly
    {
        id: "sp-weekly-001",
        name: "Weekly Marathon Challenge",
        startDate: "2025-09-15T00:00:00Z",
        endDate: "2025-09-21T23:59:59Z",
        winningUserId: "user_67890",
        iconURL: "logo.png",
        description: "A week-long endurance challenge to accumulate the highest score",
        prizeType: 'other',
        prizeAmount: 1
    },

    // Multiplayer Weekly
    // {
    //     id: "mp-weekly-001",
    //     name: "Weekly Team Championship",
    //     startDate: "2025-09-09T00:00:00Z",
    //     endDate: "2025-09-15T23:59:59Z",
    //     winningUserId: "user_54321",
    //     iconURL: "logo.png",
    //     description: "Form teams and compete in weekly tournaments with escalating difficulty",
    //     prizeType: 'cash',
    //     prizeAmount: 500
    // }
].sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());