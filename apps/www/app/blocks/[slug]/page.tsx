import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { BlockPreview } from "@/components/block-preview";
import { CopyCommand } from "@/components/copy-command";
import { Badge } from "@/components/ui/badge";
import { blockDocs, getBlockDoc } from "@/lib/block-docs";

export function generateStaticParams() {
  return blockDocs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const block = getBlockDoc(slug);
  return block
    ? { title: `${block.name} Block`, description: block.description }
    : {};
}

export default async function BlockPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const block = getBlockDoc(slug);
  if (!block) notFound();
  return (
    <main className="mx-auto max-w-[1600px] px-4 py-8 sm:px-8 sm:py-12">
      <Link
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
        href="/blocks"
      >
        <ArrowLeft className="size-4" />
        All blocks
      </Link>
      <div className="mt-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div>
          <Badge variant="secondary">{block.category}</Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-.045em] sm:text-5xl">
            {block.name}
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            {block.description}
          </p>
        </div>
        <div className="w-full max-w-lg">
          <CopyCommand command={`pnpm dlx rivelle@latest add ${block.slug}`} />
        </div>
      </div>
      <div className="mt-10 rounded-[2.25rem] border border-foreground/10 bg-foreground/[.02] p-2 shadow-[0_32px_100px_-70px_var(--foreground)] sm:p-4">
        <BlockPreview controls slug={block.slug} />
      </div>
    </main>
  );
}
