"use client";

import * as React from "react";
import { ChevronRight, File, Folder, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export type TreeNode = {
  id: string;
  name: string;
  children?: TreeNode[];
  disabled?: boolean;
};
export function TreeView({
  nodes,
  value,
  onValueChange,
  defaultExpanded = [],
  label = "Files",
  className,
  ref: forwardedRef,
  ...props
}: Omit<React.ComponentProps<"ul">, "children"> & {
  nodes: TreeNode[];
  value?: string;
  onValueChange?: (id: string) => void;
  defaultExpanded?: string[];
  label?: string;
  className?: string;
}) {
  const [expanded, setExpanded] = React.useState(new Set(defaultExpanded));
  const [selected, setSelected] = React.useState<string>();
  const [focus, setFocus] = React.useState<string>();
  const root = React.useRef<HTMLUListElement>(null);
  React.useImperativeHandle(forwardedRef, () => root.current!);
  const treeId = React.useId();
  const current = value ?? selected;
  const visible: { node: TreeNode; parent?: string }[] = [];
  const collect = (items: TreeNode[], parent?: string) =>
    items.forEach((node) => {
      if (!node.disabled) visible.push({ node, parent });
      if (expanded.has(node.id) && node.children)
        collect(node.children, node.id);
    });
  collect(nodes);
  const toggle = (id: string) =>
    setExpanded((old) => {
      const next = new Set(old);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  const move = (id?: string) => {
    if (!id) return;
    setFocus(id);
    root.current
      ?.querySelectorAll<HTMLElement>('[role="treeitem"]')
      .forEach((el) => {
        if (el.dataset.treeId === id) el.focus();
      });
  };
  const render = (items: TreeNode[], level: number) =>
    items.map((node) => {
      const open = expanded.has(node.id),
        branch = Boolean(node.children?.length);
      const Icon = branch ? (open ? FolderOpen : Folder) : File;
      return (
        <li key={node.id} role="none">
          <div
            role="treeitem"
            aria-label={node.name}
            aria-owns={branch && open ? `${treeId}-${node.id}` : undefined}
            data-tree-id={node.id}
            aria-level={level}
            aria-selected={current === node.id}
            aria-disabled={node.disabled || undefined}
            aria-expanded={branch ? open : undefined}
            tabIndex={
              !node.disabled && (focus ?? visible[0]?.node.id) === node.id
                ? 0
                : -1
            }
            onFocus={() => setFocus(node.id)}
            onClick={() => {
              if (node.disabled) return;
              setFocus(node.id);
              setSelected(node.id);
              onValueChange?.(node.id);
              if (branch) toggle(node.id);
            }}
            onKeyDown={(event) => {
              if (node.disabled) return;
              const index = visible.findIndex((i) => i.node.id === node.id);
              let next: string | undefined;
              if (event.key === "ArrowDown")
                next =
                  visible[Math.min(index + 1, visible.length - 1)]?.node.id;
              else if (event.key === "ArrowUp")
                next = visible[Math.max(0, index - 1)]?.node.id;
              else if (event.key === "Home") next = visible[0]?.node.id;
              else if (event.key === "End") next = visible.at(-1)?.node.id;
              else if (event.key === "ArrowRight") {
                if (branch && !open) toggle(node.id);
                else if (branch) next = visible[index + 1]?.node.id;
              } else if (event.key === "ArrowLeft") {
                if (branch && open) toggle(node.id);
                else next = visible[index]?.parent;
              } else if (event.key === "Enter" || event.key === " ") {
                setSelected(node.id);
                onValueChange?.(node.id);
                if (branch) toggle(node.id);
              } else return;
              event.preventDefault();
              move(next);
            }}
            className={cn(
              "flex min-h-9 cursor-pointer items-center gap-2 rounded-md pr-3 text-sm outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring",
              current === node.id && "bg-primary/10 text-primary",
              node.disabled && "cursor-not-allowed opacity-40",
            )}
            style={{ paddingLeft: (level - 1) * 20 + 8 }}
          >
            <ChevronRight
              aria-hidden
              className={cn(
                "size-3 shrink-0 transition-transform motion-reduce:transition-none",
                open && "rotate-90",
                !branch && "invisible",
              )}
            />
            <Icon aria-hidden className="size-4 shrink-0" />
            <span className="truncate">{node.name}</span>
          </div>
          {branch && open && (
            <ul role="group" id={`${treeId}-${node.id}`}>
              {render(node.children!, level + 1)}
            </ul>
          )}
        </li>
      );
    });
  return (
    <ul
      ref={root}
      role="tree"
      aria-label={label}
      className={cn("rounded-lg border bg-card p-2", className)}
      {...props}
    >
      {render(nodes, 1)}
    </ul>
  );
}
