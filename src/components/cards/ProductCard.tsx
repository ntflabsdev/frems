import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Package } from 'lucide-react';
import { Product } from '@/lib/mockData';

interface ProductCardProps {
  product: Product;
  creatorColor?: string;
  onPurchase?: (productId: string) => void;
}

export function ProductCard({ product, creatorColor = '#8B5CF6', onPurchase }: ProductCardProps) {
  const handlePurchase = () => {
    onPurchase?.(product.id);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="card-interactive overflow-hidden h-full">
        <CardContent className="p-0">
          {/* Product Image */}
          <div className="relative aspect-video bg-muted">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 right-3">
              <Badge variant={product.type === 'digital' ? 'default' : 'secondary'}>
                {product.type === 'digital' ? (
                  <Download className="h-3 w-3 mr-1" />
                ) : (
                  <Package className="h-3 w-3 mr-1" />
                )}
                {product.type}
              </Badge>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-2 line-clamp-1">
              {product.name}
            </h3>
            
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {product.description}
            </p>

            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl font-bold text-foreground">
                ${product.price}
              </div>
              
              {product.downloads && (
                <div className="text-sm text-muted-foreground">
                  {product.downloads} downloads
                </div>
              )}
              
              {product.inventory && (
                <div className="text-sm text-muted-foreground">
                  {product.inventory} in stock
                </div>
              )}
            </div>

            <Button 
              onClick={handlePurchase}
              className="w-full font-medium"
              style={{
                backgroundColor: creatorColor,
                color: 'white'
              }}
            >
              Purchase Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}