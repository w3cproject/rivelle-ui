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
import { effectApi } from "@/lib/catalog-integration";

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
          <h1 className="mt-5 text-4xl font-medium tracking-[-.025em] sm:text-6xl">
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
        className="mt-10 overflow-hidden rounded-2xl border border-foreground/10 bg-card p-1.5"
        label="Effect style"
        previewSrc={`/preview/effect/${effect.slug}`}
      >
        <EffectPreview slug={effect.slug} />
      </StylePreview>

      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section>
          <h2 className="text-xl font-medium">Usage</h2>
          <div className="mt-4">
            <CodeBlock code={effect.usage} />
          </div>
          {effectApi[effect.slug] && (
            <div className="mt-10">
              <h2 className="text-xl font-medium">API reference</h2>
              <div className="mt-4 overflow-x-auto rounded-lg border">
                <table className="w-full text-left text-sm">
                  <caption className="sr-only">{effect.name} props</caption>
                  <thead>
                    <tr className="border-b bg-muted/30">
                      <th className="p-3 font-medium">Prop</th>
                      <th className="p-3 font-medium">Type / default</th>
                      <th className="p-3 font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {effectApi[effect.slug].map((prop) => (
                      <tr key={prop.name} className="border-b last:border-0">
                        <td className="p-3 font-mono text-xs">{prop.name}</td>
                        <td className="p-3 font-mono text-xs">{prop.type}</td>
                        <td className="p-3 leading-6 text-muted-foreground">
                          {prop.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-xs leading-6 text-muted-foreground">
                Use className to adjust layout and styling. New effects respect
                system reduced-motion preferences and the preview motion
                setting.
              </p>
            </div>
          )}
        </section>
        <aside>
          <h2 className="text-xl font-medium">Built for production</h2>
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
                  className="rounded-xl border border-foreground/10 bg-card p-4"
                  key={title as string}
                >
                  <FeatureIcon className="size-4 text-primary" />
                  <p className="mt-3 text-sm font-medium">{title as string}</p>
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
