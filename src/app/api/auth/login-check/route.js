import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import * as bcryptjs from "bcryptjs";

const { compare } = bcryptjs;

export async function POST(request) {
    try {
        const { email, password, portal = "user" } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required", code: "MISSING_FIELDS" },
                { status: 400 }
            );
        }

        const normalizedEmail = email.toLowerCase().trim();

        const user = await prisma.user.findUnique({
            where: { email: normalizedEmail },
        });

        // Check if user exists
        if (!user) {
            return NextResponse.json(
                { error: "No account found with this email", code: "EMAIL_NOT_FOUND" },
                { status: 404 }
            );
        }

        // Check if user has password (might be OAuth user)
        if (!user.password) {
            return NextResponse.json(
                { error: "Please use social login for this account", code: "NO_PASSWORD" },
                { status: 400 }
            );
        }

        const isValid = await compare(password, user.password);

        if (!isValid) {
            return NextResponse.json(
                { error: "Incorrect password", code: "INVALID_PASSWORD" },
                { status: 401 }
            );
        }

        // Check if email is verified (for user portal only)
        if (portal === "user" && !user.emailVerified) {
            return NextResponse.json(
                {
                    error: "Please verify your email first",
                    code: "EMAIL_NOT_VERIFIED",
                    email: user.email
                },
                { status: 403 }
            );
        }

        if (portal === "user" && user.role === "ADMIN") {
            return NextResponse.json(
                { error: "Admin accounts must use the admin portal", code: "WRONG_PORTAL" },
                { status: 403 }
            );
        }

        if (portal === "admin" && user.role !== "ADMIN") {
            return NextResponse.json(
                { error: "Only admin accounts can sign in here", code: "NOT_ADMIN" },
                { status: 403 }
            );
        }

        // All checks passed - return success with user data for NextAuth signIn
        return NextResponse.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            }
        });
    } catch (error) {
        console.error("Login check error:", error);
        return NextResponse.json(
            { error: "Something went wrong", code: "SERVER_ERROR" },
            { status: 500 }
        );
    }
}
