"use client";
import { TournamentEvent } from "../../../utils/types/events";
import { RecentEvent } from "./RecentEvent";

export const RecentEvents = (props: { events: TournamentEvent[] }) => {
  const { events } = props;
  return (
    <div className={`flex flex-col h-full`}>
      <h4 className="text-xl font-bold font-family-inter pl-2 md:pl-3 lg:pl-4 mb-2 ">
        Recent Tournament Events
      </h4>
      <div
        className={`flex flex-col gap-4 md:gap-6 lg:gap-8 border border-purple-500 p-4 md:p-6 lg:p-8 rounded-lg font-family-inter flex-1 grow justify-evenly`}
      >
        {events.map((event) => (
          <RecentEvent key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};
