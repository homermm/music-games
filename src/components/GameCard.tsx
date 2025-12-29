import { Link } from 'react-router-dom';

interface GameCardProps {
  title: string;
  description: string;
  icon: string;
  to: string;
  available?: boolean;
}

export default function GameCard({ 
  title, 
  description, 
  icon, 
  to, 
  available = true 
}: GameCardProps) {
  const cardContent = (
    <div className={`
      relative backdrop-blur-xl bg-white/10 border border-white/20
      rounded-3xl shadow-xl p-8 
      transition-all duration-300 
      ${available ? 'hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 hover:bg-white/20 hover:border-white/40 cursor-pointer' : 'opacity-60 cursor-not-allowed'}
    `}>
      {!available && (
        <div className="absolute top-4 right-4 bg-yellow-500/90 backdrop-blur-sm text-yellow-900 px-3 py-1 rounded-full text-sm font-bold">
          Próximamente
        </div>
      )}
      
      <div className="text-7xl mb-6 text-blue-200">{icon}</div>
      <h2 className="text-3xl font-bold text-white mb-3">{title}</h2>
      <p className="text-blue-200/80 text-lg">{description}</p>
    </div>
  );

  if (!available) {
    return cardContent;
  }

  return <Link to={to}>{cardContent}</Link>;
}
