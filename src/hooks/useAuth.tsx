import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  userType: 'artist' | 'wall_owner' | null;
  isLoading: boolean;
  signUp: (email: string, password: string, fullName: string, type: 'artist' | 'wall_owner') => Promise<{ error?: any }>;
  signIn: (email: string, password: string) => Promise<{ error?: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userType, setUserType] = useState<'artist' | 'wall_owner' | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);

        if (session?.user) {
          // Determine user type based on profile or default to artist
          setTimeout(() => {
            checkUserType(session.user.id);
          }, 0);
        } else {
          setUserType(null);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        checkUserType(session.user.id);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkUserType = async (userId: string) => {
    try {
      // Check if user exists in artists table
      const { data: artistData } = await supabase
        .from('artists')
        .select('id')
        .eq('id', userId)
        .single();

      if (artistData) {
        setUserType('artist');
        return;
      }

      // Check if user exists in wall_owners table
      const { data: wallOwnerData } = await supabase
        .from('wall_owners')
        .select('id')
        .eq('id', userId)
        .single();

      if (wallOwnerData) {
        setUserType('wall_owner');
        return;
      }

      // Default to null if not found in either table
      setUserType(null);
    } catch (error) {
      console.error('Error checking user type:', error);
      setUserType(null);
    }
  };

  const signUp = async (email: string, password: string, fullName: string, type: 'artist' | 'wall_owner') => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: fullName,
            user_type: type
          }
        }
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Erreur d'inscription",
          description: error.message
        });
        return { error };
      }

      if (data.user) {
        // Create profile in respective table
        if (type === 'artist') {
          await supabase.from('artists').insert({
            id: data.user.id,
            name: fullName,
            contact_email: email
          });
        } else {
          await supabase.from('wall_owners').insert({
            id: data.user.id,
            Name: fullName,
            contact_email: email,
            surface_type: 'béton',
            owner_type: 'individuel',
            indoor: false,
            height_m: 3,
            width_m: 4,
            location_postal_code: '75000'
          });
        }

        // Also create general profile
        await supabase.from('profiles').insert({
          id: data.user.id,
          email: email,
          nom_complet: fullName
        });

        toast({
          title: "Inscription réussie",
          description: "Vérifiez votre email pour confirmer votre compte."
        });
      }

      return { error: null };
    } catch (error) {
      console.error('Sign up error:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de l'inscription."
      });
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Erreur de connexion",
          description: error.message
        });
        return { error };
      }

      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur WXLLSPACE !"
      });

      return { error: null };
    } catch (error) {
      console.error('Sign in error:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la connexion."
      });
      return { error };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUserType(null);
      toast({
        title: "Déconnexion",
        description: "À bientôt sur WXLLSPACE !"
      });
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        userType,
        isLoading,
        signUp,
        signIn,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};