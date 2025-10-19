import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

export default function ActionButtons({ onPass, onBid }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button, styles.passButton]} onPress={onPass}>
        <Text style={styles.buttonText}>✕</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.button, styles.bidButton]} onPress={onBid}>
        <Text style={styles.buttonText}>💰</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
    gap: 40,
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  passButton: {
    backgroundColor: '#f44336',
  },
  bidButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    fontSize: 32,
    color: '#fff',
  },
});
