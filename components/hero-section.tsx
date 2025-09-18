"use client"

import { Button } from "@/components/ui/button"
import { Search, MapPin, Home, TrendingUp } from "lucide-react"
import { useState, useEffect } from "react"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(22, 78, 99, 0.7), rgba(22, 78, 99, 0.5)), url('/modern-luxury-home-exterior-with-beautiful-landsca.jpg')`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center text-white">
        <div className={`transition-all duration-1000 ${isVisible ? "animate-fade-in-up opacity-100" : "opacity-0"}`}>
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-balance">Find Your Dream Home</h1>
          <p className="text-xl md:text-2xl mb-8 text-pretty max-w-3xl mx-auto leading-relaxed">
            Discover exceptional properties in prime locations. Your perfect home awaits with our premium real estate
            collection.
          </p>
        </div>

        <div
          className={`transition-all duration-1000 delay-300 ${isVisible ? "animate-fade-in-up opacity-100" : "opacity-0"}`}
        >
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Search className="mr-2 h-5 w-5" />
            Start Searching
          </Button>
        </div>

        {/* Stats */}
        <div
          className={`mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 delay-500 ${isVisible ? "animate-slide-in-left opacity-100" : "opacity-0"}`}
        >
          <div className="flex flex-col items-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 mb-4">
              <Home className="h-8 w-8 text-accent" />
            </div>
            <div className="text-3xl font-bold">1,200+</div>
            <div className="text-lg opacity-90">Premium Properties</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 mb-4">
              <MapPin className="h-8 w-8 text-accent" />
            </div>
            <div className="text-3xl font-bold">50+</div>
            <div className="text-lg opacity-90">Prime Locations</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 mb-4">
              <TrendingUp className="h-8 w-8 text-accent" />
            </div>
            <div className="text-3xl font-bold">98%</div>
            <div className="text-lg opacity-90">Client Satisfaction</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
