"use client"

import { useParams } from "next/navigation"
import sampleProperties from "@/data/sample-properties"
import ImageSlider from "@/components/image-slider"
import PropertySpecifications from "@/components/property-specifications"
import LocationInfo from "@/components/location-info"
import InquiryForm from "@/components/inquiry-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Heart, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PropertyDetails() {
  const { id } = useParams()
  const propertyId = Number(id)

  const property = sampleProperties.find((p) => p.id === propertyId)

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Property Not Found</h1>
          <p className="text-muted-foreground mb-4">The property you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/">Back to Listings</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Listings
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Heart className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Image Slider */}
        <div className="mb-8">
          <ImageSlider images={property.images} title={property.title} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Header */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2 text-balance">{property.title}</h1>
                  <p className="text-lg text-muted-foreground mb-3">{property.city}</p>
                  <Badge variant="secondary" className="mb-4">
                    {property.specifications.type}
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-primary">{property.price}</p>
                </div>
              </div>
            </div>

            {/* Property Specifications */}
            <PropertySpecifications specifications={property.specifications} />

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">About This Property</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed text-pretty">{property.description}</p>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Features & Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <LocationInfo location={property.location} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <InquiryForm agent={property.agent} propertyTitle={property.title} propertyId={propertyId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
