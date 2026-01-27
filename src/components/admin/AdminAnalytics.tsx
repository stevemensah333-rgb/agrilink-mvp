import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Order {
  id: string;
  status: string;
  total_price: number;
  transport_cost: number;
  service_fee: number;
  created_at: string;
}

interface Product {
  category: string;
}

interface Profile {
  role: string;
}

interface AdminAnalyticsProps {
  orders: Order[];
  products: Product[];
  users: Profile[];
}

const COLORS = ["#2d5016", "#8b6914", "#c7a21f", "#4a7c23", "#6b4c1a"];

const AdminAnalytics = ({ orders, products, users }: AdminAnalyticsProps) => {
  // Calculate order status distribution
  const statusData = [
    { name: "Pending", value: orders.filter(o => o.status === "pending").length },
    { name: "Confirmed", value: orders.filter(o => o.status === "confirmed").length },
    { name: "Delivered", value: orders.filter(o => o.status === "delivered").length },
    { name: "Cancelled", value: orders.filter(o => o.status === "cancelled").length },
  ].filter(item => item.value > 0);

  // Calculate user role distribution
  const roleData = [
    { name: "Buyers", value: users.filter(u => u.role === "buyer").length },
    { name: "Farmers", value: users.filter(u => u.role === "farmer").length },
    { name: "Agents", value: users.filter(u => u.role === "agent").length },
    { name: "Admins", value: users.filter(u => u.role === "admin").length },
  ].filter(item => item.value > 0);

  // Calculate product category distribution
  const categoryCount = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categoryData = Object.entries(categoryCount).map(([name, value]) => ({
    name,
    value,
  }));

  // Calculate monthly revenue (mock data based on orders)
  const monthlyRevenue = orders.reduce((acc, order) => {
    const month = new Date(order.created_at).toLocaleString('default', { month: 'short' });
    const total = Number(order.total_price) + Number(order.transport_cost) + Number(order.service_fee);
    acc[month] = (acc[month] || 0) + total;
    return acc;
  }, {} as Record<string, number>);

  const revenueData = Object.entries(monthlyRevenue).map(([month, revenue]) => ({
    month,
    revenue: Number(revenue.toFixed(2)),
  }));

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Order Status Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Order Status Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            {statusData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                No order data available
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* User Roles Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">User Roles Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            {roleData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={roleData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {roleData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                No user data available
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Product Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Products by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            {categoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={80} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#2d5016" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                No product data available
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Revenue Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Revenue by Month</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            {revenueData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₵${value}`, "Revenue"]} />
                  <Bar dataKey="revenue" fill="#8b6914" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                No revenue data available
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAnalytics;
