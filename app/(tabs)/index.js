import React, { useState, useEffect } from 'react';
import { StyleSheet, View, StatusBar, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import SwipeCard from '../../components/SwipeCard';
import Header from '../../components/Header';
import ActionButtons from '../../components/ActionButtons';
import { supabase } from '../../lib/supabase';

export default function HomeScreen() {
  const router = useRouter();
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
      try {
        const { error } = await supabase
          .from('bids')
          .insert({
            friend_id: currentFriend.id,
            bid_amount: currentFriend.startingBid,
            user_id: 'demo-user',
          });

        if (error) throw error;

        setBids([...bids, { ...currentFriend, bidAmount: currentFriend.startingBid }]);
      } catch (error) {
        console.error('Error saving bid:', error);
      }
    }

    setCurrentIndex(currentIndex + 1);
  };

  const handleCardPress = () => {
    if (currentIndex < friends.length) {
      const currentFriend = friends[currentIndex];
      router.push(`/person/${currentFriend.id}`);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#E91E63" />
        <Text style={styles.loadingText}>Loading friends...</Text>
      </View>
    );
  }

  const currentFriend = friends[currentIndex];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header totalBids={bids.length} />

      <View style={styles.cardContainer}>
        {currentFriend ? (
          <TouchableOpacity 
            activeOpacity={0.95} 
            onPress={handleCardPress}
            style={styles.cardWrapper}
          >
            <SwipeCard friend={currentFriend} onSwipe={handleSwipe} />
          </TouchableOpacity>
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
    backgroundColor: '#F5F5F0',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  endCard: {
    width: '85%',
    height: '70%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
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
    color: '#2C2C2C',
    marginBottom: 10,
  },
  endSubtext: {
    fontSize: 18,
    color: '#8E8E8E',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    color: '#8E8E8E',
  },
});
