"use client"

import { useState, useEffect } from "react"
import HeroSection from "@/components/hero-section"
import ScarcityBar from "@/components/scarcity-bar"
import CountdownSection from "@/components/countdown-section"
import PlurrGrid from "@/components/plurr-grid"
import InfoCards from "@/components/info-cards"
import TicketCard from "@/components/ticket-card"
import TicketModal from "@/components/ticket-modal"
import Footer from "@/components/footer"
import ParticleBackground from "@/components/particle-background"
import IntroAnimation from "@/components/intro-animation"

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showIntro, setShowIntro] = useState(true)
  const [contentVisible, setContentVisible] = useState(false)

  useEffect(() => {
    // Prevent scroll during intro
    if (showIntro) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [showIntro])

  const handleIntroComplete = () => {
    setShowIntro(false)
    setContentVisible(true)
  }

  return (
    <main className="min-h-screen bg-[#050508] relative overflow-hidden">
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
      
      <div className={`transition-opacity duration-1000 ${contentVisible ? "opacity-100" : "opacity-0"}`}>
        <ParticleBackground startAudio={contentVisible} />
        
        <div className="relative z-10">
          <HeroSection onGetTickets={() => setIsModalOpen(true)} />
          <ScarcityBar />
          <CountdownSection />
          <PlurrGrid />
          <InfoCards />
          <TicketCard onBuyTicket={() => setIsModalOpen(true)} />
          <Footer />
        </div>
      </div>

      <TicketModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  )
}
