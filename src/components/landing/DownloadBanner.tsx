import { ArrowRight, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DownloadBannerProps {
  onGetStarted: () => void;
}

const DownloadBanner = ({ onGetStarted }: DownloadBannerProps) => {
  return (
    <section className="relative overflow-hidden">
      <div className="hero-section absolute inset-0" />
      <div className="relative py-24 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground">
                Ready to Transform How You Trade?
              </h2>
              <p className="text-primary-foreground/80 text-lg max-w-lg leading-relaxed">
                Join thousands of farmers and buyers already growing together. Start selling or shopping in minutes.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Button
                  size="lg"
                  className="h-14 px-8 gap-3 bg-accent text-accent-foreground hover:bg-accent/90 font-bold shadow-xl"
                  onClick={onGetStarted}
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="w-64 h-64 rounded-3xl bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center border border-primary-foreground/20">
                <Smartphone className="w-24 h-24 text-primary-foreground/50" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadBanner;
