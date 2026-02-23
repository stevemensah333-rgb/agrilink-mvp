import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Thanks for subscribing! We'll keep you posted.");
      setEmail("");
    }
  };

  return (
    <section className="py-24 px-4 warm-section">
      <div className="container mx-auto max-w-2xl text-center">
        <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">Stay Updated</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Get the Latest From Harvest-In
        </h2>
        <p className="text-muted-foreground text-lg mb-8">
          Weekly market insights, farmer success stories, and platform updates.
        </p>
        <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 bg-card"
            required
          />
          <Button type="submit" className="h-12 px-6 gap-2 bg-primary text-primary-foreground font-semibold">
            Subscribe
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
