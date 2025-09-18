"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Bed, Bath, Square, Heart, Eye } from "lucide-react"
import { useState } from "react"

interface Property {
  id: string
  title: string
  location: string
  price: number
  bedrooms: number
  bathrooms: number
  area: number
  image: string
  type: string
  featured?: boolean
}

const sampleProperties: Property[] = [
  {
    id: "1",
    title: "Modern Downtown Loft",
    location: "Downtown, New York",
    price: 850000,
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    image: "/modern-downtown-loft.png",
    type: "Apartment",
    featured: true,
  },
  {
    id: "2",
    title: "Luxury Family Villa",
    location: "Beverly Hills, CA",
    price: 2500000,
    bedrooms: 5,
    bathrooms: 4,
    area: 3500,
    image: "/placeholder-0j79q.png",
    type: "Villa",
  },
  {
    id: "3",
    title: "Cozy Suburban Home",
    location: "Austin, TX",
    price: 450000,
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    image: "/cozy-suburban-home-exterior.jpg",
    type: "House",
  },
  {
    id: "4",
    title: "Waterfront Penthouse",
    location: "Miami Beach, FL",
    price: 1800000,
    bedrooms: 3,
    bathrooms: 3,
    area: 2200,
    image: "/placeholder-nkbhk.png",
    type: "Penthouse",
    featured: true,
  },
  {
    id: "5",
    title: "Mountain View Cabin",
    location: "Aspen, CO",
    price: 750000,
    bedrooms: 4,
    bathrooms: 3,
    area: 2000,
    image: "/placeholder-rwzqw.png",
    type: "House",
  },
  {
    id: "6",
    title: "Urban Studio Apartment",
    location: "San Francisco, CA",
    price: 650000,
    bedrooms: 1,
    bathrooms: 1,
    area: 600,
    image: "/placeholder-tm9nf.png",
    type: "Apartment",
  },
]

export function PropertyListings() {
  const [favorites, setFavorites] = useState<string[]>([])

  const toggleFavorite = (propertyId: string) => {
    setFavorites((prev) => (prev.includes(propertyId) ? prev.filter((id) => id !== propertyId) : [...prev, propertyId]))
  }

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">Featured Properties</h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Explore our handpicked selection of premium properties in the most desirable locations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleProperties.map((property) => (
            <Card
              key={property.id}
              className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-card"
            >
              <div className="relative overflow-hidden">
                <img
                  src={property.image || "/placeholder.svg"}
                  alt={property.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Featured Badge */}
                {property.featured && (
                  <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">Featured</Badge>
                )}

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-8 w-8 p-0 rounded-full bg-white/90 hover:bg-white"
                    onClick={(e) => {
                      e.preventDefault()
                      toggleFavorite(property.id)
                    }}
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        favorites.includes(property.id) ? "fill-red-500 text-red-500" : "text-gray-600"
                      }`}
                    />
                  </Button>
                  <Button size="sm" variant="secondary" className="h-8 w-8 p-0 rounded-full bg-white/90 hover:bg-white">
                    <Eye className="h-4 w-4 text-gray-600" />
                  </Button>
                </div>

                {/* Price */}
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                    <span className="text-lg font-bold text-primary">${property.price.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-card-foreground mb-2 text-balance">{property.title}</h3>
                  <div className="flex items-center text-muted-foreground mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{property.location}</span>
                  </div>
                  <div className="text-2xl font-bold text-primary mb-4">${property.price.toLocaleString()}</div>
                </div>

                {/* Property Details */}
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
                  <div className="flex items-center">
                    <Bed className="h-4 w-4 mr-1" />
                    <span>{property.bedrooms} bed</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-4 w-4 mr-1" />
                    <span>{property.bathrooms} bath</span>
                  </div>
                  <div className="flex items-center">
                    <Square className="h-4 w-4 mr-1" />
                    <span>{property.area} sqft</span>
                  </div>
                </div>

                {/* View Details Button */}
                <Link href={`/property/${property.id}`}>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Properties Button */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="px-8 py-4 text-lg font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 bg-transparent"
          >
            View All Properties
          </Button>
        </div>
      </div>
    </section>
  )
}
