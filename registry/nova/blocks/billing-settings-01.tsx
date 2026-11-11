"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { cn } from "@/lib/utils";

export function BillingSettings01({
  onPlanChange,
  onManagePayment,
  className,
}: {
  onPlanChange?: (plan: string, yearly: boolean) => Promise<void> | void;
  onManagePayment?: () => void;
  className?: string;
}) {
  const [yearly, setYearly] = React.useState(false),
    [plan, setPlan] = React.useState("Studio"),
    [message, setMessage] = React.useState(""),
    [busy, setBusy] = React.useState(false);
  const invoices = [
    { id: "INV-1084", date: "2026-11-01", total: 24, status: "Paid" },
    { id: "INV-1051", date: "2026-10-01", total: 24, status: "Paid" },
    { id: "INV-1029", date: "2026-09-01", total: 24, status: "Paid" },
  ];
  return (
    <section
      className={cn(
        "mx-auto w-full max-w-4xl space-y-8 rounded-xl border bg-background p-6 sm:p-8",
        className,
      )}
    >
      <header>
        <h2 className="text-2xl font-medium">Plan and billing</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Review your workspace subscription and invoice history
        </p>
      </header>
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm">
          Current plan <span className="ml-2 font-medium">{plan}</span>
        </p>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={yearly}
            onChange={(e) => setYearly(e.target.checked)}
          />
          Yearly billing · save 20%
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          ["Personal", 0, "For independent projects"],
          ["Studio", 24, "For a growing team"],
          ["Business", 64, "For multiple workspaces"],
        ].map(([name, price, description]) => (
          <article
            key={name}
            className={cn(
              "rounded-xl border p-5",
              plan === name && "border-primary",
            )}
          >
            <h3 className="font-medium">{name}</h3>
            <p className="mt-3 text-3xl tabular-nums">
              ${yearly ? Math.round(Number(price) * 0.8) : price}
              <span className="text-xs text-muted-foreground"> / month</span>
            </p>
            <p className="mt-3 min-h-10 text-xs text-muted-foreground">
              {description}
            </p>
            <Button
              className="mt-5 w-full"
              variant={plan === name ? "secondary" : "outline"}
              disabled={busy || plan === name}
              onClick={async () => {
                setBusy(true);
                try {
                  await onPlanChange?.(String(name), yearly);
                  setPlan(String(name));
                  setMessage(
                    onPlanChange
                      ? "Plan updated"
                      : "Demo plan updated. Connect onPlanChange to your billing provider.",
                  );
                } catch {
                  setMessage("Plan change failed. Please try again.");
                } finally {
                  setBusy(false);
                }
              }}
            >
              {plan === name ? "Current plan" : "Choose plan"}
            </Button>
          </article>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg bg-muted/40 p-4">
        <div>
          <p className="text-sm">Visa ending in 4242</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Expires 08/2028 · Demo payment method
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            onManagePayment
              ? onManagePayment()
              : setMessage(
                  "Connect onManagePayment to open your customer portal.",
                )
          }
        >
          Manage payment
        </Button>
      </div>
      <p role="status" className="text-sm text-muted-foreground">
        {message}
      </p>
      <div>
        <h3 className="mb-4 font-medium">Invoices</h3>
        <DataTable
          data={invoices}
          getRowId={(row) => row.id}
          label="Invoices"
          columns={[
            {
              id: "id",
              header: "Invoice",
              value: (row) => row.id,
              hideable: false,
            },
            { id: "date", header: "Date", value: (row) => row.date },
            {
              id: "total",
              header: "Amount",
              value: (row) => row.total,
              cell: (row) => `$${row.total}.00`,
            },
            { id: "status", header: "Status", value: (row) => row.status },
          ]}
        />
      </div>
    </section>
  );
}
