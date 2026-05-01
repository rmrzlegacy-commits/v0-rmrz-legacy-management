"use client"

import { useState, useEffect } from "react"
import { X, Share, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    const standalone = window.matchMedia("(display-mode: standalone)").matches
    setIsStandalone(standalone)

    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent)
    setIsIOS(ios)

    const dismissed = localStorage.getItem("pwa-prompt-dismissed")
    if (dismissed) {
      const dismissedTime = parseInt(dismissed, 10)
      if (Date.now() - dismissedTime < 7 * 24 * 60 * 60 * 1000) return
    }

    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setTimeout(() => setShowPrompt(true), 3000)
    }

    window.addEventListener("beforeinstallprompt", handler)

    if (ios && !standalone) {
      setTimeout(() => setShowPrompt(true), 3000)
    }

    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === "accepted") setShowPrompt(false)
      setDeferredPrompt(null)
    }
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    localStorage.setItem("pwa-prompt-dismissed", Date.now().toString())
  }

  if (isStandalone || !showPrompt) return null

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm animate-in slide-in-from-bottom duration-300">
      <div className="bg-card border border-border rounded-2xl p-4 shadow-2xl">
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 p-1 text-muted-foreground hover:text-foreground"
          aria-label="Dismiss"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.jpeg" alt="RMRZ" className="w-12 h-12 rounded-xl" />
          <div className="flex-1 pr-6">
            <h3 className="font-semibold text-foreground text-base">Add to Home Screen</h3>
            <p className="text-sm text-muted-foreground mt-0.5">Install for faster access</p>
          </div>
        </div>

        {isIOS ? (
          <div className="mt-4 p-3 bg-secondary/50 rounded-xl">
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <span>Tap</span>
              <Share className="w-4 h-4 text-primary" />
              <span>then</span>
              <span className="inline-flex items-center gap-1 text-foreground font-medium">
                <Plus className="w-4 h-4" /> Add to Home Screen
              </span>
            </p>
          </div>
        ) : (
          <div className="mt-4 flex gap-2">
            <Button variant="outline" onClick={handleDismiss} className="flex-1 min-h-[44px]">
              Not Now
            </Button>
            <Button onClick={handleInstall} className="flex-1 min-h-[44px] bg-primary text-primary-foreground">
              Install
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
