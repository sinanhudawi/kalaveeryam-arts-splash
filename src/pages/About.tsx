import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { Music, Palette, Trophy, Heart } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-watercolor">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-8 watercolor-text text-center">
            About Kalaveeryam
          </h1>

          <div className="bg-card rounded-2xl p-8 shadow-soft mb-8">
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Kalaveeryam is the annual arts festival of MIAC (Malabar Islamic Arts & Culture), 
              celebrating the vibrant talents and creative expressions of students through various 
              artistic competitions and performances.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-start space-x-4 p-4 rounded-xl bg-accent/50"
              >
                <Music className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-bold mb-2">Musical Excellence</h3>
                  <p className="text-sm text-muted-foreground">
                    Showcasing diverse musical talents from traditional to contemporary
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-start space-x-4 p-4 rounded-xl bg-accent/50"
              >
                <Palette className="w-8 h-8 text-gold flex-shrink-0" />
                <div>
                  <h3 className="font-bold mb-2">Visual Arts</h3>
                  <p className="text-sm text-muted-foreground">
                    Celebrating creativity through painting, calligraphy, and design
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-start space-x-4 p-4 rounded-xl bg-accent/50"
              >
                <Trophy className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-bold mb-2">Competitive Spirit</h3>
                  <p className="text-sm text-muted-foreground">
                    Fostering healthy competition and recognizing outstanding achievements
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-start space-x-4 p-4 rounded-xl bg-accent/50"
              >
                <Heart className="w-8 h-8 text-gold flex-shrink-0" />
                <div>
                  <h3 className="font-bold mb-2">Community Unity</h3>
                  <p className="text-sm text-muted-foreground">
                    Bringing together students, faculty, and families in celebration
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="bg-card rounded-2xl p-8 shadow-soft">
            <h2 className="text-2xl font-bold mb-4 watercolor-text">Our Teams</h2>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-accent/50">
                <h3 className="font-bold text-lg mb-2">Team SEJLUK</h3>
                <p className="text-sm text-muted-foreground">
                  Led by Muhammed Sinan V and Mehbin
                </p>
              </div>
              <div className="p-4 rounded-xl bg-accent/50">
                <h3 className="font-bold text-lg mb-2">Team MAMLUK</h3>
                <p className="text-sm text-muted-foreground">
                  Led by HUWAIS and Suhan
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
