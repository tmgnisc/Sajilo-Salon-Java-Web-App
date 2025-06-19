import { ReactNode } from "react"
import Link from "next/link"

export default function SuperadminLayout({ children }: { children: ReactNode }) {
  // TODO: Add role-based protection here if needed
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow px-6 py-4 flex gap-6 items-center">
        <Link href="/superadmin" className="font-bold text-lg text-purple-700">Superadmin Dashboard</Link>
        <Link href="/superadmin/salons" className="text-gray-700 hover:text-purple-700">Salons</Link>
      </nav>
      <main className="max-w-5xl mx-auto p-6">{children}</main>
    </div>
  )
} 