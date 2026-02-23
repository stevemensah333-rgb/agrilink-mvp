import tomatoes from "@/assets/tomatoes.jpg";
import yams from "@/assets/yams.jpg";
import peppers from "@/assets/peppers.jpg";
import plantain from "@/assets/plantain.jpg";
import maize from "@/assets/maize.jpg";
import cassava from "@/assets/cassava.jpg";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FeaturedProduceProps {
  onViewMarketplace: () => void;
}

const produce = [
  { name: "Fresh Tomatoes", location: "Ashanti Region", price: "GH₵ 45/bag", image: tomatoes },
  { name: "Premium Yams", location: "Northern Region", price: "GH₵ 120/tuber", image: yams },
  { name: "Hot Peppers", location: "Volta Region", price: "GH₵ 35/kg", image: peppers },
  { name: "Ripe Plantain", location: "Eastern Region", price: "GH₵ 25/bunch", image: plantain },
  { name: "Dried Maize", location: "Brong-Ahafo", price: "GH₵ 200/bag", image: maize },
  { name: "Fresh Cassava", location: "Central Region", price: "GH₵ 55/bag", image: cassava },
];

const FeaturedProduce = ({ onViewMarketplace }: FeaturedProduceProps) => {
  return (
    <section className="py-24 px-4 warm-section">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">Fresh Today</p>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">Featured Produce</h2>
          </div>
          <Button variant="outline" className="gap-2 self-start" onClick={onViewMarketplace}>
            View All Produce <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {produce.map((item) => (
            <div key={item.name} className="group bg-card rounded-2xl overflow-hidden border border-border produce-card cursor-pointer" onClick={onViewMarketplace}>
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-foreground">{item.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{item.location}</p>
                <p className="text-primary font-bold mt-2">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProduce;
