"use client";

import { motion } from "framer-motion";
import { Image as ImageIcon, Video, Upload, Calendar, Users, Award, BookOpen, Briefcase, GraduationCap } from "lucide-react";

export default function GalleryPage() {
    // Placeholder categories for future content
    const photoCategories = [
        { icon: Users, title: "Workshops & Seminars", count: "Coming Soon", color: "blue" },
        { icon: Award, title: "Awards & Recognition", count: "Coming Soon", color: "purple" },
        { icon: Briefcase, title: "Professional Events", count: "Coming Soon", color: "green" },
        { icon: GraduationCap, title: "Training Sessions", count: "Coming Soon", color: "orange" },
        { icon: BookOpen, title: "Knowledge Sharing", count: "Coming Soon", color: "cyan" },
        { icon: Calendar, title: "Annual Conferences", count: "Coming Soon", color: "pink" },
    ];

    const getColorClasses = (color) => {
        const colors = {
            blue: "from-blue-500/10 to-cyan-500/10 text-blue-600",
            purple: "from-purple-500/10 to-pink-500/10 text-purple-600",
            green: "from-green-500/10 to-emerald-500/10 text-green-600",
            orange: "from-orange-500/10 to-amber-500/10 text-orange-600",
            cyan: "from-cyan-500/10 to-teal-500/10 text-cyan-600",
            pink: "from-pink-500/10 to-rose-500/10 text-pink-600",
        };
        return colors[color] || colors.blue;
    };

    return (
        <main className="min-h-screen bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-background border-b border-foreground/10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(196,248,42,0.08),transparent_50%)]" />

                <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 py-12 md:py-20 lg:px-16">
                    <div className="text-center">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-xs md:text-sm font-semibold uppercase tracking-[0.3em] text-foreground/60 mb-4"
                        >
                            Visual Documentation
                        </motion.p>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-medium"
                        >
                            <span className="bg-gradient-to-r from-[hsl(var(--contact-gradient-from))] to-[hsl(var(--contact-gradient-to))] bg-clip-text text-transparent">
                                Gallery
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="mt-6 max-w-2xl mx-auto text-sm md:text-base text-foreground/70 leading-relaxed"
                        >
                            Explore our collection of workshops, events, training sessions, and professional activities
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Gallery Content */}
            <section className="relative overflow-hidden bg-background py-12 md:py-16">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(196,248,42,0.05),transparent_50%)]" />

                <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16">
                    {/* Photos Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-16"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10">
                                <ImageIcon className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <h2 className="text-2xl md:text-3xl font-medium text-foreground">
                                    Photo Gallery
                                </h2>
                                <p className="text-sm text-foreground/60 mt-1">
                                    Browse through our professional events and activities
                                </p>
                            </div>
                        </div>

                        {/* Photo Categories Grid */}
                        <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {photoCategories.map((category, index) => {
                                const Icon = category.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        whileHover={{ y: -5, scale: 1.02 }}
                                        className="group relative rounded-2xl border border-foreground/10 bg-white p-6 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
                                    >
                                        {/* Gradient overlay on hover */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        <div className="relative">
                                            <div className={`inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${getColorClasses(category.color)} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                                <Icon className="h-7 w-7" />
                                            </div>
                                            <h3 className="text-lg md:text-xl font-medium text-foreground mb-2 group-hover:text-primary-foreground transition-colors">
                                                {category.title}
                                            </h3>
                                            <p className="text-sm text-foreground/60 mb-3">
                                                Photos and memories from our events
                                            </p>
                                            <div className="flex items-center justify-between pt-3 border-t border-foreground/10">
                                                <span className="text-xs font-medium text-foreground/50 uppercase tracking-wider">
                                                    {category.count}
                                                </span>
                                                <Upload className="h-4 w-4 text-foreground/40 group-hover:text-primary-foreground transition-colors" />
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Videos Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10">
                                <Video className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                                <h2 className="text-2xl md:text-3xl font-medium text-foreground">
                                    Video Library
                                </h2>
                                <p className="text-sm text-foreground/60 mt-1">
                                    Educational content and training sessions
                                </p>
                            </div>
                        </div>

                        {/* Video Grid - Enhanced Placeholders */}
                        <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {[
                                { title: "Workshop Recordings", desc: "Expert-led training sessions", color: "green" },
                                { title: "Webinar Series", desc: "Online educational programs", color: "teal" },
                                { title: "Case Discussions", desc: "Real-world case analyses", color: "emerald" },
                            ].map((video, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    whileHover={{ y: -5, scale: 1.02 }}
                                    className="group relative rounded-2xl border border-foreground/10 bg-white overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                                >
                                    {/* Video thumbnail placeholder */}
                                    <div className="aspect-video bg-gradient-to-br from-green-500/10 to-emerald-500/10 flex items-center justify-center relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <div className="relative">
                                            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                                <Video className="h-8 w-8 text-green-600" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Video info */}
                                    <div className="p-5">
                                        <h3 className="text-lg font-medium text-foreground mb-2 group-hover:text-primary-foreground transition-colors">
                                            {video.title}
                                        </h3>
                                        <p className="text-sm text-foreground/60 mb-3">
                                            {video.desc}
                                        </p>
                                        <div className="flex items-center justify-between pt-3 border-t border-foreground/10">
                                            <span className="text-xs font-medium text-foreground/50 uppercase tracking-wider">
                                                Coming Soon
                                            </span>
                                            <Upload className="h-4 w-4 text-foreground/40 group-hover:text-primary-foreground transition-colors" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
