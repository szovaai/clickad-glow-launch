import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url, businessName, industry } = await req.json();

    if (!url) {
      return new Response(
        JSON.stringify({ success: false, error: "URL is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const FIRECRAWL_API_KEY = Deno.env.get("FIRECRAWL_API_KEY");
    if (!FIRECRAWL_API_KEY) {
      return new Response(
        JSON.stringify({ success: false, error: "Firecrawl not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(
        JSON.stringify({ success: false, error: "AI gateway not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Format URL
    let formattedUrl = url.trim();
    if (!formattedUrl.startsWith("http://") && !formattedUrl.startsWith("https://")) {
      formattedUrl = `https://${formattedUrl}`;
    }

    console.log("Scraping URL:", formattedUrl);

    // Step 1: Scrape with Firecrawl
    const scrapeResponse = await fetch("https://api.firecrawl.dev/v1/scrape", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${FIRECRAWL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: formattedUrl,
        formats: ["markdown", "links", "html"],
        onlyMainContent: false,
        waitFor: 3000,
      }),
    });

    const scrapeData = await scrapeResponse.json();

    if (!scrapeResponse.ok || !scrapeData.success) {
      console.error("Firecrawl error:", scrapeData);
      return new Response(
        JSON.stringify({
          success: false,
          error: scrapeData.error || "Failed to scrape website. The site may be unreachable.",
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const markdown = scrapeData.data?.markdown || scrapeData.markdown || "";
    const html = scrapeData.data?.html || scrapeData.html || "";
    const links = scrapeData.data?.links || scrapeData.links || [];
    const metadata = scrapeData.data?.metadata || scrapeData.metadata || {};

    console.log("Scrape successful, content length:", markdown.length);

    // Truncate content to avoid token limits
    const truncatedMarkdown = markdown.substring(0, 8000);
    const truncatedHtml = html.substring(0, 4000);
    const linksList = links.slice(0, 50).join("\n");

    // Step 2: Analyze with AI using tool calling for structured output
    const systemPrompt = `You are a website auditor specializing in trade service businesses (plumbers, electricians, HVAC, contractors, etc.). You analyze websites and provide actionable scores and recommendations.

You must evaluate the website content provided and score it on 8 specific criteria. Be honest and critical — most trade websites score poorly. A score of 7+ means genuinely good, 4-6 is average, below 4 is poor.`;

    const userPrompt = `Analyze this ${industry || "trade service"} business website for "${businessName || "this business"}".

**Website URL:** ${formattedUrl}
**Page Title:** ${metadata.title || "Unknown"}
**Meta Description:** ${metadata.description || "None found"}

**Page Content (Markdown):**
${truncatedMarkdown}

**HTML Snippet (for technical analysis):**
${truncatedHtml}

**Links found on page:**
${linksList}

Score this website on all 8 criteria listed in the tool parameters. Be specific in recommendations — mention exactly what's missing or what they should add.`;

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "submit_audit_results",
              description: "Submit the complete website audit scoring results",
              parameters: {
                type: "object",
                properties: {
                  overall_score: {
                    type: "number",
                    description: "Overall website score from 0-100, calculated as average of all criteria * 10",
                  },
                  overall_grade: {
                    type: "string",
                    enum: ["A", "B", "C", "D", "F"],
                    description: "Letter grade: A=90-100, B=80-89, C=70-79, D=60-69, F=below 60",
                  },
                  summary: {
                    type: "string",
                    description: "2-3 sentence executive summary of the website's strengths and weaknesses",
                  },
                  criteria: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: {
                          type: "string",
                          enum: [
                            "Website Quality",
                            "Mobile-Friendly",
                            "Local SEO & Google Maps",
                            "Customer Reviews",
                            "Instant Contact Options",
                            "Site Speed",
                            "After-Hours Booking",
                            "Call-to-Action Clarity",
                          ],
                        },
                        score: {
                          type: "number",
                          description: "Score from 0-10",
                        },
                        status: {
                          type: "string",
                          enum: ["pass", "warning", "fail"],
                          description: "pass=7-10, warning=4-6, fail=0-3",
                        },
                        finding: {
                          type: "string",
                          description: "What was found or not found on the site (1 sentence)",
                        },
                        recommendation: {
                          type: "string",
                          description: "Specific actionable recommendation to improve this area (1-2 sentences)",
                        },
                      },
                      required: ["name", "score", "status", "finding", "recommendation"],
                      additionalProperties: false,
                    },
                  },
                },
                required: ["overall_score", "overall_grade", "summary", "criteria"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "submit_audit_results" } },
      }),
    });

    if (!aiResponse.ok) {
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ success: false, error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ success: false, error: "AI credits exhausted. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errText = await aiResponse.text();
      console.error("AI gateway error:", aiResponse.status, errText);
      return new Response(
        JSON.stringify({ success: false, error: "AI analysis failed" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const aiData = await aiResponse.json();
    const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];

    if (!toolCall?.function?.arguments) {
      console.error("No tool call in AI response:", JSON.stringify(aiData));
      return new Response(
        JSON.stringify({ success: false, error: "AI did not return structured results" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const auditResults = JSON.parse(toolCall.function.arguments);

    console.log("Audit complete. Grade:", auditResults.overall_grade, "Score:", auditResults.overall_score);

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          ...auditResults,
          url: formattedUrl,
          businessName: businessName || metadata.title || "Unknown Business",
          industry: industry || "General",
          scannedAt: new Date().toISOString(),
          pageTitle: metadata.title || null,
        },
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("run-ai-audit error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
