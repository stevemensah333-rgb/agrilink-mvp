import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

// Import images
import farmerHero from "@/assets/farmer-hero.jpg";
import produceBasket from "@/assets/produce-basket.jpg";
import leafyGreens from "@/assets/leafy-greens.jpg";
import farmerPortrait from "@/assets/farmer-portrait.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 px-4 overflow-hidden">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="animate-fade-in">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                Connecting Ghana's Agricultural Network
              </span>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                Bridge the Gap Between{" "}
                <span className="text-secondary">Farmers & Buyers</span>
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                Direct connections. Fair prices. Transparent logistics. Whether you have internet or not, Agri-Bridge connects you to Ghana's agricultural marketplace.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link to="/marketplace">
                  <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-6">
                    Start Buying
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/agent">
                  <Button size="lg" variant="outline" className="h-12 px-6 border-primary text-primary hover:bg-primary/5">
                    Join as Agent
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Right Content - Hero Image */}
            <div className="relative animate-scale-in">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={farmerHero} 
                  alt="Farmer tending to crops at golden hour"
                  className="w-full h-[400px] md:h-[500px] object-cover"
                />
                
                {/* Floating Card */}
                <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-auto bg-card/95 backdrop-blur-sm rounded-xl p-4 shadow-lg flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img 
                      src={produceBasket} 
                      alt="Fresh produce"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Fresh Daily</p>
                    <p className="text-sm text-muted-foreground">500+ Farms</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 md:py-24 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How Agri-Bridge Works
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A complete ecosystem connecting farmers, buyers, agents, and transporters
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* For Buyers */}
            <div className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={leafyGreens} 
                  alt="Fresh leafy greens"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg text-foreground mb-2">For Buyers</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Browse produce, select transport, and connect directly with farmers. Transparent pricing at every step.
                </p>
                <Link to="/marketplace" className="text-primary font-medium text-sm hover:underline">
                  Start Shopping →
                </Link>
              </div>
            </div>
            
            {/* For Agents */}
            <div className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={produceBasket} 
                  alt="Fresh produce basket"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg text-foreground mb-2">For Agents</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Coordinate orders, manage logistics, and earn commission by connecting buyers with farmers.
                </p>
                <Link to="/agent" className="text-primary font-medium text-sm hover:underline">
                  Agent Dashboard →
                </Link>
              </div>
            </div>
            
            {/* For Admins */}
            <div className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={farmerPortrait} 
                  alt="Happy farmer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg text-foreground mb-2">For Admins</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Optimize logistics, pool orders, and track payments. Smart routing saves money for everyone.
                </p>
                <Link to="/admin" className="text-primary font-medium text-sm hover:underline">
                  Admin Panel →
                </Link>
              </div>
            </div>
            
            {/* USSD Access */}
            <div className="bg-primary rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="p-6 h-full flex flex-col justify-center">
                <div className="w-16 h-16 rounded-full bg-primary-foreground/20 flex items-center justify-center mb-6">
                  <Phone className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="font-bold text-lg text-primary-foreground mb-2">USSD Access</h3>
                <p className="text-sm text-primary-foreground/80 mb-4">
                  No internet? No problem. Dial our USSD code to access the full marketplace from any phone.
                </p>
                <Link to="/ussd" className="text-primary-foreground font-medium text-sm hover:underline">
                  See USSD Demo →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 md:py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl md:text-5xl font-bold text-secondary mb-2">500+</p>
              <p className="text-muted-foreground">Partner Farms</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-secondary mb-2">10K+</p>
              <p className="text-muted-foreground">Active Buyers</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-secondary mb-2">50+</p>
              <p className="text-muted-foreground">Agents</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-secondary mb-2">24/7</p>
              <p className="text-muted-foreground">USSD Access</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-20 px-4 hero-section">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Transform Agricultural Trade?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of farmers and buyers already using Agri-Bridge to connect, trade, and grow together.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/marketplace">
              <Button size="lg" className="gap-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground h-12 px-8">
                Get Started Now
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground text-sm">
            © 2026 Agri-Bridge. Connecting Ghana's Agricultural Network.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
