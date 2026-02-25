// Mapping of produce names/keywords to local images
const cassava = "/cassava.jpg";
const leafyGreens = "/leafy-greens.jpg";
const maize = "/maize.jpg";
const peppers = "/peppers.jpg";
const plantain = "/plantain.jpg";
const produceBasket = "/produce-basket.jpg";
const tomatoes = "/tomatoes.jpg";
const yams = "/yams.jpg";

// Keyword-based image matching
const produceKeywords: Record<string, string> = {
  // Tubers
  cassava: cassava,
  yam: yams,
  yams: yams,
  plantain: plantain,
  plantains: plantain,
  
  // Vegetables
  tomato: tomatoes,
  tomatoes: tomatoes,
  pepper: peppers,
  peppers: peppers,
  chili: peppers,
  chilli: peppers,
  lettuce: leafyGreens,
  spinach: leafyGreens,
  cabbage: leafyGreens,
  kale: leafyGreens,
  greens: leafyGreens,
  vegetable: leafyGreens,
  vegetables: leafyGreens,
  
  // Grains
  maize: maize,
  corn: maize,
  
  // Default
  default: produceBasket,
};

// Category-based fallback images
const categoryImages: Record<string, string> = {
  Vegetables: leafyGreens,
  Fruits: produceBasket,
  Tubers: yams,
  Grains: maize,
  Legumes: produceBasket,
  Spices: peppers,
};

/**
 * Get the appropriate image for a produce item based on its name and category
 */
export const getProduceImage = (name: string, category: string): string => {
  const lowerName = name.toLowerCase();
  
  // First, try to match by keywords in the name
  for (const [keyword, image] of Object.entries(produceKeywords)) {
    if (lowerName.includes(keyword)) {
      return image;
    }
  }
  
  // Fall back to category-based image
  if (categoryImages[category]) {
    return categoryImages[category];
  }
  
  // Default fallback
  return produceBasket;
};

// Export individual images for direct use
export {
  cassava,
  leafyGreens,
  maize,
  peppers,
  plantain,
  produceBasket,
  tomatoes,
  yams,
};

// Export category images for dropdown selection
export const availableProduceImages = [
  { name: "Tomatoes", image: tomatoes },
  { name: "Peppers", image: peppers },
  { name: "Leafy Greens", image: leafyGreens },
  { name: "Cassava", image: cassava },
  { name: "Yams", image: yams },
  { name: "Plantain", image: plantain },
  { name: "Maize/Corn", image: maize },
  { name: "Mixed Produce", image: produceBasket },
];
