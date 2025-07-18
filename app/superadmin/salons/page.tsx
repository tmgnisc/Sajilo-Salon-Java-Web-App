"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Building2, 
  Search, 
  Filter, 
  CheckCircle, 
  Clock, 
  XCircle, 
  Eye, 
  MapPin, 
  Mail, 
  Phone,
  Loader2,
  RefreshCw,
  FileText
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter
} from "@/components/ui/dialog"
import { getAllSalons, getSalonById, approveSalon, rejectSalon } from "./actions"
import { useTransition } from "react"

interface Salon {
  id: string
  name: string
  address: string
  type: string
  isVerified: boolean
  owner: { firstName: string; lastName: string; email: string; phone: string }
  createdAt: string
  description?: string
  imageUrl?: string
}

export default function SuperadminSalonsPage() {
  const [salons, setSalons] = useState<Salon[]>([])
  const [filteredSalons, setFilteredSalons] = useState<Salon[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedSalonId, setSelectedSalonId] = useState<string | null>(null)
  const [salonDetails, setSalonDetails] = useState<any>(null)
  const [detailsLoading, setDetailsLoading] = useState(false)
  const [detailsError, setDetailsError] = useState("")
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    async function loadSalons() {
      setLoading(true)
      setError("")
      try {
        const data = await getAllSalons()
        setSalons(data)
      } catch (err: any) {
        setError(err.message || "Failed to load salons")
      } finally {
        setLoading(false)
      }
    }
    loadSalons()
  }, [])

  useEffect(() => {
    filterSalons()
  }, [salons, searchTerm, statusFilter, typeFilter])

  const filterSalons = () => {
    let filtered = salons
    if (searchTerm) {
      filtered = filtered.filter(salon =>
        salon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        salon.owner.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        salon.owner.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        salon.address.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    if (statusFilter !== "all") {
      filtered = filtered.filter(salon => {
        if (statusFilter === "verified") return salon.isVerified
        if (statusFilter === "pending") return !salon.isVerified
        return true
      })
    }
    if (typeFilter !== "all") {
      filtered = filtered.filter(salon => salon.type === typeFilter)
    }
    setFilteredSalons(filtered)
  }

  const openDetails = async (id: string) => {
    setSelectedSalonId(id)
    setDetailsLoading(true)
    setDetailsError("")
    try {
      const data = await getSalonById(id)
      setSalonDetails(data)
    } catch (err: any) {
      setDetailsError(err.message || "Failed to load salon details")
    } finally {
      setDetailsLoading(false)
    }
  }
  const closeDetails = () => {
    setSelectedSalonId(null)
    setSalonDetails(null)
    setDetailsError("")
  }

  const handleAction = (id: string, action: "approve" | "reject") => {
    setActionLoading(id + action)
    startTransition(async () => {
      try {
        if (action === "approve") {
          await approveSalon(id)
        } else {
          await rejectSalon(id)
        }
        // Refresh salon list
        const data = await getAllSalons()
        setSalons(data)
      } catch (err: any) {
        alert(err.message || "Action failed")
      } finally {
        setActionLoading(null)
      }
    })
  }

  const getStatusBadge = (isVerified: boolean) => {
    if (isVerified) {
      return <Badge className="bg-green-100 text-green-800 border-green-200">Verified</Badge>
    }
    return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>
  }

  const getTypeLabel = (type: string) => {
    return type.replace("_", " ").toLowerCase().replace(/\b\w/g, l => l.toUpperCase())
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-indigo-600" />
          <p className="text-gray-600">Loading salons...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Salons</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <Button onClick={async () => {
          setLoading(true)
          setError("")
          try {
            const data = await getAllSalons()
            setSalons(data)
          } catch (err: any) {
            setError(err.message || "Failed to load salons")
          } finally {
            setLoading(false)
          }
        }} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Salon Management</h1>
          <p className="text-gray-600 mt-2">Manage and approve salon applications</p>
        </div>
        <Button onClick={async () => {
          setLoading(true)
          setError("")
          try {
            const data = await getAllSalons()
            setSalons(data)
          } catch (err: any) {
            setError(err.message || "Failed to load salons")
          } finally {
            setLoading(false)
          }
        }} variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Total Salons</p>
                <p className="text-2xl font-bold text-blue-900">{salons.length}</p>
              </div>
              <Building2 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Verified</p>
                <p className="text-2xl font-bold text-green-900">
                  {salons.filter(s => s.isVerified).length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-yellow-50 to-amber-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-700">Pending</p>
                <p className="text-2xl font-bold text-yellow-900">
                  {salons.filter(s => !s.isVerified).length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-purple-50 to-pink-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">This Month</p>
                <p className="text-2xl font-bold text-purple-900">
                  {salons.filter(s => {
                    const createdAt = new Date(s.createdAt)
                    const now = new Date()
                    return createdAt.getMonth() === now.getMonth() && 
                           createdAt.getFullYear() === now.getFullYear()
                  }).length}
                </p>
              </div>
              <Building2 className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-indigo-600" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search salons, owners, or addresses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="HAIR_SALON">Hair Salon</SelectItem>
                <SelectItem value="BEAUTY_SALON">Beauty Salon</SelectItem>
                <SelectItem value="SPA">Spa</SelectItem>
                <SelectItem value="NAIL_SALON">Nail Salon</SelectItem>
                <SelectItem value="BARBER_SHOP">Barber Shop</SelectItem>
                <SelectItem value="MULTI_SERVICE">Multi-Service</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Salons ({filteredSalons.length})
          </h2>
        </div>

        {filteredSalons.length === 0 ? (
          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
            <CardContent className="p-12 text-center">
              <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No salons found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredSalons.map((salon) => (
              <Card key={salon.id} className="border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{salon.name}</h3>
                        {getStatusBadge(salon.isVerified)}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {getTypeLabel(salon.type)}
                      </Badge>
                    </div>
                    {salon.imageUrl && (
                      <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center">
                        <Building2 className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{salon.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="h-4 w-4" />
                      <span>{salon.owner.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="h-4 w-4" />
                      <span>{salon.owner.phone}</span>
                    </div>
                  </div>

                  {salon.description && (
                    <p className="text-sm text-gray-600 line-clamp-2">{salon.description}</p>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div className="text-xs text-gray-500">
                      Owner: {salon.owner.firstName} {salon.owner.lastName}
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatDate(salon.createdAt)}
                    </div>
                  </div>

                  {!salon.isVerified && (
                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        disabled={actionLoading === salon.id + "approve"}
                        onClick={() => handleAction(salon.id, "approve")}
                      >
                        {actionLoading === salon.id + "approve" ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <CheckCircle className="h-4 w-4" />
                        )}
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="flex-1"
                        disabled={actionLoading === salon.id + "reject"}
                        onClick={() => handleAction(salon.id, "reject")}
                      >
                        {actionLoading === salon.id + "reject" ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <XCircle className="h-4 w-4" />
                        )}
                        Reject
                      </Button>
                    </div>
                  )}

                  {salon.isVerified && (
                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => handleAction(salon.id, "reject")}
                        disabled={actionLoading === salon.id + "reject"}
                      >
                        {actionLoading === salon.id + "reject" ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <XCircle className="h-4 w-4" />
                        )}
                        Revoke
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1" onClick={() => openDetails(salon.id)}>
                        <Eye className="h-4 w-4" />
                        View Details
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      <Dialog open={!!selectedSalonId} onOpenChange={open => { if (!open) closeDetails() }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Salon Details</DialogTitle>
          </DialogHeader>
          {detailsLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-indigo-600" />
              <p className="text-gray-600">Loading salon details...</p>
            </div>
          ) : detailsError ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Salon</h3>
              <p className="text-gray-600 mb-4">{detailsError}</p>
              <DialogClose asChild>
                <Button className="gap-2">Close</Button>
              </DialogClose>
            </div>
          ) : salonDetails ? (
            <div>
              <div className="flex items-center gap-3 mb-4">
                {salonDetails.imageUrl ? (
                  <img src={salonDetails.imageUrl} alt={salonDetails.name} className="w-20 h-20 rounded-lg object-cover border" />
                ) : (
                  <div className="w-20 h-20 rounded-lg bg-gray-200 flex items-center justify-center">
                    <Building2 className="h-8 w-8 text-gray-400" />
                  </div>
                )}
                <span className="text-xl font-semibold">{salonDetails.name}</span>
                <Badge variant="outline" className="text-xs ml-2">{salonDetails.type}</Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <MapPin className="h-4 w-4" />
                <span>{salonDetails.address}</span>
              </div>
              {salonDetails.description && <p className="text-gray-700 mb-2">{salonDetails.description}</p>}
              <div className="pt-2 border-t">
                <h4 className="font-semibold text-gray-900 mb-2">Owner Information</h4>
                <div className="flex flex-col gap-1 text-sm text-gray-600">
                  <span><Mail className="inline h-4 w-4 mr-1" /> {salonDetails.owner?.email}</span>
                  <span><Phone className="inline h-4 w-4 mr-1" /> {salonDetails.owner?.phone}</span>
                  <span>Name: {salonDetails.owner?.firstName} {salonDetails.owner?.lastName}</span>
                </div>
              </div>
              {salonDetails.documents && salonDetails.documents.length > 0 && (
                <div className="pt-4 border-t">
                  <h4 className="font-semibold text-gray-900 mb-2">Documents</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {salonDetails.documents.map((doc: any) => (
                      <li key={doc.id} className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-400" />
                        <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{doc.name}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <DialogFooter className="mt-6">
                <DialogClose asChild>
                  <Button variant="outline">Close</Button>
                </DialogClose>
              </DialogFooter>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  )
} 