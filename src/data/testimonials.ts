import { Users, BarChart3, Building, Shield, LucideIcon } from "lucide-react";

export interface Testimonial {
  id: number;
  quote: string;
  authorName: string;
  authorTitle: string;
  authorCompany: string;
  icon: LucideIcon;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "The InsightForge platform is an investment with a very quick ROI. If you take advantage of the platform, you'll always have access to live market and competitor information. This helps you make well-informed pricing and distribution decisions, better target your marketing and increase your overall revenue.",
    authorName: "Beatriz Cadete",
    authorTitle: "Revenue Manager",
    authorCompany: "Inspira Liberdade Boutique Hotel",
    icon: Users,
  },
  {
    id: 2,
    quote:
      "InsightForge has transformed how we approach revenue management. The real-time analytics and competitor insights have helped us increase our revenue by 25% in just six months. The platform is intuitive and the support team is exceptional.",
    authorName: "Marcus Johnson",
    authorTitle: "Director of Revenue",
    authorCompany: "Grand Plaza Hotels",
    icon: BarChart3,
  },
  {
    id: 3,
    quote:
      "The market intelligence features are game-changing. We now have complete visibility into our competitive landscape and can make data-driven decisions that directly impact our bottom line. InsightForge is an essential tool for any serious hospitality business.",
    authorName: "Sarah Chen",
    authorTitle: "General Manager",
    authorCompany: "Luxury Resort & Spa",
    icon: Building,
  },
  {
    id: 4,
    quote:
      "Implementation was seamless and the results were immediate. Our team loves the user-friendly interface and the actionable insights. InsightForge has become an integral part of our daily operations and strategic planning.",
    authorName: "David Rodriguez",
    authorTitle: "VP of Operations",
    authorCompany: "Boutique Hotel Group",
    icon: Shield,
  },
];

// Function to add new testimonials easily
export const addTestimonial = (
  testimonial: Omit<Testimonial, "id">
): Testimonial => {
  const newId = Math.max(...testimonials.map((t) => t.id)) + 1;
  const newTestimonial = { ...testimonial, id: newId };
  testimonials.push(newTestimonial);
  return newTestimonial;
};
