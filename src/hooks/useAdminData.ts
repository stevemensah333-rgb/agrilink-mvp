import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Order {
  id: string;
  buyer_id: string;
  product_id: string | null;
  agent_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  transport_mode: string;
  transport_cost: number;
  service_fee: number;
  status: string;
  delivery_location: string | null;
  notes: string | null;
  cancelled_reason: string | null;
  created_at: string;
  updated_at: string;
  products: {
    name: string;
    unit: string;
  } | null;
}

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
}

interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  phone: string | null;
  location: string | null;
  role: "buyer" | "agent" | "admin" | "farmer";
  created_at: string;
}

interface AdminStats {
  totalOrders: number;
  totalRevenue: number;
  totalUsers: number;
  totalProducts: number;
  pendingOrders: number;
  confirmedOrders: number;
  deliveredOrders: number;
}

export const useAdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select(`
          *,
          products (
            name,
            unit
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();

    const channel = supabase
      .channel("admin-orders")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders" },
        () => fetchOrders()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchOrders]);

  return { orders, loading, refetch: fetchOrders };
};

export const useAdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();

    const channel = supabase
      .channel("admin-products")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "products" },
        () => fetchProducts()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchProducts]);

  return { products, loading, refetch: fetchProducts };
};

export const useAdminUsers = () => {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();

    const channel = supabase
      .channel("admin-users")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "profiles" },
        () => fetchUsers()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchUsers]);

  return { users, loading, refetch: fetchUsers };
};

export const useAdminStats = () => {
  const [stats, setStats] = useState<AdminStats>({
    totalOrders: 0,
    totalRevenue: 0,
    totalUsers: 0,
    totalProducts: 0,
    pendingOrders: 0,
    confirmedOrders: 0,
    deliveredOrders: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    try {
      // Fetch orders
      const { data: orders } = await supabase.from("orders").select("*");
      
      // Fetch users
      const { data: users } = await supabase.from("profiles").select("id");
      
      // Fetch products
      const { data: products } = await supabase.from("products").select("id");

      const ordersData = orders || [];
      const totalRevenue = ordersData.reduce(
        (sum, order) => sum + Number(order.total_price) + Number(order.transport_cost) + Number(order.service_fee),
        0
      );

      setStats({
        totalOrders: ordersData.length,
        totalRevenue,
        totalUsers: users?.length || 0,
        totalProducts: products?.length || 0,
        pendingOrders: ordersData.filter((o) => o.status === "pending").length,
        confirmedOrders: ordersData.filter((o) => o.status === "confirmed").length,
        deliveredOrders: ordersData.filter((o) => o.status === "delivered").length,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, loading, refetch: fetchStats };
};

interface Payment {
  id: string;
  order_id: string;
  farmer_amount: number;
  farmer_momo: string;
  transport_amount: number;
  platform_fee: number;
  status: string;
  created_at: string;
  processed_at: string | null;
}

export const useAdminPayments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPayments = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("payments")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPayments(data || []);
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPayments();

    const channel = supabase
      .channel("admin-payments")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "payments" },
        () => fetchPayments()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchPayments]);

  return { payments, loading, refetch: fetchPayments };
};
