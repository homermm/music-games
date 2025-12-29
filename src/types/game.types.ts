export interface Song {
  name: string;
  playcount?: number;
  url?: string;
}

export interface Artist {
  name: string;
  mbid?: string;
  url?: string;
  image?: string;
}

export interface Lyrics {
  lyrics: string;
  error?: string;
}

export interface GameRound {
  roundNumber: number;
  song: Song;
  selectedAnswer: string | null;
  isCorrect: boolean | null;
  lyrics: string[];
}

export interface GameState {
  artist: Artist | null;
  currentRound: number;
  rounds: GameRound[];
  totalRounds: number;
  score: number;
  isGameOver: boolean;
  isLoading: boolean;
  error: string | null;
}

export type GameScreen = 'artist-selection' | 'gameplay' | 'results';
