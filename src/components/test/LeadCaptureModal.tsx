import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Phone, Mail, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LeadFormData, TestResult, Answer } from '@/types/test';
import { saveUserData } from '@/firebase/userService';
import { toast } from '@/hooks/use-toast';

interface LeadCaptureModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: LeadFormData) => void;
  result: TestResult | null;
  answers: Answer[];
}

export function LeadCaptureModal({ open, onOpenChange, onSubmit, result, answers }: LeadCaptureModalProps) {
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    whatsapp: '',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<LeadFormData>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateForm = (): boolean => {
    const newErrors: Partial<LeadFormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = 'WhatsApp number is required';
    } else if (!/^[+]?[\d\s-]{8,15}$/.test(formData.whatsapp.replace(/\s/g, ''))) {
      newErrors.whatsapp = 'Enter a valid phone number';
    }
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !result) return;
    
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      console.log('[LeadCaptureModal] Submitting form...');
      
      // Save to Firebase
      const userId = await saveUserData({
        name: formData.name,
        whatsapp: formData.whatsapp,
        email: formData.email || undefined,
        result,
        answers: answers as unknown as Record<string, unknown>[],
      });
      
      console.log('[LeadCaptureModal] ✅ Data saved with id:', userId);
      
      toast({
        title: "Profile saved!",
        description: "Your speech profile has been saved successfully.",
      });

      setSubmitError(null);
      onSubmit(formData);
    } catch (error: any) {
      console.error('[LeadCaptureModal] ❌ Error:', error);
      const errorMsg = error?.message || 'There was an error saving your data. Please check the console for details.';
      setSubmitError(errorMsg);
      toast({
        title: "Error",
        description: errorMsg,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.1 }}
            className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4"
          >
            <Sparkles className="w-8 h-8 text-primary" />
          </motion.div>
          <DialogTitle className="text-2xl">Almost there! 🎉</DialogTitle>
          <DialogDescription className="text-base">
            Enter your details to unlock your personalized speech profile and get your report on WhatsApp.
          </DialogDescription>
        </DialogHeader>

        {submitError && (
          <div className="mb-4 p-3 rounded border border-destructive/30 bg-destructive/5 text-destructive text-sm flex gap-2">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-medium">Error:</p>
              <p className="text-xs mt-1">{submitError}</p>
              <p className="text-xs mt-2 opacity-70">Check browser console (F12) for details</p>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Your Name *
            </Label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className={errors.name ? 'border-destructive' : ''}
            />
            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="whatsapp" className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              WhatsApp Number *
            </Label>
            <Input
              id="whatsapp"
              type="tel"
              placeholder="+91 98765 43210"
              value={formData.whatsapp}
              onChange={(e) => setFormData(prev => ({ ...prev, whatsapp: e.target.value }))}
              className={errors.whatsapp ? 'border-destructive' : ''}
            />
            {errors.whatsapp && <p className="text-xs text-destructive">{errors.whatsapp}</p>}
            <p className="text-xs text-muted-foreground">We'll send your report to this number</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email (Optional)
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className={errors.email ? 'border-destructive' : ''}
            />
            {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
          </div>
          
          <Button 
            type="submit" 
            variant="hero" 
            size="lg" 
            className="w-full mt-6"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Get My Speech Profile
              </>
            )}
          </Button>
          
          <p className="text-xs text-center text-muted-foreground">
            Your data is secure and will not be shared with third parties.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
