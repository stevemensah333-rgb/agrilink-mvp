import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How do farmers sign up?",
    a: "Simply create an account, choose 'Farmer' as your role, and start listing your produce. It's completely free — you can even use our USSD code to access the platform without internet.",
  },
  {
    q: "What payment methods are supported?",
    a: "We support Mobile Money (MTN, Vodafone, AirtelTigo), bank transfers, and card payments. Farmers receive payments directly to their MoMo wallets within 24 hours.",
  },
  {
    q: "How does delivery work?",
    a: "Choose from multiple transport options — motorbike, tricycle, van, or truck — based on your order size. Our logistics agents handle pickup from the farm and delivery to your location.",
  },
  {
    q: "Is there a minimum order for businesses?",
    a: "No minimum orders required, but we offer discounted bulk pricing for businesses ordering regularly. Contact our team for custom supply agreements.",
  },
  {
    q: "Which regions do you cover?",
    a: "We currently operate across 15 regions in Ghana with plans to expand to neighbouring countries. Check the marketplace for available produce in your area.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-16">
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">FAQ</p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-card rounded-xl border border-border overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-5 text-left"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="font-semibold text-foreground pr-4">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-200 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === i && (
                <div className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed animate-fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
