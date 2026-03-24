import { Resend } from 'resend';

const api = process.env.RESEND_API;
const resend = new Resend(api);

export async function sendVerificationEmail(email: string, token: string) {
    const verificationLink = `${process.env.LOCAL_ENV_URL}/verify/${token}`;
}
