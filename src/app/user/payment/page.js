"use client";

import Image from "next/image";
import { CreditCard, Smartphone, Building2 } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function PaymentPage() {
  return (
    <div className="min-h-[100dvh] bg-background py-6 sm:py-10">
      <div className="mx-auto w-full max-w-4xl px-4">
        {/* Header */}
        <header className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary mb-2">
            KN Medicolegal Support
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-primary md:text-4xl mb-3">
            Payment via QR Code or Bank Transfer
          </h1>
          <p className="mx-auto max-w-2xl text-sm text-foreground/70 md:text-base">
            Choose your preferred payment method below
          </p>
        </header>

        {/* Payment Card */}
        <Card className="border-primary/15 bg-white shadow-[0_24px_80px_rgba(15,48,68,0.12)] p-6 md:p-10">
          <div className="grid md:grid-cols-2 gap-8">
            {/* QR Code Payment Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">SCAN TO PAY</h2>
              <div className="relative w-full aspect-square bg-white rounded-2xl border-2 border-primary/20 p-4 shadow-lg">
                <div className="relative w-full h-full">
                  <Image
                    src="/qr.jpeg"
                    alt="Payment QR Code"
                    fill
                    className="object-contain rounded-lg"
                    priority
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                </div>
              </div>
              <div className="text-center space-y-2">
                <p className="text-sm font-medium text-gray-900">UPI ID: drsanjaynarula@sbi</p>
                <p className="text-xs text-gray-600">Use any UPI app</p>
              </div>
            </div>

            {/* Bank Transfer Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold text-gray-900">Bank Transfer</h2>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div>
                  <p className="text-xs font-medium text-gray-600 mb-1">Bank</p>
                  <p className="text-sm font-semibold text-gray-900">State Bank of India</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-600 mb-1">A/C No.</p>
                  <p className="text-sm font-semibold text-gray-900">44717262489</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-600 mb-1">IFSC</p>
                  <p className="text-sm font-semibold text-gray-900">SBIN0060414</p>
                </div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8 space-y-4">
            <div className="flex items-start gap-3 rounded-xl bg-primary/5 p-4 text-left">
              <Smartphone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="space-y-2">
                <h3 className="font-semibold text-sm text-foreground">
                  How to Pay via QR Code
                </h3>
                <ol className="space-y-1.5 text-xs text-foreground/80 list-decimal list-inside">
                  <li>
                    Open any UPI app on your phone (PhonePe, Google Pay,
                    Paytm, etc.)
                  </li>
                  <li>Tap on &quot;Scan QR Code&quot; in your UPI app</li>
                  <li>Point your camera at the QR code above</li>
                  <li>
                    Enter the payment amount and complete the transaction
                  </li>
                  <li>Keep the payment receipt for your records</li>
                </ol>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl bg-secondary/50 p-4 text-left">
              <CreditCard className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="space-y-2">
                <h3 className="font-semibold text-sm text-foreground">
                  Payment Information
                </h3>
                <ul className="space-y-1.5 text-xs text-foreground/80">
                  <li>• Payments are processed securely through UPI or Bank Transfer</li>
                  <li>• Payment confirmation may take a few minutes</li>
                  <li>• For payment-related queries, contact support</li>
                  <li>• Please mention your order/reference number in the payment description</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Support Info */}
        <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-4 text-center">
          <p className="text-xs text-foreground/70 md:text-sm">
            Need help with payment? Contact us at{" "}
            <a
              href="mailto:knmedicolegal@gmail.com"
              className="font-semibold text-primary underline-offset-2 hover:underline"
            >
              knmedicolegal@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
