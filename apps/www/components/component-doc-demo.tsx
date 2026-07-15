import { AlertCircle, ArrowUpRight, Check, MoreHorizontal, Settings, Sparkles } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function ComponentDocDemo({ slug }: { slug: string }) {
  return (
    <div className="docs-demo showcase-grid">
      {slug === "button" && <div className="flex max-w-xl flex-wrap items-center justify-center gap-3"><Button>Create project <ArrowUpRight /></Button><Button variant="signature">Rivelle signature <ArrowUpRight /></Button><Button variant="outline">Explore system</Button><Button variant="secondary">Join waitlist</Button><Button variant="ghost">Not now</Button></div>}
      {slug === "badge" && <div className="flex flex-wrap justify-center gap-3"><Badge><Sparkles /> New</Badge><Badge variant="secondary">In progress</Badge><Badge variant="success"><Check /> Ready</Badge><Badge variant="outline">Draft</Badge></div>}
      {slug === "input" && <div className="w-full max-w-sm space-y-5"><div className="grid gap-2"><Label className="text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase" htmlFor="rivelle-email">Work email</Label><Input id="rivelle-email" placeholder="you@example.com" type="email" /><p className="text-xs text-muted-foreground">Soft surface with an inset focus edge.</p></div><div className="grid gap-2"><Label className="text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase" htmlFor="rivelle-invalid">Validation</Label><Input aria-invalid defaultValue="rivelle / studio" id="rivelle-invalid" /><p className="text-xs text-destructive">Use letters, numbers and hyphens only.</p></div></div>}
      {slug === "textarea" && <Textarea className="max-w-md" placeholder="Tell us what you are building…" />}
      {slug === "card" && <Card className="w-full max-w-md"><CardHeader><CardTitle>Project created</CardTitle><CardDescription>Your new workspace is ready.</CardDescription></CardHeader><CardContent><Separator /></CardContent><CardFooter className="justify-between"><span className="text-sm text-muted-foreground">Updated just now</span><Button size="sm">Open</Button></CardFooter></Card>}
      {slug === "separator" && <div className="w-full max-w-md"><p className="font-medium">Rivelle primitives</p><p className="text-sm text-muted-foreground">Designed to be composed.</p><Separator className="my-5" /><div className="flex h-5 items-center gap-4 text-sm"><span>Docs</span><Separator orientation="vertical" /><span>Components</span><Separator orientation="vertical" /><span>Registry</span></div></div>}
      {slug === "switch" && <div className="w-full max-w-sm space-y-4 rounded-xl border bg-background/85 p-5 shadow-sm"><div className="flex items-center justify-between"><div><p className="text-sm font-medium">Product updates</p><p className="text-xs text-muted-foreground">Occasional release notes.</p></div><Switch defaultChecked /></div><Separator /><div className="flex items-center justify-between"><div><p className="text-sm font-medium">Usage insights</p><p className="text-xs text-muted-foreground">A weekly digest.</p></div><Switch /></div></div>}
      {slug === "label" && <div className="grid w-full max-w-sm gap-2"><Label htmlFor="demo-email">Email address</Label><Input id="demo-email" placeholder="you@example.com" /></div>}
      {slug === "checkbox" && <div className="flex items-center gap-2 rounded-lg border bg-background p-4"><Checkbox defaultChecked id="demo-terms" /><Label htmlFor="demo-terms">Accept product updates</Label></div>}
      {slug === "radio-group" && <RadioGroup className="w-full max-w-xs rounded-xl border bg-background p-5" defaultValue="comfortable">{[["compact","Compact"],["comfortable","Comfortable"],["spacious","Spacious"]].map(([value,label]) => <div className="flex items-center gap-2" key={value}><RadioGroupItem id={value} value={value} /><Label htmlFor={value}>{label}</Label></div>)}</RadioGroup>}
      {slug === "select" && <Select defaultValue="designer"><SelectTrigger className="w-64"><SelectValue placeholder="Choose a role" /></SelectTrigger><SelectContent><SelectItem value="designer">Designer</SelectItem><SelectItem value="engineer">Engineer</SelectItem><SelectItem value="founder">Founder</SelectItem></SelectContent></Select>}
      {slug === "tabs" && <Tabs className="w-full max-w-md" defaultValue="overview"><TabsList><TabsTrigger value="overview">Overview</TabsTrigger><TabsTrigger value="activity">Activity</TabsTrigger></TabsList><TabsContent className="rounded-xl border bg-background p-5 text-sm text-muted-foreground" value="overview">Your project foundations are configured and ready.</TabsContent><TabsContent className="rounded-xl border bg-background p-5 text-sm text-muted-foreground" value="activity">No recent changes.</TabsContent></Tabs>}
      {slug === "alert" && <Alert className="max-w-md"><AlertCircle /><AlertTitle>Theme updated</AlertTitle><AlertDescription>Your semantic tokens are now synced with Rivelle.</AlertDescription></Alert>}
      {slug === "skeleton" && <div className="flex w-full max-w-sm items-center gap-3"><Skeleton className="size-11 rounded-full" /><div className="flex-1 space-y-2"><Skeleton className="h-3 w-1/2" /><Skeleton className="h-3 w-full" /></div></div>}
      {slug === "avatar" && <div className="flex items-center -space-x-2"><Avatar className="size-12"><AvatarFallback>RV</AvatarFallback></Avatar><Avatar className="size-12"><AvatarFallback>UI</AvatarFallback></Avatar><Avatar className="size-12"><AvatarFallback>+4</AvatarFallback></Avatar></div>}
      {slug === "tooltip" && <TooltipProvider><Tooltip><TooltipTrigger asChild><Button size="icon" variant="outline"><Settings /></Button></TooltipTrigger><TooltipContent>Project settings</TooltipContent></Tooltip></TooltipProvider>}
      {slug === "dialog" && <Dialog><DialogTrigger asChild><Button>Open dialog</Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Create project</DialogTitle><DialogDescription>Give your new workspace a memorable name.</DialogDescription></DialogHeader><Input placeholder="Project name" /><Button>Create project</Button></DialogContent></Dialog>}
      {slug === "sheet" && <Sheet><SheetTrigger asChild><Button variant="outline">Open sheet</Button></SheetTrigger><SheetContent><SheetHeader><SheetTitle>Project settings</SheetTitle><SheetDescription>Adjust the details for this workspace.</SheetDescription></SheetHeader><div className="grid gap-2"><Label htmlFor="sheet-name">Name</Label><Input id="sheet-name" defaultValue="Rivelle" /></div></SheetContent></Sheet>}
      {slug === "dropdown-menu" && <DropdownMenu><DropdownMenuTrigger asChild><Button size="icon" variant="outline"><MoreHorizontal /></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuLabel>Project</DropdownMenuLabel><DropdownMenuSeparator /><DropdownMenuItem>Edit details</DropdownMenuItem><DropdownMenuItem>Duplicate</DropdownMenuItem><DropdownMenuItem variant="destructive">Delete</DropdownMenuItem></DropdownMenuContent></DropdownMenu>}
      {slug === "popover" && <Popover><PopoverTrigger asChild><Button variant="outline">Open popover</Button></PopoverTrigger><PopoverContent><div className="grid gap-2"><p className="font-medium">Dimensions</p><p className="text-xs text-muted-foreground">Set the width of your component.</p><Input defaultValue="320px" /></div></PopoverContent></Popover>}
      {slug === "command" && <Command className="w-full max-w-md border shadow-lg"><CommandInput placeholder="Search actions..." /><CommandList><CommandEmpty>No actions found.</CommandEmpty><CommandGroup heading="Suggestions"><CommandItem>Open documentation</CommandItem><CommandItem>Create component</CommandItem><CommandItem>Change theme</CommandItem></CommandGroup></CommandList></Command>}
    </div>
  )
}
