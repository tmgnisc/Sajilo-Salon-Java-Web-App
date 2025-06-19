import nodemailer from 'nodemailer'

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password',
  },
})

// Email templates
export const emailTemplates = {
  passwordReset: (resetLink: string, userName: string) => ({
    subject: 'Reset Your Password - Sajilo Salon',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Sajilo Salon</h1>
        </div>
        <div style="padding: 30px; background: #f9f9f9;">
          <h2 style="color: #333; margin-bottom: 20px;">Hello ${userName},</h2>
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            We received a request to reset your password for your Sajilo Salon account.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" 
               style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                      color: white; 
                      padding: 15px 30px; 
                      text-decoration: none; 
                      border-radius: 5px; 
                      display: inline-block;
                      font-weight: bold;">
              Reset Password
            </a>
          </div>
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            If you didn't request this password reset, please ignore this email. Your password will remain unchanged.
          </p>
          <p style="color: #666; line-height: 1.6;">
            This link will expire in 1 hour for security reasons.
          </p>
        </div>
        <div style="background: #333; padding: 20px; text-align: center;">
          <p style="color: #999; margin: 0; font-size: 14px;">
            © 2024 Sajilo Salon. All rights reserved.
          </p>
        </div>
      </div>
    `,
  }),

  welcomeUser: (userName: string, userType: string) => ({
    subject: `Welcome to Sajilo Salon - ${userType === 'salon-owner' ? 'Salon Owner' : 'Customer'} Account Created`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Sajilo Salon</h1>
        </div>
        <div style="padding: 30px; background: #f9f9f9;">
          <h2 style="color: #333; margin-bottom: 20px;">Welcome ${userName}! 🎉</h2>
          <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
            Thank you for joining Sajilo Salon! Your ${userType === 'salon-owner' ? 'salon owner' : 'customer'} account has been successfully created.
          </p>
          ${userType === 'salon-owner' ? `
            <div style="background: #e8f4fd; padding: 20px; border-radius: 5px; margin: 20px 0;">
              <h3 style="color: #333; margin-bottom: 10px;">Next Steps for Salon Owners:</h3>
              <ul style="color: #666; line-height: 1.6;">
                <li>Complete your salon profile</li>
                <li>Upload required documents for verification</li>
                <li>Add your services and pricing</li>
                <li>Start accepting bookings from customers</li>
              </ul>
            </div>
          ` : `
            <div style="background: #e8f4fd; padding: 20px; border-radius: 5px; margin: 20px 0;">
              <h3 style="color: #333; margin-bottom: 10px;">What you can do now:</h3>
              <ul style="color: #666; line-height: 1.6;">
                <li>Browse and search for salons near you</li>
                <li>Book appointments with your preferred salons</li>
                <li>Read reviews and ratings</li>
                <li>Manage your booking history</li>
              </ul>
            </div>
          `}
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}" 
               style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                      color: white; 
                      padding: 15px 30px; 
                      text-decoration: none; 
                      border-radius: 5px; 
                      display: inline-block;
                      font-weight: bold;">
              Get Started
            </a>
          </div>
        </div>
        <div style="background: #333; padding: 20px; text-align: center;">
          <p style="color: #999; margin: 0; font-size: 14px;">
            © 2024 Sajilo Salon. All rights reserved.
          </p>
        </div>
      </div>
    `,
  }),

  salonVerification: (salonName: string, ownerName: string, isApproved: boolean) => ({
    subject: `Salon Verification ${isApproved ? 'Approved' : 'Rejected'} - ${salonName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Sajilo Salon</h1>
        </div>
        <div style="padding: 30px; background: #f9f9f9;">
          <h2 style="color: #333; margin-bottom: 20px;">Hello ${ownerName},</h2>
          <div style="background: ${isApproved ? '#d4edda' : '#f8d7da'}; 
                      padding: 20px; 
                      border-radius: 5px; 
                      margin: 20px 0;
                      border-left: 4px solid ${isApproved ? '#28a745' : '#dc3545'};">
            <h3 style="color: ${isApproved ? '#155724' : '#721c24'}; margin-bottom: 10px;">
              ${isApproved ? '✅ Salon Verification Approved' : '❌ Salon Verification Rejected'}
            </h3>
            <p style="color: ${isApproved ? '#155724' : '#721c24'}; line-height: 1.6;">
              ${isApproved 
                ? `Congratulations! Your salon "${salonName}" has been verified and approved. You can now start accepting bookings from customers.`
                : `We're sorry, but your salon "${salonName}" verification has been rejected. Please review the requirements and submit again.`
              }
            </p>
          </div>
          ${isApproved ? `
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/admin" 
                 style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                        color: white; 
                        padding: 15px 30px; 
                        text-decoration: none; 
                        border-radius: 5px; 
                        display: inline-block;
                        font-weight: bold;">
                Go to Dashboard
              </a>
            </div>
          ` : `
            <p style="color: #666; line-height: 1.6;">
              If you have any questions about the rejection, please contact our support team.
            </p>
          `}
        </div>
        <div style="background: #333; padding: 20px; text-align: center;">
          <p style="color: #999; margin: 0; font-size: 14px;">
            © 2024 Sajilo Salon. All rights reserved.
          </p>
        </div>
      </div>
    `,
  }),
}

// Email sending function
export async function sendEmail(to: string, subject: string, html: string): Promise<boolean> {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to,
      subject,
      html,
    }

    await transporter.sendMail(mailOptions)
    return true
  } catch (error) {
    console.error('Email sending failed:', error)
    return false
  }
}

// Specific email functions
export async function sendPasswordResetEmail(email: string, resetLink: string, userName: string): Promise<boolean> {
  const template = emailTemplates.passwordReset(resetLink, userName)
  return sendEmail(email, template.subject, template.html)
}

export async function sendWelcomeEmail(email: string, userName: string, userType: string): Promise<boolean> {
  const template = emailTemplates.welcomeUser(userName, userType)
  return sendEmail(email, template.subject, template.html)
}

export async function sendSalonVerificationEmail(
  email: string, 
  salonName: string, 
  ownerName: string, 
  isApproved: boolean
): Promise<boolean> {
  const template = emailTemplates.salonVerification(salonName, ownerName, isApproved)
  return sendEmail(email, template.subject, template.html)
} 