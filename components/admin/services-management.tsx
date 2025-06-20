"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Plus, Search, Edit, Trash2, Loader2, Scissors } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useApi } from "@/hooks/use-api"

interface Service {
  id: string
  name: string
  description: string | null
  price: number
  duration: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export function ServicesManagement() {
  const { toast } = useToast()
  const { apiCall, loading, error } = useApi()
  const [services, setServices] = useState<Service[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
  })

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    const response = await apiCall<Service[]>('/admin/services')
    if (response.success && response.data) {
      setServices(response.data)
    } else {
      toast({
        title: "Error",
        description: response.error || "Failed to load services",
        variant: "destructive"
      })
    }
  }

  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (service.description && service.description.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (editingService) {
        // Update service
        const response = await apiCall<Service>('/admin/services', {
          method: 'PUT',
          body: JSON.stringify({
            id: editingService.id,
            name: formData.name,
            description: formData.description,
            price: formData.price,
            duration: formData.duration,
            isActive: editingService.isActive
          })
        })

        if (response.success && response.data) {
          setServices(services.map(service => 
            service.id === editingService.id ? response.data! : service
          ))
          toast({ title: "Service Updated", description: "Service has been updated successfully" })
          resetForm()
        } else {
          toast({
            title: "Update Failed",
            description: response.error || "Failed to update service",
            variant: "destructive"
          })
        }
      } else {
        // Create service
        const response = await apiCall<Service>('/admin/services', {
          method: 'POST',
          body: JSON.stringify({
            name: formData.name,
            description: formData.description,
            price: formData.price,
            duration: formData.duration
          })
        })

        if (response.success && response.data) {
          setServices([response.data, ...services])
          toast({ title: "Service Added", description: "New service has been added successfully" })
          resetForm()
        } else {
          toast({
            title: "Creation Failed",
            description: response.error || "Failed to create service",
            variant: "destructive"
          })
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({ name: "", description: "", price: "", duration: "" })
    setEditingService(null)
    setIsAddDialogOpen(false)
  }

  const handleEdit = (service: Service) => {
    setEditingService(service)
    setFormData({
      name: service.name,
      description: service.description || "",
      price: service.price.toString(),
      duration: service.duration.toString(),
    })
    setIsAddDialogOpen(true)
  }

  const handleDelete = async (serviceId: string) => {
    const response = await apiCall(`/admin/services?id=${serviceId}`, {
      method: 'DELETE'
    })

    if (response.success) {
      setServices(services.filter((service) => service.id !== serviceId))
      toast({ title: "Service Deleted", description: "Service has been deleted successfully" })
    } else {
      toast({
        title: "Deletion Failed",
        description: response.error || "Failed to delete service",
        variant: "destructive"
      })
    }
  }

  const toggleServiceStatus = async (service: Service) => {
    const response = await apiCall<Service>('/admin/services', {
      method: 'PUT',
      body: JSON.stringify({
        id: service.id,
        name: service.name,
        description: service.description,
        price: service.price,
        duration: service.duration,
        isActive: !service.isActive
      })
    })

    if (response.success && response.data) {
      setServices(services.map(s => s.id === service.id ? response.data! : s))
      toast({ title: "Status Updated", description: "Service status has been updated" })
    } else {
      toast({
        title: "Update Failed",
        description: response.error || "Failed to update service status",
        variant: "destructive"
      })
    }
  }

  if (loading && services.length === 0) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading services...</span>
        </div>
      </div>
    )
  }

  if (error && services.length === 0) {
    return (
      <div className="p-6">
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={fetchServices}>Retry</Button>
        </div>
      </div>
    )
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
                <label className="block text-sm font-medium mb-2">Service Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                  <label className="block text-sm font-medium mb-2">Price (NPR)</label>
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
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      {editingService ? "Updating..." : "Creating..."}
                    </>
                  ) : (
                    editingService ? "Update Service" : "Add Service"
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search services..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Services List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <Card key={service.id} className="border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{service.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-purple-600 font-medium">NPR {service.price}</span>
                    <span className="text-gray-500">{service.duration} min</span>
                  </div>
                </div>
                <Badge className={service.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}>
                  {service.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleServiceStatus(service)}
                  className={service.isActive ? "text-red-600 border-red-200" : "text-green-600 border-green-200"}
                >
                  {service.isActive ? "Deactivate" : "Activate"}
                </Button>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(service)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(service.id)}
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-12">
          <Scissors className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">
            {searchTerm ? "No services found matching your search." : "No services added yet."}
          </p>
          {!searchTerm && (
            <Button 
              onClick={() => setIsAddDialogOpen(true)}
              className="bg-gradient-to-r from-purple-600 to-rose-500 hover:from-purple-700 hover:to-rose-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Service
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
