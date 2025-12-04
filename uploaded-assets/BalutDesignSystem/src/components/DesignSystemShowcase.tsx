import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { Switch } from "./ui/switch";
import { Slider } from "./ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Progress } from "./ui/progress";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { AspectRatio } from "./ui/aspect-ratio";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./ui/breadcrumb";
import { Calendar } from "./ui/calendar";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "./ui/command";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger, ContextMenuSeparator, ContextMenuCheckboxItem, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger } from "./ui/context-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from "./ui/dropdown-menu";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "./ui/input-otp";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger, MenubarCheckboxItem, MenubarRadioGroup, MenubarRadioItem, MenubarSub, MenubarSubContent, MenubarSubTrigger } from "./ui/menubar";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "./ui/navigation-menu";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./ui/resizable";
import { ScrollArea } from "./ui/scroll-area";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Skeleton } from "./ui/skeleton";
import { Textarea } from "./ui/textarea";
import { Toggle } from "./ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { toast } from "sonner";
import { Toaster } from "./ui/sonner";
import { 
  AlertCircle, 
  Info, 
  CheckCircle2, 
  Palette, 
  Type, 
  Layout, 
  Zap,
  Home,
  Settings,
  User,
  Mail,
  Calendar as CalendarIcon,
  Search,
  Bell,
  Download,
  Upload,
  Trash2,
  Edit,
  Share2,
  Copy,
  ChevronDown,
  ChevronRight,
  Plus,
  Minus,
  X,
  Menu,
  MoreHorizontal,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link,
  Image,
  Code,
  Heart,
  Star,
  Bookmark,
  MessageSquare,
  ThumbsUp,
  Eye,
  Filter,
  SortAsc,
  PlayCircle,
  PauseCircle,
  Volume2,
  FileText,
  Folder,
  Clock,
  MapPin,
  Phone,
  CreditCard,
  ShoppingCart,
  Package
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function DesignSystemShowcase() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-grey-50">
      <Toaster />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-grey-900 via-grey-800 to-grey-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="w-2 h-2 bg-grey-400 rounded-full"></div>
          </div>
          <h1 className="mb-6 max-w-3xl">Complete Design System</h1>
          <p className="text-xl text-grey-300 max-w-2xl mb-8">
            Every UI component styled with grey foundations, blue interactions, and vibrant orange accents.
          </p>
          <div className="flex gap-4">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="border-grey-600 text-white hover:bg-grey-800">
              View Documentation
            </Button>
          </div>
        </div>
      </section>

      {/* Color Palette Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center gap-3 mb-8">
          <Palette className="w-8 h-8 text-orange-500" />
          <h2>Color Palette</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Grey - Primary */}
          <div>
            <h3 className="mb-4 text-grey-700">Primary - Grey</h3>
            <div className="space-y-2">
              {[
                { name: 'Grey 50', value: '#f9fafb', class: 'bg-grey-50 border border-grey-200' },
                { name: 'Grey 100', value: '#f3f4f6', class: 'bg-grey-100' },
                { name: 'Grey 300', value: '#d1d5db', class: 'bg-grey-300' },
                { name: 'Grey 500', value: '#6b7280', class: 'bg-grey-500' },
                { name: 'Grey 700', value: '#374151', class: 'bg-grey-700' },
                { name: 'Grey 900', value: '#111827', class: 'bg-grey-900' },
              ].map(color => (
                <div key={color.name} className="flex items-center gap-3">
                  <div className={`w-20 h-12 ${color.class} rounded`}></div>
                  <div>
                    <p className="text-sm">{color.name}</p>
                    <code className="text-xs text-grey-500">{color.value}</code>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Blue - Secondary */}
          <div>
            <h3 className="mb-4 text-blue-700">Secondary - Blue</h3>
            <div className="space-y-2">
              {[
                { name: 'Blue 100', value: '#dbeafe', class: 'bg-blue-100' },
                { name: 'Blue 300', value: '#93c5fd', class: 'bg-blue-300' },
                { name: 'Blue 500', value: '#3b82f6', class: 'bg-blue-500' },
                { name: 'Blue 700', value: '#1d4ed8', class: 'bg-blue-700' },
                { name: 'Blue 900', value: '#1e3a8a', class: 'bg-blue-900' },
              ].map(color => (
                <div key={color.name} className="flex items-center gap-3">
                  <div className={`w-20 h-12 ${color.class} rounded`}></div>
                  <div>
                    <p className="text-sm">{color.name}</p>
                    <code className="text-xs text-grey-500">{color.value}</code>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Orange - Accent */}
          <div>
            <h3 className="mb-4 text-orange-700">Accent - Orange</h3>
            <div className="space-y-2">
              {[
                { name: 'Orange 100', value: '#ffedd5', class: 'bg-orange-100' },
                { name: 'Orange 300', value: '#fdba74', class: 'bg-orange-300' },
                { name: 'Orange 500', value: '#f97316', class: 'bg-orange-500' },
                { name: 'Orange 700', value: '#c2410c', class: 'bg-orange-700' },
                { name: 'Orange 900', value: '#7c2d12', class: 'bg-orange-900' },
              ].map(color => (
                <div key={color.name} className="flex items-center gap-3">
                  <div className={`w-20 h-12 ${color.class} rounded`}></div>
                  <div>
                    <p className="text-sm">{color.name}</p>
                    <code className="text-xs text-grey-500">{color.value}</code>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Accent Colors */}
        <div className="bg-white p-8 rounded-lg border border-grey-200">
          <h3 className="mb-6">Supporting Colors</h3>
          <div className="flex gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-black rounded-lg shadow-sm"></div>
              <div>
                <p>Black</p>
                <code className="text-xs text-grey-500">#000000</code>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-white border border-grey-300 rounded-lg shadow-sm"></div>
              <div>
                <p>White</p>
                <code className="text-xs text-grey-500">#ffffff</code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Typography Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <Type className="w-8 h-8 text-blue-500" />
            <h2>Typography</h2>
          </div>

          <div className="space-y-6">
            <div className="border-l-4 border-grey-900 pl-6">
              <h1 className="mb-2">Heading 1 - The quick brown fox jumps over the lazy dog</h1>
              <p className="text-sm text-grey-500">Font size: 2xl · Weight: Medium · Line height: 1.5</p>
            </div>
            
            <div className="border-l-4 border-grey-700 pl-6">
              <h2 className="mb-2">Heading 2 - The quick brown fox jumps over the lazy dog</h2>
              <p className="text-sm text-grey-500">Font size: xl · Weight: Medium · Line height: 1.5</p>
            </div>
            
            <div className="border-l-4 border-grey-500 pl-6">
              <h3 className="mb-2">Heading 3 - The quick brown fox jumps over the lazy dog</h3>
              <p className="text-sm text-grey-500">Font size: lg · Weight: Medium · Line height: 1.5</p>
            </div>
            
            <div className="border-l-4 border-grey-400 pl-6">
              <h4 className="mb-2">Heading 4 - The quick brown fox jumps over the lazy dog</h4>
              <p className="text-sm text-grey-500">Font size: base · Weight: Medium · Line height: 1.5</p>
            </div>
            
            <div className="border-l-4 border-orange-500 pl-6">
              <p className="mb-2">Body Text - The quick brown fox jumps over the lazy dog. This is a sample paragraph demonstrating body text styling with proper line height and spacing for optimal readability.</p>
              <p className="text-sm text-grey-500">Font size: base · Weight: Normal · Line height: 1.5</p>
            </div>
          </div>
        </div>
      </section>

      {/* Components Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center gap-3 mb-8">
          <Layout className="w-8 h-8 text-orange-500" />
          <h2>UI Components</h2>
        </div>

        <Tabs defaultValue="buttons" className="w-full">
          <TabsList className="mb-8 flex-wrap h-auto">
            <TabsTrigger value="buttons">Buttons</TabsTrigger>
            <TabsTrigger value="inputs">Inputs</TabsTrigger>
            <TabsTrigger value="forms">Forms</TabsTrigger>
            <TabsTrigger value="navigation">Navigation</TabsTrigger>
            <TabsTrigger value="overlays">Overlays</TabsTrigger>
            <TabsTrigger value="data">Data Display</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
            <TabsTrigger value="layout">Layout</TabsTrigger>
          </TabsList>

          {/* Buttons Tab */}
          <TabsContent value="buttons" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Button Variants & Sizes</CardTitle>
                <CardDescription>All button styles available in the design system</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="mb-4 text-grey-600">Primary (Grey)</h4>
                  <div className="flex flex-wrap gap-3">
                    <Button>Default</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                    <Button disabled>Disabled</Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="mb-4 text-grey-600">Secondary (Blue)</h4>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="secondary">Secondary</Button>
                    <Button className="bg-blue-500 hover:bg-blue-600">Blue Primary</Button>
                    <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50">
                      Blue Outline
                    </Button>
                    <Button variant="ghost" className="text-blue-500 hover:bg-blue-50 hover:text-blue-600">
                      Blue Ghost
                    </Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="mb-4 text-grey-600">Accent (Orange)</h4>
                  <div className="flex flex-wrap gap-3">
                    <Button className="bg-orange-500 hover:bg-orange-600">Orange Primary</Button>
                    <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50">
                      Orange Outline
                    </Button>
                    <Button variant="ghost" className="text-orange-500 hover:bg-orange-50 hover:text-orange-600">
                      Orange Ghost
                    </Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="mb-4 text-grey-600">Black & White</h4>
                  <div className="flex flex-wrap gap-3">
                    <Button className="bg-black hover:bg-grey-900">Black</Button>
                    <Button variant="outline" className="border-black text-black hover:bg-grey-50">
                      Black Outline
                    </Button>
                    <Button className="bg-white text-grey-900 border border-grey-200 hover:bg-grey-50">
                      White
                    </Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="mb-4 text-grey-600">Sizes</h4>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                    <Button size="icon">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button size="icon" className="bg-orange-500 hover:bg-orange-600">
                      <Star className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="mb-4 text-grey-600">With Icons</h4>
                  <div className="flex flex-wrap gap-3">
                    <Button>
                      <Mail className="mr-2 h-4 w-4" />
                      Email
                    </Button>
                    <Button className="bg-blue-500 hover:bg-blue-600">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                    <Button variant="outline">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload
                    </Button>
                    <Button variant="destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="mb-4 text-grey-600">Toggle Buttons</h4>
                  <div className="flex flex-wrap gap-3">
                    <Toggle aria-label="Toggle bold">
                      <Bold className="h-4 w-4" />
                    </Toggle>
                    <Toggle aria-label="Toggle italic">
                      <Italic className="h-4 w-4" />
                    </Toggle>
                    <Toggle aria-label="Toggle underline">
                      <Underline className="h-4 w-4" />
                    </Toggle>
                  </div>
                  <div className="mt-4">
                    <ToggleGroup type="single" defaultValue="left">
                      <ToggleGroupItem value="left" aria-label="Align left">
                        <AlignLeft className="h-4 w-4" />
                      </ToggleGroupItem>
                      <ToggleGroupItem value="center" aria-label="Align center">
                        <AlignCenter className="h-4 w-4" />
                      </ToggleGroupItem>
                      <ToggleGroupItem value="right" aria-label="Align right">
                        <AlignRight className="h-4 w-4" />
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Inputs Tab */}
          <TabsContent value="inputs" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Text Inputs</CardTitle>
                <CardDescription>Various input field types and styles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="default-input">Default Input</Label>
                    <Input id="default-input" placeholder="Enter text..." />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email-input">Email Input</Label>
                    <Input id="email-input" type="email" placeholder="email@example.com" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password-input">Password Input</Label>
                    <Input id="password-input" type="password" placeholder="••••••••" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="number-input">Number Input</Label>
                    <Input id="number-input" type="number" placeholder="123" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="disabled-input">Disabled Input</Label>
                    <Input id="disabled-input" disabled placeholder="Disabled" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="with-icon">Input with Icon</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-grey-400" />
                      <Input id="with-icon" className="pl-10" placeholder="Search..." />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="textarea">Textarea</Label>
                  <Textarea id="textarea" placeholder="Enter your message here..." rows={4} />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Input OTP</Label>
                  <InputOTP maxLength={6}>
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
                  <p className="text-sm text-grey-500">Enter the 6-digit code</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Forms Tab */}
          <TabsContent value="forms" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Form Controls</CardTitle>
                <CardDescription>Selects, checkboxes, radios, switches, and sliders</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="select-country">Select</Label>
                    <Select>
                      <SelectTrigger id="select-country">
                        <SelectValue placeholder="Select a country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="au">Australia</SelectItem>
                        <SelectItem value="de">Germany</SelectItem>
                        <SelectItem value="fr">France</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Date Picker</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? date.toLocaleDateString() : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label>Checkboxes</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <label htmlFor="terms" className="text-sm">
                        I agree to the terms and conditions
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="marketing" defaultChecked />
                      <label htmlFor="marketing" className="text-sm">
                        Send me marketing emails
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="disabled-checkbox" disabled />
                      <label htmlFor="disabled-checkbox" className="text-sm text-grey-400">
                        Disabled checkbox
                      </label>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label>Radio Group</Label>
                  <RadioGroup defaultValue="email">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="email" id="radio-email" />
                      <Label htmlFor="radio-email">Email</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sms" id="radio-sms" />
                      <Label htmlFor="radio-sms">SMS</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="push" id="radio-push" />
                      <Label htmlFor="radio-push">Push Notification</Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="airplane-mode" />
                    <Label htmlFor="airplane-mode">Airplane Mode</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="notifications" defaultChecked />
                    <Label htmlFor="notifications">Enable Notifications</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="disabled-switch" disabled />
                    <Label htmlFor="disabled-switch">Disabled Switch</Label>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Volume</Label>
                      <span className="text-sm text-grey-500">50%</span>
                    </div>
                    <Slider defaultValue={[50]} max={100} step={1} />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Brightness</Label>
                      <span className="text-sm text-grey-500">75%</span>
                    </div>
                    <Slider defaultValue={[75]} max={100} step={1} className="[&>span]:bg-blue-500" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Range</Label>
                      <span className="text-sm text-grey-500">25-75</span>
                    </div>
                    <Slider defaultValue={[25, 75]} max={100} step={1} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Navigation Tab */}
          <TabsContent value="navigation" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Breadcrumbs</CardTitle>
                <CardDescription>Navigation breadcrumb component</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/components">Components</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Navigation Menu</CardTitle>
                <CardDescription>Horizontal navigation with dropdowns</CardDescription>
              </CardHeader>
              <CardContent>
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid gap-3 p-6 w-[400px]">
                          <NavigationMenuLink className="block p-3 rounded-lg hover:bg-grey-100">
                            <div className="font-medium mb-1">Introduction</div>
                            <p className="text-sm text-grey-500">
                              Learn about the design system
                            </p>
                          </NavigationMenuLink>
                          <NavigationMenuLink className="block p-3 rounded-lg hover:bg-grey-100">
                            <div className="font-medium mb-1">Installation</div>
                            <p className="text-sm text-grey-500">
                              How to install and set up
                            </p>
                          </NavigationMenuLink>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid gap-3 p-6 w-[400px]">
                          <NavigationMenuLink className="block p-3 rounded-lg hover:bg-grey-100">
                            <div className="font-medium mb-1">Buttons</div>
                            <p className="text-sm text-grey-500">
                              Button components and variants
                            </p>
                          </NavigationMenuLink>
                          <NavigationMenuLink className="block p-3 rounded-lg hover:bg-grey-100">
                            <div className="font-medium mb-1">Forms</div>
                            <p className="text-sm text-grey-500">
                              Form inputs and controls
                            </p>
                          </NavigationMenuLink>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Menubar</CardTitle>
                <CardDescription>Application menu bar</CardDescription>
              </CardHeader>
              <CardContent>
                <Menubar>
                  <MenubarMenu>
                    <MenubarTrigger>File</MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem>
                        New <span className="ml-auto text-xs text-grey-500">⌘N</span>
                      </MenubarItem>
                      <MenubarItem>
                        Open <span className="ml-auto text-xs text-grey-500">⌘O</span>
                      </MenubarItem>
                      <MenubarSeparator />
                      <MenubarItem>
                        Save <span className="ml-auto text-xs text-grey-500">⌘S</span>
                      </MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                  <MenubarMenu>
                    <MenubarTrigger>Edit</MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem>Undo</MenubarItem>
                      <MenubarItem>Redo</MenubarItem>
                      <MenubarSeparator />
                      <MenubarItem>Cut</MenubarItem>
                      <MenubarItem>Copy</MenubarItem>
                      <MenubarItem>Paste</MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                  <MenubarMenu>
                    <MenubarTrigger>View</MenubarTrigger>
                    <MenubarContent>
                      <MenubarCheckboxItem checked>Status Bar</MenubarCheckboxItem>
                      <MenubarCheckboxItem>Activity Bar</MenubarCheckboxItem>
                      <MenubarSeparator />
                      <MenubarItem>Zoom In</MenubarItem>
                      <MenubarItem>Zoom Out</MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dropdown Menu</CardTitle>
                <CardDescription>Dropdown menus with various options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        Options <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Mail className="mr-2 h-4 w-4" />
                        Messages
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="bg-blue-500 hover:bg-blue-600">
                        Actions <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="mr-2 h-4 w-4" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Context Menu</CardTitle>
                <CardDescription>Right-click to open context menu</CardDescription>
              </CardHeader>
              <CardContent>
                <ContextMenu>
                  <ContextMenuTrigger className="flex h-[150px] w-full items-center justify-center rounded-lg border border-dashed border-grey-300 bg-grey-50">
                    <p className="text-sm text-grey-500">Right click here</p>
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <ContextMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </ContextMenuItem>
                    <ContextMenuItem>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </ContextMenuItem>
                    <ContextMenuItem>
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pagination</CardTitle>
                <CardDescription>Page navigation controls</CardDescription>
              </CardHeader>
              <CardContent>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">10</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Command Menu</CardTitle>
                <CardDescription>Keyboard accessible command palette</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => setOpen(true)} variant="outline" className="w-full justify-start">
                  <Search className="mr-2 h-4 w-4" />
                  Search commands...
                  <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-grey-100 px-1.5 text-xs">
                    <span className="text-xs">⌘</span>K
                  </kbd>
                </Button>
                <CommandDialog open={open} onOpenChange={setOpen}>
                  <CommandInput placeholder="Type a command or search..." />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                      <CommandItem>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        <span>Calendar</span>
                      </CommandItem>
                      <CommandItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </CommandItem>
                      <CommandItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Actions">
                      <CommandItem>
                        <Mail className="mr-2 h-4 w-4" />
                        <span>Send Email</span>
                      </CommandItem>
                      <CommandItem>
                        <Download className="mr-2 h-4 w-4" />
                        <span>Download</span>
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </CommandDialog>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Overlays Tab */}
          <TabsContent value="overlays" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Dialog</CardTitle>
                <CardDescription>Modal dialogs for important information</CardDescription>
              </CardHeader>
              <CardContent className="flex gap-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Open Dialog</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Profile</DialogTitle>
                      <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" defaultValue="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" defaultValue="@johndoe" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" className="bg-blue-500 hover:bg-blue-600">Save changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete Account</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction className="bg-red-500 hover:bg-red-600">
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sheet (Side Panel)</CardTitle>
                <CardDescription>Slide-out panels from different sides</CardDescription>
              </CardHeader>
              <CardContent className="flex gap-4">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline">Open Right</Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Edit Profile</SheetTitle>
                      <SheetDescription>
                        Make changes to your profile here. Click save when you're done.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="sheet-name">Name</Label>
                        <Input id="sheet-name" defaultValue="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sheet-email">Email</Label>
                        <Input id="sheet-email" type="email" defaultValue="john@example.com" />
                      </div>
                    </div>
                    <SheetFooter>
                      <SheetClose asChild>
                        <Button type="submit" className="bg-blue-500 hover:bg-blue-600">Save changes</Button>
                      </SheetClose>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>

                <Sheet>
                  <SheetTrigger asChild>
                    <Button>Open Left</Button>
                  </SheetTrigger>
                  <SheetContent side="left">
                    <SheetHeader>
                      <SheetTitle>Navigation</SheetTitle>
                      <SheetDescription>
                        Navigate to different sections
                      </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-2 py-4">
                      <Button variant="ghost" className="justify-start">
                        <Home className="mr-2 h-4 w-4" />
                        Home
                      </Button>
                      <Button variant="ghost" className="justify-start">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Button>
                      <Button variant="ghost" className="justify-start">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Button>
                    </div>
                  </SheetContent>
                </Sheet>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Drawer</CardTitle>
                <CardDescription>Bottom drawer for mobile-friendly interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button variant="outline">Open Drawer</Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>Move to Archive</DrawerTitle>
                      <DrawerDescription>
                        Are you sure you want to archive this item?
                      </DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4">
                      <p className="text-sm text-grey-600">
                        This item will be moved to the archive and can be restored later.
                      </p>
                    </div>
                    <DrawerFooter>
                      <Button className="bg-blue-500 hover:bg-blue-600">Archive</Button>
                      <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Popover</CardTitle>
                <CardDescription>Floating popovers for additional content</CardDescription>
              </CardHeader>
              <CardContent className="flex gap-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">Open Popover</Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-2">
                      <h4>Dimensions</h4>
                      <p className="text-sm text-grey-500">
                        Set the dimensions for the layer.
                      </p>
                      <div className="grid gap-2">
                        <div className="grid grid-cols-3 items-center gap-4">
                          <Label htmlFor="width">Width</Label>
                          <Input id="width" defaultValue="100%" className="col-span-2 h-8" />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <Label htmlFor="height">Height</Label>
                          <Input id="height" defaultValue="25px" className="col-span-2 h-8" />
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">Hover for Tooltip</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>This is a helpful tooltip</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant="link">@username</Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="flex justify-between space-x-4">
                      <Avatar>
                        <AvatarFallback>UN</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h4>@username</h4>
                        <p className="text-sm text-grey-500">
                          The React Framework for the Web – Used by some of the world's largest companies.
                        </p>
                        <div className="flex items-center pt-2">
                          <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
                          <span className="text-xs text-grey-500">Joined December 2021</span>
                        </div>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Toast Notifications</CardTitle>
                <CardDescription>Show toast notifications</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                <Button onClick={() => toast("Event has been created")} variant="outline">
                  Default Toast
                </Button>
                <Button onClick={() => toast.success("Changes saved successfully")} className="bg-green-500 hover:bg-green-600">
                  Success Toast
                </Button>
                <Button onClick={() => toast.error("Something went wrong")} variant="destructive">
                  Error Toast
                </Button>
                <Button onClick={() => toast.info("New update available")} className="bg-blue-500 hover:bg-blue-600">
                  Info Toast
                </Button>
                <Button onClick={() => toast.warning("Please review your changes")} className="bg-orange-500 hover:bg-orange-600">
                  Warning Toast
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Data Display Tab */}
          <TabsContent value="data" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Tables</CardTitle>
                <CardDescription>Data tables with various styles</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableCaption>A list of recent transactions</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>INV001</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">Paid</Badge>
                      </TableCell>
                      <TableCell>Credit Card</TableCell>
                      <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>INV002</TableCell>
                      <TableCell>
                        <Badge className="bg-orange-500">Pending</Badge>
                      </TableCell>
                      <TableCell>PayPal</TableCell>
                      <TableCell className="text-right">$150.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>INV003</TableCell>
                      <TableCell>
                        <Badge variant="secondary">Unpaid</Badge>
                      </TableCell>
                      <TableCell>Bank Transfer</TableCell>
                      <TableCell className="text-right">$350.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>INV004</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">Paid</Badge>
                      </TableCell>
                      <TableCell>Credit Card</TableCell>
                      <TableCell className="text-right">$450.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>INV005</TableCell>
                      <TableCell>
                        <Badge className="bg-blue-500">Processing</Badge>
                      </TableCell>
                      <TableCell>Stripe</TableCell>
                      <TableCell className="text-right">$550.00</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Avatars</CardTitle>
                <CardDescription>User avatars with images and fallbacks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-center gap-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Avatar className="w-16 h-16">
                    <AvatarFallback className="bg-blue-500 text-white">AB</AvatarFallback>
                  </Avatar>
                  <Avatar className="w-16 h-16">
                    <AvatarFallback className="bg-orange-500 text-white">CD</AvatarFallback>
                  </Avatar>
                  <Avatar className="w-16 h-16">
                    <AvatarFallback className="bg-grey-500 text-white">EF</AvatarFallback>
                  </Avatar>
                  <Avatar className="w-16 h-16">
                    <AvatarFallback className="bg-black text-white">GH</AvatarFallback>
                  </Avatar>
                  <Avatar className="w-12 h-12">
                    <AvatarFallback>IJ</AvatarFallback>
                  </Avatar>
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="text-xs">KL</AvatarFallback>
                  </Avatar>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Badges</CardTitle>
                <CardDescription>Status indicators and labels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                  <Badge className="bg-orange-500">Orange</Badge>
                  <Badge className="bg-blue-500">Blue</Badge>
                  <Badge className="bg-black">Black</Badge>
                  <Badge className="bg-grey-500">Grey</Badge>
                  <Badge className="bg-green-500">Success</Badge>
                  <Badge className="bg-purple-500">Purple</Badge>
                  <Badge className="bg-yellow-500 text-grey-900">Warning</Badge>
                  <Badge className="bg-pink-500">Pink</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Carousel</CardTitle>
                <CardDescription>Image and content carousel</CardDescription>
              </CardHeader>
              <CardContent>
                <Carousel className="w-full max-w-xs mx-auto">
                  <CarouselContent>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <CarouselItem key={index}>
                        <div className="p-1">
                          <Card>
                            <CardContent className="flex aspect-square items-center justify-center p-6 bg-gradient-to-br from-grey-100 to-grey-200">
                              <span className="text-4xl">
                                {index + 1}
                              </span>
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Scroll Area</CardTitle>
                <CardDescription>Custom scrollable container</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-72 w-full rounded-md border p-4">
                  <div className="space-y-4">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg border bg-grey-50">
                        <Avatar>
                          <AvatarFallback>{`U${i + 1}`}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p>User {i + 1}</p>
                          <p className="text-sm text-grey-500">user{i + 1}@example.com</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Aspect Ratio</CardTitle>
                <CardDescription>Containers with fixed aspect ratios</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-grey-500 mb-2">16:9 (Video)</p>
                  <AspectRatio ratio={16 / 9} className="bg-grey-100 rounded-lg overflow-hidden">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1695067438561-75492f7b6a9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBidWlsZGluZ3xlbnwxfHx8fDE3NjMwNjU2ODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Architecture"
                      className="object-cover w-full h-full"
                    />
                  </AspectRatio>
                </div>
                <div>
                  <p className="text-sm text-grey-500 mb-2">1:1 (Square)</p>
                  <AspectRatio ratio={1} className="bg-grey-100 rounded-lg overflow-hidden max-w-xs">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1693159682660-c125e71844d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHdvcmtzcGFjZSUyMGRlc2t8ZW58MXx8fHwxNzYzMDIxOTA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Workspace"
                      className="object-cover w-full h-full"
                    />
                  </AspectRatio>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Feedback Tab */}
          <TabsContent value="feedback" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Alerts</CardTitle>
                <CardDescription>Alert messages with different severity levels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Information</AlertTitle>
                  <AlertDescription>
                    This is an informational alert with default styling.
                  </AlertDescription>
                </Alert>

                <Alert className="border-blue-500 bg-blue-50">
                  <Info className="h-4 w-4 text-blue-500" />
                  <AlertTitle className="text-blue-900">Blue Alert</AlertTitle>
                  <AlertDescription className="text-blue-700">
                    This alert uses the secondary blue color for information.
                  </AlertDescription>
                </Alert>

                <Alert className="border-orange-500 bg-orange-50">
                  <AlertCircle className="h-4 w-4 text-orange-500" />
                  <AlertTitle className="text-orange-900">Warning</AlertTitle>
                  <AlertDescription className="text-orange-700">
                    This alert uses the orange accent color for warnings.
                  </AlertDescription>
                </Alert>

                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    This is a destructive alert for error messages.
                  </AlertDescription>
                </Alert>

                <Alert className="border-green-500 bg-green-50">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <AlertTitle className="text-green-900">Success</AlertTitle>
                  <AlertDescription className="text-green-700">
                    Operation completed successfully!
                  </AlertDescription>
                </Alert>

                <Alert className="border-grey-700 bg-grey-900 text-white">
                  <Bell className="h-4 w-4" />
                  <AlertTitle>Dark Alert</AlertTitle>
                  <AlertDescription className="text-grey-300">
                    This is a dark-themed alert using grey colors.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Progress Indicators</CardTitle>
                <CardDescription>Loading and progress states</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Default</span>
                    <span className="text-grey-500">33%</span>
                  </div>
                  <Progress value={33} />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Blue</span>
                    <span className="text-grey-500">66%</span>
                  </div>
                  <Progress value={66} className="[&>div]:bg-blue-500" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Orange</span>
                    <span className="text-grey-500">85%</span>
                  </div>
                  <Progress value={85} className="[&>div]:bg-orange-500" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Complete</span>
                    <span className="text-grey-500">100%</span>
                  </div>
                  <Progress value={100} className="[&>div]:bg-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skeleton Loaders</CardTitle>
                <CardDescription>Loading placeholders</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Skeleton className="h-32 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Layout Tab */}
          <TabsContent value="layout" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Cards</CardTitle>
                <CardDescription>Card components with different styles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Default Card</CardTitle>
                      <CardDescription>Standard card design</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-grey-600">
                        This is a basic card component with header, content, and footer sections.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">Learn More</Button>
                    </CardFooter>
                  </Card>

                  <Card className="border-blue-500 border-2">
                    <CardHeader>
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                        <Info className="w-6 h-6 text-blue-500" />
                      </div>
                      <CardTitle>Blue Card</CardTitle>
                      <CardDescription>Card with blue accent</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-grey-600">
                        Perfect for highlighting secondary information or features.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
                    <CardHeader>
                      <CardTitle>Orange Card</CardTitle>
                      <CardDescription className="text-orange-100">Premium highlight</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-orange-50">
                        Use for calls-to-action or featured content.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-white text-orange-600 hover:bg-orange-50">
                        Get Started
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Accordion</CardTitle>
                <CardDescription>Collapsible content sections</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>What is this design system?</AccordionTrigger>
                    <AccordionContent>
                      This is a comprehensive design system built with grey as the primary color, blue as secondary,
                      and orange, black, and white as accent colors. It includes a complete set of UI components.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>How do I use the components?</AccordionTrigger>
                    <AccordionContent>
                      Each component can be imported and customized using the design system's color tokens.
                      All components are built with accessibility and responsiveness in mind.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Can I customize the colors?</AccordionTrigger>
                    <AccordionContent>
                      Yes! The design system uses CSS variables that can be easily customized. You can modify
                      the color palette in the globals.css file to match your brand.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Collapsible</CardTitle>
                <CardDescription>Simple collapsible component</CardDescription>
              </CardHeader>
              <CardContent>
                <Collapsible className="space-y-2">
                  <div className="flex items-center justify-between space-x-4">
                    <h4>@peduarte starred 3 repositories</h4>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <ChevronDown className="h-4 w-4" />
                        <span className="sr-only">Toggle</span>
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  <div className="rounded-md border px-4 py-3 text-sm">
                    @radix-ui/primitives
                  </div>
                  <CollapsibleContent className="space-y-2">
                    <div className="rounded-md border px-4 py-3 text-sm">
                      @radix-ui/colors
                    </div>
                    <div className="rounded-md border px-4 py-3 text-sm">
                      @stitches/react
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resizable Panels</CardTitle>
                <CardDescription>Draggable resizable panels</CardDescription>
              </CardHeader>
              <CardContent>
                <ResizablePanelGroup direction="horizontal" className="min-h-[200px] rounded-lg border">
                  <ResizablePanel defaultSize={50}>
                    <div className="flex h-full items-center justify-center p-6">
                      <span className="text-grey-500">Panel One</span>
                    </div>
                  </ResizablePanel>
                  <ResizableHandle />
                  <ResizablePanel defaultSize={50}>
                    <div className="flex h-full items-center justify-center p-6">
                      <span className="text-grey-500">Panel Two</span>
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Separator</CardTitle>
                <CardDescription>Visual dividers for content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm">Horizontal Separator</p>
                  <Separator className="my-4" />
                  <p className="text-sm">Content below separator</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tabs</CardTitle>
                <CardDescription>Tabbed navigation for content</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="account" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                  </TabsList>
                  <TabsContent value="account" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="tab-name">Name</Label>
                      <Input id="tab-name" defaultValue="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tab-email">Email</Label>
                      <Input id="tab-email" type="email" defaultValue="john@example.com" />
                    </div>
                  </TabsContent>
                  <TabsContent value="password" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                  </TabsContent>
                  <TabsContent value="settings" className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notifications-toggle">Email Notifications</Label>
                      <Switch id="notifications-toggle" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="marketing-toggle">Marketing Emails</Label>
                      <Switch id="marketing-toggle" />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* Footer */}
      <footer className="bg-grey-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="mb-4">Design System</h4>
              <p className="text-sm text-grey-400">
                A comprehensive UI component library with grey, blue, and orange colors.
              </p>
            </div>
            <div>
              <h4 className="mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-grey-400">
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">Components</a></li>
                <li><a href="#" className="hover:text-white">Guidelines</a></li>
                <li><a href="#" className="hover:text-white">Examples</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-grey-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
                <li><a href="#" className="hover:text-white">Community</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-grey-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Press</a></li>
              </ul>
            </div>
          </div>
          <Separator className="bg-grey-700 mb-8" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-grey-400">
            <p>&copy; 2024 Design System. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white">Privacy</a>
              <a href="#" className="hover:text-white">Terms</a>
              <a href="#" className="hover:text-white">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
