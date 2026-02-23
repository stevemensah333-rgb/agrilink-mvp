import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-farm-produce.jpg";

interface LandingHeroProps {
  onShopProduce: () => void;
  onSellHarvest: () => void;
}

const LandingHero = ({ onShopProduce, onSellHarvest }: LandingHeroProps) => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Fresh farm produce with lush green fields"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/30" />
      </div>

      <div className="relative container mx-auto px-4 py-20">
        <div className="max-w-2xl space-y-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/15 backdrop-blur-sm text-primary-foreground text-sm font-medium border border-primary-foreground/20">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Africa's Leading Agriculture Marketplace
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-primary-foreground leading-[1.08] tracking-tight">
            From Farm to Market —{" "}
            <span className="text-accent">Faster, Fairer, Smarter.</span>
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-xl leading-relaxed">
            We connect farmers directly to customers and businesses — eliminating middlemen, improving income, and giving everyone access to the freshest produce.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Button
              size="lg"
              className="h-14 px-8 gap-3 bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base shadow-xl"
              onClick={onShopProduce}
            >
              Shop Fresh Produce
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-8 border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold backdrop-blur-sm"
              onClick={onSellHarvest}
            >
              Sell Your Harvest
            </Button>
          </div>

          {/* Mini trust badges */}
          <div className="flex flex-wrap items-center gap-6 pt-4 text-primary-foreground/60 text-sm">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              500+ Active Farms
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              10,000+ Orders Fulfilled
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              15 Regions Covered
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
