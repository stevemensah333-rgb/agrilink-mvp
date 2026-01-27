import { Check, Minus, Plus, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProduceImage } from "@/lib/produceImages";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  unit: string;
  quantity: number;
  category: string;
  location: string | null;
  image_url: string | null;
  agent_id: string;
}

interface MarketProductCardProps {
  product: Product;
  selectedQuantity: number;
  isSelected: boolean;
  onQuantityChange: (id: string, quantity: number) => void;
  onSelect: (id: string) => void;
}

const MarketProductCard = ({
  product, 
  selectedQuantity, 
  isSelected, 
  onQuantityChange, 
  onSelect 
}: MarketProductCardProps) => {
  const total = product.price * selectedQuantity;
  const maxQty = product.quantity;
  
  // Use stored image_url or auto-detect from name/category
  const productImage = product.image_url || getProduceImage(product.name, product.category);

  return (
    <div 
      className={`produce-card bg-card rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-200 ${
        isSelected 
          ? "border-primary ring-2 ring-primary/20" 
          : "border-transparent hover:border-border"
      }`}
      onClick={() => onSelect(product.id)}
    >
      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute top-3 right-3 z-10 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
          <Check className="w-4 h-4 text-primary-foreground" />
        </div>
      )}
      
      {/* Product Image */}
      <div className="relative aspect-[5/4] overflow-hidden bg-muted">
        <img
          src={productImage}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-2 left-2 px-2 py-1 bg-background/80 rounded-full text-xs font-medium">
          {product.category}
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-foreground">{product.name}</h3>
        {product.location && (
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {product.location}
          </p>
        )}
        {product.description && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
        )}
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-secondary">
            {product.price} GHS
            <span className="text-sm font-normal text-muted-foreground">/ {product.unit}</span>
          </span>
          <span className="text-xs text-muted-foreground">
            {product.quantity} available
          </span>
        </div>
        
        {/* Quantity Controls */}
        <div 
          className="flex items-center gap-3 mb-3"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="text-sm text-muted-foreground">Qty:</span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => onQuantityChange(product.id, Math.max(1, selectedQuantity - 5))}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="w-12 text-center font-medium">{selectedQuantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => onQuantityChange(product.id, Math.min(maxQty, selectedQuantity + 5))}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {/* Total */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <span className="font-bold text-foreground">
            {total.toFixed(2)} GHS
            <span className="text-sm font-normal text-muted-foreground ml-1">
              ({selectedQuantity} {product.unit}s)
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default MarketProductCard;
