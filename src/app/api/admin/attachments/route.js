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

  const [generalAttachments, advanceAttachments] = await Promise.all([
    prisma.attachment.findMany({
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
    }),
    prisma.advanceAttachment.findMany({
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
    }),
  ]);

  const combined = [
    ...generalAttachments.map((a) => ({
      ...a,
      type: "GENERAL",
      question: a.message?.question
        ? {
          id: a.message.question.id,
          title: a.message.question.title,
          user: a.message.question.user,
        }
        : null,
      sender: a.message?.sender ?? null,
    })),
    ...advanceAttachments.map((a) => ({
      ...a,
      type: "ADVANCE",
      question: a.message?.question
        ? {
          id: a.message.question.id,
          title: a.message.question.title,
          user: a.message.question.user,
        }
        : null,
      sender: a.message?.sender ?? null,
    })),
  ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const result = combined.slice(0, limit).map((attachment) => ({
    id: attachment.id,
    fileName: attachment.fileName,
    fileSize: attachment.fileSize,
    mimeType: attachment.mimeType,
    url: attachment.url,
    key: attachment.key,
    createdAt: attachment.createdAt,
    type: attachment.type,
    question: attachment.question,
    sender: attachment.sender,
  }));

  return NextResponse.json({ attachments: result });
}

