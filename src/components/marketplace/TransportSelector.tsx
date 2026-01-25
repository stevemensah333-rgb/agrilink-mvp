import { Bike, Car, Truck } from "lucide-react";

interface TransportOption {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: "bike" | "tricycle" | "car" | "truck";
  recommended?: boolean;
}

interface TransportSelectorProps {
  options: TransportOption[];
  selectedId: string;
  onSelect: (id: string) => void;
}

const iconMap = {
  bike: Bike,
  tricycle: Bike,
  car: Car,
  truck: Truck,
};

const TransportSelector = ({ options, selectedId, onSelect }: TransportSelectorProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {options.map((option) => {
        const Icon = iconMap[option.icon];
        const isSelected = selectedId === option.id;
        
        return (
          <div
            key={option.id}
            onClick={() => onSelect(option.id)}
            className={`relative p-4 rounded-xl cursor-pointer transition-all duration-200 border-2 ${
              isSelected
                ? "bg-primary/5 border-primary"
                : "bg-card border-border hover:border-primary/50"
            }`}
          >
            {option.recommended && (
              <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-secondary text-secondary-foreground text-xs font-medium rounded-full">
                Recommended
              </span>
            )}
            
            <div className="flex flex-col items-center text-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                isSelected ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}>
                <Icon className="w-6 h-6" />
              </div>
              <h4 className="font-semibold text-foreground">{option.name}</h4>
              <p className="text-xs text-muted-foreground mt-1">{option.description}</p>
              <span className="text-lg font-bold text-secondary mt-2">{option.price} GHS</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TransportSelector;
