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
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h3 className="font-semibold text-green-900 mb-3">Payment via QR Code or Bank Transfer</h3>
                        <div className="flex flex-col sm:flex-row gap-4 items-start">
                            <div className="relative w-32 h-32 rounded-lg border-2 border-green-300 bg-white p-2 mx-auto sm:mx-0">
                                <Image
                                    src="/sm-qr.jpeg"
                                    alt="Payment QR Code"
                                    fill
                                    className="object-contain rounded"
                                    sizes="128px"
                                />
                            </div>
                            <div className="flex-1 space-y-2 text-sm text-green-800">
                                <p className="font-medium">Steps to Pay:</p>
                                <ol className="list-decimal list-inside space-y-1 ml-2">
                                    <li>Open any UPI app on your phone (PhonePe, Google Pay, Paytm, etc.)</li>
                                    <li>Tap on &quot;Scan QR Code&quot; in your UPI app</li>
                                    <li>Point your camera at the QR code shown above</li>
                                    <li>Enter the payment amount and complete the transaction</li>
                                    <li>Keep the payment receipt for your records</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-sm text-blue-800 font-medium mb-2">Bank Transfer Details:</p>
                        <div className="text-sm text-blue-700 space-y-1">
                            <p><strong>Bank:</strong> State Bank of India</p>
                            <p><strong>A/C No:</strong> 44717262489</p>
                            <p><strong>IFSC:</strong> SBIN0060414</p>
                        </div>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <p className="text-sm text-yellow-800">
                            <strong>Important:</strong> After making the payment via QR code or bank transfer, your payment will be pending until admin approval. Once the admin verifies and approves your payment, your chat will be activated and you can start using the service.
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
