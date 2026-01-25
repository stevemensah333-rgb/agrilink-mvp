import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Package, Truck, TrendingUp, Settings, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/marketplace/Header";
import { useAuth } from "@/contexts/AuthContext";
import NotificationBell from "@/components/NotificationBell";
import AddProductDialog from "@/components/agent/AddProductDialog";
import ProductsTable from "@/components/agent/ProductsTable";
import OrdersTable from "@/components/agent/OrdersTable";
import { useAgentProducts } from "@/hooks/useProducts";
import { useAgentOrders } from "@/hooks/useOrders";

const AgentCenter = () => {
  const { user } = useAuth();
  const { products, loading: productsLoading, refetch: refetchProducts } = useAgentProducts(user?.id);
  const { orders, loading: ordersLoading, refetch: refetchOrders } = useAgentOrders(user?.id);

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Agent Center</h1>
          <p className="text-muted-foreground mb-8">
            Sign in as an agent to access your dashboard
          </p>
          <Link to="/auth" state={{ role: "agent", redirectTo: "/agent" }}>
            <Button className="bg-primary hover:bg-primary/90">
              Sign In as Agent
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const confirmedOrders = orders.filter((o) => o.status === "confirmed").length;
  const totalEarnings = orders
    .filter((o) => o.status === "delivered")
    .reduce((sum, o) => sum + o.total_price, 0);

  const stats = [
    { label: "Pending Orders", value: pendingOrders.toString(), icon: Package, color: "text-secondary" },
    { label: "Active Deliveries", value: confirmedOrders.toString(), icon: Truck, color: "text-primary" },
    { label: "Products Listed", value: products.length.toString(), icon: ShoppingBag, color: "text-accent" },
    { label: "Total Earnings", value: `₵${totalEarnings.toFixed(0)}`, icon: TrendingUp, color: "text-secondary" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header with notifications */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Agent Dashboard</h1>
            <p className="text-muted-foreground">Manage products and orders from farmers</p>
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
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs for Products and Orders */}
        <Tabs defaultValue="products" className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="products">My Products</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
            </TabsList>
            <AddProductDialog onProductAdded={refetchProducts} />
          </div>

          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>Product Listings</CardTitle>
              </CardHeader>
              <CardContent>
                <ProductsTable 
                  products={products} 
                  loading={productsLoading} 
                  onRefresh={refetchProducts} 
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <OrdersTable 
                  orders={orders} 
                  loading={ordersLoading} 
                  onRefresh={refetchOrders} 
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AgentCenter;
