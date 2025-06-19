export interface Category {
  id: string
  name: string
  description: string
}

export interface Service {
  id: string
  title: string
  description: string
  price: number
  duration: number
  categoryId: string
  image?: string
  active?: boolean
}

export interface Salon {
  id: string
  name: string
  description: string
  address: string
  openingHours: string
  closingHours: string
  rating: number
  images: string[]
  services: Service[]
}

export interface Customer {
  name: string
  email: string
  phone: string
}

export interface Booking {
  id: number
  customer: Customer
  service: string
  date: string
  time: string
  duration: number
  price: number
  status: "pending" | "confirmed" | "completed" | "cancelled"
  salonName?: string
  address?: string
}

export interface Transaction {
  id: string
  bookingId: string
  customerName: string
  customerEmail: string
  service: string
  amount: number
  date: string
  time: string
  status: "completed" | "pending" | "refunded" | "failed"
  paymentMethod: string
}

export interface Notification {
  id: number
  type: "booking" | "reminder" | "review" | "offer" | "cancellation" | "payment" | "system"
  title: string
  message: string
  time: string
  read: boolean
  icon?: any
  priority?: "high" | "medium" | "low"
}
