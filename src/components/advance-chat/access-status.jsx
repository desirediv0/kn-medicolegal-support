"use client";

import { CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { format } from "date-fns";

export function AccessStatus({ access }) {
  if (!access) {
    return null;
  }

  const { purchaseDate, expiryDate } = access;
  const isLifetime = !expiryDate;
  const isExpired = expiryDate && new Date(expiryDate) < new Date();

  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-50 border border-green-200">
      {isExpired ? (
        <>
          <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-red-700">Access Expired</p>
            <p className="text-xs text-red-600">
              Expired on {format(new Date(expiryDate), "MMM dd, yyyy")}
            </p>
          </div>
        </>
      ) : (
        <>
          <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-green-700">
              {isLifetime ? "Lifetime Access" : "Active Access"}
            </p>
            <p className="text-xs text-green-600">
              {isLifetime ? (
                <>Purchased on {format(new Date(purchaseDate), "MMM dd, yyyy")}</>
              ) : (
                <>Expires on {format(new Date(expiryDate), "MMM dd, yyyy")}</>
              )}
            </p>
          </div>
          {!isLifetime && (
            <Clock className="h-4 w-4 text-green-600 flex-shrink-0" />
          )}
        </>
      )}
    </div>
  );
}
