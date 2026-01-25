import { useState } from "react";
import Header from "@/components/marketplace/Header";
import HeroSection from "@/components/marketplace/HeroSection";
import CategoryFilter from "@/components/marketplace/CategoryFilter";
import ProductCard from "@/components/marketplace/ProductCard";
import TransportSelector from "@/components/marketplace/TransportSelector";
import OrderSummary from "@/components/marketplace/OrderSummary";

// Import real crop images
import yamsImage from "@/assets/yams.jpg";
import tomatoesImage from "@/assets/tomatoes.jpg";
import peppersImage from "@/assets/peppers.jpg";
import plantainImage from "@/assets/plantain.jpg";
import cassavaImage from "@/assets/cassava.jpg";
import maizeImage from "@/assets/maize.jpg";

const products = [
  {
    id: "1",
    name: "Yam Tubers",
    farmer: "Opoku",
    description: "Premium Grade A",
    price: 10,
    unit: "tuber",
    image: yamsImage,
    category: "Tubers",
  },
  {
    id: "2",
    name: "Fresh Tomatoes",
    farmer: "Adwoa",
    description: "Fresh Harvest",
    price: 3,
    unit: "kg",
    image: tomatoesImage,
    category: "Vegetables",
  },
  {
    id: "3",
    name: "Mixed Peppers",
    farmer: "Kwame",
    description: "Hot & Sweet Varieties",
    price: 4,
    unit: "kg",
    image: peppersImage,
    category: "Vegetables",
  },
  {
    id: "4",
    name: "Fresh Plantain",
    farmer: "Ama",
    description: "Ripe & Green Mix",
    price: 15,
    unit: "bunch",
    image: plantainImage,
    category: "Fruits",
  },
  {
    id: "5",
    name: "Cassava Roots",
    farmer: "Kofi",
    description: "Fresh from farm",
    price: 8,
    unit: "kg",
    image: cassavaImage,
    category: "Tubers",
  },
  {
    id: "6",
    name: "Dried Maize",
    farmer: "Yaa",
    description: "Clean & Dry",
    price: 6,
    unit: "kg",
    image: maizeImage,
    category: "Grains",
  },
];

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

const categories = ["All", "Vegetables", "Fruits", "Tubers", "Grains"];

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProducts, setSelectedProducts] = useState<string[]>(["1"]);
  const [quantities, setQuantities] = useState<Record<string, number>>({
    "1": 50,
    "2": 100,
    "3": 50,
    "4": 30,
    "5": 20,
    "6": 50,
  });
  const [selectedTransport, setSelectedTransport] = useState("tricycle");

  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.farmer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleQuantityChange = (id: string, quantity: number) => {
    setQuantities((prev) => ({ ...prev, [id]: quantity }));
  };

  const handleProductSelect = (id: string) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const produceTotal = selectedProducts.reduce((total, id) => {
    const product = products.find((p) => p.id === id);
    return total + (product ? product.price * quantities[id] : 0);
  }, 0);

  const transportCost = transportOptions.find((t) => t.id === selectedTransport)?.price || 0;
  const serviceFee = 10;

  return (
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
                  {filteredProducts.length} items found
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    quantity={quantities[product.id]}
                    isSelected={selectedProducts.includes(product.id)}
                    onQuantityChange={handleQuantityChange}
                    onSelect={handleProductSelect}
                  />
                ))}
              </div>
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
            <OrderSummary
              produceTotal={produceTotal}
              transportCost={transportCost}
              serviceFee={serviceFee}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Marketplace;
