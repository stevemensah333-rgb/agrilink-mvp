import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart, User, LogOut, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import NotificationBell from "@/components/NotificationBell";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  
  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };
  
  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Sprout className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-extrabold text-xl text-foreground tracking-tight">Harvest-In</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link 
            to="/" 
            className={`transition-colors ${isActive("/") ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
          >
            Home
          </Link>
          <Link 
            to="/marketplace" 
            className={`px-4 py-2 rounded-full transition-colors ${isActive("/marketplace") ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground"}`}
          >
            Marketplace
          </Link>
          <Link 
            to="/agent" 
            className={`transition-colors ${isActive("/agent") ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
          >
            Agent Center
          </Link>
          <Link 
            to="/admin" 
            className={`transition-colors ${isActive("/admin") ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
          >
            Admin
          </Link>
          <Link 
            to="/ussd" 
            className={`transition-colors ${isActive("/ussd") ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
          >
            USSD
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {user && <NotificationBell />}
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="w-5 h-5" />
          </Button>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Account</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="text-muted-foreground text-sm">
                  {user.email}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/auth">
              <Button variant="outline" className="gap-2">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Sign In</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
