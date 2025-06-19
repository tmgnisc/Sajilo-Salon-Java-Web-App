"use client"

import { useState } from "react"
import { Star, MapPin, Clock, Phone, Filter, ShoppingCart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { salonsData, categoriesData } from "@/lib/data"

interface SalonDetailsProps {
  salonId: string
}

export function SalonDetails({ salonId }: SalonDetailsProps) {
  const { toast } = useToast()
  const [cart, setCart] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const salon = salonsData.find((s) => s.id === salonId)

  if (!salon) {
    return <div className="container mx-auto px-4 py-8">Salon not found</div>
  }

  const filteredServices =
    selectedCategory === "all"
      ? salon.services
      : salon.services.filter((service) => service.categoryId === selectedCategory)

  const addToCart = (service: any) => {
    setCart([...cart, service])
    toast({
      title: "Added to cart",
      description: `${service.title} has been added to your cart`,
    })
  }

  const getTotalCartValue = () => {
    return cart.reduce((total, service) => total + service.price, 0)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image Gallery */}
          <Card className="overflow-hidden border-0 bg-white/80 backdrop-blur-sm">
            <div className="relative">
              <img
                src={salon.images[currentImageIndex] || "/placeholder.svg"}
                alt={salon.name}
                className="w-full h-64 md:h-80 object-cover"
              />
              <div className="absolute bottom-4 left-4 flex space-x-2">
                {salon.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-white/50"}`}
                  />
                ))}
              </div>
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center">
                <Star className="h-4 w-4 fill-amber-500 text-amber-500 mr-1" />
                <span className="font-medium">{salon.rating}</span>
              </div>
            </div>
          </Card>

          {/* Salon Info */}
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{salon.name}</h1>
              <p className="text-gray-600 mb-6">{salon.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-3 text-purple-600" />
                  {salon.address}
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-5 w-5 mr-3 text-purple-600" />
                  {salon.openingHours} - {salon.closingHours}
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="h-5 w-5 mr-3 text-purple-600" />
                  +91 98765 43210
                </div>
                <div className="flex items-center text-gray-600">
                  <Star className="h-5 w-5 mr-3 text-purple-600" />
                  {salon.rating} ({Math.floor(Math.random() * 500) + 100} reviews)
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Services */}
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Our Services</CardTitle>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categoriesData.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredServices.map((service) => (
                  <Card key={service.id} className="border border-gray-200 hover:border-purple-300 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900">{service.title}</h3>
                        <Badge variant="outline" className="text-purple-600 border-purple-200">
                          {service.duration} min
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-purple-600">₹{service.price}</span>
                        <Button
                          size="sm"
                          onClick={() => addToCart(service)}
                          className="bg-gradient-to-r from-purple-600 to-rose-500 hover:from-purple-700 hover:to-rose-600"
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Cart */}
        <div className="space-y-6">
          <Card className="border-0 bg-white/80 backdrop-blur-sm sticky top-24">
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Your Cart ({cart.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Your cart is empty</p>
              ) : (
                <div className="space-y-3">
                  {cart.map((service, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{service.title}</p>
                        <p className="text-xs text-gray-500">{service.duration} min</p>
                      </div>
                      <span className="font-semibold text-purple-600">₹{service.price}</span>
                    </div>
                  ))}

                  <div className="border-t pt-3 mt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-semibold">Total:</span>
                      <span className="text-xl font-bold text-purple-600">₹{getTotalCartValue()}</span>
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-purple-600 to-rose-500 hover:from-purple-700 hover:to-rose-600"
                      onClick={() => (window.location.href = "/booking")}
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
