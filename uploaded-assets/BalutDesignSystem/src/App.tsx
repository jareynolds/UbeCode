import { useState } from "react";
import { DesignSystemShowcase } from "./components/DesignSystemShowcase";
import { IconShowcase } from "./components/IconShowcase";
import { DesignTokens } from "./components/DesignTokens";
import { RealWorldExamples } from "./components/RealWorldExamples";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Card } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Palette, Code, Layout, Sparkles, Home, Boxes } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-grey-50">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="w-2 h-2 bg-grey-400 rounded-full"></div>
              </div>
              <h1 className="ml-2">Design System</h1>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm">Documentation</Button>
              <Button variant="ghost" size="sm">GitHub</Button>
              <Button className="bg-orange-500 hover:bg-orange-600" size="sm">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8 h-auto p-1">
            <TabsTrigger value="overview" className="flex items-center gap-2 py-3">
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="components" className="flex items-center gap-2 py-3">
              <Boxes className="w-4 h-4" />
              <span className="hidden sm:inline">Components</span>
            </TabsTrigger>
            <TabsTrigger value="icons" className="flex items-center gap-2 py-3">
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">Icons</span>
            </TabsTrigger>
            <TabsTrigger value="tokens" className="flex items-center gap-2 py-3">
              <Code className="w-4 h-4" />
              <span className="hidden sm:inline">Tokens</span>
            </TabsTrigger>
            <TabsTrigger value="examples" className="flex items-center gap-2 py-3">
              <Layout className="w-4 h-4" />
              <span className="hidden sm:inline">Examples</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="space-y-8">
              {/* Hero Section */}
              <Card className="overflow-hidden border-0 bg-gradient-to-br from-grey-900 via-grey-800 to-grey-900 text-white">
                <div className="p-12">
                  <div className="max-w-3xl">
                    <div className="flex items-center gap-2 mb-6">
                      <Palette className="w-8 h-8 text-orange-500" />
                      <h2 className="text-white">Complete Design System</h2>
                    </div>
                    <p className="text-xl text-grey-300 mb-8">
                      A comprehensive, production-ready design system built with grey foundations, 
                      blue interactions, and vibrant orange accents. Every component you need, 
                      fully documented and ready to use.
                    </p>
                    <div className="flex gap-4">
                      <Button 
                        size="lg" 
                        className="bg-orange-500 hover:bg-orange-600"
                        onClick={() => setActiveTab("components")}
                      >
                        Browse Components
                      </Button>
                      <Button 
                        size="lg" 
                        variant="outline" 
                        className="border-grey-600 text-white hover:bg-grey-800"
                        onClick={() => setActiveTab("tokens")}
                      >
                        View Tokens
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Features Grid */}
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveTab("components")}>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Boxes className="w-6 h-6 text-blue-500" />
                  </div>
                  <h3 className="mb-2">50+ Components</h3>
                  <p className="text-sm text-grey-600">
                    Complete library of buttons, forms, navigation, overlays, data display, and layout components.
                  </p>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveTab("icons")}>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                    <Sparkles className="w-6 h-6 text-orange-500" />
                  </div>
                  <h3 className="mb-2">200+ Icons</h3>
                  <p className="text-sm text-grey-600">
                    Comprehensive icon library from Lucide React, searchable and ready to use in your designs.
                  </p>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveTab("tokens")}>
                  <div className="w-12 h-12 bg-grey-200 rounded-lg flex items-center justify-center mb-4">
                    <Code className="w-6 h-6 text-grey-700" />
                  </div>
                  <h3 className="mb-2">Design Tokens</h3>
                  <p className="text-sm text-grey-600">
                    Complete color scales, spacing system, typography, and all design tokens documented.
                  </p>
                </Card>
              </div>

              {/* Color Palette Preview */}
              <Card>
                <div className="p-6">
                  <h3 className="mb-6">Color System</h3>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div>
                      <p className="text-sm text-grey-600 mb-3">Primary - Grey</p>
                      <div className="flex gap-2">
                        {[50, 100, 300, 500, 700, 900].map((shade) => (
                          <div 
                            key={shade}
                            className={`flex-1 h-16 rounded-lg bg-grey-${shade}`}
                            title={`Grey ${shade}`}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-grey-600 mb-3">Secondary - Blue</p>
                      <div className="flex gap-2">
                        {[100, 300, 500, 700, 900].map((shade) => (
                          <div 
                            key={shade}
                            className={`flex-1 h-16 rounded-lg bg-blue-${shade}`}
                            title={`Blue ${shade}`}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-grey-600 mb-3">Accent - Orange</p>
                      <div className="flex gap-2">
                        {[100, 300, 500, 700, 900].map((shade) => (
                          <div 
                            key={shade}
                            className={`flex-1 h-16 rounded-lg bg-orange-${shade}`}
                            title={`Orange ${shade}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Quick Stats */}
              <div className="grid md:grid-cols-4 gap-4">
                <Card className="p-6 text-center">
                  <div className="text-3xl mb-2">8</div>
                  <p className="text-sm text-grey-600">Component Categories</p>
                </Card>
                <Card className="p-6 text-center">
                  <div className="text-3xl mb-2">50+</div>
                  <p className="text-sm text-grey-600">UI Components</p>
                </Card>
                <Card className="p-6 text-center">
                  <div className="text-3xl mb-2">200+</div>
                  <p className="text-sm text-grey-600">Icons Available</p>
                </Card>
                <Card className="p-6 text-center">
                  <div className="text-3xl mb-2">100%</div>
                  <p className="text-sm text-grey-600">Accessible</p>
                </Card>
              </div>

              {/* Getting Started */}
              <Card>
                <div className="p-6">
                  <h3 className="mb-4">Getting Started</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center flex-shrink-0">
                        1
                      </div>
                      <div>
                        <h4 className="mb-1">Explore Components</h4>
                        <p className="text-sm text-grey-600">
                          Browse through all available UI components in the Components tab
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center flex-shrink-0">
                        2
                      </div>
                      <div>
                        <h4 className="mb-1">Review Design Tokens</h4>
                        <p className="text-sm text-grey-600">
                          Check the Tokens tab for color scales, spacing, typography, and more
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center flex-shrink-0">
                        3
                      </div>
                      <div>
                        <h4 className="mb-1">See Real Examples</h4>
                        <p className="text-sm text-grey-600">
                          View practical implementations in the Examples tab
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Components Tab */}
          <TabsContent value="components">
            <DesignSystemShowcase />
          </TabsContent>

          {/* Icons Tab */}
          <TabsContent value="icons">
            <IconShowcase />
          </TabsContent>

          {/* Tokens Tab */}
          <TabsContent value="tokens">
            <DesignTokens />
          </TabsContent>

          {/* Examples Tab */}
          <TabsContent value="examples">
            <RealWorldExamples />
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="border-t bg-white mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="mb-4">Design System</h4>
              <p className="text-sm text-grey-600">
                Built with grey, blue, and orange. Complete UI component library.
              </p>
            </div>
            <div>
              <h4 className="mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-grey-600">
                <li><button onClick={() => setActiveTab("overview")} className="hover:text-grey-900">Overview</button></li>
                <li><button onClick={() => setActiveTab("components")} className="hover:text-grey-900">Components</button></li>
                <li><button onClick={() => setActiveTab("icons")} className="hover:text-grey-900">Icons</button></li>
                <li><button onClick={() => setActiveTab("tokens")} className="hover:text-grey-900">Tokens</button></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-grey-600">
                <li><a href="#" className="hover:text-grey-900">Documentation</a></li>
                <li><a href="#" className="hover:text-grey-900">Guidelines</a></li>
                <li><a href="#" className="hover:text-grey-900">Examples</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-grey-600">
                <li><a href="#" className="hover:text-grey-900">Help Center</a></li>
                <li><a href="#" className="hover:text-grey-900">Contact</a></li>
                <li><a href="#" className="hover:text-grey-900">GitHub</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t text-sm text-grey-600 text-center">
            <p>&copy; 2024 Design System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
