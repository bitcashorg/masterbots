import nodemailer from 'nodemailer'
import {
	createPasswordResetTemplate,
	createVerificationTemplate,
} from './email-template'

// * Get the app URL based on the environment for the password reset link
export function getAppUrl(): string {
	switch (process.env.NEXT_PUBLIC_APP_ENV) {
		case 'prod':
			return 'https://masterbots.ai'
		case 'test':
			return 'https://dev.masterbots.ai'
		default:
			return 'http://localhost:3000'
	}
}

let transporter: nodemailer.Transporter

if (process.env.NEXT_PUBLIC_APP_ENV === 'prod') {
	// TODO temporaly sendgrid configuration need to be updated for the chosen email provider
	transporter = nodemailer.createTransport({
		host: 'smtp.sendgrid.net',
		port: 587,
		auth: {
			user: 'apikey',
			pass: process.env.SENDGRID_API_KEY,
		},
	})
} else {
	// * Mailtrap configuration for development on local and test environments
	transporter = nodemailer.createTransport({
		host: 'sandbox.smtp.mailtrap.io',
		port: 2525,
		auth: {
			user: process.env.MAILTRAP_USER,
			pass: process.env.MAILTRAP_PASS,
		},
	})
}

export async function sendPasswordResetEmail(
	email: string,
	resetToken: string,
): Promise<void> {
	const baseUrl = getAppUrl()
	const resetUrl = `${baseUrl}/auth/reset-password?token=${resetToken}`

	const mailOptions = {
		from: process.env.EMAIL_FROM,
		to: email,
		subject: 'Masterbots Password Reset Request',
		html: createPasswordResetTemplate(resetUrl),
	}
	try {
		await transporter.sendMail(mailOptions)
		console.log(`Password reset email sent to ${email}`)
	} catch (error) {
		console.error('Error sending password reset email:', error)
	}
}

export async function testEmailConfig() {
	try {
		await transporter.verify()
		console.log('Email configuration is correct')
		return true
	} catch (error) {
		console.error('Email configuration error:', error)
		return false
	}
}

// * Send email verification link to user
export async function sendEmailVerification(
	email: string,
	verificationToken: string,
	subject = 'Verify Your Email Address - Masterbots',
) {
	const baseUrl = getAppUrl()
	const verificationUrl = `${baseUrl}/auth/verify?token=${verificationToken}`

	const mailOptions = {
		from: process.env.EMAIL_FROM,
		to: email,
		subject,
		html: createVerificationTemplate(verificationUrl),
	}

	try {
		await transporter.sendMail(mailOptions)
		console.log(`Verification email sent to ${email}`)
	} catch (error) {
		console.error('Error sending verification email:', error)
		throw new Error('Failed to send verification email')
	}
}
