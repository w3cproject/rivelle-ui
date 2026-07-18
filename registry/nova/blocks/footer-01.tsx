import * as React from "react";
import { ArrowUpRight, Github, Linkedin, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Footer01Props = React.ComponentProps<"footer"> & {
  brand?: string;
  description?: string;
  groups?: FooterLinkGroup[];
  newsletterPlaceholder?: string;
};

type FooterLinkGroup = {
  title: string;
  links: Array<{ label: string; href?: string } | string>;
};

const defaultGroups: FooterLinkGroup[] = [
  {
    title: "Product",
    links: ["Overview", "Integrations", "Pricing", "Changelog"],
  },
  { title: "Company", links: ["About", "Customers", "Careers", "Contact"] },
  { title: "Resources", links: ["Guides", "Help center", "API", "Status"] },
];

function Footer01({
  brand = "Northstar",
  description = "A calmer operating system for ambitious teams.",
  groups = defaultGroups,
  newsletterPlaceholder = "Email for product notes",
  className,
  ...props
}: Footer01Props) {
  return (
    <footer
      className={cn(
        "border-t border-foreground/10 bg-background px-5 py-12 sm:px-8 sm:py-16",
        className,
      )}
      data-slot="site-footer"
      {...props}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1.4fr]">
          <div>
            <a
              className="inline-flex items-center gap-2.5 font-semibold"
              href="#top"
            >
              <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
                <Sparkles className="size-4" />
              </span>
              {brand}
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
            <form className="mt-7 flex max-w-sm gap-2">
              <Input
                aria-label="Email address"
                placeholder={newsletterPlaceholder}
                type="email"
              />
              <Button aria-label="Subscribe" size="icon">
                <ArrowUpRight />
              </Button>
            </form>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {groups.map((group) => (
              <div key={group.title}>
                <h3 className="text-xs font-semibold uppercase tracking-[.1em] text-muted-foreground">
                  {group.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {group.links.map((link) => {
                    const item =
                      typeof link === "string" ? { label: link } : link;
                    return (
                      <li key={item.label}>
                        <a
                          className="text-sm font-medium hover:text-primary"
                          href={item.href ?? "#"}
                        >
                          {item.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-4 border-t border-foreground/8 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© 2026 {brand}. All rights reserved.</p>
          <div className="flex gap-5 sm:ml-auto">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a aria-label="GitHub" href="#">
              <Github className="size-4" />
            </a>
            <a aria-label="LinkedIn" href="#">
              <Linkedin className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Footer01 };
export type { Footer01Props, FooterLinkGroup };
