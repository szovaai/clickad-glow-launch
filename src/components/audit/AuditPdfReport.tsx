import { forwardRef } from "react";
import type { AuditResult } from "./AuditScoreCard";
import logo from "@/assets/logo-clickad.png";

const statusLabel = { pass: "PASS", warning: "NEEDS WORK", fail: "FAILING" };
const statusColor = { pass: "#10b981", warning: "#f59e0b", fail: "#ef4444" };

export const AuditPdfReport = forwardRef<HTMLDivElement, { result: AuditResult }>(
  ({ result }, ref) => {
    const date = new Date(result.scannedAt).toLocaleDateString("en-US", {
      year: "numeric", month: "long", day: "numeric",
    });

    return (
      <div
        ref={ref}
        style={{
          width: 794,
          minHeight: 1123,
          padding: 48,
          backgroundColor: "#0f0f14",
          color: "#e4e4e7",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "absolute",
          left: "-9999px",
          top: 0,
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
          <img src={logo} alt="ClickAdMedia" style={{ height: 48 }} crossOrigin="anonymous" />
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, color: "#a1a1aa" }}>AI Website Audit Report</div>
            <div style={{ fontSize: 11, color: "#a1a1aa" }}>{date}</div>
          </div>
        </div>

        {/* Business Info */}
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: 0, color: "#fff" }}>{result.businessName}</h1>
          <div style={{ fontSize: 13, color: "#a1a1aa", marginTop: 4 }}>{result.url}</div>
          <div style={{ fontSize: 13, color: "#a1a1aa" }}>Industry: {result.industry}</div>
        </div>

        {/* Overall Grade */}
        <div style={{
          display: "flex", alignItems: "center", gap: 24, padding: 24,
          borderRadius: 16, border: "1px solid #27272a", marginBottom: 24,
          background: "linear-gradient(135deg, #18181b 0%, #1c1c22 100%)",
        }}>
          <div style={{
            width: 100, height: 100, borderRadius: "50%",
            border: `6px solid ${statusColor[result.overall_score >= 70 ? "pass" : result.overall_score >= 40 ? "warning" : "fail"]}`,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          }}>
            <div style={{ fontSize: 40, fontWeight: 900, color: "#fff", lineHeight: 1 }}>{result.overall_grade}</div>
            <div style={{ fontSize: 12, color: "#a1a1aa" }}>{result.overall_score}/100</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 8 }}>Overall Assessment</div>
            <div style={{ fontSize: 13, color: "#d4d4d8", lineHeight: 1.5 }}>{result.summary}</div>
          </div>
        </div>

        {/* Criteria */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {result.criteria.map((c) => (
            <div key={c.name} style={{
              padding: 16, borderRadius: 12,
              border: `1px solid ${statusColor[c.status]}33`,
              backgroundColor: `${statusColor[c.status]}0d`,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{c.name}</div>
                <div style={{
                  fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 6,
                  backgroundColor: `${statusColor[c.status]}22`,
                  color: statusColor[c.status],
                }}>
                  {c.score}/10 · {statusLabel[c.status]}
                </div>
              </div>
              {/* Bar */}
              <div style={{ width: "100%", height: 6, borderRadius: 3, backgroundColor: "#27272a", marginBottom: 8 }}>
                <div style={{
                  width: `${c.score * 10}%`, height: "100%", borderRadius: 3,
                  backgroundColor: statusColor[c.status],
                }} />
              </div>
              <div style={{ fontSize: 11, color: "#d4d4d8", marginBottom: 4 }}>
                <strong>Finding:</strong> {c.finding}
              </div>
              <div style={{ fontSize: 11, color: "#a1a1aa" }}>
                <strong>Recommendation:</strong> {c.recommendation}
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div style={{
          marginTop: 32, padding: 20, borderRadius: 12, textAlign: "center",
          background: "linear-gradient(135deg, #7c3aed22 0%, #3b82f622 100%)",
          border: "1px solid #7c3aed44",
        }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 4 }}>
            Want us to fix these issues?
          </div>
          <div style={{ fontSize: 13, color: "#a1a1aa" }}>
            Book a free strategy call at <strong style={{ color: "#818cf8" }}>clickadmedia.com</strong> · (825) 451-8117
          </div>
        </div>
      </div>
    );
  }
);

AuditPdfReport.displayName = "AuditPdfReport";
