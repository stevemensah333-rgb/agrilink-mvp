import { Link } from "react-router-dom";
import { Sprout } from "lucide-react";

const LandingFooter = () => {
  return (
    <footer className="py-16 px-4 border-t border-border bg-card">
      <div className="container mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Sprout className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-extrabold text-xl text-foreground">Harvest-In</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Africa's leading digital agriculture marketplace, connecting farmers directly to customers.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-bold text-foreground text-sm mb-4">Platform</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li><Link to="/marketplace" className="hover:text-primary transition-colors">Marketplace</Link></li>
              <li><Link to="/auth" className="hover:text-primary transition-colors">Sell as Farmer</Link></li>
              <li><Link to="/auth" className="hover:text-primary transition-colors">Become an Agent</Link></li>
              <li><Link to="/ussd" className="hover:text-primary transition-colors">USSD Access</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-foreground text-sm mb-4">Company</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li><span className="hover:text-primary transition-colors cursor-pointer">About Us</span></li>
              <li><span className="hover:text-primary transition-colors cursor-pointer">Careers</span></li>
              <li><span className="hover:text-primary transition-colors cursor-pointer">Blog</span></li>
              <li><span className="hover:text-primary transition-colors cursor-pointer">Contact</span></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-foreground text-sm mb-4">Legal</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li><span className="hover:text-primary transition-colors cursor-pointer">Privacy Policy</span></li>
              <li><span className="hover:text-primary transition-colors cursor-pointer">Terms of Service</span></li>
              <li><span className="hover:text-primary transition-colors cursor-pointer">Cookie Policy</span></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © 2026 Harvest-In. Connecting Africa's Agricultural Network.
          </p>
          <div className="flex items-center gap-4 text-muted-foreground text-xs">
            <span>🇬🇭 Made in Ghana</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
