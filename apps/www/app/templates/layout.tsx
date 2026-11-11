import { CatalogHeader } from "@/components/catalog-header";

export default function TemplatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <CatalogHeader active="templates" />
      {children}
    </div>
  );
}
