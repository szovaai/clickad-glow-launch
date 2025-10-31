import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

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
    console.log("Sending audit notification for:", data.companyName);

    // Send notification to admin (you)
    const adminEmail = await resend.emails.send({
      from: "ClickAd Media <onboarding@resend.dev>",
      to: ["szovajason@gmail.com"],
      subject: `🚀 New Audit Request: ${data.companyName}`,
      html: `
        <h2>New Website Audit Request</h2>
        <p><strong>Company:</strong> ${data.companyName}</p>
        <p><strong>Contact:</strong> ${data.contactName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ""}
        ${data.website ? `<p><strong>Website:</strong> ${data.website}</p>` : ""}
        ${data.industry ? `<p><strong>Industry:</strong> ${data.industry}</p>` : ""}
        ${data.notes ? `<p><strong>Notes:</strong> ${data.notes}</p>` : ""}
        <hr>
        <p><strong>Audit ID:</strong> ${data.auditId}</p>
        <p><em>Action: Record a Loom audit and send to ${data.email}</em></p>
      `,
    });

    // Send thank you email to prospect
    const prospectEmail = await resend.emails.send({
      from: "Jason @ ClickAd Media <onboarding@resend.dev>",
      to: [data.email],
      subject: "Your Free Website Audit is Coming! 🎯",
      html: `
        <h2>Thanks for requesting your free audit, ${data.contactName.split(' ')[0]}!</h2>
        <p>I'm diving into <strong>${data.website || 'your website'}</strong> right now.</p>
        <p>Within 24 hours, you'll get a <strong>60-second Loom video</strong> showing 3 quick wins to boost your conversions.</p>
        <p>If you like what you see, I'll fix it in a <strong>One-Day Website Makeover</strong> (only 3 spots available per month).</p>
        <hr>
        <p><strong>Next Steps:</strong></p>
        <ol>
          <li>Watch for my Loom (check spam if you don't see it)</li>
          <li>Book a quick 15-min call if you want to move forward</li>
        </ol>
        <p>Questions? Just reply to this email.</p>
        <p>—Jason Szova<br>ClickAd Media</p>
      `,
    });

    console.log("Admin email sent:", adminEmail);
    console.log("Prospect email sent:", prospectEmail);

    return new Response(
      JSON.stringify({ success: true, adminEmail, prospectEmail }),
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
