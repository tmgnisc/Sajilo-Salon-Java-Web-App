import { Routes, Route } from "react-router-dom"
import { ToastProvider } from "./components/ui/toast"

// Customer Pages
import CustomerLayout from "./layouts/CustomerLayout"
import HomePage from "./pages/customer/HomePage"
import SalonsPage from "./pages/customer/SalonsPage"
import SalonDetailPage from "./pages/customer/SalonDetailPage"
import BookingPage from "./pages/customer/BookingPage"
import ProfilePage from "./pages/customer/ProfilePage"
import NotificationsPage from "./pages/customer/NotificationsPage"

// Admin Pages
import AdminLayout from "./layouts/AdminLayout"
import AdminDashboard from "./pages/admin/AdminDashboard"
import AdminBookings from "./pages/admin/AdminBookings"
import AdminServices from "./pages/admin/AdminServices"
import AdminCategories from "./pages/admin/AdminCategories"
import AdminTransactions from "./pages/admin/AdminTransactions"
import AdminNotifications from "./pages/admin/AdminNotifications"
import AdminSettings from "./pages/admin/AdminSettings"

function App() {
  return (
    <ToastProvider>
      <Routes>
        {/* Customer Routes */}
        <Route path="/" element={<CustomerLayout />}>
          <Route index element={<HomePage />} />
          <Route path="salons" element={<SalonsPage />} />
          <Route path="salons/:id" element={<SalonDetailPage />} />
          <Route path="booking" element={<BookingPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="notifications" element={<NotificationsPage />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="transactions" element={<AdminTransactions />} />
          <Route path="notifications" element={<AdminNotifications />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </ToastProvider>
  )
}

export default App
