import { Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export const SuiteTestimonials = () => {
  const featured = testimonials[0];
  const supporting = testimonials.slice(1, 3);

  const getInitials = (name: string) =>
    name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <section id="testimonials" className="section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <p className="text-sm font-medium tracking-wide uppercase text-muted-foreground mb-4">
            Client results
          </p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            What Our <span className="text-gradient-warm">Clients</span> Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real results from real businesses in Calgary.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {/* Featured testimonial — spans 2 cols */}
          <div className="md:col-span-2 premium-card p-8 md:p-10">
            <div className="flex gap-0.5 mb-6">
              {[...Array(featured.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>

            <blockquote className="text-lg md:text-xl leading-relaxed mb-8 text-foreground/90">
              "{featured.quote}"
            </blockquote>

            <div className="flex items-center gap-4 pt-6 border-t border-[hsl(0_0%_100%/0.06)]">
              <div className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center text-sm font-heading font-bold text-muted-foreground">
                {getInitials(featured.author)}
              </div>
              <div>
                <p className="font-heading font-bold text-sm">{featured.author}</p>
                <p className="text-xs text-muted-foreground">{featured.role} · {featured.company}</p>
              </div>
            </div>
          </div>

          {/* Supporting testimonials */}
          <div className="flex flex-col gap-6">
            {supporting.map((testimonial, index) => (
              <div
                key={index}
                className="premium-card p-6 flex-1"
              >
                <div className="flex gap-0.5 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
                  ))}
                </div>

                <blockquote className="text-sm leading-relaxed mb-5 text-foreground/80">
                  "{testimonial.quote}"
                </blockquote>

                <div className="flex items-center gap-3 pt-4 border-t border-[hsl(0_0%_100%/0.06)]">
                  <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-xs font-heading font-bold text-muted-foreground">
                    {getInitials(testimonial.author)}
                  </div>
                  <div>
                    <p className="font-heading font-bold text-xs">{testimonial.author}</p>
                    <p className="text-[11px] text-muted-foreground">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
