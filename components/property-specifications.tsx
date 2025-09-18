import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bed, Bath, Square, Calendar, Car, Home } from "lucide-react"

interface PropertySpecificationsProps {
  specifications: {
    bedrooms: number
    bathrooms: number
    sqft: number
    yearBuilt: number
    parking: string
    type: string
  }
}

export default function PropertySpecifications({ specifications }: PropertySpecificationsProps) {
  const specs = [
    {
      icon: Bed,
      label: "Bedrooms",
      value: specifications.bedrooms.toString(),
    },
    {
      icon: Bath,
      label: "Bathrooms",
      value: specifications.bathrooms.toString(),
    },
    {
      icon: Square,
      label: "Square Feet",
      value: specifications.sqft.toLocaleString(),
    },
    {
      icon: Calendar,
      label: "Year Built",
      value: specifications.yearBuilt.toString(),
    },
    {
      icon: Car,
      label: "Parking",
      value: specifications.parking,
    },
    {
      icon: Home,
      label: "Property Type",
      value: specifications.type,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Property Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {specs.map((spec, index) => {
            const Icon = spec.icon
            return (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Icon className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">{spec.label}</p>
                  <p className="font-medium">{spec.value}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
