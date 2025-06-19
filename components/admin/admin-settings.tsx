"use client"

import type React from "react"

import { useState } from "react"
import { Save, Upload, MapPin, Clock, Phone, Mail, Camera } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

export function AdminSettings() {
  const { toast } = useToast()
  const [salonData, setSalonData] = useState({
    name: "Glamour Studio",
    description:
      "Premium salon offering luxury hair and beauty services with experienced stylists and modern facilities.",
    address: "123 Beauty Street, Bandra West, Mumbai",
    phone: "+91 98765 43210",
    email: "info@glamourstudio.com",
    openingHours: "09:00",
    closingHours: "21:00",
    images: [
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
    ],
  })

  const [ownerData, setOwnerData] = useState({
    name: "Rajesh Kumar",
    email: "rajesh@glamourstudio.com",
    phone: "+91 98765 43210",
    address: "456 Owner Street, Mumbai",
  })

  const handleSalonSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Salon Details Updated",
      description: "Your salon information has been updated successfully",
    })
  }

  const handleOwnerSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully",
    })
  }

  const handleImageUpload = (index: number) => {
    // Simulate image upload
    toast({
      title: "Image Uploaded",
      description: `Image ${index + 1} has been uploaded successfully`,
    })
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
        <p className="text-gray-600">Manage your salon and account information</p>
      </div>

      <Tabs defaultValue="salon" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="salon">Salon Settings</TabsTrigger>
          <TabsTrigger value="profile">Profile Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="salon" className="space-y-6">
          {/* Salon Images */}
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Camera className="h-5 w-5 mr-2" />
                Salon Images
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {salonData.images.map((image, index) => (
                  <div key={index} className="space-y-3">
                    <div className="relative">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Salon image ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg border"
                      />
                      <Button
                        size="sm"
                        className="absolute bottom-2 right-2 bg-gradient-to-r from-purple-600 to-rose-500"
                        onClick={() => handleImageUpload(index)}
                      >
                        <Upload className="h-4 w-4 mr-1" />
                        Change
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600 text-center">Image {index + 1}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Salon Information */}
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Salon Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSalonSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Salon Name</label>
                    <Input
                      value={salonData.name}
                      onChange={(e) => setSalonData({ ...salonData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        value={salonData.phone}
                        onChange={(e) => setSalonData({ ...salonData, phone: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      type="email"
                      value={salonData.email}
                      onChange={(e) => setSalonData({ ...salonData, email: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
                    <Textarea
                      value={salonData.address}
                      onChange={(e) => setSalonData({ ...salonData, address: e.target.value })}
                      className="pl-10"
                      rows={3}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <Textarea
                    value={salonData.description}
                    onChange={(e) => setSalonData({ ...salonData, description: e.target.value })}
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Opening Hours</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        type="time"
                        value={salonData.openingHours}
                        onChange={(e) => setSalonData({ ...salonData, openingHours: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Closing Hours</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        type="time"
                        value={salonData.closingHours}
                        onChange={(e) => setSalonData({ ...salonData, closingHours: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-purple-600 to-rose-500 hover:from-purple-700 hover:to-rose-600"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Salon Details
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="space-y-6">
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Owner Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleOwnerSubmit} className="space-y-6">
                <div className="flex items-center space-x-6 mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-rose-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">
                      {ownerData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{ownerData.name}</h3>
                    <p className="text-gray-600">Salon Owner</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <Input
                      value={ownerData.name}
                      onChange={(e) => setOwnerData({ ...ownerData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        type="email"
                        value={ownerData.email}
                        onChange={(e) => setOwnerData({ ...ownerData, email: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        value={ownerData.phone}
                        onChange={(e) => setOwnerData({ ...ownerData, phone: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        value={ownerData.address}
                        onChange={(e) => setOwnerData({ ...ownerData, address: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Security Settings</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                      <Input type="password" placeholder="Enter current password" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                        <Input type="password" placeholder="Enter new password" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                        <Input type="password" placeholder="Confirm new password" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button variant="outline">Cancel</Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-purple-600 to-rose-500 hover:from-purple-700 hover:to-rose-600"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Update Profile
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-0 bg-red-50 border-red-200">
            <CardHeader>
              <CardTitle className="text-red-700">Danger Zone</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-red-700 mb-2">Delete Account</h4>
                  <p className="text-sm text-red-600 mb-4">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <Button variant="destructive">Delete Account</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
