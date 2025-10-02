"use client";
import { TournamentEvent } from "../../../utils/types/events";
import { RecentEvent } from "./RecentEvent";

export const RecentEvents = (props: { events: TournamentEvent[] }) => {
  const { events } = props;
  return (
    <div className={`flex flex-col h-full`}>
      <h4 className="text-xl font-bold font-family-inter pl-4 mb-4">
        Recent Tournament Events
      </h4>
      <div
        className={`flex flex-col gap-8 border border-purple-500 p-8 rounded-lg font-family-inter flex-1`}
      >
        {events.map((event) => (
          <RecentEvent key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};
