import { LayoutTemplate } from "lucide-react";

import { TemplatesGallery } from "@/components/templates-gallery";
import { Badge } from "@/components/ui/badge";

export default function TemplatesPage() {
  return (
    <main className="mx-auto max-w-[1600px] px-5 py-14 sm:px-8 sm:py-20">
      <div className="max-w-4xl">
        <Badge variant="outline">
          <LayoutTemplate /> Complete templates
        </Badge>
        <h1 className="mt-6 text-balance text-5xl font-semibold tracking-[-.055em] sm:text-7xl">
          Start from a complete point of view.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Full responsive interfaces assembled from Rivelle primitives and
          blocks. Install the source, replace the content and shape the system
          around your product.
        </p>
      </div>
      <TemplatesGallery />
    </main>
  );
}
