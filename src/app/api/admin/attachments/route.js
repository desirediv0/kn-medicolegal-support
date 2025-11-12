import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request) {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get("limit")) || 100;

  const attachments = await prisma.attachment.findMany({
    orderBy: { createdAt: "desc" },
    take: Math.min(limit, 500),
    include: {
      message: {
        select: {
          question: {
            select: {
              id: true,
              title: true,
              user: {
                select: {
                  id: true,
                  email: true,
                  name: true,
                },
              },
            },
          },
          sender: {
            select: {
              id: true,
              email: true,
              name: true,
              role: true,
            },
          },
        },
      },
    },
  });

  const result = attachments.map((attachment) => ({
    id: attachment.id,
    fileName: attachment.fileName,
    fileSize: attachment.fileSize,
    mimeType: attachment.mimeType,
    url: attachment.url,
    key: attachment.key,
    createdAt: attachment.createdAt,
    question: attachment.message?.question
      ? {
          id: attachment.message.question.id,
          title: attachment.message.question.title,
          user: attachment.message.question.user,
        }
      : null,
    sender: attachment.message?.sender ?? null,
  }));

  return NextResponse.json({ attachments: result });
}

