import { Artist, Song, Lyrics } from '../types/game.types';

const LASTFM_API_KEY = import.meta.env.VITE_LASTFM_API_KEY;
const LASTFM_BASE_URL = 'https://ws.audioscrobbler.com/2.0/';
const LYRICS_BASE_URL = 'https://api.lyrics.ovh/v1';

const cache = new Map<string, any>();

function extractImage(images: any[]): string {
  if (!images || images.length === 0) return '';
  const large = images.find((img: any) => img.size === 'extralarge' || img.size === 'large');
  const medium = images.find((img: any) => img.size === 'medium');
  const fallback = images.find((img: any) => img['#text'] && img['#text'].length > 0);
  return large?.['#text'] || medium?.['#text'] || fallback?.['#text'] || '';
}

export async function getAvailableArtists(): Promise<Artist[]> {
  const popularArtistNames = [
    "Queen", "The Beatles", "Guns N' Roses", "Nirvana", "AC/DC",
    "Pink Floyd", "Led Zeppelin", "Metallica", "Red Hot Chili Peppers", "Radiohead"
  ];

  const artistPromises = popularArtistNames.map(async (name) => {
    try {
      const params = new URLSearchParams({
        method: 'artist.getinfo',
        artist: name,
        api_key: LASTFM_API_KEY,
        format: 'json'
      });

      const response = await fetch(`${LASTFM_BASE_URL}?${params}`);
      const data = await response.json();
      
      if (data.artist) {
        return {
          name: data.artist.name,
          mbid: data.artist.mbid,
          url: data.artist.url,
          image: extractImage(data.artist.image)
        };
      }
      return { name };
    } catch (error) {
      console.error(`Error fetching info for ${name}:`, error);
      return { name };
    }
  });

  return await Promise.all(artistPromises);
}

export async function searchArtists(query: string): Promise<Artist[]> {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const cacheKey = `artist_search_${query.toLowerCase()}`;
  
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  try {
    const params = new URLSearchParams({
      method: 'artist.search',
      artist: query,
      api_key: LASTFM_API_KEY,
      format: 'json',
      limit: '10'
    });

    const response = await fetch(`${LASTFM_BASE_URL}?${params}`);
    
    if (!response.ok) {
      throw new Error(`Last.fm API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.message || 'Last.fm API error');
    }

    const artistMatches = data.results?.artistmatches?.artist;
    
    if (!artistMatches) {
      return [];
    }

    const artistArray = Array.isArray(artistMatches) ? artistMatches : [artistMatches];
    
    const artists: Artist[] = artistArray.map((artist: any) => ({
      name: artist.name,
      mbid: artist.mbid,
      url: artist.url,
      image: extractImage(artist.image)
    }));

    cache.set(cacheKey, artists);
    return artists;
  } catch (error) {
    console.error('Error searching artists:', error);
    return [];
  }
}

export async function getArtistSongs(artistName: string): Promise<Song[]> {
  const cacheKey = `artist_songs_${artistName}`;
  
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  try {
    const params = new URLSearchParams({
      method: 'artist.gettoptracks',
      artist: artistName,
      api_key: LASTFM_API_KEY,
      format: 'json',
      limit: '50'
    });

    const response = await fetch(`${LASTFM_BASE_URL}?${params}`);
    
    if (!response.ok) {
      throw new Error(`Last.fm API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.message || 'Last.fm API error');
    }

    const songs: Song[] = data.toptracks?.track?.map((track: any) => ({
      name: track.name,
      playcount: parseInt(track.playcount || '0'),
      url: track.url
    })) || [];

    cache.set(cacheKey, songs);
    return songs;
  } catch (error) {
    console.error('Error fetching artist songs:', error);
    throw new Error('No se pudieron cargar las canciones del artista');
  }
}

export async function getLyrics(artist: string, songTitle: string): Promise<Lyrics> {
  const cacheKey = `lyrics_${artist}_${songTitle}`;
  
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  try {
    const response = await fetch(`${LYRICS_BASE_URL}/${encodeURIComponent(artist)}/${encodeURIComponent(songTitle)}`);
    
    if (!response.ok) {
      throw new Error(`Lyrics API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.lyrics) {
      throw new Error('No lyrics found');
    }

    const result: Lyrics = {
      lyrics: data.lyrics
    };

    cache.set(cacheKey, result);
    return result;
  } catch (error) {
    console.error('Error fetching lyrics:', error);
    return {
      lyrics: '',
      error: 'No se pudieron cargar las letras para esta canción'
    };
  }
}

export function parseLyrics(lyricsText: string): string[] {
  return lyricsText
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);
}

export function clearCache(): void {
  cache.clear();
}
