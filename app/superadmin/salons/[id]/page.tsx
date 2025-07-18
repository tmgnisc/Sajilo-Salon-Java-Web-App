"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Loader2, MapPin, Mail, Phone, Building2, FileText } from "lucide-react"

export default function SuperadminSalonDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const { id } = params
  const [salon, setSalon] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!id) return
    const fetchSalon = async () => {
      setLoading(true)
      setError("")
      try {
        const res = await fetch(`/api/superadmin/salons/${id}`)
        const data = await res.json()
        if (data.success) {
          setSalon(data.data)
        } else {
          setError(data.error || "Failed to load salon details")
        }
      } catch {
        setError("Failed to connect to the server. Please check your network.")
      } finally {
        setLoading(false)
      }
    }
    fetchSalon()
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-indigo-600" />
        <p className="text-gray-600">Loading salon details...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Salon</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <Button onClick={() => router.back()} className="gap-2">
          Go Back
        </Button>
      </div>
    )
  }

  if (!salon) return null

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            {salon.imageUrl ? (
              <img src={salon.imageUrl} alt={salon.name} className="w-20 h-20 rounded-lg object-cover border" />
            ) : (
              <div className="w-20 h-20 rounded-lg bg-gray-200 flex items-center justify-center">
                <Building2 className="h-8 w-8 text-gray-400" />
              </div>
            )}
            <span>{salon.name}</span>
            <Badge variant="outline" className="text-xs ml-2">{salon.type}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>{salon.address}</span>
          </div>
          {salon.description && <p className="text-gray-700">{salon.description}</p>}
          <div className="pt-4 border-t">
            <h4 className="font-semibold text-gray-900 mb-2">Owner Information</h4>
            <div className="flex flex-col gap-1 text-sm text-gray-600">
              <span><Mail className="inline h-4 w-4 mr-1" /> {salon.owner?.email}</span>
              <span><Phone className="inline h-4 w-4 mr-1" /> {salon.owner?.phone}</span>
              <span>Name: {salon.owner?.firstName} {salon.owner?.lastName}</span>
            </div>
          </div>
          {salon.documents && salon.documents.length > 0 && (
            <div className="pt-4 border-t">
              <h4 className="font-semibold text-gray-900 mb-2">Documents</h4>
              <ul className="list-disc pl-5 space-y-1">
                {salon.documents.map((doc: any) => (
                  <li key={doc.id} className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-gray-400" />
                    <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{doc.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
      <div className="mt-6 text-center">
        <Button variant="outline" onClick={() => router.back()}>Back to Salon List</Button>
      </div>
    </div>
  )
} 