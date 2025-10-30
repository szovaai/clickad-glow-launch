import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { LoomVideoModal } from "./loom/LoomVideoModal";

interface FeaturedVideo {
  id: string;
  title: string;
  loom_embed_id: string;
  industry: string | null;
  quick_wins: string[];
}

export const Results = () => {
  const [featuredVideo, setFeaturedVideo] = useState<FeaturedVideo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchFeaturedVideo();
  }, []);

  const fetchFeaturedVideo = async () => {
    try {
      const { data, error } = await supabase
        .from("loom_videos")
        .select("id, title, loom_embed_id, industry, quick_wins")
        .eq("featured", true)
        .limit(1)
        .single();

      if (error) throw error;
      setFeaturedVideo(data);
    } catch (error) {
      console.error("Error fetching featured video:", error);
    }
  };

  if (!featuredVideo) return null;

  return (
    <section className="py-20 border-t bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4">See Me In Action</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Watch a 60-Second Audit
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              I find quick wins in every website I review. Here's a real example.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Video Preview */}
            <div
              className="relative aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 cursor-pointer group"
              onClick={() => setIsModalOpen(true)}
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex items-center justify-center">
                <Play className="h-20 w-20 text-white group-hover:scale-110 transition-transform" />
              </div>
              <Badge className="absolute top-4 left-4">Featured Audit</Badge>
              {featuredVideo.industry && (
                <Badge variant="outline" className="absolute top-4 right-4 bg-background/80">
                  {featuredVideo.industry}
                </Badge>
              )}
            </div>

            {/* Content */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-3">{featuredVideo.title}</h3>
                {featuredVideo.quick_wins.length > 0 && (
                  <div className="space-y-2">
                    <p className="font-medium text-muted-foreground">Quick Wins Identified:</p>
                    <ul className="space-y-2">
                      {featuredVideo.quick_wins.slice(0, 3).map((win, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary font-bold text-lg mt-0.5">✓</span>
                          <span className="text-muted-foreground">{win}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <Button
                  variant="glow"
                  size="lg"
                  className="w-full"
                  onClick={() => setIsModalOpen(true)}
                >
                  Watch This Audit
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full"
                  asChild
                >
                  <Link to="/loom-library">
                    See All Audit Videos
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {featuredVideo && (
        <LoomVideoModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={featuredVideo.title}
          loomEmbedId={featuredVideo.loom_embed_id}
          industry={featuredVideo.industry || undefined}
          quickWins={featuredVideo.quick_wins}
        />
      )}
    </section>
  );
};
