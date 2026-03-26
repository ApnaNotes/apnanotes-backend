import { Resend } from 'resend';

const api = process.env.RESEND_API;
const resend = new Resend(api);

export async function sendResetPassLinkEmail(email: string, token: string) {}
