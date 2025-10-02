"use client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { TournamentEvent } from "../../../utils/types/events";
import { userDictionary } from "../../../utils/types/user";
import getUnicodeFlagIcon from "country-flag-icons/unicode";

export const RecentEvent = (props: { event: TournamentEvent }) => {
    const { event } = props;
  return (
    <div
      key={event.id}
      className={`border p-4 border-purple-500 bg-purple-500/10 bg rounded-lg flex flex-row gap-4 justify-start items-center`}
    >
      {/* @TODO: Figure out how this alignment works */}
      <div className={`flex flex-row gap-3 w-[60%]`}>
        <div className={`flex`}>
          <img
            src={event.iconURL ?? "/logo.png"}
            alt="Event Icon"
            className={`w-10 h-10`}
          />
        </div>
        <div className={`flex flex-col gap-0`}>
          <h5 className={`font-bold text-base`}>{event.name}</h5>
          <span className={`text-sm font-semibold`}>
            {dayjs(event.startDate).format("M/D/YYYY")}
          </span>
          <span className={`text-xs text-gray-400`}>
            {new Date(event.endDate) > new Date() ? "Ends" : "Ended"}{" "}
            {dayjs(event.endDate).fromNow()}
          </span>
        </div>
      </div>
      <div className={`flex flex-col gap-4`}>
        <div className={`flex flex-row gap-2 items-end `}>
          <img
            src="assets/winner.svg"
            alt="Winner Icon"
            className={`w-6 h-6`}
          />
          <span className={`text-sm font-bold text-amber-400`}>Winner:</span>
          <div className={`flex flex-row gap-2 items-baseline`}>
            <span className={`text-sm font-medium text-gray-400`}>
              {userDictionary[event.winningUserId ?? ""]?.countryCode
                ? getUnicodeFlagIcon(
                    userDictionary[event.winningUserId ?? ""]?.countryCode ?? ""
                  )
                : "🏳️"}
            </span>
            <span className={`text-sm font-medium`}>
              {userDictionary[event.winningUserId ?? ""]?.username ?? "TBD"}
            </span>
          </div>
        </div>
        <div className={`flex flex-row gap-2 items-center `}>
          <img src="assets/coin.svg" alt="Prize Icon" className={`w-6 h-6`} />
          <span className={`text-lg font-bold text-emerald-400`}>
            Prize: $5
          </span>
        </div>
      </div>
    </div>
  );
};
