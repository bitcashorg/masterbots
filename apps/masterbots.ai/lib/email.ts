import { createTransport } from 'nodemailer'


const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: 'brandon@bitcash.org',
    pass: 'Pies3.14'
  }
  })

export async function sendPasswordResetEmail(
  email: string,
  resetToken: string
) {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${resetToken}`

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Password Reset Request',
    html: `
      <p>You requested a password reset. Click the link below to reset your password:</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>If you didn't request this, please ignore this email.</p>
    `
  }

  await transporter.sendMail(mailOptions)
}
