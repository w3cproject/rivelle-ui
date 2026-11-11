"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type ActivityEvent = {
  id: string;
  actor: string;
  initials: string;
  action: string;
  target: string;
  date: string;
  kind: "project" | "team" | "file";
};
const sample: ActivityEvent[] = [
  {
    id: "1",
    actor: "Maya Chen",
    initials: "MC",
    action: "published",
    target: "Launch guidelines",
    date: "2026-11-11T10:24:00Z",
    kind: "file",
  },
  {
    id: "2",
    actor: "Alex Rivera",
    initials: "AR",
    action: "joined",
    target: "Northstar Studio",
    date: "2026-11-11T09:10:00Z",
    kind: "team",
  },
  {
    id: "3",
    actor: "Jordan Lee",
    initials: "JL",
    action: "completed",
    target: "Website exploration",
    date: "2026-11-10T15:30:00Z",
    kind: "project",
  },
  {
    id: "4",
    actor: "Maya Chen",
    initials: "MC",
    action: "uploaded",
    target: "Brand assets.zip",
    date: "2026-11-10T11:00:00Z",
    kind: "file",
  },
];
export function ActivityFeed01({
  events = sample,
  className,
}: {
  events?: ActivityEvent[];
  className?: string;
}) {
  const [filter, setFilter] = React.useState("all");
  const filtered = events.filter((e) => filter === "all" || e.kind === filter);
  return (
    <section
      className={cn(
        "mx-auto w-full max-w-2xl rounded-xl border bg-background p-6",
        className,
      )}
    >
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-medium">Workspace activity</h2>
        <select
          aria-label="Filter activity"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-lg border bg-background px-3 py-2 text-sm"
        >
          {["all", "project", "team", "file"].map((kind) => (
            <option key={kind} value={kind}>
              {kind === "all"
                ? "All activity"
                : kind[0].toUpperCase() + kind.slice(1)}
            </option>
          ))}
        </select>
      </header>
      <ol className="mt-6 divide-y">
        {filtered.map((event) => (
          <li key={event.id} className="flex gap-4 py-5">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-muted text-xs font-medium">
              {event.initials}
            </span>
            <div>
              <p className="text-sm leading-6">
                <span className="font-medium">{event.actor}</span>{" "}
                <span className="text-muted-foreground">{event.action}</span>{" "}
                {event.target}
              </p>
              <time
                className="mt-1 block text-xs text-muted-foreground"
                dateTime={event.date}
              >
                {new Intl.DateTimeFormat("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  timeZone: "UTC",
                }).format(new Date(event.date))}{" "}
                UTC
              </time>
            </div>
          </li>
        ))}
      </ol>
      {!filtered.length && (
        <p className="py-10 text-center text-sm text-muted-foreground">
          No activity in this category
        </p>
      )}
      <p className="text-xs text-muted-foreground" aria-live="polite">
        {filtered.length} events
      </p>
    </section>
  );
}
