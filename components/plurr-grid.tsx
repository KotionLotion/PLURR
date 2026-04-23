"use client"

const plurr = [
  { letter: "P", word: "Peace", color: "#00ffea", glowClass: "box-glow-cyan", textGlow: "glow-cyan" },
  { letter: "L", word: "Love", color: "#ff00cc", glowClass: "box-glow-magenta", textGlow: "glow-magenta" },
  { letter: "U", word: "Unity", color: "#b8ff00", glowClass: "box-glow-lime", textGlow: "glow-lime" },
  { letter: "R", word: "Respect", color: "#ffff00", glowClass: "box-glow-yellow", textGlow: "glow-yellow" },
  { letter: "R", word: "Responsibility", color: "#ff6600", glowClass: "box-glow-orange", textGlow: "glow-orange" },
]

export default function PlurrGrid() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className="h-px w-12 bg-white/20" />
          <h2 className="text-white/50 font-mono text-sm uppercase tracking-[0.2em]">
            The Code We Live By
          </h2>
          <span className="h-px w-12 bg-white/20" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {plurr.map((item, index) => (
            <div
              key={index}
              className={`relative p-6 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-sm flex flex-col items-center justify-center aspect-square hover:${item.glowClass} transition-all duration-300 group cursor-pointer`}
              style={{
                borderColor: `${item.color}20`,
              }}
            >
              <span
                className={`font-bebas text-5xl sm:text-6xl md:text-7xl ${item.textGlow} group-hover:scale-110 transition-transform duration-300`}
                style={{ color: item.color }}
              >
                {item.letter}
              </span>
              <span className="text-white/60 font-mono text-xs uppercase tracking-wider mt-2 text-center">
                {item.word}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
