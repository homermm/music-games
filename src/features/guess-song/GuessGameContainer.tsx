import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameScreen, Artist } from '../../types/game.types';
import { useGuessGame } from '../../hooks/useGuessGame';
import ArtistSelection from './ArtistSelection';
import GamePlay from './GamePlay';
import GameResults from './GameResults';
import Button from '../../components/Button';

export default function GuessGameContainer() {
  const navigate = useNavigate();
  const [screen, setScreen] = useState<GameScreen>('artist-selection');
  const { gameState, startGame, getOptionsForCurrentRound, submitAnswer, restartGame, selectNewArtist } = useGuessGame();

  const handleSelectArtist = async (artist: Artist) => {
    await startGame(artist);
    if (!gameState.error) {
      setScreen('gameplay');
    }
  };

  const handleSubmitAnswer = async (songName: string) => {
    await submitAnswer(songName);
  };

  const handlePlayAgain = () => {
    restartGame();
    setScreen('gameplay');
  };

  const handleSelectNewArtist = () => {
    selectNewArtist();
    setScreen('artist-selection');
  };

  const handleBackToMenu = () => {
    navigate('/');
  };

  const handleExitGame = () => {
    handleSelectNewArtist();
  };

  const handleDismissError = () => {
    selectNewArtist();
    setScreen('artist-selection');
  };

  if (screen === 'gameplay' && gameState.isGameOver) {
    setScreen('results');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {gameState.error && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="backdrop-blur-xl bg-white/10 border border-red-400/50 rounded-3xl p-8 max-w-md shadow-2xl">
            <div className="text-6xl mb-4 text-center">⚠️</div>
            <h2 className="text-2xl font-bold mb-4 text-red-300 text-center">Error</h2>
            <p className="text-white/90 mb-6 text-center text-lg">{gameState.error}</p>
            <div className="flex flex-col gap-3">
              <Button 
                onClick={handleDismissError}
                variant="primary"
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 border-none"
              >
                Elegir Otro Artista
              </Button>
              <Button 
                onClick={handleBackToMenu}
                variant="secondary"
                className="w-full backdrop-blur-md bg-white/10 hover:bg-white/20 border border-white/20"
              >
                Volver al Menú
              </Button>
            </div>
          </div>
        </div>
      )}

      {screen === 'artist-selection' && (
        <ArtistSelection 
          onSelectArtist={handleSelectArtist}
          onBackToMenu={handleBackToMenu}
        />
      )}

      {screen === 'gameplay' && gameState.currentRound > 0 && (
        <GamePlay
          artist={gameState.artist?.name || ''}
          currentRound={gameState.currentRound}
          totalRounds={gameState.totalRounds}
          lyrics={gameState.rounds[gameState.currentRound - 1]?.lyrics || []}
          options={getOptionsForCurrentRound()}
          roundResults={gameState.rounds.map(r => r.isCorrect)}
          isLoading={gameState.isLoading}
          onSubmitAnswer={handleSubmitAnswer}
          onExit={handleExitGame}
        />
      )}

      {screen === 'results' && (
        <GameResults
          artist={gameState.artist?.name || ''}
          score={gameState.score}
          totalRounds={gameState.totalRounds}
          rounds={gameState.rounds}
          onPlayAgain={handlePlayAgain}
          onSelectNewArtist={handleSelectNewArtist}
          onBackToMenu={handleBackToMenu}
        />
      )}

      {gameState.isLoading && screen === 'artist-selection' && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-10 rounded-3xl text-center shadow-2xl">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-400 mb-4"></div>
            <p className="text-2xl text-white">Cargando juego...</p>
          </div>
        </div>
      )}
    </div>
  );
}
