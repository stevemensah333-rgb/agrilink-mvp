import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Phone, Sprout, Users, Truck, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";

import farmerHero from "@/assets/farmer-hero.jpg";
import produceBasket from "@/assets/produce-basket.jpg";
import leafyGreens from "@/assets/leafy-greens.jpg";
import farmerPortrait from "@/assets/farmer-portrait.jpg";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGoToMarketplace = () => {
    if (user) navigate("/marketplace");
    else navigate("/auth", { state: { role: "buyer", redirectTo: "/marketplace" } });
  };

  const handleJoinAsFarmer = () => {
    if (user) navigate("/farmer");
    else navigate("/auth", { state: { role: "farmer", redirectTo: "/farmer" } });
  };

  const handleJoinAsAgent = () => {
    if (user) navigate("/agent");
    else navigate("/auth", { state: { role: "agent", redirectTo: "/agent" } });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="hero-section absolute inset-0 -skew-y-2 origin-top-left scale-110" />
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/90 text-primary text-sm font-semibold shadow-sm">
                <Sprout className="w-4 h-4" />
                Ghana's Farm-to-Table Network
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-primary-foreground leading-[1.1] tracking-tight">
                Fresh From
                <br />
                The <span className="text-accent">Harvest</span>
              </h1>

              <p className="text-lg text-primary-foreground/80 max-w-md leading-relaxed">
                Direct connections. Fair prices. Real impact. Whether you're buying or selling, Harvest-In puts the power in your hands.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Button
                  size="lg"
                  className="h-14 px-8 gap-3 bg-background text-primary hover:bg-background/90 font-bold text-base shadow-lg"
                  onClick={handleGoToMarketplace}
                >
                  Go to Marketplace
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold"
                  onClick={handleJoinAsFarmer}
                >
                  Sell Your Produce
                </Button>
              </div>
            </div>

            <div className="relative animate-scale-in hidden lg:block">
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                  <img
                    src={farmerHero}
                    alt="Farmer tending to crops at golden hour"
                    className="w-full h-[520px] object-cover"
                  />
                </div>
                {/* Floating stat card */}
                <div className="absolute -bottom-6 -left-6 glass-card rounded-2xl p-5 shadow-xl border border-border">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl overflow-hidden">
                      <img src={produceBasket} alt="Fresh produce" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">500+</p>
                      <p className="text-sm text-muted-foreground">Active Farms</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Sprout, title: "Farm Fresh", desc: "Sourced directly from local Ghanaian farms" },
              { icon: ShieldCheck, title: "Fair Pricing", desc: "No middlemen markup — 90% goes to farmers" },
              { icon: Truck, title: "Your Choice", desc: "Pick your transport — bike to truck" },
              { icon: Users, title: "Agent Network", desc: "Local agents coordinate everything" },
            ].map((item) => (
              <div key={item.title} className="text-center space-y-4 p-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-bold text-lg text-foreground">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-muted/40">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              One Platform, Many Roles
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Harvest-In connects every link in the agricultural chain
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Buyer Card */}
            <div className="group bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={leafyGreens} alt="Fresh produce" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">Buyer</span>
                <h3 className="font-bold text-foreground mb-2">Shop Fresh</h3>
                <p className="text-sm text-muted-foreground mb-4">Browse produce, choose transport, pay fair prices.</p>
                <button onClick={handleGoToMarketplace} className="text-primary font-semibold text-sm hover:underline">
                  Go to Marketplace →
                </button>
              </div>
            </div>

            {/* Farmer Card */}
            <div className="group bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={farmerPortrait} alt="Farmer" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold mb-3">Farmer</span>
                <h3 className="font-bold text-foreground mb-2">Sell Direct</h3>
                <p className="text-sm text-muted-foreground mb-4">List produce, get 90% of sales straight to MoMo.</p>
                <button onClick={handleJoinAsFarmer} className="text-primary font-semibold text-sm hover:underline">
                  Farmer Dashboard →
                </button>
              </div>
            </div>

            {/* Agent Card */}
            <div className="group bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={produceBasket} alt="Produce basket" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent-foreground text-xs font-semibold mb-3">Agent</span>
                <h3 className="font-bold text-foreground mb-2">Coordinate</h3>
                <p className="text-sm text-muted-foreground mb-4">Bridge the gap, manage logistics, earn commission.</p>
                <button onClick={handleJoinAsAgent} className="text-primary font-semibold text-sm hover:underline">
                  Agent Dashboard →
                </button>
              </div>
            </div>

            {/* USSD Card */}
            <div className="bg-primary rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-center p-8">
              <div className="w-16 h-16 rounded-2xl bg-primary-foreground/15 flex items-center justify-center mb-6">
                <Phone className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-bold text-lg text-primary-foreground mb-2">No Internet?</h3>
              <p className="text-sm text-primary-foreground/75 mb-6">
                Dial our USSD code and access the full marketplace from any phone.
              </p>
              <Link to="/ussd" className="text-primary-foreground font-semibold text-sm hover:underline">
                Try USSD Demo →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="hero-section absolute inset-0 skew-y-1 origin-bottom-right scale-110" />
        <div className="relative py-20 md:py-28 px-4">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-5">
              Start Your Harvest Today
            </h2>
            <p className="text-primary-foreground/75 text-lg mb-10 max-w-lg mx-auto">
              Join thousands of farmers and buyers already growing together on Harvest-In.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="h-14 px-10 gap-3 bg-background text-primary hover:bg-background/90 font-bold text-base shadow-lg"
                onClick={handleGoToMarketplace}
              >
                Go to Marketplace
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-10 border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold"
                onClick={handleJoinAsFarmer}
              >
                Join as Farmer
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 border-t border-border bg-card">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Sprout className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground">Harvest-In</span>
          </div>
          <p className="text-muted-foreground text-sm">
            © 2026 Harvest-In. Connecting Ghana's Agricultural Network.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
