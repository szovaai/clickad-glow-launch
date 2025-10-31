export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  location: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    quote: "TrueCan Power doubled their leads in 45 days after switching to ClickAdMedia.",
    author: "James T.",
    role: "Owner",
    company: "TrueCan Power",
    location: "Calgary, AB",
    rating: 5
  },
  {
    quote: "Our phone hasn't stopped ringing since the new website launched. Best investment we've made.",
    author: "Sarah M.",
    role: "Operations Manager",
    company: "Westlights Industrial",
    location: "Calgary, AB",
    rating: 5
  },
  {
    quote: "Finally, a website that actually brings in customers instead of just sitting there looking pretty.",
    author: "Mike R.",
    role: "Owner",
    company: "Kwik Kerb Calgary",
    location: "Calgary, AB",
    rating: 5
  }
];
