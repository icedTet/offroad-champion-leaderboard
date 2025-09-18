import { TournamentEvent } from "../utils/types/events";
import { CurrentEvent } from "./CurrentEvent";

export const RecentEvents = (props: { events: TournamentEvent[] }) => {
    const { events } = props;

    return (
<div className="p-0 w-screen max-w-prose col-span-1">
        <h4 className="text-xl font-bold">Recent Tournament Events</h4>
        
        <div className="mt-4 flex flex-col gap-2">

        {events.map((event) => (
            <CurrentEvent key={event.id} event={event} />
        ))}
        </div>
      </div>
    );
}