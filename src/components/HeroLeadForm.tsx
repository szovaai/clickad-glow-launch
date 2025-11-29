import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { trackFormSubmission } from "@/lib/analytics";

const leadSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().max(20).optional(),
});

type LeadFormData = z.infer<typeof leadSchema>;

export const HeroLeadForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
  });

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.functions.invoke('send-hero-lead', {
        body: data,
      });

      if (error) throw error;

      // Track form submission with GA4
      trackFormSubmission('hero_lead_form', {
        has_phone: !!data.phone,
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
    <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 shadow-xl">
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-1">Get Your Free Quote</h3>
        <p className="text-sm text-muted-foreground">
          Start your project in under 60 seconds
        </p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            {...register("name")}
            placeholder="Your name"
            className="mt-1.5"
          />
          {errors.name && (
            <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="you@company.com"
            className="mt-1.5"
          />
          {errors.email && (
            <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phone">Phone (optional)</Label>
          <Input
            id="phone"
            type="tel"
            {...register("phone")}
            placeholder="(123) 456-7890"
            className="mt-1.5"
          />
          {errors.phone && (
            <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
          )}
        </div>

        <Button 
          type="submit" 
          variant="glow" 
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            'Get Started'
          )}
        </Button>
        
        <p className="text-xs text-muted-foreground text-center">
          No spam. Unsubscribe anytime.
        </p>
      </form>
    </div>
  );
};