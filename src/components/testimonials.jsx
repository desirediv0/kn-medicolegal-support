"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

export function Testimonials() {
  const scrollRef = useRef(null);

  const testimonials = [
    {
      name: "Dr. Rajesh Kumar",
      role: "Senior Consultant, Apollo Hospital",
      text: "Their medicolegal expertise saved us during a critical consumer court case. The team's practical advice and documentation support were invaluable. Highly recommended for all healthcare professionals.",
      rating: 5,
    },
    {
      name: "Dr. Priya Sharma",
      role: "Medical Director, City Care Hospital",
      text: "We've been using their monthly support package for over a year. The peace of mind knowing expert medicolegal help is just a call away is priceless. Professional and responsive team.",
      rating: 5,
    },
    {
      name: "Dr. Anil Verma",
      role: "General Surgeon, Private Practice",
      text: "When I received a legal notice, I was completely lost. Their team guided me through every step, drafted perfect responses, and the case was dismissed. Forever grateful!",
      rating: 5,
    },
    {
      name: "Dr. Meera Patel",
      role: "Gynecologist, Women's Wellness Clinic",
      text: "Their PCPNDT compliance audit helped us identify and fix critical documentation gaps. The training sessions for our staff were excellent. True experts in their field.",
      rating: 5,
    },
    {
      name: "Dr. Suresh Reddy",
      role: "Hospital Administrator, Metro Hospital",
      text: "Excellent medicolegal support for our entire hospital. They conduct regular workshops, audit our records, and are always available for urgent consultations. Best investment we made.",
      rating: 5,
    },
    {
      name: "Dr. Kavita Singh",
      role: "Pediatrician, Child Care Center",
      text: "Their preventive medicolegal advice helped me improve my consent forms and documentation practices. No legal issues in 3 years since following their guidance!",
      rating: 5,
    },
  ];

  // Duplicate testimonials for infinite scroll
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollPosition = 0;
    const scrollSpeed = 0.5; // pixels per frame

    const scroll = () => {
      scrollPosition += scrollSpeed;

      // Reset position when we've scrolled through the first set
      const maxScroll = scrollContainer.scrollWidth / 2;
      if (scrollPosition >= maxScroll) {
        scrollPosition = 0;
      }

      scrollContainer.scrollLeft = scrollPosition;
      requestAnimationFrame(scroll);
    };

    const animationId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationId);
  }, []);

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

      {/* Auto-scroll container */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex  gap-3 md:gap-6 overflow-x-hidden"
          style={{ scrollBehavior: 'auto' }}
        >
          {duplicatedTestimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full md:w-[calc(33.333%-16px)]"
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
