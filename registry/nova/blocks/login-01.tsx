import * as React from "react";
import { ArrowRight, Github, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

function Login01({ className, ...props }: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "grid min-h-[680px] overflow-hidden rounded-[2rem] border border-foreground/10 bg-background lg:grid-cols-[1.05fr_.95fr]",
        className,
      )}
      {...props}
    >
      <div className="relative hidden overflow-hidden bg-foreground p-10 text-background lg:flex lg:flex-col">
        <div className="absolute inset-0 opacity-55 [background-image:radial-gradient(circle_at_20%_15%,color-mix(in_oklch,var(--primary)_70%,transparent),transparent_32%),linear-gradient(145deg,transparent_30%,color-mix(in_oklch,var(--primary)_45%,transparent))]" />
        <div className="relative flex items-center gap-2 text-sm font-semibold">
          <span className="grid size-8 place-items-center rounded-xl bg-background/10 text-primary">
            <Sparkles className="size-4" />
          </span>
          Rivelle Studio
        </div>
        <div className="relative mt-auto max-w-lg">
          <p className="text-3xl font-semibold leading-tight tracking-[-.04em]">
            Build interfaces people remember.
          </p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-background/60">
            Editable components, thoughtful defaults and the freedom to own
            every detail.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center p-7 sm:p-12">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[.16em] text-primary">
              Welcome back
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-[-.04em]">
              Sign in to your account
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter your details to continue to your workspace.
            </p>
          </div>
          <form className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="login-email">Email</Label>
              <Input
                id="login-email"
                placeholder="you@company.com"
                type="email"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="login-password">Password</Label>
                <a
                  className="text-xs font-semibold text-primary hover:underline"
                  href="#"
                >
                  Forgot password?
                </a>
              </div>
              <Input id="login-password" type="password" />
            </div>
            <Button className="w-full" size="lg">
              Sign in <ArrowRight />
            </Button>
          </form>
          <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
            or continue with
          </div>
          <Button className="w-full" variant="outline">
            <Github /> GitHub
          </Button>
          <p className="mt-7 text-center text-sm text-muted-foreground">
            New to Rivelle?{" "}
            <a
              className="font-semibold text-foreground hover:text-primary"
              href="#"
            >
              Create an account
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

export { Login01 };
