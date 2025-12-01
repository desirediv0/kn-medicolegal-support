import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request) {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
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
    question = await prisma.question.findUnique({
      where: { id: questionId },
    });
  }

  if (!question) {
    return NextResponse.json({ error: "Question not found" }, { status: 404 });
  }

  // Only allow changing if payment is still pending
  if (question.paymentStatus !== "PENDING") {
    return NextResponse.json(
      { error: "Can only change payment type for pending payments" },
      { status: 400 }
    );
  }

  try {
    // Update payment type to RAZORPAY
    if (isAdvance) {
      await prisma.advanceQuestion.update({
        where: { id: question.id },
        data: {
          paymentType: "RAZORPAY",
        },
      });
    } else {
      await prisma.question.update({
        where: { id: question.id },
        data: {
          paymentType: "RAZORPAY",
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Payment type changed to Razorpay successfully",
    });
  } catch (error) {
    console.error("Error changing payment type to Razorpay:", error);
    return NextResponse.json(
      { error: "Failed to change payment type" },
      { status: 500 }
    );
  }
}
