import { Link } from "react-router-dom";
import { Users, Package, DollarSign, TrendingUp, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/marketplace/Header";
import { useAuth } from "@/contexts/AuthContext";
import NotificationBell from "@/components/NotificationBell";

const AdminDashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Admin Dashboard</h1>
          <p className="text-muted-foreground mb-8">
            Sign in to access the admin panel
          </p>
          <Link to="/auth" state={{ redirectTo: "/admin" }}>
            <Button className="bg-primary hover:bg-primary/90">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const stats = [
    { label: "Total Orders", value: "1,234", icon: Package, change: "+12%" },
    { label: "Active Users", value: "5,678", icon: Users, change: "+8%" },
    { label: "Revenue (GHS)", value: "45,000", icon: DollarSign, change: "+23%" },
    { label: "Growth", value: "15%", icon: TrendingUp, change: "+5%" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Overview of platform performance</p>
          </div>
          <div className="flex items-center gap-4">
            <NotificationBell />
            <Button variant="outline" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Package className="w-6 h-6" />
                <span>Manage Orders</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Users className="w-6 h-6" />
                <span>View Users</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <DollarSign className="w-6 h-6" />
                <span>Payments</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <TrendingUp className="w-6 h-6" />
                <span>Analytics</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;
