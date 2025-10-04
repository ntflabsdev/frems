import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, CheckCircle } from 'lucide-react';
import { Creator } from '@/lib/mockData';

interface CreatorCardProps {
  creator: Creator;
}

export function CreatorCard({ creator }: CreatorCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="card-interactive overflow-hidden h-full">
        <CardContent className="p-0">
          {/* Header with gradient background */}
          <div 
            className="h-24 bg-gradient-to-r from-primary/20 to-accent/20 relative"
            style={{
              background: `linear-gradient(135deg, ${creator.branding.primaryColor}20, ${creator.branding.secondaryColor}20)`
            }}
          >
            <div className="absolute -bottom-8 left-6">
              <Avatar className="h-16 w-16 border-4 border-background">
                <AvatarImage src={creator.avatar} alt={creator.displayName} />
                <AvatarFallback className="text-lg font-semibold">
                  {creator.displayName[0]}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 pt-10">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-lg text-foreground">
                  {creator.displayName}
                </h3>
                {creator.isVerified && (
                  <CheckCircle className="h-4 w-4 text-primary" />
                )}
              </div>
              <Badge variant="secondary" className="text-xs">
                {creator.category}
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {creator.bio}
            </p>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{creator.subscriberCount.toLocaleString()} followers</span>
              </div>
              <div className="text-sm font-medium text-foreground">
                {creator.products.length} product{creator.products.length !== 1 ? 's' : ''}
              </div>
            </div>

            <Link to={`/creator/${creator.id}`}>
              <Button 
                className="w-full font-medium"
                style={{
                  backgroundColor: creator.branding.primaryColor,
                  color: 'white'
                }}
              >
                Visit Creator
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}