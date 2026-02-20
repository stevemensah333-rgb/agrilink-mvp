import { useState } from "react";
import { Leaf, Truck, Building2, ArrowRight, Loader2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface SelectedProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
  unit: string;
  agent_id: string;
}

interface BuyerOrderSummaryProps {
  selectedProducts: SelectedProduct[];
  quantities: Record<string, number>;
  transportMode: string;
  transportCost: number;
  serviceFee: number;
  onOrderPlaced: () => void;
}

const BuyerOrderSummary = ({ 
  selectedProducts, 
  quantities, 
  transportMode, 
  transportCost, 
  serviceFee,
  onOrderPlaced 
}: BuyerOrderSummaryProps) => {
  const [loading, setLoading] = useState(false);
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [notes, setNotes] = useState("");
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const produceTotal = selectedProducts.reduce(
    (sum, product) => sum + product.price * quantities[product.id],
    0
  );
  const total = produceTotal + transportCost + serviceFee;

  const handlePlaceOrder = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to place an order.",
        variant: "destructive",
      });
      navigate("/auth", { state: { role: "buyer", redirectTo: "/marketplace" } });
      return;
    }

    if (!deliveryLocation.trim()) {
      toast({
        title: "Delivery location required",
        description: "Please enter your delivery location.",
        variant: "destructive",
      });
      return;
    }

    if (selectedProducts.length === 0) {
      toast({
        title: "No products selected",
        description: "Please select at least one product.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Create orders for each selected product
      const orders = selectedProducts.map((product) => ({
        buyer_id: user.id,
        product_id: product.id,
        agent_id: product.agent_id,
        quantity: quantities[product.id],
        unit_price: product.price,
        total_price: product.price * quantities[product.id],
        transport_mode: transportMode,
        transport_cost: transportCost / selectedProducts.length, // Split transport cost
        service_fee: serviceFee / selectedProducts.length, // Split service fee
        delivery_location: deliveryLocation,
        notes: notes || null,
        status: "pending",
      }));

      const { error } = await supabase.from("orders").insert(orders);

      if (error) throw error;

      toast({
        title: "Order placed successfully!",
        description: "Your order is pending approval. You'll receive a notification with payment details once approved.",
      });

      onOrderPlaced();
      setDeliveryLocation("");
      setNotes("");
    } catch (error: any) {
      toast({
        title: "Error placing order",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="bg-card rounded-xl p-6 shadow-lg border border-border sticky top-24">
      <h3 className="text-xl font-bold text-foreground mb-6">Order Summary</h3>
      
      {/* Selected Products */}
      {selectedProducts.length > 0 && (
        <div className="mb-4 space-y-2">
          {selectedProducts.map((product) => (
            <div key={product.id} className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {product.name} × {quantities[product.id]}
              </span>
              <span className="font-medium">
                {(product.price * quantities[product.id]).toFixed(2)} GHS
              </span>
            </div>
          ))}
        </div>
      )}
      
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
          <span className="font-bold text-foreground">{produceTotal.toFixed(2)} GHS</span>
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
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-medium text-foreground">Total</span>
          <span className="text-2xl font-bold text-secondary">{total.toFixed(2)} GHS</span>
        </div>

        {/* Delivery Location */}
        <div className="space-y-3 mb-4">
          <div>
            <Label htmlFor="location" className="flex items-center gap-1 mb-1">
              <MapPin className="w-3 h-3" />
              Delivery Location
            </Label>
            <Input
              id="location"
              placeholder="e.g., Accra Mall, East Legon"
              value={deliveryLocation}
              onChange={(e) => setDeliveryLocation(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea
              id="notes"
              placeholder="Any special instructions..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="h-20"
            />
          </div>
        </div>
        
        <Button 
          className="w-full h-12 gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
          onClick={handlePlaceOrder}
          disabled={loading || selectedProducts.length === 0}
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              Place Order
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
        
        <p className="text-xs text-center text-muted-foreground mt-3">
          Once approved, you'll be notified to send payment to 0533346350 (MTN)
        </p>
      </div>
    </div>
  );
};

export default BuyerOrderSummary;
