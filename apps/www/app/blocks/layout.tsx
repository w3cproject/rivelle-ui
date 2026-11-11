import { CatalogHeader } from "@/components/catalog-header";

export default function BlocksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <CatalogHeader active="blocks" />
      {children}
    </div>
  );
}
