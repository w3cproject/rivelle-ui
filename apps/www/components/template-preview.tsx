import { CreativePortfolio01 } from "@/templates/creative-portfolio-01";
import { SaasLanding01 } from "@/templates/saas-landing-01";
import type { TemplateSlug } from "@/lib/template-docs";
import { cn } from "@/lib/utils";
import { Workspace01 } from "@/templates/workspace-01";
import { ProductLaunch01 } from "@/templates/product-launch-01";
import { AiChatWorkspace01 } from "@/templates/ai-chat-workspace-01";

const previews = {
  "workspace-01": Workspace01,
  "product-launch-01": ProductLaunch01,
  "ai-chat-workspace-01": AiChatWorkspace01,
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
