import { motion } from 'framer-motion';
import { Brain, Target, TrendingUp, Users, Award, MessageSquare } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Science-Backed Assessment',
    description: 'Based on SRPP™ and SASTS clinical screening protocols used by speech-language pathologists.',
  },
  {
    icon: Target,
    title: 'Identify Your Triggers',
    description: 'Discover which situations cause the most difficulty and learn strategies to manage them.',
  },
  {
    icon: TrendingUp,
    title: 'Personalized Action Plan',
    description: 'Get tailored daily exercises and weekly goals based on your unique speech profile.',
  },
  {
    icon: Users,
    title: 'Community Support',
    description: 'Join our Early Access community of people on the same journey with weekly group sessions.',
  },
  {
    icon: Award,
    title: 'Gamified Progress',
    description: 'Earn badges, track streaks, and celebrate milestones as you improve your fluency.',
  },
  {
    icon: MessageSquare,
    title: 'Daily Tips via WhatsApp',
    description: 'Receive daily micro-practices and motivation directly to your phone.',
  },
];

export function Features() {
  return (
    <section className="zlaqa-section bg-secondary/30">
      <div className="zlaqa-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            More than just a test
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            ZLAQA gives you the tools, community, and guidance to understand and improve your speech.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
