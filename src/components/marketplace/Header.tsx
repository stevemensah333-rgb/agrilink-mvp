import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 text-primary-foreground"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="font-bold text-xl text-foreground">Agri-Bridge</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link 
            to="/" 
            className={`transition-colors ${
              isActive("/") 
                ? "text-foreground font-medium" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Home
          </Link>
          <Link 
            to="/marketplace" 
            className={`px-4 py-2 rounded-full transition-colors ${
              isActive("/marketplace")
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Marketplace
          </Link>
          <Link 
            to="/agent" 
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Agent Center
          </Link>
          <Link 
            to="/admin" 
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Admin Dashboard
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="w-5 h-5" />
          </Button>
          <Button variant="outline" className="gap-2">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Kofi</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
