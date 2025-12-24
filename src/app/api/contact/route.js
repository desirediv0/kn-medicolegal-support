import { NextResponse } from "next/server";
import { sendOtpEmail } from "@/lib/email";

const DEFAULT_ADMIN_EMAIL =
  process.env.SMTP_FROM_EMAIL ||
  process.env.NEXT_PUBLIC_TO_EMAIL ||
  process.env.NEXT_PUBLIC_FROM_EMAIL ||
  "codeshorts007@gmail.com";

export async function POST(request) {
  try {
    const { name, email, phone, category, message, subject } = await request.json();

    if (!name || !email || !category || !message) {
      return NextResponse.json(
        { error: "Name, email, category, and message are required" },
        { status: 400 }
      );
    }

    // Route email based on category
    let adminEmail;
    switch (category) {
      case "Information":
      case "Support":
      case "Grievance Redressal":
        adminEmail = DEFAULT_ADMIN_EMAIL;
        break;
      default:
        adminEmail = DEFAULT_ADMIN_EMAIL;
    }

    try {
    await sendOtpEmail({
      to: adminEmail,
        replyTo: email,
      subject: subject || `Contact Form [${category}]: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\nCategory: ${category}\n\nMessage:\n${message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Category:</strong> ${category}</p>
        <p><strong>Subject:</strong> ${subject || "General Inquiry"}</p>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });
    } catch (err) {
      console.error("Contact email send failed:", err?.message || err);
      return NextResponse.json(
        { error: "Failed to send message. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Contact form submitted successfully" });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}

