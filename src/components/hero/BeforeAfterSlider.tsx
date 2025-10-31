import { useState } from "react";
import { ArrowRight, TrendingUp } from "lucide-react";
import trucanPower from "@/assets/portfolio/truecan-power.png";

export const BeforeAfterSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number, rect: DOMRect) => {
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove(e.clientX, rect);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove(e.touches[0].clientX, rect);
  };

  return (
    <section className="py-24 bg-background">
      <div className="container px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 glow-text">
            See The Transformation
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real results from real Calgary businesses
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div
            className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-border select-none cursor-ew-resize"
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
          >
            {/* Before Image (Full) */}
            <div className="absolute inset-0 bg-muted flex items-center justify-center">
              <div className="text-center p-8">
                <div className="text-6xl mb-4">😞</div>
                <h3 className="text-2xl font-bold mb-2">Before ClickAdMedia</h3>
                <p className="text-muted-foreground">Outdated, slow, no leads</p>
              </div>
            </div>

            {/* After Image (Clipped) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <img
                src={trucanPower}
                alt="TrueCan Power website after ClickAdMedia redesign"
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Slider Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-primary cursor-ew-resize z-10"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg glow-border">
                <ArrowRight className="w-6 h-6 text-primary-foreground" />
              </div>
            </div>

            {/* Labels */}
            <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-border">
              <span className="text-sm font-semibold">Before</span>
            </div>
            <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-border">
              <span className="text-sm font-semibold">After</span>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="text-center p-6 rounded-xl border border-border bg-card">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="w-6 h-6 text-primary" />
                <span className="text-3xl font-bold text-primary">210%</span>
              </div>
              <p className="text-sm text-muted-foreground">More Leads</p>
            </div>
            <div className="text-center p-6 rounded-xl border border-border bg-card">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="w-6 h-6 text-primary" />
                <span className="text-3xl font-bold text-primary">60 Days</span>
              </div>
              <p className="text-sm text-muted-foreground">To Full ROI</p>
            </div>
            <div className="text-center p-6 rounded-xl border border-border bg-card">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="w-6 h-6 text-primary" />
                <span className="text-3xl font-bold text-primary">+4.2%</span>
              </div>
              <p className="text-sm text-muted-foreground">Conversion Rate</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-lg font-semibold mb-2">TrueCan Power — Electrical Services</p>
            <p className="text-muted-foreground">
              "Our phone hasn't stopped ringing. This website paid for itself in the first month."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
