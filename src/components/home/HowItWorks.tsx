import { motion } from 'framer-motion';
import { ClipboardCheck, BarChart3, Rocket, Users } from 'lucide-react';

const steps = [
  {
    icon: ClipboardCheck,
    number: '01',
    title: 'Take the Test',
    description: 'Answer 12 quick questions about your speech patterns. No audio recording needed.',
  },
  {
    icon: BarChart3,
    number: '02',
    title: 'Get Your Profile',
    description: 'Receive instant results with your risk score, emotional patterns, and strengths.',
  },
  {
    icon: Rocket,
    number: '03',
    title: 'Start Practicing',
    description: 'Follow your personalized 7-day starter plan with daily micro-exercises.',
  },
  {
    icon: Users,
    number: '04',
    title: 'Join the Community',
    description: 'Connect with others, attend weekly sessions, and track your progress together.',
  },
];

export function HowItWorks() {
  return (
    <section className="zlaqa-section">
      <div className="zlaqa-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How it works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From assessment to action in just a few minutes.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-px bg-border" />
              )}
              
              <div className="relative z-10 text-center">
                <div className="w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 relative">
                  <step.icon className="w-10 h-10 text-primary" />
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-foreground text-background text-sm font-bold flex items-center justify-center">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
