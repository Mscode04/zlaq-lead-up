import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
    >
      <div className="zlaqa-container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          {/* <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">Z</span>
          </div> */}
          <span className="font-bold text-xl text-foreground">ZLAQA</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Home
          </Link>
          <Link to="/test" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Take Test
          </Link>
          <Link to="/community" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Community
          </Link>
        </nav>
      </div>
    </motion.header>
  );
}
