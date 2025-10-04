import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Navbar } from '@/components/layout/Navbar';
import { 
  ArrowLeft, 
  MessageSquare, 
  Users, 
  Calendar,
  Send,
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Mic,
  Video
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data
const mockMessages = [
  {
    id: 1,
    user: 'MusicFan92',
    message: 'Love the new beat pack! When can we expect the next one?',
    timestamp: '2 minutes ago',
    likes: 5,
    isCreator: false
  },
  {
    id: 2,
    user: 'Alex Rodriguez',
    message: 'Thanks everyone! Working on Vol. 2 right now. Should be ready next week! 🎵',
    timestamp: '5 minutes ago',
    likes: 12,
    isCreator: true
  },
  {
    id: 3,
    user: 'BeatLover',
    message: 'The acoustic tabs are amazing! Thank you for sharing your knowledge.',
    timestamp: '10 minutes ago',
    likes: 3,
    isCreator: false
  }
];

const mockQAs = [
  {
    id: 1,
    question: 'What DAW do you use for production?',
    author: 'ProducerLife',
    votes: 15,
    answered: true,
    answer: 'I primarily use Ableton Live with some plugins from Native Instruments!'
  },
  {
    id: 2,
    question: 'Will you do any collaborations this year?',
    author: 'CollabSeeker',
    votes: 8,
    answered: false
  },
  {
    id: 3,
    question: 'How long have you been making music?',
    author: 'NewFan',
    votes: 12,
    answered: true,
    answer: 'Started about 6 years ago in my bedroom, and been loving every moment of it!'
  }
];

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState('chat');
  const [newMessage, setNewMessage] = useState('');
  const [newAnnouncement, setNewAnnouncement] = useState('');
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      toast({
        title: "Message sent!",
        description: "Your message has been posted to the community.",
      });
      setNewMessage('');
    }
  };

  const handleAnnouncement = () => {
    if (newAnnouncement.trim()) {
      toast({
        title: "Announcement posted!",
        description: "Your announcement has been shared with all subscribers.",
      });
      setNewAnnouncement('');
    }
  };

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
              <Link 
                to="/dashboard" 
                className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Community Tools
              </h1>
              <p className="text-muted-foreground">
                Engage with your audience and build your community
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Live
              </Button>
              <Button className="btn-hero">
                <Video className="h-4 w-4 mr-2" />
                Go Live
              </Button>
            </div>
          </div>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="chat">Live Chat</TabsTrigger>
            <TabsTrigger value="qa">Q&A</TabsTrigger>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
            <TabsTrigger value="analytics">Community Stats</TabsTrigger>
          </TabsList>

          {/* Live Chat Tab */}
          <TabsContent value="chat">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Chat Messages */}
                <div className="lg:col-span-2">
                  <Card className="card-elevated">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <MessageSquare className="h-5 w-5" />
                        <span>Community Chat</span>
                        <Badge variant="outline" className="ml-auto">
                          32 online
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                        {mockMessages.map((msg) => (
                          <div 
                            key={msg.id} 
                            className={`p-3 rounded-lg ${
                              msg.isCreator 
                                ? 'bg-primary/10 border border-primary/20' 
                                : 'bg-muted'
                            }`}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <span className={`font-medium text-sm ${
                                  msg.isCreator ? 'text-primary' : 'text-foreground'
                                }`}>
                                  {msg.user}
                                  {msg.isCreator && (
                                    <Badge variant="default" className="ml-2 text-xs">
                                      Creator
                                    </Badge>
                                  )}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {msg.timestamp}
                                </span>
                              </div>
                              <Button size="sm" variant="ghost">
                                <MoreHorizontal className="h-3 w-3" />
                              </Button>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {msg.message}
                            </p>
                            <div className="flex items-center space-x-4">
                              <Button size="sm" variant="ghost" className="text-xs">
                                <Heart className="h-3 w-3 mr-1" />
                                {msg.likes}
                              </Button>
                              <Button size="sm" variant="ghost" className="text-xs">
                                <MessageCircle className="h-3 w-3 mr-1" />
                                Reply
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Type a message to your community..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                        <Button onClick={handleSendMessage}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Chat Settings */}
                <div>
                  <Card className="card-elevated mb-6">
                    <CardHeader>
                      <CardTitle>Chat Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button variant="outline" size="sm" className="w-full">
                        Moderate Chat
                      </Button>
                      <Button variant="outline" size="sm" className="w-full">
                        Pin Message
                      </Button>
                      <Button variant="outline" size="sm" className="w-full">
                        Export Chat
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="card-elevated">
                    <CardHeader>
                      <CardTitle>Active Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>MusicFan92</span>
                          <Badge variant="secondary">Supporter</Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>BeatLover</span>
                          <Badge variant="outline">Free</Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>ProducerLife</span>
                          <Badge variant="default">VIP</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          </TabsContent>

          {/* Q&A Tab */}
          <TabsContent value="qa">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle>Community Q&A</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockQAs.map((qa) => (
                      <div key={qa.id} className="p-4 border border-border rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="font-medium text-foreground mb-1">
                              {qa.question}
                            </h3>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span>by {qa.author}</span>
                              <div className="flex items-center space-x-1">
                                <Heart className="h-3 w-3" />
                                <span>{qa.votes} votes</span>
                              </div>
                            </div>
                          </div>
                          <Badge variant={qa.answered ? 'default' : 'secondary'}>
                            {qa.answered ? 'Answered' : 'Pending'}
                          </Badge>
                        </div>
                        
                        {qa.answered && qa.answer && (
                          <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 mt-3">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="text-sm font-medium text-primary">
                                Your Answer:
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {qa.answer}
                            </p>
                          </div>
                        )}
                        
                        {!qa.answered && (
                          <Button size="sm" variant="outline" className="mt-2">
                            Answer Question
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Announcements Tab */}
          <TabsContent value="announcements">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="card-elevated mb-6">
                <CardHeader>
                  <CardTitle>Create Announcement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Share an important update with your community..."
                      value={newAnnouncement}
                      onChange={(e) => setNewAnnouncement(e.target.value)}
                      rows={4}
                    />
                    <div className="flex justify-end space-x-3">
                      <Button variant="outline">
                        Save Draft
                      </Button>
                      <Button onClick={handleAnnouncement}>
                        Post Announcement
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle>Recent Announcements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-16">
                    <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      No announcements yet
                    </h3>
                    <p className="text-muted-foreground">
                      Your announcements will appear here
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Community Analytics Tab */}
          <TabsContent value="analytics">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="card-elevated">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <Users className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium">Total Members</span>
                    </div>
                    <div className="text-2xl font-bold text-foreground">
                      2,450
                    </div>
                    <div className="text-sm text-success">+125 this month</div>
                  </CardContent>
                </Card>
                
                <Card className="card-elevated">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <MessageSquare className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium">Messages</span>
                    </div>
                    <div className="text-2xl font-bold text-foreground">
                      1,247
                    </div>
                    <div className="text-sm text-success">+89 this week</div>
                  </CardContent>
                </Card>
                
                <Card className="card-elevated">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <Heart className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium">Engagement</span>
                    </div>
                    <div className="text-2xl font-bold text-foreground">
                      85%
                    </div>
                    <div className="text-sm text-success">+5% this month</div>
                  </CardContent>
                </Card>
              </div>

              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle>Engagement Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-secondary rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Community engagement chart will appear here
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