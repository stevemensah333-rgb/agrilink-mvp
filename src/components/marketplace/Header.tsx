import { ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
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
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</a>
          <a href="/marketplace" className="px-4 py-2 bg-primary/10 rounded-full text-primary font-medium">Marketplace</a>
          <a href="/agent" className="text-muted-foreground hover:text-foreground transition-colors">Agent Center</a>
          <a href="/admin" className="text-muted-foreground hover:text-foreground transition-colors">Admin Dashboard</a>
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
