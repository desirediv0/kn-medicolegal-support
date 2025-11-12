import { NextResponse } from "next/server";
import { verifyOtp } from "@/lib/otp";

export async function POST(request) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and OTP are required" },
        { status: 400 }
      );
    }

    const result = await verifyOtp(email, otp);

    if (!result.valid) {
      return NextResponse.json(
        { error: result.reason || "Invalid OTP" },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: "OTP verified" });
  } catch (error) {
    console.error("OTP verify error:", error);
    return NextResponse.json(
      { error: "Failed to verify OTP" },
      { status: 500 }
    );
  }
}
