import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getRazorpayInstance } from "@/lib/razorpay";

export async function POST(request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { questionId, advanceQuestionId } = await request.json();

  if (!questionId && !advanceQuestionId) {
    return NextResponse.json(
      { error: "questionId or advanceQuestionId is required" },
      { status: 400 }
    );
  }

  let question;
  let isAdvance = false;

  // Check if it's an advance question
  if (advanceQuestionId) {
    question = await prisma.advanceQuestion.findUnique({
      where: { id: advanceQuestionId },
    });
    isAdvance = true;
  } else {
    // General question
    question = await prisma.question.findUnique({
      where: { id: questionId },
    });
  }

  if (!question) {
    return NextResponse.json({ error: "Question not found" }, { status: 404 });
  }

  if (question.userId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  if (question.paymentStatus === "SUCCESS") {
    return NextResponse.json(
      { error: "Payment already completed" },
      { status: 400 }
    );
  }

  try {
    const razorpay = getRazorpayInstance();
    const amount = Number(question.price) * 100;

    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: question.id,
      notes: {
        questionId: question.id,
        type: isAdvance ? "advance" : "general",
      },
    });

    // Update the appropriate table
    if (isAdvance) {
      await prisma.advanceQuestion.update({
        where: { id: question.id },
        data: {
          razorpayOrderId: order.id,
        },
      });
    } else {
      await prisma.question.update({
        where: { id: question.id },
        data: {
          razorpayOrderId: order.id,
        },
      });
    }

    return NextResponse.json({
      order,
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Razorpay order error:", error);
    return NextResponse.json(
      { error: "Failed to create payment order" },
      { status: 500 }
    );
  }
}
