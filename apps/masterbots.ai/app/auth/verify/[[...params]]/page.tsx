'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function EmailVerificationPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const [timeLeft, setTimeLeft] = useState(5)
  const [verificationStatus, setVerificationStatus] = useState<
    'pending' | 'success' | 'error'
  >('pending')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (!token) {
      console.error('No token found in URL parameters')
      setVerificationStatus('error')
      setErrorMessage('No verification token found')
      return
    }
    const verifyEmail = async () => {
      try {
        console.log('Attempting to verify email with token:', token)
        const response = await fetch('/api/auth/verify-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token })
        })

        const data = await response.json()

       if (response.ok) {
          console.log('Email verification successful:', data)
          setVerificationStatus('success')
          const timer = setInterval(() => {
            setTimeLeft(prev => {
              if (prev <= 1) {
                clearInterval(timer)
                //* Redirect to signin for security reasons instead of chat
                router.push('/auth/signin?verified=true')
              }
              return prev - 1
            })
          }, 1000)

          return () => clearInterval(timer)
        // biome-ignore lint/style/noUselessElse: <explanation>
        } else {
          console.error('Verification failed:', data)
          setVerificationStatus('error')
          setErrorMessage(data.error || 'Verification failed')
        }
      } catch (error) {
        console.error('Error during verification:', error)
        setVerificationStatus('error')
        setErrorMessage('An error occurred during verification')
      }
    }

    verifyEmail()
  }, [token, router])

  return (
    <div className="container flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md p-6 space-y-4">
        {verificationStatus === 'pending' && (
          <div className="text-center">
            <h2 className="mb-4 text-2xl font-bold">Verifying Your Email</h2>
            <p>Please wait while we verify your email address...</p>
          </div>
        )}

        {verificationStatus === 'success' && (
          <div className="text-center">
            <h2 className="mb-4 text-2xl font-bold">Email Verified!</h2>
            <p className="mb-4">Your email has been successfully verified.</p>
            <p className="mb-4">Redirecting to signin in {timeLeft} seconds...</p>
            <Button onClick={() => router.push('/chat')}>Go to Chat Now</Button>
          </div>
        )}

        {verificationStatus === 'error' && (
          <div className="text-center">
            <h2 className="mb-4 text-2xl font-bold">Verification Failed</h2>
            <p className="mb-4 text-red-500">{errorMessage}</p>
            <Button onClick={() => router.push('/auth/signin')}>
              Return to Sign In
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}