"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Phone, Mail } from "lucide-react"

interface InquiryFormProps {
  agent: {
    name: string
    phone: string
    email: string
    image: string
  }
  propertyTitle: string
  propertyId: number
  agentUserId: number
}

export default function InquiryForm({ agent, propertyTitle, propertyId, agentUserId }: InquiryFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: `I'm interested in learning more about ${propertyTitle}. Please contact me with additional information.`,
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("http://localhost:8080/open/raise-query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.name,
          clientPhoneNumber: formData.phone,
          clientEmail: formData.email,
          message: formData.message,
          agentUserId: agentUserId.toString(),
          propertyDetailId: propertyId.toString(),
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      console.log("[v0] Query raised successfully:", result)

      alert("Thank you for your inquiry! The agent will contact you soon.")

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: `I'm interested in learning more about ${propertyTitle}. Please contact me with additional information.`,
      })
    } catch (error) {
      console.error("[v0] Error raising query:", error)
      alert("There was an error sending your inquiry. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Contact Agent</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Agent Info */}
        <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
          <img
            src={agent.image || "/placeholder.svg"}
            alt={agent.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <h4 className="font-semibold text-foreground">{agent.name}</h4>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <Phone className="h-4 w-4" />
              <span>{agent.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>{agent.email}</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Your email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Tell us about your interest in this property..."
              value={formData.message}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
            {loading ? "Sending..." : "Send Inquiry"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
