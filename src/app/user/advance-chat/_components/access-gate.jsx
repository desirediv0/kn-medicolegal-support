"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { PricingCard } from "@/components/advance-chat/pricing-card";
import { AccessStatus } from "@/components/advance-chat/access-status";

export function AccessGate({ children }) {
  const [checking, setChecking] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [accessData, setAccessData] = useState(null);
  const [purchasing, setPurchasing] = useState(false);

  const checkAccess = async () => {
    setChecking(true);
    try {
      const res = await fetch("/api/advance-chat/access");
      if (!res.ok) {
        if (res.status === 401) {
          toast.error("Please log in to continue");
          return;
        }
        throw new Error("Failed to check access");
      }
      const data = await res.json();
      setHasAccess(data.hasAccess);
      setAccessData(data.access);
    } catch (error) {
      console.error(error);
      toast.error("Failed to verify access");
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    checkAccess();
  }, []);

  const handlePurchase = async () => {
    setPurchasing(true);
    try {
      // Step 1: Initiate access purchase
      const initiateRes = await fetch("/api/advance-chat/access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!initiateRes.ok) {
        const data = await initiateRes.json();
        throw new Error(data.error || "Failed to initiate purchase");
      }

      const { requiresPayment, access } = await initiateRes.json();

      if (!requiresPayment) {
        // Free access granted
        toast.success("Access granted! Enjoy Advance Chat.");
        setHasAccess(true);
        setAccessData(access);
        return;
      }

      // Step 2: Create Razorpay order
      const orderRes = await fetch("/api/advance-chat/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessId: access.id }),
      });

      if (!orderRes.ok) {
        const data = await orderRes.json();
        throw new Error(data.error || "Failed to create payment order");
      }

      const { order, key } = await orderRes.json();

      if (!order || !key) {
        throw new Error("Invalid Razorpay configuration");
      }

      // Step 3: Open Razorpay checkout
      const currencyFormatter = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 2,
      });

      const options = {
        key,
        amount: order.amount,
        currency: order.currency,
        name: "KN Medicolegal Support",
        description: `Advance Chat Access (${currencyFormatter.format(
          order.amount / 100
        )})`,
        order_id: order.id,
        handler: async function (response) {
          await verifyPayment({
            accessId: access.id,
            ...response,
          });
        },
        modal: {
          ondismiss: function () {
            setPurchasing(false);
            toast.info("Payment cancelled");
          },
        },
      };

      if (typeof window !== "undefined" && window.Razorpay) {
        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } else {
        throw new Error("Razorpay is not available");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.message || "Purchase failed");
      setPurchasing(false);
    }
  };

  const verifyPayment = async ({
    accessId,
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
  }) => {
    try {
      const res = await fetch("/api/advance-chat/payments/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accessId,
          razorpayPaymentId: razorpay_payment_id,
          razorpayOrderId: razorpay_order_id,
          razorpaySignature: razorpay_signature,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Payment verification failed");
      }

      const { access } = await res.json();
      toast.success("Payment successful! Welcome to Advance Chat.");
      setHasAccess(true);
      setAccessData(access);
    } catch (error) {
      console.error(error);
      toast.error(error?.message || "Payment verification failed");
    } finally {
      setPurchasing(false);
    }
  };

  if (checking) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="text-sm text-muted-foreground">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] p-6">
        <div className="w-full max-w-2xl space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Advance Chat</h1>
            <p className="text-muted-foreground">
              Unlock premium support with dedicated expert assistance
            </p>
          </div>
          <PricingCard onPurchase={handlePurchase} loading={purchasing} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <AccessStatus access={accessData} />
      {children}
    </div>
  );
}
