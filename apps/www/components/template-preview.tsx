import { CreativePortfolio01 } from "@/templates/creative-portfolio-01";
import { SaasLanding01 } from "@/templates/saas-landing-01";
import type { TemplateSlug } from "@/lib/template-docs";
import { cn } from "@/lib/utils";

const previews = {
  "saas-landing-01": SaasLanding01,
  "creative-portfolio-01": CreativePortfolio01,
};

export function TemplatePreview({
  slug,
  compact = false,
}: {
  slug: TemplateSlug;
  compact?: boolean;
}) {
  const Preview = previews[slug];

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-background",
        compact && "h-[520px]",
      )}
      data-slot="template-preview"
    >
      <div
        className={cn(
          compact &&
            "pointer-events-none absolute left-0 top-0 w-[200%] origin-top-left scale-50 select-none",
        )}
      >
        <Preview />
      </div>
    </div>
  );
}
