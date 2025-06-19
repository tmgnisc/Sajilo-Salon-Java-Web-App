"use client"
import { useNavigate } from "react-router-dom"
import { Star, MapPin, Clock } from "lucide-react"
import { Card, CardContent } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { salonsData } from "../../data"

export default function FeaturedSalons() {
  const navigate = useNavigate()
  const featuredSalons = salonsData.slice(0, 6)

  return (
    <section className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Salons</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover our handpicked selection of premium salons offering exceptional services
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredSalons.map((salon) => (
          <Card
            key={salon.id}
            className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm overflow-hidden"
          >
            <div className="relative">
              <img
                src={salon.images[0] || "/placeholder.svg?height=200&width=300"}
                alt={salon.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <Badge className="absolute top-4 left-4 bg-gradient-to-r from-purple-600 to-rose-500">Featured</Badge>
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center">
                <Star className="h-4 w-4 fill-amber-500 text-amber-500 mr-1" />
                <span className="text-sm font-medium">{salon.rating}</span>
              </div>
            </div>

            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{salon.name}</h3>
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
                  From <span className="text-lg font-semibold text-purple-600">₹{salon.services[0]?.price}</span>
                </div>
                <Button
                  className="bg-gradient-to-r from-purple-600 to-rose-500 hover:from-purple-700 hover:to-rose-600"
                  onClick={() => navigate(`/salons/${salon.id}`)}
                >
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <Button
          variant="outline"
          size="lg"
          className="border-purple-200 text-purple-600 hover:bg-purple-50"
          onClick={() => navigate("/salons")}
        >
          View All Salons
        </Button>
      </div>
    </section>
  )
}
