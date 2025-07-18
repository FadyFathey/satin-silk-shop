import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send, 
  Heart,
  Headphones,
  Package,
  CreditCard,
  Users
} from 'lucide-react';

const contactMethods = [
  {
    icon: Mail,
    title: 'Email Support',
    description: 'Get help via email',
    contact: 'support@elegantlingerie.com',
    available: '24/7'
  },
  {
    icon: Phone,
    title: 'Phone Support',
    description: 'Speak with our team',
    contact: '+1 (555) 123-4567',
    available: 'Mon-Fri 9AM-6PM EST'
  },
  {
    icon: MessageCircle,
    title: 'Live Chat',
    description: 'Instant messaging support',
    contact: 'Available on website',
    available: 'Mon-Fri 9AM-8PM EST'
  },
  {
    icon: MapPin,
    title: 'Visit Our Store',
    description: 'In-person fitting & consultation',
    contact: '123 Fashion Ave, NYC',
    available: 'Mon-Sat 10AM-7PM'
  }
];

const faqCategories = [
  {
    icon: Package,
    title: 'Orders & Shipping',
    description: 'Questions about your order, shipping, and delivery',
    topics: ['Order tracking', 'Shipping options', 'Delivery times', 'International shipping']
  },
  {
    icon: CreditCard,
    title: 'Returns & Exchanges',
    description: 'Information about returns, exchanges, and refunds',
    topics: ['Return policy', 'Exchange process', 'Refund timeline', 'Return shipping']
  },
  {
    icon: Users,
    title: 'Sizing & Fit',
    description: 'Help finding your perfect size and fit',
    topics: ['Size guide', 'Fit consultation', 'Size exchanges', 'Measurement tips']
  },
  {
    icon: Headphones,
    title: 'Product Care',
    description: 'How to care for your lingerie',
    topics: ['Washing instructions', 'Storage tips', 'Fabric care', 'Longevity advice']
  }
];

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you within 24 hours.",
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      category: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-2">
              <Heart className="h-6 w-6 text-primary" />
              <Badge variant="outline">We're Here to Help</Badge>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold">
              Get in
              <span className="text-primary block">Touch</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions about our products, need sizing help, or want to share feedback? 
              We'd love to hear from you and are here to help with anything you need.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold">How Can We Help?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the contact method that works best for you. Our customer service team is ready to assist.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                    <method.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{method.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{method.description}</p>
                    <p className="text-sm font-medium">{method.contact}</p>
                    <div className="flex items-center justify-center gap-1 mt-2">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{method.available}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5 text-primary" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="text-sm font-medium mb-2 block">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="text-sm font-medium mb-2 block">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="category" className="text-sm font-medium mb-2 block">
                      Category
                    </label>
                    <Select value={formData.category} onValueChange={(value) => 
                      setFormData(prev => ({ ...prev, category: value }))
                    }>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="sizing">Sizing Help</SelectItem>
                        <SelectItem value="order">Order Support</SelectItem>
                        <SelectItem value="product">Product Question</SelectItem>
                        <SelectItem value="returns">Returns & Exchanges</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label htmlFor="subject" className="text-sm font-medium mb-2 block">
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Brief description of your inquiry"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="text-sm font-medium mb-2 block">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us how we can help you..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* FAQ Categories */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-4">Frequently Asked About</h3>
                <p className="text-muted-foreground mb-6">
                  Quick answers to common questions. Can't find what you're looking for? Send us a message!
                </p>
              </div>

              <div className="space-y-4">
                {faqCategories.map((category, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <category.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-semibold">{category.title}</h4>
                          <p className="text-sm text-muted-foreground">{category.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {category.topics.map((topic, topicIndex) => (
                              <Badge key={topicIndex} variant="secondary" className="text-xs">
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Store Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-4">Visit Our Flagship Store</h2>
                <p className="text-muted-foreground">
                  Experience our complete collection in person at our beautifully designed flagship store. 
                  Our expert fitting specialists are available to help you find your perfect size and style.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">123 Fashion Avenue</p>
                    <p className="text-sm text-muted-foreground">New York, NY 10001</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Store Hours</p>
                    <p className="text-sm text-muted-foreground">Mon-Sat: 10AM-7PM | Sun: 12PM-5PM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Store Phone</p>
                    <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>

              <Button size="lg" className="w-fit">
                <MapPin className="h-4 w-4 mr-2" />
                Get Directions
              </Button>
            </div>

            <div className="aspect-video rounded-lg overflow-hidden bg-muted">
              <img 
                src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop" 
                alt="Our flagship store" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}