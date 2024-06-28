'use client' 
import Link from 'next/link'
import Image from 'next/image'

export default function Error({
  error
}: {
  error: Error & { digest?: string }
}) {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="relative size-80 md:size-96">
        <Image
          src="/images/404.png"
          alt="404 Not Found"
          layout="fill"
          objectFit="contain"
          className="size-full"
        />
      </div>
      <h1 className="mb-4 text-3xl font-bold">Oops! Page Not Found</h1>
      <p className="mb-4 text-center ">{error.message}</p>
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
            strokeWidth="0.962486"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>{' '}
        <span >Return Home</span>
        
      </Link>
    </div>
  )
}
