# Friend Auction 💰

A Tinder-style swipe app for auctioning off your friends! Built with React Native and Expo.

## Features

- 🔥 Tinder-style swipe interface
- 💰 Bid on friends or pass
- 📊 Track your total bids
- 🎨 Smooth animations and gestures
- 📱 Works on iOS, Android, and Web

## Getting Started

### 1. Set up Supabase Backend

Follow the detailed instructions in `SUPABASE_SETUP.md` to:
- Create a Supabase project
- Set up database tables
- Get your API credentials

### 2. Configure the App

1. Open `lib/supabase.js`
2. Replace `YOUR_SUPABASE_URL` and `YOUR_SUPABASE_ANON_KEY` with your actual Supabase credentials

### 3. Run the App

```bash
npm start
```

Then press:
- `a` for Android
- `i` for iOS (macOS only)
- `w` for Web

## How to Use

- **Swipe Right** or tap the 💰 button to place a bid
- **Swipe Left** or tap the ✕ button to pass
- Watch your bid counter increase in the header

## Customization

Add friends directly in your Supabase database or use the SQL Editor:

```sql
INSERT INTO friends (name, age, bio, starting_bid, image_url) VALUES
  ('Your Friend', 25, 'Their bio', 50, 'https://your-image-url.com');
```

## Tech Stack

- React Native
- Expo
- Supabase (Backend & Database)
- react-native-gesture-handler
- react-native-reanimated

## Database Schema

**friends table:**
- id (UUID)
- name (TEXT)
- age (INTEGER)
- bio (TEXT)
- starting_bid (INTEGER)
- image_url (TEXT)
- created_at (TIMESTAMP)

**bids table:**
- id (UUID)
- friend_id (UUID, foreign key)
- bid_amount (INTEGER)
- user_id (TEXT)
- created_at (TIMESTAMP)
