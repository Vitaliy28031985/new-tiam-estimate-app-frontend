'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import authService from '@/app/utils/auth.service'

export default function CallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
      async function handleCallback() {
        
      try {
        const code = searchParams.get('code')
        if (code) {
            const user = await authService.handleGoogleCallback(code)
            console.log(user);
          if (user) {
            router.push('/dashboard') // Redirect to your dashboard or home page
          }
        }
      } catch (error) {
        console.error('Error during callback:', error)
        router.push('/login') // Redirect to login page on error
      }
    }
console.log("user")
    handleCallback()
  }, [router, searchParams])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  )
}
