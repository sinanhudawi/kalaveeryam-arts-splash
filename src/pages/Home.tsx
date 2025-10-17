import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { supabase } from '@/integrations/supabase/client';
import { Trophy, Users, Calendar, Award } from 'lucide-react';

export default function Home() {
  const [stats, setStats] = useState({
    teams: 0,
    candidates: 0,
    events: 0,
    categories: 0,
  });

  useEffect(() => {
    loadStats();

    const channel = supabase
      .channel('stats-changes')
      .on('postgres_changes', { event: '*', schema: 'public' }, () => {
        loadStats();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadStats = async () => {
    const [teamsRes, candidatesRes, eventsRes] = await Promise.all([
      supabase.from('teams').select('id', { count: 'exact', head: true }),
      supabase.from('candidates').select('id', { count: 'exact', head: true }),
      supabase.from('events').select('id, category', { count: 'exact' }),
    ]);

    const uniqueCategories = new Set(
      eventsRes.data?.map((e) => e.category) || []
    );

    setStats({
      teams: teamsRes.count || 0,
      candidates: candidatesRes.count || 0,
      events: eventsRes.count || 0,
      categories: uniqueCategories.size,
    });
  };

  const statCards = [
    { icon: Users, label: 'Teams', value: stats.teams, color: 'primary' },
    { icon: Award, label: 'Candidates', value: stats.candidates, color: 'gold' },
    { icon: Calendar, label: 'Events', value: stats.events, color: 'primary-glow' },
    { icon: Trophy, label: 'Categories', value: stats.categories, color: 'gold' },
  ];

  return (
    <div className="min-h-screen bg-gradient-watercolor">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="relative inline-block mb-8">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-32 h-32 md:w-48 md:h-48 mx-auto bg-gradient-primary rounded-full flex items-center justify-center shadow-glow"
            >
              <Trophy className="w-16 h-16 md:w-24 md:h-24 text-white animate-float" />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center"
            >
              <Award className="w-6 h-6 text-white" />
            </motion.div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 watercolor-text">
            Kalaveeryam 2025
          </h1>
          <p className="text-2xl md:text-3xl mb-4 gold-text font-semibold">
            MIAC Arts Festival
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Celebrating creativity, talent, and excellence through art, music, and performance
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-glow transition-all"
              >
                <div className={`w-12 h-12 bg-gradient-${stat.color} rounded-full flex items-center justify-center mb-4 mx-auto`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-4xl font-bold mb-2 watercolor-text">
                  <AnimatedCounter value={stat.value} />
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <h2 className="text-3xl font-bold mb-8 watercolor-text">
            Explore the Festival
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.a
              href="/results"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-primary text-white rounded-full font-semibold shadow-glow hover:shadow-gold transition-all"
            >
              View Results
            </motion.a>
            <motion.a
              href="/teams"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-gold text-white rounded-full font-semibold shadow-gold hover:shadow-glow transition-all"
            >
              Team Rankings
            </motion.a>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
