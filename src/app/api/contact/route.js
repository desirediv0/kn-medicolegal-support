import { NextResponse } from "next/server";
import { sendOtpEmail } from "@/lib/email";

export async function POST(request) {
  try {
    const { name, email, phone, message, subject } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Send email to admin
    const adminEmail = process.env.NEXT_PUBLIC_FROM_EMAIL || "support@knmedicolegal.com";
    
    await sendOtpEmail({
      to: adminEmail,
      subject: subject || `Contact Form: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\n\nMessage:\n${message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Subject:</strong> ${subject || "General Inquiry"}</p>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    return NextResponse.json({ message: "Contact form submitted successfully" });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}

