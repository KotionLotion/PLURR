"use client"

import { useEffect, useRef } from "react"

interface ParticleBackgroundProps {
  startAudio?: boolean
}

export default function ParticleBackground({ startAudio = false }: ParticleBackgroundProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioStartedRef = useRef(false)

  // Handle audio, triggered by startAudio prop
  useEffect(() => {
    if (!startAudio || audioStartedRef.current) return

    // Create audio element - iOS Safari requires user interaction
    // The user already clicked "ENTER" so we should be able to play
    const audio = new Audio("/audio/ambient-ocean.mp3")
    audio.loop = true
    audio.volume = 0.35
    audio.preload = "auto"
    // iOS Safari hint
    audio.setAttribute("playsinline", "true")
    audioRef.current = audio

    const playAudio = () => {
      audio.play().then(() => {
        audioStartedRef.current = true
      }).catch(() => {
        // Autoplay blocked - silently fail, audio is not critical
      })
    }

    // Small delay to ensure DOM is ready
    const timer = setTimeout(playAudio, 500)

    return () => {
      clearTimeout(timer)
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [startAudio])

  // Generate 40 particles with depth layers (small, blurred = far away; larger, sharper = closer)
  const particles = Array.from({ length: 40 }, (_, i) => {
    const hues = [180, 300, 80, 60, 30] // cyan, magenta, lime, yellow, orange
    const hue = hues[i % hues.length]
    
    // 3 depth layers: far (0-15), mid (15-30), close (30-40)
    const depthLayer = i < 15 ? 0 : i < 30 ? 1 : 2
    
    // Far particles: tiny, very blurred, faint
    // Mid particles: small, somewhat blurred
    // Close particles: slightly larger, subtle blur
    const size = depthLayer === 0 ? 2 + (i % 3) : depthLayer === 1 ? 3 + (i % 3) : 4 + (i % 3)
    const blur = depthLayer === 0 ? 4 + (i % 3) : depthLayer === 1 ? 2 + (i % 2) : 1
    const opacity = depthLayer === 0 ? 0.3 : depthLayer === 1 ? 0.5 : 0.7
    
    const left = (i * 2.5 + (i % 7) * 5) % 100
    const duration = depthLayer === 0 ? 25 + (i % 10) * 3 : depthLayer === 1 ? 20 + (i % 8) * 3 : 15 + (i % 6) * 3
    const delay = (i % 12) * 1.2
    const swayDuration = 4 + (i % 5)
    
    return { id: i, hue, size, left, duration, delay, swayDuration, blur, opacity, depthLayer }
  })

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Bottom neon glow - primary cyan/magenta gradient */}
      <div 
        className="absolute inset-x-0 bottom-0 h-[60vh]"
        style={{
          background: `
            radial-gradient(ellipse 120% 50% at 50% 100%, rgba(0, 255, 234, 0.15) 0%, transparent 60%),
            radial-gradient(ellipse 80% 40% at 30% 100%, rgba(255, 0, 204, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse 80% 40% at 70% 100%, rgba(184, 255, 0, 0.08) 0%, transparent 50%)
          `,
        }}
      />
      
      {/* Secondary glow layer for depth */}
      <div 
        className="absolute inset-x-0 bottom-0 h-[40vh]"
        style={{
          background: `
            radial-gradient(ellipse 100% 60% at 50% 100%, rgba(0, 255, 234, 0.08) 0%, transparent 70%)
          `,
        }}
      />

      {/* Animated glow pulse */}
      <div 
        className="absolute inset-x-0 bottom-0 h-[50vh]"
        style={{
          background: `
            radial-gradient(ellipse 90% 45% at 50% 100%, rgba(255, 0, 204, 0.06) 0%, transparent 60%)
          `,
          animation: "pulse-glow 4s ease-in-out infinite",
        }}
      />

      {/* Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            bottom: "-20px",
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: `hsla(${p.hue}, 100%, 70%, ${p.opacity})`,
            boxShadow: `
              0 0 ${p.size * 2}px hsla(${p.hue}, 100%, 60%, ${p.opacity * 0.6}),
              0 0 ${p.size * 4}px hsla(${p.hue}, 100%, 50%, ${p.opacity * 0.3})
            `,
            filter: `blur(${p.blur}px)`,
            animation: `rise ${p.duration}s linear infinite, sway-${p.id % 5} ${p.swayDuration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes rise {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-120vh);
            opacity: 0;
          }
        }

        @keyframes sway-0 {
          0%, 100% { margin-left: 0; }
          50% { margin-left: 25px; }
        }
        @keyframes sway-1 {
          0%, 100% { margin-left: 0; }
          50% { margin-left: -30px; }
        }
        @keyframes sway-2 {
          0%, 100% { margin-left: 0; }
          50% { margin-left: 40px; }
        }
        @keyframes sway-3 {
          0%, 100% { margin-left: 0; }
          50% { margin-left: -20px; }
        }
        @keyframes sway-4 {
          0%, 100% { margin-left: 0; }
          50% { margin-left: 35px; }
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
