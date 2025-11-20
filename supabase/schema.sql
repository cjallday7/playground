-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own profile
CREATE POLICY "Users can view own profile" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

-- Create linked_accounts table for platform integrations
CREATE TABLE IF NOT EXISTS public.linked_accounts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  platform TEXT NOT NULL, -- 'steam', 'xbox', 'playstation', 'nintendo'
  platform_user_id TEXT NOT NULL,
  platform_username TEXT,
  access_token TEXT, -- Encrypted in production
  refresh_token TEXT,
  token_expires_at TIMESTAMP WITH TIME ZONE,
  last_synced_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, platform)
);

-- Enable RLS on linked_accounts
ALTER TABLE public.linked_accounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own linked accounts" 
  ON public.linked_accounts FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own linked accounts" 
  ON public.linked_accounts FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own linked accounts" 
  ON public.linked_accounts FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own linked accounts" 
  ON public.linked_accounts FOR DELETE 
  USING (auth.uid() = user_id);

-- Create games table (cached game metadata from IGDB)
CREATE TABLE IF NOT EXISTS public.games (
  id BIGINT PRIMARY KEY, -- IGDB ID
  title TEXT NOT NULL,
  cover_url TEXT,
  release_date DATE,
  genres TEXT[], -- Array of genre names
  platforms TEXT[], -- Array of platform names
  developer TEXT,
  publisher TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_games table (user's owned games)
CREATE TABLE IF NOT EXISTS public.user_games (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  game_id BIGINT REFERENCES public.games(id) ON DELETE CASCADE NOT NULL,
  platform TEXT NOT NULL, -- Which platform they own it on
  playtime_minutes INTEGER DEFAULT 0,
  achievements_unlocked INTEGER DEFAULT 0,
  achievements_total INTEGER DEFAULT 0,
  status TEXT DEFAULT 'backlog', -- 'backlog', 'playing', 'completed', 'abandoned'
  last_played_at TIMESTAMP WITH TIME ZONE,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, game_id, platform)
);

-- Enable RLS on user_games
ALTER TABLE public.user_games ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own games" 
  ON public.user_games FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own games" 
  ON public.user_games FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own games" 
  ON public.user_games FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own games" 
  ON public.user_games FOR DELETE 
  USING (auth.uid() = user_id);

-- Function to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile when user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
