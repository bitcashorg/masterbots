import Image from 'next/image'
import Link from 'next/link'

export function ErrorComponent({ message }: { message: string }) {
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

			<h1 className="text-3xl font-bold  mb-4">Oops! Something is missing</h1>
			<p className=" text-center mb-4 max-w-[480px]">{message}</p>
			<Link href="/" className="flex items-center space-x-1">
				<svg
					width="11"
					height="12"
					viewBox="0 0 11 12"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
					role="img"
					aria-label="Back arrow"
				>
					<path
						d="M7.09973 2.15008L3.24979 6.00003L7.09973 9.84998"
						stroke="#FAFAFA"
						strokeWidth="0.962486"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>{' '}
				<span>Return Home</span>
			</Link>
		</div>
	)
}
