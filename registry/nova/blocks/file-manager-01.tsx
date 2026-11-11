"use client";

import * as React from "react";
import { File, Grid2X2, List, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileUpload } from "@/components/ui/file-upload";
import { cn } from "@/lib/utils";

export type ManagedFile = {
  id: string;
  name: string;
  size: number;
  kind: string;
};
const initial: ManagedFile[] = [
  { id: "1", name: "Brand guidelines.pdf", size: 2400000, kind: "Document" },
  { id: "2", name: "Homepage.fig", size: 8100000, kind: "Design" },
  { id: "3", name: "Launch notes.md", size: 4200, kind: "Document" },
  { id: "4", name: "Product photo.webp", size: 620000, kind: "Image" },
];
export function FileManager01({
  initialFiles = initial,
  onDelete,
  className,
}: {
  initialFiles?: ManagedFile[];
  onDelete?: (ids: string[]) => Promise<void> | void;
  className?: string;
}) {
  const [files, setFiles] = React.useState(initialFiles),
    [query, setQuery] = React.useState(""),
    [view, setView] = React.useState("grid"),
    [selected, setSelected] = React.useState(new Set<string>()),
    [upload, setUpload] = React.useState(false),
    [message, setMessage] = React.useState(""),
    [busy, setBusy] = React.useState(false);
  const visible = files.filter((f) =>
    f.name.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <section
      className={cn("w-full rounded-xl border bg-background p-6", className)}
    >
      <header className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-medium">Files</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Project resources, in one place
          </p>
        </div>
        <Button onClick={() => setUpload(!upload)}>
          {upload ? "Close upload" : "Add files"}
        </Button>
      </header>
      {upload && (
        <FileUpload
          className="mt-6"
          maxFiles={10}
          onFilesChange={(incoming) => {
            setFiles((old) => {
              const kept = old.filter((f) => !f.id.startsWith("local:"));
              return [
                ...kept,
                ...incoming.map((f) => ({
                  id: `local:${f.name}:${f.lastModified}`,
                  name: f.name,
                  size: f.size,
                  kind: f.type.startsWith("image/") ? "Image" : "Document",
                })),
              ];
            });
          }}
        />
      )}
      <div className="my-6 flex flex-wrap items-center gap-3">
        <Input
          className="max-w-xs"
          aria-label="Search files"
          placeholder="Search files"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div
          className="ml-auto flex gap-1"
          role="group"
          aria-label="File layout"
        >
          <Button
            aria-label="Grid view"
            aria-pressed={view === "grid"}
            size="icon-sm"
            variant={view === "grid" ? "secondary" : "ghost"}
            onClick={() => setView("grid")}
          >
            <Grid2X2 />
          </Button>
          <Button
            aria-label="List view"
            aria-pressed={view === "list"}
            size="icon-sm"
            variant={view === "list" ? "secondary" : "ghost"}
            onClick={() => setView("list")}
          >
            <List />
          </Button>
        </div>
        {selected.size > 0 && (
          <Button
            size="sm"
            variant="outline"
            disabled={busy}
            onClick={async () => {
              setBusy(true);
              try {
                await onDelete?.([...selected]);
                setFiles((old) => old.filter((f) => !selected.has(f.id)));
                setSelected(new Set());
                setMessage("Selected files removed");
              } catch {
                setMessage("Could not remove files. Try again.");
              } finally {
                setBusy(false);
              }
            }}
          >
            <Trash2 />
            Remove {selected.size}
          </Button>
        )}
      </div>
      <div
        className={cn(
          "grid gap-3",
          view === "grid" && "sm:grid-cols-2 lg:grid-cols-3",
        )}
      >
        {visible.map((file) => (
          <label
            key={file.id}
            className={cn(
              "flex cursor-pointer gap-3 rounded-lg border p-4",
              selected.has(file.id) && "border-primary bg-primary/5",
              view === "grid" && "flex-col",
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <File className="size-7 text-muted-foreground" />
              <input
                aria-label={`Select ${file.name}`}
                type="checkbox"
                checked={selected.has(file.id)}
                onChange={(e) =>
                  setSelected((old) => {
                    const next = new Set(old);
                    e.target.checked ? next.add(file.id) : next.delete(file.id);
                    return next;
                  })
                }
              />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{file.name}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                {file.kind} · {(file.size / 1024 / 1024).toFixed(1)} MB
              </p>
            </div>
          </label>
        ))}
      </div>
      {!visible.length && (
        <p className="py-12 text-center text-sm text-muted-foreground">
          No matching files
        </p>
      )}
      <p role="status" className="mt-4 text-xs text-muted-foreground">
        {message || `${visible.length} files · Browser demo, changes are local`}
      </p>
    </section>
  );
}
