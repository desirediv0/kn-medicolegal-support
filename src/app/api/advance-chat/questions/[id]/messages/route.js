import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(_request, { params }) {
    const session = await auth();

    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const question = await prisma.advanceQuestion.findUnique({
        where: { id: params.id },
        select: { userId: true, adminId: true },
    });

    if (!question) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const isParticipant =
        question.userId === session.user.id ||
        question.adminId === session.user.id ||
        session.user.role === "ADMIN";

    if (!isParticipant) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Mark messages as read
    await prisma.advanceMessage.updateMany({
        where: {
            questionId: params.id,
            isRead: false,
            senderId: { not: session.user.id },
        },
        data: { isRead: true },
    });

    const messages = await prisma.advanceMessage.findMany({
        where: { questionId: params.id },
        orderBy: { createdAt: "asc" },
        include: {
            sender: { select: { id: true, name: true, email: true, role: true } },
            attachments: true,
        },
    });

    return NextResponse.json({ messages });
}

export async function POST(request, { params }) {
    const session = await auth();
    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { message, attachments = [] } = body;

    const question = await prisma.advanceQuestion.findUnique({
        where: { id: params.id },
    });

    if (!question) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const isParticipant =
        question.userId === session.user.id ||
        question.adminId === session.user.id ||
        session.user.role === "ADMIN";

    if (!isParticipant) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    if (question.status === "CLOSED") {
        return NextResponse.json(
            { error: "Conversation is closed" },
            { status: 400 }
        );
    }

    const newMessage = await prisma.advanceMessage.create({
        data: {
            questionId: params.id,
            senderId: session.user.id,
            body: message,
            attachments: {
                create: attachments.map((file) => ({
                    fileName: file.fileName,
                    fileSize: file.fileSize,
                    mimeType: file.mimeType,
                    url: file.url,
                    key: file.key,
                })),
            },
        },
        include: {
            sender: { select: { id: true, name: true, email: true, role: true } },
            attachments: true,
        },
    });

    return NextResponse.json({ message: newMessage });
}
