import nodemailer from 'nodemailer'

// * Get the app URL based on the environment for the password reset link
function getAppUrl(): string {
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
      pass: process.env.SENDGRID_API_KEY
    }
  })
} else {
  // * Mailtrap configuration for development on local and test environments
  transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS
    }
  })
}

export async function sendPasswordResetEmail(
  email: string,
  resetToken: string
): Promise<void> {
  const baseUrl = getAppUrl()
  const resetUrl = `${baseUrl}/auth/reset-password?token=${resetToken}`

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Masterbots Password Reset Request',
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f8f8; border-radius: 5px;">
          <tr>
            <td style="padding: 30px;">
              <h1 style="color: #4a4a4a; margin-bottom: 20px; text-align: center;">Masterbots Password Reset Request</h1>
              <p style="margin-bottom: 20px;">Hello,</p>
              <p style="margin-bottom: 20px;">We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
              <p style="margin-bottom: 30px;">To reset your password, click the button below:</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="${resetUrl}" style="display: inline-block; background-color: #007bff; color: #ffffff; text-decoration: none; padding: 12px 30px; border-radius: 5px; font-weight: bold;">Reset Password</a>
                  </td>
                </tr>
              </table>
              <p style="margin-top: 30px; font-size: 14px; color: #777;">This link will expire in 1 hour for security reasons.</p>
              <p style="margin-top: 30px; font-size: 14px; color: #777;">If you're having trouble clicking the button, copy and paste the URL below into your web browser:</p>
              <p style="margin-top: 10px; font-size: 14px; word-break: break-all;">
                <a href="${resetUrl}" style="color: #007bff;">${resetUrl}</a>
              </p>
              <hr style="border: none; border-top: 1px solid #eaeaea; margin: 30px 0;">
              <p style="font-size: 12px; color: #999; text-align: center;">This is an automated message, please do not reply to this email.</p>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `
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
