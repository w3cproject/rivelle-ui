"use client";

import * as React from "react";
import { Home, Folder, Search, Settings, Mail } from "lucide-react";
import { ScrollStage } from "@/effects/scroll-stage";
import { PixelDisplacement } from "@/effects/pixel-displacement";
import { MorphingSurface } from "@/effects/morphing-surface";
import { ImageTrail } from "@/effects/image-trail";
import { ElasticDock } from "@/effects/elastic-dock";
import { RollingNumber } from "@/effects/rolling-number";
import { FileUpload, type UploadHandler } from "@/components/ui/file-upload";
import { DataTable } from "@/components/ui/data-table";
import { TreeView } from "@/components/ui/tree-view";
import { Stepper } from "@/components/ui/stepper";
import { Button } from "@/components/ui/button";

const art = (color: string, caption: string) =>
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="900" height="650" viewBox="0 0 900 650"><rect width="900" height="650" fill="#10131a"/><circle cx="450" cy="280" r="210" fill="${color}"/><path d="M0 500L900 140M0 570L900 210M0 640L900 280" stroke="#10131a" stroke-width="32"/><text x="48" y="605" fill="#fff" font-family="sans-serif" font-size="40">${caption}</text></svg>`)}`;
const covers = [
  art("#379bdf", "Field study / 01"),
  art("#c7a86c", "Material study / 02"),
  art("#8a9b82", "Spatial study / 03"),
];
export function ExpansionEffectDemo({
  slug,
  compact = false,
}: {
  slug: string;
  compact?: boolean;
}) {
  const [value, setValue] = React.useState(1248),
    [action, setAction] = React.useState("Home");
  if (slug === "scroll-stage")
    return (
      <div className="w-full max-w-4xl">
        <ScrollStage
          scrollArea={compact}
          scenes={[
            {
              id: "capture",
              title: "Capture the signal",
              description:
                "Start with the raw material. Notes, observations and a clear question.",
              content: (
                <img
                  src={covers[0]}
                  alt="Blue geometric field study"
                  className="w-full rounded-lg"
                />
              ),
            },
            {
              id: "shape",
              title: "Find the structure",
              description:
                "Build a rhythm from the pieces. Give the work a shape worth exploring.",
              content: (
                <img
                  src={covers[1]}
                  alt="Warm geometric material study"
                  className="w-full rounded-lg"
                />
              ),
            },
            {
              id: "ship",
              title: "Release the work",
              description:
                "A considered result, ready for the next person to use.",
              content: (
                <img
                  src={covers[2]}
                  alt="Green geometric spatial study"
                  className="w-full rounded-lg"
                />
              ),
            },
          ]}
        />
      </div>
    );
  if (slug === "pixel-displacement")
    return (
      <div className="w-full max-w-xl">
        <PixelDisplacement
          src={covers[0]}
          alt="Field study, blue geometric artwork"
        />
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Move over the surface to displace the image
        </p>
      </div>
    );
  if (slug === "morphing-surface")
    return (
      <MorphingSurface
        title="A study in motion"
        description="From a small detail to the full story"
        media={
          <img
            src={covers[1]}
            alt="Material study"
            className="size-full object-cover"
          />
        }
      >
        <p>
          A connected transition keeps the object in context as you open it.
          This detail view is a keyboard-accessible dialog with a focus trap,
          scrollable content and Escape dismissal.
        </p>
        <p className="mt-4">
          Use it for case studies, product details or an image gallery. The
          visual layer is yours to replace.
        </p>
      </MorphingSurface>
    );
  if (slug === "image-trail")
    return (
      <ImageTrail className="w-full max-w-3xl" images={covers}>
        <div className="pointer-events-none text-center">
          <p className="text-4xl font-medium tracking-tight">
            Leave an impression
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            Draw a path through the selected work
          </p>
        </div>
      </ImageTrail>
    );
  if (slug === "elastic-dock")
    return (
      <div className="w-full text-center">
        <p className="mb-8 text-sm text-muted-foreground" aria-live="polite">
          {action}
        </p>
        <ElasticDock
          items={[
            { label: "Home", icon: <Home /> },
            { label: "Projects", icon: <Folder /> },
            { label: "Search", icon: <Search /> },
            { label: "Inbox", icon: <Mail /> },
            { label: "Settings", icon: <Settings /> },
          ].map((item) => ({ ...item, onClick: () => setAction(item.label) }))}
        />
        <p className="mt-4 text-xs text-muted-foreground">
          Move across the dock or use your keyboard
        </p>
      </div>
    );
  if (slug === "rolling-number")
    return (
      <div className="text-center">
        <p className="mb-6 text-xs text-muted-foreground">Monthly usage</p>
        <RollingNumber
          className="text-5xl font-medium sm:text-7xl"
          value={value}
        />
        <div className="mt-8 flex justify-center gap-3">
          <Button
            variant="outline"
            onClick={() => setValue((v) => Math.max(0, v - 137))}
          >
            −137
          </Button>
          <Button onClick={() => setValue((v) => v + 249)}>+249</Button>
        </div>
      </div>
    );
  return null;
}

export const expansionComponents = [
  "file-upload",
  "stepper",
  "tree-view",
  "data-table",
];
const uploadDemo: UploadHandler = (_, { signal, onProgress }) =>
  new Promise((resolve, reject) => {
    let progress = 0;
    const cleanup = () => {
      clearInterval(timer);
      signal.removeEventListener("abort", cancel);
    };
    const cancel = () => {
      cleanup();
      reject(new DOMException("Aborted", "AbortError"));
    };
    const timer = setInterval(() => {
      progress += 10;
      onProgress(progress);
      if (progress >= 100) {
        cleanup();
        resolve();
      }
    }, 120);
    signal.addEventListener("abort", cancel, { once: true });
  });
export function ExpansionComponentDemo({ slug }: { slug: string }) {
  const [step, setStep] = React.useState(1),
    [selection, setSelection] = React.useState("button");
  if (slug === "file-upload")
    return (
      <div className="w-full max-w-xl">
        <FileUpload accept="image/*,.pdf,.txt" onUpload={uploadDemo} />
        <p className="mt-3 text-xs text-muted-foreground">
          Demo progress only. No files leave your browser.
        </p>
      </div>
    );
  if (slug === "stepper")
    return (
      <div className="w-full max-w-2xl space-y-8">
        <Stepper
          value={step}
          onValueChange={setStep}
          steps={[
            {
              id: "details",
              title: "Details",
              description: "Name your workspace",
            },
            { id: "team", title: "Team", description: "Choose collaborators" },
            { id: "review", title: "Review", description: "Ready to create" },
          ]}
        />
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
          >
            Back
          </Button>
          <Button
            onClick={() => setStep(Math.min(2, step + 1))}
            disabled={step === 2}
          >
            Continue
          </Button>
        </div>
        <Stepper
          orientation="vertical"
          value={1}
          steps={[
            { id: "saved", title: "Details saved" },
            {
              id: "email",
              title: "Verify email",
              error: "Check the address before continuing",
            },
            { id: "done", title: "Finish setup" },
          ]}
        />
      </div>
    );
  if (slug === "tree-view")
    return (
      <div className="w-full max-w-sm">
        <TreeView
          value={selection}
          onValueChange={setSelection}
          defaultExpanded={["src", "ui"]}
          nodes={[
            {
              id: "src",
              name: "src",
              children: [
                {
                  id: "ui",
                  name: "components",
                  children: [
                    { id: "button", name: "button.tsx" },
                    { id: "input", name: "input.tsx" },
                    { id: "archive", name: "archived.tsx", disabled: true },
                  ],
                },
                {
                  id: "app",
                  name: "app",
                  children: [
                    { id: "page", name: "page.tsx" },
                    { id: "layout", name: "layout.tsx" },
                  ],
                },
              ],
            },
            { id: "readme", name: "README.md" },
          ]}
        />
        <p className="mt-4 text-xs text-muted-foreground" aria-live="polite">
          Selected: {selection}
        </p>
      </div>
    );
  if (slug === "data-table")
    return (
      <DataTable
        className="max-w-3xl"
        label="Projects"
        getRowId={(row) => row.id}
        data={[
          {
            id: "PRJ-01",
            name: "Launch website",
            owner: "Maya Chen",
            status: "In progress",
            budget: 8400,
          },
          {
            id: "PRJ-02",
            name: "Brand system",
            owner: "Alex Rivera",
            status: "In review",
            budget: 6200,
          },
          {
            id: "PRJ-03",
            name: "Mobile app",
            owner: "Jordan Lee",
            status: "Planning",
            budget: 12400,
          },
          {
            id: "PRJ-04",
            name: "Research sprint",
            owner: "Maya Chen",
            status: "Completed",
            budget: 3100,
          },
          {
            id: "PRJ-05",
            name: "Design tokens",
            owner: "Alex Rivera",
            status: "In progress",
            budget: 4800,
          },
          {
            id: "PRJ-06",
            name: "Documentation",
            owner: "Jordan Lee",
            status: "Planning",
            budget: 2600,
          },
        ]}
        columns={[
          {
            id: "name",
            header: "Project",
            value: (row) => row.name,
            hideable: false,
          },
          { id: "owner", header: "Owner", value: (row) => row.owner },
          { id: "status", header: "Status", value: (row) => row.status },
          {
            id: "budget",
            header: "Budget",
            value: (row) => row.budget,
            cell: (row) => `$${row.budget.toLocaleString("en-US")}`,
          },
        ]}
      />
    );
  return null;
}
