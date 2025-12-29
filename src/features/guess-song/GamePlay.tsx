import { useState } from 'react';
import { Song } from '../../types/game.types';
import LyricDisplay from './components/LyricDisplay';
import RoundProgress from './components/RoundProgress';
import Button from '../../components/Button';

interface GamePlayProps {
  artist: string;
  currentRound: number;
  totalRounds: number;
  lyrics: string[];
  options: Song[];
  roundResults: (boolean | null)[];
  isLoading: boolean;
  onSubmitAnswer: (songName: string) => void;
  onExit: () => void;
}

export default function GamePlay({
  artist,
  currentRound,
  totalRounds,
  lyrics,
  options,
  roundResults,
  isLoading,
  onSubmitAnswer,
  onExit,
}: GamePlayProps) {
  const [selectedSong, setSelectedSong] = useState('');
  const [feedback, setFeedback] = useState<{ show: boolean; isCorrect: boolean; message: string }>({
    show: false,
    isCorrect: false,
    message: '',
  });

  const handleSubmit = () => {
    if (!selectedSong) {
      alert('Por favor selecciona una canción');
      return;
    }

    const gameSongs = (window as any).__gameSongs || [];
    const currentSongName = gameSongs[currentRound - 1]?.name;
    const isCorrect = selectedSong === currentSongName;

    const audio = new Audio(isCorrect ? '/sounds/correct.mp3' : '/sounds/wrong.mp3');
    audio.play().catch(() => {});

    setFeedback({
      show: true,
      isCorrect,
      message: isCorrect ? 'Correcto' : `Incorrecto. Era: ${currentSongName}`,
    });

    setTimeout(() => {
      onSubmitAnswer(selectedSong);
      setSelectedSong('');
      setFeedback({ show: false, isCorrect: false, message: '' });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button 
            variant="secondary" 
            onClick={onExit} 
            className="backdrop-blur-md bg-white/10 hover:bg-white/20 border border-white/20"
          >
            ← Salir
          </Button>
        </div>

        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
            {artist}
          </h1>
          <p className="text-2xl text-blue-200 mb-8">Ronda {currentRound} de {totalRounds}</p>
          <RoundProgress 
            currentRound={currentRound} 
            totalRounds={totalRounds}
            roundResults={roundResults}
          />
        </header>

        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 mb-6">
          <LyricDisplay lyrics={lyrics} />

          {feedback.show ? (
            <div className={`mt-8 p-6 rounded-2xl text-center text-2xl font-bold backdrop-blur-xl transition-all ${
              feedback.isCorrect 
                ? 'bg-green-500/90 border border-green-400/50' 
                : 'bg-red-500/90 border border-red-400/50'
            }`}>
              {feedback.message}
            </div>
          ) : (
            <div className="mt-8">
              <h3 className="block font-semibold text-2xl mb-6 text-blue-100">
                Selecciona la canción:
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {options.map((song) => (
                  <button
                    key={song.name}
                    onClick={() => setSelectedSong(song.name)}
                    disabled={isLoading}
                    className={`p-5 rounded-2xl font-medium text-lg transition-all transform hover:scale-105 ${
                      selectedSong === song.name
                        ? 'backdrop-blur-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white ring-4 ring-yellow-400 shadow-2xl shadow-blue-500/50'
                        : 'backdrop-blur-md bg-white/10 text-white hover:bg-white/20 border border-white/20 hover:border-white/40'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {song.name}
                  </button>
                ))}
              </div>

              <Button 
                onClick={handleSubmit} 
                variant="primary" 
                disabled={isLoading || !selectedSong}
                className="w-full text-xl py-5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 border-none shadow-xl"
              >
                {isLoading ? 'Cargando...' : 'Confirmar Respuesta'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
