"use client"

export default function Footer() {
  return (
    <footer className="py-8 px-4 border-t border-white/5">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="font-bebas text-3xl">
          <span className="text-[#00ffea] glow-cyan">PL</span>
          <span className="text-[#ff00cc] glow-magenta">URR</span>
        </div>

        {/* Info */}
        <div className="text-center md:text-right">
          <p className="text-white/50 text-sm font-mono">
            July 10/11 · Benque Viejo del Carmen· 6PM-6AM
          </p>
          <p className="text-white/30 text-xs mt-1">
            Peace · Love · Unity · Respect · Responsibility
          </p>
        </div>
      </div>
    </footer>
  )
}
