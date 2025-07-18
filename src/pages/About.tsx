import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Users, Award, Sparkles, ArrowRight, Shield, Leaf, Truck } from 'lucide-react';

const teamMembers = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Founder & Creative Director',
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&face',
    bio: 'With over 15 years in fashion design, Sarah founded our brand with a vision to create lingerie that empowers women.'
  },
  {
    id: 2,
    name: 'Maria Rodriguez',
    role: 'Head of Design',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&face',
    bio: 'Maria brings her expertise in textile engineering to create innovative fabrics that prioritize comfort and sustainability.'
  },
  {
    id: 3,
    name: 'Emily Thompson',
    role: 'Customer Experience Lead',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop&face',
    bio: 'Emily ensures every customer feels heard and valued, leading our commitment to exceptional service and fit guidance.'
  }
];

const values = [
  {
    icon: Heart,
    title: 'Body Positivity',
    description: 'We celebrate all body types and believe every woman deserves to feel beautiful and confident in her own skin.'
  },
  {
    icon: Leaf,
    title: 'Sustainability',
    description: 'Our commitment to the environment drives us to use eco-friendly materials and ethical manufacturing practices.'
  },
  {
    icon: Shield,
    title: 'Quality First',
    description: 'We never compromise on quality, using only the finest materials and rigorous testing to ensure durability.'
  },
  {
    icon: Users,
    title: 'Community',
    description: 'We build a supportive community where women can share experiences and celebrate confidence together.'
  }
];

const milestones = [
  { year: '2018', event: 'Founded with a dream to create better lingerie' },
  { year: '2019', event: 'Launched our first sustainable collection' },
  { year: '2020', event: 'Reached 10,000 happy customers worldwide' },
  { year: '2021', event: 'Opened our first flagship store' },
  { year: '2022', event: 'Introduced our innovative sizing technology' },
  { year: '2023', event: 'Expanded to international markets' },
  { year: '2024', event: 'Celebrating 6 years of empowering women' }
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20">
        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-primary" />
                <Badge variant="outline">Our Story</Badge>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Crafting Confidence
                <span className="text-primary block">Since 2018</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                We believe that the right lingerie can transform how a woman feels about herself. Our mission is to create beautiful, comfortable, and empowering intimate apparel for every body and every moment.
              </p>
              <div className="flex gap-4">
                <Button size="lg" asChild>
                  <Link to="/shop">
                    Shop Our Collection <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/contact">Get in Touch</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1594823811919-4c7825ac4d54?w=600&h=600&fit=crop" 
                  alt="Our brand story" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything we do is guided by our core values and commitment to making a positive impact.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                <Badge variant="outline">The Beginning</Badge>
              </div>
              <h2 className="text-3xl font-bold">How It All Started</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Our founder, Sarah Chen, experienced firsthand the frustration of not finding lingerie that was both beautiful and comfortable. After years of working in the fashion industry, she decided to create the change she wanted to see.
                </p>
                <p>
                  What started as a small collection of thoughtfully designed pieces has grown into a global brand that celebrates femininity in all its forms. We've remained true to our founding principles: quality craftsmanship, inclusive sizing, and designs that make women feel their absolute best.
                </p>
                <p>
                  Today, we're proud to serve customers worldwide, but our mission remains the same – to create lingerie that empowers women to embrace their confidence and celebrate their unique beauty.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop" 
                alt="Design process" 
                className="rounded-lg w-full h-full object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1566479275475-8186ae0a53a3?w=400&h=500&fit=crop" 
                alt="Quality materials" 
                className="rounded-lg w-full h-full object-cover mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <Badge variant="outline">Meet the Team</Badge>
            </div>
            <h2 className="text-3xl font-bold">The People Behind the Brand</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our passionate team works tirelessly to bring you the best in intimate apparel.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.id}>
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-sm text-primary">{member.role}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              <Badge variant="outline">Our Journey</Badge>
            </div>
            <h2 className="text-3xl font-bold">Milestones & Achievements</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Key moments that have shaped our brand and our commitment to excellence.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-4 items-center">
                  <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold">{milestone.year}</span>
                  </div>
                  <Card className="flex-1">
                    <CardContent className="p-4">
                      <p className="text-muted-foreground">{milestone.event}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-primary/10 to-purple-100/50 dark:from-primary/20 dark:to-purple-900/20 border-none">
            <CardContent className="p-12 text-center space-y-6">
              <h2 className="text-3xl font-bold">Join Our Story</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Be part of our journey to empower women worldwide. Discover collections designed with love, crafted with care, and made to celebrate you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/shop">
                    Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}