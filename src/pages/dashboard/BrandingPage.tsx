import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Navbar } from '@/components/layout/Navbar';
import { useToast } from '@/hooks/use-toast';
import api from '@/lib/axios';

// const colorPalettes = [
//   { name: 'Purple Gradient', primary: '#8B5CF6', secondary: '#F3E8FF' },
//   { name: 'Blue Ocean', primary: '#3B82F6', secondary: '#EBF8FF' },
//   { name: 'Green Forest', primary: '#10B981', secondary: '#D1FAE5' },
//   { name: 'Pink Sunset', primary: '#EC4899', secondary: '#FCE7F3' },
//   { name: 'Orange Fire', primary: '#F59E0B', secondary: '#FEF3C7' },
//   { name: 'Red Passion', primary: '#EF4444', secondary: '#FEE2E2' }
// ];

// const fontOptions = [
//   { name: 'Inter', family: 'Inter, sans-serif', category: 'sans-serif' },
//   { name: 'Roboto', family: 'Roboto, sans-serif', category: 'sans-serif' },
//   { name: 'Open Sans', family: 'Open Sans, sans-serif', category: 'sans-serif' },
//   { name: 'Montserrat', family: 'Montserrat, sans-serif', category: 'sans-serif' },
//   { name: 'Poppins', family: 'Poppins, sans-serif', category: 'sans-serif' },
//   { name: 'Lato', family: 'Lato, sans-serif', category: 'sans-serif' },
//   { name: 'Source Sans Pro', family: 'Source Sans Pro, sans-serif', category: 'sans-serif' },
//   { name: 'Nunito', family: 'Nunito, sans-serif', category: 'sans-serif' }
// ];

// const templates = [
//   { 
//     id: 'modern', 
//     name: 'Modern', 
//     preview: '🎨 Clean & Minimal',
//     description: 'Clean & Minimal design',
//     sections: [
//       { id: 'hero', name: 'Hero Section', required: true },
//       { id: 'about', name: 'About Section', required: false },
//       { id: 'products', name: 'Products Showcase', required: true },
//       { id: 'testimonials', name: 'Testimonials', required: false },
//       { id: 'contact', name: 'Contact Section', required: false }
//     ]
//   },
//   { 
//     id: 'classic', 
//     name: 'Classic', 
//     preview: '📜 Traditional & Elegant',
//     description: 'Traditional & Elegant design',
//     sections: [
//       { id: 'header', name: 'Header Section', required: true },
//       { id: 'hero', name: 'Hero Section', required: true },
//       { id: 'about', name: 'About Section', required: true },
//       { id: 'products', name: 'Products Showcase', required: true },
//       { id: 'gallery', name: 'Gallery', required: false },
//       { id: 'testimonials', name: 'Testimonials', required: false },
//       { id: 'contact', name: 'Contact Section', required: true }
//     ]
//   },
//   { 
//     id: 'creative', 
//     name: 'Creative', 
//     preview: '🎭 Bold & Artistic',
//     description: 'Bold & Artistic design',
//     sections: [
//       { id: 'hero', name: 'Hero Section', required: true },
//       { id: 'portfolio', name: 'Portfolio Showcase', required: true },
//       { id: 'products', name: 'Products Section', required: true },
//       { id: 'process', name: 'Creative Process', required: false },
//       { id: 'testimonials', name: 'Client Reviews', required: false },
//       { id: 'contact', name: 'Get In Touch', required: false }
//     ]
//   }
// ];

// export default function BrandingPage() {
//   const authUser = (() => {
//     try {
//       const raw = localStorage.getItem('auth_user');
//       return raw ? JSON.parse(raw) as { id?: string } : null;
//     } catch {
//       return null;
//     }
//   })();
//   const creatorId = authUser?.id;
//   const [branding, setBranding] = useState({
//     primaryColor: '#8B5CF6',
//     secondaryColor: '#F3E8FF',
//     font: 'Inter',
//     template: 'modern',
//     logo: null as File | null,
//     backgroundImage: null as File | null,
//     videoBanner: null as File | null,
//     customColors: {} as Record<string, string>,
//     templateSections: [] as string[],
//     googleFonts: [] as any[],
//     isLoading: false,
//     creatorName: 'Your Creator Name',
//     creatorBio: 'Independent creator bio',
//     logoUrl: '' as string | undefined,
//     backgroundImageUrl: '' as string | undefined,
//     selectedFontFamily: '' as string | undefined
//   });
//   const [activeTab, setActiveTab] = useState('colors');
//   const { toast } = useToast();

//   // Load branding data and Google Fonts on component mount
//   useEffect(() => {
//     loadBrandingData();
//     loadGoogleFonts();
//   }, []);

//   const loadBrandingData = async () => {
//     try {
//       setBranding(prev => ({ ...prev, isLoading: true }));
//       if (!creatorId) throw new Error('Missing creatorId');
//       const response = await api.get(`/branding/${creatorId}`);
//       const data = response.data.data || {};
//       setBranding(prev => ({
//         ...prev,
//         ...data,
//         creatorName: data.creatorName || prev.creatorName,
//         creatorBio: data.creatorBio || prev.creatorBio,
//         logoUrl: data.logo || data.logoUrl || prev.logoUrl,
//         backgroundImageUrl: data.backgroundImage || data.backgroundImageUrl || prev.backgroundImageUrl,
//         selectedFontFamily: data.fontFamily || prev.selectedFontFamily,
//         isLoading: false
//       }));
//     } catch (error) {
//       console.error('Failed to load branding data:', error);
//       setBranding(prev => ({ ...prev, isLoading: false }));
//       toast({
//         title: 'Failed to load branding',
//         description: 'Please make sure you are logged in and have a valid creator account.',
//         variant: 'destructive'
//       });
//     }
//   };

//   const loadGoogleFonts = async () => {
//     try {
//       const response = await api.get('/branding/fonts/google');
//       setBranding(prev => ({ ...prev, googleFonts: response.data.data }));
//     } catch (error) {
//       console.error('Failed to load Google Fonts:', error);
//     }
//   };

//   const handleColorChange = (palette: { primary: string; secondary: string }) => {
//     setBranding(prev => ({
//       ...prev,
//       primaryColor: palette.primary,
//       secondaryColor: palette.secondary
//     }));
//   };

//   const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       try {
//         setBranding(prev => ({ ...prev, isLoading: true }));
//         const formData = new FormData();
//         formData.append('logo', file);
        
//         if (!creatorId) throw new Error('Missing creatorId');
//         const response = await api.post(`/branding/${creatorId}/logo`, formData, {
//           headers: { 'Content-Type': 'multipart/form-data' }
//         });
        
//         setBranding(prev => ({
//           ...prev,
//           logo: file,
//           logoUrl: response.data.data.logoUrl,
//           isLoading: false
//         }));
        
//         toast({
//           title: "Logo uploaded!",
//           description: "Your logo has been uploaded successfully.",
//         });
//       } catch (error) {
//         setBranding(prev => ({ ...prev, isLoading: false }));
//         toast({
//           title: "Upload failed",
//           description: "Failed to upload logo. Please try again.",
//           variant: "destructive"
//         });
//       }
//     }
//   };

//   const handleBackgroundImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       try {
//         setBranding(prev => ({ ...prev, isLoading: true }));
//         const formData = new FormData();
//         formData.append('image', file);
        
//         if (!creatorId) throw new Error('Missing creatorId');
//         const response = await api.post(`/content/${creatorId}/background`, formData, {
//           headers: { 'Content-Type': 'multipart/form-data' }
//         });
        
//         setBranding(prev => ({
//           ...prev,
//           backgroundImage: file,
//           backgroundImageUrl: response.data.data.imageUrl,
//           isLoading: false
//         }));
        
//         toast({
//           title: "Background uploaded!",
//           description: "Your background image has been uploaded successfully.",
//         });
//       } catch (error) {
//         setBranding(prev => ({ ...prev, isLoading: false }));
//         toast({
//           title: "Upload failed",
//           description: "Failed to upload background image. Please try again.",
//           variant: "destructive"
//         });
//       }
//     }
//   };

//   const handleVideoBannerUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       try {
//         setBranding(prev => ({ ...prev, isLoading: true }));
//         const formData = new FormData();
//         formData.append('video', file);
        
//         if (!creatorId) throw new Error('Missing creatorId');
//         const response = await api.post(`/content/${creatorId}/video-banner`, formData, {
//           headers: { 'Content-Type': 'multipart/form-data' }
//         });
        
//         setBranding(prev => ({ 
//           ...prev, 
//           videoBanner: file,
//           videoBannerUrl: response.data.data.videoUrl,
//           isLoading: false 
//         }));
        
//         toast({
//           title: "Video banner uploaded!",
//           description: "Your video banner has been uploaded successfully.",
//         });
//       } catch (error) {
//         setBranding(prev => ({ ...prev, isLoading: false }));
//         toast({
//           title: "Upload failed",
//           description: "Failed to upload video banner. Please try again.",
//           variant: "destructive"
//         });
//       }
//     }
//   };

//   const handleSave = async () => {
//     try {
//       setBranding(prev => ({ ...prev, isLoading: true }));
//       if (!creatorId) throw new Error('Missing creatorId');
//       await api.put(`/branding/${creatorId}`, {
//         primaryColor: branding.primaryColor,
//         secondaryColor: branding.secondaryColor,
//         font: branding.font,
//         fontFamily: branding.selectedFontFamily,
//         template: branding.template,
//         customColors: branding.customColors,
//         templateSections: branding.templateSections,
//         creatorName: branding.creatorName,
//         creatorBio: branding.creatorBio
//       });
      
//       toast({
//         title: "Branding saved!",
//         description: "Your brand customizations have been saved.",
//       });
//     } catch (error) {
//       toast({
//         title: "Save failed",
//         description: "Failed to save branding. Please try again.",
//         variant: "destructive"
//       });
//     } finally {
//       setBranding(prev => ({ ...prev, isLoading: false }));
//     }
//   };

//   const handleTemplateChange = (templateId: string) => {
//     const template = templates.find(t => t.id === templateId);
//     setBranding(prev => ({ 
//       ...prev, 
//       template: templateId,
//       templateSections: template?.sections.map(s => s.id) || []
//     }));
//   };

//   const resolveAssetUrl = (value?: string) => {
//     if (!value) return '';
//     if (value.startsWith('http')) return value;
//     if (value.startsWith('/uploads/')) {
//       const base = (api.defaults.baseURL || '').replace(/\/?:?api\/?$/, '');
//       return `${base}${value}`;
//     }
//     return value;
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar 
//         isAuthenticated={true} 
//         user={{ name: 'Alex Rodriguez', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400', isCreator: true }} 
//       />
      
//       <div className="container-custom section-padding">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="mb-8"
//         >
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <Link 
//                 to="/dashboard" 
//                 className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4 transition-colors"
//               >
//                 <ArrowLeft className="h-4 w-4 mr-2" />
//                 Back to Dashboard
//               </Link>
//               <h1 className="text-3xl font-bold text-foreground mb-2">
//                 Brand Customization
//               </h1>
//               <p className="text-muted-foreground">
//                 Customize your creator world's look and feel
//               </p>
//             </div>
//             <div className="flex space-x-3">
//               <Button variant="outline" asChild>
//                 <Link to="/creator/1">
//                   <Eye className="h-4 w-4 mr-2" />
//                   Preview
//                 </Link>
//               </Button>
//               <Button 
//                 className="btn-hero" 
//                 onClick={handleSave}
//                 disabled={branding.isLoading}
//               >
//                 <Save className="h-4 w-4 mr-2" />
//                 {branding.isLoading ? 'Saving...' : 'Save Changes'}
//               </Button>
//             </div>
//           </div>
//         </motion.div>

//         <Tabs value={activeTab} onValueChange={setActiveTab}>
//           <TabsList className="mb-8">
//             <TabsTrigger value="colors">Colors & Fonts</TabsTrigger>
//             <TabsTrigger value="media">Media & Assets</TabsTrigger>
//             <TabsTrigger value="templates">Templates</TabsTrigger>
//             {/* <TabsTrigger value="sections">Sections</TabsTrigger> */}
//           </TabsList>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             {/* Customization Panel */}
//             <motion.div
//               initial={{ opacity: 0, x: -30 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6, delay: 0.1 }}
//               className="space-y-6"
//             >
//               {/* Colors & Fonts Tab */}
//               <TabsContent value="colors">
//                 {/* Color Palette */}
//                 <Card className="card-elevated">
//                   <CardHeader>
//                     <CardTitle className="flex items-center space-x-2">
//                       <Palette className="h-5 w-5" />
//                       <span>Color Palette</span>
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-4">
//                       <Label>Choose your brand colors</Label>
//                       <div className="grid grid-cols-2 gap-3">
//                         {colorPalettes.map((palette) => (
//                           <button
//                             key={palette.name}
//                             onClick={() => handleColorChange(palette)}
//                             className={`p-3 rounded-lg border-2 transition-all ${
//                               branding.primaryColor === palette.primary
//                                 ? 'border-primary shadow-md'
//                                 : 'border-border hover:border-muted-foreground'
//                             }`}
//                           >
//                             <div className="flex space-x-2 mb-2">
//                               <div 
//                                 className="w-6 h-6 rounded-full"
//                                 style={{ backgroundColor: palette.primary }}
//                               />
//                               <div 
//                                 className="w-6 h-6 rounded-full"
//                                 style={{ backgroundColor: palette.secondary }}
//                               />
//                             </div>
//                             <p className="text-xs font-medium">{palette.name}</p>
//                           </button>
//                         ))}
//                       </div>
                      
//                       <div className="grid grid-cols-2 gap-4 pt-4">
//                         <div>
//                           <Label htmlFor="primary-color">Primary Color</Label>
//                           <div className="flex space-x-2">
//                             <Input
//                               id="primary-color"
//                               type="color"
//                               value={branding.primaryColor}
//                               onChange={(e) => setBranding(prev => ({ ...prev, primaryColor: e.target.value }))}
//                               className="w-12 h-10 p-1 border rounded"
//                             />
//                             <Input
//                               type="text"
//                               value={branding.primaryColor}
//                               onChange={(e) => setBranding(prev => ({ ...prev, primaryColor: e.target.value }))}
//                               className="flex-1"
//                             />
//                           </div>
//                         </div>
//                         <div>
//                           <Label htmlFor="secondary-color">Secondary Color</Label>
//                           <div className="flex space-x-2">
//                             <Input
//                               id="secondary-color"
//                               type="color"
//                               value={branding.secondaryColor}
//                               onChange={(e) => setBranding(prev => ({ ...prev, secondaryColor: e.target.value }))}
//                               className="w-12 h-10 p-1 border rounded"
//                             />
//                             <Input
//                               type="text"
//                               value={branding.secondaryColor}
//                               onChange={(e) => setBranding(prev => ({ ...prev, secondaryColor: e.target.value }))}
//                               className="flex-1"
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>

//                 {/* Typography */}
//                 <Card className="card-elevated">
//                   <CardHeader>
//                     <CardTitle className="flex items-center space-x-2">
//                       <Type className="h-5 w-5" />
//                       <span>Typography</span>
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-4">
//                       <Label>Creator Name</Label>
//                       <Input
//                         value={branding.creatorName}
//                         onChange={(e) => setBranding(prev => ({ ...prev, creatorName: e.target.value }))}
//                         placeholder="Enter creator name"
//                       />
//                       <Label>Creator Description</Label>
//                       <Textarea
//                         value={branding.creatorBio}
//                         onChange={(e) => setBranding(prev => ({ ...prev, creatorBio: e.target.value }))}
//                         placeholder="Describe yourself"
//                         rows={3}
//                       />
//                       <Label>Font Family</Label>
//                       <Select value={branding.font} onValueChange={(value) => setBranding(prev => ({ ...prev, font: value, selectedFontFamily: (branding.googleFonts.find((f:any)=>f.name===value)?.family) || fontOptions.find(f=>f.name===value)?.family }))}>
//                         <SelectTrigger className="w-full">
//                           <SelectValue placeholder="Choose a font" />
//                         </SelectTrigger>
//                         <SelectContent position="popper" side="bottom" align="start" className="z-[9999] max-h-60 overflow-auto">
//                           {(branding.googleFonts.length > 0 ? branding.googleFonts : fontOptions).map((font) => (
//                             <SelectItem key={font.name} value={font.name}>
//                               <span style={{ fontFamily: font.family }}>
//                                 {font.name}
//                               </span>
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                       <div className="p-4 bg-muted rounded-lg">
//                         <p 
//                           className="text-lg font-semibold mb-2"
//                           style={{ 
//                             fontFamily: branding.selectedFontFamily || fontOptions.find(f => f.name === branding.font)?.family,
//                             color: branding.primaryColor 
//                           }}
//                         >
//                           {branding.creatorName}
//                         </p>
//                         <p 
//                           className="text-sm text-muted-foreground"
//                           style={{ fontFamily: branding.selectedFontFamily || fontOptions.find(f => f.name === branding.font)?.family }}
//                         >
//                           {branding.creatorBio}
//                         </p>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//               {/* Media & Assets Tab */}
//               <TabsContent value="media">
//                 {/* Logo Upload */}
//                 <Card className="card-elevated">
//                   <CardHeader>
//                     <CardTitle className="flex items-center space-x-2">
//                       <Upload className="h-5 w-5" />
//                       <span>Logo</span>
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-4">
//                       <Label>Upload your logo</Label>
//                       <div className="border-2 border-dashed border-border rounded-lg p-6 text-center relative">
//                         <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
//                         <p className="text-sm text-muted-foreground mb-2">
//                           Click to upload or drag and drop
//                         </p>
//                         <p className="text-xs text-muted-foreground">
//                           PNG, JPG up to 50MB
//                         </p>
//                         <input
//                           type="file"
//                           accept="image/*"
//                           onChange={handleLogoUpload}
//                           className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
//                         />
//                       </div>
//                       {branding.logo && (
//                         <p className="text-sm text-green-600">
//                           ✓ {branding.logo.name} uploaded
//                         </p>
//                       )}
//                     </div>
//                   </CardContent>
//                 </Card>

//                 {/* Background Image */}
//                 <Card className="card-elevated">
//                   <CardHeader>
//                     <CardTitle className="flex items-center space-x-2">
//                       <Image className="h-5 w-5" />
//                       <span>Background Image</span>
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-4">
//                       <Label>Upload background image</Label>
//                       <div className="border-2 border-dashed border-border rounded-lg p-6 text-center relative">
//                         <Image className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
//                         <p className="text-sm text-muted-foreground mb-2">
//                           Click to upload or drag and drop
//                         </p>
//                         <p className="text-xs text-muted-foreground">
//                           PNG, JPG up to 50MB
//                         </p>
//                         <input
//                           type="file"
//                           accept="image/*"
//                           onChange={handleBackgroundImageUpload}
//                           className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
//                         />
//                       </div>
//                       {branding.backgroundImage && (
//                         <p className="text-sm text-green-600">
//                           ✓ {branding.backgroundImage.name} uploaded
//                         </p>
//                       )}
//                     </div>
//                   </CardContent>
//                 </Card>

//                 {/* Video Banner */}
//                 <Card className="card-elevated">
//                   <CardHeader>
//                     <CardTitle className="flex items-center space-x-2">
//                       <Video className="h-5 w-5" />
//                       <span>Video Banner</span>
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-4">
//                       <Label>Upload video banner</Label>
//                       <div className="border-2 border-dashed border-border rounded-lg p-6 text-center relative">
//                         <Video className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
//                         <p className="text-sm text-muted-foreground mb-2">
//                           Click to upload or drag and drop
//                         </p>
//                         <p className="text-xs text-muted-foreground">
//                           MP4, MOV up to 100MB
//                         </p>
//                         <input
//                           type="file"
//                           accept="video/*"
//                           onChange={handleVideoBannerUpload}
//                           className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
//                         />
//                       </div>
//                       {branding.videoBanner && (
//                         <p className="text-sm text-green-600">
//                           ✓ {branding.videoBanner.name} uploaded
//                         </p>
//                       )}
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//               {/* Templates Tab */}
//               <TabsContent value="templates">
//                 {/* Template Selection */}
//                 <Card className="card-elevated">
//                   <CardHeader>
//                     <CardTitle className="flex items-center space-x-2">
//                       <Layout className="h-5 w-5" />
//                       <span>Layout Template</span>
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-4">
//                       <Label>Choose your layout style</Label>
//                       <div className="grid grid-cols-1 gap-4">
//                         {templates.map((template) => (
//                           <button
//                             key={template.id}
//                             onClick={() => handleTemplateChange(template.id)}
//                             className={`p-4 rounded-lg border-2 transition-all text-left ${
//                               branding.template === template.id
//                                 ? 'border-primary shadow-md'
//                                 : 'border-border hover:border-muted-foreground'
//                             }`}
//                           >
//                             <div className="text-2xl mb-2">{template.preview}</div>
//                             <p className="font-medium mb-1">{template.name}</p>
//                             <p className="text-sm text-muted-foreground">{template.description}</p>
//                             <div className="mt-2 flex flex-wrap gap-1">
//                               {template.sections.slice(0, 3).map((section) => (
//                                 <Badge key={section.id} variant="outline" className="text-xs">
//                                   {section.name}
//                                 </Badge>
//                               ))}
//                               {template.sections.length > 3 && (
//                                 <Badge variant="outline" className="text-xs">
//                                   +{template.sections.length - 3} more
//                                 </Badge>
//                               )}
//                             </div>
//                           </button>
//                         ))}
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//               {/* Sections Tab */}
//               <TabsContent value="sections">
//                 {/* Template Sections */}
//                 <Card className="card-elevated">
//                   <CardHeader>
//                     <CardTitle className="flex items-center space-x-2">
//                       <Settings className="h-5 w-5" />
//                       <span>Template Sections</span>
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-4">
//                       <Label>Customize your page sections</Label>
//                       {templates.find(t => t.id === branding.template)?.sections.map((section) => (
//                         <div key={section.id} className="flex items-center justify-between p-3 border rounded-lg">
//                           <div className="flex items-center space-x-3">
//                             <div className={`w-3 h-3 rounded-full ${section.required ? 'bg-red-500' : 'bg-gray-300'}`} />
//                             <div>
//                               <p className="font-medium">{section.name}</p>
//                               <p className="text-sm text-muted-foreground">
//                                 {section.required ? 'Required section' : 'Optional section'}
//                               </p>
//                             </div>
//                           </div>
//                           <Badge variant={section.required ? 'destructive' : 'secondary'}>
//                             {section.required ? 'Required' : 'Optional'}
//                           </Badge>
//                         </div>
//                       ))}
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//             </motion.div>

//           {/* Live Preview */}
//           <motion.div
//             initial={{ opacity: 0, x: 30 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="sticky top-8"
//           >
//             <Card className="card-elevated">
//               <CardHeader>
//                 <CardTitle>Live Preview</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div 
//                   className="aspect-video rounded-lg p-6 overflow-hidden"
//                   style={{
//                     background: branding.backgroundImageUrl 
//                       ? `url(${resolveAssetUrl(branding.backgroundImageUrl as any)}) center/cover no-repeat`
//                       : `linear-gradient(135deg, ${branding.primaryColor}20, ${branding.secondaryColor}20)`
//                   }}
//                 >
//                   <div className="text-center space-y-4">
//                     {/* Logo / Avatar */}
//                     {branding.logoUrl ? (
//                       <img
//                         src={resolveAssetUrl(branding.logoUrl as any)}
//                         alt="Logo"
//                         className="w-16 h-16 rounded-full mx-auto border-4 object-cover"
//                         style={{ borderColor: branding.primaryColor }}
//                       />
//                     ) : (
//                       <div 
//                         className="w-16 h-16 rounded-full mx-auto border-4"
//                         style={{ 
//                           backgroundColor: branding.primaryColor,
//                           borderColor: branding.primaryColor
//                         }}
//                       />
//                     )}
                    
//                     {/* Creator name */}
//                     <h3 
//                       className="text-xl font-bold"
//                       style={{ 
//                         fontFamily: branding.selectedFontFamily || fontOptions.find(f => f.name === branding.font)?.family,
//                         color: branding.primaryColor
//                       }}
//                     >
//                       {branding.creatorName}
//                     </h3>
                    
//                     {/* Description */}
//                     <p 
//                       className="text-sm text-muted-foreground"
//                       style={{ fontFamily: branding.selectedFontFamily || fontOptions.find(f => f.name === branding.font)?.family }}
//                     >
//                       {branding.creatorBio}
//                     </p>
                    
//                     {/* CTA Button */}
//                     <button
//                       className="px-6 py-2 rounded-lg text-white font-medium text-sm"
//                       style={{ backgroundColor: branding.primaryColor }}
//                     >
//                       Follow Creator
//                     </button>
//                   </div>
//                 </div>
                
//                 <div className="mt-4 text-xs text-muted-foreground">
//                   * This is a preview of how your creator world will look
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>
//           </div>
//         </Tabs>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, Palette, Type, Layout, Eye, Image, Video, Settings, Save, X } from 'lucide-react';

const colorPalettes = [
  { name: 'Purple Gradient', primary: '#8B5CF6', secondary: '#F3E8FF' },
  { name: 'Blue Ocean', primary: '#3B82F6', secondary: '#EBF8FF' },
  { name: 'Green Forest', primary: '#10B981', secondary: '#D1FAE5' },
  { name: 'Pink Sunset', primary: '#EC4899', secondary: '#FCE7F3' },
  { name: 'Orange Fire', primary: '#F59E0B', secondary: '#FEF3C7' },
  { name: 'Red Passion', primary: '#EF4444', secondary: '#FEE2E2' }
];

const fontOptions = [
  { name: 'Inter', family: 'Inter, sans-serif' },
  { name: 'Roboto', family: 'Roboto, sans-serif' },
  { name: 'Open Sans', family: 'Open Sans, sans-serif' },
  { name: 'Montserrat', family: 'Montserrat, sans-serif' },
  { name: 'Poppins', family: 'Poppins, sans-serif' },
  { name: 'Lato', family: 'Lato, sans-serif' },
  { name: 'Source Sans Pro', family: 'Source Sans Pro, sans-serif' },
  { name: 'Nunito', family: 'Nunito, sans-serif' }
];

const templates = [
  { 
    id: 'modern', 
    name: 'Modern', 
    preview: '🎨 Clean & Minimal',
    description: 'Clean & Minimal design'
  },
  { 
    id: 'classic', 
    name: 'Classic', 
    preview: '📜 Traditional & Elegant',
    description: 'Traditional & Elegant design'
  },
  { 
    id: 'creative', 
    name: 'Creative', 
    preview: '🎭 Bold & Artistic',
    description: 'Bold & Artistic design'
  }
];

// Resolve local upload paths (e.g. /uploads/...) to absolute URLs using backend base
function resolveAssetUrl(value?: string) {
  if (!value) return '';
  if (value.startsWith('http') || value.startsWith('data:')) return value;
  if (value.startsWith('/uploads/')) {
    const base = (api.defaults.baseURL || '').replace(/\/?api\/?$/, '');
    return `${base}${value}`;
  }
  return value;
}

export default function BrandingPage() {
  const [branding, setBranding] = useState({
    primaryColor: '#8B5CF6',
    secondaryColor: '#F3E8FF',
    font: 'Inter',
    template: 'modern',
    creatorName: 'Your Creator Name',
    creatorBio: 'Independent creator bio',
    logoPreview: null,
    backgroundPreview: null,
    videoPreview: null,
  });
  const [activeTab, setActiveTab] = useState('colors');
  const [fontDropdownOpen, setFontDropdownOpen] = useState(false);

  const handleColorChange = (palette) => {
    setBranding(prev => ({
      ...prev,
      primaryColor: palette.primary,
      secondaryColor: palette.secondary
    }));
  };

  const handleFileUpload = (type, event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBranding(prev => ({ 
          ...prev, 
          [`${type}Preview`]: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeFile = (type) => {
        setBranding(prev => ({ 
          ...prev, 
      [`${type}Preview`]: null
    }));
  };

  const selectedFont = fontOptions.find(f => f.name === branding.font);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Dashboard
              </button>
            </div>
            <div className="flex space-x-3">
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </button>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Brand Customization
              </h1>
          <p className="text-gray-600">
                Customize your creator world's look and feel
              </p>
        </motion.div>

        {/* Brand Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Brand</CardTitle>
          </CardHeader>
          <CardContent>
              <div className="flex items-center gap-4">
                  {branding.logoPreview ? (
                  <img  
                      src={branding.logoPreview as any}
                  alt="Logo"
                  className="w-16 h-16 rounded-full object-cover border"
                  style={{ borderColor: branding.primaryColor }}
                />
              ) : (
                <div
                  className="w-16 h-16 rounded-full border"
                  style={{ backgroundColor: branding.primaryColor, borderColor: branding.primaryColor }}
                />
              )}
              <div className="flex-1">
                <div className="text-lg font-semibold" style={{ color: branding.primaryColor }}>
                  {branding.creatorName}
            </div>
                <div className="text-sm text-muted-foreground line-clamp-2">{branding.creatorBio}</div>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="text-xs px-2 py-1 rounded border">Template: {branding.template}</span>
                  <span className="text-xs px-2 py-1 rounded border">Font: {branding.font}</span>
                  <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded border">
                    <span className="w-3 h-3 rounded" style={{ backgroundColor: branding.primaryColor }} />
                    Primary
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded border">
                    <span className="w-3 h-3 rounded" style={{ backgroundColor: branding.secondaryColor }} />
                    Secondary
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {['colors', 'media', 'templates'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'border-purple-600 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab === 'colors' ? 'Colors & Fonts' : tab === 'media' ? 'Media & Assets' : 'Templates'}
                </button>
              ))}
            </nav>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Customization */}
          <div className="space-y-6">
            {/* Colors Tab */}
            {activeTab === 'colors' && (
              <>
                {/* Color Palette */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Palette className="h-5 w-5 text-purple-600" />
                    <h3 className="text-lg font-semibold">Color Palette</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Choose your brand colors</p>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                        {colorPalettes.map((palette) => (
                          <button
                            key={palette.name}
                            onClick={() => handleColorChange(palette)}
                            className={`p-3 rounded-lg border-2 transition-all ${
                              branding.primaryColor === palette.primary
                            ? 'border-purple-600 shadow-md'
                            : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="flex space-x-2 mb-2">
                              <div 
                                className="w-6 h-6 rounded-full"
                                style={{ backgroundColor: palette.primary }}
                              />
                              <div 
                                className="w-6 h-6 rounded-full"
                                style={{ backgroundColor: palette.secondary }}
                              />
                            </div>
                        <p className="text-xs font-medium text-gray-700">{palette.name}</p>
                          </button>
                        ))}
                      </div>
                      
                  <div className="grid grid-cols-2 gap-4">
                        <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
                          <div className="flex space-x-2">
                        <input
                              type="color"
                              value={branding.primaryColor}
                              onChange={(e) => setBranding(prev => ({ ...prev, primaryColor: e.target.value }))}
                          className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
                            />
                        <input
                              type="text"
                              value={branding.primaryColor}
                              onChange={(e) => setBranding(prev => ({ ...prev, primaryColor: e.target.value }))}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            />
                          </div>
                        </div>
                        <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Color</label>
                          <div className="flex space-x-2">
                        <input
                              type="color"
                              value={branding.secondaryColor}
                              onChange={(e) => setBranding(prev => ({ ...prev, secondaryColor: e.target.value }))}
                          className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
                            />
                        <input
                              type="text"
                              value={branding.secondaryColor}
                              onChange={(e) => setBranding(prev => ({ ...prev, secondaryColor: e.target.value }))}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                {/* Typography */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Type className="h-5 w-5 text-purple-600" />
                    <h3 className="text-lg font-semibold">Typography</h3>
                  </div>
                    <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Creator Name</label>
                      <input
                        type="text"
                        value={branding.creatorName}
                        onChange={(e) => setBranding(prev => ({ ...prev, creatorName: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        placeholder="Enter creator name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Creator Description</label>
                      <textarea
                        value={branding.creatorBio}
                        onChange={(e) => setBranding(prev => ({ ...prev, creatorBio: e.target.value }))}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        placeholder="Describe yourself"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Font Family</label>
                      <div className="relative">
                        <button
                          onClick={() => setFontDropdownOpen(!fontDropdownOpen)}
                          className="w-full px-3 py-2 text-left border border-gray-300 rounded-lg bg-white hover:bg-gray-50 focus:ring-2 focus:ring-purple-600 focus:border-transparent flex items-center justify-between"
                        >
                          <span style={{ fontFamily: selectedFont?.family }}>{branding.font}</span>
                          <svg className="h-5 w-5 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M19 9l-7 7-7-7"></path>
                          </svg>
                        </button>
                        {fontDropdownOpen && (
                          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                            {fontOptions.map((font) => (
                              <button
                                key={font.name}
                                onClick={() => {
                                  setBranding(prev => ({ ...prev, font: font.name }));
                                  setFontDropdownOpen(false);
                                }}
                                className="w-full px-3 py-2 text-left hover:bg-purple-50 transition-colors"
                                style={{ fontFamily: font.family }}
                              >
                                {font.name}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <p 
                          className="text-lg font-semibold mb-2"
                          style={{ 
                          fontFamily: selectedFont?.family,
                            color: branding.primaryColor 
                          }}
                        >
                        {branding.creatorName}
                        </p>
                        <p 
                        className="text-sm text-gray-600"
                        style={{ fontFamily: selectedFont?.family }}
                        >
                        {branding.creatorBio}
                        </p>
                      </div>
                    </div>
                </div>
              </>
            )}

            {/* Media Tab */}
            {activeTab === 'media' && (
              <>
                {/* Logo Upload */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Upload className="h-5 w-5 text-purple-600" />
                    <h3 className="text-lg font-semibold">Logo</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Upload your logo</p>
                  {branding.logoPreview ? (
                    <div className="relative">
                      <img src={branding.logoPreview} alt="Logo" className="w-full h-32 object-cover rounded-lg" />
                      <button
                        onClick={() => removeFile('logo')}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center relative hover:border-purple-400 transition-colors">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-1">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500">PNG, JPG up to 50MB</p>
                        <input
                          type="file"
                          accept="image/*"
                        onChange={(e) => handleFileUpload('logo', e)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                      )}
                    </div>

                {/* Background Image */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Image className="h-5 w-5 text-purple-600" />
                    <h3 className="text-lg font-semibold">Background Image</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Upload background image</p>
                  {branding.backgroundPreview ? (
                    <div className="relative">
                      <img src={branding.backgroundPreview} alt="Background" className="w-full h-48 object-cover rounded-lg" />
                      <button
                        onClick={() => removeFile('background')}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center relative hover:border-purple-400 transition-colors">
                      <Image className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-1">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500">PNG, JPG up to 50MB</p>
                        <input
                          type="file"
                          accept="image/*"
                        onChange={(e) => handleFileUpload('background', e)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                      )}
                    </div>

                {/* Video Banner */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Video className="h-5 w-5 text-purple-600" />
                    <h3 className="text-lg font-semibold">Video Banner</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Upload video banner</p>
                  {branding.videoPreview ? (
                    <div className="relative">
                      <video src={branding.videoPreview} controls className="w-full h-48 rounded-lg bg-black" />
                      <button
                        onClick={() => removeFile('video')}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center relative hover:border-purple-400 transition-colors">
                      <Video className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-1">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500">MP4, MOV up to 100MB</p>
                        <input
                          type="file"
                          accept="video/*"
                        onChange={(e) => handleFileUpload('video', e)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                      )}
                    </div>
              </>
            )}

              {/* Templates Tab */}
            {activeTab === 'templates' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Layout className="h-5 w-5 text-purple-600" />
                  <h3 className="text-lg font-semibold">Layout Template</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">Choose your layout style</p>
                <div className="space-y-3">
                        {templates.map((template) => (
                          <button
                            key={template.id}
                      onClick={() => setBranding(prev => ({ ...prev, template: template.id }))}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                              branding.template === template.id
                          ? 'border-purple-600 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="text-2xl mb-2">{template.preview}</div>
                      <p className="font-medium text-gray-900 mb-1">{template.name}</p>
                      <p className="text-sm text-gray-600">{template.description}</p>
                          </button>
                        ))}
                      </div>
                    </div>
            )}
                            </div>

          {/* Right Panel - Live Preview */}
          <div className="sticky top-8">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold">Live Preview</h3>
              </div>
              <div className="p-6">
                <div 
                  className="aspect-video rounded-lg p-6 overflow-hidden relative"
                  style={{
                    background: branding.backgroundPreview 
                      ? `url(${branding.backgroundPreview}) center/cover no-repeat`
                      : `linear-gradient(135deg, ${branding.primaryColor}20, ${branding.secondaryColor}20)`
                  }}
                >
                  {branding.videoPreview && (
                    <video 
                      src={branding.videoPreview} 
                      autoPlay 
                      loop 
                      muted 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                  <div className="relative z-10 text-center space-y-4">
                    {branding.logoPreview ? (
                      <img
                        src={branding.logoPreview}
                        alt="Logo"
                        className="w-16 h-16 rounded-full mx-auto border-4 object-cover"
                        style={{ borderColor: branding.primaryColor }}
                      />
                    ) : (
                    <div 
                      className="w-16 h-16 rounded-full mx-auto border-4"
                      style={{ 
                        backgroundColor: branding.primaryColor,
                        borderColor: branding.primaryColor
                      }}
                    />
                    )}
                    
                    <h3 
                      className="text-xl font-bold"
                      style={{ 
                        fontFamily: selectedFont?.family,
                        color: branding.primaryColor
                      }}
                    >
                      {branding.creatorName}
                    </h3>
                    
                    <p 
                      className="text-sm text-gray-600"
                      style={{ fontFamily: selectedFont?.family }}
                    >
                      {branding.creatorBio}
                    </p>
                    
                    <button
                      className="px-6 py-2 rounded-lg text-white font-medium text-sm transition-all hover:opacity-90"
                      style={{ backgroundColor: branding.primaryColor }}
                    >
                      Follow Creator
                    </button>
                  </div>
                </div>
                
                <p className="mt-4 text-xs text-gray-500">
                  * This is a preview of how your creator world will look
                </p>
                </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}