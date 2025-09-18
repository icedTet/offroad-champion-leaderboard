import dayjs from "dayjs";
import { TournamentEvent } from "../utils/types/events";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);


const determineAppropriateColor = (event: TournamentEvent) => {
  if (new Date(event.endDate) < new Date()) {
    return {
      bg: "bg-gray-400 dark:bg-gray-600",
      text: "text-gray-700 dark:text-gray-300",
      border: "border-gray-400 dark:border-gray-600",
      status: "Ended",
    };
  }
  if (new Date(event.startDate) > new Date()) {
    return {
      bg: "bg-green-400 dark:bg-green-600",
      text: "text-green-700 dark:text-green-300",
      border: "border-green-400 dark:border-green-600",
      status: "Upcoming",
    };
  }
  return {
    bg: "bg-yellow-400 dark:bg-yellow-600",
    text: "text-yellow-700 dark:text-yellow-300",
    border: "border-yellow-400 dark:border-yellow-600",
    status: "Ongoing",
  };
};

export const CurrentEvent = (props: { event: TournamentEvent }) => {
  const { event } = props;
  const colorScheme = determineAppropriateColor(event);
  return (
    <div className={`relative group p-0`}>

      <div
        className={`${
          new Date(event.endDate) < new Date() ? "opacity-50" : ""
        } p-4 dark:bg-zinc-800 bg-white border border-gray-900/20 dark:border-gray-100/10 rounded-xl max-w-prose w-full relative group z-10`}
        key={event.id}
      >
        <div className={`flex flex-row items-center gap-4 w-full`}>
          {event.iconURL && (
            <img
              src={event.iconURL}
              alt={`${event.name} icon`}
              className="w-10 h-10 rounded-full"
            />
          )}
          <h3 className="text-lg font-semibold">{event.name}</h3>
          <div
            className={`ml-auto px-3 py-1.5 text-sm font-medium rounded-2xl flex items-center gap-2 flex-row p-2 border dark:border-gray-100/10 border-gray-900/10`}
          >
            <div className={`w-2 h-2 relative rounded-full grow-0 shrink-0`}>
              <span
                className={`absolute top-0 left-0 w-full h-full ${
                  colorScheme.status === "Ongoing" ? "animate-ping" : ""
                } z-0 rounded-full  ${colorScheme.bg}`}
              ></span>
              <span
                className={`absolute top-0 left-0 w-full h-full  z-10 rounded-full ${colorScheme.bg}`}
              ></span>
            </div>{" "}
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {colorScheme.status}
            </span>
          </div>
        </div>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          {event.description}
        </p>
      </div>
                    <div
        className={`absolute translate-y-[calc(100%+0.25rem)] left-0 bottom-0 z-20 bg-black p-2 px-4 rounded-md border border-gray-900/20 dark:border-gray-100/10 text-white text-sm scale-0 group-hover:scale-100 transition-transform origin-top-left`}
      >
        <span className={`text-sm text-gray-100/80`}>
          {dayjs(event.startDate).format("MMM D, YYYY h:mm A")} -{" "}
          {dayjs(event.endDate).format("MMM D, YYYY h:mm A")}
        </span>
         {event.endDate < new Date().toISOString() ? (
            <div className="mt-1 text-xs text-gray-100/40">
                Ended {dayjs(event.endDate).fromNow()}
            </div>
            ) : event.startDate > new Date().toISOString() ? (
            <div className="mt-1 text-xs text-gray-100/40">
                Starts {dayjs(event.startDate).fromNow()}
            </div>
            ) : event.startDate <= new Date().toISOString() && event.endDate >= new Date().toISOString() ? (
            <div className="mt-1 text-xs text-gray-100/40">
                Ends {dayjs(event.endDate).fromNow()}
            </div>
            
         ) : null}
      </div>
    </div>
  );
};
