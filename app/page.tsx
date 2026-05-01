import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { AvailableUnits } from "@/components/available-units"
import { PropertyRules } from "@/components/property-rules"
import { ScreeningProcess } from "@/components/screening-process"
import { FAQ } from "@/components/faq"
import { AreaInfo } from "@/components/area-info"
import { ContactForm } from "@/components/contact-form"
import { Footer } from "@/components/footer"
import { InstallPrompt } from "@/components/install-prompt"

export default function HomePage() {
  return (
    <main className="min-h-[100svh] bg-background overflow-x-hidden">
      <Header />
      <Hero />
      <AvailableUnits />
      <PropertyRules />
      <ScreeningProcess />
      <FAQ />
      <AreaInfo />
      <ContactForm />
      <Footer />
      <InstallPrompt />
    </main>
  )
}
