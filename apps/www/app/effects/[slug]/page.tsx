import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Gauge, Layers3, MousePointer2 } from "lucide-react";

import { CodeBlock } from "@/components/code-block";
import { CopyCommand } from "@/components/copy-command";
import { EffectPreview } from "@/components/effect-preview";
import { StylePreview } from "@/components/style-preview";
import { Badge } from "@/components/ui/badge";
import { effectDocs, getEffectDoc } from "@/lib/effect-docs";

export function generateStaticParams() {
  return effectDocs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const effect = getEffectDoc(slug);
  return effect ? { title: effect.name, description: effect.description } : {};
}

export default async function EffectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const effect = getEffectDoc(slug);
  if (!effect) notFound();

  return (
    <main className="mx-auto max-w-[1500px] px-4 py-8 sm:px-8 sm:py-12">
      <Link
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
        href="/effects"
      >
        <ArrowLeft className="size-4" /> All effects
      </Link>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{effect.category}</Badge>
            {effect.client ? (
              <Badge variant="outline">Client component</Badge>
            ) : (
              <Badge variant="outline">Server safe</Badge>
            )}
          </div>
          <h1 className="mt-5 text-4xl font-semibold tracking-[-.055em] sm:text-6xl">
            {effect.name}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            {effect.description}
          </p>
          <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary">
            <MousePointer2 className="size-4" /> {effect.interaction}
          </p>
        </div>
        <CopyCommand command={`pnpm dlx rivelle@latest add ${effect.slug}`} />
      </div>

      <StylePreview
        canvasClassName="!min-h-0 !border-0 !bg-transparent !p-0"
        className="mt-10 overflow-hidden rounded-[2.5rem] border border-foreground/10 bg-foreground/[.018] p-2"
        label="Effect style"
      >
        <EffectPreview slug={effect.slug} />
      </StylePreview>

      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section>
          <h2 className="text-xl font-semibold tracking-tight">Usage</h2>
          <div className="mt-4">
            <CodeBlock code={effect.usage} />
          </div>
        </section>
        <aside>
          <h2 className="text-xl font-semibold tracking-tight">
            Built for production
          </h2>
          <div className="mt-4 grid gap-3">
            {[
              [
                MousePointer2,
                "Touch aware",
                "Interaction degrades cleanly when hover is unavailable.",
              ],
              [
                Gauge,
                "Motion conscious",
                "Reduced-motion preferences are respected by default.",
              ],
              [
                Layers3,
                "Theme native",
                "Nova and Prism flow through semantic tokens.",
              ],
            ].map(([Icon, title, description]) => {
              const FeatureIcon = Icon as typeof MousePointer2;
              return (
                <div
                  className="rounded-2xl border border-foreground/10 bg-card p-4"
                  key={title as string}
                >
                  <FeatureIcon className="size-4 text-primary" />
                  <p className="mt-3 text-sm font-semibold">
                    {title as string}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    {description as string}
                  </p>
                </div>
              );
            })}
          </div>
        </aside>
      </div>
    </main>
  );
}
