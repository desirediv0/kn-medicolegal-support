import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createOtp } from "@/lib/otp";
import { sendOtpEmail } from "@/lib/email";

export async function POST() {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const email = session.user.email.toLowerCase();
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const { otp, expiresAt } = await createOtp(email);

  await sendOtpEmail({
    to: email,
    otp,
    subject: "Password change verification code",
    text: `Use the verification code ${otp} to confirm your password update. It will expire in 10 minutes.`,
    html: `<p>Use the verification code <strong>${otp}</strong> to confirm your password update.</p><p>This code will expire in 10 minutes.</p>`,
  });

  return NextResponse.json({
    message: "OTP sent successfully",
    expiresAt,
  });
}
