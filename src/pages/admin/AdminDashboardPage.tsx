import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Activity,
  Clock,
  CheckCircle,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock admin stats
const adminStats = {
  totalCreators: 156,
  pendingReviews: 8,
  totalRevenue: 245680,
  platformCommission: 13512,
  monthlyGrowth: 12.5,
  activeSubscriptions: 1247
};

const recentActivity = [
  { id: 1, type: 'creator_approved', message: 'New creator Emma Wilson approved', time: '2 hours ago' },
  { id: 2, type: 'payment_processed', message: 'Payment of $150 processed for Alex Rodriguez', time: '4 hours ago' },
  { id: 3, type: 'creator_pending', message: 'David Kim submitted creator application', time: '6 hours ago' },
  { id: 4, type: 'subscription_created', message: 'New subscription to Sarah Johnson', time: '8 hours ago' }
];

const topCreators = [
  { id: 1, name: 'Alex Rodriguez', category: 'Music', revenue: 12500, growth: 15.2 },
  { id: 2, name: 'Sarah Johnson', category: 'Fitness', revenue: 18750, growth: 23.1 },
  { id: 3, name: 'Mike Chen', category: 'Tech', revenue: 9800, growth: -2.5 },
  { id: 4, name: 'Lisa Park', category: 'Art', revenue: 14200, growth: 8.7 }
];

export default function AdminDashboardPage() {
  const stats = [
    {
      title: 'Total Creators',
      value: adminStats.totalCreators.toString(),
      icon: Users,
      change: '+12.5%',
      changeType: 'positive' as const
    },
    {
      title: 'Pending Reviews',
      value: adminStats.pendingReviews.toString(),
      icon: Clock,
      change: '+3',
      changeType: 'neutral' as const
    },
    {
      title: 'Platform Revenue',
      value: `$${adminStats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      change: '+18.2%',
      changeType: 'positive' as const
    },
    {
      title: 'Commission Earned',
      value: `$${adminStats.platformCommission.toLocaleString()}`,
      icon: TrendingUp,
      change: '+22.1%',
      changeType: 'positive' as const
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'creator_approved':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'payment_processed':
        return <DollarSign className="h-4 w-4 text-primary" />;
      case 'creator_pending':
        return <Clock className="h-4 w-4 text-warning" />;
      case 'subscription_created':
        return <Users className="h-4 w-4 text-blue-500" />;
      default:
        return <Activity className="h-4 w-4 text-muted-foreground" />;
    }
  };

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
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Platform overview and management tools
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" asChild>
              <Link to="/admin/creators">
                <Clock className="h-4 w-4 mr-2" />
                Review Applications ({adminStats.pendingReviews})
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
                <Badge 
                  variant={
                    stat.changeType === 'positive' ? 'default' : 
                    stat.changeType === 'neutral' ? 'secondary' : 
                    'destructive'
                  }
                  className="text-xs"
                >
                  {stat.changeType === 'positive' ? (
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                  ) : stat.changeType === 'neutral' ? null : (
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                  )}
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
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    {getActivityIcon(activity.type)}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {activity.message}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full mt-4">
                  View All Activity
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Top Performing Creators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Top Creators</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCreators.map((creator, index) => (
                  <div key={creator.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {creator.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {creator.category}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-foreground">
                        ${creator.revenue.toLocaleString()}
                      </p>
                      <div className="flex items-center text-xs">
                        {creator.growth > 0 ? (
                          <ArrowUpRight className="h-3 w-3 text-success mr-1" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 text-destructive mr-1" />
                        )}
                        <span className={creator.growth > 0 ? 'text-success' : 'text-destructive'}>
                          {Math.abs(creator.growth)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Link to="/admin/creators" className="block">
                  <Button variant="outline" size="sm" className="w-full">
                    View All Creators
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>Platform Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/admin/creators">
                <Card className="card-interactive p-4 h-full">
                  <CardContent className="p-0">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-500 p-2 rounded-lg">
                        <Users className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">
                          Manage Creators
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Review applications and manage accounts
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/admin/payments">
                <Card className="card-interactive p-4 h-full">
                  <CardContent className="p-0">
                    <div className="flex items-center space-x-3">
                      <div className="bg-green-500 p-2 rounded-lg">
                        <DollarSign className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">
                          Payment Management
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Handle transactions and payouts
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Card className="card-interactive p-4 h-full">
                <CardContent className="p-0">
                  <div className="flex items-center space-x-3">
                    <div className="bg-purple-500 p-2 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        Analytics
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        View platform performance metrics
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}