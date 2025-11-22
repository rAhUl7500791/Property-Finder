"use client"

import { useState, useEffect } from "react"
import { useParams, useSearchParams } from 'next/navigation'
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Bed, Bath, Square, Calendar, User, Mail, ChevronLeft, ChevronRight, Loader, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"

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
  discription: string
  location: string
  createdAt: string
  updatedAt: string
  user: PropertyUser
  images: PropertyImage[]
  queries: any[]
}

export default function PropertyDetailPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const propertyId = params.id as string

  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const propertyData = searchParams.get("data")

    if (propertyData) {
      try {
        const parsedProperty = JSON.parse(decodeURIComponent(propertyData))
        console.log("[v0] Using property data from URL:", parsedProperty)
        setProperty(parsedProperty)
        setLoading(false)
      } catch (err) {
        console.error("[v0] Error parsing property data from URL:", err)
        // Fallback to API fetch if parsing fails
        fetchPropertyFromAPI()
      }
    } else {
      // Fallback to API fetch if no data in URL
      fetchPropertyFromAPI()
    }
  }, [propertyId, searchParams])

  const fetchPropertyFromAPI = async () => {
    try {
      setLoading(true)
      const response = await fetch(`https://property-finder-service.onrender.com/open/property/${propertyId}`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: Property = await response.json()
      console.log("[v0] Fetched property details from API:", data)
      setProperty(data)
    } catch (err) {
      console.error("[v0] Error fetching property:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch property details")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex justify-center items-center py-32">
          <Loader className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    )
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-16">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error || "Property not found"}</AlertDescription>
          </Alert>
          <Link href="/">
            <Button className="mt-4">Back to Properties</Button>
          </Link>
        </div>
      </div>
    )
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)
  }

  const currentImage = property.images[currentImageIndex] || property.images[0]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/">
          <Button variant="outline" className="mb-6 bg-transparent">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Properties
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image Section */}
          <div className="lg:col-span-2">
            <div className="relative rounded-lg overflow-hidden bg-muted">
              <img
                src={currentImage?.imageUrl || "/placeholder.svg"}
                alt={property.propertyName}
                className="w-full h-96 object-cover"
              />

              {property.images.length > 1 && (
                <>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full h-10 w-10 p-0"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full h-10 w-10 p-0"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>

                  {/* Image Counter */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                    <Badge variant="secondary">
                      {currentImageIndex + 1} / {property.images.length}
                    </Badge>
                  </div>
                </>
              )}
            </div>

            {property.images.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                {property.images.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`flex-shrink-0 h-20 w-24 rounded-lg overflow-hidden border-2 transition-all ${
                      idx === currentImageIndex ? "border-primary" : "border-muted"
                    }`}
                  >
                    <img
                      src={img.imageUrl || "/placeholder.svg"}
                      alt={`View ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">{property.propertyName}</h1>
                  <div className="flex items-center text-muted-foreground mb-3">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{property.location}</span>
                  </div>
                </div>
                <Badge>{property.status}</Badge>
              </div>
              <div className="text-4xl font-bold text-primary">₹{Number(property.price).toLocaleString()}</div>
            </div>

            {/* Key Details */}
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <Bed className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground">Bedrooms</p>
                    <p className="text-lg font-semibold">{property.bedrooms}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <Bath className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground">Bathrooms</p>
                    <p className="text-lg font-semibold">{property.bathrooms}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <Square className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground">Area</p>
                    <p className="text-lg font-semibold">{property.dimension}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-2">About Property</h3>
              <p className="text-muted-foreground">{property.discription || "No description available"}</p>
            </div>

            {/* Property Type */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Property Type</h3>
              <Badge variant="outline">{property.propertyType}</Badge>
            </div>

            {/* Agent Info */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Listed By</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">{property.user.fullName}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">{property.user.email}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Button */}
            <Link href={`/inquiry?propertyId=${property.id}&property=${encodeURIComponent(JSON.stringify(property))}`}>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12">
                Raise Query
              </Button>
            </Link>
          </div>
        </div>

        {/* Additional Info */}
        <Card className="mt-8">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2 flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Listed On
                </h3>
                <p className="text-sm text-muted-foreground">{new Date(property.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Property ID</h3>
                <p className="text-sm text-muted-foreground">{property.id}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
