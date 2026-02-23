import { Star } from "lucide-react";
import farmerTestimonial from "@/assets/farmer-testimonial.jpg";
import buyerTestimonial from "@/assets/buyer-testimonial.jpg";

const testimonials = [
  {
    quote: "Before Harvest-In, I would lose 30% of my tomatoes before finding a buyer. Now I sell everything within 24 hours and earn twice as much.",
    name: "Akua Mensah",
    role: "Tomato Farmer, Ashanti Region",
    image: farmerTestimonial,
    rating: 5,
  },
  {
    quote: "We source produce for 12 restaurants. Harvest-In cut our costs by 25% and we get fresher ingredients delivered the same day.",
    name: "Kwame Boateng",
    role: "Restaurant Supply Manager, Accra",
    image: buyerTestimonial,
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 px-4 warm-section">
      <div className="container mx-auto">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">Testimonials</p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Voices From the Field
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-card rounded-2xl p-8 border border-border shadow-sm">
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <blockquote className="text-foreground leading-relaxed mb-6">
                "{t.quote}"
              </blockquote>
              <div className="flex items-center gap-4">
                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <p className="font-bold text-foreground text-sm">{t.name}</p>
                  <p className="text-muted-foreground text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
