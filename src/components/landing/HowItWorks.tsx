import { Sprout, CreditCard, Truck } from "lucide-react";

const steps = [
  {
    icon: Sprout,
    step: "01",
    title: "Farmers List Produce",
    description: "Farmers upload their harvest with photos, pricing, and available quantities — directly from any device.",
  },
  {
    icon: CreditCard,
    step: "02",
    title: "Buyers Browse & Order",
    description: "Customers and businesses shop fresh produce, compare prices, and place orders with secure payment options.",
  },
  {
    icon: Truck,
    step: "03",
    title: "We Handle Delivery",
    description: "Our logistics network picks up from farms and delivers to doorsteps — fast, tracked, and reliable.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">Simple Process</p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg">
            Three simple steps to connect farm-fresh produce with those who need it most.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((item, i) => (
            <div key={item.step} className="relative group">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px bg-border" />
              )}
              <div className="bg-card rounded-2xl p-8 border border-border shadow-sm hover:shadow-md transition-all duration-300 relative z-10">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <span className="text-4xl font-extrabold text-border group-hover:text-primary/20 transition-colors">{item.step}</span>
                </div>
                <h3 className="font-bold text-lg text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
