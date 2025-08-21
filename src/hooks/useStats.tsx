import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Stats {
  artistsCount: number;
  wallsCount: number;
  projectsCount: number;
}

export const useStats = () => {
  const [stats, setStats] = useState<Stats>({
    artistsCount: 0,
    wallsCount: 0,
    projectsCount: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch artists count
        const { count: artistsCount } = await supabase
          .from('artists')
          .select('*', { count: 'exact', head: true });

        // Fetch walls count  
        const { count: wallsCount } = await supabase
          .from('wall_owners')
          .select('*', { count: 'exact', head: true });

        // Fetch projects count
        const { count: projectsCount } = await supabase
          .from('projects')
          .select('*', { count: 'exact', head: true });

        setStats({
          artistsCount: artistsCount || 0,
          wallsCount: wallsCount || 0,
          projectsCount: projectsCount || 0
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        // Keep default values on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, isLoading };
};
