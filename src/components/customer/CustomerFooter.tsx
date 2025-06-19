import { Link } from "react-router-dom"
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

export default function CustomerFooter() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-rose-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-rose-400 bg-clip-text text-transparent">
                Sajilo Salon
              </span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Your trusted partner for premium beauty and wellness services. Experience luxury and convenience like
              never before.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-purple-600">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-purple-600">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-purple-600">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-purple-600">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/salons" className="text-gray-300 hover:text-purple-400 transition-colors">
                  Find Salons
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-purple-400 transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-purple-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-purple-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Popular Services</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/services/hair-care" className="text-gray-300 hover:text-purple-400 transition-colors">
                  Hair Care & Styling
                </Link>
              </li>
              <li>
                <Link to="/services/facial" className="text-gray-300 hover:text-purple-400 transition-colors">
                  Facial Treatments
                </Link>
              </li>
              <li>
                <Link to="/services/massage" className="text-gray-300 hover:text-purple-400 transition-colors">
                  Massage Therapy
                </Link>
              </li>
              <li>
                <Link to="/services/makeup" className="text-gray-300 hover:text-purple-400 transition-colors">
                  Makeup & Beauty
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Get In Touch</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-purple-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">
                    123 Beauty Street
                    <br />
                    Mumbai, Maharashtra 400001
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-purple-400 flex-shrink-0" />
                <p className="text-gray-300 text-sm">+91 98765 43210</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-purple-400 flex-shrink-0" />
                <p className="text-gray-300 text-sm">hello@sajilosalon.com</p>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-purple-400 flex-shrink-0" />
                <p className="text-gray-300 text-sm">Mon - Sun: 9:00 AM - 9:00 PM</p>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="space-y-3">
              <h4 className="text-md font-medium text-white">Stay Updated</h4>
              <p className="text-gray-300 text-sm">Subscribe to get special offers and updates</p>
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter your email"
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500"
                />
                <Button className="bg-gradient-to-r from-purple-600 to-rose-500 hover:from-purple-700 hover:to-rose-600 px-6">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-gray-400 text-sm">© 2024 Sajilo Salon. All rights reserved.</p>
              <div className="flex items-center space-x-4 text-sm">
                <Link to="/privacy" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <p className="text-gray-400 text-sm">Made with ❤️ in India</p>
              <Button
                variant="outline"
                size="sm"
                className="border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white"
              >
                <Link to="/admin">Partner Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
