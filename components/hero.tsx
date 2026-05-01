import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export function Hero() {
  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center px-6">
      <div className="relative z-10 w-full max-w-md mx-auto text-center animate-in fade-in duration-500">
        {/* Logo */}
        <div className="mb-6">
          <Image
            src="/images/logo.jpeg"
            alt="RMRZ Legacy Management"
            width={320}
            height={320}
            priority
            loading="eager"
            fetchPriority="high"
            className="w-56 h-56 md:w-72 md:h-72 mx-auto object-contain"
          />
        </div>

        {/* Badge */}
        <Badge 
          variant="outline" 
          className="mb-4 border-primary/50 text-primary bg-primary/10 px-4 py-1.5 text-sm"
        >
          Available Now
        </Badge>

        {/* Headline */}
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3 text-balance">
          Skip the Vegas Hotels
        </h1>

        {/* Subheadline */}
        <p className="text-base text-muted-foreground mb-4 leading-relaxed text-pretty">
          Avoid the Strip, resort fees, noise, and crowds. Enjoy a newly renovated private suite with in-unit laundry, Wi-Fi, and space to truly unwind.
        </p>

        {/* Location */}
        <div className="mb-6">
          <p className="text-lg text-primary font-medium">
            10-15 min from the Strip
          </p>
          <p className="text-sm text-muted-foreground">
            Summerlin - Lone Mountain Area
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-3">
          <Button
            asChild
            size="lg"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base font-medium"
          >
            <a href="#units">View Units</a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full border-border text-foreground hover:bg-card h-12 text-base font-medium"
          >
            <a href="#contact">Start Screening</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
