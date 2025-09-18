// Property management utilities and mock data
export interface Property {
  id: number
  title: string
  description: string
  price: number
  location: string
  bedrooms: number
  bathrooms: number
  sqft: number
  type: "house" | "apartment" | "condo" | "townhouse"
  status: "active" | "pending" | "sold" | "draft"
  images: string[]
  features: string[]
  agentId: string
  createdAt: string
  updatedAt: string
  views: number
}

// Mock properties data
const mockProperties: Property[] = [
  {
    id: 1,
    title: "Modern Downtown Loft",
    description: "Stunning modern loft in the heart of downtown with floor-to-ceiling windows and premium finishes.",
    price: 850000,
    location: "Downtown District, New York",
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    type: "apartment",
    status: "active",
    images: ["/modern-downtown-loft.png"],
    features: ["Hardwood Floors", "Modern Kitchen", "City Views", "Parking"],
    agentId: "agent@gmail.com",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-10",
    views: 45,
  },
  {
    id: 2,
    title: "Cozy Suburban Home",
    description: "Beautiful family home in quiet suburban neighborhood with large backyard and modern amenities.",
    price: 650000,
    location: "Suburban Heights, New York",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1800,
    type: "house",
    status: "pending",
    images: ["/cozy-suburban-home-exterior.jpg"],
    features: ["Large Backyard", "Updated Kitchen", "Garage", "Fireplace"],
    agentId: "agent@gmail.com",
    createdAt: "2024-01-08",
    updatedAt: "2024-01-12",
    views: 32,
  },
  {
    id: 3,
    title: "Luxury Penthouse",
    description: "Exclusive penthouse with panoramic city views, private terrace, and luxury amenities.",
    price: 1200000,
    location: "Upper East Side, New York",
    bedrooms: 3,
    bathrooms: 3,
    sqft: 2500,
    type: "apartment",
    status: "active",
    images: ["/placeholder.svg?height=300&width=400"],
    features: ["Private Terrace", "Panoramic Views", "Luxury Finishes", "Concierge"],
    agentId: "agent@gmail.com",
    createdAt: "2024-01-05",
    updatedAt: "2024-01-05",
    views: 67,
  },
]

export function getAgentProperties(agentId: string): Property[] {
  return mockProperties.filter((property) => property.agentId === agentId)
}

export function addProperty(property: Omit<Property, "id" | "createdAt" | "updatedAt" | "views">): Property {
  const newProperty: Property = {
    ...property,
    id: Math.max(...mockProperties.map((p) => p.id)) + 1,
    createdAt: new Date().toISOString().split("T")[0],
    updatedAt: new Date().toISOString().split("T")[0],
    views: 0,
  }

  mockProperties.push(newProperty)
  return newProperty
}

export function updateProperty(id: number, updates: Partial<Property>): Property | null {
  const index = mockProperties.findIndex((p) => p.id === id)
  if (index === -1) return null

  mockProperties[index] = {
    ...mockProperties[index],
    ...updates,
    updatedAt: new Date().toISOString().split("T")[0],
  }

  return mockProperties[index]
}

export function deleteProperty(id: number): boolean {
  const index = mockProperties.findIndex((p) => p.id === id)
  if (index === -1) return false

  mockProperties.splice(index, 1)
  return true
}

export function getPropertyById(id: number): Property | null {
  return mockProperties.find((p) => p.id === id) || null
}
