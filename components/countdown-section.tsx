"use client"

import { useState, useEffect } from "react"

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState({
    weeks: 0,
    days: 0,
    hours: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Event date: July 24, 2026 at 6PM Belize Time (CST/UTC-6)
      const eventDate = new Date("2026-07-24T18:00:00-06:00")
      const now = new Date()
      const difference = eventDate.getTime() - now.getTime()

      if (difference > 0) {
        const totalHours = Math.floor(difference / (1000 * 60 * 60))
        const weeks = Math.floor(totalHours / (24 * 7))
        const days = Math.floor((totalHours % (24 * 7)) / 24)
        const hours = totalHours % 24

        setTimeLeft({ weeks, days, hours })
      } else {
        setTimeLeft({ weeks: 0, days: 0, hours: 0 })
      }
    }

    calculateTimeLeft()
    const interval = setInterval(calculateTimeLeft, 1000 * 60) // Update every minute

    return () => clearInterval(interval)
  }, [])

  const TimeBlock = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="text-[#00ffea] font-bebas text-6xl sm:text-7xl md:text-8xl lg:text-9xl glow-cyan tabular-nums">
          {value.toString().padStart(2, "0")}
        </div>
        {/* Reflection effect */}
        <div 
          className="absolute -bottom-2 left-0 right-0 text-[#00ffea] font-bebas text-6xl sm:text-7xl md:text-8xl lg:text-9xl opacity-20 blur-[2px]"
          style={{ transform: "scaleY(-0.3)" }}
        >
          {value.toString().padStart(2, "0")}
        </div>
      </div>
      <span className="text-white/50 font-mono text-xs sm:text-sm uppercase tracking-[0.2em] mt-4">
        {label}
      </span>
    </div>
  )

  const Separator = () => (
    <div className="flex flex-col items-center justify-center px-2 sm:px-6 md:px-8">
      <span className="text-[#00ffea] font-bebas text-5xl sm:text-6xl md:text-7xl lg:text-8xl glow-cyan opacity-70">
        :
      </span>
    </div>
  )

  return (
    <section className="py-16 sm:py-20 px-4" id="details">
      <div className="max-w-5xl mx-auto text-center">
        {/* Title */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className="h-px w-8 sm:w-16 bg-gradient-to-r from-transparent to-white/30" />
          <h2 className="text-white/60 font-mono text-xs sm:text-sm uppercase tracking-[0.25em]">
            Countdown to July 24
          </h2>
          <span className="h-px w-8 sm:w-16 bg-gradient-to-l from-transparent to-white/30" />
        </div>

        {/* Countdown */}
        <div className="flex items-start justify-center">
          <TimeBlock value={timeLeft.weeks} label="Weeks" />
          <Separator />
          <TimeBlock value={timeLeft.days} label="Days" />
          <Separator />
          <TimeBlock value={timeLeft.hours} label="Hours" />
        </div>

        {/* Urgency text */}
        <p className="mt-12 text-[#ff6600] font-mono text-sm glow-orange flex items-center justify-center gap-2">
          <span className="inline-block animate-pulse">Selling fast — don&apos;t sleep on this one</span>
        </p>

        {/* Location */}
        <div className="mt-10 pt-10 border-t border-white/10">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="h-px w-8 sm:w-16 bg-gradient-to-r from-transparent to-white/30" />
            <h3 className="text-white/60 font-mono text-xs sm:text-sm uppercase tracking-[0.25em]">
              Location
            </h3>
            <span className="h-px w-8 sm:w-16 bg-gradient-to-l from-transparent to-white/30" />
          </div>
          
          <div className="space-y-4">
            <h4 className="text-[#00ffea] font-bebas text-3xl sm:text-4xl glow-cyan">
              Temple Hill
            </h4>
            <p className="text-white/70 font-mono text-sm">
              3VH8+J3G, Hills of Promise, Benque Viejo del Carmen
            </p>
            
            {/* Google Maps Embed */}
            <div className="mt-6 rounded-lg overflow-hidden border border-white/10 box-glow-cyan max-w-2xl mx-auto">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d328.3751050079883!2d-89.13480802747914!3d17.079064476441324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sbz!4v1776958114099!5m2!1sen!2sbz" 
                width="100%" 
                height="300" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
                title="Temple Hill Location"
              />
            </div>

            <a 
              href="https://www.google.com/maps?q=17.079091,-89.134778" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#b8ff00] font-mono text-xs hover:underline glow-lime mt-4"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Open in Google Maps</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
