"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function AdminSettings() {
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/settings", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch settings");
        const data = await res.json();
        setPrice((data.questionPrice ?? 0).toString());
      } catch (error) {
        console.error(error);
        toast.error("Failed to load settings");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleSave = async () => {
    const numeric = Number(price);
    if (Number.isNaN(numeric) || numeric < 0) {
      toast.error("Enter a valid price");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionPrice: numeric }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Unable to update settings");
      }
      toast.success("Pricing updated");
    } catch (error) {
      console.error(error);
      toast.error(error?.message || "Failed to update settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500">
          Configure pricing and default policies for paid consultations.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Question Pricing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-500">
            Set the default price charged to users for each new question. The
            amount is used to create Razorpay orders during checkout.
          </p>
          <div className="flex items-center gap-3 w-full max-w-sm">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-3 flex items-center text-sm text-gray-500">
                ₹
              </span>
              <Input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="pl-8"
                disabled={loading || saving}
                placeholder="Enter price"
                type="number"
                min="0"
                step="0.01"
              />
            </div>
            <Button onClick={handleSave} disabled={saving || loading}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
