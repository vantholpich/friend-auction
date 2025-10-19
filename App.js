import React, { useState, useEffect } from 'react';
import { StyleSheet, View, StatusBar, ActivityIndicator, Text } from 'react-native';
import SwipeCard from './components/SwipeCard';
import Header from './components/Header';
import ActionButtons from './components/ActionButtons';
import { supabase } from './lib/supabase';

export default function App() {
  const [friends, setFriends] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFriends();
    loadBids();
  }, []);

  const loadFriends = async () => {
    try {
      const { data, error } = await supabase
        .from('friends')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;

      // Transform data to match component expectations
      const transformedData = data.map(friend => ({
        id: friend.id,
        name: friend.name,
        age: friend.age,
        bio: friend.bio,
        startingBid: friend.starting_bid,
        image: friend.image_url,
      }));

      setFriends(transformedData);
    } catch (error) {
      console.error('Error loading friends:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadBids = async () => {
    try {
      const { data, error } = await supabase
        .from('bids')
        .select('*');

      if (error) throw error;
      setBids(data || []);
    } catch (error) {
      console.error('Error loading bids:', error);
    }
  };

  const handleSwipe = async (direction) => {
    if (currentIndex >= friends.length) return;

    const currentFriend = friends[currentIndex];

    if (direction === 'right') {
      // Save bid to Supabase
      try {
        const { error } = await supabase
          .from('bids')
          .insert({
            friend_id: currentFriend.id,
            bid_amount: currentFriend.startingBid,
            user_id: 'demo-user', // Replace with actual user ID when you add auth
          });

        if (error) throw error;

        setBids([...bids, { ...currentFriend, bidAmount: currentFriend.startingBid }]);
      } catch (error) {
        console.error('Error saving bid:', error);
      }
    }

    setCurrentIndex(currentIndex + 1);
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Loading friends...</Text>
      </View>
    );
  }

  const currentFriend = friends[currentIndex];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Header totalBids={bids.length} />

      <View style={styles.cardContainer}>
        {currentFriend ? (
          <SwipeCard friend={currentFriend} onSwipe={handleSwipe} />
        ) : (
          <View style={styles.endCard}>
            <View style={styles.endContent}>
              <View style={styles.endIcon}>🎉</View>
              <View style={styles.endText}>All done!</View>
              <View style={styles.endSubtext}>
                You placed {bids.length} bid{bids.length !== 1 ? 's' : ''}
              </View>
            </View>
          </View>
        )}
      </View>

      {currentFriend && (
        <ActionButtons onPass={() => handleSwipe('left')} onBid={() => handleSwipe('right')} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  endCard: {
    width: '85%',
    height: '70%',
    backgroundColor: '#2a2a2a',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  endContent: {
    alignItems: 'center',
  },
  endIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  endText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  endSubtext: {
    fontSize: 18,
    color: '#888',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    color: '#888',
  },
});
