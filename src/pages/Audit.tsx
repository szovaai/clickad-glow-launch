import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { auditFormSchema, type AuditFormData } from "@/lib/validation";
import { captureUTMParams, saveUTMToSession, getUTMFromSession } from "@/lib/utm";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Loader2 } from "lucide-react";

const Audit = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AuditFormData>({
    resolver: zodResolver(auditFormSchema),
    defaultValues: {
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      website: "",
      industry: "",
      notes: "",
    },
  });

  useEffect(() => {
    // Capture UTM params on page load
    const utmParams = captureUTMParams();
    if (Object.keys(utmParams).length > 0) {
      saveUTMToSession(utmParams);
    }
  }, []);

  const onSubmit = async (data: AuditFormData) => {
    setIsSubmitting(true);

    try {
      // Get UTM params from session
      const utmParams = getUTMFromSession();

      // 1. Create company record
      const { data: company, error: companyError } = await supabase
        .from("companies")
        .insert({
          name: data.companyName,
          website: data.website || null,
          industry: data.industry || null,
          city: "Calgary",
          province: "AB",
        })
        .select()
        .single();

      if (companyError) throw companyError;

      // 2. Create contact record
      const nameParts = data.contactName.split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ") || null;

      const { data: contact, error: contactError } = await supabase
        .from("contacts")
        .insert({
          company_id: company.id,
          first_name: firstName,
          last_name: lastName,
          email: data.email,
          phone: data.phone || null,
        })
        .select()
        .single();

      if (contactError) throw contactError;

      // 3. Create audit record
      const { data: audit, error: auditError } = await supabase
        .from("audits")
        .insert({
          company_id: company.id,
          url: data.website || null,
          notes: data.notes || null,
          status: "new",
          utm_source: utmParams.utm_source || null,
          utm_medium: utmParams.utm_medium || null,
          utm_campaign: utmParams.utm_campaign || null,
          utm_term: utmParams.utm_term || null,
          utm_content: utmParams.utm_content || null,
        })
        .select()
        .single();

      if (auditError) throw auditError;

      // 4. Trigger edge function to send emails
      const { error: emailError } = await supabase.functions.invoke(
        "send-audit-notification",
        {
          body: {
            companyName: data.companyName,
            contactName: data.contactName,
            email: data.email,
            phone: data.phone,
            website: data.website,
            industry: data.industry,
            notes: data.notes,
            auditId: audit.id,
          },
        }
      );

      if (emailError) {
        console.error("Email notification error:", emailError);
        // Don't fail the submission if email fails - data is saved
      }

      // 5. Track audit submission with Trakrly
      if (window.Trakrly) {
        window.Trakrly.click({
          event: 'audit_submitted',
          company_name: data.companyName,
          industry: data.industry,
          has_website: !!data.website,
        });
      }

      // 6. Navigate to thank you page
      navigate("/thank-you");
    } catch (error: any) {
      console.error("Error submitting audit form:", error);
      toast.error("Failed to submit audit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 pt-32 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Get Your Free 5-Minute Website Audit</h1>
            <p className="text-lg text-muted-foreground">
              Discover 3 quick wins to boost your conversions—delivered in a 60-second Loom video within 24 hours.
            </p>
          </div>

          <div className="bg-card p-8 rounded-lg border shadow-sm">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-form="audit">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="ABC Company" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@abccompany.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="587-575-9416" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website URL</FormLabel>
                      <FormControl>
                        <Input type="url" placeholder="https://yourwebsite.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industry</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your industry" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="electrician">Electrician</SelectItem>
                          <SelectItem value="plumber">Plumber</SelectItem>
                          <SelectItem value="hvac">HVAC</SelectItem>
                          <SelectItem value="renovation">Renovation/Contractor</SelectItem>
                          <SelectItem value="roofing">Roofing</SelectItem>
                          <SelectItem value="landscaping">Landscaping</SelectItem>
                          <SelectItem value="manufacturing">Manufacturing/Industrial</SelectItem>
                          <SelectItem value="professional">Professional Services</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Anything specific you'd like me to look at?"
                          {...field}
                          rows={4}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Get My Free Audit"
                  )}
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  No credit card required. You'll receive your audit video within 24 hours.
                </p>
              </form>
            </Form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Audit;
