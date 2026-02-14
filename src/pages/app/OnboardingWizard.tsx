import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import Step1BusinessInfo from "@/components/app/onboarding/Step1BusinessInfo";
import Step2Qualification from "@/components/app/onboarding/Step2Qualification";
import Step3Calendar from "@/components/app/onboarding/Step3Calendar";
import Step4GHL from "@/components/app/onboarding/Step4GHL";
import Step5Phone from "@/components/app/onboarding/Step5Phone";
import Step6KnowledgeBase from "@/components/app/onboarding/Step6KnowledgeBase";

export interface WizardData {
  // Step 1
  businessName: string;
  industry: string;
  services: string[];
  serviceArea: string;
  hours: Record<string, { open: string; close: string; enabled: boolean }>;
  emergencyHours: boolean;
  // Step 2
  budgetMin: number;
  jobTypeFilters: string[];
  locationFilters: string[];
  timelineQuestion: string;
  customQuestions: string[];
  // Step 3
  calendarAvailability: Record<string, { start: string; end: string; enabled: boolean }>;
  bufferTime: number;
  appointmentDuration: number;
  // Step 4
  ghlApiKey: string;
  ghlLocationId: string;
  ghlPipelineId: string;
  ghlStageMapping: { newLead: string; booked: string; qualified: string; lost: string };
  ghlCustomFields: Record<string, string>;
  // Step 5
  phoneNumber: string;
  missedCallTextBack: boolean;
  autoReplyMessage: string;
  speedToLead: boolean;
  // Step 6
  faqs: { question: string; answer: string }[];
  serviceDescriptions: string;
  pricingRanges: string;
  policies: string;
  objectionResponses: { objection: string; response: string }[];
}

const defaultData: WizardData = {
  businessName: "", industry: "", services: [], serviceArea: "", hours: {}, emergencyHours: false,
  budgetMin: 0, jobTypeFilters: [], locationFilters: [], timelineQuestion: "", customQuestions: [],
  calendarAvailability: {}, bufferTime: 15, appointmentDuration: 30,
  ghlApiKey: "", ghlLocationId: "", ghlPipelineId: "",
  ghlStageMapping: { newLead: "", booked: "", qualified: "", lost: "" }, ghlCustomFields: {},
  phoneNumber: "", missedCallTextBack: true, autoReplyMessage: "Sorry we missed your call! Want to book a time? Click here: [Link]", speedToLead: false,
  faqs: [], serviceDescriptions: "", pricingRanges: "", policies: "", objectionResponses: [],
};

const steps = [
  { title: "Business Info", num: 1 },
  { title: "Qualification", num: 2 },
  { title: "Calendar", num: 3 },
  { title: "GoHighLevel", num: 4 },
  { title: "Phone", num: 5 },
  { title: "Knowledge Base", num: 6 },
];

const OnboardingWizard = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<WizardData>(defaultData);
  const [saving, setSaving] = useState(false);
  const { agencyId } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const update = (partial: Partial<WizardData>) => setData((prev) => ({ ...prev, ...partial }));

  const handleFinish = async () => {
    if (!agencyId) {
      toast({ title: "No agency found", description: "Please contact support.", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      // Create client account
      const { data: client, error: clientErr } = await supabase
        .from("client_accounts")
        .insert({
          agency_id: agencyId,
          business_name: data.businessName,
          industry: data.industry,
          services: data.services,
          service_area: data.serviceArea,
          hours: data.hours,
          emergency_hours: data.emergencyHours,
        })
        .select()
        .single();

      if (clientErr) throw clientErr;

      // Create config + GHL integration in parallel
      const [configRes, ghlRes] = await Promise.all([
        supabase.from("client_configs").insert({
          client_account_id: client.id,
          qualification_rules: {
            budgetMin: data.budgetMin,
            jobTypeFilters: data.jobTypeFilters,
            locationFilters: data.locationFilters,
            timelineQuestion: data.timelineQuestion,
            customQuestions: data.customQuestions,
          },
          calendar_settings: {
            availability: data.calendarAvailability,
            bufferTime: data.bufferTime,
            appointmentDuration: data.appointmentDuration,
          },
          phone_config: {
            phoneNumber: data.phoneNumber,
            missedCallTextBack: data.missedCallTextBack,
            autoReplyMessage: data.autoReplyMessage,
            speedToLead: data.speedToLead,
          },
          knowledge_base: {
            faqs: data.faqs,
            serviceDescriptions: data.serviceDescriptions,
            pricingRanges: data.pricingRanges,
            policies: data.policies,
            objectionResponses: data.objectionResponses,
          },
        }),
        supabase.from("ghl_integrations").insert({
          client_account_id: client.id,
          api_key: data.ghlApiKey,
          location_id: data.ghlLocationId,
          pipeline_id: data.ghlPipelineId,
          stage_mapping: data.ghlStageMapping,
          custom_field_mapping: data.ghlCustomFields,
        }),
      ]);

      if (configRes.error) throw configRes.error;
      if (ghlRes.error) throw ghlRes.error;

      toast({ title: "Client onboarded!", description: `${data.businessName} has been set up successfully.` });
      navigate("/app/clients");
    } catch (err: any) {
      toast({ title: "Error saving", description: err.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1: return <Step1BusinessInfo data={data} update={update} />;
      case 2: return <Step2Qualification data={data} update={update} />;
      case 3: return <Step3Calendar data={data} update={update} />;
      case 4: return <Step4GHL data={data} update={update} />;
      case 5: return <Step5Phone data={data} update={update} />;
      case 6: return <Step6KnowledgeBase data={data} update={update} />;
      default: return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">New Client Onboarding</h1>
        <p className="text-muted-foreground mt-1">Complete all 6 steps to set up the AI sales system.</p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-1">
        {steps.map((s) => (
          <button
            key={s.num}
            onClick={() => setStep(s.num)}
            className={`flex-1 h-2 rounded-full transition-all ${
              s.num === step ? "bg-primary" : s.num < step ? "bg-primary/50" : "bg-muted"
            }`}
          />
        ))}
      </div>
      <p className="text-sm text-muted-foreground">Step {step} of 6 — {steps[step - 1].title}</p>

      <Card className="border-border/50 glass">
        <CardHeader>
          <CardTitle className="text-foreground font-heading">{steps[step - 1].title}</CardTitle>
        </CardHeader>
        <CardContent>{renderStep()}</CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" disabled={step === 1} onClick={() => setStep((s) => s - 1)}>
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </Button>
        {step < 6 ? (
          <Button onClick={() => setStep((s) => s + 1)}>
            Next <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        ) : (
          <Button variant="glow" onClick={handleFinish} disabled={saving || !data.businessName}>
            {saving ? "Saving..." : <>Finish Setup <Check className="h-4 w-4 ml-1" /></>}
          </Button>
        )}
      </div>
    </div>
  );
};

export default OnboardingWizard;
