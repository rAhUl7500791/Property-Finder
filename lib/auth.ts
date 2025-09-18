// Simple authentication utility with hardcoded credentials
export interface User {
  email: string
  role: "agent" | "customer"
  name: string
}

const AGENT_CREDENTIALS = {
  email: "agent@gmail.com",
  password: "agent@123",
  name: "John Agent",
  role: "agent" as const,
}

export function authenticateUser(email: string, password: string): User | null {
  if (email === AGENT_CREDENTIALS.email && password === AGENT_CREDENTIALS.password) {
    return {
      email: AGENT_CREDENTIALS.email,
      name: AGENT_CREDENTIALS.name,
      role: AGENT_CREDENTIALS.role,
    }
  }
  return null
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null

  const userStr = localStorage.getItem("currentUser")
  if (!userStr) return null

  try {
    return JSON.parse(userStr)
  } catch {
    return null
  }
}

export function setCurrentUser(user: User): void {
  if (typeof window === "undefined") return
  localStorage.setItem("currentUser", JSON.stringify(user))
}

export function logout(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem("currentUser")
}
