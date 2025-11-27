import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET - Fetch current Advance Chat pricing (public)
export async function GET() {
  try {
    const pricing = await prisma.advanceChatPricing.findFirst({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });

    if (!pricing) {
      // Return default pricing if none exists
      return NextResponse.json({
        amount: 0,
        currency: "INR",
        description: "Advance Chat access not configured yet",
        isActive: false,
      });
    }

    return NextResponse.json({
      amount: Number(pricing.amount),
      currency: pricing.currency,
      description: pricing.description,
      isActive: pricing.isActive,
    });
  } catch (error) {
    console.error("Error fetching advance chat pricing:", error);
    return NextResponse.json(
      { error: "Failed to fetch pricing" },
      { status: 500 }
    );
  }
}

// PATCH - Update Advance Chat pricing (admin only)
export async function PATCH(request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const data = await request.json();
    const { amount, currency, description } = data;

    if (amount == null || isNaN(Number(amount)) || Number(amount) < 0) {
      return NextResponse.json(
        { error: "Valid amount is required" },
        { status: 400 }
      );
    }

    // Deactivate all existing pricing
    await prisma.advanceChatPricing.updateMany({
      where: { isActive: true },
      data: { isActive: false },
    });

    // Create new pricing entry
    const pricing = await prisma.advanceChatPricing.create({
      data: {
        amount: Number(amount),
        currency: currency || "INR",
        description: description || null,
        isActive: true,
        updatedById: session.user.id,
      },
    });

    return NextResponse.json({
      amount: Number(pricing.amount),
      currency: pricing.currency,
      description: pricing.description,
      isActive: pricing.isActive,
      updatedAt: pricing.updatedAt,
    });
  } catch (error) {
    console.error("Error updating advance chat pricing:", error);
    return NextResponse.json(
      { error: "Failed to update pricing" },
      { status: 500 }
    );
  }
}
