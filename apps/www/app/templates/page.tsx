import { LayoutTemplate } from "lucide-react";

import { TemplatesGallery } from "@/components/templates-gallery";

export default function TemplatesPage() {
  return (
    <main className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 sm:py-24">
      <div className="grid gap-8 border-b border-border pb-14 lg:grid-cols-[minmax(0,1fr)_28rem] lg:items-end">
        <div className="max-w-4xl">
          <p className="section-kicker">
            <LayoutTemplate /> Complete templates
          </p>
          <h1 className="mt-6 text-balance text-5xl font-medium tracking-[-.03em] sm:text-7xl">
            Complete interfaces with visible decisions.
          </h1>
        </div>
        <p className="text-base leading-7 text-muted-foreground">
          Responsive products assembled from Rivelle primitives and blocks.
          Replace the content, connect the data and keep every implementation
          detail.
        </p>
      </div>
      <TemplatesGallery />
    </main>
  );
}
