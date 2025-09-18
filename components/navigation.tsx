"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, Home, User, LogOut } from "lucide-react"
import { getCurrentUser, logout } from "@/lib/auth"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setUser(getCurrentUser())
  }, [])

  const handleLogout = () => {
    logout()
    setUser(null)
    router.push("/")
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-primary rounded-lg p-2">
              <Home className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className={`text-xl font-bold transition-colors ${isScrolled ? "text-primary" : "text-white"}`}>
              DreamHomes
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`font-medium transition-colors hover:text-accent ${
                isScrolled ? "text-foreground" : "text-white"
              }`}
            >
              Home
            </Link>
            <Link
              href="/properties"
              className={`font-medium transition-colors hover:text-accent ${
                isScrolled ? "text-foreground" : "text-white"
              }`}
            >
              Properties
            </Link>
            <Link
              href="/about"
              className={`font-medium transition-colors hover:text-accent ${
                isScrolled ? "text-foreground" : "text-white"
              }`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`font-medium transition-colors hover:text-accent ${
                isScrolled ? "text-foreground" : "text-white"
              }`}
            >
              Contact
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className={`text-sm ${isScrolled ? "text-foreground" : "text-white"}`}>Welcome, {user.name}</span>
                {user.role === "agent" && (
                  <Link href="/dashboard">
                    <Button
                      variant="ghost"
                      className={`transition-colors ${
                        isScrolled ? "text-foreground hover:text-accent" : "text-white hover:text-accent"
                      }`}
                    >
                      Dashboard
                    </Button>
                  </Link>
                )}
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className={`transition-colors ${
                    isScrolled ? "text-foreground hover:text-accent" : "text-white hover:text-accent"
                  }`}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className={`transition-colors ${
                      isScrolled ? "text-foreground hover:text-accent" : "text-white hover:text-accent"
                    }`}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">Sign Up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className={`md:hidden ${isScrolled ? "text-foreground" : "text-white"}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/" className="block px-3 py-2 text-foreground hover:text-accent font-medium">
                Home
              </Link>
              <Link href="/properties" className="block px-3 py-2 text-foreground hover:text-accent font-medium">
                Properties
              </Link>
              <Link href="/about" className="block px-3 py-2 text-foreground hover:text-accent font-medium">
                About
              </Link>
              <Link href="/contact" className="block px-3 py-2 text-foreground hover:text-accent font-medium">
                Contact
              </Link>
              {user ? (
                <div className="px-3 py-2 space-y-2">
                  <p className="text-sm text-muted-foreground">Welcome, {user.name}</p>
                  {user.role === "agent" && (
                    <Link href="/dashboard">
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        Dashboard
                      </Button>
                    </Link>
                  )}
                  <Button onClick={handleLogout} variant="outline" size="sm" className="w-full bg-transparent">
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex space-x-2 px-3 py-2">
                  <Link href="/login" className="flex-1">
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      Login
                    </Button>
                  </Link>
                  <Link href="/signup" className="flex-1">
                    <Button size="sm" className="w-full bg-accent hover:bg-accent/90">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
