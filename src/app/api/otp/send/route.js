import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createOtp } from "@/lib/otp";
import { sendOtpEmail } from "@/lib/email";
import { subSeconds } from "date-fns";

const RESEND_COOLDOWN_SECONDS = 60; // 60 seconds cooldown between resends

export async function POST(request) {
  try {
    const { email, resend = false, type = "signup" } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase();

    // Check if user already exists (only for new signups, not resends or reset/verify)
    if (!resend && type === "signup") {
      const existingUser = await prisma.user.findUnique({
        where: { email: normalizedEmail },
      });

      if (existingUser) {
        return NextResponse.json(
          { error: "Account already exists" },
          { status: 409 }
        );
      }
    }

    // For reset/verify type, check if user exists
    if (type === "reset" || type === "verify") {
      const existingUser = await prisma.user.findUnique({
        where: { email: normalizedEmail },
      });

      if (!existingUser) {
        return NextResponse.json(
          { error: "No account found with this email" },
          { status: 404 }
        );
      }
    }

    // Check rate limiting for resend
    if (resend) {
      const recentOtp = await prisma.emailOtp.findFirst({
        where: {
          email: normalizedEmail,
          createdAt: {
            gte: subSeconds(new Date(), RESEND_COOLDOWN_SECONDS),
          },
        },
        orderBy: { createdAt: "desc" },
      });

      if (recentOtp) {
        const secondsLeft = Math.ceil(
          (new Date(recentOtp.createdAt).getTime() + RESEND_COOLDOWN_SECONDS * 1000 - new Date().getTime()) / 1000
        );
        return NextResponse.json(
          {
            error: `Please wait ${secondsLeft} seconds before requesting a new OTP`,
            cooldownSeconds: secondsLeft
          },
          { status: 429 }
        );
      }
    }

    const { otp, expiresAt } = await createOtp(normalizedEmail);
    await sendOtpEmail({ to: normalizedEmail, otp });

    return NextResponse.json({
      message: resend ? "OTP resent successfully" : "OTP sent successfully",
      expiresAt,
    });
  } catch (error) {
    console.error("OTP send error:", error);
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}

