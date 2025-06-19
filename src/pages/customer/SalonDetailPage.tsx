"use client"
import { useParams } from "react-router-dom"
import SalonDetails from "../../components/customer/SalonDetails"

export default function SalonDetailPage() {
  const { id } = useParams<{ id: string }>()

  if (!id) {
    return <div className="container mx-auto px-4 py-8">Salon not found</div>
  }

  return <SalonDetails salonId={id} />
}
