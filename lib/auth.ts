interface User {
  id: string
  email: string
  name: string
  role: string
}

interface LoginResponse {
  success: boolean
  user?: User
  token?: string
  message?: string
  access_token?: string
  jwt?: string
  id?: string
  fullName?: string
}

const API_BASE_URL = "https://property-finder-service.onrender.com"

// Store user in localStorage
export function setCurrentUser(user: User): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("currentUser", JSON.stringify(user))
  }
}

// Get current user from localStorage
export function getCurrentUser(): User | null {
  if (typeof window !== "undefined") {
    const userStr = localStorage.getItem("currentUser")
    return userStr ? JSON.parse(userStr) : null
  }
  return null
}

// Authenticate user with backend API
export async function authenticateUser(email: string, password: string): Promise<User | null> {
  try {
    console.log("[v0] Attempting login with:", { email, password: "***" })

    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })

    console.log("[v0] Login response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.log("[v0] Login error response:", errorText)
      throw new Error(`Login failed: ${response.status}`)
    }

    const data = await response.json()
    console.log("[v0] Login response data:", data)

    // Handle different possible response formats
    if (data.token || data.access_token || data.jwt) {
      const token = data.token || data.access_token || data.jwt
      const userId = data.userId

      // Store token
      if (typeof window !== "undefined") {
        localStorage.setItem("authToken", token)
        localStorage.setItem("userId", userId)
      }

      // Create user object from response
      const user: User = {
        id: data.user?.userId || data.userId || null,
        email: data.user?.email || data.email || email,
        name: data.user?.name || data.user?.fullName || data.fullName || data.name || "Agent",
        role: data.user?.role || data.role || "agent",
      }

      console.log("[v0] Created user object:", user)
      return user
    }

    // If no token found, check if login was successful anyway
    if (data.success !== false && (data.user || data.email)) {
      const user: User = {
        id: data.user?.id || data.id || "1",
        email: data.user?.email || data.email || email,
        name: data.user?.name || data.user?.fullName || data.fullName || data.name || "Agent",
        role: data.user?.role || data.role || "agent",
      }

      console.log("[v0] Created user object (no token):", user)
      return user
    }

    console.log("[v0] Login failed - no valid response format")
    return null
  } catch (error) {
    console.error("[v0] Authentication error:", error)
    throw error
  }
}

// Logout user
export function logout(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("currentUser")
    localStorage.removeItem("authToken")
  }
}

// Get auth token
export function getAuthToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken")
  }
  return null
}
