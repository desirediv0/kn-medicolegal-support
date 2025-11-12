import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { deleteObject } from "@/lib/storage";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      phone: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ user });
}

export async function PATCH(request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const currentUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { image: true },
  });

  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload" },
      { status: 400 }
    );
  }

  const updates = {};

  if (typeof payload.name === "string") {
    const trimmed = payload.name.trim();
    if (trimmed.length < 2) {
      return NextResponse.json(
        { error: "Name must be at least 2 characters" },
        { status: 400 }
      );
    }
    updates.name = trimmed.slice(0, 120);
  }

  if (typeof payload.phone === "string") {
    const trimmedPhone = payload.phone.trim();
    if (trimmedPhone.length > 0 && !/^[0-9+\-()\s]{6,20}$/.test(trimmedPhone)) {
      return NextResponse.json(
        { error: "Enter a valid phone number" },
        { status: 400 }
      );
    }
    updates.phone = trimmedPhone.length ? trimmedPhone : null;
  }

  if (typeof payload.image === "string") {
    const normalized = payload.image.trim();
    if (normalized.length === 0) {
      updates.image = null;
    } else if (!normalized.startsWith("http")) {
      return NextResponse.json({ error: "Invalid image URL" }, { status: 400 });
    } else {
      updates.image = normalized;
    }
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json(
      { error: "No valid fields provided" },
      { status: 400 }
    );
  }

  const user = await prisma.user.update({
    where: { id: session.user.id },
    data: updates,
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      phone: true,
      role: true,
      updatedAt: true,
    },
  });

  if (currentUser?.image && currentUser.image !== user.image) {
    try {
      await deleteObject(currentUser.image);
    } catch (error) {
      console.warn("Failed to delete previous avatar", error);
    }
  }

  return NextResponse.json({ user });
}
