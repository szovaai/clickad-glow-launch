import { Globe, Smartphone, MapPin, Star, MessageCircle, Zap, Clock, MousePointerClick } from "lucide-react";

export interface AuditCriterion {
  name: string;
  score: number;
  status: "pass" | "warning" | "fail";
  finding: string;
  recommendation: string;
}

export interface AuditResult {
  overall_score: number;
  overall_grade: string;
  summary: string;
  criteria: AuditCriterion[];
  url: string;
  businessName: string;
  industry: string;
  scannedAt: string;
  pageTitle?: string;
}

const criterionIcons: Record<string, React.ReactNode> = {
  "Website Quality": <Globe className="w-5 h-5" />,
  "Mobile-Friendly": <Smartphone className="w-5 h-5" />,
  "Local SEO & Google Maps": <MapPin className="w-5 h-5" />,
  "Customer Reviews": <Star className="w-5 h-5" />,
  "Instant Contact Options": <MessageCircle className="w-5 h-5" />,
  "Site Speed": <Zap className="w-5 h-5" />,
  "After-Hours Booking": <Clock className="w-5 h-5" />,
  "Call-to-Action Clarity": <MousePointerClick className="w-5 h-5" />,
};

const statusColors = {
  pass: { bg: "bg-emerald-500/20", text: "text-emerald-400", bar: "bg-emerald-500" },
  warning: { bg: "bg-amber-500/20", text: "text-amber-400", bar: "bg-amber-500" },
  fail: { bg: "bg-red-500/20", text: "text-red-400", bar: "bg-red-500" },
};

const gradeColors: Record<string, string> = {
  A: "text-emerald-400",
  B: "text-sky-400",
  C: "text-amber-400",
  D: "text-orange-400",
  F: "text-red-400",
};

const gradeRingColors: Record<string, string> = {
  A: "stroke-emerald-500",
  B: "stroke-sky-500",
  C: "stroke-amber-500",
  D: "stroke-orange-500",
  F: "stroke-red-500",
};

export const AuditScoreCard = ({ result }: { result: AuditResult }) => {
  const circumference = 2 * Math.PI * 54;
  const progress = (result.overall_score / 100) * circumference;

  return (
    <div className="space-y-8">
      {/* Overall Grade */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted/30" />
            <circle
              cx="60" cy="60" r="54" fill="none" strokeWidth="8"
              className={gradeRingColors[result.overall_grade] || "stroke-muted"}
              strokeDasharray={circumference}
              strokeDashoffset={circumference - progress}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-5xl font-black ${gradeColors[result.overall_grade]}`}>
              {result.overall_grade}
            </span>
            <span className="text-sm text-muted-foreground font-medium">{result.overall_score}/100</span>
          </div>
        </div>
        <div className="text-center max-w-lg">
          <h3 className="text-xl font-bold mb-1">{result.businessName}</h3>
          <p className="text-sm text-muted-foreground break-all">{result.url}</p>
          <p className="text-sm text-muted-foreground mt-2">{result.summary}</p>
        </div>
      </div>

      {/* Criteria Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {result.criteria.map((criterion) => {
          const colors = statusColors[criterion.status];
          return (
            <div
              key={criterion.name}
              className={`rounded-xl border border-border p-5 ${colors.bg} backdrop-blur-sm`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={colors.text}>{criterionIcons[criterion.name] || <Globe className="w-5 h-5" />}</span>
                  <span className="font-semibold text-sm">{criterion.name}</span>
                </div>
                <span className={`text-2xl font-black ${colors.text}`}>{criterion.score}</span>
              </div>
              {/* Score bar */}
              <div className="w-full h-2 rounded-full bg-muted/30 mb-3">
                <div
                  className={`h-full rounded-full ${colors.bar} transition-all duration-700`}
                  style={{ width: `${criterion.score * 10}%` }}
                />
              </div>
              <p className="text-xs text-foreground/80 mb-1">
                <strong>Finding:</strong> {criterion.finding}
              </p>
              <p className="text-xs text-muted-foreground">
                <strong>Fix:</strong> {criterion.recommendation}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
