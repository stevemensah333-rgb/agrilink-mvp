import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
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

    // Find existing admin user
    let { data: profile } = await supabase
      .from("profiles")
      .select("email, user_id")
      .eq("role", "admin")
      .limit(1)
      .single();

    // If no admin exists, auto-create one
    if (!profile) {
      const adminEmail = "admin@harvestin.agrilink";
      const adminPassword = crypto.randomUUID(); // random password, not needed for login

      const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
        email: adminEmail,
        password: adminPassword,
        email_confirm: true,
        user_metadata: {
          full_name: "Kwabs Admin",
          role: "admin",
          agrilink_id: "ADM-001",
        },
      });

      if (createError) {
        console.error("Error creating admin:", createError);
        return new Response(
          JSON.stringify({ error: "Failed to create admin account" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Wait briefly for trigger to create profile
      await new Promise((r) => setTimeout(r, 1000));

      // Fetch the newly created profile
      const { data: newProfile } = await supabase
        .from("profiles")
        .select("email, user_id")
        .eq("user_id", newUser.user.id)
        .single();

      profile = newProfile;
    }

    if (!profile) {
      return new Response(
        JSON.stringify({ error: "Admin profile not found" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Generate magic link for admin
    const { data: linkData, error: linkError } = await supabase.auth.admin.generateLink({
      type: "magiclink",
      email: profile.email,
    });

    if (linkError || !linkData) {
      console.error("Link error:", linkError);
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
    console.error("Server error:", err);
    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
