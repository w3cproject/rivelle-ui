import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";

import { CopyCommand } from "@/components/copy-command";
import { StylePreview } from "@/components/style-preview";
import { TemplatePreview } from "@/components/template-preview";
import { Badge } from "@/components/ui/badge";
import { getTemplateDoc, templateDocs } from "@/lib/template-docs";

export function generateStaticParams() {
  return templateDocs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const template = getTemplateDoc(slug);
  return template
    ? { title: `${template.name} Template`, description: template.description }
    : {};
}

export default async function TemplatePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const template = getTemplateDoc(slug);
  if (!template) notFound();

  return (
    <main className="mx-auto max-w-[1700px] px-4 py-8 sm:px-8 sm:py-12">
      <Link
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
        href="/templates"
      >
        <ArrowLeft className="size-4" /> All templates
      </Link>
      <div className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,1fr)_480px] lg:items-end">
        <div className="min-w-0">
          <Badge variant="secondary">{template.category}</Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-.045em] sm:text-6xl">
            {template.name}
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            {template.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
            {template.includes.map((item) => (
              <span
                className="flex items-center gap-2 text-xs text-muted-foreground"
                key={item}
              >
                <Check className="size-3.5 text-primary" />
                {item}
              </span>
            ))}
          </div>
        </div>
        <CopyCommand command={`pnpm dlx rivelle@latest add ${template.slug}`} />
      </div>
      <StylePreview className="mt-10" label="Template style">
        <div className="max-h-[1000px] overflow-y-auto rounded-[1.75rem] border border-foreground/10 bg-background">
          <TemplatePreview slug={template.slug} />
        </div>
      </StylePreview>
    </main>
  );
}
