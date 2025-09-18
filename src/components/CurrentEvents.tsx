import { TournamentEvent } from "../utils/types/events";
import { CurrentEvent } from "./CurrentEvent";

export const CurrentEvents = (props: { events: TournamentEvent[] }) => {
    const { events } = props;

    return (
<div className="p-8 m-4 border border-gray-900/20 dark:border-gray-100/10 rounded-2xl max-w-prose">
        <h1 className="text-3xl font-bold">Tournament Events</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Explore our exciting tournament events, compete for prizes, and see
          who comes out on top!
        </p>
        <div className="mt-4 flex flex-col gap-4">

        {events.map((event) => (
            <CurrentEvent key={event.id} event={event} />
        ))}
        </div>
      </div>
    );
}