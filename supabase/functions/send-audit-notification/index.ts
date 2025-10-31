import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AuditNotification {
  companyName: string;
  contactName: string;
  email: string;
  phone?: string;
  website?: string;
  industry?: string;
  notes?: string;
  auditId: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: AuditNotification = await req.json();
    console.log("Audit notification received for:", data.companyName);

    // Note: Email sending functionality disabled - requires Resend API key
    // For now, just log the data for manual follow-up
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
    console.error("Error in send-audit-notification:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
