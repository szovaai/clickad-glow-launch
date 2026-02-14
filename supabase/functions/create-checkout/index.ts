import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const RequestSchema = z.object({
  priceId: z.string().min(1).max(200),
  customerEmail: z.string().email().max(255).optional(),
});

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const raw = await req.json();
    const { priceId, customerEmail } = RequestSchema.parse(raw);

    console.log("Creating checkout session for price:", priceId);

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    const sessionConfig: Stripe.Checkout.SessionCreateParams = {
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/pricing`,
    };

    if (customerEmail) {
      sessionConfig.customer_email = customerEmail;
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);
    console.log("Checkout session created:", session.id);

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify({ error: "Invalid input", details: error.errors }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error creating checkout session:", errorMessage);
    return new Response(JSON.stringify({ error: "Checkout error" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
