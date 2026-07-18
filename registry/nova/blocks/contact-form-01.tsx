import * as React from "react";
import { ArrowRight, Mail, MessageSquare, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type ContactForm01Props = React.ComponentProps<"section"> & {
  eyebrow?: string;
  heading?: string;
  description?: string;
  email?: string;
  responseNote?: string;
  submitLabel?: string;
};

function ContactForm01({
  eyebrow = "Let’s work together",
  heading = "Tell us what you want to build.",
  description = "Share a little context and our team will reply with useful next steps within two business days.",
  email = "hello@northstar.dev",
  responseNote = "Usually replies in one day",
  submitLabel = "Send inquiry",
  className,
  ...props
}: ContactForm01Props) {
  const id = React.useId();
  const nameId = `${id}-name`;
  const emailId = `${id}-email`;
  const companyId = `${id}-company`;
  const messageId = `${id}-message`;

  return (
    <section
      className={cn("px-5 py-24 sm:px-8 sm:py-32", className)}
      data-slot="contact-form-section"
      id="contact"
      {...props}
    >
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[2.25rem] border border-foreground/10 bg-background shadow-[0_45px_120px_-85px_var(--foreground)] lg:grid-cols-[.9fr_1.1fr]">
        <div className="relative overflow-hidden bg-primary p-7 text-primary-foreground sm:p-10 lg:p-12">
          <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_15%_15%,white,transparent_32%),linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:auto,44px_44px,44px_44px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
          <div className="relative">
            <Badge
              className="border-white/20 bg-white/10 text-white"
              variant="outline"
            >
              <Sparkles /> {eyebrow}
            </Badge>
            <h2 className="mt-7 text-balance text-4xl font-semibold tracking-[-.05em] sm:text-5xl">
              {heading}
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-primary-foreground/75">
              {description}
            </p>
            <div className="mt-10 space-y-4 text-sm">
              <a className="flex items-center gap-3" href={`mailto:${email}`}>
                <span className="grid size-9 place-items-center rounded-xl bg-white/10">
                  <Mail className="size-4" />
                </span>
                {email}
              </a>
              <p className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-xl bg-white/10">
                  <MessageSquare className="size-4" />
                </span>
                {responseNote}
              </p>
            </div>
          </div>
        </div>
        <form className="grid gap-5 p-7 sm:p-10 lg:p-12">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor={nameId}>Name</Label>
              <Input id={nameId} name="name" placeholder="Your name" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor={emailId}>Work email</Label>
              <Input
                id={emailId}
                name="email"
                placeholder="you@company.com"
                required
                type="email"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor={companyId}>Company</Label>
            <Input
              id={companyId}
              name="company"
              placeholder="Company or studio"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor={messageId}>Project details</Label>
            <Textarea
              className="min-h-32"
              id={messageId}
              name="message"
              placeholder="What are you hoping to launch?"
              required
            />
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">
              By submitting, you agree to our privacy policy.
            </p>
            <Button type="submit">
              {submitLabel} <ArrowRight />
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

export { ContactForm01 };
export type { ContactForm01Props };
