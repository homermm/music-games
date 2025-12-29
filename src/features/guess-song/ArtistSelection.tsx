import { useState, useEffect } from 'react';
import { Artist } from '../../types/game.types';
import { getAvailableArtists, searchArtists } from '../../services/musicApi';
import Button from '../../components/Button';

interface ArtistSelectionProps {
  onSelectArtist: (artist: Artist) => void;
  onBackToMenu: () => void;
}

const gradients = [
  'from-purple-500 to-pink-500',
  'from-blue-500 to-cyan-500',
  'from-green-500 to-teal-500',
  'from-orange-500 to-red-500',
  'from-indigo-500 to-purple-500',
  'from-pink-500 to-rose-500',
  'from-cyan-500 to-blue-500',
  'from-yellow-500 to-orange-500',
];

function getGradient(name: string): string {
  const index = name.charCodeAt(0) % gradients.length;
  return gradients[index];
}

function getInitial(name: string): string {
  return name.charAt(0).toUpperCase();
}

export default function ArtistSelection({ onSelectArtist, onBackToMenu }: ArtistSelectionProps) {
  const [suggestedArtists, setSuggestedArtists] = useState<Artist[]>([]);
  const [searchResults, setSearchResults] = useState<Artist[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadSuggestedArtists() {
      setIsLoading(true);
      try {
        const artists = await getAvailableArtists();
        setSuggestedArtists(artists);
      } catch (error) {
        console.error('Error loading artists:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadSuggestedArtists();
  }, []);

  useEffect(() => {
    const searchTimer = setTimeout(async () => {
      if (searchQuery.trim().length >= 2) {
        setIsSearching(true);
        try {
          const results = await searchArtists(searchQuery);
          setSearchResults(results);
        } catch (error) {
          console.error('Error searching artists:', error);
          setSearchResults([]);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(searchTimer);
  }, [searchQuery]);

  const displayArtists = searchQuery.trim().length >= 2 ? searchResults : suggestedArtists;
  const showingSuggested = searchQuery.trim().length < 2;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-400 mb-4"></div>
          <p className="text-xl text-blue-200">Cargando artistas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Button variant="secondary" onClick={onBackToMenu} className="backdrop-blur-md bg-white/10 hover:bg-white/20 border border-white/20">
            ← Volver
          </Button>
        </div>

        <header className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Selecciona un Artista
          </h1>
          <p className="text-xl text-blue-200 mb-8">
            Busca tu artista favorito o elige uno de los sugeridos
          </p>

          <div className="max-w-2xl mx-auto">
            <div className="relative backdrop-blur-xl bg-white/10 rounded-full p-2 border border-white/20 shadow-2xl">
              <div className="flex items-center">
                <div className="pl-4 pr-3">
                  <svg className="w-6 h-6 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar artista..."
                  className="flex-1 bg-transparent border-none outline-none text-lg text-white placeholder-blue-300/60 px-2 py-3"
                />
                {isSearching && (
                  <div className="pr-4">
                    <div className="animate-spin h-5 w-5 border-2 border-blue-400 border-t-transparent rounded-full"></div>
                  </div>
                )}
              </div>
            </div>
            
            {searchQuery.trim().length > 0 && searchQuery.trim().length < 2 && (
              <p className="text-blue-300/80 text-sm mt-3">Escribe al menos 2 caracteres</p>
            )}
          </div>
        </header>

        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold text-blue-200">
            {showingSuggested ? 'Artistas Populares' : `${displayArtists.length} Resultados`}
          </h2>
        </div>

        {displayArtists.length === 0 && !isSearching && (
          <div className="text-center py-16">
            <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-12 border border-white/10 max-w-md mx-auto">
              <p className="text-xl text-blue-200">
                {searchQuery.trim().length >= 2 
                  ? 'No se encontraron artistas'
                  : 'Comienza a escribir para buscar'}
              </p>
            </div>
          </div>
        )}

        {displayArtists.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {displayArtists.map((artist) => (
              <button
                key={artist.mbid || artist.name}
                onClick={() => onSelectArtist(artist)}
                className="group backdrop-blur-xl bg-white/10 hover:bg-white/20 rounded-3xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${getGradient(artist.name)} flex items-center justify-center text-3xl font-bold text-white shadow-lg group-hover:shadow-2xl transition-shadow`}>
                    {getInitial(artist.name)}
                  </div>
                  <h3 className="font-semibold text-lg text-center leading-tight text-white group-hover:text-blue-200 transition-colors">
                    {artist.name}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        )}

        {!showingSuggested && displayArtists.length > 0 && (
          <div className="text-center mt-12">
            <button
              onClick={() => setSearchQuery('')}
              className="text-blue-300 hover:text-blue-100 underline underline-offset-4 transition-colors"
            >
              ← Ver artistas populares
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
