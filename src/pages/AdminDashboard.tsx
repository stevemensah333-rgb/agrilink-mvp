import { useState } from "react";
import { Link } from "react-router-dom";
import { Users, Package, DollarSign, TrendingUp, Settings, ShoppingCart, Wheat, BarChart3, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/marketplace/Header";
import { useAuth } from "@/contexts/AuthContext";
import NotificationBell from "@/components/NotificationBell";
import AuthGuard from "@/components/AuthGuard";
import RoleGuard from "@/components/RoleGuard";
import AdminOrdersTable from "@/components/admin/AdminOrdersTable";
import AdminUsersTable from "@/components/admin/AdminUsersTable";
import AdminProductsTable from "@/components/admin/AdminProductsTable";
import AdminPaymentsTable from "@/components/admin/AdminPaymentsTable";
import AdminAnalytics from "@/components/admin/AdminAnalytics";
import { useAdminOrders, useAdminProducts, useAdminUsers, useAdminStats, useAdminPayments } from "@/hooks/useAdminData";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  
  const { orders, loading: ordersLoading, refetch: refetchOrders } = useAdminOrders();
  const { products, loading: productsLoading } = useAdminProducts();
  const { users, loading: usersLoading } = useAdminUsers();
  const { stats, loading: statsLoading } = useAdminStats();
  const { payments, loading: paymentsLoading, refetch: refetchPayments } = useAdminPayments();

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Admin Dashboard</h1>
          <p className="text-muted-foreground mb-8">
            Sign in to access the admin panel
          </p>
          <Link to="/auth" state={{ role: "admin", redirectTo: "/admin" }}>
            <Button className="bg-primary hover:bg-primary/90">
              Sign In as Admin
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const platformRevenue = payments.reduce((sum, p) => sum + p.platform_fee, 0);
  const farmerPayouts = payments.reduce((sum, p) => sum + p.farmer_amount, 0);

  const statCards = [
    { label: "Total Orders", value: stats.totalOrders.toString(), icon: ShoppingCart, change: `${stats.pendingOrders} pending` },
    { label: "Total Users", value: stats.totalUsers.toString(), icon: Users, change: "All roles" },
    { label: "Platform Revenue", value: `₵${platformRevenue.toFixed(0)}`, icon: DollarSign, change: "10% of sales" },
    { label: "Farmer Payouts", value: `₵${farmerPayouts.toFixed(0)}`, icon: CreditCard, change: "90% to farmers" },
  ];

  return (
    <AuthGuard role="admin" redirectTo="/admin">
      <RoleGuard allowedRoles={["admin"]}>
        <div className="min-h-screen bg-background">
          <Header />
          
          <main className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
                <p className="text-muted-foreground">Complete platform overview and control</p>
              </div>
              <div className="flex items-center gap-4">
                <NotificationBell />
                <Link to="/settings">
                  <Button variant="outline" size="icon">
                    <Settings className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statCards.map((stat) => (
                <Card key={stat.label}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <stat.icon className="w-6 h-6 text-primary" />
                      </div>
                      <span className="text-sm text-muted-foreground">{stat.change}</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Tabs for different views */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="overview" className="gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="orders" className="gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Orders
                </TabsTrigger>
                <TabsTrigger value="payments" className="gap-2">
                  <CreditCard className="w-4 h-4" />
                  Payments
                </TabsTrigger>
                <TabsTrigger value="users" className="gap-2">
                  <Users className="w-4 h-4" />
                  Users
                </TabsTrigger>
                <TabsTrigger value="products" className="gap-2">
                  <Wheat className="w-4 h-4" />
                  Products
                </TabsTrigger>
                <TabsTrigger value="analytics" className="gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Analytics
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Recent Orders */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <AdminOrdersTable 
                        orders={orders.slice(0, 5)} 
                        loading={ordersLoading} 
                        onRefetch={refetchOrders}
                      />
                    </CardContent>
                  </Card>

                  {/* Latest Payments */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Payments</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <AdminPaymentsTable 
                        payments={payments.slice(0, 5)} 
                        loading={paymentsLoading}
                        onRefetch={refetchPayments}
                      />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="orders">
                <Card>
                  <CardHeader>
                    <CardTitle>All Orders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <AdminOrdersTable 
                      orders={orders} 
                      loading={ordersLoading} 
                      onRefetch={refetchOrders}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="payments">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>All Payments</CardTitle>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="px-3 py-1 rounded-full bg-primary/10 text-primary">
                        Platform: ₵{platformRevenue.toFixed(2)}
                      </div>
                      <div className="px-3 py-1 rounded-full bg-secondary/10 text-secondary">
                        Farmers: ₵{farmerPayouts.toFixed(2)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <AdminPaymentsTable 
                      payments={payments} 
                      loading={paymentsLoading}
                      onRefetch={refetchPayments}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="users">
                <Card>
                  <CardHeader>
                    <CardTitle>All Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <AdminUsersTable users={users} loading={usersLoading} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="products">
                <Card>
                  <CardHeader>
                    <CardTitle>All Products</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <AdminProductsTable products={products} loading={productsLoading} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics">
                <AdminAnalytics orders={orders} products={products} users={users} />
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </RoleGuard>
    </AuthGuard>
  );
};

export default AdminDashboard;
