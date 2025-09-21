export interface Property {
  id: number
  title: string
  location: string
  price: number
  bedrooms: number
  bathrooms: number
  sqft: number
  type: string
  status: "active" | "sold" | "pending"
  images: string[]
  views: number
  agentEmail: string
  createdAt: string
}

// Mock data for demonstration
const mockProperties: Property[] = [
  {
    id: 1,
    title: "Modern Downtown Apartment",
    location: "Downtown, City Center",
    price: 450000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    type: "apartment",
    status: "active",
    images: ["/placeholder.svg?key=831nr"],
    views: 45,
    agentEmail: "Agent@test.com",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Luxury Family Home",
    location: "Suburban Heights",
    price: 750000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2500,
    type: "house",
    status: "active",
    images: ["/placeholder.svg?key=ch3uu"],
    views: 78,
    agentEmail: "Agent@test.com",
    createdAt: new Date().toISOString(),
  },
]

export function getAgentProperties(agentEmail: string): Property[] {
  return mockProperties.filter((property) => property.agentEmail === agentEmail)
}

export function addProperty(propertyData: Omit<Property, "id" | "views" | "createdAt">): Property {
  const newProperty: Property = {
    ...propertyData,
    id: Date.now(),
    views: 0,
    createdAt: new Date().toISOString(),
  }
  mockProperties.push(newProperty)
  return newProperty
}

export function updateProperty(id: number, propertyData: Partial<Property>): Property | null {
  const index = mockProperties.findIndex((p) => p.id === id)
  if (index !== -1) {
    mockProperties[index] = { ...mockProperties[index], ...propertyData }
    return mockProperties[index]
  }
  return null
}

export function deleteProperty(id: number): boolean {
  const index = mockProperties.findIndex((p) => p.id === id)
  if (index !== -1) {
    mockProperties.splice(index, 1)
    return true
  }
  return false
}
