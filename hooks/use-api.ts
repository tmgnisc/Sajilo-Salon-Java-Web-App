import { useState, useCallback } from 'react'

interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export function useApi() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getToken = useCallback(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token') || sessionStorage.getItem('token')
    }
    return null
  }, [])

  const apiCall = useCallback(async <T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> => {
    setLoading(true)
    setError(null)

    try {
      const token = getToken()
      const headers: HeadersInit = {
        ...options.headers,
      }

      // Only set Content-Type if it's not FormData
      if (!(options.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json'
      }

      if (token) {
        headers.Authorization = `Bearer ${token}`
      }

      const response = await fetch(`/api${endpoint}`, {
        ...options,
        headers,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      return data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }, [getToken])

  return {
    apiCall,
    loading,
    error,
    clearError: () => setError(null)
  }
} 