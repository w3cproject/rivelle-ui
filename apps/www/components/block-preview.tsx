import { DashboardShell01 } from "@/blocks/dashboard-shell-01";
import { EmptyProject01 } from "@/blocks/empty-project-01";
import { Hero01 } from "@/blocks/hero-01";
import { Login01 } from "@/blocks/login-01";
import { Pricing01 } from "@/blocks/pricing-01";
import { Settings01 } from "@/blocks/settings-01";
import { Sidebar01 } from "@/blocks/sidebar-01";
import { Signup01 } from "@/blocks/signup-01";
import type { BlockSlug } from "@/lib/block-docs";
import { StylePreview } from "@/components/style-preview";

const previews = {
  "login-01": Login01,
  "signup-01": Signup01,
  "dashboard-shell-01": DashboardShell01,
  "sidebar-01": Sidebar01,
  "settings-01": Settings01,
  "empty-project-01": EmptyProject01,
  "hero-01": Hero01,
  "pricing-01": Pricing01,
};

export function BlockPreview({
  slug,
  controls = false,
}: {
  slug: BlockSlug;
  controls?: boolean;
}) {
  const Preview = previews[slug];
  if (!controls) return <Preview />;
  return (
    <StylePreview
      canvasClassName="block-style-preview-canvas"
      className="block-style-preview"
      label="Block style"
    >
      <Preview />
    </StylePreview>
  );
}
