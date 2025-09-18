import { CurrentEvents } from "../components/CurrentEvents";
import { dummyEvents, TournamentEvent } from "../utils/types/events";

export const LeaderboardPage = (props: { events: TournamentEvent[] }) => {
  const { events } = props;

  return (
    <div className={`w-full min-h-screen`}>
      <CurrentEvents events={events} />
    </div>
  );
};

export default LeaderboardPage;

export const getServerSideProps = async () => {
  const events = dummyEvents; // Figure out how to actually fetch events later
  return {
    props: {
      events: events,
    },
  };
};
