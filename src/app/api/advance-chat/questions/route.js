import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Helper function to get Advance Question pricing from settings
async function getAdvanceQuestionPrice() {
    const priceSetting = await prisma.setting.findUnique({
        where: { key: "advanceQuestionPrice" },
    });

    if (!priceSetting) {
        return 0;
    }

    return Number(priceSetting.value || 0);
}

export async function GET(request) {
    const session = await auth();

    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const isAdmin = session.user.role === "ADMIN";

    const url = new URL(request.url);
    let limit = parseInt(url.searchParams.get("limit") ?? "50", 10);
    if (Number.isNaN(limit) || limit <= 0) {
        limit = 50;
    }
    limit = Math.min(limit, 100);

    let page = parseInt(url.searchParams.get("page") ?? "1", 10);
    if (Number.isNaN(page) || page <= 0) {
        page = 1;
    }

    let skip = 0;
    const offsetParam = url.searchParams.get("offset");
    if (offsetParam !== null) {
        const parsed = parseInt(offsetParam, 10);
        skip = !Number.isNaN(parsed) && parsed >= 0 ? parsed : 0;
    } else {
        skip = (page - 1) * limit;
    }

    const includeMeta = url.searchParams.get("meta") === "true";

    const whereClause = isAdmin ? {} : { userId: session.user.id };

    const [questions, total] = await Promise.all([
        prisma.advanceQuestion.findMany({
            where: whereClause,
            orderBy: { createdAt: "desc" },
            skip,
            take: limit,
            include: {
                user: { select: { id: true, name: true, email: true } },
                admin: { select: { id: true, name: true, email: true } },
                messages: {
                    orderBy: { createdAt: "desc" },
                    take: 1,
                    select: {
                        id: true,
                        body: true,
                        createdAt: true,
                        sender: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                role: true,
                            },
                        },
                    },
                },
                _count: {
                    select: {
                        messages: {
                            where: {
                                isRead: false,
                                senderId: { not: session.user.id },
                            },
                        },
                    },
                },
            },
        }),
        includeMeta
            ? prisma.advanceQuestion.count({ where: whereClause })
            : Promise.resolve(null),
    ]);

    const shaped = questions.map(({ messages, _count, ...rest }) => ({
        ...rest,
        price: rest.price != null ? Number(rest.price) : null,
        messageCount: _count?.messages ?? 0,
        unreadCount: _count?.messages ?? 0,
        latestMessage: messages?.[0] ?? null,
    }));

    const payload = { questions: shaped };

    if (includeMeta) {
        payload.total = total ?? 0;
        payload.limit = limit;
        payload.offset = skip;
        payload.page = page;
    }

    return NextResponse.json(payload);
}

export async function POST(request) {
    const session = await auth();

    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    const { title, description } = data;

    if (!title) {
        return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    // Get Advance Chat pricing
    const price = await getAdvanceQuestionPrice();

    const question = await prisma.advanceQuestion.create({
        data: {
            title,
            description,
            userId: session.user.id,
            price,
            paymentStatus: price > 0 ? "PENDING" : "NOT_REQUIRED",
            status: price > 0 ? "PENDING" : "ACTIVE",
        },
    });

    return NextResponse.json({
        question: {
            ...question,
            price: question.price != null ? Number(question.price) : null,
            messageCount: 0,
            latestMessage: null,
        },
    });
}
