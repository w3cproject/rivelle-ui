"use client";

import * as React from "react";
import { File as FileIcon, Upload, X, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type UploadEntry = {
  id: string;
  file: File;
  progress: number;
  status: "queued" | "uploading" | "done" | "error";
  error?: string;
  preview?: string;
};
export type UploadHandler = (
  file: File,
  context: { signal: AbortSignal; onProgress: (progress: number) => void },
) => Promise<void>;
export function FileUpload({
  accept,
  maxFiles = 5,
  maxSize = 10 * 1024 * 1024,
  onUpload,
  onFilesChange,
  className,
  disabled = false,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & {
  accept?: string;
  maxFiles?: number;
  maxSize?: number;
  onUpload?: UploadHandler;
  onFilesChange?: (files: File[]) => void;
  className?: string;
  disabled?: boolean;
}) {
  const [entries, setEntries] = React.useState<UploadEntry[]>([]),
    [errors, setErrors] = React.useState<string[]>([]),
    [dragging, setDragging] = React.useState(false);
  const entriesRef = React.useRef(entries),
    jobs = React.useRef(new Map<string, AbortController>()),
    urls = React.useRef(new Set<string>());
  const input = React.useRef<HTMLInputElement>(null),
    id = React.useId();
  const update = (fn: (items: UploadEntry[]) => UploadEntry[]) => {
    const next = fn(entriesRef.current);
    entriesRef.current = next;
    setEntries(next);
    return next;
  };
  React.useEffect(
    () => () => {
      jobs.current.forEach((c) => c.abort());
      urls.current.forEach((url) => URL.revokeObjectURL(url));
    },
    [],
  );
  const run = async (entry: UploadEntry) => {
    if (!onUpload) return;
    const controller = new AbortController();
    jobs.current.set(entry.id, controller);
    update((items) =>
      items.map((i) =>
        i.id === entry.id
          ? { ...i, status: "uploading", progress: 0, error: undefined }
          : i,
      ),
    );
    try {
      await onUpload(entry.file, {
        signal: controller.signal,
        onProgress: (progress) => {
          if (!controller.signal.aborted)
            update((items) =>
              items.map((i) =>
                i.id === entry.id
                  ? { ...i, progress: Math.max(0, Math.min(100, progress)) }
                  : i,
              ),
            );
        },
      });
      if (!controller.signal.aborted)
        update((items) =>
          items.map((i) =>
            i.id === entry.id ? { ...i, status: "done", progress: 100 } : i,
          ),
        );
    } catch (error) {
      if (!controller.signal.aborted)
        update((items) =>
          items.map((i) =>
            i.id === entry.id
              ? {
                  ...i,
                  status: "error",
                  error:
                    error instanceof Error ? error.message : "Upload failed",
                }
              : i,
          ),
        );
    } finally {
      jobs.current.delete(entry.id);
    }
  };
  const add = (files: File[]) => {
    if (disabled) return;
    const rejected: string[] = [],
      added: UploadEntry[] = [];
    for (const file of files) {
      const rules = accept
        ?.split(",")
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean);
      if (
        rules?.length &&
        !rules.some((rule) =>
          rule.startsWith(".")
            ? file.name.toLowerCase().endsWith(rule)
            : rule.endsWith("/*")
              ? file.type.startsWith(rule.slice(0, -1))
              : file.type === rule,
        )
      ) {
        rejected.push(`${file.name}: unsupported file type`);
        continue;
      }
      if (file.size > maxSize) {
        rejected.push(
          `${file.name}: exceeds ${Math.round(maxSize / 1024 / 1024)} MB`,
        );
        continue;
      }
      if (entriesRef.current.length + added.length >= maxFiles) {
        rejected.push(`Choose up to ${maxFiles} files`);
        break;
      }
      if (
        [...entriesRef.current, ...added].some(
          (e) =>
            e.file.name === file.name &&
            e.file.size === file.size &&
            e.file.lastModified === file.lastModified,
        )
      )
        continue;
      const preview = file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : undefined;
      if (preview) urls.current.add(preview);
      added.push({
        id: crypto.randomUUID(),
        file,
        progress: 0,
        status: "queued",
        preview,
      });
    }
    const next = update((items) => [...items, ...added]);
    onFilesChange?.(next.map((e) => e.file));
    setErrors(rejected);
    added.forEach((entry) => void run(entry));
  };
  const remove = (entry: UploadEntry) => {
    jobs.current.get(entry.id)?.abort();
    if (entry.preview) {
      URL.revokeObjectURL(entry.preview);
      urls.current.delete(entry.preview);
    }
    const next = update((items) => items.filter((i) => i.id !== entry.id));
    onFilesChange?.(next.map((i) => i.file));
  };
  return (
    <div
      className={cn("w-full space-y-3", className)}
      aria-disabled={disabled || undefined}
      {...props}
    >
      <input
        ref={input}
        id={id}
        type="file"
        disabled={disabled}
        multiple={maxFiles > 1}
        accept={accept}
        className="sr-only"
        tabIndex={-1}
        onChange={(e) => {
          add(Array.from(e.target.files ?? []));
          e.target.value = "";
        }}
      />
      <button
        type="button"
        aria-controls={id}
        disabled={disabled}
        className={cn(
          "grid min-h-40 w-full place-items-center rounded-xl border border-dashed p-6 text-center outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          dragging
            ? "border-primary bg-primary/10"
            : "bg-muted/20 hover:bg-muted/40",
        )}
        onClick={() => input.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          add(Array.from(e.dataTransfer.files));
        }}
      >
        <span>
          <Upload
            aria-hidden
            className="mx-auto mb-3 size-5 text-muted-foreground"
          />
          <span className="block text-sm font-medium">
            Drop files or browse
          </span>
          <span className="mt-2 block text-xs text-muted-foreground">
            Up to {maxFiles} files · {Math.round(maxSize / 1024 / 1024)} MB each
          </span>
        </span>
      </button>
      {errors.length > 0 && (
        <div role="alert" className="text-xs text-destructive">
          {errors.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      )}
      <ul className="space-y-2">
        {entries.map((entry) => (
          <li
            key={entry.id}
            className="flex items-center gap-3 rounded-lg border bg-card p-3"
          >
            {entry.preview ? (
              <img
                src={entry.preview}
                alt=""
                className="size-10 rounded object-cover"
              />
            ) : (
              <FileIcon
                aria-hidden
                className="size-8 shrink-0 text-muted-foreground"
              />
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm">{entry.file.name}</p>
              <p
                className={cn(
                  "mt-1 text-xs text-muted-foreground",
                  entry.error && "text-destructive",
                )}
                role={entry.error ? "alert" : undefined}
              >
                {entry.error ||
                  (entry.status === "queued"
                    ? "Ready to upload"
                    : entry.status === "done"
                      ? "Uploaded"
                      : `${Math.round(entry.progress)}%`)}
              </p>
              {entry.status === "uploading" && (
                <progress
                  aria-label={`Uploading ${entry.file.name}`}
                  value={entry.progress}
                  max={100}
                  className="mt-2 h-1 w-full accent-primary"
                />
              )}
            </div>
            {entry.status === "error" && (
              <Button
                size="icon-sm"
                variant="ghost"
                aria-label={`Retry ${entry.file.name}`}
                onClick={() => void run(entry)}
              >
                <RotateCcw />
              </Button>
            )}
            <Button
              size="icon-sm"
              variant="ghost"
              aria-label={`${entry.status === "uploading" ? "Cancel" : "Remove"} ${entry.file.name}`}
              onClick={() => remove(entry)}
            >
              <X />
            </Button>
          </li>
        ))}
      </ul>
      <p role="status" className="sr-only">
        {entries.filter((e) => e.status === "done").length} uploaded,{" "}
        {entries.length} selected
      </p>
    </div>
  );
}
