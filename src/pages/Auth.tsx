import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ArrowRight, Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";

type UserRole = "buyer" | "agent" | "farmer" | "admin";

interface RoleFieldConfig {
  fields: string[];
  title: string;
  description: string;
}

const roleConfig: Record<UserRole, RoleFieldConfig> = {
  buyer: {
    fields: ["fullName", "email", "location", "password"],
    title: "Buyer",
    description: "Shop for fresh farm produce",
  },
  farmer: {
    fields: ["fullName", "location", "momoNumber", "phone", "email", "password"],
    title: "Farmer",
    description: "Sell your produce directly",
  },
  agent: {
    fields: ["fullName", "agrilinkId", "email", "password"],
    title: "Agent",
    description: "Connect farmers and buyers",
  },
  admin: {
    fields: ["agrilinkId", "email", "password"],
    title: "Admin",
    description: "Manage the platform",
  },
};

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [location, setLocation] = useState("");
  const [momoNumber, setMomoNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [agrilinkId, setAgrilinkId] = useState("");
  const [loading, setLoading] = useState(false);
  const [idValidating, setIdValidating] = useState(false);
  const [idValid, setIdValid] = useState<boolean | null>(null);
  const [idError, setIdError] = useState("");
  
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const locationState = useLocation();

  const role = (locationState.state as { role?: UserRole })?.role || "buyer";
  const redirectTo = (locationState.state as { redirectTo?: string })?.redirectTo || "/";
  const config = roleConfig[role];

  // Validate AgriLink ID for agents and admins
  useEffect(() => {
    if (!agrilinkId || isLogin) {
      setIdValid(null);
      setIdError("");
      return;
    }

    const validateId = async () => {
      setIdValidating(true);
      setIdError("");
      
      const expectedType = role === "admin" ? "admin" : "agent";
      
      const { data, error } = await supabase
        .from("agrilink_ids")
        .select("*")
        .eq("agrilink_id", agrilinkId.toUpperCase())
        .eq("id_type", expectedType)
        .maybeSingle();

      if (error) {
        setIdValid(false);
        setIdError("Error validating ID");
      } else if (!data) {
        setIdValid(false);
        setIdError(`Invalid ${role} ID. Please contact Harvest-In support.`);
      } else if (data.is_used) {
        setIdValid(false);
        setIdError("This ID has already been used");
      } else {
        setIdValid(true);
      }
      
      setIdValidating(false);
    };

    const debounce = setTimeout(validateId, 500);
    return () => clearTimeout(debounce);
  }, [agrilinkId, role, isLogin]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await signIn(email, password);
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
        });
      } else {
        // Validate required fields based on role
        if ((role === "agent" || role === "admin") && !idValid) {
          throw new Error("Please enter a valid AgriLink ID");
        }

        // Sign up with role-specific metadata
        const metadata: Record<string, string> = {
          full_name: fullName || "User",
          role: role,
        };

        if (location) metadata.location = location;
        if (momoNumber) metadata.momo_number = momoNumber;
        if (phone) metadata.phone = phone;
        if (agrilinkId) metadata.agrilink_id = agrilinkId.toUpperCase();

        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: metadata,
          },
        });

        if (error) throw error;

        // AgriLink ID is marked as used automatically by the database trigger

        toast({
          title: "Account created!",
          description: "Welcome to Harvest-In. Please check your email to verify your account.",
        });
      }
      navigate(redirectTo);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const needsAgrilinkId = !isLogin && (role === "agent" || role === "admin");
  const canSubmit = isLogin || !needsAgrilinkId || idValid;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="bg-card rounded-2xl shadow-xl p-8 border border-border">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-foreground mb-2">
                {isLogin ? "Welcome Back" : `Join as ${config.title}`}
              </h1>
              <p className="text-muted-foreground">
                {isLogin
                  ? "Sign in to continue to Harvest-In"
                  : config.description}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name - for non-admin signup */}
              {!isLogin && config.fields.includes("fullName") && (
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                    className="mt-1"
                  />
                </div>
              )}

              {/* AgriLink ID - for agents and admins */}
              {needsAgrilinkId && (
                <div>
                  <Label htmlFor="agrilinkId">
                    Harvest-In {role === "admin" ? "Admin" : "Agent"} ID
                  </Label>
                  <div className="relative mt-1">
                    <Input
                      id="agrilinkId"
                      type="text"
                      value={agrilinkId}
                      onChange={(e) => setAgrilinkId(e.target.value)}
                      placeholder={role === "admin" ? "ADM-XXX" : "AGT-XXX"}
                      required
                    className={`pr-10 ${
                        idValid === true ? "border-primary" : 
                        idValid === false ? "border-destructive" : ""
                      }`}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {idValidating && <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />}
                      {!idValidating && idValid === true && <CheckCircle className="w-4 h-4 text-primary" />}
                      {!idValidating && idValid === false && <AlertCircle className="w-4 h-4 text-destructive" />}
                    </div>
                  </div>
                  {idError && (
                    <p className="text-sm text-destructive mt-1">{idError}</p>
                  )}
                </div>
              )}

              {/* Location - for farmers and buyers */}
              {!isLogin && config.fields.includes("location") && (
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., Kumasi, Ashanti Region"
                    required
                    className="mt-1"
                  />
                </div>
              )}

              {/* MoMo Number - for farmers */}
              {!isLogin && config.fields.includes("momoNumber") && (
                <div>
                  <Label htmlFor="momoNumber">Mobile Money Number</Label>
                  <Input
                    id="momoNumber"
                    type="tel"
                    value={momoNumber}
                    onChange={(e) => setMomoNumber(e.target.value)}
                    placeholder="024XXXXXXX"
                    required
                    className="mt-1"
                  />
                </div>
              )}

              {/* Phone - for farmers */}
              {!isLogin && config.fields.includes("phone") && (
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="024XXXXXXX"
                    required
                    className="mt-1"
                  />
                </div>
              )}

              {/* Email - always shown */}
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="mt-1"
                />
              </div>

              {/* Password - always shown */}
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  minLength={6}
                  className="mt-1"
                />
              </div>

              <Button
                type="submit"
                className="w-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={loading || (!isLogin && !canSubmit)}
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    {isLogin ? "Sign In" : "Create Account"}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-1 text-primary hover:underline font-medium"
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </p>
            </div>

            <div className="mt-4 text-center">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
                ← Back to home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
