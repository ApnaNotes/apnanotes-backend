import { Resend } from 'resend';

const api = process.env.RESEND_API;
const resend = new Resend(api);

export async function sendVerificationEmail(email: string, token: string) {
    const verificationLink = `${process.env.LOCAL_ENV_URL}/verify/${token}`;

    try {
        await resend.emails.send({
            from: 'ApnaNotes <noreply@apnanotes.co.in>',
            to: [email],
            subject: 'Verify your ApnaNotes Account',
            html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verify Your Email</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f6f9fc;">
          <div style="max-width: 560px; margin: 0 auto; padding: 40px 20px;">
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 40px;">
              <h1 style="color: #1a1a1a; font-size: 24px; font-weight: 600; margin: 0;">Welcome to ApnaNotes</h1>
              <p style="color: #666666; font-size: 16px; margin-top: 8px;">Your journey starts here</p>
            </div>
            
            <!-- Main Card -->
            <div style="background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 24px rgba(0, 0, 0, 0.05); padding: 40px; margin-bottom: 30px;">
              <h2 style="color: #1a1a1a; font-size: 20px; font-weight: 600; margin: 0 0 16px 0;">Verify your email address</h2>
              <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
                Thanks for signing up! Please verify your email address to get started with ApnaNotes. 
                This helps us ensure your account stays secure.
              </p>
              
              <!-- Button Container -->
              <div style="text-align: center; margin: 32px 0;">
                <a href="${verificationLink}" 
                   style="display: inline-block; background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: #ffffff; font-size: 16px; font-weight: 500; padding: 14px 32px; text-decoration: none; border-radius: 40px; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);">
                  Verify Email Address
                </a>
              </div>
              
              <!-- Divider -->
              <div style="border-top: 1px solid #eaeef2; margin: 32px 0;"></div>
              
              <!-- Alternative Link -->
              <p style="color: #7a7a7a; font-size: 14px; line-height: 1.6; margin: 0;">
                If the button doesn't work, copy and paste this link into your browser:
              </p>
              <div style="background-color: #f8fafc; border-radius: 8px; padding: 16px; margin-top: 12px;">
                <p style="color: #2563eb; font-size: 14px; margin: 0; word-break: break-all; font-family: monospace;">
                  ${verificationLink}
                </p>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="text-align: center; color: #8a8f95; font-size: 14px;">
              <p style="margin: 0 0 12px 0;">
                This link will expire in 24 hours. If you didn't create an account with ApnaNotes, 
                you can safely ignore this email.
              </p>
              <p style="margin: 0;">
                &copy; ${new Date().getFullYear()} ApnaNotes. All rights reserved.
              </p>
            </div>
          </div>
        </body>
        </html>
      `
        });

        console.log(`Verification email sent successfully to ${email}`);
    } catch (error) {
        console.error('Failed to send verification email:', error);
        // better error handling needed here, Mukund you can do the work here for error handling
    }
}

export async function sendResetPassLinkEmail(email: string, token: string) {
    const resetLink = `${process.env.LOCAL_ENV_URL}/reset-password/${token}`;

    try {
        await resend.emails.send({
            from: 'ApnaNotes <noreply@apnanotes.co.in>',
            to: [email],
            subject: 'Reset Your ApnaNotes Password',
            html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reset Your Password</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f6f9fc;">
          <div style="max-width: 560px; margin: 0 auto; padding: 40px 20px;">
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 40px;">
              <h1 style="color: #1a1a1a; font-size: 24px; font-weight: 600; margin: 0;">Password Reset Request</h1>
              <p style="color: #666666; font-size: 16px; margin-top: 8px;">ApnaNotes Account Security</p>
            </div>
            
            <!-- Main Card -->
            <div style="background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 24px rgba(0, 0, 0, 0.05); padding: 40px; margin-bottom: 30px;">
              <h2 style="color: #1a1a1a; font-size: 20px; font-weight: 600; margin: 0 0 16px 0;">Reset Your Password</h2>
              <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
                We received a request to reset the password for your ApnaNotes account. 
                Click the button below to create a new password. This link will expire in 1 hour.
              </p>
              
              <!-- Button Container -->
              <div style="text-align: center; margin: 32px 0;">
                <a href="${resetLink}" 
                   style="display: inline-block; background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: #ffffff; font-size: 16px; font-weight: 500; padding: 14px 32px; text-decoration: none; border-radius: 40px; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);">
                  Reset Password
                </a>
              </div>
              
              <!-- Divider -->
              <div style="border-top: 1px solid #eaeef2; margin: 32px 0;"></div>
              
              <!-- Alternative Link -->
              <p style="color: #7a7a7a; font-size: 14px; line-height: 1.6; margin: 0;">
                If the button doesn't work, copy and paste this link into your browser:
              </p>
              <div style="background-color: #f8fafc; border-radius: 8px; padding: 16px; margin-top: 12px;">
                <p style="color: #2563eb; font-size: 14px; margin: 0; word-break: break-all; font-family: monospace;">
                  ${resetLink}
                </p>
              </div>
              
              <!-- Security Note -->
              <div style="background-color: #fff3e0; border-left: 4px solid #f59e0b; border-radius: 8px; padding: 16px; margin-top: 24px;">
                <p style="color: #92400e; font-size: 14px; margin: 0;">
                  <strong>⚠️ Security Notice:</strong> If you didn't request this password reset, you can safely ignore this email. Your password will not be changed.
                </p>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="text-align: center; color: #8a8f95; font-size: 14px;">
              <p style="margin: 0 0 12px 0;">
                This password reset link will expire in 1 hour for security reasons.
                If you need to reset your password after this time, please request a new reset link.
              </p>
              <p style="margin: 0;">
                &copy; ${new Date().getFullYear()} ApnaNotes. All rights reserved.
              </p>
            </div>
          </div>
        </body>
        </html>
      `
        });

        console.log(`Password reset email sent successfully to ${email}`);
    } catch (error) {
        console.error('Failed to send password reset email:', error);
        // better error handling needed here, Mukund you can do the work here for error handling
    }
}
