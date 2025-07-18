import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Star, Filter, Search, SlidersHorizontal } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

// Mock products data - in real app this would come from Supabase
const allProducts = [
  {
    id: '1',
    name: 'Silk Dreams Lace Bra Set',
    price: 89.99,
    salePrice: 79.99,
    rating: 4.8,
    reviews: 42,
    image: 'https://images.unsplash.com/photo-1594823811919-4c7825ac4d54?w=400&h=500&fit=crop',
    slug: 'silk-dreams-lace-bra-set',
    category: 'Bras',
    collection: 'luxury',
    colors: ['Blush Pink', 'Ivory', 'Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    isNew: false,
    isBestSeller: true
  },
  {
    id: '2',
    name: 'Comfort First Wireless Bra',
    price: 45.99,
    rating: 4.6,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1566479275475-8186ae0a53a3?w=400&h=500&fit=crop',
    slug: 'comfort-first-wireless-bra',
    category: 'Bras',
    collection: 'everyday',
    colors: ['Nude', 'Black', 'White'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    isNew: false,
    isBestSeller: true
  },
  {
    id: '3',
    name: 'Bridal Elegance Set',
    price: 124.99,
    salePrice: 99.99,
    rating: 4.9,
    reviews: 67,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop',
    slug: 'bridal-elegance-set',
    category: 'Sets',
    collection: 'bridal',
    colors: ['Ivory', 'Pearl White'],
    sizes: ['XS', 'S', 'M', 'L'],
    isNew: true,
    isBestSeller: false
  },
  {
    id: '4',
    name: 'Active Support Sports Bra',
    price: 52.99,
    rating: 4.7,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=500&fit=crop',
    slug: 'active-support-sports-bra',
    category: 'Sports Bras',
    collection: 'active',
    colors: ['Black', 'Navy', 'Purple'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    isNew: false,
    isBestSeller: false
  },
  {
    id: '5',
    name: 'Midnight Velvet Collection',
    price: 76.99,
    rating: 4.5,
    reviews: 34,
    image: 'https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=400&h=500&fit=crop',
    slug: 'midnight-velvet-collection',
    category: 'Sets',
    collection: 'luxury',
    colors: ['Black', 'Deep Purple'],
    sizes: ['S', 'M', 'L', 'XL'],
    isNew: true,
    isBestSeller: false
  },
  {
    id: '6',
    name: 'Pearl Essence Panty Set',
    price: 34.99,
    rating: 4.4,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=500&fit=crop',
    slug: 'pearl-essence-panty-set',
    category: 'Panties',
    collection: 'everyday',
    colors: ['Nude', 'Black', 'Pink'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    isNew: false,
    isBestSeller: true
  }
];

const categories = ['All', 'Bras', 'Panties', 'Sets', 'Sports Bras'];
const collections = ['All', 'bridal', 'everyday', 'luxury', 'active'];
const sortOptions = ['featured', 'price-low', 'price-high', 'newest', 'rating'];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState(allProducts);
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCollection, setSelectedCollection] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [showFilters, setShowFilters] = useState(false);

  // Initialize filters from URL parameters
  useEffect(() => {
    const category = searchParams.get('category') || 'All';
    const collection = searchParams.get('collection') || 'All';
    const sort = searchParams.get('sort') || 'featured';
    
    setSelectedCategory(category);
    setSelectedCollection(collection);
    setSortBy(sort);
  }, [searchParams]);

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Collection filter
    if (selectedCollection !== 'All') {
      filtered = filtered.filter(product => product.collection === selectedCollection);
    }

    // Price range filter
    filtered = filtered.filter(product => {
      const price = product.salePrice || product.price;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
        break;
      case 'price-high':
        filtered.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default: // featured
        filtered.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    }

    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory, selectedCollection, sortBy, priceRange]);

  const updateUrlParams = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === 'All' || value === 'featured') {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <h3 className="font-semibold mb-3">Search</h3>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategory === category}
                onCheckedChange={() => {
                  setSelectedCategory(category);
                  updateUrlParams('category', category);
                }}
              />
              <label htmlFor={category} className="text-sm cursor-pointer">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Collections */}
      <div>
        <h3 className="font-semibold mb-3">Collections</h3>
        <div className="space-y-2">
          {collections.map((collection) => (
            <div key={collection} className="flex items-center space-x-2">
              <Checkbox
                id={collection}
                checked={selectedCollection === collection}
                onCheckedChange={() => {
                  setSelectedCollection(collection);
                  updateUrlParams('collection', collection);
                }}
              />
              <label htmlFor={collection} className="text-sm cursor-pointer capitalize">
                {collection}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
              className="w-20"
            />
            <span>-</span>
            <Input
              type="number"
              placeholder="Max"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-20"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Shop</h1>
              <p className="text-muted-foreground mt-1">
                {filteredProducts.length} products found
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Sort Dropdown */}
              <Select value={sortBy} onValueChange={(value) => {
                setSortBy(value);
                updateUrlParams('sort', value);
              }}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>

              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-6">
              <div className="flex items-center gap-2 mb-6">
                <SlidersHorizontal className="h-5 w-5" />
                <h2 className="text-lg font-semibold">Filters</h2>
              </div>
              <FilterContent />
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No products found matching your criteria.</p>
                <Button onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSelectedCollection('All');
                  setPriceRange([0, 200]);
                  setSearchParams({});
                }}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Link key={product.id} to={`/product/${product.slug}`}>
                    <Card className="group cursor-pointer hover:shadow-lg transition-shadow">
                      <CardContent className="p-0">
                        <div className="aspect-[4/5] rounded-t-lg overflow-hidden relative">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-2 left-2 space-y-1">
                            {product.isNew && (
                              <Badge className="bg-green-500">New</Badge>
                            )}
                            {product.isBestSeller && (
                              <Badge className="bg-red-500">Best Seller</Badge>
                            )}
                            {product.salePrice && (
                              <Badge variant="destructive">Sale</Badge>
                            )}
                          </div>
                        </div>
                        <div className="p-4 space-y-2">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-3 w-3 ${
                                i < Math.floor(product.rating) 
                                  ? 'fill-yellow-400 text-yellow-400' 
                                  : 'text-muted-foreground'
                              }`} />
                            ))}
                            <span className="text-xs text-muted-foreground ml-1">({product.reviews})</span>
                          </div>
                          <h3 className="font-medium">{product.name}</h3>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">
                              ${product.salePrice || product.price}
                            </span>
                            {product.salePrice && (
                              <span className="text-sm text-muted-foreground line-through">
                                ${product.price}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {product.colors.length} colors • {product.sizes.length} sizes
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}