import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Package, 
  CreditCard, 
  Heart, 
  TrendingUp,
  Download,
  Clock,
  Star,
  Calendar,
  ArrowRight
} from 'lucide-react';

// Mock user data
const userData = {
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400',
  memberSince: '2024-01-01',
  totalSpent: 285,
  activeSubscriptions: 3,
  totalPurchases: 12,
  favoriteCreators: 8
};

const recentPurchases = [
  {
    id: 1,
    product: 'Lo-Fi Beat Pack Vol. 1',
    creator: 'Alex Rodriguez',
    amount: 15,
    date: '2024-01-15',
    type: 'digital',
    downloadUrl: '#'
  },
  {
    id: 2,
    product: 'Workout Guide PDF',
    creator: 'Sarah Johnson',
    amount: 25,
    date: '2024-01-12',
    type: 'digital',
    downloadUrl: '#'
  },
  {
    id: 3,
    product: 'Programming Course',
    creator: 'Mike Chen',
    amount: 99,
    date: '2024-01-10',
    type: 'course',
    downloadUrl: '#'
  }
];

const activeSubscriptions = [
  {
    id: 1,
    creator: 'Alex Rodriguez',
    creatorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    tier: 'Premium',
    amount: 15,
    nextBilling: '2024-02-15',
    status: 'active'
  },
  {
    id: 2,
    creator: 'Sarah Johnson',
    creatorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=400',
    tier: 'VIP',
    amount: 25,
    nextBilling: '2024-02-20',
    status: 'active'
  }
];

const favoriteCreators = [
  {
    id: 1,
    name: 'Alex Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    category: 'Music',
    followers: 2450
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=400',
    category: 'Fitness',
    followers: 3200
  },
  {
    id: 3,
    name: 'Mike Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    category: 'Technology',
    followers: 1890
  }
];

export default function UserDashboardPage() {
  const stats = [
    {
      title: 'Total Spent',
      value: `$${userData.totalSpent}`,
      icon: CreditCard,
      change: '+$45 this month',
      changeType: 'neutral' as const
    },
    {
      title: 'Active Subscriptions',
      value: userData.activeSubscriptions.toString(),
      icon: Package,
      change: '+1 this month',
      changeType: 'positive' as const
    },
    {
      title: 'Total Purchases',
      value: userData.totalPurchases.toString(),
      icon: Download,
      change: '+3 this month',
      changeType: 'positive' as const
    },
    {
      title: 'Favorite Creators',
      value: userData.favoriteCreators.toString(),
      icon: Heart,
      change: '+2 this month',
      changeType: 'positive' as const
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={userData.avatar} alt={userData.name} />
              <AvatarFallback>{userData.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-1">
                Welcome back, {userData.name}! 👋
              </h1>
              <p className="text-muted-foreground">
                Member since {new Date(userData.memberSince).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" asChild>
              <Link to="/discover">
                <TrendingUp className="h-4 w-4 mr-2" />
                Discover Creators
              </Link>
            </Button>
            <Button className="btn-hero" asChild>
              <Link to="/user/profile">
                Edit Profile
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat) => (
          <Card key={stat.title} className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-primary p-2 rounded-lg">
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
                <Badge variant="outline" className="text-xs">
                  {stat.change}
                </Badge>
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.title}
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Purchases */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Recent Purchases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPurchases.map((purchase) => (
                  <div key={purchase.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground mb-1">
                        {purchase.product}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        by {purchase.creator}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>{new Date(purchase.date).toLocaleDateString()}</span>
                        <Badge variant="outline">{purchase.type}</Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="font-semibold text-foreground">${purchase.amount}</div>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
                
                <Link to="/user/purchases" className="block">
                  <Button variant="outline" className="w-full">
                    View All Purchases
                    <ArrowRight className="h-3 w-3 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Active Subscriptions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Active Subscriptions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeSubscriptions.map((subscription) => (
                  <div key={subscription.id} className="p-3 border border-border rounded-lg">
                    <div className="flex items-center space-x-3 mb-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={subscription.creatorAvatar} alt={subscription.creator} />
                        <AvatarFallback>{subscription.creator[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">
                          {subscription.creator}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {subscription.tier} Tier
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        Next billing: {new Date(subscription.nextBilling).toLocaleDateString()}
                      </span>
                      <span className="font-medium text-foreground">
                        ${subscription.amount}/month
                      </span>
                    </div>
                  </div>
                ))}
                
                <Link to="/user/subscriptions" className="block">
                  <Button variant="outline" size="sm" className="w-full">
                    Manage Subscriptions
                    <ArrowRight className="h-3 w-3 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Favorite Creators */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>Favorite Creators</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {favoriteCreators.map((creator) => (
                <Link key={creator.id} to={`/creator/${creator.id}`}>
                  <Card className="card-interactive p-4 h-full">
                    <CardContent className="p-0">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={creator.avatar} alt={creator.name} />
                          <AvatarFallback>{creator.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-medium text-foreground mb-1">
                            {creator.name}
                          </h3>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-xs">
                              {creator.category}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {creator.followers.toLocaleString()} followers
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            
            <Link to="/discover" className="block mt-4">
              <Button variant="outline" className="w-full">
                Discover More Creators
                <ArrowRight className="h-3 w-3 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}