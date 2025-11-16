
"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from 'next/navigation'
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Loader, AlertCircle, ChevronLeft } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import InquiryForm from "@/components/inquiry-form"

interface PropertyUser {
  id: number
  fullName: string
  email: string
  phone?: string
}

interface Property {
  id: number
  propertyName: string
  user: PropertyUser
}

export default function InquiryPage() {
  const searchParams = useSearchParams()
  const propertyId = searchParams.get("propertyId")
  const propertyData = searchParams.get("property")

  let property: Property | null = null
  let error: string | null = null

  if (propertyData) {
    try {
      property = JSON.parse(decodeURIComponent(propertyData))
    } catch (err) {
      error = "Failed to parse property data"
      console.error("[v0] Error parsing property data:", err)
    }
  } else if (!propertyId) {
    error = "Property information is missing"
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-2xl mx-auto px-4 py-16">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error || "Property not found"}</AlertDescription>
          </Alert>
          <Link href="/">
            <Button className="mt-4">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Properties
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <Link href="/">
          <Button variant="outline" className="mb-6 bg-transparent">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Properties
          </Button>
        </Link>

        <InquiryForm
          agent={{
            name: property.user.fullName,
            phone: property.user.phone || "+91-XXXXXXXXXX",
            email: property.user.email,
            image: "/placeholder.svg",
          }}
          propertyTitle={property.propertyName}
          propertyId={property.id}
          agentUserId={property.user.id}
        />
      </div>
    </div>
  )
}


