export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, email, phone, message, vehicleId, vehicleName } = req.body || {};

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: 'Name, email and message are required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  console.log('--- Enquiry Received ---');
  console.log({ name, email, phone, message, vehicleId, vehicleName, at: new Date().toISOString() });

  // To send real emails, install nodemailer and add SMTP env vars:
  //   npm install nodemailer
  //   EMAIL_SMTP_HOST, EMAIL_SMTP_PORT, EMAIL_SMTP_USER, EMAIL_SMTP_PASS in .env.local
  //
  // const nodemailer = require('nodemailer');
  // const transporter = nodemailer.createTransport({
  //   host: process.env.EMAIL_SMTP_HOST,
  //   port: Number(process.env.EMAIL_SMTP_PORT),
  //   auth: { user: process.env.EMAIL_SMTP_USER, pass: process.env.EMAIL_SMTP_PASS },
  // });
  // await transporter.sendMail({
  //   from: `"TG Performance" <${process.env.EMAIL_SMTP_USER}>`,
  //   to: 'mtaghip@gmail.com',
  //   subject: vehicleName ? `Enquiry: ${vehicleName}` : 'New Website Enquiry',
  //   text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`,
  // });

  res.status(200).json({ ok: true });
}
