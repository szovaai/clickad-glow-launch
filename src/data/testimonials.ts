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
    quote: "Our website now properly showcases our electrical expertise and safety standards. We're connecting with more commercial clients who value quality work.",
    author: "Paul H.",
    role: "Owner",
    company: "TrueCan Power",
    location: "Calgary, AB",
    rating: 5
  },
  {
    quote: "The new site clearly communicates what we do and why clients should choose us. We're getting better qualified leads from the website now.",
    author: "Wes H",
    role: "Operations Manager",
    company: "Westlights",
    location: "Fort MacMurray, AB",
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
