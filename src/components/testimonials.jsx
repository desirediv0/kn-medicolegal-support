"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

export function Testimonials() {

  const testimonials = [
    {
      name: "Coming Soon",
      role: "Client Testimonials",
      text: "Real testimonials will be updated soon based on client cases.",
      rating: 5,
    },
  ];

  // No auto-scroll for placeholder

  return (
    <section className="relative overflow-hidden bg-background py-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(196,248,42,0.05),transparent_50%)]" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-xs md:text-sm font-medium uppercase tracking-[0.3em] text-foreground/60 mb-4">
            What Our Clients Say
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium">
            Client{' '}
            <span className="bg-gradient-to-r from-[hsl(var(--contact-gradient-from))] to-[hsl(var(--contact-gradient-to))] bg-clip-text text-transparent">
              Testimonials
            </span>
          </h2>
        </motion.div>
      </div>

      {/* Testimonials container */}
      <div className="relative max-w-2xl mx-auto px-4">
        <div className="flex justify-center">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="w-full"
            >
              <div className="h-full rounded-2xl border border-foreground/10 bg-white p-6 md:p-8 shadow-lg">
                {/* Quote icon */}
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10">
                  <Quote className="h-5 w-5 text-blue-600" />
                </div>

                {/* Rating */}
                <div className="mb-4 flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Testimonial text */}
                <p className="text-sm md:text-base text-foreground/70 leading-relaxed mb-6">
                  &quot;{testimonial.text}&quot;
                </p>

                {/* Author */}
                <div className="border-t border-foreground/10 pt-4">
                  <p className="font-medium text-foreground">{testimonial.name}</p>
                  <p className="text-xs md:text-sm text-foreground/60">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
