"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, Check, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";

export function PricingCard({ onPurchase, loading = false }) {
  const [pricing, setPricing] = useState(null);
  const [loadingPrice, setLoadingPrice] = useState(true);

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const res = await fetch("/api/advance-chat/pricing");
        if (!res.ok) throw new Error("Failed to fetch pricing");
        const data = await res.json();
        setPricing(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load pricing");
      } finally {
        setLoadingPrice(false);
      }
    };

    fetchPricing();
  }, []);

  const currencyFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  });

  const features = [
    "Dedicated advanced support channel",
    "Priority response from experts",
    "Unlimited questions and messages",
    "File attachments support",
    "Complete chat history",
    "Lifetime access (one-time payment)",
  ];

  if (loadingPrice) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto border-2 border-primary/20 shadow-lg">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Sparkles className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold">Advance Chat</CardTitle>
        <CardDescription className="text-base">
          {pricing?.description || "Get premium support with our Advance Chat"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Pricing */}
        <div className="text-center">
          <div className="text-4xl font-bold text-primary">
            {pricing?.amount > 0
              ? currencyFormatter.format(pricing.amount)
              : "Free"}
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            One-time payment • Lifetime access
          </p>
        </div>

        {/* Features */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-foreground">What&apos;s included:</p>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <Button
          onClick={onPurchase}
          disabled={loading || !pricing?.isActive}
          className="w-full h-12 text-base font-semibold"
          size="lg"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Lock className="mr-2 h-5 w-5" />
              {pricing?.amount > 0 ? "Upgrade Now" : "Get Free Access"}
            </>
          )}
        </Button>

        {/* Comparison */}
        <div className="pt-4 border-t">
          <p className="text-xs text-center text-muted-foreground">
            For general guidance, join our <span className="font-medium">WhatsApp Group</span> (free).
            <br />
            Upgrade to <span className="font-medium text-primary">Advance Chat</span> for premium support.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
