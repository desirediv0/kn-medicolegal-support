import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

const { NEXT_PUBLIC_RAZORPAY_KEY_SECRET } = process.env;

export async function POST(request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { questionId, razorpayPaymentId, razorpayOrderId, razorpaySignature } =
    await request.json();

  if (!questionId || !razorpayPaymentId || !razorpayOrderId || !razorpaySignature) {
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

  const question = await prisma.question.findUnique({
    where: { id: questionId },
  });

  if (!question) {
    return NextResponse.json({ error: "Question not found" }, { status: 404 });
  }

  if (question.userId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const expectedSignature = crypto
    .createHmac("sha256", NEXT_PUBLIC_RAZORPAY_KEY_SECRET)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest("hex");

  if (expectedSignature !== razorpaySignature) {
    await prisma.question.update({
      where: { id: question.id },
      data: {
        paymentStatus: "FAILED",
      },
    });

    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  const updated = await prisma.question.update({
    where: { id: question.id },
    data: {
      paymentStatus: "SUCCESS",
      status: "ACTIVE",
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
    },
  });

  return NextResponse.json({ question: updated });
}

