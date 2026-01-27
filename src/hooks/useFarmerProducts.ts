import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Product {
  id: string;
  agent_id: string;
  name: string;
  description: string | null;
  price: number;
  quantity: number;
  unit: string;
  category: string;
  location: string | null;
  image_url: string | null;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

export const useFarmerProducts = (farmerId: string | undefined) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    if (!farmerId) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("agent_id", farmerId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching farmer products:", error);
    } finally {
      setLoading(false);
    }
  }, [farmerId]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const toggleAvailability = async (productId: string, isAvailable: boolean) => {
    try {
      const { error } = await supabase
        .from("products")
        .update({ is_available: !isAvailable })
        .eq("id", productId);

      if (error) throw error;
      await fetchProducts();
      return true;
    } catch (error) {
      console.error("Error toggling availability:", error);
      return false;
    }
  };

  const deleteProduct = async (productId: string) => {
    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", productId);

      if (error) throw error;
      await fetchProducts();
      return true;
    } catch (error) {
      console.error("Error deleting product:", error);
      return false;
    }
  };

  return { products, loading, refetch: fetchProducts, toggleAvailability, deleteProduct };
};
