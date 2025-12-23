import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { verifyOtp } from "@/lib/otp";
import * as bcryptjs from "bcryptjs";
const { hash } = bcryptjs;

export async function PATCH(request) {
  const session = await auth();

  if (!session?.user?.email || !session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  const { otp, newPassword } = payload ?? {};

  if (!otp || typeof otp !== "string" || otp.length !== 6) {
    return NextResponse.json(
      { error: "Valid 6-digit OTP is required" },
      { status: 400 }
    );
  }

  if (
    !newPassword ||
    typeof newPassword !== "string" ||
    newPassword.trim().length < 8
  ) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters" },
      { status: 400 }
    );
  }

  const email = session.user.email.toLowerCase();
  const verification = await verifyOtp(email, otp);

  if (!verification.valid) {
    return NextResponse.json(
      { error: verification.reason ?? "Invalid OTP" },
      { status: 400 }
    );
  }

  const hashed = await hash(newPassword.trim(), 10);

  await prisma.user.update({
    where: { id: session.user.id },
    data: { password: hashed },
  });

  return NextResponse.json({ message: "Password updated successfully" });
}


