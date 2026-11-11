"use client";

import * as React from "react";
import { ArrowRight, Check, Layers, MousePointer2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollStage } from "@/components/effects/scroll-stage";
import { RollingNumber } from "@/components/effects/rolling-number";

export function ProductLaunch01({
  onSubscribe,
}: {
  onSubscribe?: (email: string) => Promise<void> | void;
}) {
  const [yearly, setYearly] = React.useState(false),
    [email, setEmail] = React.useState(""),
    [subscribed, setSubscribed] = React.useState(false);
  const id = React.useId();
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");
  const scenes = [
    {
      id: "capture",
      title: "Capture the first thought",
      description:
        "A single canvas for notes, decisions and the pieces that do not have a home yet.",
      content: (
        <ProductScene
          title="Research notes"
          lines={[
            "A faster path to the first draft",
            "Keep context next to the decision",
            "Make room for unfinished ideas",
          ]}
        />
      ),
    },
    {
      id: "shape",
      title: "Give the work a shape",
      description:
        "Turn loose ideas into a plan your team can follow. Keep the important details in view.",
      content: (
        <ProductScene
          title="The release plan"
          lines={[
            "Discovery · completed",
            "Product story · in review",
            "Public release · next up",
          ]}
        />
      ),
    },
    {
      id: "ship",
      title: "Leave a clear record",
      description:
        "Publish decisions and progress in the same place. Everyone can see what changed and why.",
      content: (
        <ProductScene
          title="Ready for release"
          lines={[
            "Design review approved",
            "Documentation published",
            "Team notified",
          ]}
        />
      ),
    },
  ];
  return (
    <div className="bg-background text-foreground">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b px-6 py-5 sm:px-10">
        <a href="#launch-top" className="text-lg font-medium">
          Forma<span className="text-primary">/</span>
        </a>
        <nav
          aria-label="Product navigation"
          className="flex gap-5 text-sm text-muted-foreground"
        >
          <a href="#launch-product">Product</a>
          <a href="#launch-updates">Updates</a>
          <a href="#launch-pricing">Pricing</a>
        </nav>
      </header>
      <section
        id="launch-top"
        className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-2"
      >
        <div>
          <p className="font-mono text-xs text-primary">
            A workspace for considered work
          </p>
          <h1 className="mt-6 text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl">
            From a loose idea
            <br />
            to a clear next step
          </h1>
          <p className="mt-6 max-w-md leading-7 text-muted-foreground">
            Forma brings notes, project plans and decisions into one shared
            space for small creative teams.
          </p>
          <Button asChild className="mt-8">
            <a href="#launch-pricing">
              Find your plan
              <ArrowRight />
            </a>
          </Button>
        </div>
        <div className="rounded-xl border bg-muted/20 p-5">
          <ProductScene
            title="November release"
            lines={[
              "Project brief · ready",
              "Design exploration · 12 files",
              "Team review · Thursday, 10:00",
            ]}
          />
        </div>
      </section>
      <section
        id="launch-product"
        className="mx-auto max-w-6xl border-t px-6 py-16"
      >
        <ScrollStage scenes={scenes} />
      </section>
      <section id="launch-updates" className="border-y bg-muted/20 px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
          <div>
            <p className="font-mono text-xs text-primary">Release notes</p>
            <h2 className="mt-4 text-3xl font-medium">
              Small changes.
              <br />
              Better working days.
            </h2>
          </div>
          <div className="space-y-6">
            {[
              [
                "November 11",
                "Project views",
                "Switch between a focused list and a visual project overview.",
              ],
              [
                "October 28",
                "Shared decisions",
                "A permanent record of the choices that move your work forward.",
              ],
              [
                "October 14",
                "A quieter inbox",
                "Control which project updates reach you and when.",
              ],
            ].map(([date, title, description]) => (
              <article key={title} className="border-b pb-6">
                <p className="text-xs text-muted-foreground">{date}</p>
                <h3 className="mt-2 font-medium">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section
        id="launch-pricing"
        className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-2"
      >
        <div>
          <h2 className="text-3xl font-medium">Space to do your work</h2>
          <p className="mt-4 max-w-sm text-muted-foreground">
            One plan for your team, with all the essentials included
          </p>
          <label className="mt-6 flex items-center gap-3 text-sm">
            <input
              type="checkbox"
              checked={yearly}
              onChange={(e) => setYearly(e.target.checked)}
            />
            Bill yearly · save 20%
          </label>
        </div>
        <div className="rounded-xl border p-6">
          <p className="text-sm font-medium">Team</p>
          <p className="mt-4 text-5xl">
            $<RollingNumber value={yearly ? 12 : 15} />
            <span className="text-sm text-muted-foreground">
              {" "}
              / member / month
            </span>
          </p>
          <ul className="my-6 space-y-3 text-sm">
            {[
              "Unlimited projects and notes",
              "Version history and shared decisions",
              "Guest access for collaborators",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <Check className="size-4 text-primary" />
                {item}
              </li>
            ))}
          </ul>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setSubmitting(true);
              setError("");
              try {
                await onSubscribe?.(email);
                setSubscribed(true);
              } catch {
                setError("Could not subscribe. Please try again.");
              } finally {
                setSubmitting(false);
              }
            }}
          >
            <label htmlFor={`${id}-email`} className="mb-2 block text-sm">
              Get launch updates
            </label>
            <div className="flex flex-wrap gap-2">
              <Input
                id={`${id}-email`}
                className="min-w-0 flex-1"
                type="email"
                required
                placeholder="you@studio.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button disabled={submitting}>
                {submitting ? "Submitting…" : "Join the list"}
              </Button>
            </div>
            <p role="status" className="mt-3 text-xs text-muted-foreground">
              {onSubscribe
                ? subscribed
                  ? "You are on the list"
                  : "Get the next product update by email"
                : subscribed
                  ? "Demo signup recorded locally. Connect this form to your mailing service."
                  : "Template demo · no email is sent"}
            </p>
          </form>
          {error && (
            <p className="mt-3 text-sm text-destructive" role="alert">
              {error}
            </p>
          )}
        </div>
      </section>
      <footer className="flex justify-between gap-5 border-t px-6 py-6 text-xs text-muted-foreground">
        <span>Forma / Product launch template</span>
        <a href="#launch-top">Back to top ↑</a>
      </footer>
    </div>
  );
}
function ProductScene({ title, lines }: { title: string; lines: string[] }) {
  return (
    <div className="w-full rounded-lg border bg-background p-6">
      <div className="mb-8 flex items-center gap-3 border-b pb-4">
        <Layers className="size-4 text-primary" />
        <span className="text-sm font-medium">{title}</span>
      </div>
      {lines.map((line, i) => (
        <div
          key={line}
          className="my-3 flex items-center gap-3 rounded-md bg-muted/40 p-3 text-sm"
        >
          <span className="font-mono text-xs text-muted-foreground">
            0{i + 1}
          </span>
          {line}
        </div>
      ))}
      <p className="mt-8 flex items-center gap-2 text-xs text-muted-foreground">
        <MousePointer2 className="size-3" />
        Every detail, in context
      </p>
    </div>
  );
}
