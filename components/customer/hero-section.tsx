"use client"

import { useState } from "react"
import { Search, MapPin, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.location.href = `/salons?city=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <section className="relative py-20 px-4">
      <div className="container mx-auto text-center">
        {/* Hero Content */}
        <div className="max-w-4xl mx-auto mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-600 via-rose-500 to-amber-500 bg-clip-text text-transparent">
              Beautiful You
            </span>
            <br />
            <span className="text-gray-900">Starts Here</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover premium salons in your city and book your favorite services with just a few clicks. Experience
            luxury and convenience like never before.
          </p>

          {/* Search Bar */}
          <Card className="max-w-2xl mx-auto shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="Enter your city name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 border-0 bg-gray-50 focus:bg-white transition-colors"
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  />
                </div>
                <Button
                  onClick={handleSearch}
                  className="h-12 px-8 bg-gradient-to-r from-purple-600 to-rose-500 hover:from-purple-700 hover:to-rose-600"
                >
                  <Search className="h-5 w-5 mr-2" />
                  Search Salons
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
            <div className="text-gray-600">Premium Salons</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-rose-500 mb-2">50K+</div>
            <div className="text-gray-600">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <span className="text-3xl font-bold text-amber-500 mr-2">4.9</span>
              <Star className="h-6 w-6 fill-amber-500 text-amber-500" />
            </div>
            <div className="text-gray-600">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  )
}
