import * as React from "react";
import { ArrowRight, Boxes, Gauge, ShieldCheck, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Gauge,
    title: "Move at product speed",
    description:
      "Turn briefs into aligned plans, decisions and releases without stitching together five different tools.",
  },
  {
    icon: Boxes,
    title: "One shared system",
    description:
      "Connect projects, docs and feedback in a flexible workspace your whole team can understand.",
  },
  {
    icon: ShieldCheck,
    title: "Ready for serious work",
    description:
      "Granular permissions, audit history and dependable infrastructure arrive as standard.",
  },
];

function FeatureSection01({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn("px-5 py-24 sm:px-8 sm:py-32", className)}
      data-slot="feature-section"
      id="product"
      {...props}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div>
            <Badge variant="secondary">
              <Sparkles /> Built for momentum
            </Badge>
            <h2 className="mt-6 text-balance text-4xl font-semibold tracking-[-.05em] sm:text-6xl">
              Everything important stays in motion.
            </h2>
          </div>
          <div className="lg:pb-2">
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              A calm operating system for modern teams. Flexible enough for
              early ideas, structured enough for the work that follows.
            </p>
            <Button className="mt-6" variant="outline">
              Explore the platform <ArrowRight />
            </Button>
          </div>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {features.map(({ icon: Icon, title, description }, index) => (
            <article
              className="group rounded-[1.75rem] border border-foreground/10 bg-background p-6 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_30px_80px_-60px_var(--primary)] sm:p-8"
              key={title}
            >
              <div className="flex items-center justify-between">
                <span className="grid size-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </span>
                <span className="text-xs font-semibold text-muted-foreground">
                  0{index + 1}
                </span>
              </div>
              <h3 className="mt-12 text-xl font-semibold tracking-[-.03em]">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export { FeatureSection01 };
