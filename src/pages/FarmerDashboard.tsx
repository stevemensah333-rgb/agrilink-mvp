import { Link } from "react-router-dom";
import { Package, TrendingUp, Wheat, Users, Settings, Trash2, ToggleLeft, ToggleRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/marketplace/Header";
import AuthGuard from "@/components/AuthGuard";
import RoleGuard from "@/components/RoleGuard";
import NotificationBell from "@/components/NotificationBell";
import AddListingDialog from "@/components/farmer/AddListingDialog";
import { useAuth } from "@/contexts/AuthContext";
import { useFarmerProducts } from "@/hooks/useFarmerProducts";
import { useToast } from "@/hooks/use-toast";
import { getProduceImage } from "@/lib/produceImages";

const FarmerDashboard = () => {
  const { user } = useAuth();
  const { products, loading, refetch, toggleAvailability, deleteProduct } = useFarmerProducts(user?.id);
  const { toast } = useToast();

  const stats = [
    { label: "Active Listings", value: products.filter(p => p.is_available).length.toString(), icon: Wheat, color: "text-primary" },
    { label: "Total Products", value: products.length.toString(), icon: Package, color: "text-secondary" },
    { label: "Categories", value: [...new Set(products.map(p => p.category))].length.toString(), icon: Users, color: "text-accent" },
    { label: "Est. Value", value: `₵${products.reduce((sum, p) => sum + (p.price * p.quantity), 0).toFixed(0)}`, icon: TrendingUp, color: "text-primary" },
  ];

  const handleToggleAvailability = async (productId: string, isAvailable: boolean) => {
    const success = await toggleAvailability(productId, isAvailable);
    if (success) {
      toast({
        title: isAvailable ? "Product hidden" : "Product visible",
        description: isAvailable ? "Product is now hidden from marketplace" : "Product is now visible in marketplace",
      });
    }
  };

  const handleDelete = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this listing?")) return;
    const success = await deleteProduct(productId);
    if (success) {
      toast({
        title: "Product deleted",
        description: "Your listing has been removed",
      });
    }
  };

  return (
    <AuthGuard role="farmer" redirectTo="/farmer">
      <RoleGuard allowedRoles={["farmer"]}>
        <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          {/* Header with notifications */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Farmer Dashboard</h1>
              <p className="text-muted-foreground">Manage your produce listings</p>
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

          {/* My Listings */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>My Listings</CardTitle>
              <AddListingDialog onListingAdded={refetch} />
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8 text-muted-foreground">Loading listings...</div>
              ) : products.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p className="mb-4">No listings yet. Add your first produce!</p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {products.map((product) => (
                    <div key={product.id} className="border border-border rounded-lg overflow-hidden bg-card">
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={product.image_url || getProduceImage(product.name, product.category)} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-foreground">{product.name}</h3>
                            <p className="text-sm text-muted-foreground">{product.category}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            product.is_available 
                              ? "bg-primary/20 text-primary" 
                              : "bg-muted text-muted-foreground"
                          }`}>
                            {product.is_available ? "Active" : "Hidden"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm mb-3">
                          <span className="text-foreground font-medium">₵{product.price}/{product.unit}</span>
                          <span className="text-muted-foreground">{product.quantity} available</span>
                        </div>
                        {product.location && (
                          <p className="text-xs text-muted-foreground mb-3">📍 {product.location}</p>
                        )}
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => handleToggleAvailability(product.id, product.is_available)}
                          >
                            {product.is_available ? (
                              <>
                                <ToggleRight className="w-4 h-4 mr-1" />
                                Hide
                              </>
                            ) : (
                              <>
                                <ToggleLeft className="w-4 h-4 mr-1" />
                                Show
                              </>
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-destructive hover:bg-destructive/10"
                            onClick={() => handleDelete(product.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </main>
        </div>
      </RoleGuard>
    </AuthGuard>
  );
};

export default FarmerDashboard;
