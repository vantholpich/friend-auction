import React, { useRef } from 'react';
import { StyleSheet, View, Text, Image, Animated, PanResponder, Dimensions, Platform } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

export default function SwipeCard({ friend, onSwipe }) {
  const position = useRef(new Animated.ValueXY()).current;
  const rotate = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp',
  });

  const likeOpacity = position.x.interpolate({
    inputRange: [0, SCREEN_WIDTH / 4],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const nopeOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 4, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        // Prevent default touch behavior on web
        if (Platform.OS === 'web') {
          document.body.style.overflow = 'hidden';
        }
      },
      onPanResponderMove: (_, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (_, gesture) => {
        // Re-enable scrolling on web
        if (Platform.OS === 'web') {
          document.body.style.overflow = 'auto';
        }
        
        if (gesture.dx > SWIPE_THRESHOLD) {
          forceSwipe('right');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          forceSwipe('left');
        } else {
          resetPosition();
        }
      },
      onPanResponderTerminate: () => {
        // Re-enable scrolling on web if gesture is interrupted
        if (Platform.OS === 'web') {
          document.body.style.overflow = 'auto';
        }
        resetPosition();
      },
    })
  ).current;

  const forceSwipe = (direction) => {
    const x = direction === 'right' ? SCREEN_WIDTH + 100 : -SCREEN_WIDTH - 100;
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: 250,
      useNativeDriver: false,
    }).start(() => {
      onSwipe(direction);
      position.setValue({ x: 0, y: 0 });
    });
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  const animatedStyle = {
    transform: [{ translateX: position.x }, { translateY: position.y }, { rotate }],
  };

  return (
    <Animated.View style={[styles.card, animatedStyle]} {...panResponder.panHandlers}>
      <Image source={{ uri: friend.image }} style={styles.image} />
      
      <Animated.View style={[styles.badge, styles.bidBadge, { opacity: likeOpacity }]}>
        <Text style={styles.badgeText}>LIKE</Text>
      </Animated.View>
      
      <Animated.View style={[styles.badge, styles.passBadge, { opacity: nopeOpacity }]}>
        <Text style={styles.badgeText}>NOPE</Text>
      </Animated.View>

      <View style={styles.gradientOverlay} />
      <View style={styles.info}>
        <Text style={styles.name}>
          {friend.name}, {friend.age}
        </Text>
        <Text style={styles.bio}>{friend.bio}</Text>
        <View style={styles.bidContainer}>
          <Text style={styles.bidIcon}>💰</Text>
          <Text style={styles.bidAmount}>{friend.startingBid} Bids</Text>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '88%',
    height: '68%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    overflow: 'hidden',
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  badge: {
    position: 'absolute',
    top: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 4,
  },
  bidBadge: {
    right: 30,
    borderColor: '#4CAF50',
    transform: [{ rotate: '20deg' }],
  },
  passBadge: {
    left: 30,
    borderColor: '#E91E63',
    transform: [{ rotate: '-20deg' }],
  },
  badgeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  info: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  bio: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 12,
    opacity: 0.9,
  },
  bidContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  bidIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  bidAmount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
