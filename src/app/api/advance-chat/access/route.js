import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET - Check if user has active Advance Chat access
export async function GET() {
    const session = await auth();

    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const access = await prisma.advanceChatAccess.findFirst({
            where: {
                userId: session.user.id,
                paymentStatus: "SUCCESS",
                OR: [
                    { expiryDate: null }, // Lifetime access
                    { expiryDate: { gt: new Date() } }, // Not expired
                ],
            },
            orderBy: { createdAt: "desc" },
        });

        if (!access) {
            return NextResponse.json({
                hasAccess: false,
                message: "No active Advance Chat access found",
            });
        }

        return NextResponse.json({
            hasAccess: true,
            access: {
                purchaseDate: access.purchaseDate,
                expiryDate: access.expiryDate,
                amount: Number(access.amount),
            },
        });
    } catch (error) {
        console.error("Error checking advance chat access:", error);
        return NextResponse.json(
            { error: "Failed to check access" },
            { status: 500 }
        );
    }
}

// POST - Initiate Advance Chat access purchase (creates pending access record)
export async function POST(request) {
    const session = await auth();

    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        // Check if user already has active access
        const existingAccess = await prisma.advanceChatAccess.findFirst({
            where: {
                userId: session.user.id,
                paymentStatus: "SUCCESS",
                OR: [
                    { expiryDate: null },
                    { expiryDate: { gt: new Date() } },
                ],
            },
        });

        if (existingAccess) {
            return NextResponse.json(
                { error: "You already have active Advance Chat access" },
                { status: 400 }
            );
        }

        // Get current pricing
        const pricing = await prisma.advanceChatPricing.findFirst({
            where: { isActive: true },
            orderBy: { createdAt: "desc" },
        });

        if (!pricing) {
            return NextResponse.json(
                { error: "Advance Chat pricing not configured" },
                { status: 400 }
            );
        }

        if (Number(pricing.amount) <= 0) {
            // Free access - grant immediately
            const access = await prisma.advanceChatAccess.create({
                data: {
                    userId: session.user.id,
                    amount: 0,
                    paymentStatus: "NOT_REQUIRED",
                    expiryDate: null, // Lifetime
                },
            });

            return NextResponse.json({
                success: true,
                requiresPayment: false,
                access: {
                    id: access.id,
                    hasAccess: true,
                },
            });
        }

        // Create pending access record (will be updated after payment)
        const access = await prisma.advanceChatAccess.create({
            data: {
                userId: session.user.id,
                amount: pricing.amount,
                paymentStatus: "PENDING",
                expiryDate: null, // Lifetime access
            },
        });

        return NextResponse.json({
            success: true,
            requiresPayment: true,
            access: {
                id: access.id,
                amount: Number(access.amount),
                currency: pricing.currency,
            },
        });
    } catch (error) {
        console.error("Error initiating advance chat access:", error);
        return NextResponse.json(
            { error: "Failed to initiate access purchase" },
            { status: 500 }
        );
    }
}
