import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import * as bcryptjs from "bcryptjs";

const { hash } = bcryptjs;

export async function POST(request) {
    try {
        const { email, newPassword } = await request.json();

        if (!email || !newPassword) {
            return NextResponse.json(
                { error: "Email and new password are required" },
                { status: 400 }
            );
        }

        if (newPassword.length < 6) {
            return NextResponse.json(
                { error: "Password must be at least 6 characters" },
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

        // Hash the new password
        const hashedPassword = await hash(newPassword, 12);

        // Update password
        await prisma.user.update({
            where: { id: user.id },
            data: { password: hashedPassword },
        });

        return NextResponse.json({ message: "Password reset successfully" });
    } catch (error) {
        console.error("Reset password error:", error);
        return NextResponse.json(
            { error: "Failed to reset password" },
            { status: 500 }
        );
    }
}
