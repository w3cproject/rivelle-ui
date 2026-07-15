import * as React from "react";
import { ArrowRight, FolderPlus, Sparkles, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { cn } from "@/lib/utils";

function EmptyProject01({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "relative grid min-h-[560px] place-items-center overflow-hidden rounded-[2rem] border border-foreground/10 bg-background p-6",
        className,
      )}
      {...props}
    >
      <div className="absolute inset-0 [background-image:radial-gradient(circle_at_center,color-mix(in_oklch,var(--primary)_10%,transparent),transparent_42%),linear-gradient(to_right,color-mix(in_oklch,var(--foreground)_4%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklch,var(--foreground)_4%,transparent)_1px,transparent_1px)] [background-size:auto,40px_40px,40px_40px] [mask-image:radial-gradient(circle_at_center,black,transparent_70%)]" />
      <Empty className="relative max-w-xl border-0 bg-transparent">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FolderPlus />
          </EmptyMedia>
          <div className="mb-1 flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-[.12em] text-primary">
            <Sparkles className="size-3.5" />
            Your first project
          </div>
          <EmptyTitle>Turn an idea into something real.</EmptyTitle>
          <EmptyDescription>
            Create a blank project or import an existing design. Your team can
            join whenever you are ready.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button>
            Create project <ArrowRight />
          </Button>
          <Button variant="outline">
            <Upload /> Import project
          </Button>
        </EmptyContent>
        <p className="mt-2 text-xs text-muted-foreground">
          Projects are private until you share them.
        </p>
      </Empty>
    </section>
  );
}

export { EmptyProject01 };
