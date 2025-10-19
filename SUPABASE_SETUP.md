# Supabase Setup Guide

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create an account
2. Create a new project
3. Wait for the database to be provisioned

## 2. Create Database Tables

Run these SQL commands in the Supabase SQL Editor:

```sql
-- Create friends table
CREATE TABLE friends (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  bio TEXT,
  starting_bid INTEGER NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create bids table
CREATE TABLE bids (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  friend_id UUID REFERENCES friends(id) ON DELETE CASCADE,
  bid_amount INTEGER NOT NULL,
  user_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable Row Level Security
ALTER TABLE friends ENABLE ROW LEVEL SECURITY;
ALTER TABLE bids ENABLE ROW LEVEL SECURITY;

-- Create policies (allow all for demo - adjust for production)
CREATE POLICY "Allow public read access on friends" ON friends
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert on friends" ON friends
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access on bids" ON bids
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert on bids" ON bids
  FOR INSERT WITH CHECK (true);
```

## 3. Add Sample Data (Optional)

```sql
INSERT INTO friends (name, age, bio, starting_bid, image_url) VALUES
  ('Alex', 25, 'Professional coffee drinker ☕', 50, 'https://i.pravatar.cc/400?img=12'),
  ('Jordan', 28, 'Will code for pizza 🍕', 75, 'https://i.pravatar.cc/400?img=33'),
  ('Sam', 23, 'Gym rat and meme lord 💪', 60, 'https://i.pravatar.cc/400?img=45'),
  ('Taylor', 26, 'Dog lover & adventure seeker 🐕', 80, 'https://i.pravatar.cc/400?img=20'),
  ('Morgan', 27, 'Netflix binger extraordinaire 📺', 55, 'https://i.pravatar.cc/400?img=29');
```

## 4. Get Your Credentials

1. Go to Project Settings > API
2. Copy your Project URL
3. Copy your anon/public key

## 5. Configure Your App

Create a `.env` file in the project root:

```
EXPO_PUBLIC_SUPABASE_URL=your_project_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

Then update `lib/supabase.js` to use these environment variables.
