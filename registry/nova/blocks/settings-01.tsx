import * as React from "react";
import { Camera, Save } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

function Settings01({ className, ...props }: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "rounded-[2rem] border border-foreground/10 bg-background p-6 sm:p-10",
        className,
      )}
      {...props}
    >
      <div className="mx-auto max-w-3xl">
        <div>
          <h1 className="text-3xl font-semibold tracking-[-.04em]">
            Account settings
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Manage your public profile and workspace preferences.
          </p>
        </div>
        <Separator className="my-8" />
        <form>
          <div className="grid gap-8 sm:grid-cols-[180px_1fr]">
            <div>
              <p className="text-sm font-semibold">Profile</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                This information appears across your workspace.
              </p>
            </div>
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <Avatar className="size-16">
                  <AvatarFallback className="text-base">MC</AvatarFallback>
                </Avatar>
                <Button size="sm" variant="outline">
                  <Camera /> Change photo
                </Button>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="settings-name">Display name</Label>
                  <Input defaultValue="Maya Chen" id="settings-name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="settings-role">Role</Label>
                  <Input defaultValue="Product designer" id="settings-role" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="settings-email">Email</Label>
                <Input
                  defaultValue="maya@rivelle.dev"
                  id="settings-email"
                  type="email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="settings-bio">Bio</Label>
                <Textarea
                  defaultValue="Designing thoughtful tools for creative teams."
                  id="settings-bio"
                />
              </div>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="grid gap-8 sm:grid-cols-[180px_1fr]">
            <div>
              <p className="text-sm font-semibold">Notifications</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Choose what reaches your inbox.
              </p>
            </div>
            <div className="space-y-5">
              {[
                [
                  "Product updates",
                  "New features, improvements and announcements.",
                ],
                ["Team activity", "Invites, mentions and project changes."],
                ["Weekly digest", "A concise summary every Monday."],
              ].map(([title, description], index) => (
                <div
                  className="flex items-start justify-between gap-5"
                  key={title}
                >
                  <div>
                    <Label htmlFor={`setting-${index}`}>{title}</Label>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {description}
                    </p>
                  </div>
                  <Switch
                    defaultChecked={index !== 2}
                    id={`setting-${index}`}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-9 flex justify-end">
            <Button>
              <Save /> Save changes
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

export { Settings01 };
