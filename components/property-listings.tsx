"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Bed, Bath, Square, Heart, ChevronLeft, ChevronRight, Loader } from "lucide-react"
import { useState, useEffect } from "react"

interface PropertyImage {
  id: number
  imgbase64Format: string | null
  imageUrl: string
}

interface PropertyUser {
  id: number
  fullName: string
  email: string
}

interface Property {
  id: number
  propertyName: string
  propertyType: string
  price: string | number
  bedrooms: string | number
  bathrooms: string | number
  dimension: string
  status: string
  description: string
  location: string
  createdAt: string
  updatedAt: string
  user: PropertyUser
  images: PropertyImage[]
  queries: any[]
}

interface ApiResponse {
  content: Property[]
  pageNumber: number
  pageSize: number
  totalElements: number
  totalPages: number
  last: boolean
}

export function PropertyListings() {
  const [properties, setProperties] = useState<Property[]>([])
  const [favorites, setFavorites] = useState<number[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProperties = async (page: number) => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`http://localhost:8080/open/property/getAll?page=${page}&size=4`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: ApiResponse = await response.json()
      console.log("[v0] Fetched properties:", data)

      setProperties(data.content)
      setCurrentPage(data.pageNumber)
      setTotalPages(data.totalPages)
    } catch (err) {
      console.error("[v0] Error fetching properties:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch properties")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProperties(currentPage)
  }, [currentPage])

  const toggleFavorite = (propertyId: number) => {
    setFavorites((prev) => (prev.includes(propertyId) ? prev.filter((id) => id !== propertyId) : [...prev, propertyId]))
  }

  if (error) {
    return (
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <p className="text-destructive text-lg">{error}</p>
            <Button onClick={() => fetchProperties(0)} className="mt-4">
              Try Again
            </Button>
          </div>
        </div>
      </section>
    )
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

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            {/* Property Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((property) => (
                <Card
                  key={property.id}
                  className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-card"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={property.images?.[0]?.imageUrl || "/placeholder.svg"}
                      alt={property.propertyName}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Status Badge */}
                    <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">{property.status}</Badge>

                    {/* Favorite Button */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
                    </div>

                    {/* Price Display */}
                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                        <span className="text-lg font-bold text-primary">
                          ₹{Number(property.price).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-card-foreground mb-2 text-balance">
                        {property.propertyName}
                      </h3>
                      <div className="flex items-center text-muted-foreground mb-3">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{property.location}</span>
                      </div>
                      <div className="text-2xl font-bold text-primary mb-4">
                        ₹{Number(property.price).toLocaleString()}
                      </div>
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
                        <span>{property.dimension}</span>
                      </div>
                    </div>

                    {/* View Details Button */}
                    <Link href={`/property/${property.id}?data=${encodeURIComponent(JSON.stringify(property))}`}>
                      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
                        View Details
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-4 mt-12">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                disabled={currentPage === 0}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <Button
                    key={i}
                    variant={currentPage === i ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(i)}
                    className="h-8 w-8 p-0"
                  >
                    {i + 1}
                  </Button>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                disabled={currentPage === totalPages - 1}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
