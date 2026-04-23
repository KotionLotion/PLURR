export default function ScarcityBar() {
  return (
    <div className="w-full bg-[#0a0a0f] border-y border-white/10 py-4">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-8">
        {/* People viewing */}

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#ff002c] animate-pulse" />
          <span className="text-white/40 text-sm">|</span>
          <span className="text-white/60 text-sm">Price rises to <span className="text-[#ff0000] font-bold text-lg glow-red">$50</span> at </span><span className="text-[#b8ff00] font-bold text-lg glow-lime">Entrance</span>
          <span className="text-white/40 text-sm">|</span>
          <span className="w-2 h-2 rounded-full bg-[#ff002c] animate-pulse" />

        </div>
      </div>
    </div>
  )
}
