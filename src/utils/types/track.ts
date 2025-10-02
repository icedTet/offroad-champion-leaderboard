export type Track = {
    id: string; // Unique identifier for the track
    name: string; // Name of the track
}

/*Mountain Trace
Snow Caps
Forrest Hills
Sand Town
Hell’s Kitchen
Devil’s Ridge
River Town
Doom Vally
Cactus grasslands
Torry’s Lane
Water World
Savage Swamps
*/

export const TrackDict: Record<string, Track> = {
    "track1": { id: "track1", name: "Mountain Trace" },
    "track2": { id: "track2", name: "Snow Caps" },
    "track3": { id: "track3", name: "Forrest Hills" },
    "track4": { id: "track4", name: "Sand Town" },
    "track5": { id: "track5", name: "Hell’s Kitchen" },
    "track6": { id: "track6", name: "Devil’s Ridge" },
    "track7": { id: "track7", name: "River Town" },
    "track8": { id: "track8", name: "Doom Vally" },
    "track9": { id: "track9", name: "Cactus Grasslands" },
    "track10": { id: "track10", name: "Torry’s Lane" },
    "track11": { id: "track11", name: "Water World" },
    "track12": { id: "track12", name: "Savage Swamps" },
};

export const allTracks: Track[] = Object.values(TrackDict);