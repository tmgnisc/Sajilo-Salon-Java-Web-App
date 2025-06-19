"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Search, Edit, Trash2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { categoriesData } from "@/lib/data"

const servicesData = [
  {
    id: 1,
    title: "Hair Cut & Style",
    description: "Professional haircut with styling",
    price: 800,
    duration: 60,
    categoryId: "hair",
    image: "/placeholder.svg?height=100&width=100",
    active: true,
  },
  {
    id: 2,
    title: "Facial Treatment",
    description: "Deep cleansing facial treatment",
    price: 1200,
    duration: 90,
    categoryId: "facial",
    image: "/placeholder.svg?height=100&width=100",
    active: true,
  },
  {
    id: 3,
    title: "Massage Therapy",
    description: "Relaxing full body massage",
    price: 2000,
    duration: 120,
    categoryId: "massage",
    image: "/placeholder.svg?height=100&width=100",
    active: false,
  },
]

export function ServicesManagement() {
  const { toast } = useToast()
  const [services, setServices] = useState(servicesData)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingService, setEditingService] = useState<any>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    duration: "",
    categoryId: "",
    image: "",
  })

  const filteredServices = services.filter(
    (service) =>
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingService) {
      setServices(
        services.map((service) =>
          service.id === editingService.id
            ? { ...service, ...formData, price: Number(formData.price), duration: Number(formData.duration) }
            : service,
        ),
      )
      toast({ title: "Service Updated", description: "Service has been updated successfully" })
    } else {
      const newService = {
        id: Date.now(),
        ...formData,
        price: Number(formData.price),
        duration: Number(formData.duration),
        active: true,
      }
      setServices([...services, newService])
      toast({ title: "Service Added", description: "New service has been added successfully" })
    }
    resetForm()
  }

  const resetForm = () => {
    setFormData({ title: "", description: "", price: "", duration: "", categoryId: "", image: "" })
    setEditingService(null)
    setIsAddDialogOpen(false)
  }

  const handleEdit = (service: any) => {
    setEditingService(service)
    setFormData({
      title: service.title,
      description: service.description,
      price: service.price.toString(),
      duration: service.duration.toString(),
      categoryId: service.categoryId,
      image: service.image,
    })
    setIsAddDialogOpen(true)
  }

  const handleDelete = (serviceId: number) => {
    setServices(services.filter((service) => service.id !== serviceId))
    toast({ title: "Service Deleted", description: "Service has been deleted successfully" })
  }

  const toggleServiceStatus = (serviceId: number) => {
    setServices(
      services.map((service) => (service.id === serviceId ? { ...service, active: !service.active } : service)),
    )
    toast({ title: "Status Updated", description: "Service status has been updated" })
  }

  const getCategoryName = (categoryId: string) => {
    return categoriesData.find((cat) => cat.id === categoryId)?.name || "Unknown"
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Services Management</h1>
          <p className="text-gray-600">Manage your salon services and pricing</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-rose-500 hover:from-purple-700 hover:to-rose-600">
              <Plus className="h-4 w-4 mr-2" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingService ? "Edit Service" : "Add New Service"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Service Title</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Price (₹)</label>
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Duration (min)</label>
                  <Input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <Select
                  value={formData.categoryId}
                  onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoriesData.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-gradient-to-r from-purple-600 to-rose-500">
                  {editingService ? "Update" : "Add"} Service
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card className="border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <Card key={service.id} className="border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
            <div className="relative">
              <img src={service.image || "/placeholder.svg"} alt={service.title} className="w-full h-32 object-cover" />
              <Badge
                className={`absolute top-2 right-2 ${
                  service.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}
              >
                {service.active ? "Active" : "Inactive"}
              </Badge>
            </div>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{service.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{service.description}</p>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <Badge variant="outline">{getCategoryName(service.categoryId)}</Badge>
                  <span className="text-gray-500">{service.duration} min</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-purple-600">₹{service.price}</span>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(service)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleServiceStatus(service.id)}
                      className={service.active ? "text-red-600" : "text-green-600"}
                    >
                      {service.active ? "Deactivate" : "Activate"}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(service.id)} className="text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
