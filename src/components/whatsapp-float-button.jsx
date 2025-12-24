"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Info, MessageCircle, Link as LinkIcon, Users, AlertCircle, CheckCircle2 } from "lucide-react";

const WHATSAPP_GROUP_LINK = "https://chat.whatsapp.com/K9CEGOWvqRxCRvvvcqzxkD";

export function WhatsAppFloatButton() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <motion.button
                onClick={() => setOpen(true)}
                className="fixed bottom-24 right-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {/* WhatsApp Icon */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>

                {/* Text - visible on hover on desktop */}
                <span className="hidden sm:inline-block text-sm font-medium whitespace-nowrap">
                    Join WhatsApp Group
                </span>

                {/* Pulse animation ring */}
                <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 pointer-events-none" />
            </motion.button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <div className="flex items-center gap-3 mb-2">
                            <MessageCircle className="h-6 w-6 text-[#25D366]" />
                            <DialogTitle className="text-2xl">Join WhatsApp Group</DialogTitle>
                        </div>
                        <DialogDescription>
                            Connect with medicolegal experts and fellow healthcare professionals
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 mt-4">
                        {/* Main Info Box */}
                        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-4">
                            <div className="flex items-start gap-3">
                                <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900 mb-2">
                                        Medicolegal WhatsApp Group for Medical Fraternity
                                    </h3>
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        This group is <strong>exclusively for medical professionals</strong> (doctors,
                                        hospital administrators, and healthcare providers) to discuss general medicolegal
                                        issues and seek guidance from experts.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* What it's for */}
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <div className="flex items-start gap-3 mb-3">
                                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                                <h3 className="font-semibold text-gray-900">
                                    What You Can Discuss
                                </h3>
                            </div>
                            <ul className="space-y-2 text-sm text-gray-700 ml-8">
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600 mt-1">•</span>
                                    <span>General medicolegal queries and best practices</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600 mt-1">•</span>
                                    <span>Discussion on documentation and compliance</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600 mt-1">•</span>
                                    <span>Chat with medicolegal experts</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600 mt-1">•</span>
                                    <span>Knowledge sharing with peers</span>
                                </li>
                            </ul>
                        </div>

                        {/* What it's NOT for - Disclaimer Box */}
                        <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-lg p-4">
                            <div className="flex items-start gap-3 mb-3">
                                <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                                <h3 className="font-semibold text-gray-900">
                                    Important: What This Group Does NOT Entertain
                                </h3>
                            </div>
                            <div className="ml-8 space-y-2">
                                <p className="text-sm font-medium text-gray-900 mb-2">
                                    This group is <strong>NOT</strong> for:
                                </p>
                                <ul className="space-y-2 text-sm text-gray-700">
                                    <li className="flex items-start gap-2">
                                        <span className="text-amber-600 mt-1">✗</span>
                                        <span><strong>Court notices</strong> or legal proceedings</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-amber-600 mt-1">✗</span>
                                        <span><strong>Medical Council notices</strong> or disciplinary matters</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-amber-600 mt-1">✗</span>
                                        <span><strong>Police notices</strong> or FIR-related queries</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-amber-600 mt-1">✗</span>
                                        <span><strong>Individual complaints</strong> or specific legal case discussions</span>
                                    </li>
                                </ul>
                                <p className="text-xs text-amber-800 mt-3 pt-3 border-t border-amber-200">
                                    <strong>Note:</strong> For formal consultations on specific cases, notices, or legal
                                    matters, please use our <a href="/contact" className="underline font-medium">contact form</a> or
                                    email us directly at{" "}
                                    <a href="mailto:knmedicolegal@gmail.com" className="underline font-medium">
                                        knmedicolegal@gmail.com
                                    </a>
                                </p>
                            </div>
                        </div>

                        {/* How it Works */}
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center gap-3 mb-4">
                                <Users className="h-5 w-5 text-gray-700" />
                                <h3 className="font-semibold text-gray-900">
                                    How It Works
                                </h3>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#25D366] text-white flex items-center justify-center font-semibold text-sm">
                                        1
                                    </div>
                                    <div className="flex-1 pt-0.5">
                                        <p className="text-sm font-medium text-gray-900">Click on Join WhatsApp Group</p>
                                        <p className="text-xs text-gray-600 mt-1">Use the button below to get started</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#25D366] text-white flex items-center justify-center font-semibold text-sm">
                                        2
                                    </div>
                                    <div className="flex-1 pt-0.5">
                                        <p className="text-sm font-medium text-gray-900">Get Invite Link</p>
                                        <p className="text-xs text-gray-600 mt-1">You&apos;ll be redirected to WhatsApp to join the group</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#25D366] text-white flex items-center justify-center font-semibold text-sm">
                                        3
                                    </div>
                                    <div className="flex-1 pt-0.5">
                                        <p className="text-sm font-medium text-gray-900">Start Chatting with Experts</p>
                                        <p className="text-xs text-gray-600 mt-1">Connect with medicolegal experts and peers</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <a
                            href={WHATSAPP_GROUP_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block"
                            onClick={() => setOpen(false)}
                        >
                            <Button
                                size="lg"
                                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-medium py-6"
                            >
                                <MessageCircle className="h-5 w-5 mr-2" />
                                Join WhatsApp Group
                                <LinkIcon className="h-4 w-4 ml-2" />
                            </Button>
                        </a>

                        {/* Trust Building Footer */}
                        <div className="pt-2 border-t border-gray-200">
                            <p className="text-xs text-gray-600 text-center leading-relaxed">
                                <strong className="text-gray-900">Trusted by healthcare professionals nationwide.</strong>
                                <br />
                                Join a community of doctors and hospitals navigating medicolegal challenges together.
                            </p>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

