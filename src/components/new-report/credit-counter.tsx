"use client";

import { Coins } from "lucide-react";

export function CreditCounter({ totalCredits }: { totalCredits: number }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/20">
          <Coins className="h-4 w-4 text-blue-600" />
        </div>
        <div>
          <p className="font-medium">Credits Required</p>
        </div>
      </div>
      <div className="text-2xl font-bold text-blue-600">
        {totalCredits}
      </div>
    </div>
  );
}