-- Enable Row Level Security on tables that don't have it
ALTER TABLE public.artists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wall_owners ENABLE ROW LEVEL SECURITY;

-- Create proper RLS policies for artists table
CREATE POLICY "Artists can view their own profile" 
ON public.artists 
FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Artists can update their own profile" 
ON public.artists 
FOR UPDATE 
USING (auth.uid() = id);

CREATE POLICY "Artists can insert their own profile" 
ON public.artists 
FOR INSERT 
WITH CHECK (auth.uid() = id);

CREATE POLICY "Public can view visible artists" 
ON public.artists 
FOR SELECT 
USING (visibility = true);

-- Create proper RLS policies for wall_owners table
CREATE POLICY "Wall owners can view their own profile" 
ON public.wall_owners 
FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Wall owners can update their own profile" 
ON public.wall_owners 
FOR UPDATE 
USING (auth.uid() = id);

CREATE POLICY "Wall owners can insert their own profile" 
ON public.wall_owners 
FOR INSERT 
WITH CHECK (auth.uid() = id);

CREATE POLICY "Public can view visible walls" 
ON public.wall_owners 
FOR SELECT 
USING (visibility = true);

-- Fix overly permissive policies on artist_projects
DROP POLICY IF EXISTS "Artists can manage their own projects" ON public.artist_projects;
CREATE POLICY "Artists can manage their own projects" 
ON public.artist_projects 
FOR ALL 
USING (auth.uid() = artist_id)
WITH CHECK (auth.uid() = artist_id);

-- Fix overly permissive policies on projects
DROP POLICY IF EXISTS "Authenticated users can manage projects" ON public.projects;
CREATE POLICY "Users can view projects they're involved in" 
ON public.projects 
FOR SELECT 
USING (
  auth.uid() = artist_id OR 
  auth.uid() = wall_owner_id OR 
  EXISTS (SELECT 1 FROM public.artists WHERE id = auth.uid()) OR
  EXISTS (SELECT 1 FROM public.wall_owners WHERE id = auth.uid())
);

CREATE POLICY "Artists can update their projects" 
ON public.projects 
FOR UPDATE 
USING (auth.uid() = artist_id);

CREATE POLICY "Wall owners can update their projects" 
ON public.projects 
FOR UPDATE 
USING (auth.uid() = wall_owner_id);

CREATE POLICY "Users can create projects" 
ON public.projects 
FOR INSERT 
WITH CHECK (
  auth.uid() = artist_id OR 
  auth.uid() = wall_owner_id
);

-- Secure database functions with fixed search_path
CREATE OR REPLACE FUNCTION public.calculate_artist_stats(artist_uuid uuid)
RETURNS TABLE(avg_rating numeric, total_reviews integer, completed_projects integer)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  RETURN QUERY
  SELECT 
    COALESCE(AVG(r.rating::DECIMAL), 0.0)::DECIMAL(3,2) as avg_rating,
    COUNT(r.id)::INTEGER as total_reviews,
    (SELECT COUNT(*)::INTEGER FROM public.projects p WHERE p.artist_id = artist_uuid AND p.status = 'completed') as completed_projects
  FROM public.reviews r
  WHERE r.artist_id = artist_uuid;
END;
$function$;

CREATE OR REPLACE FUNCTION public.calculate_artist_rating(artist_uuid uuid)
RETURNS numeric
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  avg_rating DECIMAL(3,2);
BEGIN
  SELECT COALESCE(AVG(rating::DECIMAL), 4.8) INTO avg_rating
  FROM public.reviews
  WHERE artist_id = artist_uuid;
  
  RETURN avg_rating;
END;
$function$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth
AS $function$
BEGIN
  INSERT INTO public.profiles (id, email, nom_complet)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'nom_complet', NEW.email));
  RETURN NEW;
END;
$function$;