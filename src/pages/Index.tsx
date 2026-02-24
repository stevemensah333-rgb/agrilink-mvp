import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Phone, Sprout, Users, Truck, ShieldCheck, Mail, Leaf, CheckCircle } from "lucide-react";
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
      console.log("[v0] Form submitted:", formData);
      
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
      console.error("[v0] Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-32 px-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="relative container mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold shadow-sm border border-primary/20">
                <Sprout className="w-4 h-4" />
                Ghana's Farm-to-Table Network
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight text-balance">
                Fresh From The
                <br />
                <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">Harvest</span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
                Direct connections. Fair prices. Real impact. Cut out middlemen and connect farmers with buyers across Ghana.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  className="h-14 px-8 gap-3 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base shadow-lg transition-all duration-300"
                  onClick={handleGoToMarketplace}
                >
                  Explore Marketplace
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 border-2 border-primary text-primary hover:bg-primary/5 font-semibold text-base"
                  onClick={handleJoinAsFarmer}
                >
                  <Sprout className="w-5 h-5" />
                  Start Selling
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border">
                <div>
                  <p className="text-3xl font-bold text-primary">500+</p>
                  <p className="text-sm text-muted-foreground mt-1">Active Farms</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-accent">10K+</p>
                  <p className="text-sm text-muted-foreground mt-1">Customers</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-secondary">90%</p>
                  <p className="text-sm text-muted-foreground mt-1">To Farmers</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="group bg-card rounded-2xl p-6 border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Community First</h3>
                    <p className="text-sm text-muted-foreground">Connect with farmers and buyers directly</p>
                  </div>
                </div>
              </div>

              <div className="group bg-card rounded-2xl p-6 border border-border hover:border-accent/50 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                    <ShieldCheck className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Verified Transactions</h3>
                    <p className="text-sm text-muted-foreground">Secure payments and fair disputes</p>
                  </div>
                </div>
              </div>

              <div className="group bg-card rounded-2xl p-6 border border-border hover:border-secondary/50 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-secondary/20 transition-colors">
                    <Truck className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Flexible Logistics</h3>
                    <p className="text-sm text-muted-foreground">Choose your transport and pricing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Built for Every Role</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From small family farms to retail buyers and logistics agents, Harvest-In has solutions for everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Sprout,
                title: "Small Holder Farmers",
                desc: "List your produce, reach buyers directly, get 90% of sales to MoMo.",
                benefits: ["List in minutes", "Fair pricing", "Mobile payment"]
              },
              {
                icon: Truck,
                title: "Logistics Agents",
                desc: "Coordinate shipments, manage routes, earn commissions.",
                benefits: ["Earn per delivery", "Route tools", "Real-time tracking"]
              },
              {
                icon: Users,
                title: "Bulk Buyers",
                desc: "Source fresh produce directly, negotiate prices, track orders.",
                benefits: ["Wholesale rates", "Bulk ordering", "Support team"]
              },
            ].map((item) => (
              <div key={item.title} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative bg-card rounded-2xl p-8 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm mb-6">{item.desc}</p>
                  <ul className="space-y-2">
                    {item.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 bg-background">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold shadow-sm mb-4">
              <Leaf className="w-4 h-4" />
              Getting Started
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              4 Simple Steps to Join
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Start connecting with the agricultural community in just minutes.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 md:gap-0">
            {[
              { number: "01", title: "Sign Up", desc: "Create your account as a Buyer, Farmer, or Agent", time: "2 min" },
              { number: "02", title: "Verify", desc: "Complete KYC with your ID and contact info", time: "5 min" },
              { number: "03", title: "Setup Payment", desc: "Connect your MoMo wallet or bank account", time: "3 min" },
              { number: "04", title: "Start Trading", desc: "Browse, list, or coordinate immediately", time: "Ready!" },
            ].map((step, idx) => (
              <div key={idx} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg border-4 border-background mb-6 z-10 relative">
                    <span className="text-2xl font-black text-white">{step.number}</span>
                  </div>
                  <div className="bg-card rounded-xl p-6 border border-border">
                    <h3 className="font-bold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{step.desc}</p>
                    <span className="text-xs font-semibold text-primary">~{step.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              Real Impact from Real People
            </h2>
            <p className="text-muted-foreground text-lg">
              See how farmers and buyers are transforming agriculture with Harvest-In.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Kofi Mensah",
                role: "Tomato Farmer, Kumasi",
                image: farmerPortrait,
                quote: "I used to sell to middlemen for half price. Now I earn 90% directly. Harvest-In changed my business.",
                rating: 5
              },
              {
                name: "Ama Osei",
                role: "Restaurant Owner, Accra",
                image: leafyGreens,
                quote: "Fresh produce at fair prices is now possible. I support local farmers while guaranteeing quality.",
                rating: 5
              },
              {
                name: "Kwame Boateng",
                role: "Agent, Tema",
                image: produceBasket,
                quote: "I earn commissions coordinating shipments. The platform handles everything so I just connect people.",
                rating: 5
              },
            ].map((story, idx) => (
              <div key={idx} className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                <div className="aspect-video overflow-hidden bg-muted">
                  <img src={story.image} alt={story.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <div className="flex gap-1 mb-4">
                    {Array(story.rating).fill(0).map((_, i) => (
                      <span key={i} className="text-accent">⭐</span>
                    ))}
                  </div>
                  <p className="text-foreground mb-4 italic text-sm">"{story.quote}"</p>
                  <div>
                    <p className="font-bold text-foreground text-sm">{story.name}</p>
                    <p className="text-xs text-muted-foreground">{story.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-24 md:py-32 px-4 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            Ready to Transform Agriculture?
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
            Join thousands of farmers and buyers already growing together on Harvest-In.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="h-14 px-10 gap-3 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base shadow-lg"
              onClick={handleGoToMarketplace}
            >
              Start Shopping
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              size="lg"
              className="h-14 px-10 gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold text-base shadow-lg"
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

      {/* Partnership Form */}
      <section className="py-24 px-4 bg-muted/50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold shadow-sm mb-6">
              <Leaf className="w-4 h-4" />
              Partnership Inquiry
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              Grow Something Great Together
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Tell us about your goals and how we can support your agricultural journey.
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="bg-card rounded-2xl p-8 md:p-12 shadow-lg border border-border">
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
                  className="h-12"
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
                  className="h-12"
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
                  placeholder="Your farm or company"
                  value={formData.company}
                  onChange={handleFormChange}
                  required
                  className="h-12"
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
                  placeholder="+233 XXX XXXX"
                  value={formData.phone}
                  onChange={handleFormChange}
                  className="h-12"
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
                className="w-full h-12 px-4 rounded-lg border border-border bg-background text-foreground"
              >
                <option value="partnership">Strategic Partnership</option>
                <option value="farmer">Farmer Network</option>
                <option value="distribution">Distribution Partner</option>
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
                placeholder="Share your vision and how we can work together..."
                value={formData.message}
                onChange={handleFormChange}
                required
                className="min-h-32 resize-none"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base"
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
      <footer className="bg-foreground text-background py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h4 className="font-bold text-lg mb-4">Harvest-In</h4>
              <p className="text-sm text-background/80">Ghana's farm-to-table platform connecting farmers, buyers, and agents.</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-background/80">
                <li><Link to="/marketplace" className="hover:text-background transition-colors">Marketplace</Link></li>
                <li><Link to="/farmer" className="hover:text-background transition-colors">For Farmers</Link></li>
                <li><Link to="/agent" className="hover:text-background transition-colors">For Agents</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-background/80">
                <li><a href="#help" className="hover:text-background transition-colors">Help Center</a></li>
                <li><a href="#contact" className="hover:text-background transition-colors">Contact Us</a></li>
                <li><a href="#faq" className="hover:text-background transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-background/80">
                <li><a href="#twitter" className="hover:text-background transition-colors">Twitter</a></li>
                <li><a href="#facebook" className="hover:text-background transition-colors">Facebook</a></li>
                <li><a href="#instagram" className="hover:text-background transition-colors">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-background/20 pt-8 text-center text-sm text-background/70">
            <p>&copy; 2025 Harvest-In. All rights reserved. | <a href="#privacy" className="hover:text-background transition-colors">Privacy</a> | <a href="#terms" className="hover:text-background transition-colors">Terms</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
