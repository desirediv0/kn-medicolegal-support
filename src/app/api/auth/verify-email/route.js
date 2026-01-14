import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json(
                { error: "Email is required" },
                { status: 400 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { email: email.toLowerCase() },
        });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // Update emailVerified
        await prisma.user.update({
            where: { id: user.id },
            data: { emailVerified: new Date() },
        });

        return NextResponse.json({ message: "Email verified successfully" });
    } catch (error) {
        console.error("Verify email error:", error);
        return NextResponse.json(
            { error: "Failed to verify email" },
            { status: 500 }
        );
    }
}
