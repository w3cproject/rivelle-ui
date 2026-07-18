import * as React from "react";
import { ArrowUpRight, Dribbble, Github, MapPin } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function ProfileCard01({
  className,
  ...props
}: React.ComponentProps<"article">) {
  return (
    <article
      className={cn(
        "relative mx-auto w-full max-w-lg overflow-hidden rounded-[2rem] border border-foreground/10 bg-background p-6 shadow-[0_30px_90px_-65px_var(--foreground)] sm:p-8",
        className,
      )}
      data-slot="profile-card"
      {...props}
    >
      <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_20%_0%,color-mix(in_oklch,var(--primary)_24%,transparent),transparent_66%)]" />
      <div className="relative flex items-start justify-between gap-5">
        <Avatar className="size-20 border-4 border-background shadow-lg">
          <AvatarFallback className="text-lg">AL</AvatarFallback>
        </Avatar>
        <Badge variant="success">Available</Badge>
      </div>
      <div className="relative mt-5">
        <h2 className="text-2xl font-semibold tracking-[-.035em]">
          Avery Lane
        </h2>
        <p className="mt-1 text-sm font-medium text-primary">
          Independent product designer
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          I help ambitious teams turn complex products into clear, memorable
          experiences.
        </p>
        <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
          <MapPin className="size-3.5" /> Copenhagen · Working worldwide
        </p>
      </div>
      <div className="relative mt-6 flex items-center gap-2">
        <Button className="flex-1">
          Start a project <ArrowUpRight />
        </Button>
        <Button aria-label="GitHub" size="icon" variant="outline">
          <Github />
        </Button>
        <Button aria-label="Dribbble" size="icon" variant="outline">
          <Dribbble />
        </Button>
      </div>
    </article>
  );
}

export { ProfileCard01 };
