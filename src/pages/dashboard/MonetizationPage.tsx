import { useState } from 'react';
import { motion } from 'framer-motion';
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
import { 
  ArrowLeft, 
  Plus, 
  DollarSign, 
  Users, 
  Package, 
  Gift,
  Edit,
  Trash2,
  CheckCircle,
  TrendingUp
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock subscription tiers
const mockTiers = [
  {
    id: 1,
    name: 'Supporter',
    price: 5,
    interval: 'monthly',
    benefits: ['Early access to new releases', 'Monthly live streams', 'Discord access'],
    subscribers: 120
  },
  {
    id: 2,
    name: 'VIP',
    price: 15,
    interval: 'monthly',
    benefits: ['All Supporter benefits', 'Monthly exclusive tracks', 'Personal feedback', '1-on-1 monthly call'],
    subscribers: 45
  }
];

// Mock payment models
const mockPaymentModels = [
  { id: 1, type: 'one-time', name: 'Beat Pack Purchase', price: 15, active: true },
  { id: 2, type: 'subscription', name: 'Monthly Supporter', price: 5, active: true },
  { id: 3, type: 'pay-what-you-want', name: 'Tip Jar', minPrice: 1, suggestedPrice: 5, active: true }
];

export default function MonetizationPage() {
  const [activeTab, setActiveTab] = useState('subscriptions');
  const [isCreating, setIsCreating] = useState(false);
  const [newTier, setNewTier] = useState({
    name: '',
    price: 0,
    interval: 'monthly',
    benefits: ['']
  });
  const { toast } = useToast();

  const handleCreateTier = () => {
    if (!newTier.name || newTier.price <= 0) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Subscription tier created!",
      description: "Your new tier is now available to subscribers.",
    });
    
    setIsCreating(false);
    setNewTier({
      name: '',
      price: 0,
      interval: 'monthly',
      benefits: ['']
    });
  };

  const addBenefit = () => {
    setNewTier(prev => ({
      ...prev,
      benefits: [...prev.benefits, '']
    }));
  };

  const updateBenefit = (index: number, value: string) => {
    setNewTier(prev => ({
      ...prev,
      benefits: prev.benefits.map((benefit, i) => i === index ? value : benefit)
    }));
  };

  const removeBenefit = (index: number) => {
    setNewTier(prev => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        isAuthenticated={true} 
        user={{ name: 'Alex Rodriguez', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400', isCreator: true }} 
      />
      
      <div className="container-custom section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <Link 
                to="/dashboard" 
                className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Monetization
              </h1>
              <p className="text-muted-foreground">
                Set up your pricing and subscription tiers
              </p>
            </div>
          </div>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
            <TabsTrigger value="products">Product Pricing</TabsTrigger>
            <TabsTrigger value="promotions">Promotions</TabsTrigger>
            <TabsTrigger value="analytics">Revenue Analytics</TabsTrigger>
          </TabsList>

          {/* Subscriptions Tab */}
          <TabsContent value="subscriptions">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Subscription Tiers</h2>
                <Button 
                  className="btn-hero" 
                  onClick={() => setIsCreating(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Tier
                </Button>
              </div>

              {/* Create Tier Form */}
              {isCreating && (
                <Card className="card-elevated mb-8">
                  <CardHeader>
                    <CardTitle>Create New Subscription Tier</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="tier-name">Tier Name*</Label>
                          <Input
                            id="tier-name"
                            value={newTier.name}
                            onChange={(e) => setNewTier(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="e.g., Premium, VIP, Supporter"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="tier-price">Price ($)*</Label>
                            <Input
                              id="tier-price"
                              type="number"
                              value={newTier.price}
                              onChange={(e) => setNewTier(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                              min="0"
                              step="0.01"
                            />
                          </div>
                          <div>
                            <Label htmlFor="tier-interval">Billing</Label>
                            <Select value={newTier.interval} onValueChange={(value) => setNewTier(prev => ({ ...prev, interval: value }))}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="monthly">Monthly</SelectItem>
                                <SelectItem value="yearly">Yearly</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <Label>Benefits</Label>
                          <div className="space-y-2">
                            {newTier.benefits.map((benefit, index) => (
                              <div key={index} className="flex space-x-2">
                                <Input
                                  value={benefit}
                                  onChange={(e) => updateBenefit(index, e.target.value)}
                                  placeholder="Enter a benefit"
                                />
                                {newTier.benefits.length > 1 && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => removeBenefit(index)}
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                )}
                              </div>
                            ))}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={addBenefit}
                            >
                              <Plus className="h-3 w-3 mr-1" />
                              Add Benefit
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3 mt-6">
                      <Button 
                        variant="outline" 
                        onClick={() => setIsCreating(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleCreateTier}>
                        Create Tier
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Existing Tiers */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockTiers.map((tier) => (
                  <Card key={tier.id} className="card-elevated">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{tier.name}</CardTitle>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="ghost">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center mb-4">
                        <div className="text-2xl font-bold text-foreground">
                          ${tier.price}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          per {tier.interval}
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        {tier.benefits.map((benefit, index) => (
                          <div key={index} className="flex items-center space-x-2 text-sm">
                            <CheckCircle className="h-3 w-3 text-primary" />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-center space-x-1 text-sm text-muted-foreground">
                        <Users className="h-3 w-3" />
                        <span>{tier.subscribers} subscribers</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          {/* Product Pricing Tab */}
          <TabsContent value="products">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-xl font-semibold mb-6">Payment Models</h2>
              
              <div className="space-y-4">
                {mockPaymentModels.map((model) => (
                  <Card key={model.id} className="card-elevated">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="bg-gradient-primary p-2 rounded-lg">
                            {model.type === 'one-time' && <Package className="h-5 w-5 text-white" />}
                            {model.type === 'subscription' && <Users className="h-5 w-5 text-white" />}
                            {model.type === 'pay-what-you-want' && <Gift className="h-5 w-5 text-white" />}
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">{model.name}</h3>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline">{model.type.replace('-', ' ')}</Badge>
                              {model.type === 'pay-what-you-want' ? (
                                <span className="text-sm text-muted-foreground">
                                  Min: ${model.minPrice}, Suggested: ${model.suggestedPrice}
                                </span>
                              ) : (
                                <span className="text-sm text-muted-foreground">
                                  ${model.price}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Badge variant={model.active ? 'default' : 'secondary'}>
                            {model.active ? 'Active' : 'Inactive'}
                          </Badge>
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          {/* Promotions Tab */}
          <TabsContent value="promotions">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle>Promo Codes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-16">
                    <Gift className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Create Promo Codes
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Offer discounts and special deals to your audience
                    </p>
                    <Button className="btn-hero">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Promo Code
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Revenue Analytics Tab */}
          <TabsContent value="analytics">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="card-elevated">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <DollarSign className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium">Total Revenue</span>
                    </div>
                    <div className="text-2xl font-bold text-foreground">
                      $12,500
                    </div>
                    <div className="text-sm text-success">+12.5% this month</div>
                  </CardContent>
                </Card>
                
                <Card className="card-elevated">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <Users className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium">Active Subscribers</span>
                    </div>
                    <div className="text-2xl font-bold text-foreground">
                      165
                    </div>
                    <div className="text-sm text-success">+8 this week</div>
                  </CardContent>
                </Card>
                
                <Card className="card-elevated">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <Package className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium">Product Sales</span>
                    </div>
                    <div className="text-2xl font-bold text-foreground">
                      $3,200
                    </div>
                    <div className="text-sm text-success">+15.2% this month</div>
                  </CardContent>
                </Card>
              </div>

              <Card className="card-elevated mt-6">
                <CardHeader>
                  <CardTitle>Revenue Chart</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-secondary rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Revenue analytics chart will appear here
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
