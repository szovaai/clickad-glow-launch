import { motion } from "framer-motion";
import { Globe, SearchX, UserX, DollarSign } from "lucide-react";

const painPoints = [
  {
    icon: Globe,
    title: "Your website doesn't generate leads",
    description: "It looks nice, but visitors leave without ever contacting you.",
  },
  {
    icon: SearchX,
    title: "Invisible on Google",
    description: "Your competitors rank above you while you wait for referrals.",
  },
  {
    icon: UserX,
    title: "Leads leave without contacting you",
    description: "No chatbot, no instant response — they bounce to the next option.",
  },
  {
    icon: DollarSign,
    title: "Paying for ads that don't convert",
    description: "Traffic without a conversion system is just wasted budget.",
  },
];

export const PainSection = () => {
  return (
    <section className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Your Website Is Costing You{" "}
            <span className="glow-text">Money</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A pretty website without a lead system is just an expensive brochure.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {painPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-destructive/10 border border-destructive/30 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-destructive" />
                </div>
                <h3 className="text-lg font-bold mb-2">{point.title}</h3>
                <p className="text-muted-foreground text-sm">{point.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
