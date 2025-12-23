import nodemailer from "nodemailer";

// Prefer server-side env names; fall back to NEXT_PUBLIC_* if needed
const FROM_EMAIL =
  process.env.SMTP_FROM_EMAIL ||
  process.env.NEXT_PUBLIC_FROM_EMAIL ||
  process.env.SMTP_USER ||
  process.env.NEXT_PUBLIC_SMTP_USER;
const SMTP_HOST = process.env.SMTP_HOST || process.env.NEXT_PUBLIC_SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT || process.env.NEXT_PUBLIC_SMTP_PORT || 587);
const SMTP_USER = process.env.SMTP_USER || process.env.NEXT_PUBLIC_SMTP_USER;
const SMTP_PASSWORD = process.env.SMTP_PASSWORD || process.env.NEXT_PUBLIC_SMTP_PASSWORD;

if (!FROM_EMAIL || !SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD) {
  console.warn("SMTP environment variables are missing or incomplete.");
}

const createTransporter = () =>
  nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASSWORD,
    },
  });

export async function sendOtpEmail({
  to,
  otp,
  subject = "Your Verification Code",
  text,
  html,
  replyTo,
}) {
  const transporter = createTransporter();

  const mailOptions = {
    from: FROM_EMAIL,
    to,
    replyTo,
    subject,
    text:
      text ?? `Your verification code is ${otp}. It is valid for 10 minutes.`,
    html:
      html ??
      `<p>Your verification code is <strong>${otp}</strong>.</p><p>This code will expire in 10 minutes.</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error("Email send failed:", {
      message: err?.message,
      code: err?.code,
      response: err?.response,
      command: err?.command,
    });
    throw err;
  }
}
