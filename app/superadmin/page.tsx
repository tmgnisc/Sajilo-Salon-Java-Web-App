import Link from "next/link"

export default function SuperadminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Superadmin Dashboard</h1>
      <div className="mb-8 text-gray-600">Welcome, Superadmin! Here you can manage all salons and platform activity.</div>
      <div className="space-y-4">
        <Link href="/superadmin/salons" className="block p-4 bg-white rounded shadow hover:bg-purple-50 transition">
          <span className="font-semibold">Review & Approve Salons</span>
        </Link>
        {/* Add more dashboard links/stats here as needed */}
      </div>
    </div>
  )
} 