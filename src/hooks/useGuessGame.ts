import { useState, useCallback } from 'react';
import { GameState, GameRound, Artist, Song } from '../types/game.types';
import { getArtistSongs, getLyrics, parseLyrics } from '../services/musicApi';
import { getRandomItems, getConsecutiveLines } from '../utils/randomUtils';

const TOTAL_ROUNDS = 5;
const OPTIONS_COUNT = 4;

async function findSongWithLyrics(artist: string, songs: Song[], usedSongs: Song[]): Promise<{ song: Song; lyrics: string[] } | null> {
  const availableSongs = songs.filter(s => !usedSongs.find(used => used.name === s.name));
  
  for (const song of availableSongs) {
    try {
      const lyricsData = await getLyrics(artist, song.name);
      
      if (!lyricsData.error && lyricsData.lyrics) {
        const parsedLyrics = parseLyrics(lyricsData.lyrics);
        
        if (parsedLyrics.length >= 2) {
          const selectedLines = getConsecutiveLines(parsedLyrics, 2);
          return { song, lyrics: selectedLines };
        }
      }
    } catch (error) {
      continue;
    }
  }
  
  return null;
}

export function useGuessGame() {
  const [gameState, setGameState] = useState<GameState>({
    artist: null,
    currentRound: 0,
    rounds: [],
    totalRounds: TOTAL_ROUNDS,
    score: 0,
    isGameOver: false,
    isLoading: false,
    error: null,
  });

  const startGame = useCallback(async (artist: Artist) => {
    setGameState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const allSongs = await getArtistSongs(artist.name);
      
      if (allSongs.length < TOTAL_ROUNDS) {
        throw new Error('Este artista no tiene suficientes canciones disponibles');
      }

      const usedSongs: Song[] = [];
      const gameSongs: Song[] = [];
      
      for (let i = 0; i < TOTAL_ROUNDS; i++) {
        const result = await findSongWithLyrics(artist.name, allSongs, usedSongs);
        
        if (!result) {
          throw new Error('No se pudieron encontrar suficientes canciones con letras. Intenta con otro artista.');
        }
        
        gameSongs.push(result.song);
        usedSongs.push(result.song);
        
        if (i === 0) {
          const firstRound: GameRound = {
            roundNumber: 1,
            song: result.song,
            selectedAnswer: null,
            isCorrect: null,
            lyrics: result.lyrics,
          };

          setGameState({
            artist,
            currentRound: 1,
            rounds: [firstRound],
            totalRounds: TOTAL_ROUNDS,
            score: 0,
            isGameOver: false,
            isLoading: false,
            error: null,
          });
        }
      }

      (window as any).__gameSongs = gameSongs;
      (window as any).__allSongs = allSongs;
    } catch (error) {
      setGameState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Error al iniciar el juego',
      }));
    }
  }, []);

  const getOptionsForCurrentRound = useCallback((): Song[] => {
    const gameSongs = (window as any).__gameSongs || [];
    const allSongs = (window as any).__allSongs || [];
    
    if (gameState.currentRound === 0 || gameState.currentRound > gameState.rounds.length) {
      return [];
    }

    const currentSong = gameState.rounds[gameState.currentRound - 1].song;
    
    const otherSongs = allSongs.filter((s: Song) => 
      !gameSongs.find((gs: Song) => gs.name === s.name)
    ) as Song[];
    
    const wrongOptions = getRandomItems(otherSongs, OPTIONS_COUNT - 1);
    const options = [currentSong, ...wrongOptions].sort(() => 0.5 - Math.random());
    
    return options;
  }, [gameState.currentRound, gameState.rounds]);

  const submitAnswer = useCallback(async (selectedSongName: string) => {
    if (gameState.currentRound === 0 || gameState.currentRound > gameState.rounds.length) {
      return;
    }

    const currentRound = gameState.rounds[gameState.currentRound - 1];
    const isCorrect = selectedSongName === currentRound.song.name;
    
    const updatedRounds = [...gameState.rounds];
    updatedRounds[gameState.currentRound - 1] = {
      ...currentRound,
      selectedAnswer: selectedSongName,
      isCorrect,
    };

    const newScore = gameState.score + (isCorrect ? 1 : 0);

    if (gameState.currentRound >= TOTAL_ROUNDS) {
      setGameState(prev => ({
        ...prev,
        rounds: updatedRounds,
        score: newScore,
        isGameOver: true,
      }));
      return;
    }

    setGameState(prev => ({ ...prev, isLoading: true }));

    try {
      const gameSongs = (window as any).__gameSongs || [];
      const nextSong = gameSongs[gameState.currentRound];
      
      const nextSongLyrics = await getLyrics(gameState.artist!.name, nextSong.name);
      
      if (nextSongLyrics.error || !nextSongLyrics.lyrics) {
        throw new Error('No se pudieron cargar las letras de la siguiente canción');
      }

      const parsedLyrics = parseLyrics(nextSongLyrics.lyrics);
      const selectedLines = getConsecutiveLines(parsedLyrics, 2);

      const nextRound: GameRound = {
        roundNumber: gameState.currentRound + 1,
        song: nextSong,
        selectedAnswer: null,
        isCorrect: null,
        lyrics: selectedLines,
      };

      setGameState({
        ...gameState,
        rounds: [...updatedRounds, nextRound],
        currentRound: gameState.currentRound + 1,
        score: newScore,
        isLoading: false,
      });
    } catch (error) {
      setGameState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Error al cargar la siguiente ronda',
      }));
    }
  }, [gameState]);

  const restartGame = useCallback(() => {
    if (gameState.artist) {
      startGame(gameState.artist);
    }
  }, [gameState.artist, startGame]);

  const selectNewArtist = useCallback(() => {
    setGameState({
      artist: null,
      currentRound: 0,
      rounds: [],
      totalRounds: TOTAL_ROUNDS,
      score: 0,
      isGameOver: false,
      isLoading: false,
      error: null,
    });
    (window as any).__gameSongs = null;
    (window as any).__allSongs = null;
  }, []);

  return {
    gameState,
    startGame,
    getOptionsForCurrentRound,
    submitAnswer,
    restartGame,
    selectNewArtist,
  };
}
