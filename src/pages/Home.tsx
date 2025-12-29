import GameCard from '../components/GameCard';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-7xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Music Games
          </h1>
          <p className="text-xl text-blue-200">
            Pon a prueba tus conocimientos musicales
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <GameCard
            title="Adivina la Canción"
            description="Lee fragmentos de letras y adivina la canción correcta"
            icon="♪"
            to="/guess-song"
            available={true}
          />
          
          <GameCard
            title="Crucigrama Musical"
            description="Resuelve crucigramas con pistas musicales"
            icon="♫"
            to="/crossword"
            available={false}
          />
        </div>

        <footer className="text-center mt-16 text-blue-300/60">
          <p>Desarrollado con React + TypeScript + TailwindCSS</p>
        </footer>
      </div>
    </div>
  );
}
