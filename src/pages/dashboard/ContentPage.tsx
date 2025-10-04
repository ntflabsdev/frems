import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Upload, Plus, Package, Image, Video, Music, FileText, Edit, Trash2, Eye, Download, Share2, BarChart3, TrendingUp, Users, DollarSign, X } from 'lucide-react';
import api from '@/lib/axios';

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  type: string;
  status: string;
  downloads?: number;
  image?: string;
};

type MediaItem = {
  originalName: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  uploadedAt: string | Date;
  product?: string | { _id: string } | null;
};

export default function ContentPage() {
  const [activeTab, setActiveTab] = useState('products');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [mediaLibrary, setMediaLibrary] = useState<MediaItem[]>([]);
  const [mediaProductFilter, setMediaProductFilter] = useState<string>('');
  const [analytics] = useState({
    totalDownloads: 442,
    revenue: 1247,
    publishedProducts: 8,
    mediaLibrarySize: 0
  });
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: 0,
    type: 'digital',
    inventory: 0,
    files: []
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [selectedMediaFiles, setSelectedMediaFiles] = useState<File[]>([]);
  const mediaFileInputRef = useRef<HTMLInputElement | null>(null);

  const authUser = (() => {
    try {
      const raw = localStorage.getItem('auth_user');
      return raw ? JSON.parse(raw) as { id?: string } : null;
    } catch {
      return null;
    }
  })();
  const creatorId = authUser?.id;

  const resolveImageUrl = (value?: string) => {
    if (!value) return 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400';
    if (value.startsWith('http')) return value;
    if (value.startsWith('/uploads/')) {
      const base = (api.defaults.baseURL || '').replace(/\/?api\/?$/, '');
      return `${base}${value}`;
    }
    return value;
  };

  const mediaLinkedProductName = (m: MediaItem): string => {
    const prodId = typeof (m.product as any)?._id === 'string'
      ? (m.product as any)._id
      : typeof m.product === 'string'
      ? (m.product as string)
      : '';
    if (!prodId) return 'Unlinked';
    const p = products.find(x => x._id === prodId);
    return p ? p.name : 'Linked';
  };

  useEffect(() => {
    const load = async () => {
      try {
        if (!creatorId) return;
        const res = await api.get(`/content/${creatorId}/products`);
        const data = res.data?.data;
        // data may be { products, pagination }
        const items: Product[] = Array.isArray(data?.products) ? data.products : (Array.isArray(data) ? data : []);
        setProducts(items);
      } catch (e) {
        console.error('Failed to load products', e);
      }
    };
    const loadMedia = async () => {
      try {
        if (!creatorId) return;
        const params = new URLSearchParams();
        if (mediaProductFilter) params.set('productId', mediaProductFilter);
        const qs = params.toString();
        const res = await api.get(`/content/${creatorId}/media${qs ? `?${qs}` : ''}`);
        const data = res.data?.data;
        const items: MediaItem[] = Array.isArray(data?.media) ? data.media : (Array.isArray(data) ? data : []);
        setMediaLibrary(items);
      } catch (e) {
        console.error('Failed to load media library', e);
      }
    };
    load();
    loadMedia();
  }, [creatorId, mediaProductFilter]);

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files || []);
    setNewProduct(prev => ({ ...prev, files: [...prev.files, ...files] }));
  };

  const handleSelectMediaFiles = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;
    setSelectedMediaFiles(files);
    // Auto-upload on select
    await handleUploadMedia(files);
    // reset the input so same file can be selected again later
    if (mediaFileInputRef.current) mediaFileInputRef.current.value = '';
  };

  const handleUploadMedia = async (filesArg?: File[]) => {
    try {
      if (!creatorId) return alert('You must be logged in as a creator');
      const filesToUpload = filesArg ?? selectedMediaFiles;
      if (filesToUpload.length === 0) return alert('Please choose files');
      const form = new FormData();
      filesToUpload.forEach((f) => form.append('files', f));
      if (mediaProductFilter) form.append('productId', mediaProductFilter);
      const res = await api.post(`/content/${creatorId}/media`, form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const uploaded: MediaItem[] = res.data?.data || [];
      setMediaLibrary(prev => [...uploaded, ...prev]);
      setSelectedMediaFiles([]);
    } catch (e) {
      console.error('Failed to upload media', e);
      alert('Failed to upload media');
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setImageFile(file);
  };

  const handleCreateProduct = async () => {
    if (!newProduct.name || !newProduct.description) {
      alert('Please fill in all required fields');
      return;
    }
    if (!creatorId) {
      alert('You must be logged in as a creator');
      return;
    }

    try {
      if (isEditMode && selectedProduct) {
        let res;
        if (imageFile) {
          const form = new FormData();
          form.append('name', newProduct.name);
          form.append('description', newProduct.description);
          form.append('price', String(newProduct.price));
          form.append('type', newProduct.type);
          form.append('inventory', String(newProduct.inventory));
          form.append('image', imageFile);
          res = await api.put(`/content/products/${selectedProduct._id}`, form, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
        } else {
          res = await api.put(`/content/products/${selectedProduct._id}`, {
            name: newProduct.name,
            description: newProduct.description,
            price: newProduct.price,
            type: newProduct.type,
            inventory: newProduct.inventory
          });
        }
        const updated: Product = res.data?.data;
        setProducts(prev => prev.map(p => (p._id === updated._id ? updated : p)));
      } else {
        let res;
        if (imageFile) {
          const form = new FormData();
          form.append('name', newProduct.name);
          form.append('description', newProduct.description);
          form.append('price', String(newProduct.price));
          form.append('type', newProduct.type);
          form.append('inventory', String(newProduct.inventory));
          form.append('image', imageFile);
          res = await api.post(`/content/${creatorId}/products`, form, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
        } else {
          res = await api.post(`/content/${creatorId}/products`, {
            name: newProduct.name,
            description: newProduct.description,
            price: newProduct.price,
            type: newProduct.type,
            inventory: newProduct.inventory
          });
        }
        const created: Product = res.data?.data;
        setProducts(prev => [created, ...prev]);
      }
    } catch (e) {
      console.error('Failed to save product', e);
      alert('Failed to save product');
      return;
    } finally {
      setIsModalOpen(false);
      setIsEditMode(false);
      setSelectedProduct(null);
      setNewProduct({
        name: '',
        description: '',
        price: 0,
        type: 'digital',
        inventory: 0,
        files: []
      });
      setImageFile(null);
    }
  };

  const handleEditProduct = (product: any) => {
    setSelectedProduct(product);
    setNewProduct({
      name: product.name,
      description: product.description,
      price: product.price,
      type: product.type,
      inventory: product.inventory || 0,
      files: []
    });
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleViewProduct = (product: any) => {
    setSelectedProduct(product);
    setIsViewModalOpen(true);
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await api.delete(`/content/products/${productId}`);
      setProducts(prev => prev.filter(p => p._id !== productId));
    } catch (e) {
      console.error('Failed to delete product', e);
      alert('Failed to delete');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Music className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-slate-900">CreatorHub</span>
            </div>
            <div className="flex items-center space-x-4">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400"
                alt="User"
                className="h-9 w-9 rounded-full ring-2 ring-indigo-500"
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <a href="#" className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-4 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </a>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">
                Content Management
              </h1>
              <p className="text-slate-600 text-lg">
                Upload and manage your digital products
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Add Product</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 mb-8">
          <div className="flex space-x-1 p-2">
            <button
              onClick={() => setActiveTab('products')}
              className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                activeTab === 'products'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Products
            </button>
            <button
              onClick={() => setActiveTab('media')}
              className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                activeTab === 'media'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Media Library
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                activeTab === 'analytics'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Analytics
            </button>
          </div>
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product._id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={resolveImageUrl(product.image)}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      product.status === 'published'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {product.status}
                    </span>
                  </div>
                </div>
                
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-2 text-slate-900">{product.name}</h3>
                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-indigo-600">${product.price}</span>
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-medium">
                      {product.type}
                    </span>
                  </div>
                  
                  <p className="text-sm text-slate-500 mb-4 flex items-center">
                    <Download className="h-4 w-4 mr-1" />
                    {product.downloads} downloads
                  </p>
                  
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleEditProduct(product)}
                      className="flex-1 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </button>
                    <button 
                      onClick={() => handleViewProduct(product)}
                      className="flex-1 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="flex-1 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Media Library Tab */}
        {activeTab === 'media' && (
          <div>
            <div className="bg-white rounded-2xl shadow-md p-6 mb-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Link media to product (optional)</label>
                <select
                  value={mediaProductFilter}
                  onChange={(e) => setMediaProductFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                >
                  <option value="">— None (unlinked) —</option>
                  {products.map(p => (
                    <option key={p._id} value={p._id}>{p.name}</option>
                  ))}
                </select>
                <p className="text-xs text-slate-500 mt-1">Selected product is used for filtering and will be attached to new uploads.</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-8 mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <Upload className="h-6 w-6 text-indigo-600" />
                <h2 className="text-xl font-bold text-slate-900">Upload Media</h2>
              </div>
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center hover:border-indigo-400 transition-colors relative">
                <Upload className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Upload Multimedia Files</h3>
                <p className="text-slate-600 mb-4">
                  Drag and drop files here or click to browse
                </p>
                <p className="text-sm text-slate-500 mb-4">
                  Supports images, videos, audio files, and documents up to 50MB each
                </p>
                <input
                  ref={mediaFileInputRef}
                  type="file"
                  multiple
                  accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
                  onChange={handleSelectMediaFiles}
                  className="hidden"
                />
                <div className="flex items-center justify-center space-x-3">
                  <button
                    onClick={() => mediaFileInputRef.current?.click()}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                  >
                    Choose Files
                  </button>
                  {selectedMediaFiles.length > 0 && (
                    <button
                      onClick={() => handleUploadMedia()}
                      className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                    >
                      Upload {selectedMediaFiles.length} file(s)
                    </button>
                  )}
                </div>
              </div>
            </div>
            {mediaLibrary.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-md p-12 text-center">
                <Package className="h-20 w-20 text-slate-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-slate-900 mb-2">No Media Files</h3>
                <p className="text-slate-600">Upload your first media files to get started</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {mediaLibrary.map((m, idx) => (
                  <div key={`${m.fileName}-${idx}`} className="bg-white rounded-xl shadow p-3">
                    {m.mimeType.startsWith('image/') ? (
                      <img src={resolveImageUrl(m.fileUrl)} alt={m.originalName} className="w-full h-40 object-cover rounded" />
                    ) : m.mimeType.startsWith('video/') ? (
                      <video src={resolveImageUrl(m.fileUrl)} controls className="w-full h-40 object-cover rounded" />
                    ) : (
                      <a href={resolveImageUrl(m.fileUrl)} target="_blank" rel="noreferrer" className="text-indigo-600 underline">
                        {m.originalName}
                      </a>
                    )}
                    <div className="mt-2 text-xs text-slate-500 truncate">{m.originalName}</div>
                    <div className="mt-1 text-[10px] text-slate-500">{mediaLinkedProductName(m)}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <Download className="h-6 w-6" />
                  </div>
                  <TrendingUp className="h-5 w-5 text-blue-100" />
                </div>
                <div className="text-3xl font-bold mb-1">{analytics.totalDownloads}</div>
                <div className="text-blue-100">Total Downloads</div>
                <div className="mt-3 text-sm text-blue-100">+12% from last month</div>
              </div>
              
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <DollarSign className="h-6 w-6" />
                  </div>
                  <TrendingUp className="h-5 w-5 text-green-100" />
                </div>
                <div className="text-3xl font-bold mb-1">${analytics.revenue}</div>
                <div className="text-green-100">Revenue This Month</div>
                <div className="mt-3 text-sm text-green-100">+8% from last month</div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <Package className="h-6 w-6" />
                  </div>
                  <BarChart3 className="h-5 w-5 text-purple-100" />
                </div>
                <div className="text-3xl font-bold mb-1">{analytics.publishedProducts}</div>
                <div className="text-purple-100">Published Products</div>
                <div className="mt-3 text-sm text-purple-100">2 drafts pending</div>
              </div>

              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <Image className="h-6 w-6" />
                  </div>
                  <Users className="h-5 w-5 text-orange-100" />
                </div>
                <div className="text-3xl font-bold mb-1">{analytics.mediaLibrarySize}</div>
                <div className="text-orange-100">Media Files</div>
                <div className="mt-3 text-sm text-orange-100">No files yet</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <BarChart3 className="h-6 w-6 text-indigo-600" />
                  <h2 className="text-xl font-bold text-slate-900">Product Performance</h2>
                </div>
                <div className="space-y-4">
                  {products.slice(0, 3).map((product, index) => (
                    <div key={product._id || index} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                      <div className="flex items-center space-x-3">
                        <img
                          src={resolveImageUrl(product.image)}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-semibold text-slate-900">{product.name}</p>
                          <p className="text-sm text-slate-600">
                            {(product.downloads ?? 0)} downloads
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-indigo-600">${product.price}</p>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                          product.status === 'published'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {product.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <TrendingUp className="h-6 w-6 text-indigo-600" />
                  <h2 className="text-xl font-bold text-slate-900">Recent Activity</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-xl">
                    <div className="p-3 bg-green-100 rounded-xl">
                      <Download className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">New download</p>
                      <p className="text-sm text-slate-600">
                        Lo-Fi Beat Pack Vol. 1 - 2 hours ago
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-xl">
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <Plus className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Product published</p>
                      <p className="text-sm text-slate-600">
                        Acoustic Guitar Tabs - 1 day ago
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-xl">
                    <div className="p-3 bg-purple-100 rounded-xl">
                      <Upload className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Media uploaded</p>
                      <p className="text-sm text-slate-600">
                        5 files added to library - 2 days ago
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Create Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-indigo-100 rounded-xl">
                  <Plus className="h-5 w-5 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {isEditMode ? 'Edit Product' : 'Create New Product'}
                </h2>
              </div>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setIsEditMode(false);
                  setSelectedProduct(null);
                  setNewProduct({
                    name: '',
                    description: '',
                    price: 0,
                    type: 'digital',
                    inventory: 0,
                    files: []
                  });
                }}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="h-6 w-6 text-slate-600" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Product Name*
                    </label>
                    <input
                      type="text"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter product name"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Description*
                    </label>
                    <textarea
                      value={newProduct.description}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe your product"
                      rows={4}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        Price ($)
                      </label>
                      <input
                        type="number"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                        min="0"
                        step="0.01"
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        Type
                      </label>
                      <select
                        value={newProduct.type}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, type: e.target.value }))}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white"
                      >
                        <option value="digital">Digital</option>
                        <option value="physical">Physical</option>
                      </select>
                    </div>
                  </div>

                  {newProduct.type === 'physical' && (
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        Inventory
                      </label>
                      <input
                        type="number"
                        value={newProduct.inventory}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, inventory: parseInt(e.target.value) }))}
                        min="0"
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Upload Files
                    </label>
                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-indigo-400 transition-colors relative">
                      <Upload className="h-10 w-10 text-slate-400 mx-auto mb-3" />
                      <p className="text-sm text-slate-600 mb-2">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-slate-500">
                        Images, videos, audio, PDFs up to 50MB each
                      </p>
                      <input
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                    {newProduct.files.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {newProduct.files.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                            <span className="text-sm text-slate-700 truncate flex-1">{file.name}</span>
                            <button
                              onClick={() => setNewProduct(prev => ({
                                ...prev,
                                files: prev.files.filter((_, i) => i !== index)
                              }))}
                              className="ml-2 p-1 hover:bg-slate-200 rounded transition-colors"
                            >
                              <Trash2 className="h-4 w-4 text-slate-600" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Product Cover Image
                    </label>
                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-indigo-400 transition-colors relative">
                      <Image className="h-10 w-10 text-slate-400 mx-auto mb-3" />
                      <p className="text-sm text-slate-600 mb-2">
                        Click to upload product image
                      </p>
                      <p className="text-xs text-slate-500">PNG, JPG up to 50MB</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                    {imageFile && (
                      <div className="mt-3 text-sm text-green-600">✓ {imageFile.name} selected</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-slate-200">
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setIsEditMode(false);
                    setSelectedProduct(null);
                    setNewProduct({
                      name: '',
                      description: '',
                      price: 0,
                      type: 'digital',
                      inventory: 0,
                      files: []
                    });
                  }}
                  className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateProduct}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  {isEditMode ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Product Modal */}
      {isViewModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-indigo-100 rounded-xl">
                  <Eye className="h-5 w-5 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Product Details</h2>
              </div>
              <button
                onClick={() => {
                  setIsViewModalOpen(false);
                  setSelectedProduct(null);
                }}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="h-6 w-6 text-slate-600" />
              </button>
            </div>

            <div className="p-6">
              {/* Product Image */}
              <div className="mb-6">
                <img
                  src={resolveImageUrl(selectedProduct.image)}
                  alt={selectedProduct.name}
                  className="w-full h-64 object-cover rounded-xl"
                />
              </div>

              {/* Product Info */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    {selectedProduct.name}
                  </h3>
                  <div className="flex items-center space-x-3 mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      selectedProduct.status === 'published'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {selectedProduct.status}
                    </span>
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-medium">
                      {selectedProduct.type}
                    </span>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-4">
                  <h4 className="font-semibold text-slate-900 mb-2">Description</h4>
                  <p className="text-slate-600">
                    {selectedProduct.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <DollarSign className="h-5 w-5 text-indigo-600" />
                      <h4 className="font-semibold text-slate-900">Price</h4>
                    </div>
                    <p className="text-2xl font-bold text-indigo-600">
                      ${selectedProduct.price}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Download className="h-5 w-5 text-green-600" />
                      <h4 className="font-semibold text-slate-900">Downloads</h4>
                    </div>
                    <p className="text-2xl font-bold text-green-600">
                      {selectedProduct.downloads}
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-4">
                  <h4 className="font-semibold text-slate-900 mb-3">Product Stats</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Product Type</span>
                      <span className="font-semibold text-slate-900 capitalize">
                        {selectedProduct.type}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Status</span>
                      <span className="font-semibold text-slate-900 capitalize">
                        {selectedProduct.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Total Revenue</span>
                      <span className="font-semibold text-slate-900">
                        ${(selectedProduct.price * selectedProduct.downloads).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 mt-6 pt-6 border-t border-slate-200">
                <button
                  onClick={() => {
                    setIsViewModalOpen(false);
                    handleEditProduct(selectedProduct);
                  }}
                  className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center"
                >
                  <Edit className="h-5 w-5 mr-2" />
                  Edit Product
                </button>
                <button
                  onClick={() => {
                    setIsViewModalOpen(false);
                    setSelectedProduct(null);
                  }}
                  className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}