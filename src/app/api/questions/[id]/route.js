import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { deleteObject } from "@/lib/storage";

const includeConfig = {
  user: { select: { id: true, name: true, email: true } },
  admin: { select: { id: true, name: true, email: true } },
  chats: {
    orderBy: { createdAt: "asc" },
    include: {
      sender: { select: { id: true, name: true, email: true, role: true } },
      files: true,
    },
  },
};

export async function GET(_request, { params }) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const question = await prisma.question.findUnique({
    where: { id: params.id },
    include: includeConfig,
  });

  if (!question) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const isOwner = question.userId === session.user.id;
  const isAdmin = session.user.role === "ADMIN";

  if (!isOwner && !isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return NextResponse.json({ question });
}

export async function PATCH(request, { params }) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const question = await prisma.question.findUnique({
    where: { id: params.id },
  });

  if (!question) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const isOwner = question.userId === session.user.id;
  const isAdmin = session.user.role === "ADMIN";

  if (!isOwner && !isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const updates = {};

  if (body.status === "CLOSED") {
    updates.status = "CLOSED";
    updates.closedAt = new Date();
  } else if (body.status === "ACTIVE" && isAdmin) {
    updates.status = "ACTIVE";
    updates.closedAt = null;
  }

  if (isAdmin && body.adminId) {
    updates.adminId = body.adminId;
  }

  const updated = await prisma.question.update({
    where: { id: params.id },
    data: updates,
    include: includeConfig,
  });

  return NextResponse.json({ question: updated });
}

export async function DELETE(request, { params }) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let deleteAttachments = false;
  try {
    const body = await request.json();
    deleteAttachments = Boolean(body?.deleteAttachments);
  } catch (error) {
    // ignore body parsing errors so DELETE without body still works
  }

  const question = await prisma.question.findUnique({
    where: { id: params.id },
    include: {
      chats: {
        select: {
          files: {
            select: { key: true },
          },
        },
      },
    },
  });

  if (!question) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const fileKeys = deleteAttachments
    ? question.chats.flatMap((chat) =>
        chat.files
          .map((file) => file.key)
          .filter((key) => typeof key === "string" && key.length > 0)
      )
    : [];

  await prisma.question.delete({ where: { id: params.id } });

  if (deleteAttachments && fileKeys.length > 0) {
    const results = await Promise.allSettled(
      fileKeys.map((key) => deleteObject(key))
    );
    const failures = results.filter((result) => result.status === "rejected");
    if (failures.length) {
      console.error(
        `Failed to delete ${failures.length} attachment(s) from storage for question ${params.id}`
      );
    }
  }

  return NextResponse.json({ success: true, deletedAttachments: fileKeys.length });
}

