import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { supabase } from '@/integrations/supabase/client';
import { Result } from '@/types/database';
import { Trophy, Medal, Award, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function Results() {
  const [results, setResults] = useState<Result[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResults();

    const channel = supabase
      .channel('results-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'results' }, () => {
        loadResults();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadResults = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('results')
      .select(`
        *,
        event:events(*),
        candidate:candidates(*, team:teams(*))
      `)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setResults(data as Result[]);
    }
    setLoading(false);
  };

  const filteredResults = results.filter(
    (result) =>
      result.event?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.candidate?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.candidate?.team?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="w-6 h-6 text-gold" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-700" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center font-bold">{position}</span>;
    }
  };

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
            Results Portal
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Live results and rankings from all events
          </p>

          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search events, candidates, or teams..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-card"
            />
          </div>
        </motion.div>

        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading results...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredResults.map((result, index) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className="bg-card rounded-xl p-6 shadow-soft hover:shadow-glow transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {getPositionIcon(result.position)}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{result.event?.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {result.candidate?.name} • {result.candidate?.team?.name}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold gold-text">{result.points}</div>
                    <div className="text-sm text-muted-foreground">points</div>
                  </div>
                </div>
              </motion.div>
            ))}

            {filteredResults.length === 0 && (
              <div className="text-center py-16">
                <Trophy className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No results found</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
