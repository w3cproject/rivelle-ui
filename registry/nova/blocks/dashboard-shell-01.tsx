import * as React from "react";
import {
  Activity,
  ArrowUpRight,
  Bell,
  Blocks,
  ChartNoAxesCombined,
  CreditCard,
  Home,
  Search,
  Settings,
  Sparkles,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

function DashboardShell01({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "grid min-h-[720px] overflow-hidden rounded-[2rem] border border-foreground/10 bg-background lg:grid-cols-[220px_1fr]",
        className,
      )}
      {...props}
    >
      <aside className="hidden border-r border-foreground/8 bg-foreground/[.02] p-4 lg:flex lg:flex-col">
        <div className="flex items-center gap-2 px-2 py-2 font-semibold">
          <span className="grid size-8 place-items-center rounded-xl bg-primary text-primary-foreground">
            <Sparkles className="size-4" />
          </span>
          Rivelle
        </div>
        <nav className="mt-7 space-y-1">
          {[
            [Home, "Overview"],
            [Blocks, "Projects"],
            [ChartNoAxesCombined, "Analytics"],
            [Users, "Team"],
            [CreditCard, "Billing"],
          ].map(([Icon, label], index) => (
            <a
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground",
                index === 0 && "bg-primary/10 text-primary",
              )}
              href="#"
              key={String(label)}
            >
              {React.createElement(
                Icon as React.ComponentType<{ className?: string }>,
                { className: "size-4" },
              )}
              {String(label)}
            </a>
          ))}
        </nav>
        <a
          className="mt-auto flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground"
          href="#"
        >
          <Settings className="size-4" />
          Settings
        </a>
      </aside>
      <div className="min-w-0">
        <header className="flex h-16 items-center gap-3 border-b border-foreground/8 px-5">
          <div className="relative hidden max-w-xs flex-1 sm:block">
            <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input className="h-9 pl-9" placeholder="Search projects" />
          </div>
          <Button className="ml-auto" size="sm">
            New project
          </Button>
          <Button aria-label="Notifications" size="icon-sm" variant="ghost">
            <Bell />
          </Button>
          <Avatar className="size-8">
            <AvatarFallback>MC</AvatarFallback>
          </Avatar>
        </header>
        <main className="p-5 sm:p-7">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm text-muted-foreground">
                Wednesday, July 16
              </p>
              <h1 className="mt-1 text-3xl font-semibold tracking-[-.04em]">
                Good morning, Maya.
              </h1>
            </div>
            <Badge variant="success">
              <Activity /> All systems operational
            </Badge>
          </div>
          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            {[
              ["Active projects", "12", "+3 this month"],
              ["Team members", "24", "4 online now"],
              ["Monthly usage", "72%", "7.2 GB of 10 GB"],
            ].map(([label, value, meta]) => (
              <Card key={label}>
                <CardHeader>
                  <CardTitle className="text-sm text-muted-foreground">
                    {label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-semibold tracking-[-.04em]">
                    {value}
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">{meta}</p>
                  {value === "72%" && <Progress className="mt-3" value={72} />}
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className="mt-5">
            <CardHeader className="flex-row items-center justify-between">
              <div>
                <CardTitle>Recent projects</CardTitle>
                <p className="mt-1 text-xs text-muted-foreground">
                  Your team’s latest work.
                </p>
              </div>
              <Button size="sm" variant="ghost">
                View all <ArrowUpRight />
              </Button>
            </CardHeader>
            <CardContent className="space-y-1">
              {[
                ["Atlas Dashboard", "Product design", "Live"],
                ["Northstar Mobile", "Engineering", "Review"],
                ["Rivelle Docs", "Design system", "Draft"],
              ].map(([name, team, status]) => (
                <div
                  className="flex items-center gap-4 rounded-xl px-3 py-3 hover:bg-foreground/[.035]"
                  key={name}
                >
                  <span className="grid size-9 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Blocks className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{name}</p>
                    <p className="text-xs text-muted-foreground">{team}</p>
                  </div>
                  <Badge variant={status === "Live" ? "success" : "secondary"}>
                    {status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </main>
      </div>
    </section>
  );
}

export { DashboardShell01 };
