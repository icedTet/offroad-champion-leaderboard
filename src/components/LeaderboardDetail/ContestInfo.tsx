interface ContestInfoProps {
  contestType: string;
  winnerUsername: string;
  winnerFlag: string;
  rules: string[];
}

export const ContestInfo = ({
  contestType,
  winnerUsername,
  winnerFlag,
  rules,
}: ContestInfoProps) => {
  return (
    <div className="grid grid-cols-3 border border-[#3D3356] rounded-lg overflow-hidden font-family-inter mb-6 bg-[#1A1331]">
      {/* Contest Type */}
      <div className="p-6 border-r border-[#3D3356]">
        <div className="text-gray-400 text-sm mb-2">CONTEST TYPE</div>
        <div className="text-white text-base">{contestType}</div>
      </div>

      {/* Winner */}
      <div className="p-6 border-r border-[#3D3356]">
        <div className="text-gray-400 text-sm mb-2">WINNER</div>
        <div className="flex items-center gap-2">
          <span className="text-2xl">{winnerFlag}</span>
          <span className="text-white text-base">{winnerUsername}</span>
        </div>
      </div>

      {/* Rules */}
      <div className="p-6">
        <div className="text-gray-400 text-sm mb-2">RULES</div>
        <div className="text-white text-sm">
          {rules.map((rule, index) => (
            <div key={index} className="mb-1">• {rule}</div>
          ))}
        </div>
      </div>
    </div>
  );
};
