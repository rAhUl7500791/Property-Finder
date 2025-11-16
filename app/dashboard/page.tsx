"use client"

import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import { getCurrentUser, getAuthToken } from "@/lib/auth"
import { addProperty, updateProperty, deleteProperty, type Property } from "@/lib/properties"
import { getAgentQueries, resolveQuery, type Query } from "@/lib/queries"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Navigation } from "@/components/navigation"
import { PropertyForm } from "@/components/property-form"
import { Home, Plus, MessageSquare, CheckCircle, Clock, DollarSign, TrendingUp, Eye, Edit, Trash2, Reply } from 'lucide-react'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [properties, setProperties] = useState<Property[]>([])
  const [queries, setQueries] = useState<Query[]>([])
  const [showPropertyForm, setShowPropertyForm] = useState(false)
  const [editingProperty, setEditingProperty] = useState<Property | null>(null)
  const [formLoading, setFormLoading] = useState(false)
  const [respondingToQuery, setRespondingToQuery] = useState<number | null>(null)
  const [response, setResponse] = useState("")
  const router = useRouter()

  const fetchAgentProperties = async (userId: string) => {
    try {
      const token = getAuthToken()
      console.log("[v0] Fetching properties for userId:", userId)
      
      const response = await fetch(`http://localhost:8080/property/findByAgentId?userId=${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        console.log("[v0] Failed to fetch properties:", response.status)
        return []
      }

      const data = await response.json()
      console.log("[v0] Properties fetched:", data)
      
      const allQueries: Query[] = []
      
      // Transform API response to match Property interface
      const transformedProperties = (Array.isArray(data) ? data : data.content || []).map((prop: any) => {
        // Extract queries from this property
        if (prop.queries && Array.isArray(prop.queries)) {
          prop.queries.forEach((q: any) => {
            allQueries.push({
              id: q.id,
              clientName: q.fullName,
              clientEmail: q.clientEmail,
              clientPhone: q.clientPhoneNumber,
              message: q.queryText || "Interested in this property",
              propertyTitle: prop.propertyName,
              propertyId: prop.id,
              status: q.status?.toLowerCase() === "open" ? "pending" : q.status?.toLowerCase(),
              createdAt: new Date(),
              resolvedAt: undefined,
              agentResponse: undefined,
            })
          })
        }
        
        return {
          id: prop.id,
          title: prop.propertyName || prop.title,
          location: prop.location || "",
          price: prop.price || 0,
          bedrooms: prop.bedrooms || 0,
          bathrooms: prop.bathrooms || 0,
          sqft: prop.dimension || prop.sqft || 0,
          views: prop.views || 0,
          status: prop.status?.toLowerCase() || "active",
          type: prop.propertyType || prop.type || "residential",
          images: prop.images && Array.isArray(prop.images) ? prop.images.map((img: any) => img.imageUrl || img.imgbase64Format) : [],
        }
      })
      
      // Store queries in state
      setQueries(allQueries)
      
      return transformedProperties
    } catch (error) {
      console.error("[v0] Error fetching properties:", error)
      return []
    }
  }

  const fetchAgentQueries = async (userId: string) => {
    try {
      const token = getAuthToken()
      console.log("[v0] Fetching queries for userId:", userId)
      
      // Queries are extracted in fetchAgentProperties and set in state directly
      return []
    } catch (error) {
      console.error("[v0] Error fetching queries:", error)
      return []
    }
  }

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser || currentUser.role !== "agent") {
      router.push("/login")
      return
    }
    
    setUser(currentUser)
    setProperties([])
    setQueries([])
    setLoading(true)
    
    const loadData = async () => {
      const agentProperties = await fetchAgentProperties(currentUser.id)
      setProperties(agentProperties)
      
      setLoading(false)
    }
    
    loadData()
  }, [router, user?.id]) // Added user?.id to dependency array so it refetches when user changes

  const handleAddProperty = async (propertyData: any) => {
    setFormLoading(true)
    try {
      const newProperty = addProperty(propertyData)
      setProperties((prev) => [...prev, newProperty])
      setShowPropertyForm(false)
      alert("Property added successfully!")
    } catch (error) {
      alert("Error adding property")
    } finally {
      setFormLoading(false)
    }
  }

  const handleEditProperty = async (propertyData: any) => {
    if (!editingProperty) return

    setFormLoading(true)
    try {
      const updatedProperty = updateProperty(editingProperty.id, propertyData)
      if (updatedProperty) {
        setProperties((prev) => prev.map((p) => (p.id === editingProperty.id ? updatedProperty : p)))
        setEditingProperty(null)
        alert("Property updated successfully!")
      }
    } catch (error) {
      alert("Error updating property")
    } finally {
      setFormLoading(false)
    }
  }

  const handleDeleteProperty = (id: number) => {
    if (confirm("Are you sure you want to delete this property?")) {
      if (deleteProperty(id)) {
        setProperties((prev) => prev.filter((p) => p.id !== id))
        alert("Property deleted successfully!")
      }
    }
  }

  const handleRespondToQuery = (queryId: number) => {
    if (!response.trim()) {
      alert("Please enter a response")
      return
    }

    const updatedQuery = resolveQuery(queryId, response)
    if (updatedQuery) {
      setQueries((prev) => prev.map((q) => (q.id === queryId ? updatedQuery : q)))
      setRespondingToQuery(null)
      setResponse("")
      alert("Response sent successfully!")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  if (showPropertyForm || editingProperty) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-16 py-8">
          <div className="container mx-auto px-4">
            <PropertyForm
              property={editingProperty}
              onSubmit={editingProperty ? handleEditProperty : handleAddProperty}
              onCancel={() => {
                setShowPropertyForm(false)
                setEditingProperty(null)
              }}
              loading={formLoading}
            />
          </div>
        </div>
      </div>
    )
  }

  // Calculate stats from actual data
  const stats = {
    totalProperties: properties.length,
    activeListings: properties.filter((p) => p.status === "active").length,
    pendingQueries: queries.filter((q) => q.status === "pending").length,
    resolvedQueries: queries.filter((q) => q.status === "resolved").length,
    totalRevenue: properties.reduce(
      (sum, p) =>
        p.status === "sold" ? sum + (typeof p.price === "string" ? Number.parseInt(p.price) : p.price) : sum,
      0,
    ),
    monthlyViews: properties.reduce((sum, p) => sum + p.views, 0),
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-16">
        {/* Dashboard Header */}
        <div className="bg-primary/5 py-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-primary">Agent Dashboard</h1>
                <p className="text-muted-foreground mt-2">Welcome back, {user.name}!</p>
              </div>
              <Button className="bg-accent hover:bg-accent/90" onClick={() => setShowPropertyForm(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add New Property
              </Button>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="container mx-auto px-4 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Home className="h-8 w-8 text-primary" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Total Properties</p>
                    <p className="text-2xl font-bold">{stats.totalProperties}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Active Listings</p>
                    <p className="text-2xl font-bold">{stats.activeListings}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Clock className="h-8 w-8 text-orange-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Pending Queries</p>
                    <p className="text-2xl font-bold">{stats.pendingQueries}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Resolved Queries</p>
                    <p className="text-2xl font-bold">{stats.resolvedQueries}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <DollarSign className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                    <p className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Eye className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Monthly Views</p>
                    <p className="text-2xl font-bold">{stats.monthlyViews}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Dashboard Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="properties">Properties</TabsTrigger>
              <TabsTrigger value="queries">Queries</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Properties */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Properties</CardTitle>
                    <CardDescription>Your latest property listings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {properties.slice(0, 3).map((property) => (
                        <div key={property.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium">{property.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              $
                              {typeof property.price === "string"
                                ? Number.parseInt(property.price)
                                : property.price.toLocaleString()}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={property.status === "active" ? "default" : "secondary"}>
                              {property.status}
                            </Badge>
                            <span className="text-sm text-muted-foreground">{property.views} views</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Queries */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Queries</CardTitle>
                    <CardDescription>Latest customer inquiries</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {queries.slice(0, 3).map((query) => (
                        <div key={query.id} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{query.clientName}</h4>
                            <Badge variant={query.status === "pending" ? "destructive" : "default"}>
                              {query.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">{query.propertyTitle}</p>
                          <p className="text-sm">{query.message}</p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {new Date(query.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="properties">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Property Management</CardTitle>
                    <CardDescription>Manage all your property listings</CardDescription>
                  </div>
                  <Button onClick={() => setShowPropertyForm(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Property
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    {properties.map((property) => (
                      <div key={property.id} className="border rounded-lg p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-4 mb-4">
                              <img
                                src={property.images[0] || "/placeholder.svg"}
                                alt={property.title}
                                className="w-24 h-24 object-cover rounded-lg"
                              />
                              <div>
                                <h3 className="text-xl font-semibold">{property.title}</h3>
                                <p className="text-muted-foreground">{property.location}</p>
                                <p className="text-2xl font-bold text-primary">
                                  $
                                  {(typeof property.price === "string"
                                    ? Number.parseInt(property.price)
                                    : property.price || 0
                                  ).toLocaleString()}
                                </p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                              <div>
                                <p className="text-sm text-muted-foreground">Bedrooms</p>
                                <p className="font-medium">{property.bedrooms}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Bathrooms</p>
                                <p className="font-medium">{property.bathrooms}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Sq Ft</p>
                                <p className="font-medium">
                                  {(typeof property.sqft === "string"
                                    ? Number.parseInt(property.sqft)
                                    : property.sqft || 0
                                  ).toLocaleString()}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Views</p>
                                <p className="font-medium">{property.views}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant={property.status === "active" ? "default" : "secondary"}>
                                {property.status}
                              </Badge>
                              <Badge variant="outline">{property.type}</Badge>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" onClick={() => setEditingProperty(property)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleDeleteProperty(property.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {properties.length === 0 && (
                      <div className="text-center py-12">
                        <Home className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">No properties yet</h3>
                        <p className="text-muted-foreground mb-4">Start by adding your first property listing.</p>
                        <Button onClick={() => setShowPropertyForm(true)}>
                          <Plus className="mr-2 h-4 w-4" />
                          Add Your First Property
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="queries">
              <Card>
                <CardHeader>
                  <CardTitle>Query Management</CardTitle>
                  <CardDescription>Handle customer inquiries and queries</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {queries.map((query) => (
                      <div key={query.id} className="border rounded-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-4 mb-2">
                              <h3 className="text-lg font-semibold">{query.clientName}</h3>
                              <Badge variant={query.status === "pending" ? "destructive" : "default"}>
                                {query.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-1">Property: {query.propertyTitle}</p>
                            <p className="text-sm text-muted-foreground mb-1">Email: {query.clientEmail}</p>
                            {query.clientPhone && (
                              <p className="text-sm text-muted-foreground mb-1">Phone: {query.clientPhone}</p>
                            )}
                            <p className="text-sm text-muted-foreground">
                              Date: {new Date(query.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        <div className="bg-muted/50 rounded-lg p-4 mb-4">
                          <h4 className="font-medium mb-2">Customer Message:</h4>
                          <p className="text-sm">{query.message}</p>
                        </div>

                        {query.status === "resolved" && query.agentResponse && (
                          <div className="bg-primary/5 rounded-lg p-4 mb-4">
                            <h4 className="font-medium mb-2">Your Response:</h4>
                            <p className="text-sm">{query.agentResponse}</p>
                            <p className="text-xs text-muted-foreground mt-2">
                              Resolved on: {new Date(query.resolvedAt!).toLocaleDateString()}
                            </p>
                          </div>
                        )}

                        {query.status === "pending" && (
                          <div className="space-y-4">
                            {respondingToQuery === query.id ? (
                              <div className="space-y-4">
                                <Textarea
                                  placeholder="Type your response to the customer..."
                                  value={response}
                                  onChange={(e) => setResponse(e.target.value)}
                                  rows={4}
                                />
                                <div className="flex space-x-2">
                                  <Button onClick={() => handleRespondToQuery(query.id)}>Send Response</Button>
                                  <Button
                                    variant="outline"
                                    onClick={() => {
                                      setRespondingToQuery(null)
                                      setResponse("")
                                    }}
                                  >
                                    Cancel
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <Button onClick={() => setRespondingToQuery(query.id)} className="w-full">
                                <Reply className="mr-2 h-4 w-4" />
                                Respond to Query
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    ))}

                    {queries.length === 0 && (
                      <div className="text-center py-12">
                        <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">No queries yet</h3>
                        <p className="text-muted-foreground">
                          Customer inquiries will appear here when they contact you about your properties.
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Analytics & Reports</CardTitle>
                  <CardDescription>View detailed analytics and performance reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Property Performance</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {properties.slice(0, 3).map((property) => (
                            <div key={property.id} className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">{property.title}</p>
                                <p className="text-sm text-muted-foreground">{property.status}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">{property.views} views</p>
                                <p className="text-sm text-muted-foreground">
                                  {queries.filter((q) => q.propertyId === property.id).length} queries
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Query Statistics</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span>Total Queries</span>
                            <span className="font-bold">{queries.length}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Pending</span>
                            <span className="font-bold text-orange-600">{stats.pendingQueries}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Resolved</span>
                            <span className="font-bold text-green-600">{stats.resolvedQueries}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Response Rate</span>
                            <span className="font-bold">
                              {queries.length > 0 ? Math.round((stats.resolvedQueries / queries.length) * 100) : 0}%
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
