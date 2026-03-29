import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { trackFormSubmission } from "@/lib/analytics";

const leadSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  business: z.string().trim().min(1, "Business name is required").max(100),
  phone: z.string().trim().min(1, "Phone is required").max(20),
  website: z.string().trim().max(500).optional().or(z.literal('')),
  revenue_range: z.string().optional(),
  challenge: z.string().trim().max(500).optional(),
});

type LeadFormData = z.infer<typeof leadSchema>;

export const HeroLeadForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
  });

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('send-hero-lead', {
        body: data,
      });

      if (error) throw error;

      trackFormSubmission('hero_lead_form', {
        has_phone: !!data.phone,
        revenue_range: data.revenue_range || 'not_specified',
      });

      toast.success("Thanks! We'll be in touch soon.");
      reset();
    } catch (error) {
      console.error('Lead submission error:', error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="premium-card p-8 md:p-10">
      <div className="mb-6">
        <h3 className="text-xl font-heading font-bold mb-1.5">Strategy Intake</h3>
        <p className="text-sm text-muted-foreground">
          See exactly how a conversion-focused website will grow your business.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-sm text-muted-foreground">Name *</Label>
          <Input
            id="name"
            {...register("name")}
            placeholder="Your name"
            className="mt-1.5 bg-secondary/50 border-[hsl(0_0%_100%/0.06)]"
          />
          {errors.name && (
            <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="business" className="text-sm text-muted-foreground">Business Name *</Label>
          <Input
            id="business"
            {...register("business")}
            placeholder="Your company"
            className="mt-1.5 bg-secondary/50 border-[hsl(0_0%_100%/0.06)]"
          />
          {errors.business && (
            <p className="text-sm text-destructive mt-1">{errors.business.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phone" className="text-sm text-muted-foreground">Phone *</Label>
          <Input
            id="phone"
            type="tel"
            {...register("phone")}
            placeholder="(123) 456-7890"
            className="mt-1.5 bg-secondary/50 border-[hsl(0_0%_100%/0.06)]"
          />
          {errors.phone && (
            <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="website" className="text-sm text-muted-foreground">Website (optional)</Label>
          <Input
            id="website"
            {...register("website")}
            placeholder="https://yoursite.com"
            className="mt-1.5 bg-secondary/50 border-[hsl(0_0%_100%/0.06)]"
          />
        </div>

        <div>
          <Label className="text-sm text-muted-foreground">Monthly Revenue Range</Label>
          <Select onValueChange={(value) => setValue("revenue_range", value)}>
            <SelectTrigger className="mt-1.5 bg-secondary/50 border-[hsl(0_0%_100%/0.06)]">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="under-10k">Under $10k</SelectItem>
              <SelectItem value="10k-50k">$10k – $50k</SelectItem>
              <SelectItem value="50k-100k">$50k – $100k</SelectItem>
              <SelectItem value="100k-plus">$100k+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="challenge" className="text-sm text-muted-foreground">Biggest Growth Challenge</Label>
          <Textarea
            id="challenge"
            {...register("challenge")}
            placeholder="What's holding your business back?"
            className="mt-1.5 resize-none bg-secondary/50 border-[hsl(0_0%_100%/0.06)]"
            rows={3}
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            'Get My Free Audit'
          )}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Average response within one business day.
        </p>
      </form>
    </div>
  );
};
