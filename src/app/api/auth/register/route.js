import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import * as bcryptjs from "bcryptjs";

const { hash } = bcryptjs;

export async function POST(request) {
  try {
    const { email, password, name, phone } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Account already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 12);

    // Create user with emailVerified = null (will be verified after OTP)
    await prisma.user.create({
      data: {
        email: normalizedEmail,
        name,
        password: hashedPassword,
        phone,
        // emailVerified is null - user needs to verify via OTP
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


