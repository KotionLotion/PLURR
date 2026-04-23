"use client"

interface HeroSectionProps {
  onGetTickets: () => void
}

export default function HeroSection({ onGetTickets }: HeroSectionProps) {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative">
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ff00cc] rounded-full blur-[150px] opacity-20" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00ffea] rounded-full blur-[150px] opacity-20" />
      </div>

      {/* Eyebrow text */}
      <p className="text-sm md:text-base tracking-[0.3em] text-white/80 mb-6 font-mono">
        ✦ BENQUE VIEJO DEL CARMEN ✦
      </p>
      <p className="text-sm md:text-base tracking-[0.3em] text-white/80 mb-6 font-mono">
        ✦ ONE NIGHT ONLY ✦
      </p>

      {/* Main title */}
      <h1 className="font-bebas text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] leading-none tracking-wider mb-4 relative">
        <span className="text-[#00ffea] glow-cyan">PL</span>
        <span className="text-[#ff00cc] glow-magenta relative inline-block hover:glitch">URR</span>
      </h1>

      {/* Subtitle */}
      <p className="text-white/70 text-sm md:text-base tracking-[0.15em] mb-2 text-center">
        Peace · Love · Unity · Respect · Responsibility
      </p>

      {/* Date */}
      <p className="text-[#00ffea] font-mono text-lg md:text-xl tracking-wider mb-8">
        July 24–25 · 6PM → 6AM
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={onGetTickets}
          className="px-8 py-4 bg-[#ff00cc] text-white font-bold uppercase tracking-wider rounded-lg box-glow-magenta hover:scale-105 transition-transform duration-200"
        >
          Secure Your Spot
        </button>
        <a
          href="#details"
          className="px-8 py-4 border border-[#00ffea] text-[#00ffea] font-bold uppercase tracking-wider rounded-lg hover:bg-[#00ffea]/10 transition-colors duration-200 text-center"
        >
          Event Details ↓
        </a>
      </div>
    </section>
  )
}
