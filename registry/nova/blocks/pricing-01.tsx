import * as React from "react";
import { Check, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    price: "$0",
    description: "For experiments and personal projects.",
    features: ["3 projects", "Community support", "Core components"],
  },
  {
    name: "Pro",
    price: "$24",
    description: "For makers shipping real products.",
    features: [
      "Unlimited projects",
      "All blocks and templates",
      "Priority support",
    ],
    featured: true,
  },
  {
    name: "Studio",
    price: "$79",
    description: "For teams building together.",
    features: ["Everything in Pro", "10 team seats", "Shared presets"],
  },
];

function Pricing01({ className, ...props }: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "rounded-[2rem] border border-foreground/10 bg-background px-6 py-16 sm:px-10",
        className,
      )}
      {...props}
    >
      <div className="mx-auto max-w-2xl text-center">
        <Badge variant="outline">
          <Sparkles /> Simple pricing
        </Badge>
        <h1 className="mt-5 text-4xl font-semibold tracking-[-.05em] sm:text-5xl">
          Choose room to grow.
        </h1>
        <p className="mt-4 text-muted-foreground">
          Start free. Upgrade when your product and team need more.
        </p>
      </div>
      <div className="mx-auto mt-12 grid max-w-5xl gap-5 lg:grid-cols-3">
        {plans.map((plan) => (
          <div
            className={cn(
              "relative flex flex-col rounded-3xl border p-7",
              plan.featured
                ? "border-primary/35 bg-primary/[.055] shadow-[0_28px_80px_-48px_var(--primary)]"
                : "border-foreground/10 bg-foreground/[.025]",
            )}
            key={plan.name}
          >
            {plan.featured && (
              <Badge className="absolute right-5 top-5">Popular</Badge>
            )}
            <p className="text-sm font-semibold">{plan.name}</p>
            <div className="mt-5 flex items-end gap-1">
              <span className="text-4xl font-semibold tracking-[-.05em]">
                {plan.price}
              </span>
              <span className="pb-1 text-sm text-muted-foreground">/month</span>
            </div>
            <p className="mt-3 min-h-12 text-sm leading-relaxed text-muted-foreground">
              {plan.description}
            </p>
            <Button
              className="mt-6"
              variant={plan.featured ? "default" : "outline"}
            >
              Choose {plan.name}
            </Button>
            <div className="mt-7 space-y-3 border-t border-foreground/8 pt-6">
              {plan.features.map((feature) => (
                <div className="flex items-center gap-2 text-sm" key={feature}>
                  <Check className="size-4 text-primary" />
                  {feature}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export { Pricing01 };
