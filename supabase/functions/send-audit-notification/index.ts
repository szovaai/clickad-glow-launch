import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const RequestSchema = z.object({
  companyName: z.string().trim().min(1).max(200),
  contactName: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(255),
  phone: z.string().max(30).optional(),
  website: z.string().url().max(500).optional().or(z.literal("")),
  industry: z.string().max(100).optional(),
  notes: z.string().max(2000).optional(),
  auditId: z.string().uuid(),
});

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const raw = await req.json();
    const data = RequestSchema.parse(raw);
    console.log("Audit notification received for:", data.companyName);

    console.log("Audit data:", {
      company: data.companyName,
      contact: data.contactName,
      email: data.email,
      phone: data.phone,
      website: data.website,
      industry: data.industry,
      notes: data.notes,
      auditId: data.auditId,
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Audit notification logged (email sending disabled)" 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({ error: "Invalid input", details: error.errors }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    console.error("Error in send-audit-notification:", error);
    return new Response(
      JSON.stringify({ error: "Internal error" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
