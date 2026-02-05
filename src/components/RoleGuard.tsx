import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useUserRole } from "@/hooks/useUserRole";
import Header from "@/components/marketplace/Header";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: ("buyer" | "farmer" | "agent" | "admin")[];
  redirectTo?: string;
}

const roleRedirects: Record<string, string> = {
  buyer: "/marketplace",
  farmer: "/farmer",
  agent: "/agent",
  admin: "/admin",
};

const RoleGuard = ({ children, allowedRoles, redirectTo }: RoleGuardProps) => {
  const { user, loading: authLoading } = useAuth();
  const { role, loading: roleLoading } = useUserRole();
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (authLoading || roleLoading) return;

    if (!user) {
      // Not logged in - let AuthGuard handle this
      setChecked(true);
      return;
    }

    if (role && !allowedRoles.includes(role)) {
      // User has wrong role - redirect to their dashboard
      const correctRoute = redirectTo || roleRedirects[role] || "/";
      navigate(correctRoute, { replace: true });
    } else {
      setChecked(true);
    }
  }, [user, role, authLoading, roleLoading, allowedRoles, navigate, redirectTo]);

  if (authLoading || roleLoading || (!checked && user)) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-32">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default RoleGuard;
