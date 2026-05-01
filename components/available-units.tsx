"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bed, Bath, Square, ChevronLeft, ChevronRight, X, Users } from "lucide-react"

const apartmentImages = [
  { src: "/images/apartment/exterior.jpeg", alt: "Private Entryway" },
  { src: "/images/apartment/living1.jpeg", alt: "Living Area" },
  { src: "/images/apartment/living2.jpeg", alt: "Sectional Sofa" },
  { src: "/images/apartment/master.jpeg", alt: "Master Bedroom" },
  { src: "/images/apartment/bedroom.jpeg", alt: "Bedroom" },
  { src: "/images/apartment/kitchen1.jpeg", alt: "Kitchen & Dining" },
  { src: "/images/apartment/kitchen2.jpeg", alt: "Kitchenette" },
  { src: "/images/apartment/bathroom.jpeg", alt: "Bathroom" },
  { src: "/images/apartment/shower.jpeg", alt: "Shower" },
  { src: "/images/apartment/laundry.jpeg", alt: "Washer & Dryer" },
  { src: "/images/apartment/closet.jpeg", alt: "Closet" },
]

const casitaImages = [
  { src: "/images/casita/exterior.jpeg", alt: "Casita Exterior" },
  { src: "/images/casita/bedroom.jpeg", alt: "Queen Bed" },
  { src: "/images/casita/kitchen.jpeg", alt: "Kitchenette" },
  { src: "/images/casita/dining.jpeg", alt: "Dining Area" },
  { src: "/images/casita/bathroom.jpeg", alt: "Bathroom" },
  { src: "/images/casita/shower.jpeg", alt: "Walk-in Shower" },
]

const units = [
  {
    name: "Furnished Apartment",
    sqft: 480,
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 3,
    rent: 2100,
    deposit: 350,
    images: apartmentImages,
    amenities: ["WiFi", "Washer/Dryer", "Full Kitchen", "Private Entry"],
    description: "A newly renovated 1-bedroom, 1-bath suite with living room and kitchen designed for comfort and convenience. Perfect for solo travelers, couples, or small groups. The unit is attached to a main home, thoughtfully walled off for privacy. Professionally maintained and regularly treated for pests.",
  },
  {
    name: "Casita Studio",
    sqft: 170,
    bedrooms: 0,
    bathrooms: 1,
    maxGuests: 2,
    rent: 1300,
    deposit: 200,
    images: casitaImages,
    amenities: ["WiFi", "Kitchenette", "Private Entry", "Walk-in Shower"],
    description: "A brand-new construction private studio designed for comfort, simplicity, and an easy stay. Ideal for solo travelers or couples visiting Las Vegas for work, a short getaway, or a peaceful reset away from the Strip. Everything is new, clean, and intentionally set up for a stress-free stay.",
  },
]

function ImageSlideshow({ images }: { images: typeof casitaImages }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length)
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX)
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return
    const diff = touchStart - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) diff > 0 ? nextImage() : prevImage()
    setTouchStart(null)
  }

  if (images.length === 0) return null

  return (
    <>
      {/* Main Image */}
      <div 
        className="relative aspect-[4/3] bg-secondary/30 rounded-lg overflow-hidden mb-3"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
          onClick={() => setIsExpanded(true)}
        />
        
        {/* Navigation Arrows */}
        <button
          onClick={prevImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/50 rounded-full text-white"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/50 rounded-full text-white"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Counter */}
        <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 rounded text-white text-xs">
          {currentIndex + 1}/{images.length}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-1.5 mb-4">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${i === currentIndex ? "bg-primary" : "bg-muted-foreground/30"}`}
          />
        ))}
      </div>

      {/* Lightbox */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-50 bg-black flex items-center justify-center animate-in fade-in duration-200"
          onClick={() => setIsExpanded(false)}
        >
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/10 rounded-full text-white z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div 
              className="w-full h-full flex items-center justify-center p-4"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Lightbox Navigation */}
            <button
              onClick={(e) => { e.stopPropagation(); prevImage() }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/10 rounded-full text-white"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage() }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/10 rounded-full text-white"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Caption */}
            <div className="absolute bottom-6 left-0 right-0 text-center text-white">
              <p className="text-sm font-medium">{images[currentIndex].alt}</p>
              <p className="text-xs text-white/60 mt-1">{currentIndex + 1} of {images.length}</p>
            </div>
          </div>
        )}
    </>
  )
}

export function AvailableUnits() {
  return (
    <section id="units" className="px-6 py-12 bg-background">
      <h2 className="font-serif text-xl font-bold text-foreground text-center mb-2">
        Available Units
      </h2>
      <p className="text-sm text-muted-foreground text-center mb-8 max-w-sm mx-auto">
        Clean, well-equipped spaces that feel warm, functional, and easy.
      </p>

      <div className="flex flex-col gap-6 max-w-md mx-auto">
        {units.map((unit) => (
          <div key={unit.name}>
            <Card className="bg-card border-border/50 overflow-hidden">
              <CardContent className="p-4">
                <ImageSlideshow images={unit.images} />

                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-serif text-lg font-semibold text-foreground">
                    {unit.name}
                  </h3>
                  <Badge variant="outline" className="border-green-500/50 text-green-500 bg-green-500/10 text-xs">
                    Available
                  </Badge>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                  {unit.description}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-3 text-muted-foreground text-sm mb-3">
                  <div className="flex items-center gap-1">
                    <Square className="w-4 h-4 text-primary" />
                    <span>{unit.sqft} sqft</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bed className="w-4 h-4 text-primary" />
                    <span>{unit.bedrooms === 0 ? "Studio" : `${unit.bedrooms} Bed`}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="w-4 h-4 text-primary" />
                    <span>{unit.bathrooms} Bath</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-primary" />
                    <span>{unit.maxGuests} max</span>
                  </div>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {unit.amenities.map((amenity) => (
                    <span key={amenity} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      {amenity}
                    </span>
                  ))}
                </div>

                {/* Price */}
                <div className="border-t border-border/50 pt-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-muted-foreground">Monthly</span>
                    <span className="font-serif text-2xl font-bold text-primary">
                      ${unit.rent.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                    <span>${unit.deposit} deposit</span>
                    <span>Utilities included</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Multiple Units Note */}
      <p className="text-xs text-muted-foreground text-center mt-6 max-w-sm mx-auto">
        Traveling with friends or family and need multiple units? Message us to coordinate availability.
      </p>
    </section>
  )
}
