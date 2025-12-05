import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MessageCircle, Mail, CheckCircle2, Users, Calendar, Award, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useToast } from '@/hooks/use-toast';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';

const benefits = [
  { icon: Users, text: 'Join 500+ members on the same journey' },
  { icon: Calendar, text: 'Weekly live group sessions every Tuesday' },
  { icon: Award, text: 'Unlock your full PDF speech profile report' },
  { icon: MessageCircle, text: 'Daily practice tips via WhatsApp' },
];

const Community = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email && !phone) {
      toast({
        title: 'Please enter your email or phone',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      // Save to Firebase community collection
      await addDoc(collection(db, 'community'), {
        email: email || null,
        phone: phone || null,
        joinedAt: new Date().toISOString(),
      });

      console.log('[Community] Data saved to Firebase');
      setSubmitted(true);
      toast({
        title: 'Welcome to ZLAQA Early Access!',
        description: '',
      });
    } catch (error: any) {
      console.error('[Community] Error saving to Firebase:', error?.message || error);
      toast({
        title: 'Error',
        description: 'Failed to save your data. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-12">
        <div className="zlaqa-container">
          <div className="max-w-3xl mx-auto">
            {/* Hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">Early Access Community</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Join the ZLAQA Community
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Connect with others who stutter, access expert guidance, and get support 
                on your journey to confident communication.
              </p>
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid sm:grid-cols-2 gap-4 mb-12"
            >
              {benefits.map((benefit, index) => (
                <div
                  key={benefit.text}
                  className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-foreground font-medium">{benefit.text}</span>
                </div>
              ))}
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-3xl border border-border shadow-lg p-8 md:p-10"
            >
              {!submitted ? (
                <>
                  <h2 className="text-2xl font-bold text-foreground mb-2 text-center">
                    Get Early Access
                  </h2>
                  <p className="text-muted-foreground text-center mb-8">
                    Enter your email or phone to join.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email Address
                      </label>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-12"
                      />
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex-1 h-px bg-border" />
                      <span className="text-sm text-muted-foreground">or</span>
                      <div className="flex-1 h-px bg-border" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground flex items-center gap-2">
                        <MessageCircle className="w-4 h-4" />
                        WhatsApp Number
                      </label>
                      <Input
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="h-12"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      variant="hero" 
                      size="lg" 
                      className="w-full mt-6"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Joining...
                        </>
                      ) : (
                        <>
                          Join Early Access
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      By joining, you agree to receive updates from ZLAQA. 
                      We respect your privacy and will never share your data.
                    </p>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                    className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle2 className="w-10 h-10 text-primary" />
                  </motion.div>
                  
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    You're In! 🎉
                  </h2>
                  
                  <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                    Welcome to the ZLAQA Early Access community!
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                      href="https://chat.whatsapp.com/GJdRe8ZhIHBHwT3TiadtkL/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="default" size="lg" className="gap-2">
                        <MessageCircle className="w-5 h-5" />
                        Join WhatsApp Group
                      </Button>
                    </a>
                    <Link to="/">
                      <Button variant="outline" size="lg">
                        Back to Home
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Haven't taken test CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center mt-12 p-6 bg-secondary/50 rounded-2xl"
            >
              <p className="text-muted-foreground mb-4">
                Haven't taken the speech profile test yet?
              </p>
              <Link to="/test">
                <Button variant="outline" size="lg" className="gap-2">
                  Take the Free 2-min Test
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Community;
