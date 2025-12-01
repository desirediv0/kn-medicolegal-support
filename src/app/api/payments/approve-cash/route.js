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

  // Check if payment is pending and payment type is CASH
  if (question.paymentStatus !== "PENDING" || question.paymentType !== "CASH") {
    return NextResponse.json(
      { error: "Only pending cash payments can be approved" },
      { status: 400 }
    );
  }

  try {
    // Update payment status to SUCCESS and status to ACTIVE
    if (isAdvance) {
      await prisma.advanceQuestion.update({
        where: { id: question.id },
        data: {
          paymentStatus: "SUCCESS",
          status: "ACTIVE",
        },
      });
    } else {
      await prisma.question.update({
        where: { id: question.id },
        data: {
          paymentStatus: "SUCCESS",
          status: "ACTIVE",
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Cash payment approved successfully",
    });
  } catch (error) {
    console.error("Error approving cash payment:", error);
    return NextResponse.json(
      { error: "Failed to approve payment" },
      { status: 500 }
    );
  }
}

