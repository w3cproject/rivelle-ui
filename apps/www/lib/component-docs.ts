export type PropDoc = {
  name: string;
  type: string;
  defaultValue: string;
  description: string;
};
export type ComponentDoc = {
  slug: string;
  name: string;
  description: string;
  install: string;
  client: boolean;
  code: string;
  props: PropDoc[];
};

const primitiveProps: PropDoc[] = [
  {
    name: "className",
    type: "string",
    defaultValue: "—",
    description: "Overrides or extends the generated Tailwind classes.",
  },
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "false",
    description: "Prevents user interaction when supported.",
  },
];

export const componentDocs: ComponentDoc[] = [
  {
    slug: "button",
    name: "Button",
    description:
      "A tactile action primitive with a restrained accent edge and an optional Rivelle signature shape.",
    install: "button",
    client: false,
    code: `import { Button } from "@/components/ui/button"

export function ButtonDemo() {
  return <Button variant="outline">Explore system</Button>
}`,
    props: [
      {
        name: "variant",
        type: '"default" | "signature" | "prism" | "destructive" | "outline" | "secondary" | "ghost" | "link"',
        defaultValue: '"default"',
        description:
          "Controls the visual treatment. Signature adds Rivelle’s asymmetric corner; Prism adds a luminous high-contrast action.",
      },
      {
        name: "size",
        type: '"default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg"',
        defaultValue: '"default"',
        description: "Controls height and horizontal spacing.",
      },
      {
        name: "asChild",
        type: "boolean",
        defaultValue: "false",
        description: "Composes styles and behavior onto the child element.",
      },
      {
        name: "className",
        type: "string",
        defaultValue: "—",
        description: "Overrides or extends the generated Tailwind classes.",
      },
    ],
  },
  {
    slug: "badge",
    name: "Badge",
    description: "Displays a compact label for status, metadata or categories.",
    install: "badge",
    client: false,
    code: `import { Badge } from "@/components/ui/badge"

export function BadgeDemo() {
  return <Badge variant="success">Ready</Badge>
}`,
    props: [
      {
        name: "variant",
        type: '"default" | "secondary" | "outline" | "destructive" | "success"',
        defaultValue: '"default"',
        description: "Controls color and emphasis.",
      },
      {
        name: "asChild",
        type: "boolean",
        defaultValue: "false",
        description: "Renders the child while preserving badge styling.",
      },
      {
        name: "className",
        type: "string",
        defaultValue: "—",
        description: "Overrides or extends the generated classes.",
      },
    ],
  },
  {
    slug: "input",
    name: "Input",
    description:
      "A refined field with inset and luminous Prism surface options.",
    install: "input",
    client: false,
    code: `import { Input } from "@/components/ui/input"

export function InputDemo() {
  return <Input placeholder="you@example.com" type="email" />
}`,
    props: [
      {
        name: "variant",
        type: '"default" | "prism"',
        defaultValue: '"default"',
        description:
          "Switches between the soft inset field and the crisp luminous surface.",
      },
      {
        name: "type",
        type: "React.HTMLInputTypeAttribute",
        defaultValue: '"text"',
        description: "Native input type.",
      },
      {
        name: "aria-invalid",
        type: "boolean",
        defaultValue: "false",
        description: "Enables the destructive validation state.",
      },
      {
        name: "className",
        type: "string",
        defaultValue: "—",
        description: "Overrides or extends input styling.",
      },
    ],
  },
  {
    slug: "textarea",
    name: "Textarea",
    description:
      "A responsive multiline field with refined focus and validation states.",
    install: "textarea",
    client: false,
    code: `import { Textarea } from "@/components/ui/textarea"

export function TextareaDemo() {
  return <Textarea placeholder="Tell us what you are building…" />
}`,
    props: [
      {
        name: "rows",
        type: "number",
        defaultValue: "—",
        description: "Sets an initial visible row count.",
      },
      {
        name: "aria-invalid",
        type: "boolean",
        defaultValue: "false",
        description: "Enables the destructive validation state.",
      },
      {
        name: "className",
        type: "string",
        defaultValue: "—",
        description: "Overrides or extends textarea styling.",
      },
    ],
  },
  {
    slug: "card",
    name: "Card",
    description:
      "A composable content container with header, body and footer regions.",
    install: "card",
    client: false,
    code: `import {
  Card, CardContent, CardDescription,
  CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card"

export function CardDemo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project created</CardTitle>
        <CardDescription>Your new workspace is ready.</CardDescription>
      </CardHeader>
      <CardContent>Start adding components.</CardContent>
      <CardFooter>Updated just now</CardFooter>
    </Card>
  )
}`,
    props: [
      {
        name: "Card",
        type: 'React.ComponentProps<"div">',
        defaultValue: "—",
        description: "The root content container.",
      },
      {
        name: "CardHeader",
        type: 'React.ComponentProps<"div">',
        defaultValue: "—",
        description: "Groups title and description.",
      },
      {
        name: "CardContent",
        type: 'React.ComponentProps<"div">',
        defaultValue: "—",
        description: "Primary card content.",
      },
      {
        name: "CardFooter",
        type: 'React.ComponentProps<"div">',
        defaultValue: "—",
        description: "Actions or supporting metadata.",
      },
    ],
  },
  {
    slug: "separator",
    name: "Separator",
    description:
      "Visually or semantically separates content in horizontal and vertical layouts.",
    install: "separator",
    client: true,
    code: `import { Separator } from "@/components/ui/separator"

export function SeparatorDemo() {
  return <Separator className="my-4" />
}`,
    props: [
      {
        name: "orientation",
        type: '"horizontal" | "vertical"',
        defaultValue: '"horizontal"',
        description: "Controls the separator axis.",
      },
      {
        name: "decorative",
        type: "boolean",
        defaultValue: "true",
        description: "Removes semantic meaning when used only visually.",
      },
      {
        name: "className",
        type: "string",
        defaultValue: "—",
        description: "Overrides or extends separator styling.",
      },
    ],
  },
  {
    slug: "switch",
    name: "Switch",
    description:
      "An accessible, animated control for toggling a boolean setting.",
    install: "switch",
    client: true,
    code: `import { Switch } from "@/components/ui/switch"

export function SwitchDemo() {
  return <Switch aria-label="Enable notifications" defaultChecked />
}`,
    props: [
      {
        name: "checked",
        type: "boolean",
        defaultValue: "—",
        description: "Controlled checked state.",
      },
      {
        name: "defaultChecked",
        type: "boolean",
        defaultValue: "false",
        description: "Initial state when uncontrolled.",
      },
      {
        name: "onCheckedChange",
        type: "(checked: boolean) => void",
        defaultValue: "—",
        description: "Runs whenever the state changes.",
      },
      {
        name: "disabled",
        type: "boolean",
        defaultValue: "false",
        description: "Prevents interaction.",
      },
    ],
  },
  {
    slug: "label",
    name: "Label",
    description: "An accessible label associated with a form control.",
    install: "label",
    client: true,
    code: `import { Label } from "@/components/ui/label"\n\n<Label htmlFor="email">Email</Label>`,
    props: primitiveProps,
  },
  {
    slug: "checkbox",
    name: "Checkbox",
    description: "A compact control for boolean and indeterminate values.",
    install: "checkbox",
    client: true,
    code: `import { Checkbox } from "@/components/ui/checkbox"\nimport { Label } from "@/components/ui/label"\n\n<div className="flex items-center gap-2">\n  <Checkbox id="terms" />\n  <Label htmlFor="terms">Accept terms</Label>\n</div>`,
    props: primitiveProps,
  },
  {
    slug: "radio-group",
    name: "Radio Group",
    description: "A keyboard-accessible set of mutually exclusive options.",
    install: "radio-group",
    client: true,
    code: `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"\n\n<RadioGroup defaultValue="comfortable">\n  <RadioGroupItem value="compact" />\n  <RadioGroupItem value="comfortable" />\n</RadioGroup>`,
    props: primitiveProps,
  },
  {
    slug: "select",
    name: "Select",
    description: "An option picker with a polished floating content surface.",
    install: "select",
    client: true,
    code: `import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Choose a role" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="admin">Admin</SelectItem>
  </SelectContent>
</Select>`,
    props: primitiveProps,
  },
  {
    slug: "tabs",
    name: "Tabs",
    description: "Organizes related content into keyboard-accessible views.",
    install: "tabs",
    client: true,
    code: `import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="team">Team</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account settings</TabsContent>
</Tabs>`,
    props: primitiveProps,
  },
  {
    slug: "alert",
    name: "Alert",
    description: "A semantic callout for important information and feedback.",
    install: "alert",
    client: false,
    code: `import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"\n\n<Alert>\n  <AlertTitle>Heads up</AlertTitle>\n  <AlertDescription>Your workspace is ready.</AlertDescription>\n</Alert>`,
    props: primitiveProps,
  },
  {
    slug: "skeleton",
    name: "Skeleton",
    description:
      "A lightweight placeholder that communicates loading structure.",
    install: "skeleton",
    client: false,
    code: `import { Skeleton } from "@/components/ui/skeleton"\n\n<Skeleton className="h-4 w-48" />`,
    props: primitiveProps,
  },
  {
    slug: "avatar",
    name: "Avatar",
    description: "An image avatar with a reliable textual fallback.",
    install: "avatar",
    client: true,
    code: `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"\n\n<Avatar>\n  <AvatarImage src="/avatar.jpg" alt="Ada" />\n  <AvatarFallback>AD</AvatarFallback>\n</Avatar>`,
    props: primitiveProps,
  },
  {
    slug: "tooltip",
    name: "Tooltip",
    description: "Contextual information revealed on hover or keyboard focus.",
    install: "tooltip",
    client: true,
    code: `import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>Hover me</TooltipTrigger>
    <TooltipContent>More information</TooltipContent>
  </Tooltip>
</TooltipProvider>`,
    props: primitiveProps,
  },
  {
    slug: "dialog",
    name: "Dialog",
    description: "A modal surface that focuses attention on an important task.",
    install: "dialog",
    client: true,
    code: `import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogTitle>Edit project</DialogTitle>
  </DialogContent>
</Dialog>`,
    props: primitiveProps,
  },
  {
    slug: "sheet",
    name: "Sheet",
    description: "A dialog surface that enters from an edge of the viewport.",
    install: "sheet",
    client: true,
    code: `import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

<Sheet>
  <SheetTrigger>Open menu</SheetTrigger>
  <SheetContent>
    <SheetTitle>Navigation</SheetTitle>
  </SheetContent>
</Sheet>`,
    props: primitiveProps,
  },
  {
    slug: "dropdown-menu",
    name: "Dropdown Menu",
    description: "A compact, composable menu for actions and choices.",
    install: "dropdown-menu",
    client: true,
    code: `import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

<DropdownMenu>
  <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Edit</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
    props: primitiveProps,
  },
  {
    slug: "popover",
    name: "Popover",
    description: "A non-modal floating surface anchored to a trigger.",
    install: "popover",
    client: true,
    code: `import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

<Popover>
  <PopoverTrigger>Open</PopoverTrigger>
  <PopoverContent>Popover content</PopoverContent>
</Popover>`,
    props: primitiveProps,
  },
  {
    slug: "command",
    name: "Command",
    description: "A fast command menu and searchable action surface.",
    install: "command",
    client: true,
    code: `import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

<Command>
  <CommandInput placeholder="Search commands..." />
  <CommandList>
    <CommandItem>Create project</CommandItem>
  </CommandList>
</Command>`,
    props: primitiveProps,
  },
  {
    slug: "accordion",
    name: "Accordion",
    description:
      "Vertically stacked disclosure sections with fluid, accessible motion.",
    install: "accordion",
    client: true,
    code: `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

<Accordion collapsible type="single">
  <AccordionItem value="item-1">
    <AccordionTrigger>Is the source editable?</AccordionTrigger>
    <AccordionContent>Every detail is yours to change.</AccordionContent>
  </AccordionItem>
</Accordion>`,
    props: [
      {
        name: "type",
        type: '"single" | "multiple"',
        defaultValue: "—",
        description: "Controls whether one or several items can be open.",
      },
      {
        name: "collapsible",
        type: "boolean",
        defaultValue: "false",
        description: "Allows the active single item to be closed.",
      },
      ...primitiveProps,
    ],
  },
  {
    slug: "breadcrumb",
    name: "Breadcrumb",
    description:
      "Server-safe hierarchical navigation with composable separators.",
    install: "breadcrumb",
    client: false,
    code: `import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbPage>Components</BreadcrumbPage></BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
    props: primitiveProps,
  },
  {
    slug: "collapsible",
    name: "Collapsible",
    description: "An expandable content region controlled by a trigger.",
    install: "collapsible",
    client: true,
    code: `import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

<Collapsible>
  <CollapsibleTrigger>Toggle details</CollapsibleTrigger>
  <CollapsibleContent>Hidden content</CollapsibleContent>
</Collapsible>`,
    props: [
      {
        name: "defaultOpen",
        type: "boolean",
        defaultValue: "false",
        description: "Sets the initial uncontrolled state.",
      },
      {
        name: "open",
        type: "boolean",
        defaultValue: "—",
        description: "Controls the expanded state.",
      },
      ...primitiveProps,
    ],
  },
  {
    slug: "progress",
    name: "Progress",
    description:
      "An accessible progress indicator with a luminous active range.",
    install: "progress",
    client: true,
    code: `import { Progress } from "@/components/ui/progress"

<Progress value={72} />`,
    props: [
      {
        name: "value",
        type: "number | null",
        defaultValue: "0",
        description: "Current progress between 0 and 100.",
      },
      {
        name: "max",
        type: "number",
        defaultValue: "100",
        description: "Maximum progress value exposed to assistive technology.",
      },
      ...primitiveProps,
    ],
  },
  {
    slug: "slider",
    name: "Slider",
    description: "A tactile single or multi-value range control.",
    install: "slider",
    client: true,
    code: `import { Slider } from "@/components/ui/slider"

<Slider defaultValue={[58]} max={100} step={1} />`,
    props: [
      {
        name: "defaultValue",
        type: "number[]",
        defaultValue: "[min]",
        description:
          "Initial uncontrolled values; multiple entries create a range.",
      },
      {
        name: "min / max",
        type: "number",
        defaultValue: "0 / 100",
        description: "Defines the available numeric range.",
      },
      {
        name: "step",
        type: "number",
        defaultValue: "1",
        description: "Increment between allowed values.",
      },
      ...primitiveProps,
    ],
  },
  {
    slug: "toggle",
    name: "Toggle",
    description:
      "A two-state button with tactile default and outline treatments.",
    install: "toggle",
    client: true,
    code: `import { Bold } from "lucide-react"
import { Toggle } from "@/components/ui/toggle"

<Toggle aria-label="Toggle bold" variant="outline">
  <Bold />
</Toggle>`,
    props: [
      {
        name: "variant",
        type: '"default" | "outline"',
        defaultValue: '"default"',
        description: "Controls the surrounding surface.",
      },
      {
        name: "size",
        type: '"sm" | "default" | "lg"',
        defaultValue: '"default"',
        description: "Controls the hit area and padding.",
      },
      {
        name: "pressed",
        type: "boolean",
        defaultValue: "—",
        description: "Controls the active state.",
      },
      ...primitiveProps,
    ],
  },
  {
    slug: "toggle-group",
    name: "Toggle Group",
    description: "A coordinated set of single or multiple selection toggles.",
    install: "toggle-group",
    client: true,
    code: `import { Bold, Italic } from "lucide-react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

<ToggleGroup type="multiple" variant="outline">
  <ToggleGroupItem value="bold"><Bold /></ToggleGroupItem>
  <ToggleGroupItem value="italic"><Italic /></ToggleGroupItem>
</ToggleGroup>`,
    props: [
      {
        name: "type",
        type: '"single" | "multiple"',
        defaultValue: "—",
        description: "Controls the selection model.",
      },
      {
        name: "variant",
        type: '"default" | "outline"',
        defaultValue: '"default"',
        description: "Shared treatment for every item.",
      },
      ...primitiveProps,
    ],
  },
  {
    slug: "hover-card",
    name: "Hover Card",
    description: "A rich preview revealed from a link or compact trigger.",
    install: "hover-card",
    client: true,
    code: `import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

<HoverCard>
  <HoverCardTrigger>@rivelle/ui</HoverCardTrigger>
  <HoverCardContent>Editable React components.</HoverCardContent>
</HoverCard>`,
    props: [
      {
        name: "openDelay",
        type: "number",
        defaultValue: "700",
        description: "Delay before the card opens.",
      },
      {
        name: "closeDelay",
        type: "number",
        defaultValue: "300",
        description: "Delay before the card closes.",
      },
      ...primitiveProps,
    ],
  },
  {
    slug: "context-menu",
    name: "Context Menu",
    description: "A full-featured action menu opened with a secondary click.",
    install: "context-menu",
    client: true,
    code: `import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

<ContextMenu>
  <ContextMenuTrigger>Right-click here</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>View source</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`,
    props: primitiveProps,
  },
  {
    slug: "scroll-area",
    name: "Scroll Area",
    description: "A native-scrolling viewport with refined custom scrollbars.",
    install: "scroll-area",
    client: true,
    code: `import { ScrollArea } from "@/components/ui/scroll-area"

<ScrollArea className="h-64">
  <div className="p-4">Scrollable content</div>
</ScrollArea>`,
    props: [
      {
        name: "type",
        type: '"auto" | "always" | "scroll" | "hover"',
        defaultValue: '"hover"',
        description: "Controls when custom scrollbars are visible.",
      },
      {
        name: "scrollHideDelay",
        type: "number",
        defaultValue: "600",
        description: "Delay before an auto scrollbar hides.",
      },
      ...primitiveProps,
    ],
  },
  {
    slug: "aspect-ratio",
    name: "Aspect Ratio",
    description: "A small primitive for predictable media proportions.",
    install: "aspect-ratio",
    client: true,
    code: `import { AspectRatio } from "@/components/ui/aspect-ratio"

<AspectRatio ratio={16 / 9}>
  <img alt="Preview" src="/preview.jpg" />
</AspectRatio>`,
    props: [
      {
        name: "ratio",
        type: "number",
        defaultValue: "1",
        description: "Desired width divided by height.",
      },
      ...primitiveProps,
    ],
  },
  {
    slug: "alert-dialog",
    name: "Alert Dialog",
    description: "A focused confirmation surface for consequential actions.",
    install: "alert-dialog",
    client: true,
    code: `import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

<AlertDialog>
  <AlertDialogTrigger>Delete project</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Delete this project?</AlertDialogTitle>
      <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
    props: primitiveProps,
  },
  {
    slug: "button-group",
    name: "Button Group",
    description: "Connects related actions into one compact control surface.",
    install: "button-group",
    client: false,
    code: `import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"

<ButtonGroup>
  <Button variant="outline">Month</Button>
  <Button variant="outline">Week</Button>
  <Button variant="outline">Day</Button>
</ButtonGroup>`,
    props: [
      {
        name: "orientation",
        type: '"horizontal" | "vertical"',
        defaultValue: '"horizontal"',
        description: "Sets the direction and connected edge geometry.",
      },
      ...primitiveProps,
    ],
  },
  {
    slug: "input-group",
    name: "Input Group",
    description:
      "Combines a field with icons, labels and inline actions in one focus surface.",
    install: "input-group",
    client: false,
    code: `import { Mail } from "lucide-react"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"

<InputGroup>
  <InputGroupAddon><Mail /></InputGroupAddon>
  <InputGroupInput placeholder="you@example.com" />
</InputGroup>`,
    props: [
      {
        name: "align",
        type: '"inline-start" | "inline-end" | "block-start" | "block-end"',
        defaultValue: '"inline-start"',
        description: "Places an addon around the input control.",
      },
      ...primitiveProps,
    ],
  },
  {
    slug: "field",
    name: "Field",
    description:
      "Structures labels, controls, help text and errors without forcing a form library.",
    install: "field",
    client: false,
    code: `import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

<Field>
  <FieldLabel htmlFor="handle">Workspace handle</FieldLabel>
  <Input aria-invalid id="handle" />
  <FieldDescription>Used in your public URL.</FieldDescription>
  <FieldError>That handle is already taken.</FieldError>
</Field>`,
    props: [
      {
        name: "orientation",
        type: '"vertical" | "horizontal" | "responsive"',
        defaultValue: '"vertical"',
        description: "Controls label and control layout.",
      },
      {
        name: "errors",
        type: "Array<{ message?: string }>",
        defaultValue: "—",
        description:
          "Optional form-library error collection rendered by FieldError.",
      },
      ...primitiveProps,
    ],
  },
  {
    slug: "table",
    name: "Table",
    description:
      "A responsive table shell with precise hierarchy and subtle row interaction.",
    install: "table",
    client: false,
    code: `import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

<Table>
  <TableHeader><TableRow><TableHead>Project</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
  <TableBody><TableRow><TableCell>Rivelle</TableCell><TableCell>Live</TableCell></TableRow></TableBody>
</Table>`,
    props: primitiveProps,
  },
  {
    slug: "pagination",
    name: "Pagination",
    description:
      "Server-safe navigation for paged collections and search results.",
    install: "pagination",
    client: false,
    code: `import {
  Pagination, PaginationContent, PaginationItem,
  PaginationLink, PaginationNext, PaginationPrevious,
} from "@/components/ui/pagination"

<Pagination>
  <PaginationContent>
    <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
    <PaginationItem><PaginationLink href="#" isActive>1</PaginationLink></PaginationItem>
    <PaginationItem><PaginationNext href="#" /></PaginationItem>
  </PaginationContent>
</Pagination>`,
    props: [
      {
        name: "isActive",
        type: "boolean",
        defaultValue: "false",
        description: "Marks the current page and applies the active treatment.",
      },
      ...primitiveProps,
    ],
  },
  {
    slug: "empty",
    name: "Empty",
    description:
      "A composed first-run or no-result state with media, copy and actions.",
    install: "empty",
    client: false,
    code: `import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"

<Empty>
  <EmptyHeader>
    <EmptyMedia variant="icon">+</EmptyMedia>
    <EmptyTitle>No projects yet</EmptyTitle>
    <EmptyDescription>Create a project to start composing your interface.</EmptyDescription>
  </EmptyHeader>
  <EmptyContent>Create project</EmptyContent>
</Empty>`,
    props: [
      {
        name: "variant",
        type: '"default" | "icon"',
        defaultValue: '"default"',
        description: "Adds the elevated icon container to EmptyMedia.",
      },
      ...primitiveProps,
    ],
  },
  {
    slug: "spinner",
    name: "Spinner",
    description:
      "A compact accessible loading indicator that inherits the current color.",
    install: "spinner",
    client: false,
    code: `import { Spinner } from "@/components/ui/spinner"

<button disabled>
  <Spinner /> Publishing
</button>`,
    props: [
      {
        name: "aria-label",
        type: "string",
        defaultValue: '"Loading"',
        description: "Accessible status label.",
      },
      ...primitiveProps,
    ],
  },
  {
    slug: "form",
    name: "Form",
    description:
      "Accessible react-hook-form bindings for controls, descriptions and validation messages.",
    install: "form",
    client: true,
    code: `import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const form = useForm({ defaultValues: { email: "" } })

<Form {...form}>
  <form onSubmit={form.handleSubmit(console.log)}>
    <FormField control={form.control} name="email" render={({ field }) => (
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl><Input {...field} /></FormControl>
        <FormMessage />
      </FormItem>
    )} />
  </form>
</Form>`,
    props: [
      {
        name: "control",
        type: "Control<TFieldValues>",
        defaultValue: "—",
        description: "The react-hook-form control instance.",
      },
      {
        name: "name",
        type: "FieldPath<TFieldValues>",
        defaultValue: "—",
        description: "The strongly typed field path.",
      },
      ...primitiveProps,
    ],
  },
  {
    slug: "combobox",
    name: "Combobox",
    description:
      "A searchable controlled option picker composed from Command and Popover.",
    install: "combobox",
    client: true,
    code: `import { Combobox } from "@/components/ui/combobox"

<Combobox
  options={[
    { value: "next", label: "Next.js" },
    { value: "vite", label: "Vite" },
  ]}
  placeholder="Select framework"
/>`,
    props: [
      {
        name: "options",
        type: "ComboboxOption[]",
        defaultValue: "—",
        description: "Searchable values and display labels.",
      },
      {
        name: "value",
        type: "string",
        defaultValue: "—",
        description: "Controlled selected value.",
      },
      {
        name: "onValueChange",
        type: "(value: string) => void",
        defaultValue: "—",
        description: "Runs when an option is selected.",
      },
      ...primitiveProps,
    ],
  },
  {
    slug: "tag-input",
    name: "Tag Input",
    description:
      "A token field for creating, validating and removing free-form values with the keyboard.",
    install: "tag-input",
    client: true,
    code: `import { TagInput } from "@/components/ui/tag-input"

<TagInput
  defaultValue={["React", "TypeScript"]}
  maxTags={5}
  name="technologies"
  placeholder="Add technology..."
/>`,
    props: [
      {
        name: "value",
        type: "string[]",
        defaultValue: "—",
        description: "Controlled collection of tags.",
      },
      {
        name: "onValueChange",
        type: "(value: string[]) => void",
        defaultValue: "—",
        description: "Runs whenever a tag is added or removed.",
      },
      {
        name: "maxTags",
        type: "number",
        defaultValue: "—",
        description: "Maximum number of accepted tags.",
      },
      {
        name: "validateTag",
        type: "(value: string) => boolean",
        defaultValue: "—",
        description: "Validates a candidate before it is added.",
      },
      {
        name: "delimiters",
        type: "string[]",
        defaultValue: '[","]',
        description: "Keys and pasted separators that create a tag.",
      },
      ...primitiveProps,
    ],
  },
  {
    slug: "multi-select",
    name: "Multi Select",
    description:
      "A searchable multiple-value picker with selection limits and compact summaries.",
    install: "multi-select",
    client: true,
    code: `import { MultiSelect } from "@/components/ui/multi-select"

<MultiSelect
  defaultValue={["design"]}
  options={[
    { value: "design", label: "Design" },
    { value: "engineering", label: "Engineering" },
    { value: "product", label: "Product" },
  ]}
  placeholder="Select teams"
/>`,
    props: [
      {
        name: "options",
        type: "MultiSelectOption[]",
        defaultValue: "—",
        description: "Searchable values, display labels and disabled states.",
      },
      {
        name: "value",
        type: "string[]",
        defaultValue: "—",
        description: "Controlled selected values.",
      },
      {
        name: "onValueChange",
        type: "(value: string[]) => void",
        defaultValue: "—",
        description: "Runs whenever the selection changes.",
      },
      {
        name: "maxSelected",
        type: "number",
        defaultValue: "—",
        description: "Maximum number of simultaneously selected options.",
      },
      {
        name: "maxCount",
        type: "number",
        defaultValue: "2",
        description: "Visible chips before the remaining count is collapsed.",
      },
      ...primitiveProps,
    ],
  },
  {
    slug: "calendar",
    name: "Calendar",
    description:
      "A polished calendar for single, multiple and range date selection.",
    install: "calendar",
    client: true,
    code: `import { Calendar } from "@/components/ui/calendar"

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
/>`,
    props: [
      {
        name: "mode",
        type: '"single" | "multiple" | "range"',
        defaultValue: "—",
        description: "Controls the calendar selection model.",
      },
      {
        name: "showOutsideDays",
        type: "boolean",
        defaultValue: "true",
        description: "Shows dates from adjacent months.",
      },
      ...primitiveProps,
    ],
  },
  {
    slug: "date-picker",
    name: "Date Picker",
    description:
      "A controlled date field composed from Calendar, Popover and Button.",
    install: "date-picker",
    client: true,
    code: `import { DatePicker } from "@/components/ui/date-picker"

<DatePicker
  value={date}
  onValueChange={setDate}
  clearable
/>`,
    props: [
      {
        name: "value",
        type: "Date | undefined",
        defaultValue: "—",
        description: "Controlled selected date.",
      },
      {
        name: "onValueChange",
        type: "(date?: Date) => void",
        defaultValue: "—",
        description: "Runs when the date changes.",
      },
      {
        name: "locale",
        type: "string",
        defaultValue: '"en-US"',
        description: "BCP 47 locale used to format the trigger label.",
      },
      {
        name: "clearable",
        type: "boolean",
        defaultValue: "false",
        description: "Displays an inline clear action.",
      },
    ],
  },
  {
    slug: "drawer",
    name: "Drawer",
    description:
      "A gesture-driven bottom sheet for focused mobile tasks and confirmations.",
    install: "drawer",
    client: true,
    code: `import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"

<Drawer>
  <DrawerTrigger>Open drawer</DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Publish component?</DrawerTitle>
      <DrawerDescription>This action updates the public registry.</DrawerDescription>
    </DrawerHeader>
  </DrawerContent>
</Drawer>`,
    props: [
      {
        name: "direction",
        type: '"top" | "right" | "bottom" | "left"',
        defaultValue: '"bottom"',
        description: "Edge from which the drawer enters.",
      },
      {
        name: "dismissible",
        type: "boolean",
        defaultValue: "true",
        description: "Allows gesture and overlay dismissal.",
      },
      ...primitiveProps,
    ],
  },
  {
    slug: "navigation-menu",
    name: "Navigation Menu",
    description:
      "Accessible application or marketing navigation with animated rich panels.",
    install: "navigation-menu",
    client: true,
    code: `import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Products</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink href="/components">Components</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`,
    props: [
      {
        name: "viewport",
        type: "boolean",
        defaultValue: "true",
        description: "Renders content inside the animated shared viewport.",
      },
      {
        name: "orientation",
        type: '"horizontal" | "vertical"',
        defaultValue: '"horizontal"',
        description: "Navigation reading direction.",
      },
      ...primitiveProps,
    ],
  },
  {
    slug: "input-otp",
    name: "Input OTP",
    description:
      "An accessible one-time-code field with grouped animated slots.",
    install: "input-otp",
    client: true,
    code: `import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"

<InputOTP maxLength={6}>
  <InputOTPGroup>
    {Array.from({ length: 6 }, (_, index) => (
      <InputOTPSlot index={index} key={index} />
    ))}
  </InputOTPGroup>
</InputOTP>`,
    props: [
      {
        name: "maxLength",
        type: "number",
        defaultValue: "—",
        description: "Required maximum code length.",
      },
      {
        name: "pattern",
        type: "string",
        defaultValue: "—",
        description: "Restricts accepted characters.",
      },
      ...primitiveProps,
    ],
  },
  {
    slug: "carousel",
    name: "Carousel",
    description:
      "An accessible touch and keyboard-friendly carousel powered by Embla.",
    install: "carousel",
    client: true,
    code: `import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

<Carousel>
  <CarouselContent>
    {[1, 2, 3].map((slide) => (
      <CarouselItem key={slide}>Slide {slide}</CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`,
    props: [
      {
        name: "orientation",
        type: '"horizontal" | "vertical"',
        defaultValue: '"horizontal"',
        description: "Controls the scroll axis.",
      },
      {
        name: "opts",
        type: "CarouselOptions",
        defaultValue: "—",
        description: "Embla behavior and alignment options.",
      },
      {
        name: "setApi",
        type: "(api: CarouselApi) => void",
        defaultValue: "—",
        description: "Exposes the Embla API for advanced control.",
      },
      ...primitiveProps,
    ],
  },
  {
    slug: "resizable",
    name: "Resizable",
    description:
      "Accessible panel layouts users can resize with pointer or keyboard.",
    install: "resizable",
    client: true,
    code: `import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"

<ResizablePanelGroup direction="horizontal">
  <ResizablePanel defaultSize={35}>Navigation</ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel>Content</ResizablePanel>
</ResizablePanelGroup>`,
    props: [
      {
        name: "direction",
        type: '"horizontal" | "vertical"',
        defaultValue: "—",
        description: "Required panel group direction.",
      },
      {
        name: "withHandle",
        type: "boolean",
        defaultValue: "false",
        description: "Displays a visible grip on the separator.",
      },
      ...primitiveProps,
    ],
  },
  {
    slug: "menubar",
    name: "Menubar",
    description:
      "A desktop-style accessible menu bar with nested and selectable actions.",
    install: "menubar",
    client: true,
    code: `import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarShortcut, MenubarTrigger } from "@/components/ui/menubar"

<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>New tab <MenubarShortcut>⌘T</MenubarShortcut></MenubarItem>
      <MenubarItem>New window <MenubarShortcut>⌘N</MenubarShortcut></MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`,
    props: [
      {
        name: "value",
        type: "string",
        defaultValue: "—",
        description: "Controlled value of the open menu.",
      },
      {
        name: "loop",
        type: "boolean",
        defaultValue: "true",
        description: "Loops keyboard focus through menu triggers.",
      },
      ...primitiveProps,
    ],
  },
  {
    slug: "kbd",
    name: "Kbd",
    description:
      "Compact keyboard shortcut labels for commands and interface hints.",
    install: "kbd",
    client: false,
    code: `import { Kbd, KbdGroup } from "@/components/ui/kbd"

<KbdGroup>
  <Kbd>⌘</Kbd>
  <Kbd>K</Kbd>
</KbdGroup>`,
    props: primitiveProps,
  },
  {
    slug: "item",
    name: "Item",
    description:
      "A flexible content row for settings, resources and action lists.",
    install: "item",
    client: false,
    code: `import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item"

<Item variant="outline">
  <ItemMedia variant="icon">...</ItemMedia>
  <ItemContent>
    <ItemTitle>Design system</ItemTitle>
    <ItemDescription>Shared tokens and components.</ItemDescription>
  </ItemContent>
  <ItemActions>...</ItemActions>
</Item>`,
    props: [
      {
        name: "variant",
        type: '"default" | "outline" | "muted"',
        defaultValue: '"default"',
        description: "Visual surface treatment.",
      },
      {
        name: "size",
        type: '"default" | "sm"',
        defaultValue: '"default"',
        description: "Controls spacing and geometry.",
      },
      {
        name: "asChild",
        type: "boolean",
        defaultValue: "false",
        description: "Merges Item behavior onto its child.",
      },
      ...primitiveProps,
    ],
  },
  {
    slug: "sonner",
    name: "Toast / Sonner",
    description: "Polished toast notifications for transient feedback.",
    install: "sonner",
    client: true,
    code: `import { Toaster, toast } from "@/components/ui/sonner"

export function App() {
  return (
    <>
      <Toaster />
      <button onClick={() => toast.success("Published")}>Publish</button>
    </>
  )
}`,
    props: [
      {
        name: "position",
        type: "ToasterProps['position']",
        defaultValue: '"bottom-right"',
        description: "Viewport edge used for the toast stack.",
      },
      {
        name: "richColors",
        type: "boolean",
        defaultValue: "false",
        description: "Enables stronger semantic colors.",
      },
      ...primitiveProps,
    ],
  },
];

export function getComponentDoc(slug: string) {
  return componentDocs.find((component) => component.slug === slug);
}
