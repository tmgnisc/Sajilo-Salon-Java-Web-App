"use client"

import React, { useState } from "react"
import { X, Eye, EyeOff } from "lucide-react"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onSwitchToSignup: () => void
}

export default function LoginModal({ isOpen, onClose, onSwitchToSignup }: LoginModalProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle login logic here
    console.log("Login attempt:", formData)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/80" onClick={onClose}></div>
      <div className="relative bg-gray-900 p-8 rounded-lg max-w-md w-full mx-4 border border-gray-700">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close login modal"
          className="absolute top-4 right-4 text-white hover:text-gray-300"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-white text-2xl font-bold">TRIM</span>
            <div className="text-orange-500 text-2xl">✂</div>
            <span className="text-white text-2xl font-bold">STYLE</span>
          </div>
          <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
          <p className="text-gray-400 mt-2">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full bg-gray-800 border border-gray-600 text-white px-4 py-3 rounded-lg focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-colors"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full bg-gray-800 border border-gray-600 text-white px-4 py-3 rounded-lg focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-colors pr-12"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="w-4 h-4 text-orange-500 bg-gray-800 border-gray-600 rounded focus:ring-orange-500"
              />
              <span className="ml-2 text-sm text-gray-300">Remember me</span>
            </label>
            <a href="/forgot-password" className="text-sm text-orange-500 hover:text-orange-400">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToSignup}
              className="text-orange-500 hover:text-orange-400 font-semibold"
            >
              Sign up
            </button>
          </p>
        </div>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-900 text-gray-400">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-600 rounded-lg bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-700">
              <span>Google</span>
            </button>
            <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-600 rounded-lg bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-700">
              <span>Facebook</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
