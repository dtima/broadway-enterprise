'use client';

import { useState } from 'react';
import { useTranslations } from '@/lib/i18n/pure-static';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  HelpCircle, 
  MessageSquare, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  FileText, 
  Download, 
  ExternalLink,
  Send,
  Search,
  Book,
  Video
} from 'lucide-react';
import { motion } from 'framer-motion';


interface SupportTicket {
  name: string;
  email: string;
  subject: string;
  priority: 'low' | 'medium' | 'high';
  message: string;
}

const faqs = [
  {
    question: "How do I place an order for laboratory equipment?",
    answer: "You can browse our catalog, select the equipment you need, and contact us directly through our contact form or phone. Our team will provide a detailed quote and guide you through the ordering process."
  },
  {
    question: "What is the warranty period for your equipment?",
    answer: "Most of our laboratory equipment comes with a 1-2 year manufacturer warranty. Specific warranty terms vary by product and manufacturer. Contact us for detailed warranty information on specific items."
  },
  {
    question: "Do you provide installation and training services?",
    answer: "Yes, we offer comprehensive installation services and training programs for all major equipment purchases. Our certified technicians ensure proper setup and provide hands-on training for your team."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept various payment methods including bank transfers, letters of credit, and institutional purchase orders. Contact our sales team to discuss payment options that work best for your organization."
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship worldwide. Shipping costs and delivery times vary by destination. We handle all export documentation and work with reliable logistics partners to ensure safe delivery."
  },
  {
    question: "How can I get technical support for my equipment?",
    answer: "Our technical support team is available via phone, email, or through this support portal. We provide remote diagnostics, troubleshooting guides, and on-site support when needed."
  }
];

const resources = [
  {
    title: "Equipment Manuals",
    description: "Download user manuals and technical specifications",
    icon: Book,
    type: "documentation"
  },
  {
    title: "Video Tutorials",
    description: "Step-by-step video guides for equipment operation",
    icon: Video,
    type: "video"
  },
  {
    title: "Software Downloads",
    description: "Latest software updates and drivers",
    icon: Download,
    type: "software"
  }
];

export default function SupportPage() {
  const t = useTranslations('support');
  const [activeTab, setActiveTab] = useState('faq');
  const [searchQuery, setSearchQuery] = useState('');
  const [ticket, setTicket] = useState<SupportTicket>({
    name: '',
    email: '',
    subject: '',
    priority: 'medium',
    message: ''
  });
  const [ticketStatus, setTicketStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleTicketSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTicketStatus('submitting');
    
    try {
      // Simulate ticket submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      setTicketStatus('success');
      setTicket({
        name: '',
        email: '',
        subject: '',
        priority: 'medium',
        message: ''
      });
    } catch (error) {
      setTicketStatus('error');
    }
  };

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Support Center
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get the help you need with our comprehensive support resources, FAQs, and expert assistance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          >
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Phone Support</CardTitle>
                <CardDescription>Speak directly with our experts</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-blue-600 mb-2">+237 677 181 487</p>
                <p className="text-sm text-muted-foreground">
                  Monday - Friday<br />
                  8:00 AM - 6:00 PM WAT
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Email Support</CardTitle>
                <CardDescription>Get detailed technical assistance</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold text-green-600 mb-2">support@broadway-corp.com</p>
                <p className="text-sm text-muted-foreground">
                  Response within<br />
                  24 hours
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Support Ticket</CardTitle>
                <CardDescription>Submit a detailed support request</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => setActiveTab('ticket')}
                  className="w-full"
                >
                  Create Ticket
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Support Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="faq">FAQ</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="ticket">Support Ticket</TabsTrigger>
                <TabsTrigger value="status">System Status</TabsTrigger>
              </TabsList>

              <TabsContent value="faq" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <HelpCircle className="h-5 w-5" />
                      Frequently Asked Questions
                    </CardTitle>
                    <CardDescription>
                      Find quick answers to common questions
                    </CardDescription>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search FAQs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {filteredFaqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                          <AccordionTrigger className="text-left">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent>
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                    {filteredFaqs.length === 0 && (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">No FAQs found matching your search.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="resources" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {resources.map((resource, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <resource.icon className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{resource.title}</CardTitle>
                            <Badge variant="outline">{resource.type}</Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">{resource.description}</p>
                        <Button variant="outline" className="w-full">
                          <Download className="h-4 w-4 mr-2" />
                          Access Resource
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="ticket" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Submit Support Ticket</CardTitle>
                    <CardDescription>
                      Provide detailed information about your issue for faster resolution
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {ticketStatus === 'success' ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-8"
                      >
                        <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-green-800 mb-2">
                          Ticket Submitted Successfully!
                        </h3>
                        <p className="text-green-700 mb-4">
                          We've received your support request. Our team will respond within 24 hours.
                        </p>
                        <Button onClick={() => setTicketStatus('idle')}>
                          Submit Another Ticket
                        </Button>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleTicketSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Name *</label>
                            <Input
                              value={ticket.name}
                              onChange={(e) => setTicket(prev => ({ ...prev, name: e.target.value }))}
                              required
                              placeholder="Your full name"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Email *</label>
                            <Input
                              type="email"
                              value={ticket.email}
                              onChange={(e) => setTicket(prev => ({ ...prev, email: e.target.value }))}
                              required
                              placeholder="your.email@example.com"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Subject *</label>
                            <Input
                              value={ticket.subject}
                              onChange={(e) => setTicket(prev => ({ ...prev, subject: e.target.value }))}
                              required
                              placeholder="Brief description of the issue"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Priority</label>
                            <select
                              value={ticket.priority}
                              onChange={(e) => setTicket(prev => ({ ...prev, priority: e.target.value as any }))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                              <option value="low">Low</option>
                              <option value="medium">Medium</option>
                              <option value="high">High</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Message *</label>
                          <Textarea
                            value={ticket.message}
                            onChange={(e) => setTicket(prev => ({ ...prev, message: e.target.value }))}
                            required
                            rows={6}
                            placeholder="Please provide detailed information about your issue, including any error messages, steps to reproduce, and equipment model numbers if applicable..."
                          />
                        </div>

                        <Button
                          type="submit"
                          disabled={ticketStatus === 'submitting'}
                          className="w-full"
                        >
                          {ticketStatus === 'submitting' ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                              Submitting...
                            </>
                          ) : (
                            <>
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Submit Ticket
                            </>
                          )}
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="status" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      System Status
                    </CardTitle>
                    <CardDescription>
                      Current status of our services and systems
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Website & Catalog</h4>
                          <p className="text-sm text-muted-foreground">Main website and product catalog</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Operational
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Email Support</h4>
                          <p className="text-sm text-muted-foreground">Email response system</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Operational
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Phone Support</h4>
                          <p className="text-sm text-muted-foreground">Customer service phone lines</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Operational
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Last Updated:</strong> {new Date().toLocaleString()}
                      </p>
                      <p className="text-sm text-blue-700 mt-1">
                        All systems are currently operational. If you're experiencing issues, please contact our support team.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
