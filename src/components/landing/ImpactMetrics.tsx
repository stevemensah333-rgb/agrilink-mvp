import { TrendingUp, Leaf, Clock, Users } from "lucide-react";

const metrics = [
  { icon: TrendingUp, value: "40%", label: "Farmer Income Increase", description: "Average boost in earnings for farmers on our platform" },
  { icon: Leaf, value: "60%", label: "Less Food Waste", description: "Reduction in post-harvest losses through better logistics" },
  { icon: Clock, value: "3x", label: "Faster Delivery", description: "Compared to traditional middlemen supply chains" },
  { icon: Users, value: "5,000+", label: "Farmers Empowered", description: "Rural farmers connected to markets they couldn't reach before" },
];

const ImpactMetrics = () => {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">Our Impact</p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Real Numbers, Real Change
          </h2>
          <p className="text-muted-foreground text-lg">
            We're not just building technology — we're transforming lives and livelihoods across Africa.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric) => (
            <div key={metric.label} className="text-center bg-card rounded-2xl p-8 border border-border shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <metric.icon className="w-7 h-7 text-primary" />
              </div>
              <p className="text-4xl font-extrabold text-primary mb-1">{metric.value}</p>
              <h3 className="font-bold text-foreground text-sm mb-2">{metric.label}</h3>
              <p className="text-muted-foreground text-xs">{metric.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactMetrics;
