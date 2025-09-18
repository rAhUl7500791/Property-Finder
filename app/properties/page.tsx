import { Navigation } from "@/components/navigation"
import { PropertyListings } from "@/components/property-listings"
import { PropertySearch } from "@/components/property-search"
import { Footer } from "@/components/footer"

export default function PropertiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-16">
        {/* Page Header */}
        <section className="bg-primary/5 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-primary mb-4">Find Your Dream Property</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Browse through our extensive collection of premium properties. From luxury homes to cozy apartments,
                find the perfect place to call home.
              </p>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4">
            <PropertySearch />
          </div>
        </section>

        {/* Properties Listings */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <PropertyListings />
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}
