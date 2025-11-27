import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const GENERAL_PRICE_KEY = "questionPrice";
const ADVANCE_PRICE_KEY = "advanceQuestionPrice";

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [generalSetting, advanceSetting] = await Promise.all([
    prisma.setting.findUnique({ where: { key: GENERAL_PRICE_KEY } }),
    prisma.setting.findUnique({ where: { key: ADVANCE_PRICE_KEY } }),
  ]);

  return NextResponse.json({
    questionPrice: generalSetting ? Number(generalSetting.value) : 0,
    advanceQuestionPrice: advanceSetting ? Number(advanceSetting.value) : 0,
  });
}

export async function PATCH(request) {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();
  const { questionPrice, advanceQuestionPrice } = body;

  // Validate and update General Chat price if provided
  if (questionPrice !== undefined) {
    if (typeof questionPrice !== "number" || questionPrice < 0) {
      return NextResponse.json(
        { error: "questionPrice must be a positive number" },
        { status: 400 }
      );
    }

    await prisma.setting.upsert({
      where: { key: GENERAL_PRICE_KEY },
      update: {
        value: questionPrice.toString(),
        updatedById: session.user.id,
      },
      create: {
        key: GENERAL_PRICE_KEY,
        value: questionPrice.toString(),
        updatedById: session.user.id,
      },
    });
  }

  // Validate and update Advance Chat price if provided
  if (advanceQuestionPrice !== undefined) {
    if (typeof advanceQuestionPrice !== "number" || advanceQuestionPrice < 0) {
      return NextResponse.json(
        { error: "advanceQuestionPrice must be a positive number" },
        { status: 400 }
      );
    }

    await prisma.setting.upsert({
      where: { key: ADVANCE_PRICE_KEY },
      update: {
        value: advanceQuestionPrice.toString(),
        updatedById: session.user.id,
      },
      create: {
        key: ADVANCE_PRICE_KEY,
        value: advanceQuestionPrice.toString(),
        updatedById: session.user.id,
      },
    });
  }

  // Return updated values
  const [generalSetting, advanceSetting] = await Promise.all([
    prisma.setting.findUnique({ where: { key: GENERAL_PRICE_KEY } }),
    prisma.setting.findUnique({ where: { key: ADVANCE_PRICE_KEY } }),
  ]);

  return NextResponse.json({
    questionPrice: generalSetting ? Number(generalSetting.value) : 0,
    advanceQuestionPrice: advanceSetting ? Number(advanceSetting.value) : 0,
  });
}
