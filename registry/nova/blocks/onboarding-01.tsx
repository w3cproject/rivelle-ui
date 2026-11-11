"use client";

import * as React from "react";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Stepper } from "@/components/ui/stepper";
import { cn } from "@/lib/utils";

export type WorkspaceSetup = {
  name: string;
  purpose: string;
  invitations: string[];
};
export function Onboarding01({
  onComplete,
  className,
}: {
  onComplete?: (workspace: WorkspaceSetup) => void | Promise<void>;
  className?: string;
}) {
  const [step, setStep] = React.useState(0),
    [name, setName] = React.useState(""),
    [purpose, setPurpose] = React.useState("Product design"),
    [invites, setInvites] = React.useState("");
  const [error, setError] = React.useState(""),
    [busy, setBusy] = React.useState(false),
    [done, setDone] = React.useState(false);
  const id = React.useId();
  return (
    <section
      className={cn(
        "mx-auto w-full max-w-2xl rounded-xl border bg-background p-6 sm:p-8",
        className,
      )}
    >
      <p className="font-mono text-xs text-primary">Workspace setup</p>
      <h2 className="mt-3 text-2xl font-medium">
        A place for your next project
      </h2>
      <Stepper
        className="mt-8"
        steps={[
          { id: "workspace", title: "Workspace" },
          { id: "purpose", title: "Focus" },
          { id: "team", title: "Team" },
        ]}
        value={step}
        onValueChange={(n) => {
          setStep(n);
          setError("");
        }}
      />
      {done ? (
        <div role="status" className="py-12 text-center">
          <Check className="mx-auto mb-4 size-8 text-primary" />
          <h3 className="text-xl">{name} is ready</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {invites
              ? "Your invitation list has been prepared."
              : "You can invite teammates later."}
          </p>
          <Button
            className="mt-6"
            variant="outline"
            onClick={() => {
              setDone(false);
              setStep(0);
            }}
          >
            Edit workspace
          </Button>
        </div>
      ) : (
        <form
          className="mt-6"
          onSubmit={async (e) => {
            e.preventDefault();
            setError("");
            if (step === 0 && !name.trim()) {
              setError("Enter a workspace name");
              return;
            }
            if (step < 2) {
              setStep(step + 1);
              return;
            }
            const emails = invites
              .split(/[,\n]/)
              .map((s) => s.trim())
              .filter(Boolean);
            if (
              emails.some((email) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            ) {
              setError("Check the invitation email addresses");
              return;
            }
            setBusy(true);
            try {
              await onComplete?.({
                name: name.trim(),
                purpose,
                invitations: [...new Set(emails)],
              });
              setDone(true);
            } catch {
              setError("Could not create workspace. Please try again.");
            } finally {
              setBusy(false);
            }
          }}
        >
          <div className="min-h-44">
            {step === 0 ? (
              <label className="grid gap-3 text-sm" htmlFor={`${id}-name`}>
                Workspace name
                <Input
                  id={`${id}-name`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Northstar Studio"
                  maxLength={80}
                  autoFocus
                />
              </label>
            ) : step === 1 ? (
              <fieldset>
                <legend className="mb-3 text-sm">What will you work on?</legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    "Product design",
                    "Engineering",
                    "Research",
                    "Client projects",
                  ].map((option) => (
                    <label
                      key={option}
                      className={cn(
                        "flex cursor-pointer items-center gap-3 rounded-lg border p-4 text-sm",
                        purpose === option && "border-primary bg-primary/5",
                      )}
                    >
                      <input
                        type="radio"
                        name={`${id}-purpose`}
                        checked={purpose === option}
                        onChange={() => setPurpose(option)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </fieldset>
            ) : (
              <label className="grid gap-3 text-sm" htmlFor={`${id}-invites`}>
                Invite teammates{" "}
                <span className="text-xs text-muted-foreground">
                  Separate addresses with commas. This step is optional.
                </span>
                <textarea
                  id={`${id}-invites`}
                  value={invites}
                  onChange={(e) => setInvites(e.target.value)}
                  rows={3}
                  className="rounded-lg border bg-background p-3 outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="alex@studio.com, maya@studio.com"
                />
              </label>
            )}
          </div>
          {error && (
            <p role="alert" className="my-3 text-sm text-destructive">
              {error}
            </p>
          )}
          <div className="mt-6 flex justify-between gap-3">
            <Button
              type="button"
              variant="ghost"
              disabled={step === 0 || busy}
              onClick={() => setStep(step - 1)}
            >
              Back
            </Button>
            <Button disabled={busy}>
              {busy
                ? "Creating…"
                : step === 2
                  ? onComplete
                    ? "Create workspace"
                    : "Preview workspace"
                  : "Continue"}
              <ArrowRight />
            </Button>
          </div>
        </form>
      )}
    </section>
  );
}
