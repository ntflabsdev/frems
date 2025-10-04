import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductCard } from '@/components/cards/ProductCard';
import { SubscriptionCard } from '@/components/cards/SubscriptionCard';
import { 
  ArrowLeft, 
  CheckCircle, 
  Users, 
  Heart, 
  Share2, 
  Instagram, 
  Youtube, 
  Globe,
  MessageCircle,
  Send
} from 'lucide-react';
import { mockCreators, Creator } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';

export default function CreatorWorldPage() {
  const { id } = useParams();
  const [creator, setCreator] = useState<Creator | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: 'Alex', message: 'Hey everyone! Thanks for the support!', timestamp: '2 min ago' },
    { id: 2, user: 'Fan123', message: 'Love your new track!', timestamp: '5 min ago' },
    { id: 3, user: 'MusicLover', message: 'When is the next live stream?', timestamp: '8 min ago' }
  ]);
  const { toast } = useToast();

  useEffect(() => {
    // Find creator by ID
    const foundCreator = mockCreators.find(c => c.id === id);
    setCreator(foundCreator || null);
  }, [id]);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    toast({
      title: isFollowing ? "Unfollowed" : "Following!",
      description: isFollowing 
        ? `You've unfollowed ${creator?.displayName}` 
        : `You're now following ${creator?.displayName}`,
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "Creator page link copied to clipboard.",
    });
  };

  const handlePurchase = (productId: string) => {
    toast({
      title: "Added to cart!",
      description: "Product has been added to your cart.",
    });
  };

  const handleSubscribe = (tierId: string) => {
    toast({
      title: "Subscription started!",
      description: "Welcome to the creator's community!",
    });
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      setChatMessages(prev => [
        { 
          id: prev.length + 1, 
          user: 'You', 
          message: chatMessage, 
          timestamp: 'now' 
        },
        ...prev
      ]);
      setChatMessage('');
    }
  };

  if (!creator) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Creator Not Found</h1>
          <Link to="/discover">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Discover
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Apply creator's custom theme
  const creatorStyle = {
    '--creator-primary': creator.branding.primaryColor,
    '--creator-secondary': creator.branding.secondaryColor,
  } as React.CSSProperties;

  return (
    <div 
      className="min-h-screen bg-creator-background"
      style={creatorStyle}
    >
      {/* Navigation */}
      <nav className="bg-creator-background/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            <Link 
              to="/discover" 
              className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Discover
            </Link>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button 
                size="sm" 
                onClick={handleFollow}
                style={{
                  backgroundColor: isFollowing ? 'transparent' : creator.branding.primaryColor,
                  color: isFollowing ? creator.branding.primaryColor : 'white',
                  borderColor: creator.branding.primaryColor
                }}
                variant={isFollowing ? 'outline' : 'default'}
              >
                <Heart className={`h-4 w-4 mr-2 ${isFollowing ? 'fill-current' : ''}`} />
                {isFollowing ? 'Following' : 'Follow'}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Creator Header */}
      <section 
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${creator.branding.primaryColor}20, ${creator.branding.secondaryColor}20)`
        }}
      >
        <div className="container-custom section-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Avatar className="h-32 w-32 mx-auto mb-6 border-4 border-creator-background">
              <AvatarImage src={creator.avatar} alt={creator.displayName} />
              <AvatarFallback className="text-2xl">
                {creator.displayName[0]}
              </AvatarFallback>
            </Avatar>

            <div className="flex items-center justify-center space-x-2 mb-2">
              <h1 className="text-4xl font-bold text-foreground">
                {creator.displayName}
              </h1>
              {creator.isVerified && (
                <CheckCircle 
                  className="h-6 w-6" 
                  style={{ color: creator.branding.primaryColor }}
                />
              )}
            </div>

            <Badge 
              className="mb-4"
              style={{
                backgroundColor: creator.branding.primaryColor,
                color: 'white'
              }}
            >
              {creator.category}
            </Badge>

            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              {creator.bio}
            </p>

            <div className="flex items-center justify-center space-x-8 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">
                  {creator.subscriberCount.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">
                  {creator.products.length}
                </div>
                <div className="text-sm text-muted-foreground">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">
                  {creator.subscriptionTiers.length}
                </div>
                <div className="text-sm text-muted-foreground">Tiers</div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center space-x-4">
              {creator.socialLinks.instagram && (
                <Button variant="outline" size="sm" asChild>
                  <a href={creator.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                    <Instagram className="h-4 w-4" />
                  </a>
                </Button>
              )}
              {creator.socialLinks.youtube && (
                <Button variant="outline" size="sm" asChild>
                  <a href={creator.socialLinks.youtube} target="_blank" rel="noopener noreferrer">
                    <Youtube className="h-4 w-4" />
                  </a>
                </Button>
              )}
              {creator.socialLinks.website && (
                <Button variant="outline" size="sm" asChild>
                  <a href={creator.socialLinks.website} target="_blank" rel="noopener noreferrer">
                    <Globe className="h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Tabs */}
      <section className="section-padding">
        <div className="container-custom">
          <Tabs defaultValue="products" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
              <TabsTrigger value="community">Community</TabsTrigger>
            </TabsList>

            {/* Products Tab */}
            <TabsContent value="products">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Featured Products
                  </h2>
                  <p className="text-muted-foreground">
                    Discover exclusive content and products from {creator.displayName}
                  </p>
                </div>

                {creator.products.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {creator.products.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        creatorColor={creator.branding.primaryColor}
                        onPurchase={handlePurchase}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <p className="text-muted-foreground">
                      No products available yet. Check back soon!
                    </p>
                  </div>
                )}
              </motion.div>
            </TabsContent>

            {/* Subscriptions Tab */}
            <TabsContent value="subscriptions">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Subscription Tiers
                  </h2>
                  <p className="text-muted-foreground">
                    Support {creator.displayName} and get exclusive perks
                  </p>
                </div>

                {creator.subscriptionTiers.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {creator.subscriptionTiers.map((tier, index) => (
                      <SubscriptionCard
                        key={tier.id}
                        tier={tier}
                        creatorColor={creator.branding.primaryColor}
                        isPopular={index === 1} // Mark second tier as popular
                        onSubscribe={handleSubscribe}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <p className="text-muted-foreground">
                      No subscription tiers available yet.
                    </p>
                  </div>
                )}
              </motion.div>
            </TabsContent>

            {/* Community Tab */}
            <TabsContent value="community">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Live Chat */}
                  <Card className="card-elevated">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <MessageCircle className="h-5 w-5" />
                        <span>Live Chat</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
                        {chatMessages.map((msg) => (
                          <div key={msg.id} className="flex flex-col space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-sm">{msg.user}</span>
                              <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{msg.message}</p>
                          </div>
                        ))}
                      </div>
                      
                      <Separator className="mb-4" />
                      
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Type a message..."
                          value={chatMessage}
                          onChange={(e) => setChatMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                        <Button 
                          size="sm" 
                          onClick={handleSendMessage}
                          style={{ backgroundColor: creator.branding.primaryColor }}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Community Stats */}
                  <Card className="card-elevated">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Users className="h-5 w-5" />
                        <span>Community</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-foreground mb-2">
                            {creator.subscriberCount.toLocaleString()}
                          </div>
                          <p className="text-muted-foreground">Total Followers</p>
                        </div>
                        
                        <Separator />
                        
                        <div className="space-y-4">
                          <h4 className="font-semibold">Recent Activity</h4>
                          <div className="space-y-2 text-sm text-muted-foreground">
                            <p>• 15 new followers this week</p>
                            <p>• 3 new products released</p>
                            <p>• Live stream scheduled for Friday</p>
                            <p>• Community milestone: 2.5k followers!</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}