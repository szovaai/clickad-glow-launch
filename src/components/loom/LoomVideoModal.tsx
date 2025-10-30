import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    trakrly?: {
      track: (eventName: string, properties?: Record<string, any>) => void;
    };
  }
}

interface LoomVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  loomEmbedId: string;
  industry?: string;
  quickWins: string[];
}

export function LoomVideoModal({
  isOpen,
  onClose,
  title,
  loomEmbedId,
  industry,
  quickWins,
}: LoomVideoModalProps) {
  useEffect(() => {
    if (isOpen && window.trakrly) {
      window.trakrly.track("loom_video_played", {
        video_title: title,
        industry: industry || "unknown",
      });
    }
  }, [isOpen, title, industry]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <DialogTitle className="text-2xl">{title}</DialogTitle>
            {industry && <Badge variant="outline">{industry}</Badge>}
          </div>
          <DialogDescription>
            Watch this 60-second audit to see the improvements we'd make
          </DialogDescription>
        </DialogHeader>

        {/* Loom Video Embed */}
        <div className="aspect-video w-full rounded-lg overflow-hidden bg-black">
          <iframe
            src={`https://www.loom.com/embed/${loomEmbedId}?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true`}
            frameBorder="0"
            allowFullScreen
            className="w-full h-full"
            title={title}
          />
        </div>

        {/* Quick Wins List */}
        {quickWins.length > 0 && (
          <div className="space-y-3 mt-4">
            <h3 className="font-semibold text-lg">Quick Wins Identified:</h3>
            <ul className="space-y-2">
              {quickWins.map((win, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-primary font-bold text-lg mt-0.5">✓</span>
                  <span className="text-muted-foreground">{win}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA */}
        <div className="mt-6 p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
          <h3 className="font-semibold text-xl mb-2">
            Want Your Free Website Audit?
          </h3>
          <p className="text-muted-foreground mb-4">
            I'll record a personalized 60-second Loom video showing exactly what to fix on your website.
          </p>
          <Button 
            asChild 
            variant="glow" 
            size="lg" 
            className="w-full"
            onClick={() => {
              if (window.trakrly) {
                window.trakrly.track("loom_cta_clicked", {
                  source: "video_modal",
                  video_title: title,
                });
              }
            }}
          >
            <Link to="/audit?utm_source=loom-library&utm_medium=video-modal&utm_campaign=audit">
              Get Your Free Audit
            </Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
