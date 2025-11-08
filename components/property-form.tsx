"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getCurrentUser } from "@/lib/auth"
import type { Property } from "@/lib/properties"

interface PropertyFormProps {
  property?: Property | null
  onSubmit: (propertyData: any) => void
  onCancel: () => void
  loading: boolean
}

export function PropertyForm({ property, onSubmit, onCancel, loading }: PropertyFormProps) {
  const [formData, setFormData] = useState({
    propertyName: property?.title || "",
    location: property?.location || "",
    price: property?.price || 0,
    bedrooms: property?.bedrooms || 1,
    bathrooms: property?.bathrooms || 1,
    dimension: property?.sqft || 0,
    propertyType: property?.type || "apartment",
    status: property?.status || "active",
    discription: property?.description || "",
  })

  const [images, setImages] = useState<File[]>([])
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([])
  const [uploadingImages, setUploadingImages] = useState(false)

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        // Extract base64 string (remove data:image/jpeg;base64, prefix)
        const base64String = (reader.result as string).split(",")[1]
        resolve(base64String)
      }
      reader.onerror = (error) => reject(error)
    })
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setImages((prev) => [...prev, ...files])

    // Create preview URLs
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImagePreviewUrls((prev) => [...prev, event.target?.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
    setImagePreviewUrls((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const user = getCurrentUser()
    if (!user) {
      alert("User not authenticated")
      return
    }

    try {
      setUploadingImages(true)

      const imagesBase64 = await Promise.all(images.map((file) => fileToBase64(file)))

      const token = localStorage.getItem("authToken")
      const userId = localStorage.getItem("userId")
      // Prepare images array in the format expected by the API
      // Each image should have an 'imgbase64Format' field containing the base64 string
      const imagesPayload = imagesBase64.map((base64String) => ({
        imgbase64Format: base64String,
      }))

      const payload = {
        propertyName: formData.propertyName,
        propertyType: formData.propertyType.charAt(0).toUpperCase() + formData.propertyType.slice(1),
        price: formData.price.toString(),
        bedrooms: formData.bedrooms.toString(),
        bathrooms: formData.bathrooms.toString(),
        dimension: `${formData.dimension} sqft`,
        status: formData.status.charAt(0).toUpperCase() + formData.status.slice(1),
        discription: formData.discription,
        location: formData.location,
        userId: userId, // Use authenticated user's ID instead of hardcoded value
        images: imagesPayload,
      } 

      console.log("[v0] Submitting property with images:", payload)
      console.log("[v0] Auth token present:", !!token)
      console.log("[v0] User ID from auth:", userId)

      const response = await fetch("http://localhost:8080/property/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to add property")
      }

      const result = await response.json()
      console.log("[v0] Property added successfully:", result)

      const transformedProperty = {
        id: result.id || Date.now(), // Use API's id or generate one
        title: result.propertyName || formData.propertyName,
        location: result.location || formData.location,
        price: result.price ? Number.parseInt(result.price) : formData.price,
        bedrooms: result.bedrooms ? Number.parseInt(result.bedrooms) : formData.bedrooms,
        bathrooms: result.bathrooms ? Number.parseInt(result.bathrooms) : formData.bathrooms,
        sqft: result.dimension ? Number.parseInt(result.dimension) : formData.dimension,
        type: result.propertyType || formData.propertyType,
        status: (result.status || formData.status).toLowerCase(),
        description: result.discription || formData.discription,
        images: result.images || imagePreviewUrls,
        views: result.views || 0, // Default to 0 if not returned
      }

      alert("Property added successfully!")

      // Reset form
      setFormData({
        propertyName: "",
        location: "",
        price: 0,
        bedrooms: 1,
        bathrooms: 1,
        dimension: 0,
        propertyType: "apartment",
        status: "active",
        discription: "",
      })
      setImages([])
      setImagePreviewUrls([])

      onSubmit(transformedProperty)
    } catch (error) {
      console.error("[v0] Error adding property:", error)
      alert(`Error: ${error instanceof Error ? error.message : "Failed to add property"}`)
    } finally {
      setUploadingImages(false)
    }
  }

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{property ? "Edit Property" : "Add New Property"}</CardTitle>
        <CardDescription>
          {property ? "Update property details" : "Fill in the details for your new property listing"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="propertyName">Property Name</Label>
              <Input
                id="propertyName"
                value={formData.propertyName}
                onChange={(e) => handleChange("propertyName", e.target.value)}
                placeholder="e.g., Modern Downtown Apartment"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                placeholder="e.g., Downtown, City Center"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => handleChange("price", Number.parseInt(e.target.value) || 0)}
                placeholder="450000"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dimension">Square Feet</Label>
              <Input
                id="dimension"
                type="number"
                value={formData.dimension}
                onChange={(e) => handleChange("dimension", Number.parseInt(e.target.value) || 0)}
                placeholder="1200"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bedrooms">Bedrooms</Label>
              <Select
                value={formData.bedrooms.toString()}
                onValueChange={(value) => handleChange("bedrooms", Number.parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bathrooms">Bathrooms</Label>
              <Select
                value={formData.bathrooms.toString()}
                onValueChange={(value) => handleChange("bathrooms", Number.parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="propertyType">Property Type</Label>
              <Select value={formData.propertyType} onValueChange={(value) => handleChange("propertyType", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="condo">Condo</SelectItem>
                  <SelectItem value="townhouse">Townhouse</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="sold">Sold</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="discription">Description</Label>
            <textarea
              id="discription"
              value={formData.discription}
              onChange={(e) => handleChange("discription", e.target.value)}
              placeholder="Enter property description"
              className="w-full p-2 border rounded-md"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="images">Upload Images</Label>
            <div className="border-2 border-dashed rounded-lg p-6 text-center">
              <input
                id="images"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("images")?.click()}
                disabled={uploadingImages}
              >
                {uploadingImages ? "Converting Images..." : "Choose Images"}
              </Button>
              <p className="text-sm text-gray-500 mt-2">Click to select multiple images</p>
            </div>

            {imagePreviewUrls.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {imagePreviewUrls.map((url, index) => (
                  <div key={index} className="relative">
                    <img
                      src={url || "/placeholder.svg"}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
            <p className="text-sm text-gray-600">{images.length} image(s) selected</p>
          </div>

          <div className="flex space-x-4">
            <Button type="submit" disabled={loading || uploadingImages || images.length === 0} className="flex-1">
              {loading || uploadingImages ? "Saving..." : property ? "Update Property" : "Add Property"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1 bg-transparent">
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
