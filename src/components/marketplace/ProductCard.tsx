import { Check, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  name: string;
  farmer: string;
  description: string;
  price: number;
  unit: string;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
  quantity: number;
  isSelected: boolean;
  onQuantityChange: (id: string, quantity: number) => void;
  onSelect: (id: string) => void;
}

const ProductCard = ({ 
  product, 
  quantity, 
  isSelected, 
  onQuantityChange, 
  onSelect 
}: ProductCardProps) => {
  const total = product.price * quantity;

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
      <div className="relative aspect-[5/4] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-foreground">{product.name}</h3>
        <p className="text-sm text-muted-foreground">Farmer: {product.farmer}</p>
        <p className="text-sm text-muted-foreground mb-3">{product.description}</p>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-secondary">
            {product.price} GHS
            <span className="text-sm font-normal text-muted-foreground">/ {product.unit}</span>
          </span>
        </div>
        
        {/* Quantity Controls */}
        <div 
          className="flex items-center gap-3 mb-3"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="text-sm text-muted-foreground">Quantity:</span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => onQuantityChange(product.id, Math.max(1, quantity - 10))}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="w-12 text-center font-medium">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => onQuantityChange(product.id, quantity + 10)}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {/* Total */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <span className="font-bold text-foreground">
            {total} GHS
            <span className="text-sm font-normal text-muted-foreground ml-1">
              ({quantity} {product.unit}s)
            </span>
          </span>
          <span className="text-xs text-primary font-medium">Direct to Farmer</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
