"use client";

import * as React from "react";
import { ArrowLeft, Folder, Plus, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { ActivityFeed01 } from "@/components/blocks/activity-feed-01";
import { BillingSettings01 } from "@/components/blocks/billing-settings-01";
import { FileManager01 } from "@/components/blocks/file-manager-01";
import { Onboarding01 } from "@/components/blocks/onboarding-01";
import { CommandCenter01 } from "@/components/blocks/command-center-01";
import { cn } from "@/lib/utils";

type Project = {
  id: string;
  name: string;
  description: string;
  status: "In progress" | "Completed";
  owner: string;
  tasks: string[];
};
const initial: Project[] = [
  {
    id: "launch",
    name: "Launch website",
    description: "A focused product story for the November release",
    status: "In progress",
    owner: "Maya Chen",
    tasks: [
      "Review page structure",
      "Finalize product preview",
      "Prepare launch assets",
    ],
  },
  {
    id: "brand",
    name: "Brand system",
    description: "Shared foundations for a consistent product",
    status: "In progress",
    owner: "Alex Rivera",
    tasks: ["Approve type scale", "Document interaction rules"],
  },
  {
    id: "research",
    name: "Customer interviews",
    description: "Six conversations about the onboarding experience",
    status: "Completed",
    owner: "Jordan Lee",
    tasks: ["Synthesize interview notes"],
  },
];
export function Workspace01({ className }: { className?: string }) {
  const [page, setPage] = React.useState("Projects"),
    [query, setQuery] = React.useState(""),
    [filter, setFilter] = React.useState("All"),
    [projects, setProjects] = React.useState(initial),
    [selected, setSelected] = React.useState<string>();
  const [newProject, setNewProject] = React.useState(false),
    [name, setName] = React.useState(""),
    [workspace, setWorkspace] = React.useState("Northstar Studio"),
    [completed, setCompleted] = React.useState(new Set<string>());
  const id = React.useId(),
    detail = projects.find((p) => p.id === selected);
  const pages = [
    "Projects",
    "Activity",
    "Files",
    "Team",
    "Billing",
    "Workspace setup",
    "Quick actions",
  ];
  return (
    <div
      className={cn(
        "min-h-[760px] bg-background text-foreground lg:grid lg:grid-cols-[224px_minmax(0,1fr)]",
        className,
      )}
    >
      <aside className="border-b bg-muted/20 p-4 lg:border-b-0 lg:border-r">
        <p className="px-3 py-4 text-sm font-medium">{workspace}</p>
        <nav
          aria-label="Workspace navigation"
          className="flex gap-1 overflow-x-auto lg:block lg:space-y-1"
        >
          {pages.map((item) => (
            <button
              key={item}
              className={cn(
                "whitespace-nowrap rounded-lg px-3 py-2 text-left text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring lg:w-full",
                item === page
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted",
              )}
              onClick={() => {
                setPage(item);
                setSelected(undefined);
              }}
              type="button"
            >
              {item}
            </button>
          ))}
        </nav>
        <p className="mt-8 hidden px-3 text-xs leading-5 text-muted-foreground lg:block">
          Workspace template
          <br />
          Interactive local demo
        </p>
      </aside>
      <main className="min-w-0 p-5 sm:p-8">
        <div className="mx-auto max-w-6xl">
          {page === "Projects" ? (
            detail ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelected(undefined)}
                >
                  <ArrowLeft />
                  All projects
                </Button>
                <header className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-xs text-primary">{detail.status}</p>
                    <h1 className="mt-3 text-3xl font-medium">{detail.name}</h1>
                    <p className="mt-3 text-sm text-muted-foreground">
                      {detail.description}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() =>
                      setProjects((old) =>
                        old.map((p) =>
                          p.id === detail.id
                            ? {
                                ...p,
                                status:
                                  p.status === "Completed"
                                    ? "In progress"
                                    : "Completed",
                              }
                            : p,
                        ),
                      )
                    }
                  >
                    {detail.status === "Completed"
                      ? "Reopen project"
                      : "Complete project"}
                  </Button>
                </header>
                <div className="mt-8 grid gap-8 md:grid-cols-[minmax(0,1fr)_220px]">
                  <section className="rounded-xl border p-5">
                    <h2 className="mb-4 font-medium">Project tasks</h2>
                    {detail.tasks.map((task, index) => {
                      const key = `${detail.id}-${index}`;
                      return (
                        <label
                          key={key}
                          className="flex items-center gap-3 border-t py-4 text-sm"
                        >
                          <input
                            type="checkbox"
                            checked={completed.has(key)}
                            onChange={(e) =>
                              setCompleted((old) => {
                                const next = new Set(old);
                                e.target.checked
                                  ? next.add(key)
                                  : next.delete(key);
                                return next;
                              })
                            }
                          />
                          <span
                            className={cn(
                              completed.has(key) &&
                                "text-muted-foreground line-through",
                            )}
                          >
                            {task}
                          </span>
                        </label>
                      );
                    })}
                  </section>
                  <aside className="space-y-4 text-sm">
                    <p className="text-muted-foreground">Project owner</p>
                    <p>{detail.owner}</p>
                    <p className="pt-4 text-muted-foreground">Team</p>
                    <p>Maya Chen · Alex Rivera</p>
                  </aside>
                </div>
              </>
            ) : (
              <>
                <header className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-xs text-muted-foreground">
                      Workspace / Projects
                    </p>
                    <h1 className="mt-3 text-3xl font-medium">Projects</h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Keep the work moving, from first idea to release
                    </p>
                  </div>
                  <Button onClick={() => setNewProject(true)}>
                    <Plus />
                    New project
                  </Button>
                </header>
                <div className="my-8 flex flex-wrap gap-3">
                  <Input
                    aria-label="Search projects"
                    placeholder="Search projects"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="max-w-xs"
                  />
                  <select
                    aria-label="Project status"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="rounded-lg border bg-background px-3 text-sm"
                  >
                    {["All", "In progress", "Completed"].map((status) => (
                      <option key={status}>{status}</option>
                    ))}
                  </select>
                </div>
                <div className="grid gap-4 xl:grid-cols-2">
                  {projects
                    .filter(
                      (p) =>
                        (filter === "All" || p.status === filter) &&
                        p.name.toLowerCase().includes(query.toLowerCase()),
                    )
                    .map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setSelected(p.id)}
                        className="rounded-xl border bg-card p-6 text-left outline-none transition-colors hover:bg-muted/30 focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <Folder className="size-5 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {p.status}
                          </span>
                        </div>
                        <h2 className="mt-6 text-lg font-medium">{p.name}</h2>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          {p.description}
                        </p>
                        <p className="mt-6 border-t pt-4 text-xs text-muted-foreground">
                          {p.owner} · {p.tasks.length} tasks
                        </p>
                      </button>
                    ))}
                </div>
                {!projects.some(
                  (p) =>
                    (filter === "All" || p.status === filter) &&
                    p.name.toLowerCase().includes(query.toLowerCase()),
                ) && (
                  <p className="py-16 text-center text-muted-foreground">
                    No projects match your search
                  </p>
                )}
              </>
            )
          ) : page === "Activity" ? (
            <ActivityFeed01 />
          ) : page === "Files" ? (
            <FileManager01 />
          ) : page === "Billing" ? (
            <BillingSettings01 />
          ) : page === "Workspace setup" ? (
            <Onboarding01
              onComplete={(data) => {
                setWorkspace(data.name);
                setPage("Projects");
              }}
            />
          ) : page === "Quick actions" ? (
            <CommandCenter01
              onAction={(action) => {
                if (action === "project") {
                  setPage("Projects");
                  setNewProject(true);
                } else if (action === "billing") setPage("Billing");
                else if (action === "invite") setPage("Team");
                else {
                  setPage("Projects");
                  setSelected(action);
                }
              }}
            />
          ) : (
            <TeamPanel />
          )}
        </div>
      </main>
      <Dialog open={newProject} onOpenChange={setNewProject}>
        <DialogContent>
          <DialogTitle>Create a project</DialogTitle>
          <DialogDescription>
            Give this workspace a new place to work
          </DialogDescription>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!name.trim()) return;
              setProjects((old) => [
                ...old,
                {
                  id: crypto.randomUUID(),
                  name: name.trim(),
                  description: "Your next project starts here",
                  owner: "You",
                  status: "In progress",
                  tasks: ["Define the first milestone"],
                },
              ]);
              setName("");
              setNewProject(false);
            }}
          >
            <label className="grid gap-2 text-sm" htmlFor={`${id}-project`}>
              Project name
              <Input
                id={`${id}-project`}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                maxLength={100}
              />
            </label>
            <Button className="mt-6">Create project</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
function TeamPanel() {
  const [members, setMembers] = React.useState([
      { email: "maya@northstar.studio", role: "Owner" },
      { email: "alex@northstar.studio", role: "Editor" },
    ]),
    [email, setEmail] = React.useState("");
  return (
    <section className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-medium">Team</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Demo invitations are added locally
      </p>
      <form
        className="my-8 flex gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          if (!members.some((m) => m.email === email))
            setMembers((old) => [...old, { email, role: "Invited" }]);
          setEmail("");
        }}
      >
        <Input
          aria-label="Invitation email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="teammate@studio.com"
        />
        <Button>Invite</Button>
      </form>
      <ul className="divide-y rounded-xl border px-5">
        {members.map((member) => (
          <li
            key={member.email}
            className="flex flex-wrap items-center justify-between gap-4 py-5 text-sm"
          >
            <span>{member.email}</span>
            <span className="text-muted-foreground">{member.role}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
