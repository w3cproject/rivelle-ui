"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  AlertCircle,
  ArrowUpRight,
  Bold,
  Check,
  ChevronDown,
  FolderPlus,
  Italic,
  Mail,
  MoreHorizontal,
  Settings,
  Sparkles,
  Trash2,
  Underline,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Calendar } from "@/components/ui/calendar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Combobox } from "@/components/ui/combobox";
import { MultiSelect } from "@/components/ui/multi-select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { Spinner } from "@/components/ui/spinner";
import { Toaster, toast } from "@/components/ui/sonner";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TagInput } from "@/components/ui/tag-input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DatePicker } from "@/components/ui/date-picker";
import { StylePreview } from "@/components/style-preview";
import { cn } from "@/lib/utils";

function CalendarPreview() {
  const [date, setDate] = useState<Date | undefined>(new Date(2026, 6, 15));
  return <Calendar mode="single" selected={date} onSelect={setDate} />;
}

function FormPreview() {
  const form = useForm<{ email: string }>({
    defaultValues: { email: "hello@rivelle.dev" },
  });

  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-md gap-5 rounded-2xl border border-foreground/10 bg-background/80 p-6"
        onSubmit={form.handleSubmit(() => undefined)}
      >
        <FormField
          control={form.control}
          name="email"
          rules={{ required: "Email is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Work email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormDescription>
                We will only send release notes.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Join waitlist</Button>
      </form>
    </Form>
  );
}

export function ComponentDocDemo({ slug }: { slug: string }) {
  return (
    <StylePreview
      canvasClassName="docs-demo-canvas showcase-grid"
      className={cn(
        "docs-demo",
        slug === "navigation-menu" && "docs-demo-navigation-menu",
      )}
    >
      {slug === "button" && (
        <div className="flex max-w-xl flex-wrap items-center justify-center gap-3">
          <Button>
            Create project <ArrowUpRight />
          </Button>
          <Button variant="signature">
            Rivelle signature <ArrowUpRight />
          </Button>
          <Button variant="prism">
            Prism action <ArrowUpRight />
          </Button>
          <Button variant="outline">Explore system</Button>
          <Button variant="secondary">Join waitlist</Button>
          <Button variant="ghost">Not now</Button>
        </div>
      )}
      {slug === "badge" && (
        <div className="flex flex-wrap justify-center gap-3">
          <Badge>
            <Sparkles /> New
          </Badge>
          <Badge variant="secondary">In progress</Badge>
          <Badge variant="success">
            <Check /> Ready
          </Badge>
          <Badge variant="outline">Draft</Badge>
        </div>
      )}
      {slug === "input" && (
        <div className="w-full max-w-sm space-y-5">
          <div className="grid gap-2">
            <Label
              className="text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase"
              htmlFor="rivelle-prism-email"
            >
              Prism surface
            </Label>
            <Input
              id="rivelle-prism-email"
              placeholder="studio@rivelle.dev"
              type="email"
              variant="prism"
            />
            <p className="text-xs text-muted-foreground">
              Crisp border, layered depth and a soft focus halo.
            </p>
          </div>
          <div className="grid gap-2">
            <Label
              className="text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase"
              htmlFor="rivelle-email"
            >
              Work email
            </Label>
            <Input
              id="rivelle-email"
              placeholder="you@example.com"
              type="email"
            />
            <p className="text-xs text-muted-foreground">
              Soft surface with an inset focus edge.
            </p>
          </div>
          <div className="grid gap-2">
            <Label
              className="text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase"
              htmlFor="rivelle-invalid"
            >
              Validation
            </Label>
            <Input
              aria-invalid
              defaultValue="rivelle / studio"
              id="rivelle-invalid"
            />
            <p className="text-xs text-destructive">
              Use letters, numbers and hyphens only.
            </p>
          </div>
        </div>
      )}
      {slug === "textarea" && (
        <Textarea
          className="max-w-md"
          placeholder="Tell us what you are building…"
        />
      )}
      {slug === "card" && (
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Project created</CardTitle>
            <CardDescription>Your new workspace is ready.</CardDescription>
          </CardHeader>
          <CardContent>
            <Separator />
          </CardContent>
          <CardFooter className="justify-between">
            <span className="text-sm text-muted-foreground">
              Updated just now
            </span>
            <Button size="sm">Open</Button>
          </CardFooter>
        </Card>
      )}
      {slug === "separator" && (
        <div className="w-full max-w-md">
          <p className="font-medium">Rivelle primitives</p>
          <p className="text-sm text-muted-foreground">
            Designed to be composed.
          </p>
          <Separator className="my-5" />
          <div className="flex h-5 items-center gap-4 text-sm">
            <span>Docs</span>
            <Separator orientation="vertical" />
            <span>Components</span>
            <Separator orientation="vertical" />
            <span>Registry</span>
          </div>
        </div>
      )}
      {slug === "switch" && (
        <div className="w-full max-w-sm space-y-4 rounded-xl border bg-background/85 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Product updates</p>
              <p className="text-xs text-muted-foreground">
                Occasional release notes.
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Usage insights</p>
              <p className="text-xs text-muted-foreground">A weekly digest.</p>
            </div>
            <Switch />
          </div>
        </div>
      )}
      {slug === "label" && (
        <div className="grid w-full max-w-sm gap-2">
          <Label htmlFor="demo-email">Email address</Label>
          <Input id="demo-email" placeholder="you@example.com" />
        </div>
      )}
      {slug === "checkbox" && (
        <div className="flex items-center gap-2 rounded-lg border bg-background p-4">
          <Checkbox defaultChecked id="demo-terms" />
          <Label htmlFor="demo-terms">Accept product updates</Label>
        </div>
      )}
      {slug === "radio-group" && (
        <RadioGroup
          className="w-full max-w-xs rounded-xl border bg-background p-5"
          defaultValue="comfortable"
        >
          {[
            ["compact", "Compact"],
            ["comfortable", "Comfortable"],
            ["spacious", "Spacious"],
          ].map(([value, label]) => (
            <div className="flex items-center gap-2" key={value}>
              <RadioGroupItem id={value} value={value} />
              <Label htmlFor={value}>{label}</Label>
            </div>
          ))}
        </RadioGroup>
      )}
      {slug === "select" && (
        <Select defaultValue="designer">
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Choose a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="designer">Designer</SelectItem>
            <SelectItem value="engineer">Engineer</SelectItem>
            <SelectItem value="founder">Founder</SelectItem>
          </SelectContent>
        </Select>
      )}
      {slug === "tabs" && (
        <Tabs className="w-full max-w-md" defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>
          <TabsContent
            className="rounded-xl border bg-background p-5 text-sm text-muted-foreground"
            value="overview"
          >
            Your project foundations are configured and ready.
          </TabsContent>
          <TabsContent
            className="rounded-xl border bg-background p-5 text-sm text-muted-foreground"
            value="activity"
          >
            No recent changes.
          </TabsContent>
        </Tabs>
      )}
      {slug === "alert" && (
        <Alert className="max-w-md">
          <AlertCircle />
          <AlertTitle>Theme updated</AlertTitle>
          <AlertDescription>
            Your semantic tokens are now synced with Rivelle.
          </AlertDescription>
        </Alert>
      )}
      {slug === "skeleton" && (
        <div className="flex w-full max-w-sm items-center gap-3">
          <Skeleton className="size-11 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-3 w-full" />
          </div>
        </div>
      )}
      {slug === "avatar" && (
        <div className="flex items-center -space-x-2">
          <Avatar className="size-12">
            <AvatarFallback>RV</AvatarFallback>
          </Avatar>
          <Avatar className="size-12">
            <AvatarFallback>UI</AvatarFallback>
          </Avatar>
          <Avatar className="size-12">
            <AvatarFallback>+4</AvatarFallback>
          </Avatar>
        </div>
      )}
      {slug === "tooltip" && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="outline">
                <Settings />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Project settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      {slug === "dialog" && (
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create project</DialogTitle>
              <DialogDescription>
                Give your new workspace a memorable name.
              </DialogDescription>
            </DialogHeader>
            <Input placeholder="Project name" />
            <Button>Create project</Button>
          </DialogContent>
        </Dialog>
      )}
      {slug === "sheet" && (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open sheet</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Project settings</SheetTitle>
              <SheetDescription>
                Adjust the details for this workspace.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-2">
              <Label htmlFor="sheet-name">Name</Label>
              <Input id="sheet-name" defaultValue="Rivelle" />
            </div>
          </SheetContent>
        </Sheet>
      )}
      {slug === "dropdown-menu" && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="outline">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Project</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit details</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      {slug === "popover" && (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Open popover</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="grid gap-2">
              <p className="font-medium">Dimensions</p>
              <p className="text-xs text-muted-foreground">
                Set the width of your component.
              </p>
              <Input defaultValue="320px" />
            </div>
          </PopoverContent>
        </Popover>
      )}
      {slug === "command" && (
        <Command className="w-full max-w-md border shadow-lg">
          <CommandInput placeholder="Search actions..." />
          <CommandList>
            <CommandEmpty>No actions found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>Open documentation</CommandItem>
              <CommandItem>Create component</CommandItem>
              <CommandItem>Change theme</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      )}
      {slug === "accordion" && (
        <Accordion
          className="w-full max-w-lg rounded-2xl border border-foreground/10 bg-background/80 px-5 shadow-sm"
          collapsible
          defaultValue="item-1"
          type="single"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>Is the source editable?</AccordionTrigger>
            <AccordionContent>
              Every component is installed directly into your project, so you
              can reshape every detail.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              Does it support Server Components?
            </AccordionTrigger>
            <AccordionContent>
              Display-only primitives stay server-safe. Client boundaries are
              added only where interaction needs them.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Can I override the styles?</AccordionTrigger>
            <AccordionContent>
              Yes. Public className values are merged last, keeping local
              ownership explicit.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
      {slug === "breadcrumb" && (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Workspace</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Components</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )}
      {slug === "collapsible" && (
        <Collapsible
          className="w-full max-w-sm rounded-2xl border bg-background p-4"
          defaultOpen
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold">Three active branches</p>
              <p className="text-xs text-muted-foreground">
                Updated a moment ago
              </p>
            </div>
            <CollapsibleTrigger asChild>
              <Button
                aria-label="Toggle branches"
                size="icon-sm"
                variant="ghost"
              >
                <ChevronDown />
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="pt-3">
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="rounded-xl bg-foreground/[.045] px-3 py-2">
                main
              </div>
              <div className="rounded-xl bg-foreground/[.045] px-3 py-2">
                feature/new-primitives
              </div>
              <div className="rounded-xl bg-foreground/[.045] px-3 py-2">
                docs/registry
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}
      {slug === "progress" && (
        <div className="w-full max-w-md space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Publishing registry</span>
            <span className="text-muted-foreground">72%</span>
          </div>
          <Progress value={72} />
        </div>
      )}
      {slug === "slider" && (
        <div className="w-full max-w-md space-y-4">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Interface density</span>
            <span className="text-muted-foreground">Comfortable</span>
          </div>
          <Slider defaultValue={[58]} max={100} step={1} />
        </div>
      )}
      {slug === "toggle" && (
        <div className="flex gap-2">
          <Toggle aria-label="Toggle bold" variant="outline">
            <Bold />
          </Toggle>
          <Toggle aria-label="Toggle italic" defaultPressed>
            <Italic />
          </Toggle>
        </div>
      )}
      {slug === "toggle-group" && (
        <ToggleGroup defaultValue={["bold"]} type="multiple" variant="outline">
          <ToggleGroupItem aria-label="Toggle bold" value="bold">
            <Bold />
          </ToggleGroupItem>
          <ToggleGroupItem aria-label="Toggle italic" value="italic">
            <Italic />
          </ToggleGroupItem>
          <ToggleGroupItem aria-label="Toggle underline" value="underline">
            <Underline />
          </ToggleGroupItem>
        </ToggleGroup>
      )}
      {slug === "hover-card" && (
        <HoverCard>
          <HoverCardTrigger asChild>
            <a
              className="text-sm font-semibold text-primary underline decoration-primary/30 underline-offset-4"
              href="#"
            >
              @rivelle/ui
            </a>
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="flex gap-3">
              <Avatar>
                <AvatarFallback>RV</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="font-semibold">Rivelle UI</p>
                <p className="text-sm leading-5 text-muted-foreground">
                  Editable React components for interfaces with a point of view.
                </p>
                <p className="pt-1 text-xs text-muted-foreground">
                  48 primitives · MIT licensed
                </p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      )}
      {slug === "context-menu" && (
        <ContextMenu>
          <ContextMenuTrigger className="grid h-44 w-full max-w-md place-items-center rounded-2xl border border-dashed border-foreground/18 bg-background/70 text-sm text-muted-foreground">
            Right-click this surface
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuLabel>Component</ContextMenuLabel>
            <ContextMenuItem>
              View source<ContextMenuShortcut>⌘S</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              Duplicate<ContextMenuShortcut>⌘D</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      )}
      {slug === "scroll-area" && (
        <ScrollArea className="h-56 w-full max-w-sm rounded-2xl border bg-background">
          <div className="p-4">
            <p className="mb-3 text-sm font-semibold">Release activity</p>
            {Array.from({ length: 12 }, (_, index) => (
              <div
                className="flex items-center justify-between border-b py-3 text-sm last:border-0"
                key={index}
              >
                <span>Component update #{12 - index}</span>
                <span className="text-xs text-muted-foreground">
                  {index + 1}h
                </span>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
      {slug === "aspect-ratio" && (
        <div className="w-full max-w-md overflow-hidden rounded-2xl border bg-background shadow-sm">
          <AspectRatio ratio={16 / 9}>
            <div className="flex size-full items-end bg-[radial-gradient(circle_at_20%_20%,color-mix(in_oklch,var(--primary)_35%,transparent),transparent_45%),linear-gradient(135deg,var(--foreground),color-mix(in_oklch,var(--foreground)_72%,var(--primary)))] p-6">
              <div>
                <Badge className="mb-2" variant="secondary">
                  16 / 9
                </Badge>
                <p className="text-lg font-semibold text-background">
                  Predictable media, every time.
                </p>
              </div>
            </div>
          </AspectRatio>
        </div>
      )}
      {slug === "alert-dialog" && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">
              <Trash2 /> Delete project
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete “Atlas”?</AlertDialogTitle>
              <AlertDialogDescription>
                This removes the project and all of its environments. This
                action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Keep project</AlertDialogCancel>
              <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Delete forever
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      {slug === "button-group" && (
        <div className="flex flex-col items-center gap-5">
          <ButtonGroup>
            <Button variant="outline">Month</Button>
            <Button variant="outline">Week</Button>
            <Button variant="outline">Day</Button>
          </ButtonGroup>
          <ButtonGroup orientation="vertical">
            <Button variant="outline">Move up</Button>
            <Button variant="outline">Move down</Button>
          </ButtonGroup>
        </div>
      )}
      {slug === "input-group" && (
        <div className="grid w-full max-w-md gap-4">
          <InputGroup>
            <InputGroupAddon>
              <Mail />
            </InputGroupAddon>
            <InputGroupInput placeholder="you@example.com" type="email" />
            <InputGroupAddon align="inline-end">
              <InputGroupText>Work</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
          <InputGroup>
            <InputGroupAddon align="block-start">
              <InputGroupText>rivelle.dev/</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput defaultValue="components/input-group" />
          </InputGroup>
        </div>
      )}
      {slug === "field" && (
        <div className="w-full max-w-md rounded-2xl border border-foreground/10 bg-background/80 p-6">
          <Field>
            <FieldLabel htmlFor="field-handle">Workspace handle</FieldLabel>
            <Input
              aria-invalid
              defaultValue="rivelle studio"
              id="field-handle"
            />
            <FieldDescription>
              Lowercase letters, numbers and hyphens. Used in your public URL.
            </FieldDescription>
            <FieldError>Spaces are not allowed.</FieldError>
          </Field>
        </div>
      )}
      {slug === "table" && (
        <div className="w-full max-w-2xl">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Requests</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                ["Rivelle", "Live", "84.2k"],
                ["Atlas", "Preview", "12.8k"],
                ["Orbit", "Draft", "—"],
              ].map(([project, status, requests]) => (
                <TableRow key={project}>
                  <TableCell>{project}</TableCell>
                  <TableCell>
                    <Badge
                      variant={status === "Live" ? "success" : "secondary"}
                    >
                      {status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {requests}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      {slug === "pagination" && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
      {slug === "empty" && (
        <Empty className="max-w-xl">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FolderPlus />
            </EmptyMedia>
            <EmptyTitle>No projects yet</EmptyTitle>
            <EmptyDescription>
              Create your first project and start composing an interface from
              Rivelle primitives.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button>
              Create project <ArrowUpRight />
            </Button>
            <Button variant="ghost">Import existing</Button>
          </EmptyContent>
        </Empty>
      )}
      {slug === "spinner" && (
        <div className="flex flex-wrap items-center gap-4">
          <Spinner />
          <Button disabled>
            <Spinner /> Publishing
          </Button>
          <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            <Spinner className="size-3.5" /> Syncing tokens
          </div>
        </div>
      )}
      {slug === "form" && <FormPreview />}
      {slug === "combobox" && (
        <div className="w-full max-w-sm">
          <Combobox
            defaultValue="next"
            options={[
              { value: "next", label: "Next.js" },
              { value: "vite", label: "Vite" },
              { value: "astro", label: "Astro" },
              { value: "remix", label: "Remix" },
            ]}
            placeholder="Select framework"
            searchPlaceholder="Search frameworks..."
          />
        </div>
      )}
      {slug === "tag-input" && (
        <div className="grid w-full max-w-lg gap-2.5">
          <Label htmlFor="technology-tags">Technology stack</Label>
          <TagInput
            defaultValue={["React", "TypeScript", "Tailwind CSS"]}
            id="technology-tags"
            maxTags={6}
            name="technologies"
            placeholder="Add technology..."
          />
          <p className="text-xs text-muted-foreground">
            Press Enter or comma to create a tag. Backspace removes the last
            one.
          </p>
        </div>
      )}
      {slug === "multi-select" && (
        <div className="grid w-full max-w-md gap-2.5">
          <Label>Project teams</Label>
          <MultiSelect
            defaultValue={["design", "engineering"]}
            maxSelected={4}
            options={[
              { value: "design", label: "Design" },
              { value: "engineering", label: "Engineering" },
              { value: "product", label: "Product" },
              { value: "marketing", label: "Marketing" },
              { value: "operations", label: "Operations" },
              { value: "archive", label: "Archived team", disabled: true },
            ]}
            placeholder="Select teams"
            searchPlaceholder="Search teams..."
          />
          <p className="text-xs text-muted-foreground">
            Search and select up to four teams.
          </p>
        </div>
      )}
      {slug === "calendar" && <CalendarPreview />}
      {slug === "date-picker" && (
        <div className="w-full max-w-sm">
          <DatePicker clearable defaultValue={new Date(2026, 6, 15)} />
        </div>
      )}
      {slug === "drawer" && (
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">Open drawer</Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-md">
              <DrawerHeader>
                <DrawerTitle>Publish component?</DrawerTitle>
                <DrawerDescription>
                  This will make the latest registry source publicly available.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <Button>Publish now</Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      )}
      {slug === "navigation-menu" && (
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Products</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[420px] grid-cols-2 gap-1 p-2">
                  {[
                    ["Components", "Editable interface primitives."],
                    ["Blocks", "Production-ready compositions."],
                    ["Themes", "Semantic design foundations."],
                    ["Templates", "Complete interfaces built with Rivelle."],
                  ].map(([title, description]) => (
                    <NavigationMenuLink href="#" key={title}>
                      <div className="font-semibold">{title}</div>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {description}
                      </p>
                    </NavigationMenuLink>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className="px-4 py-2 text-sm font-semibold"
                href="#"
              >
                Documentation
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )}
      {slug === "input-otp" && (
        <div className="grid gap-4 text-center">
          <InputOTP maxLength={6} defaultValue="240815">
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <p className="text-xs text-muted-foreground">
            Enter the code sent to your email.
          </p>
        </div>
      )}
      {slug === "carousel" && (
        <Carousel className="w-full max-w-xl">
          <CarouselContent>
            {["Foundations", "Components", "Blocks"].map((title, index) => (
              <CarouselItem className="basis-[86%] sm:basis-2/3" key={title}>
                <div className="grid h-56 content-between overflow-hidden rounded-3xl border border-foreground/10 bg-[radial-gradient(circle_at_top_right,color-mix(in_oklch,var(--primary)_20%,transparent),transparent_48%),var(--background)] p-6 shadow-[inset_0_1px_0_color-mix(in_oklch,var(--background)_75%,transparent)]">
                  <Badge className="w-fit" variant="secondary">
                    0{index + 1}
                  </Badge>
                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Editable pieces, composed with Rivelle.
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
      {slug === "resizable" && (
        <div className="h-64 w-full max-w-2xl overflow-hidden rounded-3xl border border-foreground/10 bg-background">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={34} minSize={22}>
              <div className="flex h-full flex-col gap-2 bg-foreground/[.025] p-5">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Workspace
                </span>
                {["Components", "Blocks", "Themes"].map((label) => (
                  <div
                    className="rounded-xl px-3 py-2 text-sm font-medium first:bg-primary/10 first:text-primary"
                    key={label}
                  >
                    {label}
                  </div>
                ))}
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={66}>
              <div className="grid h-full place-items-center p-6 text-center">
                <div>
                  <Sparkles className="mx-auto mb-3 size-6 text-primary" />
                  <p className="font-semibold">Drag the handle</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Resize both panels with pointer or keyboard.
                  </p>
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      )}
      {slug === "menubar" && (
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                New component <MenubarShortcut>⌘N</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                Open registry <MenubarShortcut>⌘O</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
                Publish <MenubarShortcut>⌘P</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Edit</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                Undo <MenubarShortcut>⌘Z</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>View</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Toggle preview</MenubarItem>
              <MenubarItem>Open source</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      )}
      {slug === "kbd" && (
        <div className="flex flex-wrap items-center gap-5 rounded-2xl border border-foreground/10 bg-background/70 px-5 py-4 text-sm">
          <span className="font-medium">Open command menu</span>
          <KbdGroup>
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </KbdGroup>
          <span className="text-muted-foreground">or</span>
          <Kbd>/</Kbd>
        </div>
      )}
      {slug === "item" && (
        <ItemGroup className="w-full max-w-xl">
          <Item variant="outline">
            <ItemMedia variant="icon">
              <Sparkles />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Component registry</ItemTitle>
              <ItemDescription>
                Publish editable primitives to every project.
              </ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button size="sm" variant="outline">
                Open
              </Button>
            </ItemActions>
          </Item>
          <Item variant="muted">
            <ItemMedia variant="icon">
              <Settings />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Theme settings</ItemTitle>
              <ItemDescription>
                Adjust color, radius and typography tokens.
              </ItemDescription>
            </ItemContent>
            <ItemActions>
              <Badge variant="secondary">Ready</Badge>
            </ItemActions>
          </Item>
        </ItemGroup>
      )}
      {slug === "sonner" && (
        <div className="flex flex-wrap gap-3">
          <Toaster position="bottom-right" />
          <Button
            onClick={() =>
              toast.success("Component published", {
                description: "The registry is ready to install.",
              })
            }
          >
            Show toast
          </Button>
          <Button
            onClick={() =>
              toast("Draft saved", {
                description: "Your local changes are safe.",
              })
            }
            variant="outline"
          >
            Show neutral
          </Button>
        </div>
      )}
    </StylePreview>
  );
}
