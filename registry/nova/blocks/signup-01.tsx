import * as React from "react";
import { ArrowRight, Check, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

function Signup01({ className, ...props }: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "grid min-h-[680px] overflow-hidden rounded-[2rem] border border-foreground/10 bg-[radial-gradient(circle_at_top_left,color-mix(in_oklch,var(--primary)_13%,transparent),transparent_36%),var(--background)] lg:grid-cols-2",
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-center p-7 sm:p-12">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center gap-2 text-sm font-semibold">
            <span className="grid size-8 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Sparkles className="size-4" />
            </span>
            Rivelle
          </div>
          <h1 className="text-3xl font-semibold tracking-[-.04em]">
            Create your workspace
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Start building your next product in a few seconds.
          </p>
          <form className="mt-8 grid gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="first-name">First name</Label>
                <Input id="first-name" placeholder="Maya" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input id="last-name" placeholder="Chen" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-email">Work email</Label>
              <Input
                id="signup-email"
                placeholder="maya@company.com"
                type="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-password">Password</Label>
              <Input id="signup-password" type="password" />
            </div>
            <div className="flex items-start gap-3">
              <Checkbox id="terms" />
              <Label
                className="font-normal leading-relaxed text-muted-foreground"
                htmlFor="terms"
              >
                I agree to the terms and privacy policy.
              </Label>
            </div>
            <Button size="lg">
              Create account <ArrowRight />
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <a className="font-semibold text-foreground" href="#">
              Sign in
            </a>
          </p>
        </div>
      </div>
      <div className="hidden items-center justify-center border-l border-foreground/8 bg-foreground/[.025] p-12 lg:flex">
        <div className="max-w-md">
          <p className="text-sm font-semibold text-primary">
            Everything you need
          </p>
          <h2 className="mt-3 text-4xl font-semibold leading-tight tracking-[-.05em]">
            From blank canvas to polished product.
          </h2>
          <div className="mt-9 space-y-5">
            {[
              "53 editable UI primitives",
              "Production-ready application blocks",
              "Server-first Next.js architecture",
            ].map((item) => (
              <div
                className="flex items-center gap-3 text-sm font-medium"
                key={item}
              >
                <span className="grid size-7 place-items-center rounded-full bg-primary/10 text-primary">
                  <Check className="size-3.5" />
                </span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export { Signup01 };
