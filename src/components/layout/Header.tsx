
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, User, Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/hooks/useCart';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

export const Header = () => {
  const { user, signOut, isAdmin } = useAuth();
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-primary">SilkLux</div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/shop" className="text-sm font-medium hover:text-primary transition-colors">
              Shop
            </Link>
            <Link to="/categories" className="text-sm font-medium hover:text-primary transition-colors">
              Categories
            </Link>
            <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>

            {/* Wishlist */}
            {user && (
              <Button variant="ghost" size="icon" asChild>
                <Link to="/wishlist">
                  <Heart className="h-5 w-5" />
                </Link>
              </Button>
            )}

            {/* Cart */}
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link to="/cart">
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {itemCount}
                  </Badge>
                )}
              </Link>
            </Button>

            {/* User menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/orders">Orders</Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/admin">Admin Dashboard</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut}>
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild>
                <Link to="/auth">Sign In</Link>
              </Button>
            )}

            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Navigation</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col space-y-4 mt-6">
                  <Link to="/shop" className="text-lg font-medium hover:text-primary transition-colors">
                    Shop
                  </Link>
                  <Link to="/categories" className="text-lg font-medium hover:text-primary transition-colors">
                    Categories
                  </Link>
                  <Link to="/about" className="text-lg font-medium hover:text-primary transition-colors">
                    About
                  </Link>
                  <Link to="/contact" className="text-lg font-medium hover:text-primary transition-colors">
                    Contact
                  </Link>
                  {user ? (
                    <>
                      <div className="border-t pt-4 space-y-4">
                        <Link to="/profile" className="text-lg font-medium hover:text-primary transition-colors">
                          Profile
                        </Link>
                        <Link to="/orders" className="text-lg font-medium hover:text-primary transition-colors">
                          Orders
                        </Link>
                        <Link to="/wishlist" className="text-lg font-medium hover:text-primary transition-colors">
                          Wishlist
                        </Link>
                        {isAdmin && (
                          <Link to="/admin" className="text-lg font-medium hover:text-primary transition-colors">
                            Admin Dashboard
                          </Link>
                        )}
                        <Button variant="outline" onClick={signOut} className="w-full justify-start">
                          Sign Out
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="border-t pt-4">
                      <Button asChild className="w-full">
                        <Link to="/auth">Sign In</Link>
                      </Button>
                    </div>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};
