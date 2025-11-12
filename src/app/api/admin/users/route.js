import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const users = await prisma.user.findMany({
    where: { role: "USER" },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      questions: {
        select: {
          id: true,
          status: true,
          paymentStatus: true,
          createdAt: true,
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  const payload = users.map((user) => {
    const totalQuestions = user.questions.length;
    const openQuestions = user.questions.filter(
      (q) => q.status !== "CLOSED"
    ).length;
    const paidQuestions = user.questions.filter(
      (q) => q.paymentStatus === "SUCCESS"
    ).length;
    const lastQuestionAt = user.questions[0]?.createdAt ?? null;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      totalQuestions,
      openQuestions,
      paidQuestions,
      lastQuestionAt,
    };
  });

  return NextResponse.json({ users: payload });
}
