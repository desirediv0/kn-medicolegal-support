"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const subjectOptions = [
  "Medicolegal Consultation",
  "Document Review",
  "Hospital Compliance",
  "Training & Workshops",
  "Crisis Management",
  "Legal Notice Response",
  "Police/FIR Assistance",
  "Medical Council Complaint",
  "Social Media Issue",
  "Other",
];

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    customSubject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [showCustomSubject, setShowCustomSubject] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubjectChange = (value) => {
    if (value === "Other") {
      setShowCustomSubject(true);
      setFormData((prev) => ({ ...prev, subject: "Other", customSubject: "" }));
    } else {
      setShowCustomSubject(false);
      setFormData((prev) => ({ ...prev, subject: value, customSubject: "" }));
    }
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
          subject: showCustomSubject && formData.customSubject 
            ? formData.customSubject 
            : formData.subject,
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
        subject: "",
        customSubject: "",
        message: "",
      });
      setShowCustomSubject(false);
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error(error.message || "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="name">
            Name <span className="text-destructive">*</span>
          </FieldLabel>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={loading}
            className="bg-white/90 text-foreground border-primary/20"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="email">
            Email <span className="text-destructive">*</span>
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
            className="bg-white/90 text-foreground border-primary/20"
          />
        </Field>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="phone">Phone</FieldLabel>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+91 1234567890"
            value={formData.phone}
            onChange={handleChange}
            disabled={loading}
            className="bg-white/90 text-foreground border-primary/20"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="subject">Subject</FieldLabel>
          <Select
            value={formData.subject}
            onValueChange={handleSubjectChange}
            disabled={loading}
          >
            <SelectTrigger className="bg-white/90 text-foreground border-primary/20 h-9">
              <SelectValue placeholder="Select a subject" />
            </SelectTrigger>
            <SelectContent>
              {subjectOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {showCustomSubject && (
            <Input
              name="customSubject"
              type="text"
              placeholder="Please specify your subject"
              value={formData.customSubject}
              onChange={handleChange}
              disabled={loading}
              className="bg-white/90 text-foreground border-primary/20 mt-3"
              required
            />
          )}
        </Field>
      </div>

      <Field>
        <FieldLabel htmlFor="message">
          Message <span className="text-destructive">*</span>
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
            className="bg-white/90 text-foreground resize-none border-primary/20"
          />
      </Field>

      <div className="flex justify-start pt-4">
        <Button
          type="submit"
          disabled={loading}
          className="w-full md:w-auto min-w-[200px] bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
          size="lg"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </Button>
      </div>
    </form>
  );
}

