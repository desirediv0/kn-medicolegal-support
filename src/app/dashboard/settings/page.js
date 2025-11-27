"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function AdminSettings() {
  const [generalPrice, setGeneralPrice] = useState("");
  const [advancePrice, setAdvancePrice] = useState("");
  const [loading, setLoading] = useState(true);
  const [savingGeneral, setSavingGeneral] = useState(false);
  const [savingAdvance, setSavingAdvance] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/settings", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch settings");
        const data = await res.json();
        setGeneralPrice((data.questionPrice ?? 0).toString());
        setAdvancePrice((data.advanceQuestionPrice ?? 0).toString());
      } catch (error) {
        console.error(error);
        toast.error("Failed to load settings");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleSaveGeneral = async () => {
    const numeric = Number(generalPrice);
    if (Number.isNaN(numeric) || numeric < 0) {
      toast.error("Enter a valid price");
      return;
    }
    setSavingGeneral(true);
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
      toast.success("General Chat pricing updated");
    } catch (error) {
      console.error(error);
      toast.error(error?.message || "Failed to update settings");
    } finally {
      setSavingGeneral(false);
    }
  };

  const handleSaveAdvance = async () => {
    const numeric = Number(advancePrice);
    if (Number.isNaN(numeric) || numeric < 0) {
      toast.error("Enter a valid price");
      return;
    }
    setSavingAdvance(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ advanceQuestionPrice: numeric }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Unable to update settings");
      }
      toast.success("Advance Chat pricing updated");
    } catch (error) {
      console.error(error);
      toast.error(error?.message || "Failed to update settings");
    } finally {
      setSavingAdvance(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Chat Pricing Settings</h1>
        <p className="text-sm text-gray-500">
          Configure pricing for General Chat and Advance Chat questions.
        </p>
      </div>

      {/* General Chat Pricing */}
      <Card>
        <CardHeader>
          <CardTitle>General Chat Pricing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-500">
            Set the price charged to users for each General Chat question.
          </p>
          <div className="flex items-center gap-3 w-full max-w-sm">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-3 flex items-center text-sm text-gray-500">
                ₹
              </span>
              <Input
                value={generalPrice}
                onChange={(e) => setGeneralPrice(e.target.value)}
                className="pl-8"
                disabled={loading || savingGeneral}
                placeholder="Enter price"
                type="number"
                min="0"
                step="0.01"
              />
            </div>
            <Button onClick={handleSaveGeneral} disabled={savingGeneral || loading}>
              {savingGeneral ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Advance Chat Pricing */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="text-primary">Advance Chat Pricing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-500">
            Set the price charged to users for each Advance Chat question.
          </p>
          <div className="flex items-center gap-3 w-full max-w-sm">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-3 flex items-center text-sm text-gray-500">
                ₹
              </span>
              <Input
                value={advancePrice}
                onChange={(e) => setAdvancePrice(e.target.value)}
                className="pl-8"
                disabled={loading || savingAdvance}
                placeholder="Enter price"
                type="number"
                min="0"
                step="0.01"
              />
            </div>
            <Button onClick={handleSaveAdvance} disabled={savingAdvance || loading}>
              {savingAdvance ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
