"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Save, Upload, MapPin, Clock, Phone, Mail, Camera } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const SALON_TYPE_OPTIONS = [
  { value: "hair-salon", label: "Hair Salon", prisma: "HAIR_SALON" },
  { value: "beauty-salon", label: "Beauty Salon", prisma: "BEAUTY_SALON" },
  { value: "spa", label: "Spa & Wellness", prisma: "SPA" },
  { value: "nail-salon", label: "Nail Salon", prisma: "NAIL_SALON" },
  { value: "barber-shop", label: "Barber Shop", prisma: "BARBER_SHOP" },
  { value: "multi-service", label: "Multi-Service Salon", prisma: "MULTI_SERVICE" },
]

export function AdminSettings() {
  const { toast } = useToast()
  const [salonData, setSalonData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [salonType, setSalonType] = useState<string>("")
  const imageInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchSalon()
  }, [])

  const fetchSalon = async () => {
    setLoading(true)
    setError("")
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token")
      const res = await fetch("/api/admin/salon", {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (data.success) {
        setSalonData(data.data)
        setSalonType(mapPrismaTypeToForm(data.data.type))
        setImagePreview(data.data.imageUrl || null)
      } else {
        setError(data.error || "Failed to load salon data")
      }
    } catch (err) {
      setError("Failed to connect to the server. Please check your network.")
    } finally {
      setLoading(false)
    }
  }

  const mapPrismaTypeToForm = (prismaType: string) => {
    const found = SALON_TYPE_OPTIONS.find(opt => opt.prisma === prismaType)
    return found ? found.value : "multi-service"
  }
  const mapFormTypeToPrisma = (formType: string) => {
    const found = SALON_TYPE_OPTIONS.find(opt => opt.value === formType)
    return found ? found.prisma : "MULTI_SERVICE"
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSalonChange = (field: string, value: any) => {
    setSalonData((prev: any) => ({ ...prev, [field]: value }))
  }

  const handleSalonSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError("")
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token")
      const formData = new FormData()
      formData.append("name", salonData.name)
      formData.append("type", mapFormTypeToPrisma(salonType))
      formData.append("address", salonData.address)
      formData.append("description", salonData.description)
      if (imageFile) {
        formData.append("image", imageFile)
      }
      // Optionally add more fields (phone, email, opening/closing hours) if supported by backend
      const res = await fetch("/api/admin/salon", {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      })
      const data = await res.json()
      if (data.success) {
        setSalonData(data.data)
        setImagePreview(data.data.imageUrl || null)
        setImageFile(null)
        toast({ title: "Salon Details Updated", description: "Your salon information has been updated successfully" })
      } else {
        setError(data.error || "Failed to update salon data")
      }
    } catch (err) {
      setError("Failed to connect to the server. Please check your network.")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-[300px]">Loading salon data...</div>
  }
  if (error) {
    return <div className="flex items-center justify-center min-h-[300px] text-red-500">{error}</div>
  }
  if (!salonData) return null

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
          {/* Salon Image */}
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Camera className="h-5 w-5 mr-2" />
                Salon Image
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="relative w-48 h-48">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Salon image"
                    className="w-full h-full object-cover rounded-lg border"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    ref={imageInputRef}
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <Button
                    size="sm"
                    className="absolute bottom-2 right-2 bg-gradient-to-r from-purple-600 to-rose-500"
                    onClick={() => imageInputRef.current?.click()}
                    type="button"
                  >
                    <Upload className="h-4 w-4 mr-1" />
                    Change
                  </Button>
                </div>
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
                      onChange={e => handleSalonChange("name", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Salon Type</label>
                    <Select value={salonType} onValueChange={setSalonType} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select salon type" />
                      </SelectTrigger>
                      <SelectContent>
                        {SALON_TYPE_OPTIONS.map(opt => (
                          <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Opening Hour</label>
                    <Input
                      type="time"
                      value={salonData.openingHour || ""}
                      onChange={e => handleSalonChange("openingHour", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Closing Hour</label>
                    <Input
                      type="time"
                      value={salonData.closingHour || ""}
                      onChange={e => handleSalonChange("closingHour", e.target.value)}
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
                      onChange={e => handleSalonChange("address", e.target.value)}
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
                    onChange={e => handleSalonChange("description", e.target.value)}
                    rows={4}
                    required
                  />
                </div>
                {/* Add more fields as needed */}
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-purple-600 to-rose-500 hover:from-purple-700 hover:to-rose-600"
                    disabled={saving}
                  >
                    {saving ? "Saving..." : (<><Save className="h-4 w-4 mr-2" />Save Salon Details</>)}
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
              <form onSubmit={handleSalonSubmit} className="space-y-6">
                <div className="flex items-center space-x-6 mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-rose-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">
                      {salonData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{salonData.name}</h3>
                    <p className="text-gray-600">Salon Owner</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <Input
                      value={salonData.name}
                      onChange={(e) => handleSalonChange("name", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        type="email"
                        value={salonData.email}
                        onChange={(e) => handleSalonChange("email", e.target.value)}
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
                        value={salonData.phone}
                        onChange={(e) => handleSalonChange("phone", e.target.value)}
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
                        value={salonData.address}
                        onChange={(e) => handleSalonChange("address", e.target.value)}
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
