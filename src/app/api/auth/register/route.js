import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { subMinutes } from "date-fns";

export async function POST(request) {
  try {
    const { email, password, name, phone } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase();

    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Account already exists" },
        { status: 409 }
      );
    }

    const otpRecord = await prisma.emailOtp.findFirst({
      where: {
        email: normalizedEmail,
        consumed: true,
        createdAt: {
          gte: subMinutes(new Date(), 15),
        },
      },
      orderBy: { createdAt: "desc" },
    });

    if (!otpRecord) {
      return NextResponse.json(
        { error: "OTP verification required" },
        { status: 403 }
      );
    }

    const hashedPassword = await hash(password, 12);

    await prisma.user.create({
      data: {
        email: normalizedEmail,
        name,
        password: hashedPassword,
        phone,
        emailVerified: new Date(),
      },
    });

    return NextResponse.json({ message: "Account created" });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Failed to create account" },
      { status: 500 }
    );
  }
}

