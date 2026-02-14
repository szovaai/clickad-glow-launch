

## Review Collector Agent

Add a new "Reviews" module to the SaaS app that lets agency admins send review/testimonial collection requests to their clients' customers via SMS, track responses, and display collected testimonials.

### How It Works

1. **Agency admin** selects a client account and enters a customer's name + phone number
2. The system sends an SMS with a personalized link to a public review submission page
3. The customer clicks the link, fills out a simple form (star rating, quote, name, role)
4. The review is saved to the database and visible in the app dashboard
5. Agency admins can approve/reject reviews and copy them for use on websites

### Database Changes

**New table: `reviews`**
- `id` (uuid, PK)
- `client_account_id` (uuid, FK to client_accounts)
- `token` (text, unique) -- used in the public review link
- `customer_name` (text)
- `customer_phone` (text)
- `customer_email` (text, nullable)
- `rating` (integer, 1-5)
- `quote` (text)
- `role` (text, nullable) -- e.g. "Homeowner", "Business Owner"
- `status` (text, default 'pending') -- pending | approved | rejected
- `submitted_at` (timestamptz, nullable)
- `created_at` (timestamptz, default now())

**RLS Policies:**
- Agency users can SELECT reviews for their clients
- Client users can SELECT their own reviews
- Public can UPDATE (submit) reviews matched by token (only when status is 'pending')
- Agency admins can UPDATE status (approve/reject)

### New Edge Function: `send-review-request`

- Accepts: `client_account_id`, `customer_name`, `customer_phone`
- Creates a `reviews` row with a unique token and status 'pending'
- Sends an SMS via Twilio (using existing phone config) with a link like:
  `https://clickad-glow-launch.lovable.app/review/{token}`
- Validates inputs with Zod

### New Public Page: `/review/:token`

- Simple, branded page (no auth required)
- Looks up the review by token
- Shows: "Hi {customer_name}, how was your experience with {business_name}?"
- Star rating selector (1-5)
- Text area for their testimonial quote
- Optional role/title field
- Submit button saves rating + quote + marks as submitted
- Thank you state after submission

### New App Page: `/app/reviews`

- Lists all reviews for the selected client
- Shows: customer name, rating, quote snippet, status badge (pending/approved/rejected)
- Filter by status
- Approve/Reject buttons for agency admins
- "Request Review" button opens a dialog to enter customer name + phone and send the SMS
- Copy-to-clipboard button for approved reviews

### App Navigation

- Add "Reviews" item to the sidebar with a `Star` icon
- Route: `/app/reviews`

### Implementation Steps

1. **Database migration**: Create `reviews` table with RLS policies
2. **Edge function**: Create `send-review-request` to insert review row and send SMS
3. **Public review page**: `/review/:token` -- simple form for customers to submit
4. **App reviews page**: `/app/reviews` -- dashboard to manage reviews
5. **Sidebar + routing**: Add nav item and route to App.tsx

### Technical Details

- The public review page uses the Supabase anon key to update the review by token (RLS policy scoped to matching token + pending status)
- SMS sending reuses existing Twilio credentials from the client's phone config
- Star rating uses a simple interactive component (clickable star icons)
- Token is a random UUID to prevent guessing
- Zod validation on both the edge function and the public form
