export interface Query {
  id: number
  propertyId: number
  propertyTitle: string
  clientName: string
  clientEmail: string
  clientPhone?: string
  message: string
  status: "pending" | "resolved"
  agentEmail: string
  agentResponse?: string
  createdAt: string
  resolvedAt?: string
}

// Mock data for demonstration
const mockQueries: Query[] = [
  {
    id: 1,
    propertyId: 1,
    propertyTitle: "Modern Downtown Apartment",
    clientName: "John Smith",
    clientEmail: "john.smith@email.com",
    clientPhone: "+1-555-0123",
    message: "I'm interested in scheduling a viewing for this apartment. Is it available this weekend?",
    status: "pending",
    agentEmail: "Agent@test.com",
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
  {
    id: 2,
    propertyId: 2,
    propertyTitle: "Luxury Family Home",
    clientName: "Sarah Johnson",
    clientEmail: "sarah.j@email.com",
    message: "What's the neighborhood like? Are there good schools nearby?",
    status: "resolved",
    agentEmail: "Agent@test.com",
    agentResponse:
      "The neighborhood is very family-friendly with excellent schools within walking distance. There are also parks and recreational facilities nearby.",
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    resolvedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
]

export function getAgentQueries(agentEmail: string): Query[] {
  return mockQueries.filter((query) => query.agentEmail === agentEmail)
}

export function resolveQuery(queryId: number, response: string): Query | null {
  const query = mockQueries.find((q) => q.id === queryId)
  if (query) {
    query.status = "resolved"
    query.agentResponse = response
    query.resolvedAt = new Date().toISOString()
    return query
  }
  return null
}
