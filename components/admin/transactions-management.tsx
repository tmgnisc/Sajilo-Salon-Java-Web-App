"use client"

import { useState } from "react"
import { Search, Filter, Download, Eye, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const transactionsData = [
  {
    id: "TXN001",
    bookingId: "BK001",
    customerName: "Priya Sharma",
    customerEmail: "priya@example.com",
    service: "Hair Cut & Style",
    amount: 800,
    date: "2024-01-15",
    time: "10:30 AM",
    status: "completed",
    paymentMethod: "UPI",
  },
  {
    id: "TXN002",
    bookingId: "BK002",
    customerName: "Rahul Patel",
    customerEmail: "rahul@example.com",
    service: "Facial Treatment",
    amount: 1200,
    date: "2024-01-15",
    time: "2:00 PM",
    status: "completed",
    paymentMethod: "Card",
  },
  {
    id: "TXN003",
    bookingId: "BK003",
    customerName: "Anita Singh",
    customerEmail: "anita@example.com",
    service: "Manicure & Pedicure",
    amount: 600,
    date: "2024-01-16",
    time: "4:30 PM",
    status: "refunded",
    paymentMethod: "UPI",
  },
]

export function TransactionsManagement() {
  const [transactions] = useState(transactionsData)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null)

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700"
      case "pending":
        return "bg-yellow-100 text-yellow-700"
      case "refunded":
        return "bg-red-100 text-red-700"
      case "failed":
        return "bg-gray-100 text-gray-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getTotalRevenue = () => {
    return transactions
      .filter((t) => t.status === "completed")
      .reduce((total, transaction) => total + transaction.amount, 0)
  }

  const getRefundedAmount = () => {
    return transactions
      .filter((t) => t.status === "refunded")
      .reduce((total, transaction) => total + transaction.amount, 0)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
          <p className="text-gray-600">Track all payments and financial transactions</p>
        </div>
        <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-green-100">Total Revenue</p>
              <p className="text-2xl font-bold">₹{getTotalRevenue().toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-blue-100">Total Transactions</p>
              <p className="text-2xl font-bold">{transactions.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-red-100">Refunded</p>
              <p className="text-2xl font-bold">₹{getRefundedAmount().toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-purple-100">Success Rate</p>
              <p className="text-2xl font-bold">
                {Math.round((transactions.filter((t) => t.status === "completed").length / transactions.length) * 100)}%
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search by customer name or transaction ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card className="border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>All Transactions ({filteredTransactions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Transaction ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Customer</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Service</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Date & Time</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Payment Method</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <span className="font-mono text-sm">{transaction.id}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{transaction.customerName}</p>
                        <p className="text-sm text-gray-500">{transaction.customerEmail}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-medium text-gray-900">{transaction.service}</p>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{transaction.date}</span>
                      </div>
                      <p className="text-sm text-gray-500">{transaction.time}</p>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-semibold text-purple-600">₹{transaction.amount}</span>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="outline">{transaction.paymentMethod}</Badge>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={getStatusColor(transaction.status)}>{transaction.status}</Badge>
                    </td>
                    <td className="py-4 px-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => setSelectedTransaction(transaction)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Transaction Details</DialogTitle>
                          </DialogHeader>
                          {selectedTransaction && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium text-gray-700">Transaction ID</label>
                                  <p className="text-gray-900 font-mono">{selectedTransaction.id}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700">Booking ID</label>
                                  <p className="text-gray-900 font-mono">{selectedTransaction.bookingId}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700">Customer</label>
                                  <p className="text-gray-900">{selectedTransaction.customerName}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700">Service</label>
                                  <p className="text-gray-900">{selectedTransaction.service}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700">Amount</label>
                                  <p className="text-gray-900 font-semibold">₹{selectedTransaction.amount}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700">Payment Method</label>
                                  <p className="text-gray-900">{selectedTransaction.paymentMethod}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700">Date</label>
                                  <p className="text-gray-900">{selectedTransaction.date}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-700">Status</label>
                                  <Badge className={getStatusColor(selectedTransaction.status)}>
                                    {selectedTransaction.status}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
