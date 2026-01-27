import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, ShoppingCart, Wheat, Users, Shield } from "lucide-react";
import Header from "@/components/marketplace/Header";

interface AuthGuardProps {
  children: React.ReactNode;
  role: "buyer" | "farmer" | "agent" | "admin";
  redirectTo: string;
}

const roleConfig = {
  buyer: {
    title: "Marketplace",
    description: "Sign in or create an account to start shopping for fresh farm produce",
    buttonText: "Sign In to Shop",
    icon: ShoppingCart,
  },
  farmer: {
    title: "Farmer Dashboard",
    description: "Sign in or create an account to manage your produce listings and orders",
    buttonText: "Sign In as Farmer",
    icon: Wheat,
  },
  agent: {
    title: "Agent Center",
    description: "Sign in or create an account to access your agent dashboard",
    buttonText: "Sign In as Agent",
    icon: Users,
  },
  admin: {
    title: "Admin Dashboard",
    description: "Sign in with admin credentials to access the admin panel",
    buttonText: "Sign In as Admin",
    icon: Shield,
  },
};

const AuthGuard = ({ children, role, redirectTo }: AuthGuardProps) => {
  const { user, loading } = useAuth();
  const config = roleConfig[role];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-32">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <config.icon className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">{config.title}</h1>
            <p className="text-muted-foreground mb-8">{config.description}</p>
            <div className="space-y-4">
              <Link to="/auth" state={{ role, redirectTo }}>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  {config.buttonText}
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link 
                  to="/auth" 
                  state={{ role, redirectTo }} 
                  className="text-primary hover:underline font-medium"
                >
                  Create one now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthGuard;
