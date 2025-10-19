import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function Header({ totalBids }) {
  return (
    <View style={styles.header}>
      <Text style={styles.logo}>💰 Friend Auction</Text>
      <View style={styles.bidCounter}>
        <Text style={styles.bidCount}>{totalBids}</Text>
        <Text style={styles.bidLabel}>Bids</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  bidCounter: {
    backgroundColor: '#2a2a2a',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
  },
  bidCount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  bidLabel: {
    fontSize: 12,
    color: '#888',
  },
});
