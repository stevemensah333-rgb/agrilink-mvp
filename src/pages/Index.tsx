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
            className="w-full h-full object-cover opacity-60"
          >
            <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/yhs-Qc3elEDn2VeCqrERq50jTGyRJaRSx5.mp4" type="video/mp4" />
          </video>
          {/* Advanced Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/60 to-black/40" />
        </div>

        {/* Hero Content */}
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 max-w-xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-sm font-semibold shadow-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
                <Sprout className="w-4 h-4" />
                Ghana's #1 Farm-to-Table Network
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight">
                Fresh From The
                <br />
                <span className="bg-gradient-to-r from-accent via-secondary to-primary bg-clip-text text-transparent">Harvest</span>
              </h1>

              <p className="text-lg text-white/85 max-w-md leading-relaxed font-medium">
                Direct connections. Fair prices. Real impact. Cut out the middlemen and connect farmers with buyers in Ghana, creating sustainable livelihoods for everyone.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button
                  size="lg"
                  className="h-14 px-8 gap-3 bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-base shadow-2xl transition-all duration-300 hover:scale-105"
                  onClick={handleGoToMarketplace}
                >
                  Explore Marketplace
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  className="h-14 px-8 gap-2 bg-white/15 text-white hover:bg-white/25 font-semibold border-2 border-white/40 backdrop-blur-sm transition-all duration-300"
                  onClick={handleJoinAsFarmer}
                >
                  <Sprout className="w-5 h-5" />
                  Start Selling
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/15">
                <div className="hover:transform hover:scale-105 transition-transform duration-300">
                  <p className="text-4xl font-black text-primary">500+</p>
                  <p className="text-white/70 text-xs mt-2 font-medium">Active Farms</p>
                </div>
                <div className="hover:transform hover:scale-105 transition-transform duration-300">
                  <p className="text-4xl font-black text-accent">10K+</p>
                  <p className="text-white/70 text-xs mt-2 font-medium">Happy Customers</p>
                </div>
                <div className="hover:transform hover:scale-105 transition-transform duration-300">
                  <p className="text-4xl font-black text-secondary">90%</p>
                  <p className="text-white/70 text-xs mt-2 font-medium">To Farmers</p>
                </div>
              </div>
            </div>

            {/* Right side - Hidden on mobile, shown on lg */}
            <div className="hidden lg:flex flex-col justify-center items-center space-y-6">
              <div className="group bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border-2 border-white/20 max-w-sm hover:bg-white/15 hover:border-white/40 transition-all duration-500 shadow-2xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-bold text-lg text-white">Join Our Community</span>
                </div>
                <p className="text-white/75 text-sm leading-relaxed">Connect with farmers and buyers with real-time market prices and flexible shipping across Ghana.</p>
              </div>
              <div className="group bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border-2 border-white/20 max-w-sm hover:bg-white/15 hover:border-white/40 transition-all duration-500 shadow-2xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-accent/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <ShieldCheck className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-bold text-lg text-white">Secure & Transparent</span>
                </div>
                <p className="text-white/75 text-sm leading-relaxed">Fair pricing, verified sellers, secure payments, and disputes resolved fairly for everyone.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center gap-3 animate-bounce">
            <p className="text-white/60 text-xs font-semibold uppercase tracking-widest">Scroll to explore</p>
            <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center p-2 hover:border-white/60 transition-colors duration-300">
              <div className="w-1 h-1 bg-white/60 rounded-full animate-pulse" />
            </div>
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

      {/* Industries/User Types We Serve */}
      <section className="py-24 px-4 bg-gradient-to-b from-background via-muted/20 to-background">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold shadow-sm mb-6">
              <Sprout className="w-4 h-4" />
              Who We Serve
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
              Built for Every Link in the Chain
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From small family farms to retail buyers, Harvest-In has solutions tailored to your agricultural journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Sprout,
                title: "Small Holder Farmers",
                desc: "List your produce directly, reach buyers without middlemen, get paid fairly to MoMo wallet.",
                features: ["List produce in minutes", "Fair pricing guarantee", "Mobile payment support"]
              },
              {
                icon: Truck,
                title: "Logistics Agents",
                desc: "Coordinate shipments, manage routes, earn commissions, build your local agent network.",
                features: ["Commission-based earning", "Route management tools", "Real-time tracking"]
              },
              {
                icon: Users,
                title: "Bulk Buyers & Retailers",
                desc: "Source fresh produce directly, negotiate prices, track orders, and manage inventory.",
                features: ["Wholesale pricing", "Bulk ordering", "Dedicated support"]
              },
            ].map((item, idx) => (
              <div key={idx} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-card rounded-3xl p-10 border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-base mb-6 leading-relaxed">{item.desc}</p>
                  <ul className="space-y-2">
                    {item.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Process - Inspired by Biogax */}
      <section className="py-24 px-4 bg-muted/40">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold shadow-sm mb-6">
              <Leaf className="w-4 h-4" />
              How to Get Started
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold text-foreground mb-4">
              4 Simple Steps to Join
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Whether you're buying or selling, get started in minutes with our streamlined onboarding process.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line - hidden on mobile */}
            <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary" style={{ width: 'calc(100% - 8px)', marginLeft: '16px' }} />

            <div className="grid md:grid-cols-4 gap-6 md:gap-0">
              {[
                {
                  number: "01",
                  title: "Sign Up",
                  desc: "Create your account and choose your role - Buyer, Farmer, or Agent.",
                  time: "2 mins"
                },
                {
                  number: "02",
                  title: "Verify Identity",
                  desc: "Complete simple KYC with your ID and contact information.",
                  time: "5 mins"
                },
                {
                  number: "03",
                  title: "Set Up Payment",
                  desc: "Connect your MoMo wallet or bank account for seamless transactions.",
                  time: "3 mins"
                },
                {
                  number: "04",
                  title: "Start Trading",
                  desc: "Browse marketplace, list products, or coordinate shipments immediately.",
                  time: "Ready!"
                },
              ].map((step, idx) => (
                <div key={idx} className="relative">
                  <div className="md:mb-24">
                    {/* Timeline circle */}
                    <div className="relative z-10 flex justify-center md:mb-8">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg border-4 border-background group hover:scale-110 transition-transform duration-300">
                        <span className="text-3xl font-black text-white">{step.number}</span>
                      </div>
                    </div>

                    {/* Content card */}
                    <div className="bg-card rounded-2xl p-8 border border-border text-center">
                      <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{step.desc}</p>
                      <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">~{step.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories - Inspired by Solshine testimonials */}
      <section className="py-24 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold shadow-sm mb-6">
              <Users className="w-4 h-4" />
              Success Stories
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold text-foreground mb-4">
              Real Impact from Real People
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              See how farmers and buyers are transforming agriculture with Harvest-In.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Kofi Mensah",
                role: "Tomato Farmer, Kumasi",
                image: farmerPortrait,
                quote: "I used to sell to middlemen for half price. Now I connect directly with buyers and earn 90% of the value. Harvest-In changed my farming business.",
                rating: 5
              },
              {
                name: "Ama Osei",
                role: "Restaurant Owner, Accra",
                image: leafyGreens,
                quote: "Finding fresh produce at fair prices was impossible. With Harvest-In, I source directly from farmers, guarantee freshness, and support local agriculture.",
                rating: 5
              },
              {
                name: "Kwame Boateng",
                role: "Agent, Tema",
                image: produceBasket,
                quote: "As an agent, I earn commissions coordinating shipments. The platform handles logistics, payments, and disputes - I just focus on connecting buyers and sellers.",
                rating: 5
              },
            ].map((story, idx) => (
              <div key={idx} className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                <div className="aspect-video overflow-hidden bg-muted">
                  <img src={story.image} alt={story.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-8">
                  <div className="flex gap-1 mb-4">
                    {Array(story.rating).fill(0).map((_, i) => (
                      <span key={i} className="text-accent text-lg">⭐</span>
                    ))}
                  </div>
                  <p className="text-foreground mb-6 leading-relaxed italic">"{story.quote}"</p>
                  <div>
                    <p className="font-bold text-foreground">{story.name}</p>
                    <p className="text-sm text-muted-foreground">{story.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
