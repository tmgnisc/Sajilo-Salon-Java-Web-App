"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoginForm } from "@/components/auth/login-form"
import { RegisterForm } from "@/components/auth/register-form"

export default function AuthPage() {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-rose-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-rose-500 bg-clip-text text-transparent">
              Sajilo Salon
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account or create a new one</p>
        </div>

        {/* Auth Tabs */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login" className="text-sm font-medium">
                Sign In
              </TabsTrigger>
              <TabsTrigger value="register" className="text-sm font-medium">
                Sign Up
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="space-y-4">
              <LoginForm />
            </TabsContent>
            
            <TabsContent value="register" className="space-y-4">
              <RegisterForm />
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            By continuing, you agree to our{" "}
            <a href="/terms" className="text-purple-600 hover:text-purple-700 font-medium">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-purple-600 hover:text-purple-700 font-medium">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  )
} 