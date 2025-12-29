import { Link } from 'react-router-dom';
import Button from '../components/Button';

export default function CrosswordGame() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center p-8">
      <div className="max-w-2xl text-center">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-12 shadow-2xl">
          <div className="text-9xl mb-8">♫</div>
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Crucigrama Musical
          </h1>
          <p className="text-2xl text-purple-200 mb-8">
            Esta característica estará disponible próximamente
          </p>
          <p className="text-lg text-purple-300/80 mb-12">
            Estamos trabajando en un crucigrama musical donde podrás resolver pistas relacionadas con tus artistas y canciones favoritas.
          </p>
          <Link to="/">
            <Button 
              variant="primary" 
              className="backdrop-blur-md bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-none shadow-xl px-8 py-4 text-lg"
            >
              ← Volver al Menú Principal
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
