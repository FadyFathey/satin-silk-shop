import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Users, ShoppingCart, Eye, TrendingUp, Package, Star } from 'lucide-react';

interface AnalyticsData {
  totalProducts: number;
  totalCategories: number;
  totalOrders: number;
  totalPageViews: number;
  totalVisitors: number;
  activeProducts: number;
  pendingOrders: number;
  completedOrders: number;
}

const AnalyticsDashboard = () => {
  const { data: analytics, isLoading } = useQuery({
    queryKey: ['analytics'],
    queryFn: async (): Promise<AnalyticsData> => {
      // Get products count
      const { count: totalProducts } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true });

      const { count: activeProducts } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active');

      // Get categories count
      const { count: totalCategories } = await supabase
        .from('categories')
        .select('*', { count: 'exact', head: true });

      // Get orders count
      const { count: totalOrders } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true });

      const { count: pendingOrders } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      const { count: completedOrders } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'delivered');

      // Get analytics data
      const { count: totalPageViews } = await supabase
        .from('website_analytics')
        .select('*', { count: 'exact', head: true });

      // Get unique visitors count
      const { data: visitors } = await supabase
        .from('website_analytics')
        .select('visitor_ip')
        .not('visitor_ip', 'is', null);

      const uniqueVisitors = new Set(visitors?.map(v => v.visitor_ip) || []).size;

      return {
        totalProducts: totalProducts || 0,
        totalCategories: totalCategories || 0,
        totalOrders: totalOrders || 0,
        totalPageViews: totalPageViews || 0,
        totalVisitors: uniqueVisitors,
        activeProducts: activeProducts || 0,
        pendingOrders: pendingOrders || 0,
        completedOrders: completedOrders || 0,
      };
    },
  });

  const { data: recentOrders, isLoading: ordersLoading } = useQuery({
    queryKey: ['recent-orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          id,
          order_number,
          total_amount,
          status,
          created_at
        `)
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (error) throw error;
      return data;
    },
  });

  const { data: topProducts, isLoading: productsLoading } = useQuery({
    queryKey: ['top-products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          id,
          title,
          price,
          stock_quantity,
          status,
          featured
        `)
        .eq('status', 'active')
        .order('featured', { ascending: false })
        .limit(5);
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Products",
      value: analytics?.totalProducts || 0,
      description: `${analytics?.activeProducts || 0} active`,
      icon: Package,
      color: "text-blue-600",
    },
    {
      title: "Categories",
      value: analytics?.totalCategories || 0,
      description: "Product categories",
      icon: Star,
      color: "text-purple-600",
    },
    {
      title: "Total Orders",
      value: analytics?.totalOrders || 0,
      description: `${analytics?.pendingOrders || 0} pending`,
      icon: ShoppingCart,
      color: "text-green-600",
    },
    {
      title: "Page Views",
      value: analytics?.totalPageViews || 0,
      description: `${analytics?.totalVisitors || 0} unique visitors`,
      icon: Eye,
      color: "text-orange-600",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of your e-commerce performance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <IconComponent className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest customer orders</CardDescription>
          </CardHeader>
          <CardContent>
            {ordersLoading ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : (
              <div className="space-y-4">
                {recentOrders?.map((order) => (
                  <div key={order.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{order.order_number}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">${order.total_amount}</p>
                      <Badge 
                        variant={order.status === 'delivered' ? 'default' : 
                                order.status === 'pending' ? 'secondary' : 'destructive'}
                        className="text-xs"
                      >
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
                {(!recentOrders || recentOrders.length === 0) && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No orders yet
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Products Overview</CardTitle>
            <CardDescription>Your product inventory</CardDescription>
          </CardHeader>
          <CardContent>
            {productsLoading ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : (
              <div className="space-y-4">
                {topProducts?.map((product) => (
                  <div key={product.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{product.title}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-muted-foreground">
                          Stock: {product.stock_quantity}
                        </p>
                        {product.featured && (
                          <Badge variant="outline" className="text-xs">
                            Featured
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">${product.price}</p>
                      <Badge 
                        variant={product.status === 'active' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {product.status}
                      </Badge>
                    </div>
                  </div>
                ))}
                {(!topProducts || topProducts.length === 0) && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No products yet
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;