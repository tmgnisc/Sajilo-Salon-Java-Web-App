import { SalonDetails } from "@/components/customer/salon-details"

export default function SalonDetailPage({ params }: { params: { id: string } }) {
  return <SalonDetails salonId={params.id} />
}
