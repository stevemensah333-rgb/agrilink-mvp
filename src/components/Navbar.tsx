import { Link, useLocation } from "react-router-dom";
import { Globe, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const location = useLocation();
  
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
          <div>
            <span className="font-bold text-xl text-foreground">Agri-Bridge</span>
            <p className="text-xs text-muted-foreground">Farm to Table, Simplified</p>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <button className="hidden md:flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <Globe className="w-4 h-4" />
            <span>English</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          
          <Link to="/marketplace">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
