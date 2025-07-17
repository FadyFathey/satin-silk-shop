
import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Tables } from '@/integrations/supabase/types';

type Cart = Tables<'carts'>;
type CartItem = Tables<'cart_items'> & {
  product: Tables<'products'>;
  variant?: Tables<'product_variants'>;
};

interface CartContextType {
  cart: Cart | null;
  items: CartItem[];
  itemCount: number;
  total: number;
  loading: boolean;
  addToCart: (productId: string, variantId?: string, quantity?: number) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [cart, setCart] = useState<Cart | null>(null);
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Get or create cart for user
  const getOrCreateCart = async () => {
    if (!user) return null;

    try {
      // First try to get existing cart
      const { data: existingCart } = await supabase
        .from('carts')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (existingCart) {
        return existingCart;
      }

      // Create new cart
      const { data: newCart, error } = await supabase
        .from('carts')
        .insert({ user_id: user.id })
        .select()
        .single();

      if (error) throw error;
      return newCart;
    } catch (error) {
      console.error('Error getting/creating cart:', error);
      return null;
    }
  };

  // Load cart items
  const loadCartItems = async () => {
    if (!user || !cart) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select(`
          *,
          product:products(*),
          variant:product_variants(*)
        `)
        .eq('cart_id', cart.id);

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error loading cart items:', error);
      toast({
        title: "Error loading cart",
        description: "Failed to load your cart items.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Initialize cart when user changes
  useEffect(() => {
    if (user) {
      getOrCreateCart().then(cart => {
        setCart(cart);
      });
    } else {
      setCart(null);
      setItems([]);
    }
  }, [user]);

  // Load items when cart changes
  useEffect(() => {
    if (cart) {
      loadCartItems();
    }
  }, [cart]);

  const addToCart = async (productId: string, variantId?: string, quantity = 1) => {
    if (!user || !cart) {
      toast({
        title: "Please sign in",
        description: "You need to sign in to add items to your cart.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Get product details for price
      const { data: product, error: productError } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single();

      if (productError) throw productError;

      const price = product.sale_price || product.price;

      // Check if item already exists in cart
      const existingItem = items.find(item => 
        item.product_id === productId && item.variant_id === variantId
      );

      if (existingItem) {
        // Update quantity
        await updateQuantity(existingItem.id, existingItem.quantity + quantity);
      } else {
        // Add new item
        const { error } = await supabase
          .from('cart_items')
          .insert({
            cart_id: cart.id,
            product_id: productId,
            variant_id: variantId,
            quantity,
            price: price,
          });

        if (error) throw error;
        await loadCartItems();

        toast({
          title: "Added to cart",
          description: `${product.title} has been added to your cart.`,
        });
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Error",
        description: "Failed to add item to cart.",
        variant: "destructive",
      });
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(itemId);
      return;
    }

    try {
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('id', itemId);

      if (error) throw error;
      await loadCartItems();
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast({
        title: "Error",
        description: "Failed to update item quantity.",
        variant: "destructive",
      });
    }
  };

  const removeFromCart = async (itemId: string) => {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId);

      if (error) throw error;
      await loadCartItems();

      toast({
        title: "Item removed",
        description: "Item has been removed from your cart.",
      });
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast({
        title: "Error",
        description: "Failed to remove item from cart.",
        variant: "destructive",
      });
    }
  };

  const clearCart = async () => {
    if (!cart) return;

    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('cart_id', cart.id);

      if (error) throw error;
      setItems([]);

      toast({
        title: "Cart cleared",
        description: "All items have been removed from your cart.",
      });
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast({
        title: "Error",
        description: "Failed to clear cart.",
        variant: "destructive",
      });
    }
  };

  const value = {
    cart,
    items,
    itemCount,
    total,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
