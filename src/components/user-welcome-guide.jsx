"use client";

import { useState } from "react";
import { X, MessageCircle, QrCode, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function UserWelcomeGuide({ onClose }) {
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        {
            title: "Welcome! 👋",
            content: (
                <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                        Welcome to your Medicolegal formal consultation dashboard. Let&apos;s understand how to use the service.
                    </p>
                </div>
            ),
        },
        {
            title: "Medicolegal formal consultation 💬",
            icon: <MessageCircle className="w-6 h-6 text-blue-600" />,
            content: (
                <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h3 className="font-semibold text-blue-900 mb-2">What is Medicolegal formal consultation?</h3>
                        <ul className="space-y-2 text-sm text-blue-800 list-disc list-inside">
                            <li><strong>One-time payment:</strong> ₹1,000 (single payment)</li>
                            <li><strong>Access:</strong> Chat with medicolegal experts as many times as you like</li>
                            <li><strong>Validity:</strong> Indefinite period (lifetime access)</li>
                            <li><strong>Features:</strong> Upload & download documents, all communication saved in your dashboard</li>
                        </ul>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Example:</h4>
                        <p className="text-sm text-gray-700">
                            Pay ₹1,000 once, and you can ask unlimited medicolegal questions forever. Upload relevant documents, get expert guidance, and all your communication history is saved.
                        </p>
                    </div>
                </div>
            ),
        },
        {
            title: "How to Make Payment? 💳",
            icon: <QrCode className="w-6 h-6 text-green-600" />,
            content: (
                <div className="space-y-4">
                    {/* Payment Card */}
                    <div className="rounded-xl border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-white p-4 shadow-sm">
                        <h3 className="font-semibold text-gray-800 mb-4 text-center">Payment via QR Code or Bank Transfer</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                            {/* QR Code */}
                            <div className="flex flex-col items-center">
                                <p className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">Scan to Pay</p>
                                <div className="relative w-36 h-36 rounded-xl border-2 border-blue-200 bg-white p-2 shadow-md">
                                    <Image
                                        src="/sm-qr.jpeg"
                                        alt="Payment QR Code"
                                        fill
                                        className="object-contain rounded-lg p-1"
                                        sizes="144px"
                                    />
                                </div>
                                <p className="text-[11px] text-gray-500 mt-2">Use any UPI app</p>
                            </div>

                            {/* Bank Details */}
                            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100">
                                    <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                                        <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                        </svg>
                                    </div>
                                    <p className="font-semibold text-gray-800 text-sm">Bank Transfer</p>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-gray-500">Bank</span>
                                        <span className="text-xs font-medium text-gray-800">State Bank of India</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-gray-500">A/C No.</span>
                                        <span className="text-xs font-semibold text-gray-900 font-mono">44717262489</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-gray-500">IFSC</span>
                                        <span className="text-xs font-semibold text-gray-900 font-mono">SBIN0060414</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Steps */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <p className="font-medium text-green-900 mb-2 text-sm">Steps to Pay:</p>
                        <ol className="list-decimal list-inside space-y-1 text-xs text-green-800">
                            <li>Open any UPI app (PhonePe, Google Pay, Paytm)</li>
                            <li>Scan QR code or transfer to bank account</li>
                            <li>Enter payment amount and complete transaction</li>
                            <li>Keep payment receipt for reference</li>
                        </ol>
                    </div>

                    {/* Important Note */}
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                        <p className="text-xs text-amber-800">
                            <strong>Important:</strong> After payment, admin will verify and approve. Your chat will be activated once approved.
                        </p>
                    </div>
                </div>
            ),
        },
        {
            title: "Summary 📝",
            content: (
                <div className="space-y-4">
                    <Card className="p-4 border-blue-200">
                        <div className="flex items-start gap-3">
                            <MessageCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">Medicolegal formal consultation</h4>
                                <p className="text-xs text-gray-600 mb-2">
                                    ₹1,000 one-time
                                </p>
                                <p className="text-xs text-gray-600">
                                    Unlimited questions, indefinite access, document upload/download
                                </p>
                            </div>
                        </div>
                    </Card>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-900 mb-2">Quick Start Guide:</h4>
                        <ol className="space-y-2 text-sm text-blue-800">
                            <li className="flex items-start gap-2">
                                <span className="font-bold">1.</span>
                                <span>Click &quot;New Question&quot; button on the dashboard</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold">2.</span>
                                <span>Make payment via QR code or bank transfer</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold">3.</span>
                                <span>Wait for admin approval (your payment will be verified)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="font-bold">4.</span>
                                <span>Once approved, your chat will be activated and you can start asking questions!</span>
                            </li>
                        </ol>
                    </div>
                </div>
            ),
        },
    ];

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            handleClose();
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleClose = () => {
        // Mark guide as seen in this session
        sessionStorage.setItem("userWelcomeGuideSeenInSession", "true");
        if (onClose) onClose();
    };

    const currentStepData = steps[currentStep];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white shadow-xl">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
                    <div className="flex items-center gap-3">
                        {currentStepData.icon}
                        <h2 className="text-xl font-semibold text-gray-900">
                            {currentStepData.title}
                        </h2>
                    </div>
                    <button
                        onClick={handleClose}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                        aria-label="Close"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <div className="px-6 py-6">
                    {currentStepData.content}
                </div>

                <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {steps.map((_, index) => (
                            <div
                                key={index}
                                className={`h-2 w-2 rounded-full transition-colors ${index === currentStep
                                    ? "bg-primary"
                                    : index < currentStep
                                        ? "bg-green-500"
                                        : "bg-gray-300"
                                    }`}
                            />
                        ))}
                    </div>
                    <div className="flex items-center gap-3">
                        {currentStep > 0 && (
                            <Button
                                variant="outline"
                                onClick={handlePrevious}
                            >
                                Previous
                            </Button>
                        )}
                        <Button onClick={handleNext}>
                            {currentStep === steps.length - 1 ? (
                                <>
                                    <CheckCircle2 className="w-4 h-4 mr-2" />
                                    Start Using
                                </>
                            ) : (
                                <>
                                    Next
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
