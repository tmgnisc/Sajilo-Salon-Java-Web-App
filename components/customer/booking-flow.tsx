"use client"

import { useEffect, useState } from "react"
import { Calendar, Clock, CreditCard, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { useToast } from "@/hooks/use-toast"
import { createBooking } from "@/app/customer/booking/actions"

export function BookingFlow() {
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState("")
  const [cart, setCart] = useState<any[]>([])
  const [salon, setSalon] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [bookedSlots, setBookedSlots] = useState<string[]>([])

  useEffect(() => {
    // Read cart and salonId from localStorage
    const cartData = localStorage.getItem("booking_cart")
    const salonId = localStorage.getItem("booking_salonId")
    if (!cartData || !salonId) {
      setError("No booking cart or salon selected.")
      setLoading(false)
      return
    }
    setCart(JSON.parse(cartData))
    // Fetch salon info
    async function fetchSalon() {
      setLoading(true)
      try {
        const res = await fetch(`/api/salons/${salonId}`)
        const data = await res.json()
        if (data.success) {
          setSalon(data.data)
        } else {
          setError(data.error || "Salon not found")
        }
      } catch {
        setError("Failed to connect to the server. Please check your network.")
      } finally {
        setLoading(false)
      }
    }
    fetchSalon()
  }, [])

  useEffect(() => {
    if (!salon || !selectedDate) return
    async function fetchBookingsAndSlots() {
      // Fetch bookings for this salon and date
      const dateStr = selectedDate.toISOString().split('T')[0]
      const res = await fetch(`/api/salons/${salon.id}/bookings?date=${dateStr}`)
      const data = await res.json()
      const booked = data.success ? data.data.map((b: any) => b.time) : []
      setBookedSlots(booked)
      // Generate slots between openingHour and closingHour
      const slots: string[] = []
      const opening = salon.openingHour || "09:00"
      const closing = salon.closingHour || "18:00"
      let [h, m] = opening.split(":").map(Number)
      let [ch, cm] = closing.split(":").map(Number)
      while (h < ch || (h === ch && m < cm)) {
        const slot = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
        slots.push(slot)
        m += 30
        if (m >= 60) { h++; m = 0 }
      }
      setAvailableSlots(slots)
    }
    fetchBookingsAndSlots()
  }, [salon, selectedDate])

  const timeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
  ]

  const unavailableSlots = ["10:30", "14:00", "16:30"]

  const handleBooking = async () => {
    // Get userId (for demo, from localStorage; in real app, from session/auth)
    const user = localStorage.getItem("user")
    const userId = user ? JSON.parse(user).id : null
    if (!userId) {
      toast({ title: "Error", description: "User not logged in." })
      return
    }
    try {
      const res = await createBooking({
        userId,
        salonId: salon.id,
        serviceIds: cart.map((s) => s.id),
        date: selectedDate?.toISOString() || new Date().toISOString(),
        time: selectedTime,
        totalAmount: getTotalPrice(),
        notes: ""
      })
      if (res.success) {
        toast({
          title: "Booking Confirmed!",
          description: "Your appointment has been successfully booked.",
        })
        setStep(4)
        localStorage.removeItem("booking_cart")
        localStorage.removeItem("booking_salonId")
      } else {
        toast({ title: "Booking Failed", description: res.error || "Unknown error" })
      }
    } catch (e: any) {
      toast({ title: "Booking Failed", description: e.message || "Unknown error" })
    }
  }

  const getTotalPrice = () => cart.reduce((total, service) => total + service.price, 0)
  const getTotalDuration = () => cart.reduce((total, service) => total + service.duration, 0)

  if (loading) {
    return <div className="flex items-center justify-center h-64"><span>Loading...</span></div>
  }
  if (error || !salon) {
    return <div className="container mx-auto px-4 py-8">{error || "Salon not found"}</div>
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        {[1, 2, 3, 4].map((stepNumber) => (
          <div key={stepNumber} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= stepNumber
                  ? "bg-gradient-to-r from-purple-600 to-rose-500 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {step > stepNumber ? <CheckCircle className="h-5 w-5" /> : stepNumber}
            </div>
            {stepNumber < 4 && (
              <div
                className={`w-16 h-1 mx-2 ${
                  step > stepNumber ? "bg-gradient-to-r from-purple-600 to-rose-500" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      {step === 1 && (
        <Card className="border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Select Date
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date() || date.getDay() === 0}
                className="rounded-md border"
              />
            </div>
            <div className="flex justify-end mt-6">
              <Button
                onClick={() => setStep(2)}
                disabled={!selectedDate}
                className="bg-gradient-to-r from-purple-600 to-rose-500 hover:from-purple-700 hover:to-rose-600"
              >
                Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card className="border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Select Time Slot
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-6">
              {availableSlots.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  disabled={bookedSlots.includes(time)}
                  onClick={() => setSelectedTime(time)}
                  className={
                    selectedTime === time
                      ? "bg-gradient-to-r from-purple-600 to-rose-500 hover:from-purple-700 hover:to-rose-600"
                      : ""
                  }
                >
                  {time}
                </Button>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button
                onClick={() => setStep(3)}
                disabled={!selectedTime}
                className="bg-gradient-to-r from-purple-600 to-rose-500 hover:from-purple-700 hover:to-rose-600"
              >
                Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Booking Summary */}
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Salon Details</h3>
                <p className="text-gray-600">{salon.name}</p>
                <p className="text-sm text-gray-500">{salon.address}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Services</h3>
                {cart.map((service) => (
                  <div key={service.id} className="flex justify-between items-center py-2">
                    <div>
                      <p className="font-medium">{service.title}</p>
                      <p className="text-sm text-gray-500">{service.duration} minutes</p>
                    </div>
                    <span className="font-semibold">NPR {service.price}</span>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="font-semibold mb-2">Date & Time</h3>
                <p className="text-gray-600">{selectedDate?.toDateString()}</p>
                <p className="text-gray-600">{selectedTime}</p>
                <Badge variant="outline" className="mt-1">
                  Total Duration: {getTotalDuration()} minutes
                </Badge>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total Amount:</span>
                  <span className="text-purple-600">NPR {getTotalPrice()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment */}
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Payment Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-purple-50 to-rose-50 rounded-lg">
                <p className="text-center text-gray-600 mb-4">Payment integration will be implemented here</p>
                <div className="space-y-2 text-sm text-gray-500">
                  <p>• Secure payment processing</p>
                  <p>• Multiple payment options</p>
                  <p>• Instant confirmation</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button
                  onClick={handleBooking}
                  className="bg-gradient-to-r from-purple-600 to-rose-500 hover:from-purple-700 hover:to-rose-600"
                >
                  Confirm Booking
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {step === 4 && (
        <Card className="border-0 bg-white/80 backdrop-blur-sm text-center">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
            <p className="text-gray-600 mb-6">
              Your appointment has been successfully booked. You will receive a confirmation email shortly.
            </p>
            <div className="space-y-2 mb-6">
              <p>
                <strong>Booking ID:</strong> #BK{Math.floor(Math.random() * 10000)}
              </p>
              <p>
                <strong>Date:</strong> {selectedDate?.toDateString()}
              </p>
              <p>
                <strong>Time:</strong> {selectedTime}
              </p>
            </div>
            <div className="flex gap-4 justify-center">
              <Button variant="outline" onClick={() => (window.location.href = "/profile")}>
                View Bookings
              </Button>
              <Button
                onClick={() => (window.location.href = "/")}
                className="bg-gradient-to-r from-purple-600 to-rose-500 hover:from-purple-700 hover:to-rose-600"
              >
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
