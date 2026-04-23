"use client"

import { useState, useEffect } from "react"
import { X, Building2, ArrowLeft, MessageCircle, AlertTriangle } from "lucide-react"

interface TicketModalProps {
  isOpen: boolean
  onClose: () => void
}

const banks = [
  { id: "heritage", name: "Heritage Bank", fullName: "Heritage Bank Ltd" },
  { id: "atlantic", name: "Atlantic Bank", fullName: "Atlantic Bank Ltd" },
  { id: "belize", name: "Belize Bank", fullName: "Belize Bank Ltd" },
]

const ticketOptions = [
  { value: 1, label: "1 Ticket — BZD $35" },
  { value: 2, label: "2 Tickets — BZD $70" },
  { value: 3, label: "3 Tickets — BZD $105" },
  { value: 4, label: "4 Tickets — BZD $140" },
]

export default function TicketModal({ isOpen, onClose }: TicketModalProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: "",
    whatsapp: "",
    email: "",
    tickets: 1,
  })
  const [selectedBank, setSelectedBank] = useState<string | null>(null)

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setStep(1)
      setFormData({ fullName: "", whatsapp: "", email: "", tickets: 1 })
      setSelectedBank(null)
    }
  }, [isOpen])

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  const selectedBankData = banks.find((b) => b.id === selectedBank)
  const totalAmount = formData.tickets * 35

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.fullName && formData.whatsapp) {
      setStep(2)
    }
  }

  const handleBankSelect = (bankId: string) => {
    setSelectedBank(bankId)
  }

  const handleStep2Submit = () => {
    if (selectedBank) {
      setStep(3)
    }
  }

  const handleWhatsAppClick = () => {
    const message = `Hi! I just made a bank transfer for ${formData.tickets} PLURR ticket(s). Name: ${formData.fullName}`
    window.open(`https://wa.me/5016001234?text=${encodeURIComponent(message)}`, "_blank")
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-[#0a0a0f] border border-white/10 rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <h2 className="font-bebas text-3xl text-white">Your Ticket</h2>
          <p className="text-white/50 text-sm mt-1">
            Step {step} of 3 · {step === 1 ? "Your Details" : step === 2 ? "Choose Your Bank" : "Send Proof of Payment"}
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Step 1: User Details */}
          {step === 1 && (
            <form onSubmit={handleStep1Submit} className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="First & Last Name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-[#00ffea]/50 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-2">WhatsApp Number</label>
                <input
                  type="tel"
                  placeholder="+501 6XX-XXXX"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-[#00ffea]/50 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-2">Email (optional)</label>
                <input
                  type="email"
                  placeholder="you@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-[#00ffea]/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-2">Number of Tickets</label>
                <select
                  value={formData.tickets}
                  onChange={(e) => setFormData({ ...formData, tickets: Number(e.target.value) })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#00ffea]/50 transition-colors appearance-none cursor-pointer"
                >
                  {ticketOptions.map((option) => (
                    <option key={option.value} value={option.value} className="bg-[#0a0a0f]">
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#ff00cc] text-white font-bold uppercase tracking-wider rounded-lg box-glow-magenta hover:scale-[1.02] transition-transform duration-200 mt-6"
              >
                Choose Payment Method →
              </button>
            </form>
          )}

          {/* Step 2: Bank Selection */}
          {step === 2 && (
            <div className="space-y-6">
              {/* Bank Cards */}
              <div className="grid grid-cols-3 gap-3">
                {banks.map((bank) => (
                  <button
                    key={bank.id}
                    onClick={() => handleBankSelect(bank.id)}
                    className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all duration-200 ${
                      selectedBank === bank.id
                        ? "border-[#00ffea] bg-[#00ffea]/10 box-glow-cyan"
                        : "border-white/10 bg-white/[0.02] hover:border-white/20"
                    }`}
                  >
                    <Building2 className={`w-6 h-6 ${selectedBank === bank.id ? "text-[#00ffea]" : "text-white/50"}`} />
                    <span className={`text-xs text-center ${selectedBank === bank.id ? "text-[#00ffea]" : "text-white/70"}`}>
                      {bank.name}
                    </span>
                  </button>
                ))}
              </div>

              {/* Transfer Details */}
              {selectedBank && selectedBankData && (
                <div className="p-4 rounded-xl border border-[#00ffea]/30 bg-[#00ffea]/5">
                  <h4 className="text-[#00ffea] font-mono text-xs uppercase tracking-wider mb-4">
                    Transfer Details
                  </h4>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-white/50">Bank</dt>
                      <dd className="text-white">{selectedBankData.fullName}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-white/50">Account Name</dt>
                      <dd className="text-white">[YOUR NAME / BUSINESS]</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-white/50">Account #</dt>
                      <dd className="text-[#00ffea] font-mono">XXX-XXXX-XXXX</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-white/50">Branch</dt>
                      <dd className="text-white">Belize City Branch</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-white/50">Amount</dt>
                      <dd className="text-[#b8ff00] font-bold">BZD ${totalAmount}.00</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-white/50">Reference</dt>
                      <dd className="text-[#ff00cc]">PLURR RAVE + Your Name</dd>
                    </div>
                  </dl>
                </div>
              )}

              <button
                onClick={handleStep2Submit}
                disabled={!selectedBank}
                className={`w-full py-4 font-bold uppercase tracking-wider rounded-lg transition-all duration-200 ${
                  selectedBank
                    ? "bg-white text-black hover:scale-[1.02]"
                    : "bg-white/10 text-white/30 cursor-not-allowed"
                }`}
              >
                I Have Sent The Transfer →
              </button>

              <button
                onClick={() => setStep(1)}
                className="w-full flex items-center justify-center gap-2 text-white/50 hover:text-white transition-colors text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            </div>
          )}

          {/* Step 3: Send Proof */}
          {step === 3 && (
            <div className="space-y-6 text-center">
              <p className="text-white/70 text-sm leading-relaxed">
                Send a <span className="text-[#ff00cc]">screenshot of your bank transfer receipt</span> to our WhatsApp.{" "}
                <span className="text-[#00ffea] underline">Include your name</span> and number of tickets. Your ticket confirmation will be sent back within a few minutes.
              </p>

              <button
                onClick={handleWhatsAppClick}
                className="w-full py-4 bg-[#25D366] text-white font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform duration-200"
              >
                <MessageCircle className="w-5 h-5" />
                Send Proof on WhatsApp
              </button>

              <div className="p-4 rounded-xl border border-[#ffff00]/30 bg-[#ffff00]/5 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-[#ffff00] flex-shrink-0 mt-0.5" />
                <p className="text-white/60 text-xs text-left leading-relaxed">
                  Your spot is reserved for 2 hours after you send payment. Confirmation sent within 30 mins during business hours.
                </p>
              </div>

              <div className="flex items-center justify-center gap-4 pt-4">
                <button
                  onClick={onClose}
                  className="text-white/50 hover:text-white transition-colors text-sm underline"
                >
                  Done
                </button>
                <span className="text-white/20">—</span>
                <button
                  onClick={onClose}
                  className="text-white/50 hover:text-white transition-colors text-sm"
                >
                  Close
                </button>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full flex items-center justify-center gap-2 text-white/50 hover:text-white transition-colors text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
