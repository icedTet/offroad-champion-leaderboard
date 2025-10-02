import { MergedEntry } from "@/utils/types/leaderboard";
import Image from "next/image";

interface PodiumProps {
  entries: MergedEntry[];
}

export const Podium = ({ entries }: PodiumProps) => {
  const top3 = entries.slice(0, 3);
  const runnerUps = entries.slice(3, 11);

  const getCountryFlag = (countryCode?: string) => {
    if (!countryCode) return "🌐";
    return countryCode
      .toUpperCase()
      .split("")
      .map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
      .join("");
  };

  const getShieldIcon = (position: number) => {
    switch (position) {
      case 1:
        return "/assets/winner.svg";
      case 2:
        return "/assets/silver.svg";
      case 3:
        return "/assets/bronze.svg";
      default:
        return "/assets/winner.svg";
    }
  };

  // Arrange podium as 2nd, 1st, 3rd
  const [first, second, third] = top3;
  const podiumOrder = second ? [second, first, third] : [first];

  return (
    <div className="flex flex-col h-full">
      <h4 className="text-xl font-bold font-family-inter pl-2 mb-2">
        Best of Off-Road Champion
      </h4>
      <div className="border border-purple-500 rounded-lg p-8 font-family-inter flex-1">
        <div className="flex items-start gap-8">
          {/* Podium Display */}
          <div className="flex items-end justify-center gap-2 scale-100 w-max">
            {podiumOrder.map((entry, idx) => {
              if (!entry) return null;
              const position = idx === 1 ? 1 : idx === 0 ? 2 : 3;
              const isFirst = position === 1;

              return (
                <div
                  key={entry.userId}
                  className="flex flex-col items-center grow-0 shrink-0"
                  style={{ marginBottom: isFirst ? "0px" : "-40px" }}
                >
                  {/* Shield Icon */}
                  <div className="relative mb-4">
                    <Image
                      src={getShieldIcon(position)}
                      alt={`Position ${position}`}
                      width={1.5 * (isFirst ? 90 : 70)}
                      height={1.5 * (isFirst ? 105 : 84)}
                      className="drop-shadow-lg grow-0 shrink-0"
                    />
                    {/* Position number bubble */}
                    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-white text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                      {position}
                    </div>
                  </div>

                  {/* Username */}
                  <div className="text-xs font-bold mb-1">
                    {entry.user.username}
                  </div>
                  {/* Number of Races */}
                  <div className="text-xs font-bold mb-1">
                    {entry.races.length}
                    <span className="text-yellow-500">W</span>
                  </div>

                  {/* Flag */}
                  <div className="text-2xl mb-1">
                    {getCountryFlag(entry.user.countryCode)}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Runner-ups list */}
          {runnerUps.length > 0 && (
            <div className="flex flex-col space-y-1 flex-1">
              {runnerUps.map((entry) => (
                <div
                  key={entry.userId}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5">
                      <Image
                        src="/assets/winner.svg"
                        alt="Shield"
                        width={20}
                        height={20}
                      />
                    </div>
                    <span className="text-lg">
                      {getCountryFlag(entry.user.countryCode)}
                    </span>
                    <span className="text-xs font-medium">
                      {entry.user.username}
                    </span>
                  </div>
                  <div className="text-lg font-bold">
                    {entry.races.length}
                    <span className="text-yellow-500">W</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
