import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Navigate } from 'react-router-dom';
import { Loader2, User, MapPin, Shield, Package } from 'lucide-react';

interface UserProfile {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  role: string;
}

interface Address {
  id: string;
  type: string;
  first_name: string;
  last_name: string;
  company: string | null;
  address_line_1: string;
  address_line_2: string | null;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  phone: string | null;
  is_default: boolean;
}

interface Order {
  id: string;
  order_number: string;
  status: string;
  total_amount: number;
  created_at: string;
}

const Profile = () => {
  const { user, updatePassword } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  
  // Form states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        
        // Fetch profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError) {
          console.error('Error fetching profile:', profileError);
          toast({
            title: "Error",
            description: "Failed to load profile data",
            variant: "destructive",
          });
        } else {
          setProfile(profileData);
          setFirstName(profileData.first_name || '');
          setLastName(profileData.last_name || '');
          setPhone(profileData.phone || '');
        }

        // Fetch addresses
        const { data: addressData, error: addressError } = await supabase
          .from('addresses')
          .select('*')
          .eq('user_id', user.id)
          .order('is_default', { ascending: false });

        if (addressError) {
          console.error('Error fetching addresses:', addressError);
        } else {
          setAddresses(addressData || []);
        }

        // Fetch recent orders
        const { data: ordersData, error: ordersError } = await supabase
          .from('orders')
          .select('id, order_number, status, total_amount, created_at')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5);

        if (ordersError) {
          console.error('Error fetching orders:', ordersError);
        } else {
          setOrders(ordersData || []);
        }

      } catch (error) {
        console.error('Error fetching user data:', error);
        toast({
          title: "Error",
          description: "Failed to load user data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user.id, toast]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: firstName,
          last_name: lastName,
          phone: phone,
        })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });

      // Update local state
      if (profile) {
        setProfile({
          ...profile,
          first_name: firstName,
          last_name: lastName,
          phone: phone,
        });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords don't match",
        variant: "destructive",
      });
      return;
    }

    if (newPassword.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return;
    }

    setUpdating(true);

    try {
      const { error } = await updatePassword(newPassword);
      
      if (error) throw error;

      toast({
        title: "Success",
        description: "Password updated successfully",
      });

      // Reset form
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Error changing password:', error);
      toast({
        title: "Error",
        description: "Failed to update password",
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        <div className="grid gap-6">
          {/* Account Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Account Information
              </CardTitle>
              <CardDescription>
                Update your personal information and contact details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile?.email || ''}
                    disabled
                    className="bg-muted"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Email cannot be changed
                  </p>
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    Role: {profile?.role || 'Customer'}
                  </Badge>
                </div>

                <Button type="submit" disabled={updating}>
                  {updating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Update Profile
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Shipping Addresses */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Shipping Addresses
              </CardTitle>
              <CardDescription>
                Manage your delivery addresses
              </CardDescription>
            </CardHeader>
            <CardContent>
              {addresses.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No addresses found</p>
                  <Button variant="outline">Add Address</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      className="border rounded-lg p-4 relative"
                    >
                      {address.is_default && (
                        <Badge className="absolute top-2 right-2">Default</Badge>
                      )}
                      <div className="space-y-1">
                        <p className="font-medium">
                          {address.first_name} {address.last_name}
                        </p>
                        {address.company && (
                          <p className="text-sm text-muted-foreground">{address.company}</p>
                        )}
                        <p className="text-sm">{address.address_line_1}</p>
                        {address.address_line_2 && (
                          <p className="text-sm">{address.address_line_2}</p>
                        )}
                        <p className="text-sm">
                          {address.city}, {address.state} {address.postal_code}
                        </p>
                        <p className="text-sm">{address.country}</p>
                        {address.phone && (
                          <p className="text-sm text-muted-foreground">{address.phone}</p>
                        )}
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    Add New Address
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security
              </CardTitle>
              <CardDescription>
                Change your password and security settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                  />
                </div>
                
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                  />
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                  />
                </div>

                <Button type="submit" disabled={updating}>
                  {updating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Change Password
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Recent Orders
              </CardTitle>
              <CardDescription>
                View your recent order history
              </CardDescription>
            </CardHeader>
            <CardContent>
              {orders.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No orders found</p>
                  <Button variant="outline">Start Shopping</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border rounded-lg p-4 flex items-center justify-between"
                    >
                      <div>
                        <p className="font-medium">#{order.order_number}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                        <p className="text-sm font-medium mt-1">
                          ${order.total_amount.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    View All Orders
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;