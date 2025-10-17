import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export default function Admin() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  const handleLogin = () => {
    if (password === 'shanukpshan1') {
      setIsAuthenticated(true);
      toast({
        title: "Access Granted",
        description: "Welcome to the admin portal",
      });
    } else {
      toast({
        title: "Access Denied",
        description: "Incorrect password",
        variant: "destructive",
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-watercolor">
        <Navigation />
        
        <main className="container mx-auto px-4 pt-24 pb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto bg-card rounded-2xl p-8 shadow-soft"
          >
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold mb-2 watercolor-text">Admin Portal</h1>
              <p className="text-muted-foreground">Enter password to continue</p>
            </div>

            <div className="space-y-4">
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                className="bg-background"
              />
              <Button
                onClick={handleLogin}
                className="w-full bg-gradient-primary hover:shadow-glow"
              >
                Login
              </Button>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-watercolor">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 watercolor-text">
            Admin Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage teams, candidates, events, and results
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            className="bg-card rounded-xl p-6 shadow-soft hover:shadow-glow transition-all cursor-pointer"
          >
            <h3 className="text-xl font-bold mb-2">Teams Management</h3>
            <p className="text-sm text-muted-foreground">Add, edit, or remove teams</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="bg-card rounded-xl p-6 shadow-soft hover:shadow-glow transition-all cursor-pointer"
          >
            <h3 className="text-xl font-bold mb-2">Candidates Management</h3>
            <p className="text-sm text-muted-foreground">Manage candidate profiles</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="bg-card rounded-xl p-6 shadow-soft hover:shadow-glow transition-all cursor-pointer"
          >
            <h3 className="text-xl font-bold mb-2">Events Management</h3>
            <p className="text-sm text-muted-foreground">Create and manage events</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            className="bg-card rounded-xl p-6 shadow-soft hover:shadow-glow transition-all cursor-pointer"
          >
            <h3 className="text-xl font-bold mb-2">Results Management</h3>
            <p className="text-sm text-muted-foreground">Add and update results</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            className="bg-card rounded-xl p-6 shadow-soft hover:shadow-glow transition-all cursor-pointer"
          >
            <h3 className="text-xl font-bold mb-2">Media Upload</h3>
            <p className="text-sm text-muted-foreground">Upload images and files</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            className="bg-card rounded-xl p-6 shadow-soft hover:shadow-glow transition-all cursor-pointer"
          >
            <h3 className="text-xl font-bold mb-2">Settings</h3>
            <p className="text-sm text-muted-foreground">Change password and settings</p>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
