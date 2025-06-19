"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

interface Salon {
  id: string
  name: string
  address: string
  type: string
  isVerified: boolean
  owner: { firstName: string; lastName: string; email: string }
}

export default function SuperadminSalonsPage() {
  const [salons, setSalons] = useState<Salon[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  useEffect(() => {
    fetchSalons()
  }, [])

  const fetchSalons = async () => {
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/superadmin/salons")
      const data = await res.json()
      if (data.success) {
        setSalons(data.data)
      } else {
        setError(data.error || "Failed to load salons")
      }
    } catch (err) {
      setError("Failed to connect to the server. Please check your network.")
    } finally {
      setLoading(false)
    }
  }

  const handleAction = async (id: string, action: "approve" | "reject") => {
    setActionLoading(id + action)
    try {
      const res = await fetch(`/api/superadmin/salons/${id}/${action}`, { method: "POST" })
      const data = await res.json()
      if (data.success) {
        fetchSalons()
      } else {
        alert(data.error || "Action failed")
      }
    } catch {
      alert("Network error")
    } finally {
      setActionLoading(null)
    }
  }

  if (loading) return <div>Loading salons...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Salons</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Type</th>
              <th className="p-2 text-left">Address</th>
              <th className="p-2 text-left">Owner</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {salons.map((salon) => (
              <tr key={salon.id} className="border-t">
                <td className="p-2 font-medium">{salon.name}</td>
                <td className="p-2">{salon.type.replace("_", " ")}</td>
                <td className="p-2">{salon.address}</td>
                <td className="p-2">{salon.owner.firstName} {salon.owner.lastName}<br /><span className="text-xs text-gray-500">{salon.owner.email}</span></td>
                <td className="p-2">
                  {salon.isVerified ? (
                    <span className="text-green-600 font-semibold">Verified</span>
                  ) : (
                    <span className="text-yellow-600 font-semibold">Pending</span>
                  )}
                </td>
                <td className="p-2 space-x-2">
                  {!salon.isVerified && (
                    <>
                      <Button size="sm" disabled={actionLoading === salon.id + "approve"} onClick={() => handleAction(salon.id, "approve")}>Approve</Button>
                      <Button size="sm" variant="destructive" disabled={actionLoading === salon.id + "reject"} onClick={() => handleAction(salon.id, "reject")}>Reject</Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 