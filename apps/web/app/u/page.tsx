import { redirect } from 'next/navigation'

export default async function MainProfilePageDefaultRedirect() {
	// Redirect to home page
	return redirect('/')
}
