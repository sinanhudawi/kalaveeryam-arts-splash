import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Trophy, Users, Lock, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/home', label: 'Home', icon: Home },
    { path: '/results', label: 'Results', icon: Trophy },
    { path: '/teams', label: 'Teams', icon: Users },
    { path: '/admin', label: 'Admin', icon: Lock },
    { path: '/about', label: 'About', icon: Info },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-40 bg-card/90 backdrop-blur-lg border-b border-border shadow-soft"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/home" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <img src="/logo.png" alt="Kalaveeryam" className="w-10 h-10 no-pointer-events" />
            </motion.div>
            <span className="font-bold text-xl watercolor-text hidden md:block">
              Kalaveeryam
            </span>
          </Link>

          <div className="flex items-center space-x-1 md:space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link key={item.path} to={item.path}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "flex items-center space-x-2 px-3 md:px-4 py-2 rounded-lg transition-all",
                      isActive
                        ? "bg-gradient-primary text-white shadow-glow"
                        : "text-foreground hover:bg-accent"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden md:inline text-sm font-medium">
                      {item.label}
                    </span>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};
