import { Link } from "react-router-dom";
import { Users, Package, Truck, TrendingUp, Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/marketplace/Header";
import { useAuth } from "@/contexts/AuthContext";
import NotificationBell from "@/components/NotificationBell";

const AgentCenter = () => {
  const { user } = useAuth();

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

  const stats = [
    { label: "Pending Orders", value: "12", icon: Package, color: "text-secondary" },
    { label: "Active Deliveries", value: "5", icon: Truck, color: "text-primary" },
    { label: "Buyers Connected", value: "34", icon: Users, color: "text-accent" },
    { label: "This Week's Earnings", value: "₵850", icon: TrendingUp, color: "text-secondary" },
  ];

  const recentOrders = [
    { id: "ORD-001", buyer: "Kofi Mensah", produce: "Yam Tubers", qty: "50 tubers", status: "Pending" },
    { id: "ORD-002", buyer: "Ama Serwaa", produce: "Fresh Tomatoes", qty: "100 kg", status: "In Transit" },
    { id: "ORD-003", buyer: "Kwame Asante", produce: "Mixed Peppers", qty: "30 kg", status: "Delivered" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header with notifications */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Agent Dashboard</h1>
            <p className="text-muted-foreground">Manage orders and connect buyers with farmers</p>
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

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Order ID</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Buyer</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Produce</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Quantity</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-border">
                      <td className="py-4 px-4 text-sm font-medium text-foreground">{order.id}</td>
                      <td className="py-4 px-4 text-sm text-foreground">{order.buyer}</td>
                      <td className="py-4 px-4 text-sm text-foreground">{order.produce}</td>
                      <td className="py-4 px-4 text-sm text-foreground">{order.qty}</td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === "Pending" ? "bg-secondary/20 text-secondary" :
                          order.status === "In Transit" ? "bg-primary/20 text-primary" :
                          "bg-green-100 text-green-700"
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <Button variant="outline" size="sm">View</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AgentCenter;
