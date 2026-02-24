import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Phone, Sprout, Users, Truck, ShieldCheck, Mail, Leaf, CheckCircle, MapPin, TrendingUp, Clock, Zap, BarChart3, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import farmerPortrait from "@/assets/farmer-portrait.jpg";
import leafyGreens from "@/assets/leafy-greens.jpg";
import produceBasket from "@/assets/produce-basket.jpg";

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
      console.log("Form submitted:", formData);
      
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        message: "",
        type: "partnership"
      });
      
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

      {/* ===== HERO SECTION WITH VIDEO ===== */}
      <section className="relative w-full h-screen overflow-hidden bg-black">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/hero-video-poster.jpg"
            className="w-full h-full object-cover"
          >
            <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/yhs-Qc3elEDn2VeCqrERq50jTGyRJaRSx5.mp4" type="video/mp4" />
          </video>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4 py-20">
            <div className="max-w-2xl space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-sm font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300">
                <Leaf className="w-4 h-4" />
                Africa's Farm-to-Market Platform
              </div>

              {/* Main Headline */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight tracking-tight">
                From Farm to Market —
                <br />
                <span className="bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent">Faster, Fairer, Smarter</span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg md:text-xl text-white/90 max-w-xl leading-relaxed font-medium">
                Connect rural farmers directly to customers and businesses. Remove middlemen, increase farmer income by 90%, and guarantee access to fresh, traceable food.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-8">
                <Button
                  size="lg"
                  className="h-14 px-8 gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-base shadow-2xl transition-all duration-300 hover:scale-105"
                  onClick={handleGoToMarketplace}
                >
                  Buy Fresh Produce
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  className="h-14 px-8 gap-2 bg-secondary text-black hover:bg-secondary/90 font-bold text-base shadow-2xl transition-all duration-300 hover:scale-105"
                  onClick={handleJoinAsFarmer}
                >
                  <Sprout className="w-5 h-5" />
                  Sell Your Harvest
                </Button>
              </div>

              {/* Impact Stats */}
              <div className="grid grid-cols-3 gap-6 pt-12 border-t border-white/15">
                <div className="hover:scale-105 transition-transform duration-300">
                  <p className="text-3xl md:text-4xl font-black text-secondary">500+</p>
                  <p className="text-white/70 text-sm mt-1 font-medium">Active Farmers</p>
                </div>
                <div className="hover:scale-105 transition-transform duration-300">
                  <p className="text-3xl md:text-4xl font-black text-accent">10K+</p>
                  <p className="text-white/70 text-sm mt-1 font-medium">Daily Transactions</p>
                </div>
                <div className="hover:scale-105 transition-transform duration-300">
                  <p className="text-3xl md:text-4xl font-black text-primary">$2M+</p>
                  <p className="text-white/70 text-sm mt-1 font-medium">Farmer Income</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <p className="text-white/60 text-xs font-semibold uppercase tracking-widest">Scroll to explore</p>
            <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center p-2">
              <div className="w-1 h-2 bg-white/60 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROBLEM SECTION ===== */}
      <section className="py-24 px-4 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
              <Zap className="w-4 h-4" />
              The Challenge
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Farmers Are Getting Squeezed Out
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Rural farmers in Africa face persistent barriers: limited market access, exploitative middlemen taking 50-70% of profits, information gaps on pricing, unreliable logistics, and delayed payments. Buyers struggle to find consistent, traceable produce at fair prices.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              { icon: Users, title: "Market Access Gap", desc: "Most farmers sell only to local middlemen at fixed, low prices" },
              { icon: TrendingUp, title: "Income Instability", desc: "No demand signals or price transparency—farmers can't plan ahead" },
              { icon: Truck, title: "Logistics Friction", desc: "No reliable, affordable transport from farm to urban markets" }
            ].map((item, i) => (
              <div key={i} className="bg-card rounded-2xl p-8 border border-border hover:border-primary/50 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SOLUTION SECTION ===== */}
      <section className="py-24 px-4 bg-background">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-semibold mb-6">
              <CheckCircle className="w-4 h-4" />
              Our Solution
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Digital + Offline Infrastructure
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Harvest-In combines a mobile-first marketplace with on-ground agent networks to bridge rural and urban markets. We handle orders, logistics, payments, and traceability so farmers can focus on farming.
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                number: "1",
                title: "List Produce",
                desc: "Farmers list harvest via app or SMS, set prices, indicate availability",
                icon: Leaf
              },
              {
                number: "2",
                title: "Receive Orders",
                desc: "Direct connections to bulk buyers & retail platforms without middlemen",
                icon: ShieldCheck
              },
              {
                number: "3",
                title: "Deliver or Pickup",
                desc: "Flexible logistics: agents arrange transport, farmers deliver, or buyers pickup",
                icon: Truck
              },
              {
                number: "4",
                title: "Fast Payments",
                desc: "Farmers receive 90% of sale value within 24 hours to MoMo or bank",
                icon: TrendingUp
              }
            ].map((step, idx) => (
              <div key={idx} className="flex gap-8 items-start bg-card rounded-2xl p-8 border border-border hover:border-primary/50 transition-all duration-300">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-secondary">
                    <span className="text-lg font-black text-white">{step.number}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.desc}</p>
                </div>
                <div className="flex-shrink-0 hidden sm:block">
                  <step.icon className="w-6 h-6 text-primary/40" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BENEFITS FOR FARMERS ===== */}
      <section className="py-24 px-4 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Why Farmers Choose Harvest-In
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: TrendingUp, title: "90% Fair Pricing", desc: "Earn 90% of market price—no middlemen taking cuts" },
              { icon: BarChart3, title: "Demand Insights", desc: "See real-time buyer interest before planting" },
              { icon: Zap, title: "Offline-First Access", desc: "Register and trade via SMS if no internet" },
              { icon: Clock, title: "Faster Payments", desc: "Get paid within 24 hours, not weeks" },
              { icon: MapPin, title: "National Reach", desc: "Access buyers across Ghana, not just local market" },
              { icon: Leaf, title: "Quality Focus", desc: "Direct feedback from buyers improves your yield" }
            ].map((item, i) => (
              <div key={i} className="bg-card rounded-2xl p-8 border border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BENEFITS FOR BUYERS ===== */}
      <section className="py-24 px-4 bg-background">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Why Buyers Trust Harvest-In
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: ShieldCheck, title: "Verified Traceability", desc: "Know exactly where your food comes from—farm to table" },
              { icon: Truck, title: "Reliable Supply", desc: "Direct connections to consistent producer networks" },
              { icon: TrendingUp, title: "Bulk Purchasing", desc: "B2B pricing for restaurants, retailers, and wholesalers" },
              { icon: Clock, title: "Fresh Guarantee", desc: "Farm-to-buyer delivery within 24-48 hours" },
              { icon: Users, title: "Farmer Profiles", desc: "Support specific farmers & build brand loyalty" },
              { icon: Zap, title: "Instant Ordering", desc: "Place orders anytime via app or USSD" }
            ].map((item, i) => (
              <div key={i} className="bg-card rounded-2xl p-8 border border-border hover:border-secondary/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TECHNOLOGY ===== */}
      <section className="py-24 px-4 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
              <Zap className="w-4 h-4" />
              Technology Stack
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Built for Africa
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Offline-first design, SMS/USSD support for feature phones, mobile money integration (MoMo, bank transfers), and IoT sensors for quality tracking.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Mobile-First", desc: "Native iOS & Android apps with offline functionality", icon: Phone },
              { title: "SMS & USSD", desc: "Trade without internet on any phone", icon: Mail },
              { title: "Logistics Layer", desc: "Real-time tracking, agent coordination, delivery optimization", icon: Truck }
            ].map((item, i) => (
              <div key={i} className="bg-card rounded-2xl p-8 border border-border hover:border-primary/50 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== IMPACT METRICS ===== */}
      <section className="py-24 px-4 bg-background">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Real Economic Impact
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { metric: "+45%", label: "Average Income Increase" },
              { metric: "72h", label: "Farm to Market Speed" },
              { metric: "-60%", label: "Food Waste Reduction" },
              { metric: "10K+", label: "Active Users" }
            ].map((item, i) => (
              <div key={i} className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 border border-primary/20 text-center hover:shadow-lg transition-all duration-300">
                <p className="text-4xl md:text-5xl font-black text-primary mb-2">{item.metric}</p>
                <p className="text-muted-foreground font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-24 px-4 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
              <Users className="w-4 h-4" />
              Success Stories
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Hear from Our Community
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Kwame Appiah",
                role: "Tomato Farmer, Ashanti Region",
                image: farmerPortrait,
                quote: "Before Harvest-In, middlemen paid me ₵0.50 per kg. Now I get ₵1.20. I've tripled my income and hired two workers."
              },
              {
                name: "Ama Mensah",
                role: "Restaurant Chain Owner, Accra",
                image: leafyGreens,
                quote: "We source directly from 15 farms now. The produce is fresher, prices are better, and we can actually tell customers where their food comes from."
              },
              {
                name: "Yaw Boateng",
                role: "Logistics Agent, Greater Accra",
                image: produceBasket,
                quote: "I earn commissions coordinating shipments. The app makes logistics simple and transparent. I'm now connecting 30+ farmers to buyers weekly."
              }
            ].map((story, i) => (
              <div key={i} className="bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="aspect-video overflow-hidden bg-muted">
                  <img src={story.image} alt={story.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-8">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => <span key={i} className="text-secondary text-lg">★</span>)}
                  </div>
                  <p className="text-foreground mb-6 italic leading-relaxed">"{story.quote}"</p>
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

      {/* ===== MARKETPLACE PREVIEW ===== */}
      <section className="py-24 px-4 bg-background">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
              <Leaf className="w-4 h-4" />
              Browse Live Marketplace
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Fresh Produce at Your Fingertips
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Organic Tomatoes", price: "₵2.50/kg", location: "Kumasi", availability: "Available Now", image: leafyGreens },
              { name: "Bell Peppers Mix", price: "₵3.00/kg", location: "Ashanti", availability: "Available Now", image: produceBasket },
              { name: "Leafy Greens", price: "₵1.50/bunch", location: "Central Region", availability: "Available Now", image: farmerPortrait }
            ].map((product, i) => (
              <div key={i} className="produce-card bg-card rounded-2xl overflow-hidden border border-border">
                <div className="aspect-square overflow-hidden bg-muted relative">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                    {product.availability}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-2">{product.name}</h3>
                  <div className="flex items-center gap-1 text-muted-foreground text-sm mb-4">
                    <MapPin className="w-4 h-4" />
                    {product.location}
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-2xl font-bold text-primary">{product.price}</p>
                    <Button size="sm" className="h-10 px-4 bg-primary hover:bg-primary/90">
                      Order
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              className="h-14 px-10 bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
              onClick={handleGoToMarketplace}
            >
              Explore Full Marketplace
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* ===== PARTNERS ===== */}
      <section className="py-24 px-4 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Trusted By
            </h2>
            <p className="text-muted-foreground text-lg">
              Working with NGOs, farmer cooperatives, and food brands to transform agriculture
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {["Partner 1", "Partner 2", "Partner 3", "Partner 4"].map((partner, i) => (
              <div key={i} className="bg-card rounded-xl p-8 border border-border text-center hover:border-primary/50 transition-all duration-300">
                <p className="text-muted-foreground font-medium">{partner}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONVERSION CTA ===== */}
      <section className="py-24 px-4 bg-background">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-r from-primary via-accent to-secondary rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Ready to Transform Your Harvest?
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                Join thousands of farmers and buyers revolutionizing agriculture in Africa. Start earning 90% of fair prices today.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                <Button
                  size="lg"
                  className="h-14 px-10 bg-white text-primary hover:bg-white/90 font-bold"
                  onClick={handleJoinAsFarmer}
                >
                  I'm a Farmer
                  <Sprout className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  size="lg"
                  className="h-14 px-10 bg-background text-foreground hover:bg-muted font-bold"
                  onClick={handleGoToMarketplace}
                >
                  I'm a Buyer
                  <ShoppingCart className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== NEWSLETTER & MOBILE APP ===== */}
      <section className="py-24 px-4 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Newsletter */}
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-4">Stay Updated</h3>
              <p className="text-muted-foreground mb-6">Get weekly market insights, pricing trends, and platform updates directly to your inbox.</p>
              <form className="flex gap-2" onSubmit={handleFormSubmit}>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="h-12 flex-1 bg-card border-border"
                  required
                />
                <Button className="h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                  Subscribe
                </Button>
              </form>
            </div>

            {/* Mobile App Download */}
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-4">Download Our App</h3>
              <p className="text-muted-foreground mb-6">Trade on the go with our mobile app—available on iOS and Android with full offline support.</p>
              <div className="flex gap-4">
                <Button variant="outline" className="h-12 px-6 border-2 border-primary text-primary hover:bg-primary/10">
                  App Store
                </Button>
                <Button variant="outline" className="h-12 px-6 border-2 border-primary text-primary hover:bg-primary/10">
                  Google Play
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PARTNERSHIP FORM ===== */}
      <section className="py-20 md:py-28 px-4 bg-background">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold shadow-sm mb-6">
              <Leaf className="w-4 h-4" />
              Partnership Opportunity
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Grow Together with Harvest-In
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              NGOs, cooperatives, enterprises—let's collaborate to strengthen agricultural systems.
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
                  placeholder="Your name"
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
                  placeholder="your@email.com"
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
                  placeholder="Your organization"
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
                <option value="farmer">Farmer Cooperative</option>
                <option value="ngo">NGO / Development Organization</option>
                <option value="investor">Investor / Venture Capital</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="space-y-2 mb-8">
              <label htmlFor="message" className="text-sm font-semibold text-foreground">
                Tell Us About Your Vision
              </label>
              <Textarea
                id="message"
                name="message"
                placeholder="How can we grow together?"
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
              We'll review your inquiry and get back within 48 hours.
            </p>
          </form>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-16 px-4 bg-foreground text-background border-t border-border">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h4 className="font-bold text-lg mb-4">Harvest-In</h4>
              <p className="text-sm text-background/70 leading-relaxed">
                Transforming agriculture from farm to market across Africa. Fair prices, fresh food, sustainable livelihoods.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4 text-sm">Product</h5>
              <ul className="space-y-2 text-sm">
                <li><Link to="/marketplace" className="hover:text-accent transition-colors">Marketplace</Link></li>
                <li><Link to="/farmer" className="hover:text-accent transition-colors">For Farmers</Link></li>
                <li><Link to="/agent" className="hover:text-accent transition-colors">For Agents</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4 text-sm">Company</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-accent transition-colors">About</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Impact</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4 text-sm">Follow Us</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-accent transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">LinkedIn</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-background/20">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-background/70">
              <p>&copy; 2024 Harvest-In. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
