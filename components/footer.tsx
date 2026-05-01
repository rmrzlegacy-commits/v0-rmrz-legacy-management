"use client"

import Image from "next/image"

export function Footer() {
  return (
    <footer className="px-6 py-8 bg-card border-t border-border/30 text-center">
      <Image
        src="/images/logo.jpeg"
        alt="RMRZ Legacy Management"
        width={64}
        height={64}
        className="w-16 h-16 mx-auto object-contain mb-3"
      />
      
      <p className="text-xs text-muted-foreground mb-4">
        RMRZ Legacy Management
      </p>

      <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground mb-4">
        <a href="#" className="hover:text-primary">Privacy</a>
        <span className="text-border">|</span>
        <a href="#" className="hover:text-primary">Fair Housing</a>
        <span className="text-border">|</span>
        <a href="#" className="hover:text-primary">Terms</a>
      </div>

      <p className="text-[10px] text-muted-foreground/60">
        &copy; {new Date().getFullYear()} RMRZ Legacy Management
      </p>
    </footer>
  )
}
