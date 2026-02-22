import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { passphrase } = await req.json();
    const adminPassphrase = Deno.env.get("ADMIN_PASSPHRASE");

    if (!passphrase || passphrase !== adminPassphrase) {
      return new Response(
        JSON.stringify({ error: "Invalid admin passphrase" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Find admin user
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("email, user_id")
      .eq("role", "admin")
      .limit(1)
      .single();

    if (profileError || !profile) {
      return new Response(
        JSON.stringify({ error: "No admin account found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Generate magic link for admin
    const { data: linkData, error: linkError } = await supabase.auth.admin.generateLink({
      type: "magiclink",
      email: profile.email,
    });

    if (linkError || !linkData) {
      return new Response(
        JSON.stringify({ error: "Failed to generate auth link" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        token_hash: linkData.properties.hashed_token,
        email: profile.email,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
