import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Download,
  Search,
  Calendar,
  Filter,
  FileText,
  Music,
  Video,
  Image as ImageIcon
} from 'lucide-react';

const purchases = [
  {
    id: 1,
    product: 'Lo-Fi Beat Pack Vol. 1',
    creator: 'Alex Rodriguez',
    amount: 15,
    date: '2024-01-15',
    type: 'audio',
    category: 'Music',
    status: 'completed',
    downloadUrl: '#'
  },
  {
    id: 2,
    product: 'Complete Workout Guide PDF',
    creator: 'Sarah Johnson',
    amount: 25,
    date: '2024-01-12',
    type: 'document',
    category: 'Fitness',
    status: 'completed',
    downloadUrl: '#'
  },
  {
    id: 3,
    product: 'JavaScript Masterclass',
    creator: 'Mike Chen',
    amount: 99,
    date: '2024-01-10',
    type: 'video',
    category: 'Technology',
    status: 'completed',
    downloadUrl: '#'
  },
  {
    id: 4,
    product: 'Digital Art Bundle',
    creator: 'Emma Wilson',
    amount: 35,
    date: '2024-01-08',
    type: 'image',
    category: 'Art',
    status: 'completed',
    downloadUrl: '#'
  },
  {
    id: 5,
    product: 'Cooking Masterclass Videos',
    creator: 'Chef Maria',
    amount: 45,
    date: '2024-01-05',
    type: 'video',
    category: 'Cooking',
    status: 'completed',
    downloadUrl: '#'
  },
  {
    id: 6,
    product: 'Photography Presets Pack',
    creator: 'John Smith',
    amount: 20,
    date: '2024-01-03',
    type: 'image',
    category: 'Photography',
    status: 'completed',
    downloadUrl: '#'
  }
];

export default function UserPurchasesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const filteredPurchases = purchases.filter(purchase => {
    const matchesSearch = purchase.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         purchase.creator.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || purchase.category === selectedCategory;
    const matchesType = selectedType === 'all' || purchase.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'audio':
        return <Music className="h-4 w-4" />;
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'document':
        return <FileText className="h-4 w-4" />;
      case 'image':
        return <ImageIcon className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'audio':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'video':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'document':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'image':
        return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200';
      default:
        return '';
    }
  };

  const totalSpent = purchases.reduce((total, purchase) => total + purchase.amount, 0);
  const categories = ['all', ...Array.from(new Set(purchases.map(p => p.category)))];
  const types = ['all', ...Array.from(new Set(purchases.map(p => p.type)))];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              My Purchases
            </h1>
            <p className="text-muted-foreground">
              Access all your purchased content and downloads
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-foreground">
              ${totalSpent}
            </div>
            <div className="text-sm text-muted-foreground">
              Total spent • {purchases.length} items
            </div>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search purchases..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  {types.map(type => (
                    <SelectItem key={type} value={type}>
                      {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button variant="outline" className="w-full">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Purchases Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredPurchases.map((purchase) => (
          <Card key={purchase.id} className="card-elevated card-interactive">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  {getTypeIcon(purchase.type)}
                  <Badge className={getTypeBadgeColor(purchase.type)}>
                    {purchase.type}
                  </Badge>
                </div>
                <Badge variant="outline">{purchase.category}</Badge>
              </div>
              
              <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                {purchase.product}
              </h3>
              
              <p className="text-sm text-muted-foreground mb-3">
                by {purchase.creator}
              </p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>{new Date(purchase.date).toLocaleDateString()}</span>
                </div>
                <div className="font-semibold text-foreground">
                  ${purchase.amount}
                </div>
              </div>
              
              <Button className="w-full btn-hero" size="sm">
                <Download className="h-3 w-3 mr-2" />
                Download
              </Button>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {filteredPurchases.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="card-elevated">
            <CardContent className="p-12 text-center">
              <div className="text-muted-foreground mb-4">
                <Download className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No purchases found
              </h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filter criteria
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedType('all');
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}