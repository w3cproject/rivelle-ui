import * as React from "react";
import { ArrowRight, Play, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function Hero01({ className, ...props }: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "relative min-h-[640px] overflow-hidden rounded-[2rem] border border-foreground/10 bg-background px-6 py-8 sm:px-10",
        className,
      )}
      {...props}
    >
      <div className="absolute inset-0 -z-0 [background-image:radial-gradient(circle_at_50%_-10%,color-mix(in_oklch,var(--primary)_24%,transparent),transparent_48%),linear-gradient(to_right,color-mix(in_oklch,var(--foreground)_5%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklch,var(--foreground)_5%,transparent)_1px,transparent_1px)] [background-size:auto,48px_48px,48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
      <nav className="relative flex items-center justify-between">
        <a className="flex items-center gap-2 font-semibold" href="#">
          <span className="grid size-8 place-items-center rounded-xl bg-primary text-primary-foreground">
            <Sparkles className="size-4" />
          </span>
          Northstar
        </a>
        <div className="hidden gap-7 text-sm text-muted-foreground md:flex">
          <a href="#">Product</a>
          <a href="#">Customers</a>
          <a href="#">Pricing</a>
        </div>
        <Button size="sm" variant="outline">
          Sign in
        </Button>
      </nav>
      <div className="relative mx-auto flex max-w-4xl flex-col items-center pb-10 pt-28 text-center sm:pt-36">
        <Badge variant="secondary">
          <Sparkles /> Now in public beta
        </Badge>
        <h1 className="mt-7 text-balance text-5xl font-semibold leading-[.98] tracking-[-.06em] sm:text-7xl">
          Make ambitious work feel effortless.
        </h1>
        <p className="mt-6 max-w-2xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
          A focused workspace for creative teams to plan, build and ship their
          best work without losing momentum.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button size="lg">
            Start building <ArrowRight />
          </Button>
          <Button size="lg" variant="outline">
            <Play /> Watch overview
          </Button>
        </div>
        <p className="mt-5 text-xs text-muted-foreground">
          No credit card · Free for small teams
        </p>
      </div>
    </section>
  );
}

export { Hero01 };
