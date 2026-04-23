"use client"

import { Check } from "lucide-react"

interface TicketCardProps {
  onBuyTicket: () => void
}

const features = [
  "General Admission — July 24 · 6PM",
  "Unlimited drinks (till supplies last)",
  "Access until 6AM July 25",
  "WhatsApp ticket confirmation",
  "PLURR vibes all night",
]

export default function TicketCard({ onBuyTicket }: TicketCardProps) {
  return (
    <section className="py-16 px-4">
      <div className="max-w-lg mx-auto">
        <div className="relative p-8 rounded-2xl border border-[#ff00cc]/30 bg-gradient-to-b from-white/[0.03] to-transparent backdrop-blur-sm box-glow-magenta">
          {/* Header */}
          <div className="text-center mb-6">
            <span className="text-white/50 font-mono text-xs uppercase tracking-[0.2em]">
              — Tickets —
            </span>
            <h3 className="font-bebas text-4xl md:text-5xl text-white mt-2">
              GET IN <span className="text-[#b8ff00] glow-lime italic">NOW</span>
            </h3>
          </div>

          {/* Description */}
          <p className="text-white/60 text-sm text-center mb-6">
            Pay via local bank transfer. Receive your ticket confirmation instantly on WhatsApp.
          </p>

          {/* Price */}
          <div className="text-center mb-6">
            <div className="flex items-baseline justify-center gap-3">
              <span className="font-bebas text-6xl text-[#b8ff00] glow-lime">$35</span>
              <span className="font-bebas text-3xl text-white/30 line-through">$50</span>
            </div>
            <p className="text-[#ff00cc] font-mono text-xs uppercase tracking-wider mt-2">
              BZD · Early Bird
            </p>
          </div>

          {/* Features */}
          <ul className="space-y-3 mb-8">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3 text-white/70 text-sm">
                <Check className="w-4 h-4 text-[#b8ff00] flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <button
            onClick={onBuyTicket}
            className="w-full py-4 bg-[#ff00cc] text-white font-bold uppercase tracking-wider rounded-lg box-glow-magenta hover:scale-[1.02] transition-transform duration-200"
          >
            Buy Ticket — $35 BZD
          </button>

          {/* Footer note */}
        </div>
      </div>
    </section>
  )
}
