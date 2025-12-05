import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CTA() {
  return (
    <section className="zlaqa-section relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-foreground" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.2),transparent_70%)]" />
      
      <div className="zlaqa-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Early Access Now Open</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-background mb-6">
            Ready to understand your speech patterns?
          </h2>
          
          <p className="text-lg text-background/70 mb-10 max-w-xl mx-auto">
            Take the free assessment and join our community of people working towards 
            confident, fluent communication.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/test">
              <Button 
                size="xl" 
                className="group bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Start Free Assessment
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <p className="text-sm text-background/50">
              No credit card • No audio recording • 2 minutes
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
