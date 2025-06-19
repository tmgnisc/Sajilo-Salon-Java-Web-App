"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export default function SuperadminSalonList() {
  const [salons, setSalons] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetch('/api/superadmin/salons')
      .then(res => res.json())
      .then(data => {
        if (data.success) setSalons(data.data)
        else setError(data.error || "Failed to load salons")
      })
      .catch(() => setError("Failed to connect to server"))
      .finally(() => setLoading(false))
  }, [])

  const handleApprove = async (id) => {
    await fetch(`/api/superadmin/salons/${id}/approve`, { method: 'POST' })
    setSalons(salons => salons.map(s => s.id === id ? { ...s, isVerified: true } : s))
  }

  const handleReject = async (id) => {
    await fetch(`/api/superadmin/salons/${id}/reject`, { method: 'POST' })
    setSalons(salons => salons.map(s => s.id === id ? { ...s, isVerified: false } : s))
  }

  if (loading) return <div>Loading salons...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">All Salons</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Owner</th>
              <th className="px-4 py-2 border-b">Verified</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {salons.map((salon) => (
              <tr key={salon.id} className="text-center">
                <td className="px-4 py-2 border-b">{salon.name}</td>
                <td className="px-4 py-2 border-b">{salon.owner?.email}</td>
                <td className="px-4 py-2 border-b">{salon.isVerified ? "Yes" : "No"}</td>
                <td className="px-4 py-2 border-b space-x-2">
                  {!salon.isVerified && (
                    <Button size="sm" onClick={() => handleApprove(salon.id)}>Approve</Button>
                  )}
                  {salon.isVerified && (
                    <Button size="sm" variant="outline" onClick={() => handleReject(salon.id)}>Reject</Button>
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