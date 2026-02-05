import { useState, useEffect } from "react";
import Header from "@/components/marketplace/Header";
import HeroSection from "@/components/marketplace/HeroSection";
import CategoryFilter from "@/components/marketplace/CategoryFilter";
import MarketProductCard from "@/components/marketplace/MarketProductCard";
import TransportSelector from "@/components/marketplace/TransportSelector";
import BuyerOrderSummary from "@/components/marketplace/BuyerOrderSummary";
import AuthGuard from "@/components/AuthGuard";
import RoleGuard from "@/components/RoleGuard";
import { useAvailableProducts } from "@/hooks/useProducts";
import { Loader2 } from "lucide-react";

const transportOptions = [
  {
    id: "bike",
    name: "Motorbike",
    description: "Express delivery, small loads",
    price: 20,
    icon: "bike" as const,
  },
  {
    id: "tricycle",
    name: "Tricycle",
    description: "Best for yams and medium loads",
    price: 30,
    icon: "tricycle" as const,
    recommended: true,
  },
  {
    id: "car",
    name: "Small Car",
    description: "Secure & climate controlled",
    price: 50,
    icon: "car" as const,
  },
  {
    id: "truck",
    name: "Small Truck",
    description: "Bulk orders & heavy loads",
    price: 80,
    icon: "truck" as const,
  },
];

const categories = ["All", "Vegetables", "Fruits", "Tubers", "Grains", "Legumes", "Spices"];

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [selectedTransport, setSelectedTransport] = useState("tricycle");

  const { products, loading, refetch } = useAvailableProducts();

  // Initialize quantities when products load
  useEffect(() => {
    const initialQuantities: Record<string, number> = {};
    products.forEach((product) => {
      if (!quantities[product.id]) {
        initialQuantities[product.id] = Math.min(5, product.quantity);
      }
    });
    if (Object.keys(initialQuantities).length > 0) {
      setQuantities((prev) => ({ ...prev, ...initialQuantities }));
    }
  }, [products]);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.location?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    return matchesCategory && matchesSearch;
  });

  const handleQuantityChange = (id: string, quantity: number) => {
    setQuantities((prev) => ({ ...prev, [id]: quantity }));
  };

  const handleProductSelect = (id: string) => {
    setSelectedProductIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const selectedProducts = products
    .filter((p) => selectedProductIds.includes(p.id))
    .map((p) => ({
      id: p.id,
      name: p.name,
      price: p.price,
      quantity: p.quantity,
      unit: p.unit,
      agent_id: p.agent_id,
    }));

  const transportCost = transportOptions.find((t) => t.id === selectedTransport)?.price || 0;
  const serviceFee = 10;

  const handleOrderPlaced = () => {
    setSelectedProductIds([]);
    refetch();
  };

  return (
    <AuthGuard role="buyer" redirectTo="/marketplace">
      <RoleGuard allowedRoles={["buyer"]}>
        <div className="min-h-screen bg-background">
        <Header />
        <HeroSection searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        <main className="container mx-auto px-4 py-8">
          {/* Category Filter */}
          <div className="mb-8">
            <CategoryFilter
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Products Section */}
            <div className="lg:col-span-2 space-y-8">
              {/* Step 1: Select Produce */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    1
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Select Produce & Quantity</h2>
                  <span className="ml-auto text-sm text-muted-foreground">
                    {filteredProducts.length} items available
                  </span>
                </div>

                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                ) : filteredProducts.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    No products available. Check back soon!
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-6">
                    {filteredProducts.map((product) => (
                      <MarketProductCard
                        key={product.id}
                        product={product}
                        selectedQuantity={quantities[product.id] || 1}
                        isSelected={selectedProductIds.includes(product.id)}
                        onQuantityChange={handleQuantityChange}
                        onSelect={handleProductSelect}
                      />
                    ))}
                  </div>
                )}
              </section>

              {/* Step 2: Select Transport */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    2
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Select Transport Mode</h2>
                </div>
                <p className="text-muted-foreground mb-6">
                  How should we bring it to you?
                </p>

                <TransportSelector
                  options={transportOptions}
                  selectedId={selectedTransport}
                  onSelect={setSelectedTransport}
                />
              </section>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <BuyerOrderSummary
                selectedProducts={selectedProducts}
                quantities={quantities}
                transportMode={selectedTransport}
                transportCost={transportCost}
                serviceFee={serviceFee}
                onOrderPlaced={handleOrderPlaced}
              />
            </div>
          </div>
        </main>
        </div>
      </RoleGuard>
    </AuthGuard>
  );
};

export default Marketplace;
