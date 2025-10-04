import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import api from '@/lib/axios';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, Palette, Type, Layout, Eye, Image, Video, Save, X, Loader2 } from 'lucide-react';

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
  // Get auth user info
  const authUser = (() => {
    try {
      const raw = localStorage.getItem('auth_user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  })();

  const creatorId = authUser?.id;

  const [brands, setBrands] = useState([]);
  const [currentBrandId, setCurrentBrandId] = useState(null);
  const [branding, setBranding] = useState({
    primaryColor: '#8B5CF6',
    secondaryColor: '#F3E8FF',
    font: 'Inter',
    template: 'modern',
    creatorName: 'Your Creator Name',
    creatorBio: 'Independent creator bio',
    logoPreview: '',
    backgroundPreview: '',
    videoPreview: '',
    logoUrl: '',
    backgroundImageUrl: '',
    videoBannerUrl: '',
  });
  const [activeTab, setActiveTab] = useState('colors');
  const [fontDropdownOpen, setFontDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);
  const [userHasTyped, setUserHasTyped] = useState(false);
  const [showCreateBrand, setShowCreateBrand] = useState(false);
  const [newBrandName, setNewBrandName] = useState('');
  const [newBrandDescription, setNewBrandDescription] = useState('');
  const { toast } = useToast();

  // Load brands and default branding when component mounts
  useEffect(() => {
    const loadBrandsData = async () => {
      if (!creatorId || userHasTyped) return;
      
      try {
        setIsLoading(true);
        
        // Load all brands
        const brandsResponse = await api.get(`/branding/${creatorId}`);
        const brandsData = brandsResponse.data.data || [];
        setBrands(brandsData);
        
        // If there are brands, load the default one
        if (brandsData.length > 0) {
          try {
            const defaultResponse = await api.get(`/branding/${creatorId}/default`);
            const defaultData = defaultResponse.data.data;
            
            if (defaultData) {
              setCurrentBrandId(defaultData._id);
              setBranding(prev => ({
                ...prev,
                // Colors
                primaryColor: defaultData.primaryColor || '#8B5CF6',
                secondaryColor: defaultData.secondaryColor || '#F3E8FF',
                
                // Typography
                font: defaultData.font || 'Inter',
                
                // Template
                template: defaultData.template || 'modern',
                
                // Media URLs
                logoUrl: defaultData.logo || '',
                backgroundImageUrl: defaultData.backgroundImage || '',
                videoBannerUrl: defaultData.videoBanner || '',
                
                // Preview images (for immediate display)
                logoPreview: defaultData.logo ? resolveAssetUrl(defaultData.logo) : '',
                backgroundPreview: defaultData.backgroundImage ? resolveAssetUrl(defaultData.backgroundImage) : '',
                videoPreview: defaultData.videoBanner ? resolveAssetUrl(defaultData.videoBanner) : '',
                
                // Brand info (use brand's name and description for customization)
                creatorName: defaultData.name || defaultData.creatorName || authUser?.name || prev.creatorName,
                creatorBio: defaultData.description || defaultData.creatorBio || authUser?.bio || prev.creatorBio,
              }));
            } else {
              // If no default brand, use the first brand
              const firstBrand = brandsData[0];
              setCurrentBrandId(firstBrand._id);
              setBranding(prev => ({
                ...prev,
                primaryColor: firstBrand.primaryColor || '#8B5CF6',
                secondaryColor: firstBrand.secondaryColor || '#F3E8FF',
                font: firstBrand.font || 'Inter',
                template: firstBrand.template || 'modern',
                logoUrl: firstBrand.logo || '',
                backgroundImageUrl: firstBrand.backgroundImage || '',
                videoBannerUrl: firstBrand.videoBanner || '',
                logoPreview: firstBrand.logo ? resolveAssetUrl(firstBrand.logo) : '',
                backgroundPreview: firstBrand.backgroundImage ? resolveAssetUrl(firstBrand.backgroundImage) : '',
                videoPreview: firstBrand.videoBanner ? resolveAssetUrl(firstBrand.videoBanner) : '',
                creatorName: firstBrand.name || authUser?.name || prev.creatorName,
                creatorBio: firstBrand.description || authUser?.bio || prev.creatorBio,
              }));
            }
          } catch (defaultError) {
            console.error('Failed to load default branding:', defaultError);
            // Use the first brand if default fails
            const firstBrand = brandsData[0];
            if (firstBrand) {
              setCurrentBrandId(firstBrand._id);
              setBranding(prev => ({
                ...prev,
                primaryColor: firstBrand.primaryColor || '#8B5CF6',
                secondaryColor: firstBrand.secondaryColor || '#F3E8FF',
                font: firstBrand.font || 'Inter',
                template: firstBrand.template || 'modern',
                logoUrl: firstBrand.logo || '',
                backgroundImageUrl: firstBrand.backgroundImage || '',
                videoBannerUrl: firstBrand.videoBanner || '',
                logoPreview: firstBrand.logo ? resolveAssetUrl(firstBrand.logo) : '',
                backgroundPreview: firstBrand.backgroundImage ? resolveAssetUrl(firstBrand.backgroundImage) : '',
                videoPreview: firstBrand.videoBanner ? resolveAssetUrl(firstBrand.videoBanner) : '',
                creatorName: firstBrand.name || authUser?.name || prev.creatorName,
                creatorBio: firstBrand.description || authUser?.bio || prev.creatorBio,
              }));
            }
          }
        } else {
          // No brands exist, use defaults
          console.log('No brands found, using default values');
        }
    } catch (error) {
        console.error('Failed to load brands data:', error);
        // Use defaults on error, which are already set in useState
      } finally {
        setIsLoading(false);
        setInitialDataLoaded(true);
      }
    };

    loadBrandsData();
  }, [creatorId, userHasTyped]);

  const handleColorChange = (palette) => {
    setBranding(prev => ({
      ...prev,
      primaryColor: palette.primary,
      secondaryColor: palette.secondary
    }));
  };

  const handleFileUpload = async (type, event) => {
    const file = event.target.files?.[0];
    if (!file || !creatorId) return;

      try {
      setIsLoading(true);
        const formData = new FormData();
        
      let apiResponse;
      if (type === 'logo') {
        formData.append('logo', file);
        apiResponse = await api.post(`/branding/${creatorId}/${currentBrandId}/logo`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else if (type === 'background') {
        formData.append('image', file);
        apiResponse = await api.post(`/branding/${creatorId}/${currentBrandId}/background`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else if (type === 'video') {
        formData.append('video', file);
        apiResponse = await api.post(`/branding/${creatorId}/${currentBrandId}/video-banner`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      // Create preview from file
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'logo') {
        setBranding(prev => ({ 
          ...prev, 
            logoUrl: apiResponse?.data.data.logoUrl || '',
            logoPreview: reader.result as string
          }));
        } else if (type === 'background') {
          setBranding(prev => ({ 
            ...prev, 
            backgroundImageUrl: apiResponse?.data.data.imageUrl || '',
            backgroundPreview: reader.result as string
          }));
        } else if (type === 'video') {
          setBranding(prev => ({ 
            ...prev, 
            videoBannerUrl: apiResponse?.data.data.videoUrl || '',
            videoPreview: reader.result as string
          }));
        }
      };
      reader.readAsDataURL(file);
        
        toast({
        title: "Upload successful!",
        description: `${type.charAt(0).toUpperCase() + type.slice(1)} uploaded successfully.`,
        });
      } catch (error) {
      console.error(`${type} upload failed:`, error);
        toast({
          title: "Upload failed",
        description: `Failed to upload ${type}. Please try again.`,
          variant: "destructive"
        });
    } finally {
      setIsLoading(false);
    }
  };

  const removeFile = async (type) => {
    if (!creatorId || !currentBrandId) return;
    
    try {
      setIsLoading(true);
      
      // Update the brand in the database to remove the media
      const updateData: { logo?: null; backgroundImage?: null; videoBanner?: null } = {};
      if (type === 'logo') {
        updateData.logo = null;
      } else if (type === 'background') {
        updateData.backgroundImage = null;
      } else if (type === 'video') {
        updateData.videoBanner = null;
      }
      
      await api.put(`/branding/${creatorId}/${currentBrandId}`, updateData);
      
      // Update local state
      setBranding(prev => ({ 
        ...prev, 
        [`${type}Url`]: '',
        [`${type}Preview`]: ''
      }));
      
      toast({
        title: "Media removed!",
        description: `${type.charAt(0).toUpperCase() + type.slice(1)} has been removed from this brand.`,
      });
    } catch (error) {
      console.error(`Failed to remove ${type}:`, error);
      toast({
        title: "Error",
        description: `Failed to remove ${type}. Please try again.`,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Switch to a different brand
  const handleBrandSwitch = async (brandId) => {
    try {
      setIsLoading(true);
      const response = await api.get(`/branding/${creatorId}/${brandId}`);
      const brandData = response.data.data;
      
      setCurrentBrandId(brandId);
        setBranding(prev => ({ 
          ...prev, 
        // Colors
        primaryColor: brandData.primaryColor || '#8B5CF6',
        secondaryColor: brandData.secondaryColor || '#F3E8FF',
        
        // Typography
        font: brandData.font || 'Inter',
        
        // Template
        template: brandData.template || 'modern',
        
        // Media URLs
        logoUrl: brandData.logo || '',
        backgroundImageUrl: brandData.backgroundImage || '',
        videoBannerUrl: brandData.videoBanner || '',
        
        // Preview images (for immediate display)
        logoPreview: brandData.logo ? resolveAssetUrl(brandData.logo) : '',
        backgroundPreview: brandData.backgroundImage ? resolveAssetUrl(brandData.backgroundImage) : '',
        videoPreview: brandData.videoBanner ? resolveAssetUrl(brandData.videoBanner) : '',
        
        // Brand info (use brand's name and description for customization)
        creatorName: brandData.name || brandData.creatorName || authUser?.name || prev.creatorName,
        creatorBio: brandData.description || brandData.creatorBio || authUser?.bio || prev.creatorBio,
        }));
        
        toast({
        title: "Brand switched!",
        description: `Now editing ${brandData.name} - all settings loaded`,
        });
      } catch (error) {
      console.error('Failed to switch brand:', error);
        toast({
        title: "Error",
        description: "Failed to switch brand. Please try again.",
          variant: "destructive"
        });
    } finally {
      setIsLoading(false);
    }
  };

  // Create new brand
  const handleCreateBrand = async () => {
    if (!newBrandName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a brand name",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsLoading(true);
      const response = await api.post(`/branding/${creatorId}`, {
        name: newBrandName,
        description: newBrandDescription,
        primaryColor: branding.primaryColor,
        secondaryColor: branding.secondaryColor,
        font: branding.font,
        template: branding.template,
        logo: branding.logoUrl,
        backgroundImage: branding.backgroundImageUrl,
        videoBanner: branding.videoBannerUrl
      });

      const newBrand = response.data.data;
      setBrands(prev => [...prev, newBrand]);
      setCurrentBrandId(newBrand._id);
      
      // Switch to the new brand immediately
      await handleBrandSwitch(newBrand._id);
      
      setNewBrandName('');
      setNewBrandDescription('');
      setShowCreateBrand(false);
      
      toast({
        title: "Brand created!",
        description: `${newBrand.name} has been created and is now active.`,
      });
    } catch (error) {
      console.error('Failed to create brand:', error);
      toast({
        title: "Error",
        description: "Failed to create brand. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Set default brand
  const handleSetDefault = async (brandId) => {
    try {
      setIsLoading(true);
      await api.put(`/branding/${creatorId}/${brandId}/default`);
      
      // Update local state
      setBrands(prev => prev.map(brand => ({
        ...brand,
        isDefault: brand._id === brandId
      })));
        
        toast({
        title: "Default set!",
        description: "Default brand has been updated.",
        });
      } catch (error) {
      console.error('Failed to set default brand:', error);
        toast({
        title: "Error",
        description: "Failed to set default brand. Please try again.",
          variant: "destructive"
        });
    } finally {
      setIsLoading(false);
    }
  };

  // Delete brand
  const handleDeleteBrand = async (brandId) => {
    if (brands.length <= 1) {
      toast({
        title: "Cannot delete",
        description: "You must have at least one brand.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsLoading(true);
      await api.delete(`/branding/${creatorId}/${brandId}`);
      
      setBrands(prev => prev.filter(brand => brand._id !== brandId));
      
      // Switch to default brand if current brand was deleted
      if (currentBrandId === brandId) {
        const defaultBrand = brands.find(brand => brand._id !== brandId);
        if (defaultBrand) {
          await handleBrandSwitch(defaultBrand._id);
        }
      }
      
      toast({
        title: "Brand deleted!",
        description: "Brand has been deleted successfully.",
      });
    } catch (error) {
      console.error('Failed to delete brand:', error);
      toast({
        title: "Error",
        description: "Failed to delete brand. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Save branding changes
  const handleSave = async () => {
    if (!creatorId || !currentBrandId) {
      toast({
        title: "Error",
        description: "User not authenticated or no brand selected",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsLoading(true);
      await api.put(`/branding/${creatorId}/${currentBrandId}`, {
        primaryColor: branding.primaryColor,
        secondaryColor: branding.secondaryColor,
        font: branding.font,
        template: branding.template,
        name: branding.creatorName, // Save as brand name
        description: branding.creatorBio, // Save as brand description
        logo: branding.logoUrl,
        backgroundImage: branding.backgroundImageUrl,
        videoBanner: branding.videoBannerUrl
      });
      
      toast({
        title: "Success!",
        description: "Your branding settings have been saved successfully.",
      });
    } catch (error) {
      console.error('Failed to save branding:', error);
      toast({
        title: "Error",
        description: "Failed to save branding settings. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
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
              <button 
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center disabled:opacity-50"
                onClick={handleSave}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title and Brand Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Brand Customization
                {currentBrandId && brands.find(b => b._id === currentBrandId) && (
                  <span className="text-lg font-normal text-purple-600 ml-2">
                    - {brands.find(b => b._id === currentBrandId).name}
                  </span>
                )}
              </h1>
              <p className="text-gray-600">
                Create and manage multiple brand identities
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowCreateBrand(true)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
              >
                <span className="mr-2">+</span>
                Create New Brand
              </button>
            </div>
          </div>

          {/* Brand Selector */}
          {brands.length > 0 && (
            <div className="bg-white rounded-lg p-4 mb-6 border">
              <h3 className="text-lg font-semibold mb-3">Your Brands</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {brands.map((brand) => (
                  <div
                    key={brand._id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      currentBrandId === brand._id
                        ? 'border-purple-600 bg-purple-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                    } ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
                    onClick={() => !isLoading && handleBrandSwitch(brand._id)}
                  >
                    {/* Brand Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-gray-900">{brand.name}</h4>
                        {isLoading && currentBrandId === brand._id && (
                          <Loader2 className="h-4 w-4 animate-spin text-purple-600" />
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSetDefault(brand._id);
                          }}
                          className="p-1 text-gray-400 hover:text-green-600"
                          title="Set as default"
                        >
                          ⭐
                        </button>
                        {brands.length > 1 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteBrand(brand._id);
                            }}
                            className="p-1 text-gray-400 hover:text-red-600"
                            title="Delete brand"
                          >
                            🗑️
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Brand Description */}
                    <p className="text-sm text-gray-600 mb-3">{brand.description}</p>

                    {/* Brand Media Preview */}
                    <div className="flex items-center gap-2 mb-3">
                      {/* Logo Preview */}
                      <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center overflow-hidden"
                           style={{ borderColor: brand.primaryColor || '#8B5CF6' }}>
                        {brand.logo ? (
                          <img 
                            src={resolveAssetUrl(brand.logo)} 
                            alt="Logo" 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div 
                            className="w-full h-full rounded-full"
                            style={{ backgroundColor: brand.primaryColor || '#8B5CF6' }}
                          />
                        )}
                      </div>

                      {/* Background Preview */}
                      <div className="w-8 h-8 rounded border flex items-center justify-center overflow-hidden">
                        {brand.backgroundImage ? (
                          <img 
                            src={resolveAssetUrl(brand.backgroundImage)} 
                            alt="Background" 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div 
                            className="w-full h-full"
                            style={{ 
                              background: `linear-gradient(135deg, ${brand.primaryColor || '#8B5CF6'}20, ${brand.secondaryColor || '#F3E8FF'}20)` 
                            }}
                          />
                        )}
                      </div>

                      {/* Video Preview */}
                      <div className="w-8 h-8 rounded border flex items-center justify-center overflow-hidden">
                        {brand.videoBanner ? (
                          <div className="w-full h-full bg-black flex items-center justify-center">
                            <Video className="h-4 w-4 text-white" />
                          </div>
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                            <Video className="h-3 w-3 text-gray-400" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Brand Info */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {brand.isDefault && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                            Default
                          </span>
                        )}
                        <span className="text-xs px-2 py-1 rounded border" style={{ color: brand.primaryColor || '#8B5CF6' }}>
                          {brand.template || 'modern'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: brand.primaryColor || '#8B5CF6' }}
                        />
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: brand.secondaryColor || '#F3E8FF' }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Create Brand Modal */}
          {showCreateBrand && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h3 className="text-lg font-semibold mb-4">Create New Brand</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Brand Name</label>
                    <input
                      type="text"
                      value={newBrandName}
                      onChange={(e) => setNewBrandName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Enter brand name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={newBrandDescription}
                      onChange={(e) => setNewBrandDescription(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      rows={3}
                      placeholder="Enter brand description"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-6">
                  <button
                    onClick={handleCreateBrand}
                    disabled={isLoading}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
                  >
                    {isLoading ? 'Creating...' : 'Create Brand'}
                  </button>
                  <button
                    onClick={() => setShowCreateBrand(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {!initialDataLoaded && (
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading your brands...
            </div>
          )}
        </motion.div>

        {/* Brand Summary */}
        <Card className="mb-8">
                  <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Your Brand
              {currentBrandId && (
                <span className="text-sm font-normal text-gray-500">
                  - {brands.find(b => b._id === currentBrandId)?.name || 'Loading...'}
                </span>
              )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
              <div className="flex items-center gap-4">
                  {branding.logoUrl || branding.logoPreview ? (
                  <img  
                      src={resolveAssetUrl(branding.logoUrl) || branding.logoPreview}
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
                              onChange={(e) => {
                                setUserHasTyped(true);
                                setBranding(prev => ({ ...prev, primaryColor: e.target.value }));
                              }}
                          className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
                            />
                        <input
                              type="text"
                              value={branding.primaryColor}
                              onChange={(e) => {
                                setUserHasTyped(true);
                                setBranding(prev => ({ ...prev, primaryColor: e.target.value }));
                              }}
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
                              onChange={(e) => {
                                setUserHasTyped(true);
                                setBranding(prev => ({ ...prev, secondaryColor: e.target.value }));
                              }}
                          className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
                            />
                        <input
                              type="text"
                              value={branding.secondaryColor}
                              onChange={(e) => {
                                setUserHasTyped(true);
                                setBranding(prev => ({ ...prev, secondaryColor: e.target.value }));
                              }}
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">Brand Name</label>
                      <input
                        type="text"
                        value={branding.creatorName}
                        onChange={(e) => {
                          setUserHasTyped(true);
                          setBranding(prev => ({ ...prev, creatorName: e.target.value }));
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        placeholder="Enter brand name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Brand Description</label>
                      <textarea
                        value={branding.creatorBio}
                        onChange={(e) => {
                          setUserHasTyped(true);
                          setBranding(prev => ({ ...prev, creatorBio: e.target.value }));
                        }}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        placeholder="Describe your brand"
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
                    {currentBrandId && brands.find(b => b._id === currentBrandId) && (
                      <span className="text-sm text-purple-600 bg-purple-100 px-2 py-1 rounded">
                        for {brands.find(b => b._id === currentBrandId).name}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Upload logo for this specific brand</p>
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
                    {currentBrandId && brands.find(b => b._id === currentBrandId) && (
                      <span className="text-sm text-purple-600 bg-purple-100 px-2 py-1 rounded">
                        for {brands.find(b => b._id === currentBrandId).name}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Upload background image for this specific brand</p>
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
                    {currentBrandId && brands.find(b => b._id === currentBrandId) && (
                      <span className="text-sm text-purple-600 bg-purple-100 px-2 py-1 rounded">
                        for {brands.find(b => b._id === currentBrandId).name}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Upload video banner for this specific brand</p>
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
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Live Preview</h3>
                  {currentBrandId && brands.find(b => b._id === currentBrandId) && (
                    <span className="text-sm text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                      {brands.find(b => b._id === currentBrandId).name}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1">Preview of the selected brand</p>
              </div>
              <div className="p-6">
                <div 
                  className="aspect-video rounded-lg p-6 overflow-hidden relative"
                  style={{
                    background: (branding.backgroundPreview || branding.backgroundImageUrl) 
                      ? `url(${branding.backgroundPreview || resolveAssetUrl(branding.backgroundImageUrl)}) center/cover no-repeat`
                      : `linear-gradient(135deg, ${branding.primaryColor}20, ${branding.secondaryColor}20)`
                  }}
                >
                  {(branding.videoPreview || branding.videoBannerUrl) && (
                    <video 
                      src={branding.videoPreview || resolveAssetUrl(branding.videoBannerUrl)} 
                      autoPlay 
                      loop 
                      muted 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                  <div className="relative z-10 text-center space-y-4">
                    {(branding.logoPreview || branding.logoUrl) ? (
                      <img
                        src={branding.logoPreview || resolveAssetUrl(branding.logoUrl)}
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