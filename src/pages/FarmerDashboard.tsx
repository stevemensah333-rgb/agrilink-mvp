import { Link } from "react-router-dom";
import { Package, TrendingUp, Wheat, Users, Settings, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/marketplace/Header";
import AuthGuard from "@/components/AuthGuard";
import NotificationBell from "@/components/NotificationBell";

const FarmerDashboard = () => {
  const stats = [
    { label: "Active Listings", value: "8", icon: Wheat, color: "text-primary" },
    { label: "Pending Orders", value: "15", icon: Package, color: "text-secondary" },
    { label: "Buyers Connected", value: "42", icon: Users, color: "text-accent" },
    { label: "This Week's Sales", value: "₵1,250", icon: TrendingUp, color: "text-primary" },
  ];

  const listings = [
    { id: "LST-001", produce: "Fresh Tomatoes", qty: "200 kg", price: "₵8/kg", status: "Active" },
    { id: "LST-002", produce: "Yam Tubers", qty: "100 tubers", price: "₵15/tuber", status: "Active" },
    { id: "LST-003", produce: "Cassava", qty: "150 kg", price: "₵5/kg", status: "Sold Out" },
  ];

  const recentOrders = [
    { id: "ORD-101", buyer: "Kofi Mensah", produce: "Fresh Tomatoes", qty: "50 kg", status: "Processing" },
    { id: "ORD-102", buyer: "Ama Serwaa", produce: "Yam Tubers", qty: "20 tubers", status: "Ready" },
    { id: "ORD-103", buyer: "Kwame Asante", produce: "Fresh Tomatoes", qty: "30 kg", status: "Delivered" },
  ];

  return (
    <AuthGuard role="farmer" redirectTo="/farmer">
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
        {/* Header with notifications */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Farmer Dashboard</h1>
            <p className="text-muted-foreground">Manage your produce listings and orders</p>
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

        <div className="grid lg:grid-cols-2 gap-8">
          {/* My Listings */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>My Listings</CardTitle>
              <Button size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                Add Listing
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {listings.map((listing) => (
                  <div key={listing.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">{listing.produce}</p>
                      <p className="text-sm text-muted-foreground">{listing.qty} • {listing.price}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      listing.status === "Active" ? "bg-primary/20 text-primary" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {listing.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">{order.produce}</p>
                      <p className="text-sm text-muted-foreground">{order.buyer} • {order.qty}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === "Processing" ? "bg-secondary/20 text-secondary" :
                      order.status === "Ready" ? "bg-primary/20 text-primary" :
                      "bg-green-100 text-green-700"
                    }`}>
                      {order.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      </div>
    </AuthGuard>
  );
};

export default FarmerDashboard;
