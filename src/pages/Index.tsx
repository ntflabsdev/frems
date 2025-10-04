import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { 
  Users, 
  DollarSign, 
  Palette, 
  Shield, 
  Zap, 
  Heart, 
  ArrowRight,
  Play,
  CheckCircle
} from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: DollarSign,
      title: 'Multiple Revenue Streams',
      description: 'One-time purchases, subscriptions, and pay-what-you-want options'
    },
    {
      icon: Palette,
      title: 'Full Brand Customization',
      description: 'Custom colors, fonts, logos, and layouts that match your brand'
    },
    {
      icon: Users,
      title: 'Community Building',
      description: 'Live chat, Q&A, and direct fan engagement tools'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with 99.9% uptime guarantee'
    },
    {
      icon: Zap,
      title: 'Instant Setup',
      description: 'Get your creator world live in minutes, not days'
    },
    {
      icon: Heart,
      title: 'Creator-First',
      description: 'Built by creators, for creators. We understand your needs'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Sign Up & Customize',
      description: 'Create your account and design your unique creator world with our easy-to-use builder.'
    },
    {
      number: '02',
      title: 'Add Your Content',
      description: 'Upload your products, set your pricing, and create subscription tiers that work for you.'
    },
    {
      number: '03',
      title: 'Launch & Earn',
      description: 'Share your creator world with your audience and start monetizing your passion immediately.'
    }
  ];

  const stats = [
    { value: '10,000+', label: 'Active Creators' },
    { value: '$2.5M+', label: 'Creator Earnings' },
    { value: '50,000+', label: 'Happy Fans' },
    { value: '99.9%', label: 'Uptime' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="section-padding bg-gradient-secondary">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center mb-6">
                <img 
                  src="/Logo V1.png" 
                  alt="Frems Logo" 
                  className="h-14  w-auto mr-4"
                />
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  ✨ Now with AI-powered recommendations
                </Badge>
              </div>
              
              <h1 className="text-hero mb-6">
                Turn Your Passion Into Your
                <span className="block">Profitable Business</span>
              </h1>
              
              <p className="text-subhero mb-8 max-w-2xl mx-auto">
                FREMS empowers creators to build their own monetization platform with 
                full brand control, multiple revenue streams, and direct fan engagement.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button size="lg" className="btn-hero">
                  Start Creating Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="btn-ghost-hero">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </div>
            </motion.div>

            {/* Hero Image/Video Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl border border-border overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mb-4 mx-auto">
                      <Play className="h-8 w-8 text-white ml-1" />
                    </div>
                    <p className="text-muted-foreground">Platform Demo Video</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful tools designed specifically for content creators who want to 
              build sustainable businesses around their passion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="card-elevated h-full p-6">
                  <CardContent className="p-0">
                    <div className="bg-gradient-primary w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get started in three simple steps and begin earning from your content today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connection lines for desktop */}
            <div className="hidden md:block absolute top-1/2 left-1/3 right-1/3 h-px bg-gradient-to-r from-primary to-accent transform -translate-y-1/2 z-0"></div>

            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative z-10"
              >
                <Card className="card-elevated text-center p-8">
                  <CardContent className="p-0">
                    <div className="bg-gradient-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-white font-bold text-xl">{step.number}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-primary">
        <div className="container-custom">
          <div className="text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Ready to Start Your Creator Journey?
              </h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Join thousands of creators who have already transformed their passion 
                into profitable businesses with FREMS.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/auth/register">
                  <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/discover">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Explore Creators
                  </Button>
                </Link>
              </div>
              
              <div className="flex items-center justify-center space-x-6 mt-8 text-sm opacity-90">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Free to start</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>No setup fees</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;