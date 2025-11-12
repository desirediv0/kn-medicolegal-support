import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const PRICE_KEY = "questionPrice";

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const setting = await prisma.setting.findUnique({
    where: { key: PRICE_KEY },
  });

  return NextResponse.json({
    questionPrice: setting ? Number(setting.value) : 0,
  });
}

export async function PATCH(request) {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { questionPrice } = await request.json();

  if (typeof questionPrice !== "number" || questionPrice < 0) {
    return NextResponse.json(
      { error: "questionPrice must be a positive number" },
      { status: 400 }
    );
  }

  const updated = await prisma.setting.upsert({
    where: { key: PRICE_KEY },
    update: {
      value: questionPrice.toString(),
      updatedById: session.user.id,
    },
    create: {
      key: PRICE_KEY,
      value: questionPrice.toString(),
      updatedById: session.user.id,
    },
  });

  return NextResponse.json({
    questionPrice: Number(updated.value),
  });
}

