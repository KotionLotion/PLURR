"use client"

import { Calendar, Clock, DollarSign, Wine, MapPin } from "lucide-react"

const infoItems = [
  {
    icon: Calendar,
    label: "Date",
    value: "July 24",
    description: "Friday Night into Saturday Morning",
    color: "#00ffea",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "6PM — 6AM",
    description: "12 hours straight — pace yourself",
    color: "#ff00cc",
  },
  {
    icon: DollarSign,
    label: "Entry",
    value: "BZD $35",
    description: "All-inclusive entry. Price goes up soon.",
    color: "#b8ff00",
  },
  {
    icon: Wine,
    label: "Drinks",
    value: "Unlimited",
    description: "Till supplies last. Don't wait.",
    color: "#ffff00",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Temple Hill",
    description: "Hills of Promise, Benque Viejo del Carmen",
    color: "#ff6600",
    link: "https://www.google.com/maps?q=17.079091,-89.134778",
  },
]

export default function InfoCards() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className="h-px w-12 bg-white/20" />
          <h2 className="text-white/50 font-mono text-sm uppercase tracking-[0.2em]">
            What You&apos;re Getting Into
          </h2>
          <span className="h-px w-12 bg-white/20" />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {infoItems.map((item, index) => {
            const CardWrapper = item.link ? "a" : "div"
            const linkProps = item.link
              ? { href: item.link, target: "_blank", rel: "noopener noreferrer" }
              : {}

            return (
              <CardWrapper
                key={index}
                {...linkProps}
                className={`p-6 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-sm flex flex-col items-center text-center hover:border-white/20 transition-all duration-300 ${item.link ? "cursor-pointer hover:scale-105" : ""}`}
              >
                <item.icon
                  className="w-8 h-8 mb-4"
                  style={{ color: item.color }}
                />
                <span className="text-white/50 font-mono text-xs uppercase tracking-wider mb-2">
                  {item.label}
                </span>
                <span
                  className="font-bebas text-2xl md:text-3xl mb-2"
                  style={{ color: item.color }}
                >
                  {item.value}
                </span>
                <span className="text-white/40 text-xs leading-relaxed">
                  {item.description}
                </span>
                {item.link && (
                  <span className="text-white/30 text-xs mt-2 underline">
                    View on Maps
                  </span>
                )}
              </CardWrapper>
            )
          })}
        </div>
      </div>
    </section>
  )
}
