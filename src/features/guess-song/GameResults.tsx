import Button from '../../components/Button';
import { GameRound } from '../../types/game.types';

interface GameResultsProps {
  artist: string;
  score: number;
  totalRounds: number;
  rounds: GameRound[];
  onPlayAgain: () => void;
  onSelectNewArtist: () => void;
  onBackToMenu: () => void;
}

export default function GameResults({
  artist,
  score,
  totalRounds,
  rounds,
  onPlayAgain,
  onSelectNewArtist,
  onBackToMenu,
}: GameResultsProps) {
  const percentage = Math.round((score / totalRounds) * 100);
  
  let message = '';
  let emoji = '';
  
  if (percentage === 100) {
    message = 'Perfecto - Eres un experto';
    emoji = '🏆';
  } else if (percentage >= 80) {
    message = 'Excelente trabajo';
    emoji = '⭐';
  } else if (percentage >= 60) {
    message = 'Bien hecho';
    emoji = '👍';
  } else if (percentage >= 40) {
    message = 'No está mal';
    emoji = '💪';
  } else {
    message = 'Sigue practicando';
    emoji = '📚';
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-8 flex items-center justify-center">
      <div className="max-w-3xl w-full">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-10 text-center">
          <div className="text-8xl mb-6">{emoji}</div>
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Juego Terminado
          </h1>
          <h2 className="text-4xl mb-3 text-white">{artist}</h2>
          <p className="text-2xl mb-10 text-blue-200">{message}</p>

          <div className="backdrop-blur-xl bg-gradient-to-br from-blue-600/30 to-cyan-600/30 border border-blue-400/30 rounded-2xl p-8 mb-8">
            <div className="text-7xl font-bold mb-3 bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
              {score}/{totalRounds}
            </div>
            <div className="text-3xl text-blue-200">{percentage}% de aciertos</div>
          </div>

          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 text-left">
            <h3 className="text-2xl font-bold mb-5 text-blue-100">Resumen:</h3>
            <div className="space-y-3">
              {rounds.map((round) => (
                <div 
                  key={round.roundNumber}
                  className={`flex items-center justify-between p-4 rounded-xl backdrop-blur-md transition-all ${
                    round.isCorrect 
                      ? 'bg-green-500/40 border border-green-400/50' 
                      : 'bg-red-500/40 border border-red-400/50'
                  }`}
                >
                  <span className="font-bold text-lg">Ronda {round.roundNumber}</span>
                  <span className="flex-1 mx-4 truncate text-white/90">{round.song.name}</span>
                  <span className="text-3xl">{round.isCorrect ? '✓' : '✗'}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Button 
              variant="success" 
              onClick={onPlayAgain}
              className="w-full text-xl py-5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 border-none shadow-xl"
            >
              🔄 Jugar de Nuevo
            </Button>
            
            <Button 
              variant="primary" 
              onClick={onSelectNewArtist}
              className="w-full text-xl py-5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 border-none shadow-xl"
            >
              Seleccionar Otro Artista
            </Button>
            
            <Button 
              variant="secondary" 
              onClick={onBackToMenu}
              className="w-full text-xl py-5 backdrop-blur-md bg-white/10 hover:bg-white/20 border border-white/20"
            >
              ← Volver al Menú
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
