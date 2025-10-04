import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Users } from 'lucide-react';
import { SubscriptionTier } from '@/lib/mockData';

interface SubscriptionCardProps {
  tier: SubscriptionTier;
  creatorColor?: string;
  isPopular?: boolean;
  onSubscribe?: (tierId: string) => void;
}

export function SubscriptionCard({ 
  tier, 
  creatorColor = '#8B5CF6', 
  isPopular = false,
  onSubscribe 
}: SubscriptionCardProps) {
  const handleSubscribe = () => {
    onSubscribe?.(tier.id);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="relative"
    >
      {isPopular && (
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-10">
          <Badge 
            className="bg-gradient-primary text-white px-3 py-1"
          >
            Most Popular
          </Badge>
        </div>
      )}
      
      <Card className={`card-elevated h-full ${isPopular ? 'ring-2 ring-primary/20' : ''}`}>
        <CardHeader className="text-center pb-4">
          <h3 className="text-xl font-bold text-foreground">{tier.name}</h3>
          <div className="flex items-baseline justify-center space-x-1">
            <span className="text-3xl font-bold text-foreground">${tier.price}</span>
            <span className="text-muted-foreground">/{tier.interval}</span>
          </div>
          
          <div className="flex items-center justify-center space-x-1 text-sm text-muted-foreground mt-2">
            <Users className="h-4 w-4" />
            <span>{tier.subscriberCount} subscribers</span>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <ul className="space-y-3 mb-6">
            {tier.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start space-x-2">
                <Check 
                  className="h-4 w-4 mt-0.5 flex-shrink-0"
                  style={{ color: creatorColor }}
                />
                <span className="text-sm text-muted-foreground">{benefit}</span>
              </li>
            ))}
          </ul>

          <Button 
            onClick={handleSubscribe}
            className="w-full font-medium"
            variant={isPopular ? 'default' : 'outline'}
            style={isPopular ? {
              backgroundColor: creatorColor,
              color: 'white',
              borderColor: creatorColor
            } : {
              borderColor: creatorColor,
              color: creatorColor
            }}
          >
            Subscribe Now
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}