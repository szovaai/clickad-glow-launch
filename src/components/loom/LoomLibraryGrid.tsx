import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { LoomVideoCard } from "./LoomVideoCard";
import { LoomVideoModal } from "./LoomVideoModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

interface LoomVideo {
  id: string;
  title: string;
  loom_url: string;
  loom_embed_id: string;
  industry: string | null;
  company_type: string | null;
  quick_wins: string[];
  featured: boolean;
}

export function LoomLibraryGrid() {
  const [videos, setVideos] = useState<LoomVideo[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<LoomVideo[]>([]);
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all");
  const [selectedVideo, setSelectedVideo] = useState<LoomVideo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchVideos();
  }, []);

  useEffect(() => {
    if (selectedIndustry === "all") {
      setFilteredVideos(videos);
    } else {
      setFilteredVideos(
        videos.filter((video) => video.industry === selectedIndustry)
      );
    }
  }, [selectedIndustry, videos]);

  const fetchVideos = async () => {
    try {
      const { data, error } = await supabase
        .from("loom_videos")
        .select("*")
        .order("featured", { ascending: false })
        .order("published_at", { ascending: false });

      if (error) throw error;
      setVideos(data || []);
      setFilteredVideos(data || []);
    } catch (error) {
      console.error("Error fetching Loom videos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const industries = Array.from(
    new Set(videos.map((v) => v.industry).filter(Boolean))
  ) as string[];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground text-lg">
          No audit videos available yet. Check back soon!
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Filter */}
      <div className="mb-8 flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {filteredVideos.length} Audit{filteredVideos.length !== 1 ? "s" : ""}
        </h2>
        <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Industries</SelectItem>
            {industries.map((industry) => (
              <SelectItem key={industry} value={industry}>
                {industry}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Grid */}
      {filteredVideos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No videos found for this industry filter.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <LoomVideoCard
              key={video.id}
              title={video.title}
              loomEmbedId={video.loom_embed_id}
              industry={video.industry || undefined}
              quickWins={video.quick_wins}
              featured={video.featured}
              onClick={() => setSelectedVideo(video)}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedVideo && (
        <LoomVideoModal
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
          title={selectedVideo.title}
          loomEmbedId={selectedVideo.loom_embed_id}
          industry={selectedVideo.industry || undefined}
          quickWins={selectedVideo.quick_wins}
        />
      )}
    </>
  );
}
