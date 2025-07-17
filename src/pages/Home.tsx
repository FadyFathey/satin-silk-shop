import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, Shield, Heart, Award, Users, Sparkles, Instagram } from 'lucide-react';

// Updated mock data with realistic images and slugs for navigation
const newArrivals = [
  { 
    id: 1, 
    name: "Silk Dreams Bra Set", 
    price: 89.99, 
    originalPrice: 119.99, 
    rating: 4.8, 
    reviews: 42, 
    image: "https://images.unsplash.com/photo-1594823811919-4c7825ac4d54?w=400&h=500&fit=crop",
    slug: "silk-dreams-bra-set"
  },
  { 
    id: 2, 
    name: "Midnight Velvet Collection", 
    price: 76.99, 
    originalPrice: null, 
    rating: 4.9, 
    reviews: 38, 
    image: "https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=400&h=500&fit=crop",
    slug: "midnight-velvet-collection"
  },
  { 
    id: 3, 
    name: "Rose Garden Lace", 
    price: 94.99, 
    originalPrice: 124.99, 
    rating: 4.7, 
    reviews: 51, 
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop",
    slug: "rose-garden-lace"
  },
  { 
    id: 4, 
    name: "Pearl Essence Set", 
    price: 112.99, 
    originalPrice: null, 
    rating: 5.0, 
    reviews: 29, 
    image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=500&fit=crop",
    slug: "pearl-essence-set"
  },
  { 
    id: 5, 
    name: "Autumn Leaves Collection", 
    price: 68.99, 
    originalPrice: 89.99, 
    rating: 4.6, 
    reviews: 33, 
    image: "https://images.unsplash.com/photo-1566479179817-3e0a0f59fe47?w=400&h=500&fit=crop",
    slug: "autumn-leaves-collection"
  }
];

const bestSellers = [
  { 
    id: 6, 
    name: "Classic Comfort Bra", 
    price: 45.99, 
    originalPrice: null, 
    rating: 4.9, 
    reviews: 156, 
    sales: 1250, 
    image: "https://images.unsplash.com/photo-1594823812515-7b62bb35f7ab?w=400&h=500&fit=crop",
    slug: "classic-comfort-bra"
  },
  { 
    id: 7, 
    name: "Everyday Elegance Set", 
    price: 59.99, 
    originalPrice: 79.99, 
    rating: 4.8, 
    reviews: 203, 
    sales: 980, 
    image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=500&fit=crop",
    slug: "everyday-elegance-set"
  },
  { 
    id: 8, 
    name: "Luxe Lace Bodysuit", 
    price: 82.99, 
    originalPrice: null, 
    rating: 4.7, 
    reviews: 127, 
    sales: 875, 
    image: "https://images.unsplash.com/photo-1583748290793-c1ba6dab2e4a?w=400&h=500&fit=crop",
    slug: "luxe-lace-bodysuit"
  },
  { 
    id: 9, 
    name: "Seamless Comfort", 
    price: 38.99, 
    originalPrice: 49.99, 
    rating: 4.9, 
    reviews: 298, 
    sales: 1450, 
    image: "https://images.unsplash.com/photo-1566479275475-8186ae0a53a3?w=400&h=500&fit=crop",
    slug: "seamless-comfort"
  }
];

const collections = [
  { 
    id: 1, 
    name: "Bridal Collection", 
    description: "Pure elegance for your special day", 
    image: "https://images.unsplash.com/photo-1594823811919-4c7825ac4d54?w=600&h=400&fit=crop", 
    items: 24,
    link: "/shop?collection=bridal"
  },
  { 
    id: 2, 
    name: "Everyday Comfort", 
    description: "Designed for daily confidence", 
    image: "https://images.unsplash.com/photo-1566479179817-3e0a0f59fe47?w=600&h=400&fit=crop", 
    items: 18,
    link: "/shop?collection=everyday"
  },
  { 
    id: 3, 
    name: "Luxury Lace", 
    description: "Intricate details, premium materials", 
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop", 
    items: 15,
    link: "/shop?collection=luxury"
  },
  { 
    id: 4, 
    name: "Active & Sport", 
    description: "Support that moves with you", 
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop", 
    items: 12,
    link: "/shop?collection=active"
  }
];

const testimonials = [
  { id: 1, name: "Sarah M.", rating: 5, review: "The quality is exceptional and the fit is perfect. I've never felt more confident!", location: "New York", verified: true },
  { id: 2, name: "Emma L.", rating: 5, review: "Beautiful designs and incredibly comfortable. The customer service is outstanding too.", location: "California", verified: true },
  { id: 3, name: "Jessica R.", rating: 4, review: "Love the attention to detail and the luxurious feel. Will definitely be ordering more!", location: "Texas", verified: true },
  { id: 4, name: "Maria K.", rating: 5, review: "Finally found lingerie that combines style and comfort perfectly. Highly recommend!", location: "Florida", verified: true }
];

const socialImages = [
  "https://via.placeholder.com/200x200/FFB6C1/FFFFFF?text=Insta+1",
  "https://via.placeholder.com/200x200/DDA0DD/FFFFFF?text=Insta+2",
  "https://via.placeholder.com/200x200/E6E6FA/000000?text=Insta+3",
  "https://via.placeholder.com/200x200/F0E68C/000000?text=Insta+4",
  "https://via.placeholder.com/200x200/FFE4E1/000000?text=Insta+5",
  "https://via.placeholder.com/200x200/F5F5DC/000000?text=Insta+6"
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20">
        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="secondary" className="w-fit">
                New Collection Available
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Elegant Lingerie
                <span className="text-primary block">for Every Woman</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-md">
                Discover our carefully curated collection of premium lingerie, crafted with the finest materials and designed for comfort and confidence.
              </p>
              <div className="flex gap-4">
                <Button size="lg" asChild>
                  <Link to="/shop">
                    Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/shop?view=collections">Browse Collections</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1594823811919-4c7825ac4d54?w=600&h=600&fit=crop" 
                  alt="Elegant lingerie collection" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Free Shipping</h3>
                <p className="text-sm text-muted-foreground">
                  Free shipping on orders over $75
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Secure Payment</h3>
                <p className="text-sm text-muted-foreground">
                  Your payment information is secure
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Easy Returns</h3>
                <p className="text-sm text-muted-foreground">
                  30-day return policy for all items
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <Badge variant="outline">Just In</Badge>
            </div>
            <h2 className="text-3xl font-bold">New Arrivals</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Be the first to discover our latest designs, crafted with love and attention to detail.
            </p>
          </div>
          
          <Carousel className="max-w-6xl mx-auto">
            <CarouselContent>
              {newArrivals.map((product) => (
                <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/4">
                  <Link to={`/product/${product.slug}`}>
                    <Card className="group cursor-pointer hover:shadow-lg transition-shadow">
                      <CardContent className="p-0">
                        <div className="aspect-[4/5] rounded-t-lg overflow-hidden">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-4 space-y-2">
                          <div className="flex items-center justify-between">
                            <Badge variant="secondary" className="text-xs">New</Badge>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs text-muted-foreground">{product.rating}</span>
                            </div>
                          </div>
                          <h3 className="font-medium">{product.name}</h3>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">${product.price}</span>
                            {product.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through">
                                ${product.originalPrice}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">{product.reviews} reviews</p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              <Badge variant="outline">Most Loved</Badge>
            </div>
            <h2 className="text-3xl font-bold">Best Sellers</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover what thousands of women love most. Our top-rated pieces that have won hearts worldwide.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <Link key={product.id} to={`/product/${product.slug}`}>
                <Card className="group cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="aspect-[4/5] rounded-t-lg overflow-hidden relative">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-2 left-2 bg-red-500">
                        #{bestSellers.findIndex(p => p.id === product.id) + 1} Best Seller
                      </Badge>
                    </div>
                    <div className="p-4 space-y-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="text-xs text-muted-foreground ml-1">({product.reviews})</span>
                      </div>
                      <h3 className="font-medium">{product.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{product.sales} sold this month</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-20 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="outline" className="w-fit">Our Promise</Badge>
              <h2 className="text-3xl md:text-4xl font-bold">
                Crafted with Love,
                <span className="text-primary block">Worn with Confidence</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                For over a decade, we've been dedicated to creating lingerie that celebrates every woman's unique beauty. Our commitment to quality, comfort, and ethical sourcing ensures that every piece tells a story of empowerment.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Heart className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm">Ethically sourced materials</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Award className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm">Premium craftsmanship</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm">Supporting women worldwide</span>
                </div>
              </div>
              <Button variant="outline" size="lg">
                Learn Our Story
              </Button>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1594823812515-7b62bb35f7ab?w=600&h=450&fit=crop" 
                  alt="Our brand story" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold">Shop by Collection</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our carefully curated collections, each designed for different moments in your life.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {collections.map((collection) => (
              <Link key={collection.id} to={collection.link}>
                <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="aspect-[3/2] rounded-t-lg overflow-hidden">
                      <img 
                        src={collection.image} 
                        alt={collection.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6 text-center space-y-2">
                      <h3 className="font-semibold text-lg">{collection.name}</h3>
                      <p className="text-sm text-muted-foreground">{collection.description}</p>
                      <p className="text-xs text-muted-foreground">{collection.items} items</p>
                      <Button variant="ghost" size="sm" className="mt-4">
                        Explore Collection <ArrowRight className="ml-2 h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <Badge variant="outline">Customer Love</Badge>
            </div>
            <h2 className="text-3xl font-bold">What Our Customers Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real stories from real women who've found confidence in our designs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="h-full">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-sm text-muted-foreground italic">
                    "{testimonial.review}"
                  </blockquote>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                    </div>
                    {testimonial.verified && (
                      <Badge variant="secondary" className="text-xs">
                        Verified Purchase
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-2">
              <Instagram className="h-5 w-5 text-primary" />
              <Badge variant="outline">Follow Us</Badge>
            </div>
            <h2 className="text-3xl font-bold">Join Our Community</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Follow us on Instagram for styling tips, behind-the-scenes content, and customer spotlights.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {socialImages.map((image, index) => (
              <div key={index} className="aspect-square rounded-lg overflow-hidden group cursor-pointer">
                <img 
                  src={image} 
                  alt={`Instagram post ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Button size="lg" className="gap-2">
              <Instagram className="h-4 w-4" />
              Follow @ElegantLingerie
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-purple-100/50 dark:from-primary/10 dark:to-purple-900/20">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl font-bold">Stay in the Loop</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Be the first to know about new collections, exclusive offers, and styling tips delivered to your inbox.
          </p>
          <div className="flex max-w-md mx-auto gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
            />
            <Button>Subscribe</Button>
          </div>
          <p className="text-xs text-muted-foreground">
            No spam, just beautiful updates. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </div>
  );
}
