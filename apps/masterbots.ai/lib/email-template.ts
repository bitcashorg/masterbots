interface EmailTemplateParams {
	title: string
	previewText?: string
	content: {
		greeting?: string
		mainText: string[]
		buttonText: string
		buttonUrl: string
		footerText?: string
	}
}

/**
 * Creates a base email template with consistent styling and structure
 */
function createBaseTemplate({
	title,
	previewText,
	content,
}: EmailTemplateParams): string {
	return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="x-apple-disable-message-reformatting">
        <title>${title}</title>
        ${previewText ? `<meta name="description" content="${previewText}">` : ''}
        <!--[if mso]>
        <noscript>
          <xml>
            <o:OfficeDocumentSettings>
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
          </xml>
        </noscript>
        <![endif]-->
      </head>
      <body style="
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      ">
        <table width="100%" cellpadding="0" cellspacing="0" style="
          background-color: #f8f8f8;
          border-radius: 5px;
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
        ">
          <tr>
            <td style="padding: 30px;">
              <h1 style="
                color: #4a4a4a;
                margin-bottom: 20px;
                text-align: center;
                font-size: 24px;
              ">${title}</h1>
              
              ${
								content.greeting
									? `<p style="margin-bottom: 20px;">${content.greeting}</p>`
									: ''
							}
              
              ${content.mainText
								.map((text) => `<p style="margin-bottom: 20px;">${text}</p>`)
								.join('')}
              
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                <tr>
                  <td align="center">
                    <a href="${content.buttonUrl}" 
                       style="
                         display: inline-block;
                         background-color: #007bff;
                         color: #ffffff;
                         text-decoration: none;
                         padding: 12px 30px;
                         border-radius: 5px;
                         font-weight: bold;
                       ">${content.buttonText}</a>
                  </td>
                </tr>
              </table>
              
              ${
								content.footerText
									? `<p style="margin-top: 30px; font-size: 14px; color: #777;">${content.footerText}</p>`
									: ''
							}
  
              <hr style="
                border: none;
                border-top: 1px solid #eaeaea;
                margin: 30px 0;
              ">
              
              <p style="
                font-size: 12px;
                color: #999;
                text-align: center;
              ">This is an automated message, please do not reply to this email.</p>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `
}

/**
 * Generates a password reset email template
 */
export function createPasswordResetTemplate(resetUrl: string): string {
	return createBaseTemplate({
		title: 'Password Reset Request',
		previewText: 'Reset your Masterbots password',
		content: {
			greeting: 'Hello,',
			mainText: [
				"We received a request to reset your password. If you didn't make this request, please ignore this email.",
				'To reset your password, click the button below:',
			],
			buttonText: 'Reset Password',
			buttonUrl: resetUrl,
			footerText: 'This link will expire in 1 hour for security reasons.',
		},
	})
}

/**
 * Generates an email verification template
 */
export function createVerificationTemplate(verificationUrl: string): string {
	return createBaseTemplate({
		title: 'Verify Your Email Address',
		previewText: 'Welcome to Masterbots! Please verify your email',
		content: {
			greeting: 'Welcome to Masterbots!',
			mainText: [
				'Please verify your email address to get started. Click the button below to verify your email:',
			],
			buttonText: 'Verify Email',
			buttonUrl: verificationUrl,
			footerText:
				'This link will expire in 15 days. Unverified accounts will be deleted after this period.',
		},
	})
}
