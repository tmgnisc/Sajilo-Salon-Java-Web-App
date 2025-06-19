"use client"

import { useState } from "react"
import { Search, Filter, Star, MapPin, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { salonsData } from "@/lib/data"

export function SalonListing() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("rating")
  const [filterBy, setFilterBy] = useState("all")

  const filteredSalons = salonsData.filter(
    (salon) =>
      salon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      salon.address.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card className="bg-white/80 backdrop-blur-sm border-0">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search salons by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price">Price: Low to High</SelectItem>
                <SelectItem value="distance">Nearest First</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-full md:w-48">
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
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
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
                  src={salon.images[0] || "/placeholder.svg"}
                  alt={salon.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center">
                  <Star className="h-4 w-4 fill-amber-500 text-amber-500 mr-1" />
                  <span className="text-sm font-medium">{salon.rating}</span>
                </div>
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
                    <MapPin className="h-4 w-4 mr-2" />
                    {salon.address}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-2" />
                    {salon.openingHours} - {salon.closingHours}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Starting from{" "}
                    <span className="text-lg font-semibold text-purple-600">
                      ₹{Math.min(...salon.services.map((s) => s.price))}
                    </span>
                  </div>
                  <Button
                    className="bg-gradient-to-r from-purple-600 to-rose-500 hover:from-purple-700 hover:to-rose-600"
                    onClick={() => (window.location.href = `/salons/${salon.id}`)}
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
          <Button variant="outline" className="mt-4" onClick={() => setSearchTerm("")}>
            Clear Search
          </Button>
        </div>
      )}
    </div>
  )
}
