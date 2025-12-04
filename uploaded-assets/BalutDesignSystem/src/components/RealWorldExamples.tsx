import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { Switch } from "./ui/switch";
import { BarChart, TrendingUp, Users, DollarSign, Package, Mail, Phone, MapPin, Calendar, Clock, CheckCircle, AlertCircle, Star, Download, Share2, Settings, Bell, Search, Filter, MoreHorizontal } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function RealWorldExamples() {
  return (
    <div className="space-y-8">
      {/* Dashboard Example */}
      <Card>
        <CardHeader>
          <CardTitle>Dashboard Example</CardTitle>
          <CardDescription>Complete dashboard layout with stats and data visualization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-2 border-blue-500">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-grey-600">Total Revenue</p>
                    <DollarSign className="w-4 h-4 text-blue-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">$45,231</div>
                  <p className="text-xs text-green-600 mt-1">+20.1% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-grey-600">Active Users</p>
                    <Users className="w-4 h-4 text-orange-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">+2,350</div>
                  <p className="text-xs text-green-600 mt-1">+180.1% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-grey-600">Sales</p>
                    <TrendingUp className="w-4 h-4 text-grey-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">+12,234</div>
                  <p className="text-xs text-green-600 mt-1">+19% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-grey-600">Products</p>
                    <Package className="w-4 h-4 text-grey-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">+573</div>
                  <p className="text-xs text-green-600 mt-1">+201 from last month</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest updates from your dashboard</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">View All</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { user: "John Smith", action: "completed a project", time: "2 hours ago", status: "success" },
                    { user: "Sarah Johnson", action: "uploaded new files", time: "5 hours ago", status: "info" },
                    { user: "Mike Davis", action: "needs review", time: "1 day ago", status: "warning" },
                  ].map((activity, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>{activity.user.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span>{activity.user}</span> {activity.action}
                        </p>
                        <p className="text-xs text-grey-500">{activity.time}</p>
                      </div>
                      <Badge className={
                        activity.status === 'success' ? 'bg-green-500' :
                        activity.status === 'warning' ? 'bg-orange-500' :
                        'bg-blue-500'
                      }>
                        {activity.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Contact Form Example */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Form Example</CardTitle>
          <CardDescription>Professional contact form with validation-ready fields</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="contact-name">Full Name *</Label>
                <Input id="contact-name" placeholder="John Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">Email Address *</Label>
                <Input id="contact-email" type="email" placeholder="john@example.com" required />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="contact-phone">Phone Number</Label>
                <Input id="contact-phone" type="tel" placeholder="+1 (555) 123-4567" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-subject">Subject *</Label>
                <Select>
                  <SelectTrigger id="contact-subject">
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Inquiry</SelectItem>
                    <SelectItem value="support">Technical Support</SelectItem>
                    <SelectItem value="sales">Sales Question</SelectItem>
                    <SelectItem value="feedback">Feedback</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-message">Message *</Label>
              <Textarea 
                id="contact-message" 
                placeholder="Tell us more about your inquiry..." 
                rows={6}
                required
              />
            </div>

            <div className="flex items-center gap-2">
              <Switch id="contact-newsletter" />
              <Label htmlFor="contact-newsletter" className="text-sm">
                Subscribe to our newsletter for updates and news
              </Label>
            </div>

            <div className="flex gap-3">
              <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
                <Mail className="mr-2 h-4 w-4" />
                Send Message
              </Button>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Product Card Grid Example */}
      <Card>
        <CardHeader>
          <CardTitle>Product Card Grid Example</CardTitle>
          <CardDescription>E-commerce product display with cards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { 
                name: "Premium Workspace", 
                price: "$299", 
                rating: 4.8, 
                reviews: 124,
                image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjI5OTc0NzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              },
              { 
                name: "Analytics Dashboard", 
                price: "$199", 
                rating: 4.9, 
                reviews: 89,
                image: "https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGRhc2hib2FyZCUyMGFuYWx5dGljc3xlbnwxfHx8fDE3NjMwMTU3NDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              },
              { 
                name: "Team Collaboration", 
                price: "$149", 
                rating: 4.7, 
                reviews: 256,
                image: "https://images.unsplash.com/photo-1739298061740-5ed03045b280?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMG1lZXRpbmd8ZW58MXx8fHwxNzYyOTk1ODk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              },
            ].map((product, i) => (
              <Card key={i} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative overflow-hidden bg-grey-100">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full"
                  />
                  <Badge className="absolute top-3 right-3 bg-orange-500">New</Badge>
                </div>
                <CardHeader>
                  <CardTitle>{product.name}</CardTitle>
                  <CardDescription>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <Star 
                            key={j} 
                            className={`w-4 h-4 ${j < Math.floor(product.rating) ? 'fill-orange-500 text-orange-500' : 'text-grey-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-grey-500">({product.reviews})</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl mb-4">{product.price}</div>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600">
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Profile Card Example */}
      <Card>
        <CardHeader>
          <CardTitle>User Profile Card Example</CardTitle>
          <CardDescription>Complete user profile with stats and actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-w-2xl">
            <div className="relative">
              {/* Cover Image */}
              <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-lg"></div>
              
              {/* Profile Content */}
              <div className="px-6 pb-6">
                {/* Avatar */}
                <div className="flex items-end justify-between -mt-16 mb-4">
                  <Avatar className="w-32 h-32 border-4 border-white">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                    <Button className="bg-orange-500 hover:bg-orange-600" size="sm">
                      Follow
                    </Button>
                  </div>
                </div>

                {/* Profile Info */}
                <div className="space-y-4">
                  <div>
                    <h2 className="mb-1">John Doe</h2>
                    <p className="text-grey-600">Senior Product Designer</p>
                  </div>

                  <p className="text-grey-600">
                    Passionate about creating beautiful and functional user experiences. 
                    10+ years of experience in design and product development.
                  </p>

                  {/* Contact Info */}
                  <div className="flex flex-wrap gap-4 text-sm text-grey-600">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      john@example.com
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      San Francisco, CA
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Joined March 2020
                    </div>
                  </div>

                  <Separator />

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl">245</div>
                      <p className="text-sm text-grey-600">Projects</p>
                    </div>
                    <div>
                      <div className="text-2xl">12.5k</div>
                      <p className="text-sm text-grey-600">Followers</p>
                    </div>
                    <div>
                      <div className="text-2xl">1.2k</div>
                      <p className="text-sm text-grey-600">Following</p>
                    </div>
                  </div>

                  <Separator />

                  {/* Skills */}
                  <div>
                    <h4 className="mb-3">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {['UI Design', 'UX Research', 'Prototyping', 'Figma', 'Design Systems', 'React'].map((skill) => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Project Management Card Example */}
      <Card>
        <CardHeader>
          <CardTitle>Project Management Card Example</CardTitle>
          <CardDescription>Task tracking and project progress display</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Project Header */}
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h3>Website Redesign Project</h3>
                  <Badge className="bg-blue-500">In Progress</Badge>
                </div>
                <p className="text-sm text-grey-600">
                  Complete redesign of company website with new branding
                </p>
              </div>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>

            {/* Project Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-grey-600">Due Date</p>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-500" />
                  <span className="text-sm">Dec 31, 2024</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-grey-600">Team Members</p>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">8 members</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-grey-600">Tasks</p>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">24/32 completed</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-grey-600">Budget</p>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-grey-500" />
                  <span className="text-sm">$45,000</span>
                </div>
              </div>
            </div>

            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Progress</span>
                <span className="text-grey-500">75%</span>
              </div>
              <Progress value={75} className="[&>div]:bg-blue-500" />
            </div>

            {/* Tasks */}
            <div>
              <h4 className="mb-3">Recent Tasks</h4>
              <div className="space-y-3">
                {[
                  { task: "Design homepage mockup", status: "completed", assignee: "Sarah" },
                  { task: "Develop navigation component", status: "in-progress", assignee: "Mike" },
                  { task: "Content review and copywriting", status: "pending", assignee: "Emily" },
                  { task: "Mobile responsive testing", status: "pending", assignee: "John" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg border bg-grey-50">
                    <div className={`w-2 h-2 rounded-full ${
                      item.status === 'completed' ? 'bg-green-500' :
                      item.status === 'in-progress' ? 'bg-blue-500' :
                      'bg-grey-300'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm">{item.task}</p>
                      <p className="text-xs text-grey-500">Assigned to {item.assignee}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Team Members */}
            <div>
              <h4 className="mb-3">Team Members</h4>
              <div className="flex -space-x-2">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Avatar key={i} className="border-2 border-white">
                    <AvatarFallback>U{i + 1}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </div>

            <Separator />

            {/* Actions */}
            <div className="flex gap-3">
              <Button className="bg-blue-500 hover:bg-blue-600">
                View All Tasks
              </Button>
              <Button variant="outline">
                Add Task
              </Button>
              <Button variant="ghost">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Center Example */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Center Example</CardTitle>
          <CardDescription>Organized notification display with categories</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread (3)</TabsTrigger>
              <TabsTrigger value="mentions">Mentions</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-3">
              {[
                {
                  type: "success",
                  icon: CheckCircle,
                  title: "Project Completed",
                  message: "Website redesign project has been successfully completed",
                  time: "2 hours ago",
                  unread: true
                },
                {
                  type: "info",
                  icon: Bell,
                  title: "New Team Member",
                  message: "Alice Johnson joined your team",
                  time: "5 hours ago",
                  unread: true
                },
                {
                  type: "warning",
                  icon: AlertCircle,
                  title: "Deadline Approaching",
                  message: "Mobile app project due in 2 days",
                  time: "1 day ago",
                  unread: true
                },
                {
                  type: "default",
                  icon: Mail,
                  title: "New Message",
                  message: "You have a new message from Sarah",
                  time: "2 days ago",
                  unread: false
                },
              ].map((notification, i) => (
                <div 
                  key={i} 
                  className={`flex gap-3 p-4 rounded-lg border ${
                    notification.unread ? 'bg-blue-50 border-blue-200' : 'bg-white'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    notification.type === 'success' ? 'bg-green-100' :
                    notification.type === 'warning' ? 'bg-orange-100' :
                    notification.type === 'info' ? 'bg-blue-100' :
                    'bg-grey-100'
                  }`}>
                    <notification.icon className={`w-5 h-5 ${
                      notification.type === 'success' ? 'text-green-500' :
                      notification.type === 'warning' ? 'text-orange-500' :
                      notification.type === 'info' ? 'text-blue-500' :
                      'text-grey-500'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="text-sm">{notification.title}</h4>
                      {notification.unread && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    <p className="text-sm text-grey-600 mb-1">{notification.message}</p>
                    <p className="text-xs text-grey-500">{notification.time}</p>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="unread">
              <div className="text-center py-8 text-grey-500">
                <Bell className="w-12 h-12 mx-auto mb-4 text-grey-300" />
                <p>You have 3 unread notifications</p>
              </div>
            </TabsContent>

            <TabsContent value="mentions">
              <div className="text-center py-8 text-grey-500">
                <p>No mentions</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
