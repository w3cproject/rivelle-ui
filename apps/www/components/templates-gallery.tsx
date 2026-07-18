import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";

import { TemplatePreview } from "@/components/template-preview";
import { Badge } from "@/components/ui/badge";
import { templateDocs } from "@/lib/template-docs";

export function TemplatesGallery() {
  return (
    <div className="mt-12 grid gap-12 xl:grid-cols-2">
      {templateDocs.map((template) => (
        <article className="group relative min-w-0" key={template.slug}>
          <div className="overflow-hidden rounded-[2rem] border border-foreground/10 bg-foreground/[.025] p-2 shadow-[0_30px_100px_-75px_var(--foreground)]">
            <div className="overflow-hidden rounded-[1.5rem] border border-foreground/8">
              <TemplatePreview compact slug={template.slug} />
            </div>
          </div>
          <div className="mt-5 flex items-start justify-between gap-5 px-1">
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-xl font-semibold tracking-[-.03em]">
                  <Link
                    className="after:absolute after:inset-0"
                    href={`/templates/${template.slug}`}
                  >
                    {template.name}
                  </Link>
                </h2>
                <Badge variant="secondary">{template.category}</Badge>
              </div>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                {template.description}
              </p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {template.includes.map((item) => (
                  <span
                    className="flex items-center gap-2 text-xs text-muted-foreground"
                    key={item}
                  >
                    <Check className="size-3.5 text-primary" /> {item}
                  </span>
                ))}
              </div>
            </div>
            <ArrowUpRight className="mt-1 size-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
          </div>
        </article>
      ))}
    </div>
  );
}
