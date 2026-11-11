export function registryExportName(slug: string) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

export const integrationNotes: Record<string, string[]> = {
  "onboarding-01": [
    "Pass onComplete(workspace) to create the workspace and send invitations in your application. The callback receives name, purpose and a deduplicated list of email addresses.",
    "Without a callback this block previews the result locally. Validation, pending and failure states are included.",
  ],
  "billing-settings-01": [
    "Connect onPlanChange(plan, yearly) and onManagePayment() to your billing API or customer portal. Plan changes update the local view only after the callback succeeds.",
    "The displayed payment method and invoices are sample data. Replace them with authorized server data before using this block in an account area.",
  ],
  "activity-feed-01": [
    "Pass events with stable IDs, actors, targets, event kinds and ISO timestamps. Dates are displayed in UTC for consistent server and client rendering.",
  ],
  "file-manager-01": [
    "Pass initialFiles and an optional async onDelete(ids) handler. The demo keeps added files in browser memory; it does not upload or persist them.",
    "Connect FileUpload.onUpload to your storage service to add real progress, cancellation and retry behavior.",
  ],
  "command-center-01": [
    "Pass commands with unique IDs, labels, groups, optional keywords and onSelect callbacks, or handle actions through onAction(id).",
    "The Cmd/Ctrl+K listener is enabled by default. Set shortcut={false} when your application already has a global command shortcut.",
  ],
  "workspace-01": [
    "Projects, task completion, invitations and workspace setup are connected through local React state. Refreshing the page resets the demo.",
    "Replace the sample records and state updates with your application data layer. The included billing and file blocks expose callbacks for provider integrations.",
  ],
  "product-launch-01": [
    "Replace the Forma content, product scenes and release notes with your own product information.",
    "Pass onSubscribe(email) from a client wrapper to connect the signup form to your mailing service. Pending and failure states are built in; the default demo sends no email.",
  ],
  "ai-chat-workspace-01": [
    "Without onRespond, responses are simulated locally and attachments are not read or transmitted.",
    "Pass an async onRespond(messages, { signal, files }) handler returning { text, sources?, code? }. Forward the AbortSignal to your request so the Stop action cancels network work.",
    "Keep provider credentials in a server route. The template owns the conversation UI; it does not include a model SDK, backend persistence or token streaming.",
  ],
};

export const effectApi: Record<
  string,
  { name: string; type: string; description: string }[]
> = {
  "scroll-stage": [
    {
      name: "scenes",
      type: "ScrollStageScene[]",
      description:
        "Ordered scenes with stable IDs, titles, descriptions and React content.",
    },
    {
      name: "scrollArea",
      type: "boolean = false",
      description:
        "Use a keyboard-focusable contained scroll area instead of page scrolling.",
    },
  ],
  "pixel-displacement": [
    {
      name: "src / alt",
      type: "string",
      description:
        "Image URL and accessible description. Use local or CORS-enabled images when exporting canvas data.",
    },
    {
      name: "columns",
      type: "number = 18",
      description: "Horizontal tile count, constrained to 4–64 for rendering.",
    },
    {
      name: "strength",
      type: "number = 26",
      description: "Maximum pointer displacement in CSS pixels.",
    },
  ],
  "morphing-surface": [
    {
      name: "title / description",
      type: "string",
      description: "Card and accessible dialog heading and description.",
    },
    {
      name: "media",
      type: "ReactNode",
      description:
        "Shared card and dialog visual. Avoid nested interactive controls in the card trigger.",
    },
    {
      name: "children",
      type: "ReactNode",
      description:
        "Expanded detail content. The dialog handles focus, dismissal and scrolling.",
    },
  ],
  "image-trail": [
    {
      name: "images",
      type: "string[]",
      description:
        "Image URLs cycled in pointer order. At most eight transient images remain mounted.",
    },
    {
      name: "threshold",
      type: "number = 70",
      description:
        "Minimum travel in CSS pixels before the next image appears.",
    },
    {
      name: "children",
      type: "ReactNode",
      description:
        "Foreground content. Coarse pointers get a static image strip; reduced motion disables the trail.",
    },
  ],
  "elastic-dock": [
    {
      name: "items",
      type: "DockItem[]",
      description:
        "Unique labels, icons and either href links or onClick actions. Native keyboard navigation is preserved.",
    },
  ],
  "rolling-number": [
    {
      name: "value",
      type: "number",
      description:
        "The current numeric value. Changing it animates individual digits.",
    },
    {
      name: "locale",
      type: 'string = "en-US"',
      description:
        "Explicit formatting locale to keep server and client output consistent.",
    },
    {
      name: "options",
      type: "Intl.NumberFormatOptions",
      description:
        "Currency, percent, fraction digits and other standard number formatting options.",
    },
  ],
};
