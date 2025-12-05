import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// Map price IDs to package names
const priceToPackage: Record<string, { name: string; price: string }> = {
  "price_1Sb4IEGuihElNnYIZvb1iCM9": { name: "Starter Website Package", price: "$997" },
  "price_1Sb4IUGuihElNnYIXX4tOwSb": { name: "Growth Website Package", price: "$1,497" },
  "price_1Sb4IhGuihElNnYILPHGfbnS": { name: "Premium Website Package", price: "$2,500" },
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { sessionId } = await req.json();
    
    if (!sessionId) {
      throw new Error("Session ID is required");
    }

    console.log("Verifying payment session:", sessionId);

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    // Retrieve the checkout session
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'customer_details'],
    });

    if (session.payment_status !== "paid") {
      return new Response(JSON.stringify({ 
        success: false, 
        message: "Payment not completed" 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const customerEmail = session.customer_details?.email || session.customer_email;
    const customerName = session.customer_details?.name || "there";
    const priceId = session.line_items?.data[0]?.price?.id || "";
    const packageInfo = priceToPackage[priceId] || { name: "Website Package", price: "CAD" };

    console.log("Payment verified for:", customerEmail, packageInfo.name);

    // Send confirmation to customer
    try {
      await resend.emails.send({
        from: "ClickAdMedia <onboarding@resend.dev>",
        to: [customerEmail!],
        subject: "🎉 Payment Confirmed - Your Website Project Begins!",
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
              .highlight { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6; }
              .step { display: flex; align-items: flex-start; margin-bottom: 15px; }
              .step-number { background: #3b82f6; color: white; width: 30px; height: 30px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-right: 15px; flex-shrink: 0; }
              .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
              .button { display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; margin-top: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;">Payment Successful! 🎉</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">Your website project is officially underway</p>
              </div>
              <div class="content">
                <p>Hi ${customerName},</p>
                <p>Thank you for choosing ClickAdMedia! Your payment has been processed successfully.</p>
                
                <div class="highlight">
                  <strong>Order Details:</strong><br>
                  Package: ${packageInfo.name}<br>
                  Amount: ${packageInfo.price} CAD
                </div>

                <h3>What Happens Next:</h3>
                <div class="step">
                  <span class="step-number">1</span>
                  <div>
                    <strong>Welcome Call (Within 24 Hours)</strong><br>
                    I'll reach out to schedule your 30-minute kickoff call to discuss your vision and goals.
                  </div>
                </div>
                <div class="step">
                  <span class="step-number">2</span>
                  <div>
                    <strong>Strategy & Design (Days 2-5)</strong><br>
                    We'll create your sitemap, wireframes, and initial design concepts.
                  </div>
                </div>
                <div class="step">
                  <span class="step-number">3</span>
                  <div>
                    <strong>Development & Launch (Days 6-14)</strong><br>
                    Your website is built, tested, and launched with full training.
                  </div>
                </div>

                <div class="footer">
                  <p>Questions? Reply to this email or reach out at support@jasonrszova.com</p>
                  <p>© ${new Date().getFullYear()} ClickAdMedia. All rights reserved.</p>
                </div>
              </div>
            </div>
          </body>
          </html>
        `,
      });
      console.log("Customer confirmation email sent");
    } catch (emailError) {
      console.error("Failed to send customer email:", emailError);
    }

    // Send notification to owner
    try {
      await resend.emails.send({
        from: "ClickAdMedia <onboarding@resend.dev>",
        to: ["support@jasonrszova.com"],
        subject: `💰 New Payment - ${packageInfo.name}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #10b981; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
              .detail { background: white; padding: 15px; border-radius: 8px; margin: 10px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;">💰 New Payment Received!</h1>
              </div>
              <div class="content">
                <p>A new payment has been received:</p>
                
                <div class="detail">
                  <strong>Customer Email:</strong> ${customerEmail}<br>
                  <strong>Customer Name:</strong> ${customerName}<br>
                  <strong>Package:</strong> ${packageInfo.name}<br>
                  <strong>Amount:</strong> ${packageInfo.price} CAD<br>
                  <strong>Session ID:</strong> ${sessionId}
                </div>

                <p><strong>Action Required:</strong> Reach out within 24 hours to schedule the kickoff call.</p>
              </div>
            </div>
          </body>
          </html>
        `,
      });
      console.log("Owner notification email sent");
    } catch (emailError) {
      console.error("Failed to send owner email:", emailError);
    }

    return new Response(JSON.stringify({ 
      success: true,
      packageName: packageInfo.name,
      customerEmail,
      customerName,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error verifying payment:", errorMessage);
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
