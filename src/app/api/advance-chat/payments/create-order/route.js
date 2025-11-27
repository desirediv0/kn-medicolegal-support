import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getRazorpayInstance } from "@/lib/razorpay";

export async function POST(request) {
    const session = await auth();

    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { accessId } = await request.json();

    if (!accessId) {
        return NextResponse.json(
            { error: "accessId is required" },
            { status: 400 }
        );
    }

    const access = await prisma.advanceChatAccess.findUnique({
        where: { id: accessId },
    });

    if (!access) {
        return NextResponse.json({ error: "Access record not found" }, { status: 404 });
    }

    if (access.userId !== session.user.id) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    if (access.paymentStatus === "SUCCESS") {
        return NextResponse.json(
            { error: "Payment already completed" },
            { status: 400 }
        );
    }

    try {
        const razorpay = getRazorpayInstance();
        const amount = Number(access.amount) * 100; // Convert to paise

        const order = await razorpay.orders.create({
            amount,
            currency: "INR",
            receipt: access.id,
            notes: {
                accessId: access.id,
                userId: session.user.id,
                type: "advance_chat_access",
            },
        });

        await prisma.advanceChatAccess.update({
            where: { id: access.id },
            data: {
                razorpayOrderId: order.id,
            },
        });

        return NextResponse.json({
            order,
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        });
    } catch (error) {
        console.error("Razorpay order error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to create payment order" },
            { status: 500 }
        );
    }
}
