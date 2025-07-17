
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="text-2xl font-bold text-primary">SilkLux</div>
            <p className="text-sm text-muted-foreground">
              Elegant lingerie collection crafted with the finest materials for modern women.
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-4">
            <h4 className="font-semibold">Shop</h4>
            <div className="space-y-2 text-sm">
              <Link to="/shop/bras" className="block text-muted-foreground hover:text-primary transition-colors">
                Bras
              </Link>
              <Link to="/shop/panties" className="block text-muted-foreground hover:text-primary transition-colors">
                Panties
              </Link>
              <Link to="/shop/lingerie-sets" className="block text-muted-foreground hover:text-primary transition-colors">
                Lingerie Sets
              </Link>
              <Link to="/shop/sleepwear" className="block text-muted-foreground hover:text-primary transition-colors">
                Sleepwear
              </Link>
            </div>
          </div>

          {/* Customer Care */}
          <div className="space-y-4">
            <h4 className="font-semibold">Customer Care</h4>
            <div className="space-y-2 text-sm">
              <Link to="/contact" className="block text-muted-foreground hover:text-primary transition-colors">
                Contact Us
              </Link>
              <Link to="/shipping" className="block text-muted-foreground hover:text-primary transition-colors">
                Shipping Info
              </Link>
              <Link to="/returns" className="block text-muted-foreground hover:text-primary transition-colors">
                Returns
              </Link>
              <Link to="/size-guide" className="block text-muted-foreground hover:text-primary transition-colors">
                Size Guide
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-semibold">Newsletter</h4>
            <p className="text-sm text-muted-foreground">
              Subscribe to get special offers and updates.
            </p>
            <div className="flex space-x-2">
              <Input placeholder="Your email" className="flex-1" />
              <Button size="sm">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 SilkLux. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
