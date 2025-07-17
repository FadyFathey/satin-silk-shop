
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { useCart } from '@/hooks/useCart';
import { Star, Heart, ShoppingCart, ArrowLeft, ZoomIn, Truck, Shield, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for demonstration - will be replaced with Supabase data
const mockProduct = {
  id: '1',
  title: 'Silk Dreams Lace Bra Set',
  slug: 'silk-dreams-lace-bra-set',
  price: 89.99,
  sale_price: 79.99,
  description: `Experience ultimate comfort and elegance with our Silk Dreams Lace Bra Set. Crafted from premium silk and delicate French lace, this set offers unparalleled softness against your skin.

**Features:**
- Premium silk blend fabric
- Intricate French lace detailing
- Adjustable straps and band
- Underwire support for perfect fit
- Matching panty included

**Care Instructions:**
Hand wash in cold water with gentle detergent. Lay flat to dry. Do not bleach or iron directly on lace.`,
  images: [
    'https://images.unsplash.com/photo-1594823811919-4c7825ac4d54?w=600&h=800&fit=crop',
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=800&fit=crop',
    'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=800&fit=crop',
    'https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=600&h=800&fit=crop'
  ],
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  colors: ['Blush Pink', 'Ivory', 'Black', 'Deep Rose'],
  rating: 4.8,
  reviews: 42,
  stock_quantity: 15,
  category: 'Bras'
};

const mockReviews = [
  {
    id: 1,
    name: 'Sarah M.',
    rating: 5,
    title: 'Absolutely gorgeous!',
    comment: 'The quality is exceptional and the fit is perfect. The lace is so delicate and beautiful.',
    date: '2024-01-15',
    verified: true
  },
  {
    id: 2,
    name: 'Emma L.',
    rating: 5,
    title: 'Perfect fit and comfort',
    comment: 'I was hesitant about ordering online, but this exceeded my expectations. So comfortable!',
    date: '2024-01-10',
    verified: true
  },
  {
    id: 3,
    name: 'Jessica R.',
    rating: 4,
    title: 'Beautiful design',
    comment: 'Love the design and quality. Only wish it came in more colors.',
    date: '2024-01-05',
    verified: true
  }
];

const relatedProducts = [
  { id: 1, name: "Midnight Velvet Collection", price: 76.99, image: "https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=400&h=500&fit=crop", slug: "midnight-velvet-collection" },
  { id: 2, name: "Rose Garden Lace", price: 94.99, image: "https://images.unsplash.com/photo-1594823811919-4c7825ac4d54?w=400&h=500&fit=crop", slug: "rose-garden-lace" },
  { id: 3, name: "Pearl Essence Set", price: 112.99, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop", slug: "pearl-essence-set" },
  { id: 4, name: "Classic Comfort Bra", price: 45.99, image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=500&fit=crop", slug: "classic-comfort-bra" }
];

export default function ProductDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [product, setProduct] = useState(mockProduct);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) return;
      
      try {
        // For now, using mock data - replace with actual Supabase query
        // const { data, error } = await supabase
        //   .from('products')
        //   .select('*')
        //   .eq('slug', slug)
        //   .single();
        
        // if (error) throw error;
        // setProduct(data);
        
        // Using mock data for demonstration
        setProduct(mockProduct);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast({
        title: "Please select options",
        description: "Please select both size and color before adding to cart.",
        variant: "destructive",
      });
      return;
    }

    addToCart({
      id: product.id,
      name: product.title,
      price: product.sale_price || product.price,
      quantity,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor
    });

    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
    });
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: isWishlisted 
        ? `${product.title} has been removed from your wishlist.`
        : `${product.title} has been added to your wishlist.`,
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="aspect-[4/5] bg-muted rounded-lg"></div>
              <div className="grid grid-cols-4 gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-square bg-muted rounded"></div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="h-8 bg-muted rounded w-3/4"></div>
              <div className="h-6 bg-muted rounded w-1/2"></div>
              <div className="h-20 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Link to="/">
          <Button>Return to Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-foreground">Shop</Link>
          <span>/</span>
          <span className="text-foreground">{product.title}</span>
        </nav>
      </div>

      <div className="container mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-[4/5] rounded-lg overflow-hidden bg-muted relative group">
              <img 
                src={product.images[selectedImage]} 
                alt={product.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <Button
                size="sm"
                variant="secondary"
                className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Image Thumbnails */}
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{product.category}</Badge>
                {product.sale_price && <Badge variant="destructive">Sale</Badge>}
              </div>
              <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold">
                ${product.sale_price || product.price}
              </span>
              {product.sale_price && (
                <span className="text-xl text-muted-foreground line-through">
                  ${product.price}
                </span>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <div className="text-muted-foreground space-y-2">
                {product.description.split('\n').map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="font-semibold mb-2">Size</h3>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="font-semibold mb-2">Color</h3>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <Button
                    key={color}
                    variant={selectedColor === color ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-semibold mb-2">Quantity</h3>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="px-4 py-2 border rounded">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Add to Cart & Wishlist */}
            <div className="flex gap-4">
              <Button onClick={handleAddToCart} className="flex-1">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                onClick={handleWishlist}
                className={isWishlisted ? "text-red-500 border-red-500" : ""}
              >
                <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <Truck className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Free Shipping</p>
                <p className="text-xs text-muted-foreground">On orders over $75</p>
              </div>
              <div className="text-center">
                <Shield className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Secure Payment</p>
                <p className="text-xs text-muted-foreground">SSL encrypted</p>
              </div>
              <div className="text-center">
                <RotateCcw className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Easy Returns</p>
                <p className="text-xs text-muted-foreground">30-day policy</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockReviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    {review.verified && (
                      <Badge variant="secondary" className="text-xs">Verified</Badge>
                    )}
                  </div>
                  <h4 className="font-semibold mb-1">{review.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{review.comment}</p>
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>{review.name}</span>
                    <span>{new Date(review.date).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link key={relatedProduct.id} to={`/product/${relatedProduct.slug}`}>
                <Card className="group cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="aspect-[4/5] rounded-t-lg overflow-hidden">
                      <img 
                        src={relatedProduct.image} 
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium mb-2">{relatedProduct.name}</h3>
                      <p className="font-semibold">${relatedProduct.price}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
