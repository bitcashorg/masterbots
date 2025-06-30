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

		//? Get the coupon details to extract trial period information
		const coupon = promotionCode.coupon
		let trialPeriodDays = 0
		let discountInfo = ''

		if (coupon) {
			//? Check if the coupon has a trial period
			if (coupon.duration === 'repeating' && coupon.duration_in_months) {
				//? For repeating coupons, we might want to show the duration
				trialPeriodDays = 0 // Repeating coupons don't have trial periods
				discountInfo = `${coupon.percent_off ? `${coupon.percent_off}% off` : ''} for ${coupon.duration_in_months} months`
			} else if (coupon.duration === 'once') {
				//? For one-time coupons, check if there's a trial period
				trialPeriodDays = 0
				discountInfo = coupon.percent_off ? `${coupon.percent_off}% off` : 'Discount applied'
			} else if (coupon.duration === 'forever') {
				trialPeriodDays = 0
				discountInfo = coupon.percent_off ? `${coupon.percent_off}% off forever` : 'Permanent discount'
			}
		}

		//? Return the promotion code ID and trial period information if valid
		return NextResponse.json({
			valid: true,
			promotionCodeId: promotionCode.id,
			trialPeriodDays,
			discountInfo,
			couponDetails: coupon ? {
				duration: coupon.duration,
				percent_off: coupon.percent_off,
				amount_off: coupon.amount_off,
				duration_in_months: coupon.duration_in_months,
			} : null,
		})
	} catch (error) {
		console.error('Error validating promotion code:', error)
		return NextResponse.json(
			{ valid: false, error: 'Error validating promotion code' },
			{ status: 500 },
		)
	}
}
