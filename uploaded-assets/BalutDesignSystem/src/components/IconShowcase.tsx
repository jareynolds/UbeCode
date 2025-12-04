import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { useState } from "react";
import { 
  Home, Settings, User, Mail, Calendar, Search, Bell, Download, Upload, Trash2, 
  Edit, Share2, Copy, ChevronDown, ChevronRight, ChevronLeft, ChevronUp, Plus, 
  Minus, X, Menu, MoreHorizontal, MoreVertical, Bold, Italic, Underline, 
  AlignLeft, AlignCenter, AlignRight, Link, Image, Code, Heart, Star, Bookmark, 
  MessageSquare, ThumbsUp, Eye, EyeOff, Filter, SortAsc, SortDesc, PlayCircle, 
  PauseCircle, Volume2, VolumeX, FileText, Folder, Clock, MapPin, Phone, 
  CreditCard, ShoppingCart, Package, Truck, CheckCircle, XCircle, AlertCircle, 
  Info, HelpCircle, Zap, Activity, Award, BarChart, PieChart, TrendingUp, 
  TrendingDown, DollarSign, Percent, Target, Compass, Map, Navigation, Send, 
  Inbox, Archive, File, Files, Lock, Unlock, Key, Shield, UserCheck, UserPlus, 
  UserMinus, Users, Camera, Video, Music, Headphones, Mic, MicOff, Sun, Moon, 
  Cloud, CloudRain, CloudSnow, Wifi, WifiOff, Battery, BatteryCharging, Bluetooth, 
  Cpu, HardDrive, Monitor, Smartphone, Tablet, Watch, Printer, Save, RefreshCw, 
  RotateCw, RotateCcw, ZoomIn, ZoomOut, Maximize, Minimize, Move, ArrowUp, 
  ArrowDown, ArrowLeft, ArrowRight, CornerUpLeft, CornerUpRight, ExternalLink, 
  Globe, Briefcase, Coffee, Gift, ShoppingBag, Tag, Layers, Layout, Grid, List, 
  Columns, Sidebar, PanelLeft, PanelRight, LayoutDashboard, BookOpen, Book, 
  Newspaper, FileCode, Terminal, Command, Hash, AtSign, Slash, Flag, Bookmark as BookmarkIcon,
  Radio, Tv, Cast, Airplay, Database, Server, HardDriveDownload, HardDriveUpload,
  Feather, Palette, Paintbrush, Droplet, Aperture, Triangle, Square, Circle,
  Pentagon, Hexagon, Octagon
} from "lucide-react";

const iconCategories = {
  "Common Actions": [
    { Icon: Home, name: "Home" },
    { Icon: Settings, name: "Settings" },
    { Icon: User, name: "User" },
    { Icon: Mail, name: "Mail" },
    { Icon: Calendar, name: "Calendar" },
    { Icon: Search, name: "Search" },
    { Icon: Bell, name: "Bell" },
    { Icon: Download, name: "Download" },
    { Icon: Upload, name: "Upload" },
    { Icon: Trash2, name: "Trash2" },
    { Icon: Edit, name: "Edit" },
    { Icon: Share2, name: "Share2" },
    { Icon: Copy, name: "Copy" },
    { Icon: Save, name: "Save" },
    { Icon: Send, name: "Send" },
  ],
  "Navigation": [
    { Icon: ChevronDown, name: "ChevronDown" },
    { Icon: ChevronRight, name: "ChevronRight" },
    { Icon: ChevronLeft, name: "ChevronLeft" },
    { Icon: ChevronUp, name: "ChevronUp" },
    { Icon: ArrowUp, name: "ArrowUp" },
    { Icon: ArrowDown, name: "ArrowDown" },
    { Icon: ArrowLeft, name: "ArrowLeft" },
    { Icon: ArrowRight, name: "ArrowRight" },
    { Icon: CornerUpLeft, name: "CornerUpLeft" },
    { Icon: CornerUpRight, name: "CornerUpRight" },
    { Icon: ExternalLink, name: "ExternalLink" },
    { Icon: Menu, name: "Menu" },
  ],
  "Actions": [
    { Icon: Plus, name: "Plus" },
    { Icon: Minus, name: "Minus" },
    { Icon: X, name: "X" },
    { Icon: MoreHorizontal, name: "MoreHorizontal" },
    { Icon: MoreVertical, name: "MoreVertical" },
    { Icon: RefreshCw, name: "RefreshCw" },
    { Icon: RotateCw, name: "RotateCw" },
    { Icon: RotateCcw, name: "RotateCcw" },
    { Icon: ZoomIn, name: "ZoomIn" },
    { Icon: ZoomOut, name: "ZoomOut" },
    { Icon: Maximize, name: "Maximize" },
    { Icon: Minimize, name: "Minimize" },
    { Icon: Move, name: "Move" },
  ],
  "Text Formatting": [
    { Icon: Bold, name: "Bold" },
    { Icon: Italic, name: "Italic" },
    { Icon: Underline, name: "Underline" },
    { Icon: AlignLeft, name: "AlignLeft" },
    { Icon: AlignCenter, name: "AlignCenter" },
    { Icon: AlignRight, name: "AlignRight" },
    { Icon: Link, name: "Link" },
    { Icon: Code, name: "Code" },
    { Icon: List, name: "List" },
  ],
  "Media": [
    { Icon: Image, name: "Image" },
    { Icon: Camera, name: "Camera" },
    { Icon: Video, name: "Video" },
    { Icon: Music, name: "Music" },
    { Icon: Headphones, name: "Headphones" },
    { Icon: Mic, name: "Mic" },
    { Icon: MicOff, name: "MicOff" },
    { Icon: PlayCircle, name: "PlayCircle" },
    { Icon: PauseCircle, name: "PauseCircle" },
    { Icon: Volume2, name: "Volume2" },
    { Icon: VolumeX, name: "VolumeX" },
  ],
  "Social": [
    { Icon: Heart, name: "Heart" },
    { Icon: Star, name: "Star" },
    { Icon: Bookmark, name: "Bookmark" },
    { Icon: MessageSquare, name: "MessageSquare" },
    { Icon: ThumbsUp, name: "ThumbsUp" },
    { Icon: Eye, name: "Eye" },
    { Icon: EyeOff, name: "EyeOff" },
    { Icon: Users, name: "Users" },
    { Icon: UserPlus, name: "UserPlus" },
    { Icon: UserMinus, name: "UserMinus" },
    { Icon: UserCheck, name: "UserCheck" },
  ],
  "Files & Folders": [
    { Icon: FileText, name: "FileText" },
    { Icon: File, name: "File" },
    { Icon: Files, name: "Files" },
    { Icon: Folder, name: "Folder" },
    { Icon: Archive, name: "Archive" },
    { Icon: Inbox, name: "Inbox" },
    { Icon: FileCode, name: "FileCode" },
    { Icon: BookOpen, name: "BookOpen" },
    { Icon: Book, name: "Book" },
    { Icon: Newspaper, name: "Newspaper" },
  ],
  "Status": [
    { Icon: CheckCircle, name: "CheckCircle" },
    { Icon: XCircle, name: "XCircle" },
    { Icon: AlertCircle, name: "AlertCircle" },
    { Icon: Info, name: "Info" },
    { Icon: HelpCircle, name: "HelpCircle" },
    { Icon: Zap, name: "Zap" },
    { Icon: Activity, name: "Activity" },
    { Icon: Award, name: "Award" },
  ],
  "Charts & Data": [
    { Icon: BarChart, name: "BarChart" },
    { Icon: PieChart, name: "PieChart" },
    { Icon: TrendingUp, name: "TrendingUp" },
    { Icon: TrendingDown, name: "TrendingDown" },
    { Icon: Target, name: "Target" },
    { Icon: Filter, name: "Filter" },
    { Icon: SortAsc, name: "SortAsc" },
    { Icon: SortDesc, name: "SortDesc" },
  ],
  "E-commerce": [
    { Icon: ShoppingCart, name: "ShoppingCart" },
    { Icon: ShoppingBag, name: "ShoppingBag" },
    { Icon: Package, name: "Package" },
    { Icon: Truck, name: "Truck" },
    { Icon: CreditCard, name: "CreditCard" },
    { Icon: DollarSign, name: "DollarSign" },
    { Icon: Percent, name: "Percent" },
    { Icon: Tag, name: "Tag" },
    { Icon: Gift, name: "Gift" },
  ],
  "Location & Time": [
    { Icon: MapPin, name: "MapPin" },
    { Icon: Map, name: "Map" },
    { Icon: Compass, name: "Compass" },
    { Icon: Navigation, name: "Navigation" },
    { Icon: Clock, name: "Clock" },
    { Icon: Globe, name: "Globe" },
  ],
  "Security": [
    { Icon: Lock, name: "Lock" },
    { Icon: Unlock, name: "Unlock" },
    { Icon: Key, name: "Key" },
    { Icon: Shield, name: "Shield" },
  ],
  "Weather & Nature": [
    { Icon: Sun, name: "Sun" },
    { Icon: Moon, name: "Moon" },
    { Icon: Cloud, name: "Cloud" },
    { Icon: CloudRain, name: "CloudRain" },
    { Icon: CloudSnow, name: "CloudSnow" },
  ],
  "Technology": [
    { Icon: Wifi, name: "Wifi" },
    { Icon: WifiOff, name: "WifiOff" },
    { Icon: Battery, name: "Battery" },
    { Icon: BatteryCharging, name: "BatteryCharging" },
    { Icon: Bluetooth, name: "Bluetooth" },
    { Icon: Cpu, name: "Cpu" },
    { Icon: HardDrive, name: "HardDrive" },
    { Icon: Monitor, name: "Monitor" },
    { Icon: Smartphone, name: "Smartphone" },
    { Icon: Tablet, name: "Tablet" },
    { Icon: Watch, name: "Watch" },
    { Icon: Printer, name: "Printer" },
    { Icon: Database, name: "Database" },
    { Icon: Server, name: "Server" },
  ],
  "Development": [
    { Icon: Terminal, name: "Terminal" },
    { Icon: Command, name: "Command" },
    { Icon: Hash, name: "Hash" },
    { Icon: AtSign, name: "AtSign" },
    { Icon: Slash, name: "Slash" },
  ],
  "Layout": [
    { Icon: Layout, name: "Layout" },
    { Icon: LayoutDashboard, name: "LayoutDashboard" },
    { Icon: Grid, name: "Grid" },
    { Icon: Layers, name: "Layers" },
    { Icon: Columns, name: "Columns" },
    { Icon: Sidebar, name: "Sidebar" },
    { Icon: PanelLeft, name: "PanelLeft" },
    { Icon: PanelRight, name: "PanelRight" },
  ],
  "Design": [
    { Icon: Feather, name: "Feather" },
    { Icon: Palette, name: "Palette" },
    { Icon: Paintbrush, name: "Paintbrush" },
    { Icon: Droplet, name: "Droplet" },
    { Icon: Aperture, name: "Aperture" },
  ],
  "Shapes": [
    { Icon: Triangle, name: "Triangle" },
    { Icon: Square, name: "Square" },
    { Icon: Circle, name: "Circle" },
    { Icon: Pentagon, name: "Pentagon" },
    { Icon: Hexagon, name: "Hexagon" },
    { Icon: Octagon, name: "Octagon" },
  ],
  "Business": [
    { Icon: Briefcase, name: "Briefcase" },
    { Icon: Coffee, name: "Coffee" },
    { Icon: Flag, name: "Flag" },
    { Icon: Phone, name: "Phone" },
  ],
  "Media Devices": [
    { Icon: Radio, name: "Radio" },
    { Icon: Tv, name: "Tv" },
    { Icon: Cast, name: "Cast" },
    { Icon: Airplay, name: "Airplay" },
  ],
};

export function IconShowcase() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = Object.entries(iconCategories).reduce((acc, [category, icons]) => {
    const filtered = icons.filter(({ name }) => 
      name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filtered.length > 0) {
      acc[category] = filtered;
    }
    return acc;
  }, {} as Record<string, typeof iconCategories[keyof typeof iconCategories]>);

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Icon Library - Lucide React</CardTitle>
          <CardDescription>
            Comprehensive icon set from lucide-react. Search and browse all available icons.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-grey-400" />
              <Input
                placeholder="Search icons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-8">
            {Object.entries(filteredCategories).map(([category, icons]) => (
              <div key={category}>
                <h3 className="mb-4 text-grey-700">{category}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                  {icons.map(({ Icon, name }) => (
                    <div
                      key={name}
                      className="flex flex-col items-center justify-center p-4 rounded-lg border border-grey-200 hover:border-blue-500 hover:bg-blue-50 transition-colors cursor-pointer group"
                      title={name}
                    >
                      <Icon className="w-6 h-6 mb-2 text-grey-600 group-hover:text-blue-500" />
                      <p className="text-xs text-grey-500 group-hover:text-blue-600 text-center break-all">
                        {name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {Object.keys(filteredCategories).length === 0 && (
            <div className="text-center py-12">
              <p className="text-grey-500">No icons found matching "{searchQuery}"</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Icon Usage Examples</CardTitle>
          <CardDescription>Different ways to use icons in your designs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="mb-3 text-grey-600">Icon Sizes</h4>
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-center gap-2">
                <Home className="w-4 h-4 text-grey-600" />
                <span className="text-xs text-grey-500">Small (16px)</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Home className="w-5 h-5 text-grey-600" />
                <span className="text-xs text-grey-500">Default (20px)</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Home className="w-6 h-6 text-grey-600" />
                <span className="text-xs text-grey-500">Medium (24px)</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Home className="w-8 h-8 text-grey-600" />
                <span className="text-xs text-grey-500">Large (32px)</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Home className="w-12 h-12 text-grey-600" />
                <span className="text-xs text-grey-500">XL (48px)</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-grey-600">Icon Colors</h4>
            <div className="flex items-center gap-4">
              <Heart className="w-6 h-6 text-grey-600" />
              <Heart className="w-6 h-6 text-blue-500" />
              <Heart className="w-6 h-6 text-orange-500" />
              <Heart className="w-6 h-6 text-black" />
              <Heart className="w-6 h-6 text-red-500" />
              <Heart className="w-6 h-6 text-green-500" />
              <Heart className="w-6 h-6 text-purple-500" />
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-grey-600">Icons with Backgrounds</h4>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Mail className="w-5 h-5 text-blue-500" />
              </div>
              <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                <Bell className="w-5 h-5 text-orange-500" />
              </div>
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <div className="w-10 h-10 rounded-lg bg-grey-900 flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
