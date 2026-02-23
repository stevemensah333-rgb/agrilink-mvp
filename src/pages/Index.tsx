import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Phone, Sprout, Users, Truck, ShieldCheck, Mail, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";

import farmerHero from "@/assets/farmer-hero.jpg";
import produceBasket from "@/assets/produce-basket.jpg";
import leafyGreens from "@/assets/leafy-greens.jpg";
import farmerPortrait from "@/assets/farmer-portrait.jpg";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
    type: "partnership"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate form submission - replace with actual API call
      console.log("Form submitted:", formData);
      
      // Reset form after submission
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        message: "",
        type: "partnership"
      });
      
      // Show success message (implement toast notification as needed)
      alert("Thank you! We'll be in touch soon.");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero with Video Background */}
      <section className="relative overflow-hidden bg-black min-h-screen flex items-center">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-70"
          >
            <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/yhs-Qc3elEDn2VeCqrERq50jTGyRJaRSx5.mp4" type="video/mp4" />
          </video>
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
        </div>

        {/* Hero Content */}
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 max-w-xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-sm font-semibold shadow-sm border border-white/20 hover:bg-white/20 transition-colors">
                <Sprout className="w-4 h-4" />
                Ghana's Farm-to-Table Network
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight">
                Fresh From
                <br />
                The <span className="bg-gradient-to-r from-accent via-secondary to-primary bg-clip-text text-transparent">Harvest</span>
              </h1>

              <p className="text-lg text-white/80 max-w-md leading-relaxed">
                Direct connections. Fair prices. Real impact. Whether you're buying or selling, Harvest-In puts the power in your hands.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  className="h-14 px-8 gap-3 bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-base shadow-xl"
                  onClick={handleGoToMarketplace}
                >
                  Go to Marketplace
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  className="h-14 px-8 gap-2 bg-white/10 text-white hover:bg-white/20 font-semibold border border-white/30 backdrop-blur-sm"
                  onClick={handleJoinAsFarmer}
                >
                  <Sprout className="w-5 h-5" />
                  Sell Your Produce
                </Button>
              </div>

              {/* Stats */}
              <div className="flex gap-8 pt-8 border-t border-white/10">
                <div>
                  <p className="text-3xl font-bold text-primary">500+</p>
                  <p className="text-white/60 text-sm">Active Farms</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-accent">10K+</p>
                  <p className="text-white/60 text-sm">Happy Customers</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-secondary">90%</p>
                  <p className="text-white/60 text-sm">Fair Share</p>
                </div>
              </div>
            </div>

            {/* Right side - Hidden on mobile, shown on lg */}
            <div className="hidden lg:flex flex-col justify-center items-center space-y-6">
              <div className="glass-card rounded-2xl p-8 border border-white/20 backdrop-blur-xl max-w-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-6 h-6 text-primary" />
                  <span className="font-semibold text-white">Join Our Community</span>
                </div>
                <p className="text-white/70 text-sm">Connect with farmers and buyers across Ghana with real-time market prices and direct shipping options.</p>
              </div>
              <div className="glass-card rounded-2xl p-8 border border-white/20 backdrop-blur-xl max-w-sm">
                <div className="flex items-center gap-3 mb-4">
                  <ShieldCheck className="w-6 h-6 text-accent" />
                  <span className="font-semibold text-white">Secure & Fair</span>
                </div>
                <p className="text-white/70 text-sm">Transparent pricing, secure payments, and verified transactions on every single order.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center p-2">
            <div className="w-1 h-1 bg-white/60 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Why Harvest-In?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We've simplified agriculture by removing middlemen and creating direct connections between farmers and buyers.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Sprout, title: "Farm Fresh", desc: "Sourced directly from local Ghanaian farms", color: "text-primary" },
              { icon: ShieldCheck, title: "Fair Pricing", desc: "No middlemen markup — 90% goes to farmers", color: "text-accent" },
              { icon: Truck, title: "Your Choice", desc: "Pick your transport — bike to truck", color: "text-secondary" },
              { icon: Users, title: "Agent Network", desc: "Local agents coordinate everything", color: "text-primary" },
            ].map((item) => (
              <div key={item.title} className="group bg-card rounded-2xl p-8 shadow-md hover:shadow-xl hover:border-primary/50 transition-all duration-300 border border-border hover:-translate-y-1">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className={`w-7 h-7 ${item.color}`} />
                </div>
                <h3 className="font-bold text-lg text-foreground text-center mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm text-center">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold shadow-sm mb-4">
              <Leaf className="w-4 h-4" />
              How It Works
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              One Platform, Many Roles
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Harvest-In connects every link in the agricultural chain with simplicity and transparency.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Buyer Card */}
            <div className="group relative bg-gradient-to-br from-card to-card/80 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-border hover:border-primary/50">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={leafyGreens} alt="Fresh produce" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
              </div>
              <div className="p-6 relative">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">Buyer</span>
                <h3 className="font-bold text-lg text-foreground mb-2">Shop Fresh</h3>
                <p className="text-sm text-muted-foreground mb-4">Browse produce, choose transport, pay fair prices.</p>
                <button onClick={handleGoToMarketplace} className="text-primary font-semibold text-sm hover:gap-2 hover:underline inline-flex items-center gap-1 transition-all">
                  Go to Marketplace <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Farmer Card */}
            <div className="group relative bg-gradient-to-br from-card to-card/80 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-border hover:border-secondary/50">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/0 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={farmerPortrait} alt="Farmer" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
              </div>
              <div className="p-6 relative">
                <span className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold mb-3">Farmer</span>
                <h3 className="font-bold text-lg text-foreground mb-2">Sell Direct</h3>
                <p className="text-sm text-muted-foreground mb-4">List produce, get 90% of sales straight to MoMo.</p>
                <button onClick={handleJoinAsFarmer} className="text-primary font-semibold text-sm hover:gap-2 hover:underline inline-flex items-center gap-1 transition-all">
                  Farmer Dashboard <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Agent Card */}
            <div className="group relative bg-gradient-to-br from-card to-card/80 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-border hover:border-accent/50">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={produceBasket} alt="Produce basket" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
              </div>
              <div className="p-6 relative">
                <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent-foreground text-xs font-semibold mb-3">Agent</span>
                <h3 className="font-bold text-lg text-foreground mb-2">Coordinate</h3>
                <p className="text-sm text-muted-foreground mb-4">Bridge the gap, manage logistics, earn commission.</p>
                <button onClick={handleJoinAsAgent} className="text-primary font-semibold text-sm hover:gap-2 hover:underline inline-flex items-center gap-1 transition-all">
                  Agent Dashboard <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Admin Card */}
            <div className="group relative bg-gradient-to-br from-card to-card/80 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-border hover:border-destructive/50">
              <div className="absolute inset-0 bg-gradient-to-br from-destructive/0 to-destructive/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                <ShieldCheck className="w-20 h-20 text-primary/40 group-hover:text-primary/60 group-hover:scale-110 transition-all duration-300" />
              </div>
              <div className="p-6 relative">
                <span className="inline-block px-3 py-1 rounded-full bg-destructive/10 text-destructive text-xs font-semibold mb-3">Admin</span>
                <h3 className="font-bold text-lg text-foreground mb-2">Control Center</h3>
                <p className="text-sm text-muted-foreground mb-4">Manage users, orders, payments & analytics.</p>
                <Link to="/admin/login" className="text-primary font-semibold text-sm hover:gap-2 hover:underline inline-flex items-center gap-1 transition-all">
                  Admin Portal <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* USSD Card */}
            <div className="group relative bg-gradient-to-br from-primary to-accent rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-white transition-opacity duration-300" />
              <div className="relative aspect-[4/3] bg-gradient-to-br from-primary/80 to-accent/80 flex items-center justify-center">
                <Phone className="w-16 h-16 text-white/60 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
              </div>
              <div className="p-6 relative">
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold mb-3">No Internet?</span>
                <h3 className="font-bold text-lg text-white mb-2">Call & Shop</h3>
                <p className="text-sm text-white/80 mb-4">Dial our USSD code and access the full marketplace from any phone.</p>
                <Link to="/ussd" className="text-white font-semibold text-sm hover:gap-2 hover:underline inline-flex items-center gap-1 transition-all">
                  Try USSD Demo <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-20 md:py-28 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/10 to-secondary/20" />
        <div className="relative container mx-auto text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold shadow-sm mb-6">
            <Sprout className="w-4 h-4" />
            Ready to Get Started?
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Start Your <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">Harvest</span> Today
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of farmers and buyers already growing together on Harvest-In. Whether you're buying fresh produce or selling your harvest, we've got you covered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="h-14 px-10 gap-3 bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-base shadow-xl"
              onClick={handleGoToMarketplace}
            >
              Start Shopping
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              size="lg"
              className="h-14 px-10 gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold text-base shadow-xl"
              onClick={handleJoinAsFarmer}
            >
              <Sprout className="w-5 h-5" />
              Become a Farmer
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-10 border-2 border-primary text-primary hover:bg-primary/10 font-semibold"
              onClick={handleJoinAsAgent}
            >
              Join as Agent
            </Button>
          </div>
        </div>
      </section>

      {/* Partnership Form Section */}
      <section className="py-20 md:py-28 px-4 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 text-primary text-sm font-semibold shadow-sm mb-6">
              <Leaf className="w-4 h-4" />
              Partnership Opportunity
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Grow Something Great Together
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Whether you're a farmer, distributor, or partner, we're here to support your goals with sustainable solutions and direct connections.
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="bg-card rounded-3xl p-8 md:p-12 shadow-lg border border-border">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-semibold text-foreground">
                  Full Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="James Adeyemi"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                  className="h-12 border-border/50 focus-visible:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold text-foreground">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="james@example.com"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                  className="h-12 border-border/50 focus-visible:ring-primary"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-semibold text-foreground">
                  Organization
                </label>
                <Input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="Your Farm or Company"
                  value={formData.company}
                  onChange={handleFormChange}
                  required
                  className="h-12 border-border/50 focus-visible:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-semibold text-foreground">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+233 XX XXX XXXX"
                  value={formData.phone}
                  onChange={handleFormChange}
                  className="h-12 border-border/50 focus-visible:ring-primary"
                />
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <label htmlFor="type" className="text-sm font-semibold text-foreground">
                Partnership Type
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleFormChange}
                className="w-full h-12 px-4 rounded-lg border border-border/50 bg-background text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              >
                <option value="partnership">Strategic Partnership</option>
                <option value="farmer">Farmer Network</option>
                <option value="distribution">Distribution Partner</option>
                <option value="technology">Technology Integration</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="space-y-2 mb-8">
              <label htmlFor="message" className="text-sm font-semibold text-foreground">
                Tell Us About Your Goals
              </label>
              <Textarea
                id="message"
                name="message"
                placeholder="Share your vision and how we can grow together..."
                value={formData.message}
                onChange={handleFormChange}
                required
                className="min-h-32 border-border/50 focus-visible:ring-primary resize-none"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base rounded-lg"
            >
              {isSubmitting ? "Sending..." : "Start Growing Together"}
              {!isSubmitting && <ArrowRight className="w-5 h-5 ml-2" />}
            </Button>

            <p className="text-center text-sm text-muted-foreground mt-6">
              We'll review your inquiry and get back to you within 48 hours.
            </p>
          </form>
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
