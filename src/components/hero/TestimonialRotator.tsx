import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { testimonials, Testimonial } from "@/data/testimonials";
import { motion, AnimatePresence } from "framer-motion";

export const TestimonialRotator = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const current: Testimonial = testimonials[currentIndex];

  return (
    <div className="relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <div className="flex justify-center gap-1 mb-3">
            {[...Array(current.rating)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-primary text-primary" />
            ))}
          </div>
          
          <blockquote className="text-lg font-medium text-foreground">
            "{current.quote}"
          </blockquote>
          
          <div className="text-sm text-muted-foreground">
            <div className="font-semibold text-foreground">{current.author}</div>
            <div>{current.role}, {current.company}</div>
            <div>{current.location}</div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-primary w-8"
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
            aria-label={`View testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
