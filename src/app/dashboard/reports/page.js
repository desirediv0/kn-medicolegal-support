"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function AdminReports() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>
          <p className="text-sm text-gray-500">
            Export payment and conversation data for offline analysis.
          </p>
        </div>
        <Button variant="outline" className="flex items-center gap-2" disabled>
          <Download className="h-4 w-4" />
          Download CSV (coming soon)
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Export Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-gray-500">
            Detailed reporting export will be available shortly. You&apos;ll be
            able to pull user payments, question lifecycle, and attachment logs.
          </p>
          <p className="text-sm text-gray-500">
            For now, you can review live data from the Questions and Users
            sections.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
