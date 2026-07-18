import * as React from "react";
import {
  ArrowRight,
  Check,
  Command,
  Play,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";

import { ContactForm01 } from "@/components/blocks/contact-form-01";
import { FeatureSection01 } from "@/components/blocks/feature-section-01";
import { Footer01 } from "@/components/blocks/footer-01";
import { Pricing01 } from "@/components/blocks/pricing-01";
import { SiteHeader01 } from "@/components/blocks/site-header-01";
import { TestimonialSection01 } from "@/components/blocks/testimonial-section-01";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

function SaasLanding01({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("min-h-screen bg-background text-foreground", className)}
      data-slot="saas-landing-template"
      {...props}
    >
      <SiteHeader01 />
      <main>
        <section
          className="relative overflow-hidden px-5 pb-20 pt-20 sm:px-8 sm:pb-28 sm:pt-28"
          id="top"
        >
          <div className="absolute inset-x-0 top-0 -z-10 h-[720px] [background-image:radial-gradient(circle_at_50%_0%,color-mix(in_oklch,var(--primary)_28%,transparent),transparent_48%),linear-gradient(to_right,color-mix(in_oklch,var(--foreground)_5%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklch,var(--foreground)_5%,transparent)_1px,transparent_1px)] [background-size:auto,52px_52px,52px_52px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-4xl text-center">
              <Badge variant="secondary">
                <Sparkles /> The operating system for focused teams
              </Badge>
              <h1 className="mt-7 text-balance text-5xl font-semibold leading-[.97] tracking-[-.065em] sm:text-7xl lg:text-[5.4rem]">
                Turn ambitious plans into{" "}
                <span className="text-primary">visible momentum.</span>
              </h1>
              <p className="mx-auto mt-7 max-w-2xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
                Plan projects, preserve decisions and help every team move with
                confidence in one calm, connected workspace.
              </p>
              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <Button size="lg">
                  Start free <ArrowRight />
                </Button>
                <Button size="lg" variant="outline">
                  <Play /> Watch 90-second tour
                </Button>
              </div>
              <p className="mt-5 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Check className="size-3.5 text-primary" /> Free for small teams
                · No card required
              </p>
            </div>
            <div className="relative mx-auto mt-16 max-w-5xl rounded-[2rem] border border-foreground/10 bg-background/75 p-2 shadow-[0_50px_140px_-80px_var(--primary)] backdrop-blur-xl sm:p-4">
              <div className="overflow-hidden rounded-[1.5rem] border border-foreground/10 bg-muted/35">
                <div className="flex h-12 items-center gap-2 border-b border-foreground/8 bg-background/80 px-4">
                  <span className="size-2.5 rounded-full bg-rose-400" />
                  <span className="size-2.5 rounded-full bg-amber-400" />
                  <span className="size-2.5 rounded-full bg-emerald-400" />
                  <span className="ml-3 text-xs font-semibold text-muted-foreground">
                    Northstar / Product launch
                  </span>
                  <Command className="ml-auto size-4 text-muted-foreground" />
                </div>
                <div className="grid min-h-[420px] md:grid-cols-[190px_1fr]">
                  <aside className="hidden border-r border-foreground/8 bg-background/55 p-4 md:block">
                    <p className="text-xs font-semibold">Workspace</p>
                    <div className="mt-5 space-y-2">
                      {["Overview", "Projects", "Roadmap", "Insights"].map(
                        (item, index) => (
                          <div
                            className={cn(
                              "rounded-lg px-3 py-2 text-xs font-medium text-muted-foreground",
                              index === 1 && "bg-primary/10 text-primary",
                            )}
                            key={item}
                          >
                            {item}
                          </div>
                        ),
                      )}
                    </div>
                  </aside>
                  <div className="p-5 sm:p-7">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs font-medium text-muted-foreground">
                          Q3 launch
                        </p>
                        <h2 className="mt-1 text-2xl font-semibold tracking-[-.04em]">
                          Product momentum
                        </h2>
                      </div>
                      <div className="flex -space-x-2">
                        {["MC", "JO", "AK"].map((initials) => (
                          <Avatar
                            className="size-8 border-2 border-background"
                            key={initials}
                          >
                            <AvatarFallback className="text-[.6rem]">
                              {initials}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                    </div>
                    <div className="mt-7 grid gap-4 sm:grid-cols-3">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="flex items-center gap-2 text-xs text-muted-foreground">
                            <TrendingUp className="size-3.5 text-primary" />{" "}
                            Progress
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <strong className="text-2xl">74%</strong>
                          <Progress className="mt-3" value={74} />
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Users className="size-3.5 text-primary" />{" "}
                            Contributors
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <strong className="text-2xl">18</strong>
                          <p className="mt-2 text-xs text-muted-foreground">
                            Across 4 teams
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-xs text-muted-foreground">
                            Decisions
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <strong className="text-2xl">32</strong>
                          <p className="mt-2 text-xs text-emerald-600">
                            +8 this week
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="mt-4 rounded-2xl border border-foreground/10 bg-background p-5">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold">
                          Launch milestones
                        </p>
                        <Badge variant="secondary">On track</Badge>
                      </div>
                      <div className="mt-5 space-y-4">
                        {[
                          ["Research synthesis", "Complete"],
                          ["Beta onboarding", "In review"],
                          ["Public launch", "Aug 28"],
                        ].map(([title, status], index) => (
                          <div className="flex items-center gap-3" key={title}>
                            <span
                              className={cn(
                                "grid size-6 place-items-center rounded-full border text-[.6rem]",
                                index === 0
                                  ? "border-primary bg-primary text-primary-foreground"
                                  : "border-foreground/15",
                              )}
                            >
                              {index === 0 ? (
                                <Check className="size-3" />
                              ) : (
                                index + 1
                              )}
                            </span>
                            <span className="text-xs font-medium">{title}</span>
                            <span className="ml-auto text-xs text-muted-foreground">
                              {status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-6 text-center text-sm font-semibold text-muted-foreground sm:grid-cols-5">
              {["ARC", "COMMON", "NORTH/", "RATIO", "LINEAR+"].map((brand) => (
                <span key={brand}>{brand}</span>
              ))}
            </div>
          </div>
        </section>
        <FeatureSection01 />
        <TestimonialSection01 />
        <section className="px-5 py-24 sm:px-8 sm:py-32" id="pricing">
          <div className="mx-auto max-w-7xl">
            <Pricing01 />
          </div>
        </section>
        <ContactForm01 />
      </main>
      <Footer01 />
    </div>
  );
}

export { SaasLanding01 };
