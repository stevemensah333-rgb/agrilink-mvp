import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import type { Database } from "@/integrations/supabase/types";

type UserRole = Database["public"]["Enums"]["user_role"];

export const useUserRole = () => {
  const { user } = useAuth();
  const [role, setRole] = useState<UserRole | null>(null);
  const [profile, setProfile] = useState<{
    full_name: string;
    location: string | null;
    momo_number: string | null;
    phone: string | null;
    agrilink_id: string | null;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      if (!user) {
        setRole(null);
        setProfile(null);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("role, full_name, location, momo_number, phone, agrilink_id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (data) {
        setRole(data.role);
        setProfile({
          full_name: data.full_name,
          location: data.location,
          momo_number: data.momo_number,
          phone: data.phone,
          agrilink_id: data.agrilink_id,
        });
      }
      setLoading(false);
    };

    fetchRole();
  }, [user]);

  return { role, profile, loading };
};
