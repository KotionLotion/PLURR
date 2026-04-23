"use client"

import { useState, useEffect, useRef, useCallback } from "react"

interface IntroAnimationProps {
  onComplete: () => void
}

// Audio-synced timeline:
// 0.304s - 1.39s: First glitch (intense)
// 1.39s - 1.87s: Pause - show PLURR settling
// 1.87s - 2.4s: Second glitch
// 2.4s - 2.71s: Pause
// 2.71s - 3.8s: Light glitch
// 3.8s - 5.0s: No sound - animation complete, display final PLURR

type Phase = 
  | "idle" 
  | "glitch1" 
  | "pause1" 
  | "glitch2" 
  | "pause2" 
  | "glitch3" 
  | "final"

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [audioLoaded, setAudioLoaded] = useState(false)
  const [started, setStarted] = useState(false)
  const [phase, setPhase] = useState<Phase>("idle")
  const [isVisible, setIsVisible] = useState(true)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Preload audio on mount - with iOS Safari fallback
  useEffect(() => {
    const audio = new Audio("/audio/glitch-sound.mp3")
    audio.preload = "auto"
    
    const handleCanPlayThrough = () => {
      setAudioLoaded(true)
    }

    const handleError = () => {
      // Audio failed to load, proceed without sound
      setAudioLoaded(true)
    }

    // iOS Safari often doesn't fire canplaythrough reliably
    // Set a timeout fallback to ensure the button appears
    const fallbackTimer = setTimeout(() => {
      setAudioLoaded(true)
    }, 2000)

    audio.addEventListener("canplaythrough", handleCanPlayThrough)
    audio.addEventListener("error", handleError)
    
    audioRef.current = audio

    return () => {
      clearTimeout(fallbackTimer)
      audio.removeEventListener("canplaythrough", handleCanPlayThrough)
      audio.removeEventListener("error", handleError)
      audio.pause()
    }
  }, [])

  const handleComplete = useCallback(() => {
    setIsVisible(false)
    onComplete()
  }, [onComplete])

  // Animation phases synced to audio timestamps
  useEffect(() => {
    if (!started) return

    // Play audio
    if (audioRef.current) {
      audioRef.current.volume = 0.7
      audioRef.current.play().catch(() => {})
    }

    // Timeline synced to audio:
    const timers = [
      setTimeout(() => setPhase("glitch1"), 304),   // 0.304s - First glitch starts
      setTimeout(() => setPhase("pause1"), 1390),   // 1.39s - First pause, PLURR settles
      setTimeout(() => setPhase("glitch2"), 1870),  // 1.87s - Second glitch
      setTimeout(() => setPhase("pause2"), 2400),   // 2.4s - Second pause
      setTimeout(() => setPhase("glitch3"), 2710),  // 2.71s - Light glitch
      setTimeout(() => setPhase("final"), 3800),    // 3.8s - Final settle
      setTimeout(() => handleComplete(), 5000),     // 5.0s - Complete
    ]

    return () => timers.forEach(clearTimeout)
  }, [started, handleComplete])

  const handleStart = () => {
    if (audioLoaded) {
      setStarted(true)
    }
  }

  if (!isVisible) return null

  // Click to enter screen
  if (!started) {
    return (
      <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-[#ff00cc]/5 via-transparent to-transparent animate-pulse-slow" />
        
        <div className="relative z-10 text-center">
          {!audioLoaded ? (
            <>
              <div className="w-12 h-12 border-2 border-[#00ffea] border-t-transparent rounded-full animate-spin mx-auto mb-6" />
              <p className="text-white/60 font-mono text-sm uppercase tracking-widest">
                Loading Experience...
              </p>
            </>
          ) : (
            <button
              onClick={handleStart}
              className="group relative cursor-pointer bg-transparent border-none"
            >
              <div className="absolute inset-0 -m-8 rounded-full bg-[#00ffea]/20 blur-xl animate-pulse-slow" />
              
              <div className="relative px-12 py-6 border-2 border-[#00ffea] rounded-lg overflow-hidden transition-all duration-300 group-hover:border-[#ff00cc] group-hover:shadow-[0_0_30px_rgba(255,0,204,0.5)]">
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                
                <span className="relative font-bebas text-4xl sm:text-5xl tracking-wider text-[#00ffea] group-hover:text-[#ff00cc] transition-colors duration-300">
                  ENTER
                </span>
              </div>
              
              <p className="mt-6 text-white/40 font-mono text-xs uppercase tracking-widest">
                Click to begin
              </p>
            </button>
          )}
        </div>

        <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-[#00ffea]/30" />
        <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-[#ff00cc]/30" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-[#ff00cc]/30" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-[#00ffea]/30" />

        <style jsx>{`
          @keyframes pulse-slow {
            0%, 100% { opacity: 0.5; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.05); }
          }
          .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        `}</style>
      </div>
    )
  }

  const isGlitching = phase === "glitch1" || phase === "glitch2" || phase === "glitch3"
  const isIntenseGlitch = phase === "glitch1" || phase === "glitch2"
  const isLightGlitch = phase === "glitch3"
  const showSettledText = phase === "pause1" || phase === "pause2" || phase === "final"

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden transition-opacity duration-700 ${
        phase === "final" ? "opacity-0" : "opacity-100"
      }`}
      style={{
        transitionDelay: phase === "final" ? "800ms" : "0ms",
      }}
    >
      {/* Scanlines overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, 0.3) 2px,
            rgba(0, 0, 0, 0.3) 4px
          )`,
          opacity: phase === "final" ? 0 : 1,
          transition: "opacity 0.5s ease-out",
        }}
      />

      {/* CRT vignette */}
      <div 
        className="absolute inset-0 pointer-events-none z-25"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, transparent 60%, rgba(0,0,0,0.5) 100%)",
          opacity: phase === "final" ? 0 : 1,
          transition: "opacity 0.8s ease-out",
        }}
      />

      {/* Noise overlay during glitches */}
      <div 
        className={`absolute inset-0 pointer-events-none z-10 mix-blend-overlay transition-opacity duration-100 ${
          isGlitching ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          animation: isGlitching ? "noise 0.1s infinite" : "none",
        }}
      />

      {/* Horizontal glitch bars - intense during glitch1/glitch2, fewer during glitch3 */}
      {isGlitching && (
        <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
          {[...Array(isLightGlitch ? 8 : 25)].map((_, i) => (
            <div
              key={i}
              className="absolute w-full"
              style={{
                height: `${isLightGlitch ? 1 + Math.random() * 2 : 2 + Math.random() * 8}px`,
                top: `${Math.random() * 100}%`,
                backgroundColor: isLightGlitch ? "rgba(0,255,234,0.3)" : "black",
                animation: `glitch-bar ${0.05 + Math.random() * 0.1}s infinite`,
                animationDelay: `${Math.random() * 0.2}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Color flash overlays - only during intense glitches */}
      {isIntenseGlitch && (
        <>
          <div 
            className="absolute inset-0 z-40 mix-blend-screen"
            style={{
              backgroundColor: "#ff0000",
              animation: "flash-red 0.06s infinite",
            }}
          />
          <div 
            className="absolute inset-0 z-40 mix-blend-screen"
            style={{
              backgroundColor: "#0000ff",
              animation: "flash-blue 0.08s infinite",
            }}
          />
        </>
      )}

      {/* Light cyan flash during glitch3 */}
      {isLightGlitch && (
        <div 
          className="absolute inset-0 z-40 mix-blend-screen"
          style={{
            backgroundColor: "#00ffea",
            animation: "flash-light 0.15s infinite",
          }}
        />
      )}

      {/* Main PLURR text container */}
      <div 
        className={`relative ${isIntenseGlitch ? "animate-shake-violent" : isLightGlitch ? "animate-shake-light" : ""}`}
        style={{
          transform: phase === "final" ? "scale(1.05)" : "scale(1)",
          transition: phase === "final" ? "transform 0.8s ease-out" : "none",
        }}
      >
        {/* Red channel - RGB split */}
        <h1 
          className="absolute top-0 left-0 font-bebas text-[5rem] sm:text-[8rem] md:text-[12rem] lg:text-[16rem] tracking-wider select-none"
          style={{
            color: "#ff0000",
            opacity: isGlitching ? 0.8 : 0,
            transform: isIntenseGlitch 
              ? `translateX(${-15 - Math.random() * 15}px) translateY(${-3 + Math.random() * 6}px) skewX(${-3 + Math.random() * 6}deg)` 
              : isLightGlitch
              ? `translateX(${-5 - Math.random() * 5}px)`
              : "translateX(-4px)",
            mixBlendMode: "screen",
            filter: isIntenseGlitch ? "blur(2px)" : "blur(1px)",
            transition: showSettledText ? "all 0.3s ease-out" : "none",
          }}
        >
          PLURR
        </h1>

        {/* Blue channel - RGB split */}
        <h1 
          className="absolute top-0 left-0 font-bebas text-[5rem] sm:text-[8rem] md:text-[12rem] lg:text-[16rem] tracking-wider select-none"
          style={{
            color: "#0000ff",
            opacity: isGlitching ? 0.8 : 0,
            transform: isIntenseGlitch 
              ? `translateX(${15 + Math.random() * 15}px) translateY(${3 - Math.random() * 6}px) skewX(${3 - Math.random() * 6}deg)` 
              : isLightGlitch
              ? `translateX(${5 + Math.random() * 5}px)`
              : "translateX(4px)",
            mixBlendMode: "screen",
            filter: isIntenseGlitch ? "blur(2px)" : "blur(1px)",
            transition: showSettledText ? "all 0.3s ease-out" : "none",
          }}
        >
          PLURR
        </h1>

        {/* Glitch slice copies during intense glitches */}
        {isIntenseGlitch && (
          <>
            {[...Array(6)].map((_, i) => (
              <h1 
                key={i}
                className="absolute top-0 left-0 font-bebas text-[5rem] sm:text-[8rem] md:text-[12rem] lg:text-[16rem] tracking-wider select-none"
                style={{
                  color: i % 2 === 0 ? "#ff00cc" : "#00ffea",
                  clipPath: `inset(${i * 16.67}% 0 ${100 - (i + 1) * 16.67}% 0)`,
                  transform: `translateX(${(Math.random() - 0.5) * 50}px)`,
                  mixBlendMode: "screen",
                  animation: `slice-glitch-${i % 3} 0.08s infinite`,
                  opacity: 0.9,
                }}
              >
                PLURR
              </h1>
            ))}
          </>
        )}

        {/* Main settled text - visible during pauses and final */}
        <h1 
          className="relative font-bebas text-[5rem] sm:text-[8rem] md:text-[12rem] lg:text-[16rem] tracking-wider select-none transition-opacity duration-300"
          style={{
            opacity: showSettledText ? 1 : 0,
          }}
        >
          <span 
            className="text-[#00ffea]"
            style={{
              textShadow: phase === "final"
                ? "0 0 30px #00ffea, 0 0 60px #00ffea, 0 0 100px #00ffea, 0 0 150px #00ffea"
                : showSettledText 
                ? "0 0 20px #00ffea, 0 0 40px #00ffea"
                : "none",
              transition: "text-shadow 0.5s ease-out",
            }}
          >
            PL
          </span>
          <span 
            className="text-[#ff00cc]"
            style={{
              textShadow: phase === "final"
                ? "0 0 30px #ff00cc, 0 0 60px #ff00cc, 0 0 100px #ff00cc, 0 0 150px #ff00cc"
                : showSettledText 
                ? "0 0 20px #ff00cc, 0 0 40px #ff00cc"
                : "none",
              transition: "text-shadow 0.5s ease-out",
            }}
          >
            URR
          </span>
        </h1>
      </div>

      {/* Particle burst on final settle */}
      {phase === "final" && (
        <div className="absolute inset-0 z-50 pointer-events-none overflow-hidden">
          {[...Array(60)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
                left: "50%",
                top: "50%",
                backgroundColor: i % 3 === 0 ? "#00ffea" : i % 3 === 1 ? "#ff00cc" : "#ffffff",
                boxShadow: `0 0 ${8 + Math.random() * 8}px ${i % 3 === 0 ? "#00ffea" : i % 3 === 1 ? "#ff00cc" : "#ffffff"}`,
                animation: `particle-explode ${0.6 + Math.random() * 0.6}s ease-out forwards`,
                animationDelay: `${Math.random() * 0.2}s`,
                ["--px" as string]: `${(Math.random() - 0.5) * 200}vw`,
                ["--py" as string]: `${(Math.random() - 0.5) * 200}vh`,
              }}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes noise {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -5%); }
          20% { transform: translate(5%, 5%); }
          30% { transform: translate(-5%, 5%); }
          40% { transform: translate(5%, -5%); }
          50% { transform: translate(-5%, 0); }
          60% { transform: translate(5%, 0); }
          70% { transform: translate(0, -5%); }
          80% { transform: translate(0, 5%); }
          90% { transform: translate(-2.5%, -2.5%); }
        }
        
        @keyframes glitch-bar {
          0%, 100% { transform: translateX(-100%); opacity: 0; }
          20% { transform: translateX(0%); opacity: 1; }
          80% { transform: translateX(0%); opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        
        @keyframes flash-red {
          0%, 100% { opacity: 0; }
          20% { opacity: 0.5; }
          40% { opacity: 0; }
          60% { opacity: 0.3; }
          80% { opacity: 0; }
        }
        
        @keyframes flash-blue {
          0%, 100% { opacity: 0; }
          30% { opacity: 0.4; }
          50% { opacity: 0; }
          70% { opacity: 0.45; }
        }
        
        @keyframes flash-light {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.15; }
        }
        
        @keyframes shake-violent {
          0%, 100% { transform: translateX(0) translateY(0) skewX(0); }
          10% { transform: translateX(-12px) translateY(4px) skewX(-6deg); }
          20% { transform: translateX(12px) translateY(-4px) skewX(6deg); }
          30% { transform: translateX(-10px) translateY(-6px) skewX(-4deg); }
          40% { transform: translateX(10px) translateY(6px) skewX(4deg); }
          50% { transform: translateX(-6px) translateY(2px) skewX(-2deg); }
          60% { transform: translateX(6px) translateY(-2px) skewX(2deg); }
          70% { transform: translateX(-4px) translateY(-1px) skewX(-1deg); }
          80% { transform: translateX(4px) translateY(1px) skewX(1deg); }
          90% { transform: translateX(-2px) translateY(-0.5px) skewX(-0.5deg); }
        }
        
        @keyframes shake-light {
          0%, 100% { transform: translateX(0) translateY(0); }
          25% { transform: translateX(-2px) translateY(1px); }
          50% { transform: translateX(2px) translateY(-1px); }
          75% { transform: translateX(-1px) translateY(0.5px); }
        }
        
        @keyframes slice-glitch-0 {
          0%, 100% { transform: translateX(-35px); }
          50% { transform: translateX(35px); }
        }
        
        @keyframes slice-glitch-1 {
          0%, 100% { transform: translateX(30px); }
          50% { transform: translateX(-30px); }
        }
        
        @keyframes slice-glitch-2 {
          0%, 100% { transform: translateX(-25px); }
          33% { transform: translateX(40px); }
          66% { transform: translateX(-20px); }
        }
        
        @keyframes particle-explode {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          100% { transform: translate(calc(-50% + var(--px)), calc(-50% + var(--py))) scale(0); opacity: 0; }
        }
        
        .animate-shake-violent { animation: shake-violent 0.1s infinite; }
        .animate-shake-light { animation: shake-light 0.15s infinite; }
      `}</style>
    </div>
  )
}
