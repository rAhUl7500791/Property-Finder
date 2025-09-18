import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { PropertySearch } from "@/components/property-search"
import { PropertyListings } from "@/components/property-listings"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <PropertySearch />
      <PropertyListings />
      <Footer />
    </div>
  )
}
