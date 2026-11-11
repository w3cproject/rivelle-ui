"use client";

import * as React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export type WorkspaceCommand = {
  id: string;
  label: string;
  group: string;
  keywords?: string[];
  onSelect?: () => void;
};
const defaults: WorkspaceCommand[] = [
  { id: "project", label: "Create project", group: "Actions" },
  { id: "invite", label: "Invite teammate", group: "Actions" },
  { id: "launch", label: "Launch website", group: "Projects" },
  { id: "brand", label: "Brand system", group: "Projects" },
  { id: "billing", label: "Billing settings", group: "Navigation" },
];
export function CommandCenter01({
  commands = defaults,
  onAction,
  shortcut = true,
}: {
  commands?: WorkspaceCommand[];
  onAction?: (id: string) => void;
  shortcut?: boolean;
}) {
  const [open, setOpen] = React.useState(false),
    [recent, setRecent] = React.useState<string[]>([]),
    [message, setMessage] = React.useState("");
  React.useEffect(() => {
    if (!shortcut) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((old) => !old);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [shortcut]);
  const select = (command: WorkspaceCommand) => {
    command.onSelect?.();
    onAction?.(command.id);
    setRecent((old) =>
      [command.id, ...old.filter((id) => id !== command.id)].slice(0, 3),
    );
    setMessage(`Selected ${command.label}`);
    setOpen(false);
  };
  return (
    <div className="mx-auto w-full max-w-lg rounded-xl border bg-background p-6">
      <h2 className="text-xl font-medium">Find your next action</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Projects, workspace navigation and quick actions
      </p>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="mt-6 w-full justify-between">
            Search workspace{" "}
            <kbd className="text-xs text-muted-foreground">⌘ / Ctrl K</kbd>
          </Button>
        </DialogTrigger>
        <DialogContent className="p-0">
          <DialogTitle className="sr-only">Workspace commands</DialogTitle>
          <DialogDescription className="sr-only">
            Search and select a project or action
          </DialogDescription>
          <Command>
            <CommandInput placeholder="Search projects and actions" />
            <CommandList>
              <CommandEmpty>No matching commands</CommandEmpty>
              {recent.length > 0 && (
                <CommandGroup heading="Recent">
                  {recent
                    .map((id) => commands.find((c) => c.id === id))
                    .filter((c): c is WorkspaceCommand => Boolean(c))
                    .map((c) => (
                      <CommandItem
                        key={`recent-${c.id}`}
                        value={`recent ${c.label}`}
                        onSelect={() => select(c)}
                      >
                        {c.label}
                      </CommandItem>
                    ))}
                </CommandGroup>
              )}
              {[...new Set(commands.map((c) => c.group))].map((group) => (
                <CommandGroup key={group} heading={group}>
                  {commands
                    .filter((c) => c.group === group)
                    .map((c) => (
                      <CommandItem
                        key={c.id}
                        value={`${c.label} ${c.keywords?.join(" ") ?? ""}`}
                        onSelect={() => select(c)}
                      >
                        {c.label}
                      </CommandItem>
                    ))}
                </CommandGroup>
              ))}
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
      <p className="mt-4 text-xs text-muted-foreground" role="status">
        {message || "Use arrow keys to navigate and Enter to select"}
      </p>
    </div>
  );
}
