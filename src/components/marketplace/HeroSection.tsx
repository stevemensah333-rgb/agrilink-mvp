import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const HeroSection = ({ searchQuery, onSearchChange }: HeroSectionProps) => {
  return (
    <section className="hero-section py-12 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-3">
          Agri-Bridge Market
        </h1>
        <p className="text-primary-foreground/80 text-lg mb-8">
          Connect directly with farmers. Choose your transport. Fair prices for everyone.
        </p>
        
        <div className="flex gap-3 max-w-xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search produce or farmer name..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-card h-12 border-0 shadow-lg"
            />
          </div>
          <Button className="h-12 px-6 gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/90">
            <Search className="w-4 h-4" />
            Search
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
