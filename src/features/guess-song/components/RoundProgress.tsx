interface RoundProgressProps {
  currentRound: number;
  totalRounds: number;
  roundResults: (boolean | null)[];
}

export default function RoundProgress({ currentRound, totalRounds, roundResults }: RoundProgressProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      {Array.from({ length: totalRounds }).map((_, index) => {
        const roundNumber = index + 1;
        const isCurrentRound = roundNumber === currentRound;
        const result = roundResults[index];
        
        let classes = 'backdrop-blur-md bg-white/20 border-2 border-white/40';
        let icon = '';
        
        if (result === true) {
          classes = 'bg-gradient-to-br from-green-500 to-emerald-500 border-2 border-green-400 shadow-lg shadow-green-500/50';
          icon = '✓';
        } else if (result === false) {
          classes = 'bg-gradient-to-br from-red-500 to-rose-500 border-2 border-red-400 shadow-lg shadow-red-500/50';
          icon = '✗';
        } else if (isCurrentRound) {
          classes = 'bg-gradient-to-br from-yellow-400 to-orange-400 border-2 border-yellow-300 shadow-xl shadow-yellow-400/50 animate-pulse';
        }
        
        return (
          <div
            key={index}
            className={`${classes} w-14 h-14 rounded-full flex items-center justify-center font-bold text-white transition-all duration-300 ${
              isCurrentRound ? 'scale-125 ring-4 ring-yellow-400/50' : ''
            }`}
          >
            {icon || roundNumber}
          </div>
        );
      })}
    </div>
  );
}
