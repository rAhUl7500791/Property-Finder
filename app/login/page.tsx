"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { authenticateUser, setCurrentUser } from "@/lib/auth"
import { Navigation } from "@/components/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    console.log("[v0] Login form submitted with:", { email, password: "***" })

    try {
      const user = await authenticateUser(email, password)
      console.log("[v0] Authentication result:", user)

      if (user) {
        setCurrentUser(user)
        console.log("[v0] User set, redirecting to dashboard")
        router.push("/dashboard")
      } else {
        console.log("[v0] No user returned from authentication")
        setError("Invalid email or password")
      }
    } catch (err) {
      console.error("[v0] Login error:", err)
      setError("Login failed. Please check your credentials and try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
              <CardDescription>Sign in to your account to continue</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Signing in..." : "Sign In"}
                </Button>

                <div className="text-center space-y-2">
                  <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot your password?
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link href="/signup" className="text-primary hover:underline">
                      Sign up
                    </Link>
                  </p>
                </div>

                {/* <div className="mt-6 p-4 bg-muted rounded-lg">
                  <p className="text-sm font-medium mb-2">Demo Credentials:</p>
                  <p className="text-xs text-muted-foreground">
                    Email: Agent@test.com
                    <br />
                    Password: Test@123
                  </p>
                </div> */}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
