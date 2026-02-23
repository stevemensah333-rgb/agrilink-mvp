import { Package, Clock, Search, ShieldCheck } from "lucide-react";
import logisticsScene from "@/assets/logistics-scene.jpg";

const benefits = [
  { icon: Search, title: "Browse & Compare", desc: "Find exactly what you need with real-time listings from hundreds of farms." },
  { icon: Package, title: "Bulk Purchasing", desc: "Businesses can order in volume at wholesale prices directly from source." },
  { icon: Clock, title: "Fast Delivery", desc: "Tracked logistics from farm to your doorstep in hours, not days." },
  { icon: ShieldCheck, title: "Quality Guaranteed", desc: "Every listing is verified. Fresh produce, every time." },
];

const BenefitsBuyers = () => {
  return (
    <section className="py-24 px-4 warm-section">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative hidden lg:block order-2 lg:order-1">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img src={logisticsScene} alt="Farm logistics and delivery" className="w-full h-[500px] object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 glass-card rounded-2xl p-5 shadow-xl border border-border">
              <p className="text-2xl font-bold text-foreground">24hrs</p>
              <p className="text-sm text-muted-foreground">Average delivery time</p>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">For Buyers</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Fresh From the Farm to Your Table
            </h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              Whether you're a restaurant, retailer, or household — get the freshest produce at fair prices with full transparency.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {benefits.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-accent/10 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-sm">{item.title}</h3>
                    <p className="text-muted-foreground text-sm mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsBuyers;
