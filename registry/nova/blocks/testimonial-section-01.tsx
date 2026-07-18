import * as React from "react";
import { Quote, Sparkles } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    quote:
      "Northstar replaced the weekly status meeting with a workspace people actually trust.",
    name: "Mina Park",
    role: "VP Product, Arc",
  },
  {
    quote:
      "It gives our studio structure without sanding away the way creative teams naturally work.",
    name: "Jon Bell",
    role: "Founder, Common",
  },
  {
    quote:
      "We shipped the migration in days and immediately had a clearer view of every decision.",
    name: "Lena Ortiz",
    role: "COO, Linear North",
  },
];

function TestimonialSection01({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "bg-foreground px-5 py-24 text-background sm:px-8 sm:py-32",
        className,
      )}
      data-slot="testimonial-section"
      id="customers"
      {...props}
    >
      <div className="mx-auto max-w-7xl">
        <Badge
          className="border-background/15 bg-background/10 text-background"
          variant="outline"
        >
          <Sparkles /> Customer stories
        </Badge>
        <div className="mt-7 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <h2 className="max-w-3xl text-balance text-4xl font-semibold tracking-[-.05em] sm:text-6xl">
            Trusted when the work really matters.
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-background/60">
            From small studios to product organizations, teams use Northstar to
            keep context close and progress visible.
          </p>
        </div>
        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {testimonials.map(({ quote, name, role }) => (
            <figure
              className="flex min-h-72 flex-col rounded-[1.75rem] border border-background/12 bg-background/[.055] p-6 sm:p-8"
              key={name}
            >
              <Quote className="size-6 text-primary" />
              <blockquote className="mt-8 text-balance text-xl font-medium leading-relaxed tracking-[-.025em]">
                “{quote}”
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-3 pt-8">
                <Avatar>
                  <AvatarFallback>
                    {name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span>
                  <strong className="block text-sm">{name}</strong>
                  <small className="text-background/55">{role}</small>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export { TestimonialSection01 };
