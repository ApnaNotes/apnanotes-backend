import { Resend } from 'resend';

const api = process.env.RESEND_API;
const resend = new Resend(api);

export async function sendWelcomeEmail(email: any) {
    try {
        await resend.emails.send({
            from: 'ApnaNotes <noreply@apnanotes.co.in>',
            to: [email],
            subject: 'Welcome to ApnaNotes!',
            html: `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Welcome to ApnaNotes</title>
</head>

<body style="margin:0;padding:0;background-color:#f4f6fb;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6fb;padding:40px 0;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.08);">

<!-- Header -->
<tr>
<td style="background:#4f46e5;padding:30px;text-align:center;">
<h1 style="color:#ffffff;margin:0;font-size:28px;">Welcome to ApnaNotes 🚀</h1>
</td>
</tr>

<!-- Body -->
<tr>
<td style="padding:40px 35px;color:#333333;line-height:1.6;font-size:16px;">

<p style="margin-top:0;">
Hey there 👋,
</p>

<p>
We're excited to have you join <strong>ApnaNotes</strong>. Your account is now ready and you can start exploring everything the platform has to offer.
</p>

<p>
Build, create, and manage your projects effortlessly. If you ever need help, our team is always here for you.
</p>

<!-- CTA Button -->
<div style="text-align:center;margin:35px 0;">
<a href="https://localhost:3000/"
style="
background:#4f46e5;
color:#ffffff;
padding:14px 28px;
text-decoration:none;
border-radius:8px;
font-weight:bold;
display:inline-block;
font-size:16px;
">
Go to Dashboard
</a>
</div>

<p>
If you didn’t create this account, you can safely ignore this email.
</p>

<p style="margin-bottom:0;">
Cheers,<br>
<strong>The ApnaNotes Team</strong>
</p>

</td>
</tr>

<!-- Footer -->
<tr>
<td style="background:#f9fafc;padding:20px;text-align:center;font-size:13px;color:#888;">
© ${new Date().getFullYear()} ApnaNotes. All rights reserved.
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
      `
        });

        console.log(`Verification email sent successfully to ${email}`);
    } catch (error) {
        console.error('Failed to send verification email:', error);
        throw error;
    }
}
