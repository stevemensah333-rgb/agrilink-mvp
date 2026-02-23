import { TrendingUp, ShieldCheck, Smartphone, BarChart3 } from "lucide-react";
import farmerPortrait from "@/assets/farmer-portrait.jpg";

const benefits = [
  { icon: TrendingUp, title: "90% Revenue to You", desc: "No middlemen. Earn what your harvest is truly worth." },
  { icon: Smartphone, title: "Mobile-First Access", desc: "List produce from any phone — even via USSD with no internet." },
  { icon: BarChart3, title: "Data & Insights", desc: "Track demand, pricing trends, and optimize your planting." },
  { icon: ShieldCheck, title: "Secure Payments", desc: "Get paid directly to your MoMo — fast, safe, guaranteed." },
];

const BenefitsFarmers = () => {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">For Farmers</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Empowering Farmers With Technology
            </h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              We give farmers the tools to sell smarter, earn more, and grow sustainably — no matter how remote.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {benefits.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-sm">{item.title}</h3>
                    <p className="text-muted-foreground text-sm mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img src={farmerPortrait} alt="Farmer with fresh produce" className="w-full h-[500px] object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 glass-card rounded-2xl p-5 shadow-xl border border-border">
              <p className="text-2xl font-bold text-foreground">+40%</p>
              <p className="text-sm text-muted-foreground">Average income increase</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsFarmers;
