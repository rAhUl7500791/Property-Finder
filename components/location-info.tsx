import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Navigation } from "lucide-react"

interface LocationInfoProps {
  location: {
    address: string
    neighborhood: string
    nearbyAmenities: string[]
    coordinates: {
      lat: number
      lng: number
    }
  }
}

export default function LocationInfo({ location }: LocationInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Location & Neighborhood
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Address */}
        <div>
          <h4 className="font-medium text-foreground mb-2">Address</h4>
          <p className="text-muted-foreground">{location.address}</p>
          <p className="text-sm text-muted-foreground mt-1">{location.neighborhood} Neighborhood</p>
        </div>

        {/* Map Placeholder */}
        <div className="relative h-64 bg-muted rounded-lg overflow-hidden">
          <img
            src={`/map-showing-.jpg?height=256&width=400&query=map showing ${location.neighborhood} neighborhood`}
            alt={`Map of ${location.neighborhood}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-background/80">
            <div className="text-center">
              <Navigation className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium">Interactive Map</p>
              <p className="text-xs text-muted-foreground">
                Lat: {location.coordinates.lat}, Lng: {location.coordinates.lng}
              </p>
            </div>
          </div>
        </div>

        {/* Nearby Amenities */}
        <div>
          <h4 className="font-medium text-foreground mb-3">Nearby Amenities</h4>
          <div className="space-y-2">
            {location.nearbyAmenities.map((amenity, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                <span className="text-muted-foreground">{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
