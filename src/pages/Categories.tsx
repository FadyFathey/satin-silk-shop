import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, Star, Sparkles } from 'lucide-react';

const categoryData = [
  {
    id: 1,
    name: 'Bras',
    description: 'Comfortable and supportive bras for every occasion',
    image: 'https://images.unsplash.com/photo-1594823811919-4c7825ac4d54?w=600&h=400&fit=crop',
    productCount: 45,
    featured: true,
    link: '/shop?category=Bras'
  },
  {
    id: 2,
    name: 'Panties',
    description: 'Soft and comfortable panties in various styles',
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=400&fit=crop',
    productCount: 32,
    featured: true,
    link: '/shop?category=Panties'
  },
  {
    id: 3,
    name: 'Sets',
    description: 'Beautiful matching bra and panty sets',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
    productCount: 28,
    featured: true,
    link: '/shop?category=Sets'
  },
  {
    id: 4,
    name: 'Sports Bras',
    description: 'High-performance sports bras for active lifestyles',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
    productCount: 18,
    featured: false,
    link: '/shop?category=Sports%20Bras'
  },
  {
    id: 5,
    name: 'Sleepwear',
    description: 'Comfortable and elegant sleepwear collection',
    image: 'https://images.unsplash.com/photo-1566479275475-8186ae0a53a3?w=600&h=400&fit=crop',
    productCount: 22,
    featured: false,
    link: '/shop?category=Sleepwear'
  },
  {
    id: 6,
    name: 'Accessories',
    description: 'Beautiful accessories to complete your look',
    image: 'https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=600&h=400&fit=crop',
    productCount: 15,
    featured: false,
    link: '/shop?category=Accessories'
  }
];

const collections = [
  {
    id: 1,
    name: 'Bridal Collection',
    description: 'Pure elegance for your special day',
    image: 'https://images.unsplash.com/photo-1594823811919-4c7825ac4d54?w=800&h=600&fit=crop',
    link: '/shop?collection=bridal'
  },
  {
    id: 2,
    name: 'Everyday Comfort',
    description: 'Designed for daily confidence and comfort',
    image: 'https://images.unsplash.com/photo-1566479179817-3e0a0f59fe47?w=800&h=600&fit=crop',
    link: '/shop?collection=everyday'
  },
  {
    id: 3,
    name: 'Luxury Lace',
    description: 'Intricate details with premium materials',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
    link: '/shop?collection=luxury'
  },
  {
    id: 4,
    name: 'Active & Sport',
    description: 'Support that moves with your active lifestyle',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
    link: '/shop?collection=active'
  }
];

export default function Categories() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <Badge variant="outline">Explore Our Range</Badge>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold">
              Browse by
              <span className="text-primary block">Categories</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our complete range of premium lingerie, organized by category and collection to help you find exactly what you're looking for.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              <Badge variant="outline">Most Popular</Badge>
            </div>
            <h2 className="text-3xl font-bold">Featured Categories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our most popular categories, loved by thousands of customers worldwide.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {categoryData.filter(cat => cat.featured).map((category) => (
              <Link key={category.id} to={category.link}>
                <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img 
                        src={category.image} 
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                      <Badge className="absolute top-4 right-4 bg-white/90 text-black">
                        {category.productCount} items
                      </Badge>
                    </div>
                    <div className="p-6 space-y-3">
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-muted-foreground">{category.description}</p>
                      <Button variant="ghost" size="sm" className="group-hover:bg-primary/10 p-0">
                        Shop Now <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link to="/shop">
              <Button size="lg">
                View All Categories <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* All Categories Grid */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold">All Categories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse our complete selection of lingerie categories.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryData.map((category) => (
              <Link key={category.id} to={category.link}>
                <Card className="group cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="aspect-[5/3] overflow-hidden">
                      <img 
                        src={category.image} 
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{category.name}</h3>
                        <Badge variant="secondary">{category.productCount}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              <Badge variant="outline">Curated Collections</Badge>
            </div>
            <h2 className="text-3xl font-bold">Shop by Collection</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our carefully curated collections, each designed for different moments in your life.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {collections.map((collection) => (
              <Link key={collection.id} to={collection.link}>
                <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-2">
                      <div className="aspect-square md:aspect-auto overflow-hidden">
                        <img 
                          src={collection.image} 
                          alt={collection.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6 flex flex-col justify-center space-y-4">
                        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                          {collection.name}
                        </h3>
                        <p className="text-muted-foreground">{collection.description}</p>
                        <Button variant="outline" size="sm" className="w-fit">
                          Explore Collection <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}