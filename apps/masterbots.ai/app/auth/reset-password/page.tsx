'use client'

import { Suspense } from 'react'
import ResetPasswordForm from '@/components/auth/reset-password-form'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function ResetPasswordPage({
  searchParams
}: {
  searchParams: { token: string }
}) {
  return (
    <motion.div
      className="flex flex-col min-h-[calc(100vh-4rem)] items-center py-6 sm:py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Logo container with animation */}
      <motion.div
        className="w-full max-w-[320px] sm:max-w-[500px] md:max-w-[726px] relative aspect-[726/200] mb-6 sm:mb-10"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Image
          src="/images/masterbotslogo.png"
          fill
          priority
          alt="Masterbots Logo"
          className="object-contain"
        />
      </motion.div>

      {/* Form container with animation and enhanced responsiveness */}
      <motion.div
        className="w-full max-w-[min(100%,400px)] px-4 space-y-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
          <h1 className="mb-4 text-2xl font-bold">Reset Password</h1>
          <Suspense fallback={<div>Loading...</div>}>
            <ResetPasswordForm token={searchParams.token} />
          </Suspense>
      </motion.div>
    </motion.div>
  )
}
