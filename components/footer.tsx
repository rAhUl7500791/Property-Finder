"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Home, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { useState } from "react"

export function Footer() {
  const [email, setEmail] = useState("")

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log("Newsletter subscription:", email)
    setEmail("")
  }

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-accent rounded-lg p-2">
                <Home className="h-6 w-6 text-accent-foreground" />
              </div>
              <span className="text-2xl font-bold">DreamHomes</span>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">
              Your trusted partner in finding the perfect home. We specialize in premium properties in the most
              desirable locations.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="h-10 w-10 p-0 hover:bg-primary-foreground/10">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="h-10 w-10 p-0 hover:bg-primary-foreground/10">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="h-10 w-10 p-0 hover:bg-primary-foreground/10">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="h-10 w-10 p-0 hover:bg-primary-foreground/10">
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-primary-foreground/80 hover:text-accent transition-colors">
                Home
              </Link>
              <Link href="/properties" className="block text-primary-foreground/80 hover:text-accent transition-colors">
                Properties
              </Link>
              <Link href="/about" className="block text-primary-foreground/80 hover:text-accent transition-colors">
                About Us
              </Link>
              <Link href="/contact" className="block text-primary-foreground/80 hover:text-accent transition-colors">
                Contact
              </Link>
              <Link href="/blog" className="block text-primary-foreground/80 hover:text-accent transition-colors">
                Blog
              </Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <div className="space-y-2">
              <Link href="/buy" className="block text-primary-foreground/80 hover:text-accent transition-colors">
                Buy Property
              </Link>
              <Link href="/sell" className="block text-primary-foreground/80 hover:text-accent transition-colors">
                Sell Property
              </Link>
              <Link href="/rent" className="block text-primary-foreground/80 hover:text-accent transition-colors">
                Rent Property
              </Link>
              <Link href="/valuation" className="block text-primary-foreground/80 hover:text-accent transition-colors">
                Property Valuation
              </Link>
              <Link href="/mortgage" className="block text-primary-foreground/80 hover:text-accent transition-colors">
                Mortgage Services
              </Link>
            </div>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Get In Touch</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-accent" />
                <span className="text-primary-foreground/80">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-accent" />
                <span className="text-primary-foreground/80">info@dreamhomes.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-accent mt-1" />
                <span className="text-primary-foreground/80">
                  123 Real Estate Ave
                  <br />
                  New York, NY 10001
                </span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="font-semibold mb-3">Newsletter</h4>
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
                  required
                />
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-primary-foreground/80 text-sm">© 2024 DreamHomes. All rights reserved.</div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-primary-foreground/80 hover:text-accent transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-primary-foreground/80 hover:text-accent transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-primary-foreground/80 hover:text-accent transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
