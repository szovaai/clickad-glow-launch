export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    role: string;
  };
  publishedAt: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  featured: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "why-your-website-isnt-converting",
    title: "Why Your Service Business Website Isn't Converting (And How to Fix It)",
    excerpt: "Most service business websites look good but fail to convert visitors into customers. Here are the 5 critical mistakes killing your conversion rate.",
    content: `
# Why Your Service Business Website Isn't Converting (And How to Fix It)

You've invested thousands in a beautiful website. It loads fast. It looks professional. But your phone isn't ringing, and your contact form sits empty.

Sound familiar?

## The Problem: Pretty ≠ Profitable

Most service business websites are built to look good, not to convert. Designers focus on aesthetics while ignoring the psychology of how customers actually make decisions.

Here are the 5 critical mistakes killing your conversion rate:

### 1. No Clear Value Proposition Above the Fold

When someone lands on your site, they should know within 3 seconds:
- What you do
- Who you serve
- Why they should care

**Bad Example:** "Welcome to ABC Electrical Services"

**Good Example:** "Emergency Electrical Repairs in Calgary—24/7 Response, Licensed & Insured"

### 2. Missing or Buried Contact Information

Your phone number should be visible on every page. Period.

Make it clickable on mobile. Add a sticky header with your number. Put it in the hero section.

Don't make people hunt for ways to contact you.

### 3. Generic Stock Photos

Nothing screams "template website" like stock photos of people in suits shaking hands.

Use real photos of:
- Your team
- Your work trucks
- Your actual projects
- Your satisfied customers (with permission)

Authenticity builds trust. Stock photos destroy it.

### 4. No Social Proof

Visitors want proof that you're legit before they call.

Add:
- Google reviews (with ratings)
- Before/after photos
- Case studies with real results
- Industry certifications
- Years in business

Place these strategically throughout your site.

### 5. Weak or Confusing Call-to-Action

"Learn More" and "Contact Us" are lazy CTAs.

Try instead:
- "Get Your Free Quote in 60 Seconds"
- "Book Your Emergency Repair Now"
- "Schedule Your Free Consultation"

Be specific about what happens next.

## The Fix: Conversion-First Design

At ClickAd Media, we build websites that prioritize conversions over aesthetics.

Here's our framework:

1. **Clear headline** that speaks to customer pain points
2. **Visible contact options** (phone, form, chat)
3. **Real photos** of your team and work
4. **Strong social proof** throughout the page
5. **Specific CTAs** that drive action

### Real Results

When we redesigned TrueCan Power's website with this framework:
- Conversion rate increased 156%
- Phone inquiries up 89%
- Average project value increased 34%

## Take Action Today

Audit your website against these 5 mistakes. Fix even one, and you'll see more leads.

Want a free website audit? We'll send you a 60-second Loom video with 3 quick wins to boost your conversions.

[Get Your Free Audit →](/audit)
    `,
    author: {
      name: "Jason Szova",
      role: "Founder, ClickAd Media",
    },
    publishedAt: "2025-01-15",
    readTime: "5 min read",
    category: "Conversion Optimization",
    tags: ["CRO", "Web Design", "Service Business"],
    image: "/placeholder.svg",
    featured: true,
  },
  {
    id: "2",
    slug: "local-seo-checklist-calgary-contractors",
    title: "The Complete Local SEO Checklist for Calgary Contractors",
    excerpt: "Dominate local search results with this actionable SEO checklist. Get more leads from Google without expensive ads.",
    content: `
# The Complete Local SEO Checklist for Calgary Contractors

Getting found on Google when someone searches "electrician near me" or "Calgary renovation contractor" is the most valuable marketing channel for service businesses.

But most contractors have no idea how local SEO works.

## Why Local SEO Matters

72% of people who search for local services visit a business within 5 miles.

If you're not showing up in the top 3 Google results, you're invisible.

## The Complete Checklist

### 1. Google Business Profile (Critical)

**Set up your profile:**
- Claim your Google Business Profile
- Complete 100% of profile information
- Choose the right business categories
- Add your service areas (Calgary and surrounding areas)

**Optimize for conversions:**
- Use a local phone number (403 area code)
- Add business hours (including emergency hours if applicable)
- Upload 10+ photos of your work, team, vehicles
- Enable messaging for quick responses

**Get reviews consistently:**
- Ask every satisfied customer for a review
- Make it easy with a direct link
- Respond to all reviews (positive and negative)
- Aim for 50+ reviews minimum

### 2. Website SEO Foundations

**On-Page Optimization:**
- Title tags: "Service + City" format
- H1 headline with target keyword
- Location mentioned in first paragraph
- City names in URLs and content
- Schema markup for local business

**Technical SEO:**
- Mobile-friendly (Google's mobile-first index)
- Page speed under 3 seconds
- SSL certificate (HTTPS)
- XML sitemap submitted to Google
- Clean URL structure

### 3. Local Citations & Directories

List your business on:
- Yelp
- HomeStars
- Better Business Bureau
- Yellow Pages
- Industry-specific directories

**Critical:** Keep NAP (Name, Address, Phone) consistent across all listings.

### 4. Content Strategy

Create location-specific pages:
- "Calgary Electrician Services"
- "Emergency Electrical Repair in NW Calgary"
- "Licensed Electricians Serving Airdrie"

Blog about local topics:
- "Top Electrical Codes in Calgary Homes"
- "Winter Electrical Safety Tips for Calgary Homeowners"

### 5. Link Building

Get local links from:
- Local news sites (press releases)
- Calgary Chamber of Commerce
- Industry associations
- Supplier partnerships
- Local event sponsorships

## Common Mistakes to Avoid

❌ Using a PO box or virtual office
❌ Keyword stuffing in content
❌ Buying fake reviews
❌ Inconsistent business information
❌ Ignoring negative reviews

## Results Timeline

- **Week 1-4:** Google Business Profile fully optimized
- **Month 2-3:** Website ranking for brand searches
- **Month 4-6:** Appearing for "service + city" terms
- **Month 6-12:** Dominating local pack results

## Track Your Progress

Monitor these metrics:
- Google Business Profile views/clicks
- Organic search traffic in Google Analytics
- Keyword rankings in Search Console
- Phone calls from organic search
- Form submissions with UTM tracking

## Next Steps

Local SEO is a marathon, not a sprint. But every improvement compounds over time.

Start with your Google Business Profile today—it's free and delivers the fastest results.

Need help? We offer Local SEO packages specifically for Calgary service businesses.

[Get a Free SEO Audit →](/audit)
    `,
    author: {
      name: "Jason Szova",
      role: "Founder, ClickAd Media",
    },
    publishedAt: "2025-01-10",
    readTime: "8 min read",
    category: "SEO",
    tags: ["Local SEO", "Calgary", "Contractors"],
    image: "/placeholder.svg",
    featured: true,
  },
  {
    id: "3",
    slug: "ai-powered-website-chatbots-service-business",
    title: "AI-Powered Website Chatbots: Worth It for Service Businesses?",
    excerpt: "Should you add an AI chatbot to your website? We tested it for 90 days with Calgary contractors. Here's what we learned.",
    content: `
# AI-Powered Website Chatbots: Worth It for Service Businesses?

Everyone's talking about AI chatbots. But are they actually useful for service businesses, or just another tech gimmick?

We ran a 90-day experiment with 5 Calgary contractors to find out.

## The Promise

AI chatbots can supposedly:
- Answer customer questions 24/7
- Qualify leads automatically
- Book appointments instantly
- Reduce your workload

Sounds great. But does it work in practice?

## Our 90-Day Test

We installed custom AI chatbots on 5 contractor websites:
- 2 electricians
- 1 HVAC company
- 1 renovation contractor
- 1 plumber

### The Results

**Engagement Metrics:**
- 23% of visitors engaged with the chatbot
- Average conversation length: 4.2 minutes
- 67% of chats resulted in contact info capture

**Lead Quality:**
- 41% of chatbot leads became quoted jobs
- Similar qualification rate to phone calls
- Higher after-hours lead capture (8pm-8am)

**Customer Feedback:**
- "Got answers instantly instead of waiting for callback"
- "Easy to explain my issue with photos"
- "Booked appointment while watching TV at night"

## What Works

✅ **Answering common questions**
- Business hours
- Service areas
- Pricing estimates
- Emergency availability

✅ **Capturing after-hours leads**
- 34% of conversations happened outside business hours
- These leads had 2x higher urgency

✅ **Photo-based triage**
- Customers could upload photos of issues
- Helped qualify emergency vs. routine work
- Reduced unnecessary service calls

## What Doesn't Work

❌ **Complex technical troubleshooting**
- AI can't diagnose problems remotely
- Better to route to phone call quickly

❌ **High-value commercial projects**
- Decision-makers prefer phone/in-person
- Chatbot feels impersonal for $50k+ jobs

❌ **Price shopping**
- "How much for X?" conversations often stall
- Need human touch for pricing discussions

## Best Practices We Learned

### 1. Set Clear Expectations

Tell visitors upfront:
- "AI assistant available for quick questions"
- "For emergencies, call [number] now"
- "Complex quotes require a site visit"

### 2. Quick Handoff to Human

If conversation gets complex:
- Offer to connect with real person
- Collect contact info early
- Follow up within 2 hours

### 3. Integrate with CRM

Send chat transcripts to:
- Your email
- Your CRM system
- Your project management tool

Don't let leads fall through the cracks.

### 4. Train on Your Business

Generic chatbots suck. Train yours on:
- Your specific services
- Your service area
- Your pricing structure
- Common customer objections

## Cost vs. Value

**Average cost:** $200-500/month for good AI chatbot

**ROI calculation:**
- 15 extra leads/month
- 40% conversion rate = 6 jobs
- Average job value: $800
- Monthly revenue impact: $4,800

Worth it? Absolutely—if set up correctly.

## Our Recommendation

AI chatbots work well for service businesses IF:
1. You get after-hours traffic
2. You answer the same questions repeatedly
3. You struggle with lead response time
4. You have someone managing follow-ups

Skip it if:
- Your phone rings 24/7 already
- You're a one-person operation
- You can't follow up on leads quickly

## The Bottom Line

AI chatbots aren't magic, but they're valuable lead capture tools.

They won't replace human interaction, but they will catch leads you'd otherwise miss.

Start with a 90-day trial. Track your numbers. Decide based on ROI, not hype.

Want to add an AI chatbot to your website? We build custom solutions trained on your business.

[Get a Free Consultation →](/audit)
    `,
    author: {
      name: "Jason Szova",
      role: "Founder, ClickAd Media",
    },
    publishedAt: "2025-01-05",
    readTime: "6 min read",
    category: "Technology",
    tags: ["AI", "Chatbots", "Lead Generation"],
    image: "/placeholder.svg",
    featured: false,
  },
];