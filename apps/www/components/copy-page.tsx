"use client";

import * as React from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";

export function CopyPage() {
  const [copied, setCopied] = React.useState(false);

  async function copyPage() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <button className="docs-copy-page" onClick={copyPage} type="button">
      {copied ? <Check /> : <Copy />}
      {copied ? "Copied" : "Copy page"}
      <ArrowUpRight />
    </button>
  );
}
