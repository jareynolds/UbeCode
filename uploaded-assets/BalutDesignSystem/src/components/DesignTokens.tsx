import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

export function DesignTokens() {
  const colorTokens = [
    { token: "--background", light: "#ffffff", dark: "#1a1a1a", description: "Main background color" },
    { token: "--foreground", light: "#1a1a1a", dark: "#f9fafb", description: "Main text color" },
    { token: "--primary", light: "#6b7280", dark: "#9ca3af", description: "Primary brand color (Grey)" },
    { token: "--primary-foreground", light: "#ffffff", dark: "#1a1a1a", description: "Text on primary" },
    { token: "--secondary", light: "#3b82f6", dark: "#60a5fa", description: "Secondary color (Blue)" },
    { token: "--secondary-foreground", light: "#ffffff", dark: "#1a1a1a", description: "Text on secondary" },
    { token: "--accent", light: "#f97316", dark: "#fb923c", description: "Accent color (Orange)" },
    { token: "--accent-foreground", light: "#ffffff", dark: "#1a1a1a", description: "Text on accent" },
    { token: "--muted", light: "#f3f4f6", dark: "#374151", description: "Muted backgrounds" },
    { token: "--muted-foreground", light: "#6b7280", dark: "#9ca3af", description: "Muted text" },
    { token: "--border", light: "#e5e7eb", dark: "#374151", description: "Border color" },
    { token: "--input", light: "#e5e7eb", dark: "#374151", description: "Input border" },
    { token: "--ring", light: "#3b82f6", dark: "#60a5fa", description: "Focus ring color" },
  ];

  const greyScale = [
    { name: "Grey 50", token: "--grey-50", value: "#f9fafb", usage: "Subtle backgrounds, hover states" },
    { name: "Grey 100", token: "--grey-100", value: "#f3f4f6", usage: "Muted backgrounds" },
    { name: "Grey 200", token: "--grey-200", value: "#e5e7eb", usage: "Borders, dividers" },
    { name: "Grey 300", token: "--grey-300", value: "#d1d5db", usage: "Disabled backgrounds" },
    { name: "Grey 400", token: "--grey-400", value: "#9ca3af", usage: "Placeholder text" },
    { name: "Grey 500", token: "--grey-500", value: "#6b7280", usage: "Secondary text, primary brand" },
    { name: "Grey 600", token: "--grey-600", value: "#4b5563", usage: "Body text" },
    { name: "Grey 700", token: "--grey-700", value: "#374151", usage: "Headings" },
    { name: "Grey 800", token: "--grey-800", value: "#1f2937", usage: "Dark backgrounds" },
    { name: "Grey 900", token: "--grey-900", value: "#111827", usage: "Primary black, hero sections" },
  ];

  const blueScale = [
    { name: "Blue 50", token: "--blue-50", value: "#eff6ff", usage: "Subtle backgrounds" },
    { name: "Blue 100", token: "--blue-100", value: "#dbeafe", usage: "Hover states" },
    { name: "Blue 200", token: "--blue-200", value: "#bfdbfe", usage: "Light backgrounds" },
    { name: "Blue 300", token: "--blue-300", value: "#93c5fd", usage: "Disabled states" },
    { name: "Blue 400", token: "--blue-400", value: "#60a5fa", usage: "Hover colors" },
    { name: "Blue 500", token: "--blue-500", value: "#3b82f6", usage: "Primary blue, links, buttons" },
    { name: "Blue 600", token: "--blue-600", value: "#2563eb", usage: "Active states" },
    { name: "Blue 700", token: "--blue-700", value: "#1d4ed8", usage: "Pressed states" },
    { name: "Blue 800", token: "--blue-800", value: "#1e40af", usage: "Dark mode blue" },
    { name: "Blue 900", token: "--blue-900", value: "#1e3a8a", usage: "Dark accents" },
  ];

  const orangeScale = [
    { name: "Orange 50", token: "--orange-50", value: "#fff7ed", usage: "Subtle backgrounds" },
    { name: "Orange 100", token: "--orange-100", value: "#ffedd5", usage: "Hover states" },
    { name: "Orange 200", token: "--orange-200", value: "#fed7aa", usage: "Light backgrounds" },
    { name: "Orange 300", token: "--orange-300", value: "#fdba74", usage: "Warnings" },
    { name: "Orange 400", token: "--orange-400", value: "#fb923c", usage: "Hover colors" },
    { name: "Orange 500", token: "--orange-500", value: "#f97316", usage: "Primary orange, CTAs" },
    { name: "Orange 600", token: "--orange-600", value: "#ea580c", usage: "Active states" },
    { name: "Orange 700", token: "--orange-700", value: "#c2410c", usage: "Pressed states" },
    { name: "Orange 800", token: "--orange-800", value: "#9a3412", usage: "Dark accents" },
    { name: "Orange 900", token: "--orange-900", value: "#7c2d12", usage: "Deep accents" },
  ];

  const spacingTokens = [
    { size: "0", value: "0px", usage: "No spacing" },
    { size: "1", value: "0.25rem (4px)", usage: "Tiny gaps" },
    { size: "2", value: "0.5rem (8px)", usage: "Small gaps" },
    { size: "3", value: "0.75rem (12px)", usage: "Default small spacing" },
    { size: "4", value: "1rem (16px)", usage: "Default spacing" },
    { size: "5", value: "1.25rem (20px)", usage: "Medium spacing" },
    { size: "6", value: "1.5rem (24px)", usage: "Large spacing" },
    { size: "8", value: "2rem (32px)", usage: "Extra large spacing" },
    { size: "10", value: "2.5rem (40px)", usage: "Section spacing" },
    { size: "12", value: "3rem (48px)", usage: "Large section spacing" },
    { size: "16", value: "4rem (64px)", usage: "Hero spacing" },
    { size: "20", value: "5rem (80px)", usage: "Extra large sections" },
  ];

  const radiusTokens = [
    { name: "radius-sm", value: "calc(var(--radius) - 4px)", pixels: "~4px", usage: "Small elements" },
    { name: "radius-md", value: "calc(var(--radius) - 2px)", pixels: "~6px", usage: "Medium elements" },
    { name: "radius-lg", value: "var(--radius)", pixels: "8px", usage: "Large elements, cards" },
    { name: "radius-xl", value: "calc(var(--radius) + 4px)", pixels: "~12px", usage: "Extra large elements" },
    { name: "rounded-full", value: "9999px", pixels: "9999px", usage: "Circles, pills" },
  ];

  const shadowTokens = [
    { name: "shadow-sm", value: "0 1px 2px 0 rgb(0 0 0 / 0.05)", usage: "Subtle elevation" },
    { name: "shadow", value: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)", usage: "Default shadow" },
    { name: "shadow-md", value: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)", usage: "Medium elevation" },
    { name: "shadow-lg", value: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)", usage: "Large elevation" },
    { name: "shadow-xl", value: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)", usage: "Extra large elevation" },
  ];

  const typographyTokens = [
    { element: "h1", fontSize: "2xl", fontWeight: "Medium (500)", lineHeight: "1.5", usage: "Page titles" },
    { element: "h2", fontSize: "xl", fontWeight: "Medium (500)", lineHeight: "1.5", usage: "Section headings" },
    { element: "h3", fontSize: "lg", fontWeight: "Medium (500)", lineHeight: "1.5", usage: "Subsection headings" },
    { element: "h4", fontSize: "base", fontWeight: "Medium (500)", lineHeight: "1.5", usage: "Card titles" },
    { element: "p", fontSize: "base", fontWeight: "Normal (400)", lineHeight: "1.5", usage: "Body text" },
    { element: "label", fontSize: "base", fontWeight: "Medium (500)", lineHeight: "1.5", usage: "Form labels" },
    { element: "button", fontSize: "base", fontWeight: "Medium (500)", lineHeight: "1.5", usage: "Button text" },
  ];

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Design Tokens Reference</CardTitle>
          <CardDescription>
            Complete reference of all design tokens used in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="semantic" className="w-full">
            <TabsList>
              <TabsTrigger value="semantic">Semantic Colors</TabsTrigger>
              <TabsTrigger value="grey">Grey Scale</TabsTrigger>
              <TabsTrigger value="blue">Blue Scale</TabsTrigger>
              <TabsTrigger value="orange">Orange Scale</TabsTrigger>
              <TabsTrigger value="spacing">Spacing</TabsTrigger>
              <TabsTrigger value="typography">Typography</TabsTrigger>
              <TabsTrigger value="other">Other</TabsTrigger>
            </TabsList>

            <TabsContent value="semantic" className="space-y-4">
              <div>
                <h3 className="mb-4">Semantic Color Tokens</h3>
                <p className="text-sm text-grey-600 mb-6">
                  These tokens automatically adapt to light and dark modes. Use these for most UI elements.
                </p>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Token</TableHead>
                      <TableHead>Light Mode</TableHead>
                      <TableHead>Dark Mode</TableHead>
                      <TableHead>Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {colorTokens.map((token) => (
                      <TableRow key={token.token}>
                        <TableCell>
                          <code className="text-sm bg-grey-100 px-2 py-1 rounded">{token.token}</code>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded border" style={{ backgroundColor: token.light }}></div>
                            <code className="text-xs text-grey-500">{token.light}</code>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded border" style={{ backgroundColor: token.dark }}></div>
                            <code className="text-xs text-grey-500">{token.dark}</code>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-grey-600">{token.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="grey" className="space-y-4">
              <div>
                <h3 className="mb-4">Grey Color Scale</h3>
                <p className="text-sm text-grey-600 mb-6">
                  Primary color palette. Use for neutral backgrounds, text, and UI elements.
                </p>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Token</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Usage</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {greyScale.map((color) => (
                      <TableRow key={color.token}>
                        <TableCell>{color.name}</TableCell>
                        <TableCell>
                          <code className="text-sm bg-grey-100 px-2 py-1 rounded">{color.token}</code>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-12 h-8 rounded border" style={{ backgroundColor: color.value }}></div>
                            <code className="text-xs text-grey-500">{color.value}</code>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-grey-600">{color.usage}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="blue" className="space-y-4">
              <div>
                <h3 className="mb-4">Blue Color Scale</h3>
                <p className="text-sm text-grey-600 mb-6">
                  Secondary color palette. Use for interactive elements, links, and informational UI.
                </p>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Token</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Usage</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {blueScale.map((color) => (
                      <TableRow key={color.token}>
                        <TableCell>{color.name}</TableCell>
                        <TableCell>
                          <code className="text-sm bg-grey-100 px-2 py-1 rounded">{color.token}</code>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-12 h-8 rounded border" style={{ backgroundColor: color.value }}></div>
                            <code className="text-xs text-grey-500">{color.value}</code>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-grey-600">{color.usage}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="orange" className="space-y-4">
              <div>
                <h3 className="mb-4">Orange Color Scale</h3>
                <p className="text-sm text-grey-600 mb-6">
                  Accent color palette. Use for CTAs, warnings, and important highlights.
                </p>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Token</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Usage</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orangeScale.map((color) => (
                      <TableRow key={color.token}>
                        <TableCell>{color.name}</TableCell>
                        <TableCell>
                          <code className="text-sm bg-grey-100 px-2 py-1 rounded">{color.token}</code>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-12 h-8 rounded border" style={{ backgroundColor: color.value }}></div>
                            <code className="text-xs text-grey-500">{color.value}</code>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-grey-600">{color.usage}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="spacing" className="space-y-4">
              <div>
                <h3 className="mb-4">Spacing Scale</h3>
                <p className="text-sm text-grey-600 mb-6">
                  Consistent spacing values for margins, padding, and gaps. Use Tailwind classes like <code className="bg-grey-100 px-1 py-0.5 rounded">p-4</code>, <code className="bg-grey-100 px-1 py-0.5 rounded">m-6</code>, <code className="bg-grey-100 px-1 py-0.5 rounded">gap-3</code>.
                </p>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Size</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Visual</TableHead>
                      <TableHead>Usage</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {spacingTokens.map((token) => (
                      <TableRow key={token.size}>
                        <TableCell>
                          <code className="text-sm bg-grey-100 px-2 py-1 rounded">{token.size}</code>
                        </TableCell>
                        <TableCell className="text-sm">{token.value}</TableCell>
                        <TableCell>
                          <div className="h-4 bg-blue-500 rounded" style={{ width: `${parseInt(token.size) * 4}px` }}></div>
                        </TableCell>
                        <TableCell className="text-sm text-grey-600">{token.usage}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-8">
                <h3 className="mb-4">Border Radius</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Pixels</TableHead>
                      <TableHead>Visual</TableHead>
                      <TableHead>Usage</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {radiusTokens.map((token) => (
                      <TableRow key={token.name}>
                        <TableCell>
                          <code className="text-sm bg-grey-100 px-2 py-1 rounded">{token.name}</code>
                        </TableCell>
                        <TableCell className="text-xs">{token.value}</TableCell>
                        <TableCell className="text-sm">{token.pixels}</TableCell>
                        <TableCell>
                          <div 
                            className="w-16 h-16 bg-blue-500" 
                            style={{ borderRadius: token.name === 'rounded-full' ? '9999px' : token.pixels }}
                          ></div>
                        </TableCell>
                        <TableCell className="text-sm text-grey-600">{token.usage}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="typography" className="space-y-4">
              <div>
                <h3 className="mb-4">Typography System</h3>
                <p className="text-sm text-grey-600 mb-6">
                  Default typography styles applied to HTML elements. These are set automatically and don't require Tailwind classes.
                </p>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Element</TableHead>
                      <TableHead>Font Size</TableHead>
                      <TableHead>Font Weight</TableHead>
                      <TableHead>Line Height</TableHead>
                      <TableHead>Usage</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {typographyTokens.map((token) => (
                      <TableRow key={token.element}>
                        <TableCell>
                          <code className="text-sm bg-grey-100 px-2 py-1 rounded">&lt;{token.element}&gt;</code>
                        </TableCell>
                        <TableCell className="text-sm">{token.fontSize}</TableCell>
                        <TableCell className="text-sm">{token.fontWeight}</TableCell>
                        <TableCell className="text-sm">{token.lineHeight}</TableCell>
                        <TableCell className="text-sm text-grey-600">{token.usage}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="other" className="space-y-4">
              <div>
                <h3 className="mb-4">Shadow Tokens</h3>
                <p className="text-sm text-grey-600 mb-6">
                  Elevation and shadow values for creating depth. Use Tailwind classes like <code className="bg-grey-100 px-1 py-0.5 rounded">shadow-md</code>.
                </p>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Preview</TableHead>
                      <TableHead>Usage</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {shadowTokens.map((token) => (
                      <TableRow key={token.name}>
                        <TableCell>
                          <code className="text-sm bg-grey-100 px-2 py-1 rounded">{token.name}</code>
                        </TableCell>
                        <TableCell className="text-xs max-w-xs">{token.value}</TableCell>
                        <TableCell>
                          <div 
                            className="w-20 h-20 bg-white rounded-lg" 
                            style={{ boxShadow: token.value }}
                          ></div>
                        </TableCell>
                        <TableCell className="text-sm text-grey-600">{token.usage}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
