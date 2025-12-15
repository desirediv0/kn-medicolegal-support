"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          subject: "Contact Form Inquiry",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error(error.message || "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="name" className="text-gray-700 font-medium">
            Name <span className="text-red-500">*</span>
          </FieldLabel>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Your full name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={loading}
            className="bg-white border-gray-300 focus:border-gray-900 transition-colors"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="email" className="text-gray-700 font-medium">
            Email <span className="text-red-500">*</span>
          </FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
            className="bg-white border-gray-300 focus:border-gray-900 transition-colors"
          />
        </Field>
      </div>

      <Field>
        <FieldLabel htmlFor="phone" className="text-gray-700 font-medium">
          Phone
        </FieldLabel>
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="+91 1234567890"
          value={formData.phone}
          onChange={handleChange}
          disabled={loading}
          className="bg-white border-gray-300 focus:border-gray-900 transition-colors"
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="message" className="text-gray-700 font-medium">
          Message <span className="text-red-500">*</span>
        </FieldLabel>
        <Textarea
          id="message"
          name="message"
          placeholder="Please describe your inquiry or requirement..."
          rows={6}
          value={formData.message}
          onChange={handleChange}
          required
          disabled={loading}
          className="bg-white resize-none border-gray-300 focus:border-gray-900 transition-colors"
        />
      </Field>

      <div className="pt-2">
        <Button
          type="submit"
          disabled={loading}
          className="w-full md:w-auto min-w-[200px] bg-gray-900 text-white hover:bg-gray-800 transition-colors font-medium"
          size="lg"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Sending...
            </>
          ) : (
            <>
              <Send className="h-4 w-4 mr-2" />
              Send Message
            </>
          )}
        </Button>
        
        <p className="mt-4 text-xs text-gray-600 leading-relaxed">
          Messages will be sent to our official email / WhatsApp. We will respond to your inquiry within 24-48 hours during business days.
        </p>
      </div>
    </form>
  );
}
