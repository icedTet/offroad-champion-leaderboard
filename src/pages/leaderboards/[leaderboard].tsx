import { Leaderboard, LeaderboardEntry } from "../../utils/types/leaderboard";

export const LeaderboardPage = (props: {
    leaderboard: Leaderboard;
    entries: LeaderboardEntry[];
    
}) =>{
    const { leaderboard, entries } = props;

}
export default LeaderboardPage;

// export const getServerSideProps = async (context) => {
//     const { leaderboard } = context.params;
    
//     // For now, we will use dummy data. Later, we will fetch from a database or API.
//     // You can replace this with actual data fetching logic.
//     const { dailyTournamentLeaderboard, dailyTournamentEntries } = await import("../../utils/types/dummy/daily");
    

// }