interface LyricDisplayProps {
  lyrics: string[];
}

export default function LyricDisplay({ lyrics }: LyricDisplayProps) {
  return (
    <div className="backdrop-blur-md bg-white/5 border border-white/10 p-8 rounded-2xl">
      <h2 className="font-bold text-2xl mb-6 text-blue-100">Letra:</h2>
      <div className="italic leading-relaxed whitespace-pre-wrap text-xl text-white/90">
        {lyrics.map((line, index) => (
          <p key={index} className="mb-3">{line}</p>
        ))}
      </div>
    </div>
  );
}
