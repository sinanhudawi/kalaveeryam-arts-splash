import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Navigation } from '@/components/Navigation';
import { supabase } from '@/integrations/supabase/client';
import { Team } from '@/types/database';
import { Trophy, Users, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedCounter } from '@/components/AnimatedCounter';

export default function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTeams();

    const channel = supabase
      .channel('teams-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'teams' }, () => {
        loadTeams();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadTeams = async () => {
    setLoading(true);
    const { data: teamsData } = await supabase
      .from('teams')
      .select('*')
      .order('name');

    if (teamsData) {
      const teamsWithPoints = await Promise.all(
        teamsData.map(async (team) => {
          const { data: results } = await supabase
            .from('results')
            .select('points, candidate:candidates!inner(team_id)')
            .eq('candidate.team_id', team.id);

          const totalPoints = results?.reduce((sum, r) => sum + r.points, 0) || 0;
          return { ...team, total_points: totalPoints };
        })
      );

      teamsWithPoints.sort((a, b) => (b.total_points || 0) - (a.total_points || 0));
      setTeams(teamsWithPoints);
    }
    setLoading(false);
  };

  const celebrate = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#10b981', '#f59e0b', '#ffffff'],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#10b981', '#f59e0b', '#ffffff'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  return (
    <div className="min-h-screen bg-gradient-watercolor">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 watercolor-text">
            Team Rankings
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Live leaderboard and team standings
          </p>

          <Button
            onClick={celebrate}
            className="bg-gradient-gold hover:shadow-gold"
            size="lg"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Celebrate
          </Button>
        </motion.div>

        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading teams...</p>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-4">
            {teams.map((team, index) => (
              <motion.div
                key={team.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className={`bg-card rounded-2xl p-8 shadow-soft hover:shadow-glow transition-all ${
                  index === 0 ? 'border-2 border-gold shadow-gold' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="text-5xl font-bold">
                      {index === 0 && <Trophy className="w-12 h-12 text-gold animate-float" />}
                      {index === 1 && <div className="text-gray-400">#2</div>}
                      {index === 2 && <div className="text-amber-700">#3</div>}
                      {index > 2 && <div className="text-muted-foreground">#{index + 1}</div>}
                    </div>
                    
                    <div>
                      <h2 className="text-3xl font-bold mb-2 watercolor-text">
                        {team.name}
                      </h2>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{team.leader_1}</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{team.leader_2}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-5xl font-bold gold-text">
                      <AnimatedCounter value={team.total_points || 0} />
                    </div>
                    <div className="text-sm text-muted-foreground">points</div>
                  </div>
                </div>
              </motion.div>
            ))}

            {teams.length === 0 && (
              <div className="text-center py-16">
                <Users className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No teams found</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
