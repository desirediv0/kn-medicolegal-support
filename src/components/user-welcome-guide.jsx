"use client";

import { useState } from "react";
import { X, MessageCircle, QrCode, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function UserWelcomeGuide({ onClose }) {
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        {
            title: "Welcome! 👋",
            content: (
                <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                        Welcome to KN Medicolegal Support. You have registered for free access to our Knowledge Hub and informal consultation through our WhatsApp group.
                    </p>
                </div>
            ),
        },
        {
            title: "Informal Consultation via WhatsApp 💬",
            icon: <MessageCircle className="w-6 h-6 text-blue-600" />,
            content: (
                <div className="space-y-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h3 className="font-semibold text-green-900 mb-2">What is Informal Consultation?</h3>
                        <ul className="space-y-2 text-sm text-green-800 list-disc list-inside">
                            <li><strong>Cost:</strong> FREE (No payment required)</li>
                            <li><strong>Access:</strong> Informal consultation through WhatsApp group</li>
                            <li><strong>Knowledge Hub:</strong> Access to medicolegal information and resources</li>
                        </ul>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                        <h4 className="font-semibold text-amber-900 mb-2">Note:</h4>
                        <p className="text-sm text-amber-800">
                            Document upload/download is NOT available under this free registration. For case-specific consultation with document sharing, please opt for our paid service.
                        </p>
                    </div>
                </div>
            ),
        },
        {
            title: "Case Specific Consultation �",
            icon: <QrCode className="w-6 h-6 text-green-600" />,
            content: (
                <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h3 className="font-semibold text-blue-900 mb-2">Case Specific Formal Medicolegal Consultation</h3>
                        <ul className="space-y-2 text-sm text-blue-800 list-disc list-inside">
                            <li><strong>Fee:</strong> ₹10,000</li>
                            <li><strong>Validity:</strong> 30 days</li>
                            <li><strong>Consultations:</strong> Any number of consultations - online or offline - during the 30 days period</li>
                            <li><strong>Features:</strong> Upload & download documents, case-specific guidance</li>
                        </ul>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Additional Services (Extra charges):</h4>
                        <p className="text-sm text-gray-700">
                            Drafting of documents, file audit, medicolegal research on contentious issues etc. is extra depending on the complexity of the case, which will be mutually decided during the consultations.
                        </p>
                    </div>
                </div>
            ),
        },
        {
            title: "Summary 📝",
            content: (
                <div className="space-y-4">
                    <Card className="p-4 border-green-200 bg-green-50">
                        <div className="flex items-start gap-3">
                            <MessageCircle className="w-5 h-5 text-green-600 mt-0.5" />
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">Free Registration (Current)</h4>
                                <p className="text-xs text-gray-600 mb-2">
                                    FREE - No payment
                                </p>
                                <p className="text-xs text-gray-600">
                                    Informal consultation via WhatsApp group + Knowledge Hub access. No document upload/download.
                                </p>
                            </div>
                        </div>
                    </Card>
                    <Card className="p-4 border-blue-200">
                        <div className="flex items-start gap-3">
                            <MessageCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">Case Specific Consultation (Paid)</h4>
                                <p className="text-xs text-gray-600 mb-2">
                                    ₹10,000 - Valid for 30 days
                                </p>
                                <p className="text-xs text-gray-600">
                                    Any number of consultations (online/offline), document upload/download. Additional services at extra cost.
                                </p>
                            </div>
                        </div>
                    </Card>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-900 mb-2">To upgrade to Case Specific Consultation:</h4>
                        <p className="text-sm text-blue-800">
                            Visit the Fee & Packages page to make payment and access the full case-specific consultation service with document upload/download features.
                        </p>
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
