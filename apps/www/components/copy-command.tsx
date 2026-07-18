"use client";

import * as React from "react";
import { Check, Copy, Terminal } from "lucide-react";

import { cn } from "@/lib/utils";

export function CopyCommand({
  command,
  compact = false,
}: {
  command: string;
  compact?: boolean;
}) {
  const [copied, setCopied] = React.useState(false);

  async function copy() {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <button
      className={cn(
        "group flex min-w-0 w-full items-center gap-3 rounded-xl border border-border/80 bg-card/70 text-left font-mono text-sm shadow-sm backdrop-blur-xl transition-all hover:border-foreground/15 hover:bg-card",
        compact ? "px-3 py-2" : "px-4 py-3.5",
      )}
      onClick={copy}
      type="button"
    >
      <Terminal className="size-4 shrink-0 text-muted-foreground" />
      <span className="min-w-0 flex-1 truncate text-foreground">
        <span className="text-muted-foreground">$</span> {command}
      </span>
      <span className="text-muted-foreground transition-colors group-hover:text-foreground">
        {copied ? (
          <Check className="size-4 text-emerald-500" />
        ) : (
          <Copy className="size-4" />
        )}
      </span>
    </button>
  );
}
