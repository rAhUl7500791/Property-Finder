// Query management utilities and mock data
export interface Query {
  id: number
  propertyId: number
  propertyTitle: string
  clientName: string
  clientEmail: string
  clientPhone?: string
  message: string
  status: "pending" | "resolved"
  createdAt: string
  resolvedAt?: string
  agentResponse?: string
}

// Mock queries data
const mockQueries: Query[] = [
  {
    id: 1,
    propertyId: 1,
    propertyTitle: "Modern Downtown Loft",
    clientName: "John Smith",
    clientEmail: "john.smith@email.com",
    clientPhone: "(555) 123-4567",
    message: "I'm interested in scheduling a viewing for this property. When would be a good time?",
    status: "pending",
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: 2,
    propertyId: 2,
    propertyTitle: "Cozy Suburban Home",
    clientName: "Sarah Johnson",
    clientEmail: "sarah.j@email.com",
    message: "What are the HOA fees for this property? Also, is the garage included?",
    status: "pending",
    createdAt: "2024-01-14T14:20:00Z",
  },
  {
    id: 3,
    propertyId: 3,
    propertyTitle: "Luxury Penthouse",
    clientName: "Mike Davis",
    clientEmail: "mike.davis@email.com",
    clientPhone: "(555) 987-6543",
    message: "Is the price negotiable? I'm a serious buyer and can close quickly.",
    status: "resolved",
    createdAt: "2024-01-13T09:15:00Z",
    resolvedAt: "2024-01-13T16:45:00Z",
    agentResponse:
      "Thank you for your interest! The price has some flexibility for the right buyer. I've sent you more details via email.",
  },
  {
    id: 4,
    propertyId: 1,
    propertyTitle: "Modern Downtown Loft",
    clientName: "Emily Chen",
    clientEmail: "emily.chen@email.com",
    message: "Does this unit come with parking? What about pet policy?",
    status: "resolved",
    createdAt: "2024-01-12T11:00:00Z",
    resolvedAt: "2024-01-12T15:30:00Z",
    agentResponse:
      "Yes, one parking spot is included. Pets are allowed with a deposit. Please call me for more details.",
  },
]

export function getAgentQueries(agentId: string): Query[] {
  // In a real app, you'd filter by agent ID
  return mockQueries
}

export function addQuery(query: Omit<Query, "id" | "createdAt" | "status">): Query {
  const newQuery: Query = {
    ...query,
    id: Math.max(...mockQueries.map((q) => q.id)) + 1,
    status: "pending",
    createdAt: new Date().toISOString(),
  }

  mockQueries.unshift(newQuery)
  return newQuery
}

export function resolveQuery(id: number, response: string): Query | null {
  const index = mockQueries.findIndex((q) => q.id === id)
  if (index === -1) return null

  mockQueries[index] = {
    ...mockQueries[index],
    status: "resolved",
    resolvedAt: new Date().toISOString(),
    agentResponse: response,
  }

  return mockQueries[index]
}

export function getQueryById(id: number): Query | null {
  return mockQueries.find((q) => q.id === id) || null
}
