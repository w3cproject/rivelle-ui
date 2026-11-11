"use client";

import * as React from "react";
import { ArrowUp, Check, Copy, Paperclip, Plus, Square, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
  sources?: { label: string; url: string }[];
  code?: string;
};
export type ChatResponder = (
  messages: ChatMessage[],
  context: { signal: AbortSignal; files: File[] },
) => Promise<Pick<ChatMessage, "text" | "sources" | "code">>;
type Conversation = { id: string; title: string; messages: ChatMessage[] };
const initial: Conversation[] = [
  {
    id: "start",
    title: "Plan a product release",
    messages: [
      {
        id: "intro",
        role: "assistant",
        text: "Let’s put the next release in order. Share your goals, paste a brief, or attach the documents you want to work with.",
        sources: [
          { label: "Next.js documentation", url: "https://nextjs.org/docs" },
        ],
        code: 'export const release = {\n  version: "0.6.0",\n  status: "in-progress",\n}',
      },
    ],
  },
];
export function AiChatWorkspace01({
  onRespond,
  className,
}: {
  onRespond?: ChatResponder;
  className?: string;
}) {
  const [conversations, setConversations] = React.useState(initial),
    [active, setActive] = React.useState("start"),
    [prompt, setPrompt] = React.useState(""),
    [files, setFiles] = React.useState<File[]>([]),
    [busy, setBusy] = React.useState(false),
    [error, setError] = React.useState(""),
    [copied, setCopied] = React.useState<string>();
  const controller = React.useRef<AbortController | null>(null),
    messageArea = React.useRef<HTMLDivElement>(null),
    input = React.useRef<HTMLInputElement>(null);
  const conversation = conversations.find((c) => c.id === active)!;
  React.useEffect(() => () => controller.current?.abort(), []);
  React.useEffect(() => {
    if (messageArea.current)
      messageArea.current.scrollTop = messageArea.current.scrollHeight;
  }, [active, conversation.messages.length, busy]);
  const send = async () => {
    if (!prompt.trim() || busy) return;
    const user: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      text:
        prompt.trim() +
        (files.length
          ? `\n\nAttachments: ${files.map((f) => f.name).join(", ")}`
          : ""),
    };
    const messages = [...conversation.messages, user],
      conversationId = active,
      attachments = files;
    setConversations((old) =>
      old.map((c) =>
        c.id === conversationId
          ? {
              ...c,
              title: c.messages.some((m) => m.role === "user")
                ? c.title
                : prompt.trim().slice(0, 36),
              messages,
            }
          : c,
      ),
    );
    setPrompt("");
    setFiles([]);
    setError("");
    setBusy(true);
    const abort = new AbortController();
    controller.current = abort;
    try {
      const response = onRespond
        ? await onRespond(messages, {
            signal: abort.signal,
            files: attachments,
          })
        : await demoResponse(user.text, abort.signal);
      if (!abort.signal.aborted)
        setConversations((old) =>
          old.map((c) =>
            c.id === conversationId
              ? {
                  ...c,
                  messages: [
                    ...c.messages,
                    { id: crypto.randomUUID(), role: "assistant", ...response },
                  ],
                }
              : c,
          ),
        );
    } catch (failure) {
      if (!abort.signal.aborted)
        setError(
          failure instanceof Error
            ? failure.message
            : "Could not get a response. Please try again.",
        );
    } finally {
      if (controller.current === abort) {
        setBusy(false);
        controller.current = null;
      }
    }
  };
  return (
    <div
      className={cn(
        "grid h-[800px] max-h-[95dvh] min-h-[560px] grid-rows-[auto_1fr] bg-background md:grid-cols-[220px_minmax(0,1fr)] md:grid-rows-1",
        className,
      )}
    >
      <aside className="border-b bg-muted/20 p-4 md:border-b-0 md:border-r">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Fieldnote / Chat</p>
          <Button
            size="icon-sm"
            variant="ghost"
            aria-label="New conversation"
            disabled={busy}
            onClick={() => {
              const id = crypto.randomUUID();
              setConversations((old) => [
                { id, title: "New conversation", messages: [] },
                ...old,
              ]);
              setActive(id);
              setError("");
            }}
          >
            <Plus />
          </Button>
        </div>
        <nav
          aria-label="Conversations"
          className="mt-4 flex gap-2 overflow-x-auto md:block md:space-y-1"
        >
          {conversations.map((c) => (
            <button
              key={c.id}
              disabled={busy}
              onClick={() => {
                setActive(c.id);
                setError("");
              }}
              className={cn(
                "max-w-52 truncate rounded-lg px-3 py-2 text-left text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring md:w-full",
                active === c.id
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground",
              )}
            >
              {c.title}
            </button>
          ))}
        </nav>
        <p className="mt-8 hidden text-xs leading-5 text-muted-foreground md:block">
          {onRespond
            ? "Connected response handler"
            : "Demonstration mode. Responses are simulated locally."}
        </p>
      </aside>
      <main className="flex min-h-0 min-w-0 flex-col">
        <header className="flex items-center justify-between border-b px-6 py-4">
          <h1 className="truncate text-sm font-medium">{conversation.title}</h1>
          <span className="text-xs text-muted-foreground">
            {onRespond ? "Connected" : "Demo"}
          </span>
        </header>
        <div
          ref={messageArea}
          className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-8"
        >
          <div className="mx-auto max-w-2xl space-y-8">
            {!conversation.messages.length && (
              <div className="py-16">
                <p className="text-3xl font-medium">What are you working on?</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {[
                    "Plan a product release",
                    "Review my project brief",
                    "Draft a team update",
                  ].map((text) => (
                    <Button
                      key={text}
                      variant="outline"
                      size="sm"
                      onClick={() => setPrompt(text)}
                    >
                      {text}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            {conversation.messages.map((message) => (
              <article
                key={message.id}
                className={cn(
                  message.role === "user" && "ml-6 rounded-xl bg-muted/50 p-4",
                )}
              >
                <p className="mb-3 text-xs font-medium text-muted-foreground">
                  {message.role === "user" ? "You" : "Fieldnote"}
                </p>
                <div className="whitespace-pre-wrap text-sm leading-7">
                  {message.text}
                </div>
                {message.code && (
                  <pre className="mt-4 overflow-x-auto rounded-lg border bg-muted/30 p-4 text-xs leading-6">
                    <code>{message.code}</code>
                  </pre>
                )}
                {message.sources && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {message.sources.map((source) => (
                      <a
                        key={source.url}
                        href={source.url}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-md border px-3 py-1.5 text-xs text-primary underline-offset-4 hover:underline"
                      >
                        {source.label} ↗
                      </a>
                    ))}
                  </div>
                )}
                {message.role === "assistant" && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="mt-2"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(message.text);
                        setCopied(message.id);
                      } catch {
                        setError(
                          "Clipboard unavailable. Select the response text to copy it.",
                        );
                      }
                    }}
                  >
                    {copied === message.id ? <Check /> : <Copy />}
                    {copied === message.id ? "Copied" : "Copy"}
                  </Button>
                )}
              </article>
            ))}
            {busy && (
              <p role="status" className="text-sm text-muted-foreground">
                Preparing a response…
              </p>
            )}
          </div>
        </div>
        <div className="mx-auto w-full max-w-3xl p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void send();
            }}
            className="rounded-xl border bg-card p-3"
          >
            <textarea
              aria-label="Message"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" &&
                  !e.shiftKey &&
                  !e.nativeEvent.isComposing
                ) {
                  e.preventDefault();
                  void send();
                }
              }}
              placeholder="Ask about your next project"
              rows={2}
              className="w-full resize-none bg-transparent p-2 text-sm outline-none"
            />
            <div className="mb-2 flex flex-wrap gap-2">
              {files.map((file, index) => (
                <span
                  className="flex max-w-48 items-center gap-1 rounded-md bg-muted px-2 py-1 text-xs"
                  key={`${file.name}-${index}`}
                >
                  <span className="truncate">{file.name}</span>
                  <button
                    type="button"
                    aria-label={`Remove ${file.name}`}
                    onClick={() =>
                      setFiles((old) => old.filter((_, i) => i !== index))
                    }
                  >
                    <X className="size-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex justify-between">
              <input
                ref={input}
                type="file"
                multiple
                className="hidden"
                onChange={(e) => {
                  const incoming = Array.from(e.target.files ?? []);
                  if (incoming.some((f) => f.size > 10 * 1024 * 1024))
                    setError("Attachments must be smaller than 10 MB");
                  else setFiles((old) => [...old, ...incoming].slice(0, 5));
                  e.target.value = "";
                }}
              />
              <Button
                type="button"
                aria-label="Attach files"
                size="icon-sm"
                variant="ghost"
                disabled={busy}
                onClick={() => input.current?.click()}
              >
                <Paperclip />
              </Button>
              {busy ? (
                <Button
                  type="button"
                  size="icon-sm"
                  aria-label="Stop response"
                  onClick={() => {
                    controller.current?.abort();
                    controller.current = null;
                    setBusy(false);
                  }}
                >
                  <Square />
                </Button>
              ) : (
                <Button
                  size="icon-sm"
                  aria-label="Send message"
                  disabled={!prompt.trim()}
                >
                  <ArrowUp />
                </Button>
              )}
            </div>
          </form>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            {onRespond
              ? "Enter to send · Shift + Enter for a new line"
              : "Local demo · attachments are not sent or read"}
          </p>
          {error && (
            <p role="alert" className="mt-2 text-sm text-destructive">
              {error}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
async function demoResponse(text: string, signal: AbortSignal) {
  await new Promise<void>((resolve, reject) => {
    const timer = setTimeout(() => {
      signal.removeEventListener("abort", cancel);
      resolve();
    }, 800);
    const cancel = () => {
      clearTimeout(timer);
      reject(new DOMException("Aborted", "AbortError"));
    };
    signal.addEventListener("abort", cancel, { once: true });
  });
  return {
    text: `Demo response to “${text.slice(0, 80)}”\n\n1. Define the outcome and the person it helps.\n2. Break the work into reviewable milestones.\n3. Assign a clear owner and a check-in date.\n\nThis is a local example. Pass onRespond to connect your own model, tools or API.`,
  };
}
