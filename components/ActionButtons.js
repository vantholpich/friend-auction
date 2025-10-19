import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

export default function ActionButtons({ onPass, onBid }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button, styles.passButton]} onPress={onPass}>
        <Text style={styles.buttonText}>✕</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.button, styles.bidButton]} onPress={onBid}>
        <Text style={styles.heartIcon}>♥</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
    gap: 30,
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  passButton: {
    backgroundColor: '#FFFFFF',
  },
  bidButton: {
    backgroundColor: '#E91E63',
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  buttonText: {
    fontSize: 32,
    color: '#E91E63',
    fontWeight: 'bold',
  },
  heartIcon: {
    fontSize: 36,
    color: '#FFFFFF',
  },
});
