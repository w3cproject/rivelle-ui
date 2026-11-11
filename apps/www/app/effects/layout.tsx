import { CatalogHeader } from "@/components/catalog-header";

export default function EffectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <CatalogHeader active="effects" />
      {children}
    </div>
  );
}
