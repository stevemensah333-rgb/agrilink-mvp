import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import LandingHero from "@/components/landing/LandingHero";
import HowItWorks from "@/components/landing/HowItWorks";
import FeaturedProduce from "@/components/landing/FeaturedProduce";
import BenefitsFarmers from "@/components/landing/BenefitsFarmers";
import BenefitsBuyers from "@/components/landing/BenefitsBuyers";
import ImpactMetrics from "@/components/landing/ImpactMetrics";
import Testimonials from "@/components/landing/Testimonials";
import DownloadBanner from "@/components/landing/DownloadBanner";
import FAQ from "@/components/landing/FAQ";
import Newsletter from "@/components/landing/Newsletter";
import LandingFooter from "@/components/landing/LandingFooter";

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

  const handleGetStarted = () => {
    if (user) navigate("/marketplace");
    else navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <LandingHero onShopProduce={handleGoToMarketplace} onSellHarvest={handleJoinAsFarmer} />
      <HowItWorks />
      <FeaturedProduce onViewMarketplace={handleGoToMarketplace} />
      <BenefitsFarmers />
      <BenefitsBuyers />
      <ImpactMetrics />
      <Testimonials />
      <DownloadBanner onGetStarted={handleGetStarted} />
      <FAQ />
      <Newsletter />
      <LandingFooter />
    </div>
  );
};

export default Index;
