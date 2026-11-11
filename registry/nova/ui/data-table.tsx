"use client";

import * as React from "react";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export type DataColumn<T> = {
  id: string;
  header: string;
  value: (row: T) => string | number;
  cell?: (row: T) => React.ReactNode;
  sortable?: boolean;
  hideable?: boolean;
};
export function DataTable<T>({
  data,
  columns,
  getRowId,
  pageSize = 5,
  onSelectionChange,
  className,
  label = "Records",
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & {
  data: T[];
  columns: DataColumn<T>[];
  getRowId: (row: T) => string;
  pageSize?: number;
  onSelectionChange?: (ids: string[]) => void;
  className?: string;
  label?: string;
}) {
  const [query, setQuery] = React.useState(""),
    [page, setPage] = React.useState(0);
  const [sort, setSort] = React.useState<{ id: string; descending: boolean }>();
  const [hidden, setHidden] = React.useState(new Set<string>()),
    [selected, setSelected] = React.useState(new Set<string>());
  const size = Math.max(1, pageSize);
  const filtered = React.useMemo(() => {
    const rows = data.filter((row) =>
      columns.some((c) =>
        String(c.value(row)).toLowerCase().includes(query.toLowerCase()),
      ),
    );
    const column = columns.find((c) => c.id === sort?.id);
    if (column && sort)
      rows.sort((a, b) => {
        const av = column.value(a),
          bv = column.value(b);
        const compare =
          typeof av === "number" && typeof bv === "number"
            ? av - bv
            : String(av).localeCompare(String(bv), undefined, {
                numeric: true,
              });
        return sort.descending ? -compare : compare;
      });
    return rows;
  }, [data, columns, query, sort]);
  const pages = Math.max(1, Math.ceil(filtered.length / size)),
    safePage = Math.min(page, pages - 1),
    rows = filtered.slice(safePage * size, (safePage + 1) * size),
    visible = columns.filter((c) => !hidden.has(c.id));
  const select = (ids: string[], checked: boolean) => {
    const next = new Set(selected);
    ids.forEach((id) => (checked ? next.add(id) : next.delete(id)));
    setSelected(next);
    onSelectionChange?.([...next]);
  };
  const all =
      rows.length > 0 && rows.every((row) => selected.has(getRowId(row))),
    some = rows.some((row) => selected.has(getRowId(row)));
  const check = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (check.current) check.current.indeterminate = some && !all;
  }, [some, all]);
  React.useEffect(() => {
    setSelected((old) => {
      const valid = new Set(data.map(getRowId));
      const next = new Set([...old].filter((id) => valid.has(id)));
      return next.size === old.size ? old : next;
    });
  }, [data, getRowId]);
  return (
    <div className={cn("w-full min-w-0 space-y-4", className)} {...props}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Input
          aria-label={`Search ${label}`}
          className="max-w-xs"
          placeholder={`Search ${label.toLowerCase()}`}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(0);
          }}
        />
        <details className="relative">
          <summary className="cursor-pointer rounded-lg border px-3 py-2 text-sm">
            Columns
          </summary>
          <div className="absolute right-0 z-20 mt-2 min-w-40 space-y-2 rounded-lg border bg-popover p-3 shadow-lg">
            {columns
              .filter((c) => c.hideable !== false)
              .map((c) => (
                <label key={c.id} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={!hidden.has(c.id)}
                    onChange={(e) =>
                      setHidden((old) => {
                        const next = new Set(old);
                        if (e.target.checked) next.delete(c.id);
                        else if (visible.length > 1) next.add(c.id);
                        return next;
                      })
                    }
                  />
                  {c.header}
                </label>
              ))}
          </div>
        </details>
      </div>
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">{label}</caption>
          <thead className="bg-muted/40">
            <tr>
              <th scope="col" className="w-10 p-3">
                <input
                  ref={check}
                  aria-label="Select this page"
                  type="checkbox"
                  checked={all}
                  onChange={(e) => select(rows.map(getRowId), e.target.checked)}
                />
              </th>
              {visible.map((c) => (
                <th
                  scope="col"
                  key={c.id}
                  aria-sort={
                    sort?.id === c.id
                      ? sort.descending
                        ? "descending"
                        : "ascending"
                      : undefined
                  }
                  className="whitespace-nowrap p-3 font-medium"
                >
                  {c.sortable === false ? (
                    c.header
                  ) : (
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      onClick={() =>
                        setSort((old) =>
                          old?.id === c.id
                            ? old.descending
                              ? undefined
                              : { id: c.id, descending: true }
                            : { id: c.id, descending: false },
                        )
                      }
                    >
                      {c.header}
                      {sort?.id === c.id ? (
                        sort.descending ? (
                          <ArrowDown className="size-3" />
                        ) : (
                          <ArrowUp className="size-3" />
                        )
                      ) : (
                        <ChevronsUpDown className="size-3 text-muted-foreground" />
                      )}
                    </button>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={getRowId(row)}
                data-state={
                  selected.has(getRowId(row)) ? "selected" : undefined
                }
                className="border-t data-[state=selected]:bg-primary/5"
              >
                <td className="p-3">
                  <input
                    aria-label={`Select row ${getRowId(row)}`}
                    type="checkbox"
                    checked={selected.has(getRowId(row))}
                    onChange={(e) => select([getRowId(row)], e.target.checked)}
                  />
                </td>
                {visible.map((c) => (
                  <td
                    key={c.id}
                    className={cn(
                      "p-3",
                      typeof c.value(row) === "number" && "tabular-nums",
                    )}
                  >
                    {c.cell ? c.cell(row) : c.value(row)}
                  </td>
                ))}
              </tr>
            ))}
            {!rows.length && (
              <tr>
                <td
                  colSpan={visible.length + 1}
                  className="p-10 text-center text-muted-foreground"
                >
                  No matching records
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
        <span aria-live="polite">
          {selected.size} selected · {filtered.length} records
        </span>
        <div className="flex items-center gap-3">
          <Button
            size="sm"
            variant="outline"
            disabled={safePage === 0}
            onClick={() => setPage(safePage - 1)}
          >
            Previous
          </Button>
          <span>
            {safePage + 1} / {pages}
          </span>
          <Button
            size="sm"
            variant="outline"
            disabled={safePage + 1 >= pages}
            onClick={() => setPage(safePage + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
