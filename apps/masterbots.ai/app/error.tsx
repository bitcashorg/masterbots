'use client' 
import Link from 'next/link'
import Image from 'next/image'

export default function Error({
  error
}: {
  error: Error & { digest?: string }
}) {
  console.log('Error:', error.message)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-80 h-80 md:w-96 md:h-96 relative">
        <Image
          src="/images/404.png"
          alt="404 Not Found"
          layout="fill"
          objectFit="contain"
          className="w-full h-full"
        />
      </div>
      <h1 className="text-3xl font-bold  mb-4">Oops! Page Not Found</h1>
      <p className=" text-center mb-4">{error.message}.</p>
      <Link href="/" className='flex items-center space-x-1'>
        <svg
          width="11"
          height="12"
          viewBox="0 0 11 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.09973 2.15008L3.24979 6.00003L7.09973 9.84998"
            stroke="#FAFAFA"
            stroke-width="0.962486"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>{' '}
        <span >Return Home</span>
        
      </Link>
    </div>
  )
}
