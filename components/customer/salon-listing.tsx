"use client"

import { useState, useEffect } from "react"
import { Search, Filter, Star, MapPin, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Define TypeScript interface for salon data
interface Salon {
  id: string
  name: string
  address: string
  description: string
  imageUrl?: string
  services: { price: number }[]
  isPremium?: boolean // For premium filter
  location?: { lat: number; lng: number } // For distance calculation
  rating: number
}

export function SalonListing() {
  const [salons, setSalons] = useState<Salon[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<"rating" | "price" | "distance">("rating")
  const [filterBy, setFilterBy] = useState<"all" | "premium" | "budget">("all")

  useEffect(() => {
    fetchSalons()
  }, [])

  const fetchSalons = async () => {
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/salons")
      
      const data = await res.json()
      if (data.success) {
        setSalons(data.data)
      } else {
        setError(data.error || "Failed to load salons")
      }
    } catch (err) {
      setError("Failed to connect to the server. Please check your network.")
    } finally {
      setLoading(false)
    }
  }

  // Filter and sort salons
  const filteredSalons = salons
    .filter(
      (salon) =>
        salon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        salon.address.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((salon) => {
      if (filterBy === "premium") return salon.isPremium
      if (filterBy === "budget") {
        const minPrice = salon.services.length > 0 ? Math.min(...salon.services.map((s) => s.price)) : Infinity
        return minPrice < 1000 // Example threshold for budget
      }
      return true
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating
      if (sortBy === "price") {
        const aPrice = a.services.length > 0 ? Math.min(...a.services.map((s) => s.price)) : Infinity
        const bPrice = b.services.length > 0 ? Math.min(...b.services.map((s) => s.price)) : Infinity
        return aPrice - bPrice
      }
      if (sortBy === "distance") {
        // Placeholder: Requires user location and salon coordinates
        // Example: return calculateDistance(userLocation, a.location) - calculateDistance(userLocation, b.location)
        return 0
      }
      return 0
    })

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]" role="status">
        <span className="text-gray-500">Loading salons...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <span className="text-red-500">{error}</span>
        <Button variant="outline" className="ml-4" onClick={fetchSalons}>
          Retry
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card className="bg-white/80 backdrop-blur-sm border-0">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"
                aria-hidden="true"
              />
              <Input
                placeholder="Search salons by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                aria-label="Search salons"
              />
            </div>
            <Select value={sortBy} onValueChange={v => setSortBy(v as "rating" | "price" | "distance")}>
              <SelectTrigger className="w-full md:w-48" aria-label="Sort salons">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price">Price: Low to High</SelectItem>
                <SelectItem value="distance">Nearest First</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterBy} onValueChange={v => setFilterBy(v as "all" | "premium" | "budget")}>
              <SelectTrigger className="w-full md:w-48" aria-label="Filter salons">
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Salons</SelectItem>
                <SelectItem value="premium">Premium Only</SelectItem>
                <SelectItem value="budget">Budget Friendly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Showing {filteredSalons.length} salon{filteredSalons.length !== 1 ? "s" : ""}
        </p>
        <Button variant="outline" size="sm" aria-label="Open more filters">
          <Filter className="h-4 w-4 mr-2" aria-hidden="true" />
          More Filters
        </Button>
      </div>

      {/* Salon Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredSalons.map((salon) => (
          <Card
            key={salon.id}
            className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm overflow-hidden"
          >
            <div className="flex">
              <div className="relative w-48 h-48">
                <img
                  src={salon.imageUrl || "/placeholder.svg"}
                  alt={`${salon.name} salon image`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <CardContent className="flex-1 p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{salon.name}</h3>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                    {salon.services.length} Services
                  </Badge>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{salon.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-2" aria-hidden="true" />
                    {salon.address}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Starting from{" "}
                    <span className="text-lg font-semibold text-purple-600">
                      NPR {salon.services.length > 0 ? Math.min(...salon.services.map((s) => s.price)) : 0}
                    </span>
                  </div>
                  <Button
                    className="bg-gradient-to-r from-purple-600 to-rose-500 hover:from-purple-700 hover:to-rose-600"
                    onClick={() => (window.location.href = `/salons/${salon.id}`)}
                    aria-label={`Book appointment at ${salon.name}`}
                  >
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>

      {filteredSalons.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No salons found matching your criteria</p>
          <Button variant="outline" className="mt-4" onClick={() => setSearchTerm("")} aria-label="Clear search">
            Clear Search
          </Button>
        </div>
      )}
    </div>
  )
}