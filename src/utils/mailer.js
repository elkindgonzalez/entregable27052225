import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,       // tu correo
    pass: process.env.EMAIL_PASS        // tu contraseña o app password
  }
});

export async function sendEmail(to, subject, html) {
  const mailOptions = {
    from: `"Soporte" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html
  };

  await transporter.sendMail(mailOptions);
}
