import { Outlet } from "react-router-dom"
import CustomerNavbar from "../components/customer/CustomerNavbar"
import CustomerFooter from "../components/customer/CustomerFooter"

export default function CustomerLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-rose-50">
      <CustomerNavbar />
      <main>
        <Outlet />
      </main>
      <CustomerFooter />
    </div>
  )
}
