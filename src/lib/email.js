import nodemailer from "nodemailer";

const {
  NEXT_PUBLIC_FROM_EMAIL,
  NEXT_PUBLIC_SMTP_HOST,
  NEXT_PUBLIC_SMTP_PORT = 587,
  NEXT_PUBLIC_SMTP_USER,
  NEXT_PUBLIC_SMTP_PASSWORD,
} = process.env;

if (
  !NEXT_PUBLIC_FROM_EMAIL ||
  !NEXT_PUBLIC_SMTP_HOST ||
  !NEXT_PUBLIC_SMTP_USER ||
  !NEXT_PUBLIC_SMTP_PASSWORD
) {
  console.warn("SMTP environment variables are missing or incomplete.");
}

const createTransporter = () =>
  nodemailer.createTransport({
    host: NEXT_PUBLIC_SMTP_HOST,
    port: Number(NEXT_PUBLIC_SMTP_PORT),
    secure: Number(NEXT_PUBLIC_SMTP_PORT) === 465,
    auth: {
      user: NEXT_PUBLIC_SMTP_USER,
      pass: NEXT_PUBLIC_SMTP_PASSWORD,
    },
  });

export async function sendOtpEmail({
  to,
  otp,
  subject = "Your Verification Code",
  text,
  html,
}) {
  const transporter = createTransporter();

  const mailOptions = {
    from: NEXT_PUBLIC_FROM_EMAIL,
    to,
    subject,
    text:
      text ?? `Your verification code is ${otp}. It is valid for 10 minutes.`,
    html:
      html ??
      `<p>Your verification code is <strong>${otp}</strong>.</p><p>This code will expire in 10 minutes.</p>`,
  };

  await transporter.sendMail(mailOptions);
}
