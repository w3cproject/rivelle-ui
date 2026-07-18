import * as React from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Asterisk,
  Circle,
  Plus,
  Sparkles,
} from "lucide-react";

import { ContactForm01 } from "@/components/blocks/contact-form-01";
import { Footer01 } from "@/components/blocks/footer-01";
import { ProfileCard01 } from "@/components/blocks/profile-card-01";
import { SiteHeader01 } from "@/components/blocks/site-header-01";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const projects = [
  {
    number: "01",
    title: "Morrow Health",
    type: "Brand system · Product",
    tone: "from-violet-500/35 via-fuchsia-400/15 to-transparent",
    shape: "rounded-full",
  },
  {
    number: "02",
    title: "Field Notes",
    type: "Editorial · Commerce",
    tone: "from-amber-400/35 via-orange-400/15 to-transparent",
    shape: "rounded-[2rem] rotate-12",
  },
  {
    number: "03",
    title: "Common Ground",
    type: "Strategy · Digital",
    tone: "from-cyan-400/30 via-blue-500/15 to-transparent",
    shape: "rounded-full scale-x-150",
  },
];

function CreativePortfolio01({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("min-h-screen bg-background text-foreground", className)}
      data-slot="creative-portfolio-template"
      {...props}
    >
      <SiteHeader01
        brand="Atelier 17"
        ctaHref="#contact"
        ctaLabel="Start a project"
        links={[
          { label: "Work", href: "#work" },
          { label: "Services", href: "#services" },
          { label: "About", href: "#about" },
          { label: "Contact", href: "#contact" },
        ]}
        profileEmail="hello@atelier17.studio"
        profileName="Avery Lane"
      />
      <main>
        <section
          className="relative overflow-hidden px-5 pb-20 pt-20 sm:px-8 sm:pb-28 sm:pt-28"
          id="top"
        >
          <div className="absolute right-[-10%] top-[-20%] -z-10 size-[560px] rounded-full bg-primary/12 blur-[110px]" />
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[1.35fr_.65fr] lg:items-end">
              <div>
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.16em] text-muted-foreground">
                  <Asterisk className="size-4 text-primary" /> Independent
                  creative practice
                </p>
                <h1 className="mt-8 max-w-5xl text-balance text-6xl font-semibold leading-[.9] tracking-[-.075em] sm:text-8xl lg:text-[7.4rem]">
                  Clear ideas.
                  <br />
                  <span className="font-normal italic text-primary">
                    Unexpected
                  </span>{" "}
                  form.
                </h1>
              </div>
              <div className="lg:pb-3">
                <p className="max-w-md text-base leading-relaxed text-muted-foreground">
                  We shape identities and digital products for people building a
                  more interesting future.
                </p>
                <Button className="mt-7" size="lg">
                  Explore selected work <ArrowDownRight />
                </Button>
              </div>
            </div>
            <div className="mt-16 grid gap-4 border-y border-foreground/10 py-5 text-xs font-semibold uppercase tracking-[.12em] text-muted-foreground sm:grid-cols-3">
              <span>Strategy · Identity · Digital</span>
              <span className="sm:text-center">Copenhagen / Worldwide</span>
              <span className="sm:text-right">Selected work 2024—2026</span>
            </div>
          </div>
        </section>
        <section className="px-5 py-20 sm:px-8 sm:py-28" id="work">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-end justify-between gap-6">
              <div>
                <Badge variant="outline">
                  <Sparkles /> Selected work
                </Badge>
                <h2 className="mt-5 text-4xl font-semibold tracking-[-.05em] sm:text-6xl">
                  Three recent collaborations.
                </h2>
              </div>
              <Button className="hidden sm:inline-flex" variant="ghost">
                View archive <ArrowRight />
              </Button>
            </div>
            <div className="mt-12 space-y-5">
              {projects.map((project) => (
                <article
                  className="group grid min-h-[440px] overflow-hidden rounded-[2rem] border border-foreground/10 bg-foreground text-background md:grid-cols-[.42fr_.58fr]"
                  key={project.title}
                >
                  <div className="flex flex-col p-7 sm:p-10">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-background/50">
                        {project.number}
                      </span>
                      <Button
                        className="border-background/15 bg-background/10 text-background hover:bg-background/20"
                        size="icon"
                        variant="outline"
                      >
                        <ArrowUpRight />
                      </Button>
                    </div>
                    <div className="mt-auto">
                      <p className="text-xs font-semibold uppercase tracking-[.12em] text-background/50">
                        {project.type}
                      </p>
                      <h3 className="mt-3 text-4xl font-semibold tracking-[-.05em] sm:text-5xl">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                  <div
                    className={cn(
                      "relative min-h-72 overflow-hidden bg-gradient-to-br",
                      project.tone,
                    )}
                  >
                    <div className="absolute inset-8 grid place-items-center rounded-[1.5rem] border border-background/15 bg-background/[.055]">
                      <div
                        className={cn(
                          "size-40 border border-background/30 bg-background/10 backdrop-blur-md transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6",
                          project.shape,
                        )}
                      />
                      <Circle className="absolute size-10 text-background/70" />
                      <Plus className="absolute bottom-8 right-8 size-5 text-background/50" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="px-5 py-20 sm:px-8 sm:py-28" id="about">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.72fr_1.28fr]">
            <ProfileCard01 />
            <div className="rounded-[2rem] border border-foreground/10 bg-muted/35 p-7 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[.14em] text-primary">
                How we work
              </p>
              <h2 className="mt-5 max-w-3xl text-balance text-4xl font-semibold tracking-[-.05em] sm:text-6xl">
                Small senior teams, close collaboration, no theatre.
              </h2>
              <div className="mt-12 grid gap-6 sm:grid-cols-3">
                {[
                  [
                    "01",
                    "Find the signal",
                    "Research and a sharp shared brief.",
                  ],
                  [
                    "02",
                    "Make the system",
                    "A coherent idea across every touchpoint.",
                  ],
                  [
                    "03",
                    "Ship with care",
                    "Detailed delivery that survives reality.",
                  ],
                ].map(([number, title, text]) => (
                  <div
                    className="border-t border-foreground/12 pt-5"
                    key={number}
                  >
                    <span className="text-xs font-semibold text-primary">
                      {number}
                    </span>
                    <h3 className="mt-5 font-semibold">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <ContactForm01
          description="Tell us where the work is today, what should change and why it matters. We’ll reply with a focused first thought."
          email="hello@atelier17.studio"
          eyebrow="Start a conversation"
          heading="Have a project with a point of view?"
          responseNote="Replies within two working days"
          submitLabel="Share the brief"
        />
      </main>
      <Footer01
        brand="Atelier 17"
        description="Independent strategy, identity and digital product design for ambitious organizations."
        groups={[
          { title: "Work", links: ["Selected projects", "Archive", "Process"] },
          { title: "Studio", links: ["About", "Services", "Journal"] },
          {
            title: "Connect",
            links: ["Start a project", "Email", "Instagram"],
          },
        ]}
        newsletterPlaceholder="Email for studio notes"
      />
    </div>
  );
}

export { CreativePortfolio01 };
