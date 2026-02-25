import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Phone, Sprout, Users, Truck, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { leafyGreens, produceBasket, yams } from "@/lib/produceImages";

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
    <div className="min-h-screen bg-gradient-to-br from-background via-green-50 to-background">
      <Navbar />

      {/* Hero Section with Green Pattern */}
      <section className="relative overflow-hidden pt-12">
        {/* Green pattern background */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl opacity-20" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-green-400 rounded-full blur-3xl opacity-15" />
        </div>

        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-green-100 border border-primary/20 text-primary text-sm font-semibold shadow-sm">
                <Sprout className="w-4 h-4" />
                Ghana's Farm-to-Table Network
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
                <span className="text-foreground">Fresh From</span>
                <br />
                <span className="bg-gradient-to-r from-primary via-green-500 to-emerald-600 bg-clip-text text-transparent">The Harvest</span>
              </h1>

              <p className="text-lg text-foreground/75 max-w-md leading-relaxed font-medium">
                Direct connections. Fair prices. Real impact. Whether you're buying or selling, Harvest-In puts the power in your hands.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button
                  size="lg"
                  className="h-14 px-8 gap-3 bg-gradient-to-r from-primary to-green-500 hover:from-primary/90 hover:to-green-500/90 text-white font-bold text-base shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={handleGoToMarketplace}
                >
                  Go to Marketplace
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  className="h-14 px-8 gap-2 border-2 border-primary/30 text-primary hover:bg-primary/5 font-semibold transition-all duration-300"
                  onClick={handleJoinAsFarmer}
                >
                  <Sprout className="w-5 h-5" />
                  Sell Your Produce
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-primary/10">
                <div>
                  <p className="text-3xl font-black text-primary">500+</p>
                  <p className="text-sm text-foreground/60 mt-1 font-medium">Active Farms</p>
                </div>
                <div>
                  <p className="text-3xl font-black text-green-500">10K+</p>
                  <p className="text-sm text-foreground/60 mt-1 font-medium">Customers</p>
                </div>
                <div>
                  <p className="text-3xl font-black text-accent">90%</p>
                  <p className="text-sm text-foreground/60 mt-1 font-medium">To Farmers</p>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:flex justify-center">
              <div className="relative">
                {/* Decorative circles */}
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
                <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-green-400/10 rounded-full blur-2xl" />

                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-primary/10">
                  <img
                    src={leafyGreens}
                    alt="Fresh produce"
                    className="w-full h-[520px] object-cover"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                {/* Floating stat card */}
                <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl p-6 shadow-2xl border border-primary/10 backdrop-blur-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-primary/10">
                      <img src={produceBasket} alt="Fresh produce" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-2xl font-black text-primary">500+</p>
                      <p className="text-sm text-foreground/60 font-medium">Active Farms</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Props with Green Cards */}
      <section className="py-24 px-4 bg-gradient-to-b from-transparent via-green-50/50 to-transparent">
        <div className="container mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Sprout, title: "Farm Fresh", desc: "Sourced directly from local Ghanaian farms", color: "from-green-500 to-emerald-600" },
              { icon: ShieldCheck, title: "Fair Pricing", desc: "No middlemen markup — 90% goes to farmers", color: "from-primary to-green-500" },
              { icon: Truck, title: "Your Choice", desc: "Pick your transport — bike to truck", color: "from-green-400 to-teal-500" },
              { icon: Users, title: "Agent Network", desc: "Local agents coordinate everything", color: "from-emerald-500 to-green-600" },
            ].map((item) => (
              <div key={item.title} className="group relative bg-white rounded-2xl p-8 border border-primary/10 hover:border-primary/30 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-green-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-foreground text-center mb-3">{item.title}</h3>
                  <p className="text-foreground/60 text-sm text-center leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Role Cards */}
      <section className="py-24 px-4 bg-gradient-to-b from-background to-green-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-green-100 border border-primary/20 text-primary text-sm font-semibold shadow-sm mb-6">
              <Sprout className="w-4 h-4" />
              Multiple Pathways
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
              One Platform, <span className="bg-gradient-to-r from-primary to-green-500 bg-clip-text text-transparent">Many Roles</span>
            </h2>
            <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
              Harvest-In connects every link in the agricultural chain with tools built for each role
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Buyer Card */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:-translate-y-2">
              <div className="aspect-video overflow-hidden relative">
                <img src={leafyGreens} alt="Fresh produce" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-primary/10 to-green-100 text-primary text-xs font-semibold mb-3">Buyer</span>
                <h3 className="font-bold text-lg text-foreground mb-2">Shop Fresh</h3>
                <p className="text-sm text-foreground/60 mb-4 leading-relaxed">Browse produce, choose transport, pay fair prices.</p>
                <button onClick={handleGoToMarketplace} className="text-primary font-semibold text-sm hover:text-primary/70 inline-flex items-center gap-1 transition-colors">
                  Go to Marketplace <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Farmer Card */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:-translate-y-2">
              <div className="aspect-video overflow-hidden relative">
                <img src={yams} alt="Farmer" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-100 text-green-600 text-xs font-semibold mb-3">Farmer</span>
                <h3 className="font-bold text-lg text-foreground mb-2">Sell Direct</h3>
                <p className="text-sm text-foreground/60 mb-4 leading-relaxed">List produce, get 90% of sales straight to MoMo.</p>
                <button onClick={handleJoinAsFarmer} className="text-primary font-semibold text-sm hover:text-primary/70 inline-flex items-center gap-1 transition-colors">
                  Farmer Dashboard <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Agent Card */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:-translate-y-2">
              <div className="aspect-video overflow-hidden relative">
                <img src={produceBasket} alt="Produce" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-accent/10 to-yellow-100 text-accent text-xs font-semibold mb-3">Agent</span>
                <h3 className="font-bold text-lg text-foreground mb-2">Coordinate</h3>
                <p className="text-sm text-foreground/60 mb-4 leading-relaxed">Bridge the gap, manage logistics, earn commission.</p>
                <button onClick={handleJoinAsAgent} className="text-primary font-semibold text-sm hover:text-primary/70 inline-flex items-center gap-1 transition-colors">
                  Agent Dashboard <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Admin Card */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:-translate-y-2">
              <div className="aspect-video overflow-hidden bg-gradient-to-br from-primary/10 to-green-100 flex items-center justify-center relative">
                <ShieldCheck className="w-16 h-16 text-primary/40 group-hover:scale-110 group-hover:text-primary/60 transition-all duration-300" />
              </div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-semibold mb-3">Admin</span>
                <h3 className="font-bold text-lg text-foreground mb-2">Control Center</h3>
                <p className="text-sm text-foreground/60 mb-4 leading-relaxed">Manage users, orders, payments & analytics.</p>
                <Link to="/admin/login" className="text-primary font-semibold text-sm hover:text-primary/70 inline-flex items-center gap-1 transition-colors">
                  Admin Portal <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* USSD Card */}
            <div className="group bg-gradient-to-br from-primary to-green-500 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-center p-8 text-white border border-primary/20">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm">
                <Phone className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-lg mb-2">No Internet?</h3>
              <p className="text-sm text-white/80 mb-6 leading-relaxed">
                Dial USSD and access marketplace from any phone.
              </p>
              <Link to="/ussd" className="text-white font-semibold text-sm hover:text-white/80 inline-flex items-center gap-1 transition-colors">
                Try USSD Demo <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Green Pattern */}
      <section className="relative overflow-hidden py-24 md:py-32 px-4">
        {/* Green pattern background */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl opacity-20" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-green-400 rounded-full blur-3xl opacity-15" />
        </div>

        <div className="relative container mx-auto text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-green-100 border border-primary/20 text-primary text-sm font-semibold shadow-sm mb-6">
            <Sprout className="w-4 h-4" />
            Ready to Join?
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-foreground">Start Your </span>
            <span className="bg-gradient-to-r from-primary via-green-500 to-emerald-600 bg-clip-text text-transparent">Harvest</span>
            <span className="text-foreground"> Today</span>
          </h2>
          <p className="text-foreground/70 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of farmers and buyers already growing together on Harvest-In. Get fair prices, direct connections, and real impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="h-14 px-10 gap-3 bg-gradient-to-r from-primary to-green-500 hover:from-primary/90 hover:to-green-500/90 text-white font-bold text-base shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={handleGoToMarketplace}
            >
              Go to Marketplace
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              size="lg"
              className="h-14 px-10 gap-2 border-2 border-primary/30 text-primary hover:bg-primary/5 font-semibold transition-all duration-300"
              onClick={handleJoinAsFarmer}
            >
              <Sprout className="w-5 h-5" />
              Join as Farmer
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-10 border-2 border-foreground/20 text-foreground hover:bg-foreground/5 font-semibold transition-all duration-300"
              onClick={handleJoinAsAgent}
            >
              Become an Agent
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-primary/10 bg-gradient-to-b from-background to-green-50">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-primary/10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-green-500 flex items-center justify-center">
                  <Sprout className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-foreground">Harvest-In</span>
              </div>
              <p className="text-sm text-foreground/60">Ghana's farm-to-table network.</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3 text-sm">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-foreground/60 hover:text-primary transition-colors">Marketplace</a></li>
                <li><a href="#" className="text-foreground/60 hover:text-primary transition-colors">For Farmers</a></li>
                <li><a href="#" className="text-foreground/60 hover:text-primary transition-colors">For Agents</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3 text-sm">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-foreground/60 hover:text-primary transition-colors">About</a></li>
                <li><a href="#" className="text-foreground/60 hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="text-foreground/60 hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3 text-sm">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-foreground/60 hover:text-primary transition-colors">Privacy</a></li>
                <li><a href="#" className="text-foreground/60 hover:text-primary transition-colors">Terms</a></li>
                <li><a href="#" className="text-foreground/60 hover:text-primary transition-colors">Support</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-foreground/60 text-sm">© 2026 Harvest-In. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">Twitter</a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">Instagram</a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

export default Index;
