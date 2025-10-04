import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Calendar,
  DollarSign,
  Pause,
  Play,
  X,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const subscriptions = [
  {
    id: 1,
    creator: 'Alex Rodriguez',
    creatorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    tier: 'Premium',
    amount: 15,
    billing: 'monthly',
    nextBilling: '2024-02-15',
    status: 'active',
    benefits: ['Exclusive content', 'Discord access', 'Monthly live streams']
  },
  {
    id: 2,
    creator: 'Sarah Johnson',
    creatorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=400',
    tier: 'VIP',
    amount: 25,
    billing: 'monthly',
    nextBilling: '2024-02-20',
    status: 'active',
    benefits: ['All premium content', '1-on-1 sessions', 'Custom workout plans']
  },
  {
    id: 3,
    creator: 'Mike Chen',
    creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    tier: 'Basic',
    amount: 10,
    billing: 'monthly',
    nextBilling: '2024-02-25',
    status: 'paused',
    benefits: ['Weekly tutorials', 'Code snippets', 'Community access']
  }
];

export default function UserSubscriptionsPage() {
  const [subscriptionList, setSubscriptionList] = useState(subscriptions);
  const { toast } = useToast();

  const handlePauseSubscription = (id: number, creatorName: string) => {
    setSubscriptionList(prev => 
      prev.map(sub => 
        sub.id === id ? { ...sub, status: 'paused' } : sub
      )
    );
    toast({
      title: "Subscription paused",
      description: `Your subscription to ${creatorName} has been paused.`,
    });
  };

  const handleResumeSubscription = (id: number, creatorName: string) => {
    setSubscriptionList(prev => 
      prev.map(sub => 
        sub.id === id ? { ...sub, status: 'active' } : sub
      )
    );
    toast({
      title: "Subscription resumed",
      description: `Your subscription to ${creatorName} has been resumed.`,
    });
  };

  const handleCancelSubscription = (id: number, creatorName: string) => {
    setSubscriptionList(prev => prev.filter(sub => sub.id !== id));
    toast({
      title: "Subscription cancelled",
      description: `Your subscription to ${creatorName} has been cancelled.`,
      variant: "destructive"
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-success text-success-foreground">Active</Badge>;
      case 'paused':
        return <Badge variant="secondary">Paused</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const totalMonthlySpend = subscriptionList
    .filter(sub => sub.status === 'active')
    .reduce((total, sub) => total + sub.amount, 0);

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
              My Subscriptions
            </h1>
            <p className="text-muted-foreground">
              Manage your creator subscriptions and billing
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-foreground">
              ${totalMonthlySpend}/month
            </div>
            <div className="text-sm text-muted-foreground">
              Current monthly spend
            </div>
          </div>
        </div>
      </motion.div>

      {/* Alert for upcoming billing */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Alert>
          <Calendar className="h-4 w-4" />
          <AlertDescription>
            Your next billing cycle starts in 3 days. You'll be charged ${totalMonthlySpend} for active subscriptions.
          </AlertDescription>
        </Alert>
      </motion.div>

      {/* Subscriptions List */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-6"
      >
        {subscriptionList.map((subscription) => (
          <Card key={subscription.id} className="card-elevated">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Creator Info */}
                <div className="lg:col-span-2">
                  <div className="flex items-start space-x-4 mb-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={subscription.creatorAvatar} alt={subscription.creator} />
                      <AvatarFallback>{subscription.creator[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-foreground">
                          {subscription.creator}
                        </h3>
                        {getStatusBadge(subscription.status)}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                        <span className="font-medium">{subscription.tier} Tier</span>
                        <span>${subscription.amount}/{subscription.billing}</span>
                        <span>Next billing: {new Date(subscription.nextBilling).toLocaleDateString()}</span>
                      </div>
                      
                      {/* Benefits */}
                      <div>
                        <p className="text-sm font-medium text-foreground mb-2">Benefits:</p>
                        <div className="flex flex-wrap gap-2">
                          {subscription.benefits.map((benefit, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col space-y-3">
                  {subscription.status === 'active' ? (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => handlePauseSubscription(subscription.id, subscription.creator)}
                        className="w-full"
                      >
                        <Pause className="h-4 w-4 mr-2" />
                        Pause Subscription
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleCancelSubscription(subscription.id, subscription.creator)}
                        className="w-full"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancel Subscription
                      </Button>
                    </>
                  ) : subscription.status === 'paused' ? (
                    <>
                      <Button
                        onClick={() => handleResumeSubscription(subscription.id, subscription.creator)}
                        className="w-full btn-hero"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Resume Subscription
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleCancelSubscription(subscription.id, subscription.creator)}
                        className="w-full"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancel Permanently
                      </Button>
                    </>
                  ) : null}
                  
                  <Button variant="outline" className="w-full">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Billing History
                  </Button>
                </div>
              </div>

              {subscription.status === 'paused' && (
                <Alert className="mt-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    This subscription is paused. You won't be charged but will lose access to exclusive content.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {subscriptionList.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="card-elevated">
            <CardContent className="p-12 text-center">
              <div className="text-muted-foreground mb-4">
                <Calendar className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No Active Subscriptions
              </h3>
              <p className="text-muted-foreground mb-6">
                Discover amazing creators and support them with a subscription
              </p>
              <Button className="btn-hero">
                Browse Creators
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}