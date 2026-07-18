import { Blocks } from "lucide-react";

import { BlocksGallery } from "@/components/blocks-gallery";
import { StyleSwitch } from "@/components/style-preview";
import { Badge } from "@/components/ui/badge";

export default function BlocksPage() {
  return (
    <main className="mx-auto max-w-[1600px] px-5 py-14 sm:px-8 sm:py-20">
      <div className="max-w-3xl">
        <Badge variant="outline">
          <Blocks /> Application blocks
        </Badge>
        <h1 className="mt-6 text-5xl font-semibold tracking-[-.055em] sm:text-7xl">
          Start with more than a blank page.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Production-minded compositions built from Rivelle primitives. Install
          the source, connect your data and make every detail yours.
        </p>
      </div>
      <StyleSwitch
        className="block-gallery-style-switch mt-12"
        label="Gallery style"
      />
      <BlocksGallery />
    </main>
  );
}
