import { Blocks } from "lucide-react";

import { BlocksGallery } from "@/components/blocks-gallery";
import { StyleSwitch } from "@/components/style-preview";
import { blockDocs } from "@/lib/block-docs";

export default function BlocksPage() {
  return (
    <main className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 sm:py-24">
      <div className="grid gap-8 border-b border-border pb-14 lg:grid-cols-[minmax(0,1fr)_28rem] lg:items-end">
        <div className="max-w-3xl">
          <p className="section-kicker">
            <Blocks /> Application blocks
          </p>
          <h1 className="mt-6 text-5xl font-medium tracking-[-.03em] sm:text-7xl">
            Working product flows, ready to adapt.
          </h1>
        </div>
        <p className="text-base leading-7 text-muted-foreground">
          Authentication, settings, dashboards and marketing sections composed
          from Rivelle primitives. Install the source and connect your own data.
        </p>
      </div>
      <div className="mt-10 flex items-end justify-between gap-6">
        <p className="font-mono text-xs text-muted-foreground">
          {blockDocs.length} installable blocks
        </p>
        <StyleSwitch label="Gallery style" />
      </div>
      <BlocksGallery />
    </main>
  );
}
