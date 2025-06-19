"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, EyeOff, Mail, Lock, User, Phone, MapPin, Building, Upload, FileText } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

type UserType = "user" | "salon-owner"

export function RegisterForm() {
  const router = useRouter()
  const [userType, setUserType] = useState<UserType>("user")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userType: 'user' as UserType,
    salonName: '',
    salonType: '',
    salonAddress: '',
    salonDescription: '',
    terms: false
  })

  const [salonDocuments, setSalonDocuments] = useState<File[]>([])
  const [salonImage, setSalonImage] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.terms) {
      setError("Please accept the terms and conditions")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match")
      return
    }

    setIsLoading(true)

    try {
      const formDataToSend = new FormData()
      
      // Add basic user data
      formDataToSend.append('firstName', formData.firstName)
      formDataToSend.append('lastName', formData.lastName)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('phone', formData.phone)
      formDataToSend.append('password', formData.password)
      formDataToSend.append('confirmPassword', formData.confirmPassword)
      formDataToSend.append('userType', formData.userType)

      // Add salon data if salon owner
      if (formData.userType === 'salon-owner') {
        formDataToSend.append('salonName', formData.salonName)
        formDataToSend.append('salonType', formData.salonType)
        formDataToSend.append('salonAddress', formData.salonAddress)
        formDataToSend.append('salonDescription', formData.salonDescription)

        // Add salon image
        if (salonImage) {
          formDataToSend.append('salonImage', salonImage)
        }

        // Add salon documents
        salonDocuments.forEach((doc, index) => {
          formDataToSend.append('salonDocuments', doc)
        })
      }

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        body: formDataToSend,
      })

      const data = await response.json()

      if (response.ok) {
        // Store token and user data
        localStorage.setItem('token', data.data.token)
        localStorage.setItem('user', JSON.stringify(data.data.user))

        // Redirect based on user type
        if (formData.userType === 'salon-owner') {
          router.push('/admin')
        } else {
          router.push('/')
        }
      } else {
        setError(data.error || 'Registration failed')
      }
    } catch (error) {
      setError('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: "image" | "documents") => {
    const files = e.target.files
    if (!files) return

    if (type === "image") {
      setSalonImage(files[0])
    } else {
      setSalonDocuments(Array.from(files))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* User Type Selection */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-gray-700">Register as</Label>
        <div className="grid grid-cols-2 gap-3">
          <Card 
            className={`cursor-pointer transition-all ${
              userType === "user" 
                ? "ring-2 ring-purple-500 bg-purple-50" 
                : "hover:bg-gray-50"
            }`}
            onClick={() => {
              setUserType("user")
              handleInputChange('userType', 'user')
            }}
          >
            <CardContent className="p-4 text-center">
              <User className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <p className="font-medium text-sm">Customer</p>
              <p className="text-xs text-gray-500">Book salon services</p>
            </CardContent>
          </Card>
          <Card 
            className={`cursor-pointer transition-all ${
              userType === "salon-owner" 
                ? "ring-2 ring-purple-500 bg-purple-50" 
                : "hover:bg-gray-50"
            }`}
            onClick={() => {
              setUserType("salon-owner")
              handleInputChange('userType', 'salon-owner')
            }}
          >
            <CardContent className="p-4 text-center">
              <Building className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <p className="font-medium text-sm">Salon Owner</p>
              <p className="text-xs text-gray-500">Manage your salon</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Basic Information */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
            First Name
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="firstName"
              type="text"
              placeholder="First name"
              className="pl-10"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
            Last Name
          </Label>
          <Input
            id="lastName"
            type="text"
            placeholder="Last name"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email Address
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="pl-10"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
          Phone Number
        </Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            id="phone"
            type="tel"
            placeholder="Enter your phone number"
            className="pl-10"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            required
          />
        </div>
      </div>

      {/* Password Fields */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium text-gray-700">
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create password"
              className="pl-10 pr-10"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400" />
              )}
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
            Confirm Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              className="pl-10 pr-10"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Salon Owner Specific Fields */}
      {userType === "salon-owner" && (
        <div className="space-y-4 border-t pt-4">
          <h3 className="font-medium text-gray-900">Salon Information</h3>
          
          <div className="space-y-2">
            <Label htmlFor="salonName" className="text-sm font-medium text-gray-700">
              Salon Name
            </Label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="salonName"
                type="text"
                placeholder="Enter salon name"
                className="pl-10"
                value={formData.salonName}
                onChange={(e) => handleInputChange('salonName', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="salonType" className="text-sm font-medium text-gray-700">
              Salon Type
            </Label>
            <Select 
              value={formData.salonType} 
              onValueChange={(value) => handleInputChange('salonType', value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select salon type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hair-salon">Hair Salon</SelectItem>
                <SelectItem value="beauty-salon">Beauty Salon</SelectItem>
                <SelectItem value="spa">Spa & Wellness</SelectItem>
                <SelectItem value="nail-salon">Nail Salon</SelectItem>
                <SelectItem value="barber-shop">Barber Shop</SelectItem>
                <SelectItem value="multi-service">Multi-Service Salon</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="salonAddress" className="text-sm font-medium text-gray-700">
              Salon Address
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Textarea
                id="salonAddress"
                placeholder="Enter complete salon address"
                className="pl-10"
                rows={3}
                value={formData.salonAddress}
                onChange={(e) => handleInputChange('salonAddress', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="salonDescription" className="text-sm font-medium text-gray-700">
              Salon Description
            </Label>
            <Textarea
              id="salonDescription"
              placeholder="Describe your salon, services, and specialties"
              rows={3}
              value={formData.salonDescription}
              onChange={(e) => handleInputChange('salonDescription', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="salonImage" className="text-sm font-medium text-gray-700">
              Salon Image
            </Label>
            <div className="relative">
              <Input
                id="salonImage"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileUpload(e, "image")}
              />
              <Label
                htmlFor="salonImage"
                className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-purple-500 transition-colors"
              >
                <div className="text-center">
                  <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">
                    {salonImage ? salonImage.name : "Click to upload salon image"}
                  </p>
                </div>
              </Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="salonDocuments" className="text-sm font-medium text-gray-700">
              Salon Documents (Business License, GST Certificate, etc.)
            </Label>
            <div className="relative">
              <Input
                id="salonDocuments"
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                multiple
                className="hidden"
                onChange={(e) => handleFileUpload(e, "documents")}
              />
              <Label
                htmlFor="salonDocuments"
                className="flex items-center justify-center w-full h-20 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-purple-500 transition-colors"
              >
                <div className="text-center">
                  <FileText className="h-6 w-6 mx-auto text-gray-400 mb-1" />
                  <p className="text-sm text-gray-600">
                    {salonDocuments.length > 0 
                      ? `${salonDocuments.length} file(s) selected` 
                      : "Click to upload documents"
                    }
                  </p>
                </div>
              </Label>
            </div>
          </div>
        </div>
      )}

      {/* Terms and Conditions */}
      <div className="flex items-start space-x-2">
        <Checkbox 
          id="terms" 
          checked={formData.terms}
          onCheckedChange={(checked) => handleInputChange('terms', checked as boolean)}
          required 
        />
        <Label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
          I agree to the{" "}
          <a href="/terms" className="text-purple-600 hover:text-purple-700 font-medium">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-purple-600 hover:text-purple-700 font-medium">
            Privacy Policy
          </a>
        </Label>
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-purple-600 to-rose-500 hover:from-purple-700 hover:to-rose-600"
        disabled={isLoading}
      >
        {isLoading ? "Creating account..." : `Create ${userType === "user" ? "Account" : "Salon Account"}`}
      </Button>
    </form>
  )
} 