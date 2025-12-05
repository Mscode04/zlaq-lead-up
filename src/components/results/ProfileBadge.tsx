import { motion } from 'framer-motion';
import { Award, Star, Zap, Shield } from 'lucide-react';
import { TierType } from '@/types/test';

interface ProfileBadgeProps {
  tier: TierType;
}

const tierConfig: Record<TierType, { icon: typeof Award; color: string; bg: string }> = {
  Explorer: { icon: Star, color: 'text-primary', bg: 'bg-primary/10' },
  Challenger: { icon: Zap, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  Responder: { icon: Award, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  Founder: { icon: Shield, color: 'text-red-500', bg: 'bg-red-500/10' },
};

export function ProfileBadge({ tier }: ProfileBadgeProps) {
  const { icon: Icon, color, bg } = tierConfig[tier];

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.3 }}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${bg} border border-current/20`}
    >
      <Icon className={`w-5 h-5 ${color}`} />
      <span className={`font-semibold ${color}`}>{tier} Tier</span>
    </motion.div>
  );
}
