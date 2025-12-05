import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Clock, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.08),transparent_50%),radial-gradient(circle_at_70%_80%,hsl(var(--primary)/0.05),transparent_50%)]" />
      
      <div className="zlaqa-container relative z-10 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
          >
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">
              Science-backed screening • SRPP™ & SASTS validated
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6"
          >
            Discover your{' '}
            <span className="relative">
              <span className="relative z-10">Speech Profile</span>
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute bottom-2 left-0 h-3 bg-primary/30 -z-0"
              />
            </span>
            <br />
            in 1 minutes
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            A science-backed test that maps your triggers, risk level, and daily exercises.
            Join ZLAQA Early Access for the full program.
          </motion.p>

          {/* No Audio Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-6 mb-10"
          >
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mic className="w-5 h-5 text-destructive" />
              <span className="text-sm font-medium line-through">No voice recording</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">1-2 minutes</span>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/test">
              <Button variant="hero" size="xl" className="group">
                Take the Free 1-min Test
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/community">
              <Button variant="hero-outline" size="xl">
                Join Early Access
              </Button>
            </Link>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-16 pt-8 border-t border-border"
          >
            <p className="text-sm text-muted-foreground mb-4">
              Developed from clinical practice & validated screening items used in speech-language pathology.
            </p>
            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">12</p>
                <p className="text-xs text-muted-foreground">Questions</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">3</p>
                <p className="text-xs text-muted-foreground">Score Metrics</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">5</p>
                <p className="text-xs text-muted-foreground">Profile Types</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1 }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
      />
    </section>
  );
}
