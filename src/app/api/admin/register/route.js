import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import * as bcryptjs from "bcryptjs";

const { hash } = bcryptjs;

const ADMIN_SECRET = process.env.ADMIN_REGISTRATION_SECRET;
const ADMIN_EMAIL = "admin@knmedicolegal.com";
const ADMIN_PASSWORD = "KnM@8Lg!";

export async function POST(request) {
  if (!ADMIN_SECRET) {
    return NextResponse.json(
      { error: "Admin registration is disabled (secret not set)" },
      { status: 503 }
    );
  }

  const authHeader = request.headers.get("x-admin-key");
  if (!authHeader || authHeader !== ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Fixed admin details
  const lowerEmail = ADMIN_EMAIL.toLowerCase();

  const existing = await prisma.user.findUnique({ where: { email: lowerEmail } });
  if (existing) {
    return NextResponse.json(
      { error: "Admin already exists", email: lowerEmail },
      { status: 409 }
    );
  }

  const hashed = await hash(ADMIN_PASSWORD, 12);

  const user = await prisma.user.create({
    data: {
      email: lowerEmail,
      name: "Admin",
      phone: null,
      password: hashed,
      role: "ADMIN",
      emailVerified: new Date(),
    },
    select: {
      id: true,
      email: true,
      role: true,
      name: true,
      createdAt: true,
    },
  });

  return NextResponse.json({
    user,
    generatedPassword: ADMIN_PASSWORD,
  });
}
