import { Leaf, Truck, Building2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OrderSummaryProps {
  produceTotal: number;
  transportCost: number;
  serviceFee: number;
}

const OrderSummary = ({ produceTotal, transportCost, serviceFee }: OrderSummaryProps) => {
  const total = produceTotal + transportCost + serviceFee;
  
  return (
    <div className="bg-card rounded-xl p-6 shadow-lg border border-border sticky top-24">
      <h3 className="text-xl font-bold text-foreground mb-6">Order Summary</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">Produce</p>
              <p className="text-xs text-muted-foreground">Goes to Farmer</p>
            </div>
          </div>
          <span className="font-bold text-foreground">{produceTotal} GHS</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
              <Truck className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <p className="font-medium text-foreground">Transport</p>
              <p className="text-xs text-muted-foreground">Goes to Driver</p>
            </div>
          </div>
          <span className="font-bold text-foreground">{transportCost} GHS</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <Building2 className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium text-foreground">Service Fee</p>
              <p className="text-xs text-muted-foreground">Platform</p>
            </div>
          </div>
          <span className="font-bold text-foreground">{serviceFee} GHS</span>
        </div>
      </div>
      
      <div className="border-t border-border mt-6 pt-4">
        <div className="flex items-center justify-between mb-6">
          <span className="text-lg font-medium text-foreground">Total</span>
          <span className="text-2xl font-bold text-secondary">{total} GHS</span>
        </div>
        
        <Button className="w-full h-12 gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
          Confirm & Notify Agent
          <ArrowRight className="w-4 h-4" />
        </Button>
        
        <p className="text-xs text-center text-muted-foreground mt-3">
          Your agent will contact the farmer within 5 minutes
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;
