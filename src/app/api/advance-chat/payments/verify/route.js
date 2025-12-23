import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import * as crypto from "crypto";

const { NEXT_PUBLIC_RAZORPAY_KEY_SECRET } = process.env;

export async function POST(request) {
    const session = await auth();

    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { accessId, razorpayPaymentId, razorpayOrderId, razorpaySignature } =
        await request.json();

    if (!accessId || !razorpayPaymentId || !razorpayOrderId || !razorpaySignature) {
        return NextResponse.json(
            { error: "Missing payment parameters" },
            { status: 400 }
        );
    }

    if (!NEXT_PUBLIC_RAZORPAY_KEY_SECRET) {
        return NextResponse.json(
            { error: "Razorpay secret not configured" },
            { status: 500 }
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

    // Verify signature
    const expectedSignature = crypto
        .createHmac("sha256", NEXT_PUBLIC_RAZORPAY_KEY_SECRET)
        .update(`${razorpayOrderId}|${razorpayPaymentId}`)
        .digest("hex");

    if (expectedSignature !== razorpaySignature) {
        await prisma.advanceChatAccess.update({
            where: { id: access.id },
            data: {
                paymentStatus: "FAILED",
            },
        });

        return NextResponse.json(
            { error: "Invalid signature" },
            { status: 400 }
        );
    }

    // Payment verified - grant access
    const updated = await prisma.advanceChatAccess.update({
        where: { id: access.id },
        data: {
            paymentStatus: "SUCCESS",
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
        },
    });

    return NextResponse.json({
        success: true,
        access: {
            id: updated.id,
            hasAccess: true,
            purchaseDate: updated.purchaseDate,
            expiryDate: updated.expiryDate,
        },
    });
}
