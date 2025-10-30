import { Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface LoomVideoCardProps {
  title: string;
  loomEmbedId: string;
  industry?: string;
  quickWins: string[];
  featured?: boolean;
  onClick: () => void;
}

export function LoomVideoCard({
  title,
  industry,
  quickWins,
  featured,
  onClick,
}: LoomVideoCardProps) {
  return (
    <Card 
      className={`group cursor-pointer hover:shadow-lg transition-all duration-300 ${
        featured ? 'ring-2 ring-primary' : ''
      }`}
      onClick={onClick}
    >
      <CardContent className="p-0">
        {/* Video Thumbnail */}
        <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors" />
          <Play className="h-16 w-16 text-white relative z-10 group-hover:scale-110 transition-transform" />
          {featured && (
            <Badge className="absolute top-3 right-3 z-10">Featured</Badge>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
            {industry && (
              <Badge variant="outline" className="shrink-0 text-xs">
                {industry}
              </Badge>
            )}
          </div>

          {quickWins.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Quick Wins:</p>
              <ul className="space-y-1">
                {quickWins.slice(0, 2).map((win, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span className="line-clamp-1">{win}</span>
                  </li>
                ))}
                {quickWins.length > 2 && (
                  <li className="text-sm text-primary font-medium">
                    +{quickWins.length - 2} more improvement{quickWins.length - 2 !== 1 ? 's' : ''}
                  </li>
                )}
              </ul>
            </div>
          )}

          <button className="w-full mt-4 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-md transition-colors font-medium text-sm">
            Watch Audit
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
