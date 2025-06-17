import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: '2024-04-10',
})

export async function POST(request: Request) {
	try {
		const { promoCode } = await request.json()

		if (!promoCode) {
			return NextResponse.json(
				{ valid: false, error: 'Promotion code is required' },
				{ status: 400 },
			)
		}

		//? Retrieve the promotion codes from Stripe
		const promotionCodes = await stripe.promotionCodes.list({
			code: promoCode,
			active: true,
		})

		if (promotionCodes.data.length === 0) {
			return NextResponse.json(
				{ valid: false, error: 'Invalid promotion code' },
				{ status: 400 },
			)
		}

		const promotionCode = promotionCodes.data[0]

		//? Checks if the promotion code is still valid
		if (!promotionCode.active) {
			return NextResponse.json(
				{ valid: false, error: 'Promotion code is no longer active' },
				{ status: 400 },
			)
		}

		//? Checks if the promotion code has reached its maximum redemptions
		if (
			promotionCode.max_redemptions &&
			promotionCode.times_redeemed >= promotionCode.max_redemptions
		) {
			return NextResponse.json(
				{
					valid: false,
					error: 'Promotion code has reached its maximum redemptions',
				},
				{ status: 400 },
			)
		}

		//? Return the promotion code ID if valid
		return NextResponse.json({
			valid: true,
			promotionCodeId: promotionCode.id,
		})
	} catch (error) {
		console.error('Error validating promotion code:', error)
		return NextResponse.json(
			{ valid: false, error: 'Error validating promotion code' },
			{ status: 500 },
		)
	}
}
