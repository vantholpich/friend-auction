import React, { useRef } from 'react';
import { StyleSheet, View, Text, Image, Animated, PanResponder, Dimensions } from 'react-native';

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
      onPanResponderMove: (_, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          forceSwipe('right');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          forceSwipe('left');
        } else {
          resetPosition();
        }
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
        <Text style={styles.badgeText}>BID!</Text>
      </Animated.View>
      
      <Animated.View style={[styles.badge, styles.passBadge, { opacity: nopeOpacity }]}>
        <Text style={styles.badgeText}>PASS</Text>
      </Animated.View>

      <View style={styles.info}>
        <Text style={styles.name}>
          {friend.name}, {friend.age}
        </Text>
        <Text style={styles.bio}>{friend.bio}</Text>
        <View style={styles.bidContainer}>
          <Text style={styles.bidLabel}>Starting Bid:</Text>
          <Text style={styles.bidAmount}>${friend.startingBid}</Text>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '85%',
    height: '70%',
    backgroundColor: '#2a2a2a',
    borderRadius: 20,
    overflow: 'hidden',
    position: 'absolute',
  },
  image: {
    width: '100%',
    height: '70%',
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
    borderColor: '#f44336',
    transform: [{ rotate: '-20deg' }],
  },
  badgeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  info: {
    padding: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  bio: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 15,
  },
  bidContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bidLabel: {
    fontSize: 16,
    color: '#888',
    marginRight: 10,
  },
  bidAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
});
