import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Navbar } from '@/components/layout/Navbar';
import { 
  Search, 
  CheckCircle, 
  XCircle, 
  Eye, 
  Instagram, 
  Youtube, 
  Globe,
  Users,
  DollarSign,
  Clock
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock pending creators data
const mockPendingCreators = [
  {
    id: 'pending-1',
    username: 'newartist',
    displayName: 'Emma Wilson',
    email: 'emma@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=400',
    category: 'Art',
    bio: 'Digital artist creating stunning illustrations and character designs',
    appliedDate: '2024-01-15',
    socialLinks: {
      instagram: 'https://instagram.com/newartist',
      youtube: 'https://youtube.com/newartist'
    },
    portfolio: [
      'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'
    ]
  },
  {
    id: 'pending-2',
    username: 'techguru2024',
    displayName: 'David Kim',
    email: 'david@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    category: 'Technology',
    bio: 'Software engineer teaching programming and tech tutorials',
    appliedDate: '2024-01-14',
    socialLinks: {
      youtube: 'https://youtube.com/techguru2024',
      website: 'https://davidkim.dev'
    },
    portfolio: []
  }
];

// Mock approved creators
const mockApprovedCreators = [
  {
    id: '1',
    username: 'alexmusic',
    displayName: 'Alex Rodriguez',
    category: 'Music',
    subscribers: 2450,
    revenue: 12500,
    joinDate: '2023-12-01',
    status: 'active'
  },
  {
    id: '2',
    username: 'fitnessguru',
    displayName: 'Sarah Johnson',
    category: 'Fitness',
    subscribers: 3200,
    revenue: 18750,
    joinDate: '2023-11-15',
    status: 'active'
  }
];

export default function AdminCreatorsPage() {
  const [activeTab, setActiveTab] = useState('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const handleApprove = (creatorId: string, name: string) => {
    toast({
      title: "Creator approved!",
      description: `${name} has been approved and can now start creating.`,
    });
  };

  const handleReject = (creatorId: string, name: string) => {
    toast({
      title: "Creator rejected",
      description: `${name}'s application has been rejected.`,
      variant: "destructive"
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default">Active</Badge>;
      case 'suspended':
        return <Badge variant="destructive">Suspended</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        isAuthenticated={true} 
        user={{ name: 'Admin User', avatar: '', isCreator: false }} 
      />
      
      <div className="container-custom section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Creator Management
          </h1>
          <p className="text-muted-foreground">
            Review and manage creator applications and accounts
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="h-5 w-5 text-warning" />
                <span className="text-sm font-medium">Pending Reviews</span>
              </div>
              <div className="text-2xl font-bold text-foreground">
                {mockPendingCreators.length}
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Active Creators</span>
              </div>
              <div className="text-2xl font-bold text-foreground">
                {mockApprovedCreators.length}
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-2">
                <DollarSign className="h-5 w-5 text-success" />
                <span className="text-sm font-medium">Total Revenue</span>
              </div>
              <div className="text-2xl font-bold text-foreground">
                $31,250
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="h-5 w-5 text-success" />
                <span className="text-sm font-medium">Approved Today</span>
              </div>
              <div className="text-2xl font-bold text-foreground">
                3
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search creators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="pending">
              Pending ({mockPendingCreators.length})
            </TabsTrigger>
            <TabsTrigger value="approved">
              Approved ({mockApprovedCreators.length})
            </TabsTrigger>
            <TabsTrigger value="suspended">Suspended (0)</TabsTrigger>
          </TabsList>

          {/* Pending Creators Tab */}
          <TabsContent value="pending">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {mockPendingCreators.map((creator) => (
                <Card key={creator.id} className="card-elevated">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Creator Info */}
                      <div className="lg:col-span-2">
                        <div className="flex items-start space-x-4 mb-4">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={creator.avatar} alt={creator.displayName} />
                            <AvatarFallback>{creator.displayName[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-foreground mb-1">
                              {creator.displayName}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              @{creator.username} • {creator.email}
                            </p>
                            <Badge variant="outline">{creator.category}</Badge>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">
                              Applied: {new Date(creator.appliedDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground mb-4">
                          {creator.bio}
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center space-x-4 mb-4">
                          <span className="text-sm font-medium">Social Links:</span>
                          <div className="flex space-x-2">
                            {creator.socialLinks.instagram && (
                              <Button size="sm" variant="outline" asChild>
                                <a href={creator.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                                  <Instagram className="h-3 w-3" />
                                </a>
                              </Button>
                            )}
                            {creator.socialLinks.youtube && (
                              <Button size="sm" variant="outline" asChild>
                                <a href={creator.socialLinks.youtube} target="_blank" rel="noopener noreferrer">
                                  <Youtube className="h-3 w-3" />
                                </a>
                              </Button>
                            )}
                            {creator.socialLinks.website && (
                              <Button size="sm" variant="outline" asChild>
                                <a href={creator.socialLinks.website} target="_blank" rel="noopener noreferrer">
                                  <Globe className="h-3 w-3" />
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>

                        {/* Portfolio */}
                        {creator.portfolio.length > 0 && (
                          <div>
                            <span className="text-sm font-medium mb-2 block">Portfolio:</span>
                            <div className="flex space-x-2">
                              {creator.portfolio.map((image, index) => (
                                <img
                                  key={index}
                                  src={image}
                                  alt={`Portfolio ${index + 1}`}
                                  className="w-16 h-16 object-cover rounded-lg"
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col space-y-3">
                        <Button
                          onClick={() => handleApprove(creator.id, creator.displayName)}
                          className="w-full bg-success hover:bg-success/90"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleReject(creator.id, creator.displayName)}
                          className="w-full"
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </TabsContent>

          {/* Approved Creators Tab */}
          <TabsContent value="approved">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle>Approved Creators</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockApprovedCreators.map((creator) => (
                      <div key={creator.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div>
                            <h3 className="font-medium text-foreground">{creator.displayName}</h3>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span>@{creator.username}</span>
                              <Badge variant="outline">{creator.category}</Badge>
                              <span>{creator.subscribers.toLocaleString()} followers</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="text-sm font-medium">${creator.revenue.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">Total Revenue</div>
                          </div>
                          {getStatusBadge(creator.status)}
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Suspended Creators Tab */}
          <TabsContent value="suspended">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="card-elevated">
                <CardContent className="p-12 text-center">
                  <XCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No Suspended Creators
                  </h3>
                  <p className="text-muted-foreground">
                    All creators are currently in good standing
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}