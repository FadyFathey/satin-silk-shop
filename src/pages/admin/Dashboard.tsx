
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Settings, 
  FileText,
  ArrowRight,
  TrendingUp,
  DollarSign,
  Activity,
  Folder,
  Tags
} from 'lucide-react';

const adminFeatures = [
    {
      title: 'Product Management',
      description: 'Add, edit, and manage your product catalog',
      icon: Package,
      href: '/admin/products',
      color: 'bg-blue-500',
      stats: 'Manage inventory'
    },
    {
      title: 'Categories Management',
      description: 'Organize products into categories',
      icon: Folder,
      href: '/admin/categories',
      color: 'bg-indigo-500',
      stats: 'Product organization'
    },
    {
      title: 'Content Management',
      description: 'Update website content and sections',
      icon: FileText,
      href: '/admin/content',
      color: 'bg-green-500',
      stats: 'CMS system'
    },
    {
      title: 'Orders Management',
      description: 'Process and manage customer orders',
      icon: ShoppingCart,
      href: '/admin/orders',
      color: 'bg-red-500',
      stats: 'Order fulfillment'
    },
    {
      title: 'Analytics Dashboard',
      description: 'View sales reports and website analytics',
      icon: BarChart3,
      href: '/admin/analytics',
      color: 'bg-orange-500',
      stats: 'Track performance'
    },
    {
      title: 'User Management',
      description: 'Manage customer accounts and roles',
      icon: Users,
      href: '/admin/users',
      color: 'bg-purple-500',
      stats: 'Coming soon',
      disabled: true
    },
    {
      title: 'Settings',
      description: 'Configure system settings and preferences',
      icon: Settings,
      href: '/admin/settings',
      color: 'bg-gray-500',
      stats: 'Coming soon',
      disabled: true
    }
  ];

const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Comprehensive management system for your e-commerce platform
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$0.00</div>
            <p className="text-xs text-muted-foreground">
              +0% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              +0% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Active products
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Visitors online
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Admin Features Grid */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Management Areas</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {adminFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Link key={index} to={feature.href} className={feature.disabled ? 'pointer-events-none' : ''}>
                <Card className={`hover:shadow-lg transition-all duration-300 cursor-pointer group ${feature.disabled ? 'opacity-60' : ''}`}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg ${feature.color} flex items-center justify-center`}>
                        <IconComponent className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                          {feature.title}
                        </CardTitle>
                        <Badge variant="outline" className="text-xs mt-1">
                          {feature.stats}
                        </Badge>
                      </div>
                    </div>
                    {!feature.disabled && (
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    )}
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Activity Placeholder */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Recent Activity</h2>
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-muted-foreground">
              <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">No recent activity</p>
              <p className="text-sm">Activity will appear here once you start managing your store</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
