// Mock data for FREMS platform

export interface Creator {
  id: string;
  username: string;
  displayName: string;
  email: string;
  avatar: string;
  category: string;
  bio: string;
  isVerified: boolean;
  subscriberCount: number;
  totalRevenue: number;
  branding: {
    primaryColor: string;
    secondaryColor: string;
    logo?: string;
    font: string;
    template: 'modern' | 'classic';
  };
  products: Product[];
  subscriptionTiers: SubscriptionTier[];
  socialLinks: {
    instagram?: string;
    tiktok?: string;
    youtube?: string;
    website?: string;
  };
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  type: 'digital' | 'physical';
  inventory?: number;
  downloads?: number;
}

export interface SubscriptionTier {
  id: string;
  name: string;
  price: number;
  interval: 'monthly' | 'yearly';
  benefits: string[];
  subscriberCount: number;
}

export interface Transaction {
  id: string;
  creatorId: string;
  creatorName: string;
  amount: number;
  commission: number;
  date: string;
  type: 'product' | 'subscription' | 'tip';
  status: 'completed' | 'pending' | 'failed';
}

export const mockCreators: Creator[] = [
  {
    id: '1',
    username: 'alexmusic',
    displayName: 'Alex Rodriguez',
    email: 'alex@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    category: 'Music',
    bio: 'Independent musician creating lo-fi beats and acoustic covers',
    isVerified: true,
    subscriberCount: 2450,
    totalRevenue: 12500,
    branding: {
      primaryColor: '#8B5CF6',
      secondaryColor: '#F3E8FF',
      font: 'Inter',
      template: 'modern'
    },
    products: [
      {
        id: 'p1',
        name: 'Lo-Fi Beat Pack Vol. 1',
        description: 'Collection of 20 original lo-fi beats for study and relaxation',
        price: 15,
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
        type: 'digital',
        downloads: 150
      },
      {
        id: 'p2',
        name: 'Acoustic Guitar Tabs',
        description: 'Sheet music and tabs for 10 popular acoustic covers',
        price: 8,
        image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400',
        type: 'digital',
        downloads: 89
      }
    ],
    subscriptionTiers: [
      {
        id: 's1',
        name: 'Supporter',
        price: 5,
        interval: 'monthly',
        benefits: ['Early access to new releases', 'Monthly live streams', 'Discord access'],
        subscriberCount: 120
      },
      {
        id: 's2',
        name: 'VIP',
        price: 15,
        interval: 'monthly',
        benefits: ['All Supporter benefits', 'Monthly exclusive tracks', 'Personal feedback on your music', '1-on-1 monthly call'],
        subscriberCount: 45
      }
    ],
    socialLinks: {
      instagram: 'https://instagram.com/alexmusic',
      youtube: 'https://youtube.com/alexmusic',
      website: 'https://alexmusic.com'
    }
  },
  {
    id: '2',
    username: 'fitnessguru',
    displayName: 'Sarah Johnson',
    email: 'sarah@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=400',
    category: 'Fitness',
    bio: 'Certified personal trainer helping you achieve your fitness goals',
    isVerified: true,
    subscriberCount: 3200,
    totalRevenue: 18750,
    branding: {
      primaryColor: '#10B981',
      secondaryColor: '#D1FAE5',
      font: 'Inter',
      template: 'modern'
    },
    products: [
      {
        id: 'p3',
        name: '30-Day Home Workout Guide',
        description: 'Complete workout program requiring no gym equipment',
        price: 25,
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
        type: 'digital',
        downloads: 300
      }
    ],
    subscriptionTiers: [
      {
        id: 's3',
        name: 'Fitness Friend',
        price: 10,
        interval: 'monthly',
        benefits: ['Weekly workout plans', 'Nutrition guides', 'Progress tracking templates'],
        subscriberCount: 200
      }
    ],
    socialLinks: {
      instagram: 'https://instagram.com/fitnessguru',
      tiktok: 'https://tiktok.com/@fitnessguru'
    }
  },
  {
    id: '3',
    username: 'artcreator',
    displayName: 'Maya Chen',
    email: 'maya@example.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    category: 'Art',
    bio: 'Digital artist specializing in character design and illustrations',
    isVerified: false,
    subscriberCount: 890,
    totalRevenue: 5600,
    branding: {
      primaryColor: '#F59E0B',
      secondaryColor: '#FEF3C7',
      font: 'Inter',
      template: 'classic'
    },
    products: [
      {
        id: 'p4',
        name: 'Character Design Workshop',
        description: 'Learn my process for creating compelling character designs',
        price: 35,
        image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400',
        type: 'digital',
        downloads: 45
      }
    ],
    subscriptionTiers: [
      {
        id: 's4',
        name: 'Art Supporter',
        price: 8,
        interval: 'monthly',
        benefits: ['High-res artwork downloads', 'Process videos', 'Art tips and tricks'],
        subscriberCount: 67
      }
    ],
    socialLinks: {
      instagram: 'https://instagram.com/artcreator'
    }
  }
];

export const mockTransactions: Transaction[] = [
  {
    id: 't1',
    creatorId: '1',
    creatorName: 'Alex Rodriguez',
    amount: 15,
    commission: 0.83,
    date: '2024-01-15T10:30:00Z',
    type: 'product',
    status: 'completed'
  },
  {
    id: 't2',
    creatorId: '2',
    creatorName: 'Sarah Johnson',
    amount: 25,
    commission: 1.38,
    date: '2024-01-14T14:20:00Z',
    type: 'product',
    status: 'completed'
  },
  {
    id: 't3',
    creatorId: '1',
    creatorName: 'Alex Rodriguez',
    amount: 5,
    commission: 0.28,
    date: '2024-01-13T09:15:00Z',
    type: 'subscription',
    status: 'completed'
  }
];

export const categories = [
  'All',
  'Music',
  'Fitness',
  'Art',
  'Technology',
  'Education',
  'Gaming',
  'Cooking',
  'Photography',
  'Writing'
];

export const interests = [
  'Music Production',
  'Fitness & Health',
  'Digital Art',
  'Technology',
  'Cooking',
  'Photography',
  'Writing',
  'Gaming',
  'Education',
  'Business',
  'Science',
  'Sports'
];