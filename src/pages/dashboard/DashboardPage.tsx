import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/layout/Navbar';
import { 
  DollarSign, 
  Users, 
  Package, 
  TrendingUp, 
  Palette,
  FileText,
  Heart,
  MessageSquare,
  ArrowRight,
  Eye,
  Download
} from 'lucide-react';

// Mock creator data - in real app this would come from API
const mockCreatorStats = {
  totalRevenue: 12500,
  subscribers: 2450,
  products: 8,
  engagement: 85,
  recentSales: [
    { id: 1, product: 'Lo-Fi Beat Pack Vol. 1', amount: 15, date: '2024-01-15' },
    { id: 2, product: 'VIP Subscription', amount: 15, date: '2024-01-14' },
    { id: 3, product: 'Acoustic Guitar Tabs', amount: 8, date: '2024-01-13' }
  ]
};

export default function DashboardPage() {
  const stats = [
    {
      title: 'Total Revenue',
      value: `$${mockCreatorStats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      change: '+12.5%',
      changeType: 'positive' as const
    },
    {
      title: 'Subscribers',
      value: mockCreatorStats.subscribers.toLocaleString(),
      icon: Users,
      change: '+8.2%',
      changeType: 'positive' as const
    },
    {
      title: 'Products',
      value: mockCreatorStats.products.toString(),
      icon: Package,
      change: '+2',
      changeType: 'positive' as const
    },
    {
      title: 'Engagement',
      value: `${mockCreatorStats.engagement}%`,
      icon: TrendingUp,
      change: '+3.1%',
      changeType: 'positive' as const
    }
  ];

  const quickActions = [
    {
      title: 'Customize Branding',
      description: 'Update your logo, colors, and fonts',
      icon: Palette,
      href: '/dashboard/branding',
      color: 'bg-purple-500'
    },
    {
      title: 'Manage Content',
      description: 'Upload and organize your products',
      icon: FileText,
      href: '/dashboard/content',
      color: 'bg-blue-500'
    },
    {
      title: 'Set Monetization',
      description: 'Configure pricing and subscriptions',
      icon: DollarSign,
      href: '/dashboard/monetization',
      color: 'bg-green-500'
    },
    {
      title: 'Engage Community',
      description: 'Connect with your audience',
      icon: Heart,
      href: '/dashboard/community',
      color: 'bg-pink-500'
    }
  ];

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
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Welcome back, Alex! 👋
              </h1>
              <p className="text-muted-foreground">
                Here's what's happening with your creator world today.
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" asChild>
                <Link to="/creator/1">
                  <Eye className="h-4 w-4 mr-2" />
                  View Public Profile
                </Link>
              </Button>
              <Button className="btn-hero" asChild>
                <Link to="/dashboard/content">
                  <Package className="h-4 w-4 mr-2" />
                  Add Product
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <Card key={stat.title} className="card-elevated">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-gradient-primary p-2 rounded-lg">
                    <stat.icon className="h-5 w-5 text-white" />
                  </div>
                  <Badge 
                    variant={stat.changeType === 'positive' ? 'default' : 'destructive'}
                    className="text-xs"
                  >
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
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quickActions.map((action) => (
                    <Link key={action.title} to={action.href}>
                      <Card className="card-interactive p-4 h-full">
                        <CardContent className="p-0">
                          <div className="flex items-start space-x-3">
                            <div className={`${action.color} p-2 rounded-lg`}>
                              <action.icon className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-foreground mb-1">
                                {action.title}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {action.description}
                              </p>
                            </div>
                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Sales */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockCreatorStats.recentSales.map((sale) => (
                    <div key={sale.id} className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground line-clamp-1">
                          {sale.product}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(sale.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-sm font-semibold text-foreground">
                        ${sale.amount}
                      </div>
                    </div>
                  ))}
                  
                  <Link to="/dashboard/monetization" className="block">
                    <Button variant="outline" size="sm" className="w-full">
                      View All Sales
                      <ArrowRight className="h-3 w-3 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Performance Chart Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8"
        >
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
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
      </div>
    </div>
  );
}