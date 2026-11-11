import { notFound } from "next/navigation";
import { BlockPreview } from "@/components/block-preview";
import { TemplatePreview } from "@/components/template-preview";
import { EffectPreview } from "@/components/effect-preview";
import { ComponentDocDemo } from "@/components/component-doc-demo";
import { PreviewFrame } from "@/components/preview-frame";
import { componentDocs } from "@/lib/component-docs";
import { blockDocs } from "@/lib/block-docs";
import { templateDocs } from "@/lib/template-docs";
import { effectDocs } from "@/lib/effect-docs";

export const metadata = { robots: { index: false, follow: false } };
export function generateStaticParams() {
  return [
    ...componentDocs.map((d) => ({ kind: "component", slug: d.slug })),
    ...effectDocs.map((d) => ({ kind: "effect", slug: d.slug })),
    ...blockDocs.map((d) => ({ kind: "block", slug: d.slug })),
    ...templateDocs.map((d) => ({ kind: "template", slug: d.slug })),
  ];
}
export default async function IsolatedPreview({
  params,
}: {
  params: Promise<{ kind: string; slug: string }>;
}) {
  const { kind, slug } = await params;
  const block = blockDocs.find((d) => d.slug === slug),
    effect = effectDocs.find((d) => d.slug === slug),
    template = templateDocs.find((d) => d.slug === slug),
    component = componentDocs.find((d) => d.slug === slug);
  const content =
    kind === "block" && block ? (
      <BlockPreview slug={block.slug} />
    ) : kind === "effect" && effect ? (
      <EffectPreview slug={effect.slug} />
    ) : kind === "template" && template ? (
      <TemplatePreview slug={template.slug} />
    ) : kind === "component" && component ? (
      <div className="grid min-h-[80dvh] place-items-center p-4">
        <ComponentDocDemo slug={component.slug} />
      </div>
    ) : null;
  if (!content) notFound();
  return <PreviewFrame>{content}</PreviewFrame>;
}
