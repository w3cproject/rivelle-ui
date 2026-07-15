import * as React from "react";
import {
  Bell,
  Blocks,
  ChevronDown,
  CreditCard,
  Home,
  LifeBuoy,
  Search,
  Settings,
  Sparkles,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const navigation = [
  { icon: Home, label: "Overview", active: true },
  { icon: Blocks, label: "Projects", badge: "12" },
  { icon: Users, label: "Team" },
  { icon: CreditCard, label: "Billing" },
];

function Sidebar01({ className, ...props }: React.ComponentProps<"aside">) {
  return (
    <aside
      className={cn(
        "flex h-[680px] w-full max-w-[280px] flex-col rounded-[2rem] border border-foreground/10 bg-background p-3 shadow-[0_24px_70px_-50px_var(--foreground)]",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2.5 px-2 py-2 font-semibold">
        <span className="grid size-8 place-items-center rounded-xl bg-primary text-primary-foreground">
          <Sparkles className="size-4" />
        </span>
        Rivelle
        <span className="ml-auto">
          <ChevronDown className="size-4 text-muted-foreground" />
        </span>
      </div>
      <div className="relative mt-4">
        <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
        <Input className="h-9 pl-9" placeholder="Search" />
      </div>
      <nav className="mt-5 space-y-1">
        {navigation.map(({ icon: Icon, label, active, badge }) => (
          <a
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-foreground/[.045] hover:text-foreground",
              active && "bg-primary/10 text-primary",
            )}
            href="#"
            key={label}
          >
            <Icon className="size-4" />
            {label}
            {badge && (
              <Badge className="ml-auto" variant="secondary">
                {badge}
              </Badge>
            )}
          </a>
        ))}
      </nav>
      <div className="mt-6 px-3 text-[.65rem] font-semibold uppercase tracking-[.12em] text-muted-foreground">
        Workspace
      </div>
      <nav className="mt-2 space-y-1">
        <a
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-foreground/[.045] hover:text-foreground"
          href="#"
        >
          <Settings className="size-4" />
          Settings
        </a>
        <a
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-foreground/[.045] hover:text-foreground"
          href="#"
        >
          <LifeBuoy className="size-4" />
          Support
        </a>
      </nav>
      <div className="mt-auto rounded-2xl border border-primary/15 bg-primary/[.055] p-4">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold">Pro plan</p>
          <Badge variant="secondary">72%</Badge>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-primary/10">
          <div className="h-full w-[72%] rounded-full bg-primary" />
        </div>
        <p className="mt-2 text-[.68rem] text-muted-foreground">
          7.2 GB of 10 GB used
        </p>
      </div>
      <div className="mt-3 flex items-center gap-3 rounded-2xl p-2 hover:bg-foreground/[.04]">
        <Avatar>
          <AvatarFallback>MC</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-semibold">Maya Chen</p>
          <p className="truncate text-[.68rem] text-muted-foreground">
            maya@rivelle.dev
          </p>
        </div>
        <Button aria-label="Notifications" size="icon-sm" variant="ghost">
          <Bell />
        </Button>
      </div>
    </aside>
  );
}

export { Sidebar01 };
