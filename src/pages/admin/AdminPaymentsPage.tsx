import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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
  Search, 
  DollarSign, 
  TrendingUp, 
  Download, 
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Calendar
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock transactions data
const mockTransactions = [
  {
    id: 't1',
    creatorId: '1',
    creatorName: 'Alex Rodriguez',
    customerName: 'John Doe',
    amount: 15,
    commission: 0.83,
    netAmount: 14.17,
    date: '2024-01-15T10:30:00Z',
    type: 'product',
    productName: 'Lo-Fi Beat Pack Vol. 1',
    status: 'completed',
    paymentMethod: 'stripe'
  },
  {
    id: 't2',
    creatorId: '2',
    creatorName: 'Sarah Johnson',
    customerName: 'Jane Smith',
    amount: 25,
    commission: 1.38,
    netAmount: 23.62,
    date: '2024-01-14T14:20:00Z',
    type: 'product',
    productName: '30-Day Home Workout Guide',
    status: 'completed',
    paymentMethod: 'stripe'
  },
  {
    id: 't3',
    creatorId: '1',
    creatorName: 'Alex Rodriguez',
    customerName: 'Mike Wilson',
    amount: 5,
    commission: 0.28,
    netAmount: 4.72,
    date: '2024-01-13T09:15:00Z',
    type: 'subscription',
    productName: 'Supporter Tier',
    status: 'completed',
    paymentMethod: 'stripe'
  },
  {
    id: 't4',
    creatorId: '3',
    creatorName: 'Maya Chen',
    customerName: 'Lisa Brown',
    amount: 35,
    commission: 1.93,
    netAmount: 33.07,
    date: '2024-01-12T16:45:00Z',
    type: 'product',
    productName: 'Character Design Workshop',
    status: 'pending',
    paymentMethod: 'paypal'
  }
];

// Mock payout requests
const mockPayouts = [
  {
    id: 'p1',
    creatorId: '1',
    creatorName: 'Alex Rodriguez',
    amount: 247.50,
    requestedDate: '2024-01-15',
    status: 'pending',
    paymentMethod: 'bank_transfer'
  },
  {
    id: 'p2',
    creatorId: '2',
    creatorName: 'Sarah Johnson',
    amount: 189.30,
    requestedDate: '2024-01-14',
    status: 'completed',
    paymentMethod: 'paypal',
    completedDate: '2024-01-15'
  }
];

export default function AdminPaymentsPage() {
  const [activeTab, setActiveTab] = useState('transactions');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const { toast } = useToast();

  const handleProcessPayout = (payoutId: string, creatorName: string) => {
    toast({
      title: "Payout processed!",
      description: `Payout for ${creatorName} has been processed successfully.`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default">Completed</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'product':
        return <ArrowUpRight className="h-4 w-4 text-success" />;
      case 'subscription':
        return <ArrowUpRight className="h-4 w-4 text-primary" />;
      case 'tip':
        return <ArrowUpRight className="h-4 w-4 text-accent" />;
      default:
        return <DollarSign className="h-4 w-4" />;
    }
  };

  const totalRevenue = mockTransactions.reduce((sum, t) => sum + t.amount, 0);
  const totalCommission = mockTransactions.reduce((sum, t) => sum + t.commission, 0);
  const completedTransactions = mockTransactions.filter(t => t.status === 'completed').length;
  const pendingPayouts = mockPayouts.filter(p => p.status === 'pending').length;

  const filteredTransactions = mockTransactions.filter(transaction => {
    const matchesSearch = transaction.creatorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transaction.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transaction.productName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        isAuthenticated={true} 
        user={{ name: 'Admin User', avatar: '', isCreator: false }} 
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
                Payment Management
              </h1>
              <p className="text-muted-foreground">
                Monitor transactions, commissions, and payouts
              </p>
            </div>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Total Revenue</span>
              </div>
              <div className="text-2xl font-bold text-foreground">
                ${totalRevenue.toFixed(2)}
              </div>
              <div className="text-sm text-success">+12.5% this month</div>
            </CardContent>
          </Card>
          
          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="h-5 w-5 text-success" />
                <span className="text-sm font-medium">Commission Earned</span>
              </div>
              <div className="text-2xl font-bold text-foreground">
                ${totalCommission.toFixed(2)}
              </div>
              <div className="text-sm text-muted-foreground">5.5% average</div>
            </CardContent>
          </Card>
          
          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-2">
                <ArrowUpRight className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Transactions</span>
              </div>
              <div className="text-2xl font-bold text-foreground">
                {completedTransactions}
              </div>
              <div className="text-sm text-success">+8 this week</div>
            </CardContent>
          </Card>
          
          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="h-5 w-5 text-warning" />
                <span className="text-sm font-medium">Pending Payouts</span>
              </div>
              <div className="text-2xl font-bold text-foreground">
                {pendingPayouts}
              </div>
              <div className="text-sm text-muted-foreground">Awaiting processing</div>
            </CardContent>
          </Card>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="payouts">Payouts</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Transactions Tab */}
          <TabsContent value="transactions">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Filters */}
              <Card className="card-elevated mb-6">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        placeholder="Search transactions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="product">Product</SelectItem>
                        <SelectItem value="subscription">Subscription</SelectItem>
                        <SelectItem value="tip">Tip</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      More Filters
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Transactions Table */}
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredTransactions.map((transaction) => (
                      <div key={transaction.id} className="p-4 border border-border rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                          <div className="flex items-center space-x-3">
                            {getTypeIcon(transaction.type)}
                            <div>
                              <div className="font-medium text-foreground text-sm">
                                {transaction.productName}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {transaction.type}
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-sm font-medium">{transaction.creatorName}</div>
                            <div className="text-xs text-muted-foreground">Creator</div>
                          </div>
                          
                          <div>
                            <div className="text-sm">{transaction.customerName}</div>
                            <div className="text-xs text-muted-foreground">Customer</div>
                          </div>
                          
                          <div>
                            <div className="text-sm font-medium">${transaction.amount}</div>
                            <div className="text-xs text-muted-foreground">
                              Commission: ${transaction.commission.toFixed(2)}
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-sm">
                              {new Date(transaction.date).toLocaleDateString()}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {new Date(transaction.date).toLocaleTimeString()}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-end space-x-2">
                            {getStatusBadge(transaction.status)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Payouts Tab */}
          <TabsContent value="payouts">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle>Payout Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockPayouts.map((payout) => (
                      <div key={payout.id} className="p-4 border border-border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div>
                              <h3 className="font-medium text-foreground">{payout.creatorName}</h3>
                              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                <span>Amount: ${payout.amount}</span>
                                <span>Method: {payout.paymentMethod.replace('_', ' ')}</span>
                                <span>Requested: {new Date(payout.requestedDate).toLocaleDateString()}</span>
                                {payout.completedDate && (
                                  <span>Completed: {new Date(payout.completedDate).toLocaleDateString()}</span>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            {getStatusBadge(payout.status)}
                            {payout.status === 'pending' && (
                              <Button 
                                size="sm"
                                onClick={() => handleProcessPayout(payout.id, payout.creatorName)}
                              >
                                Process Payout
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="card-elevated">
                  <CardHeader>
                    <CardTitle>Revenue Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Product Sales</span>
                        <span className="font-medium">$75.00 (94%)</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Subscriptions</span>
                        <span className="font-medium">$5.00 (6%)</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t">
                        <span className="font-medium">Total</span>
                        <span className="font-bold">$80.00</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-elevated">
                  <CardHeader>
                    <CardTitle>Commission Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Platform Commission (5.5%)</span>
                        <span className="font-medium">$4.42</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Creator Earnings</span>
                        <span className="font-medium">$75.58</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t">
                        <span className="font-medium">Total Processed</span>
                        <span className="font-bold">$80.00</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="card-elevated mt-6">
                <CardHeader>
                  <CardTitle>Payment Analytics Chart</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-secondary rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Payment analytics chart will appear here
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