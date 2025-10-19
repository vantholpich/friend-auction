import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function Header({ totalBids }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.iconButton}>
        <Text style={styles.icon}>👤</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Auctions</Text>
      <TouchableOpacity style={styles.iconButton}>
        <Text style={styles.icon}>☰</Text>
      </TouchableOpacity>
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
    paddingBottom: 15,
    backgroundColor: '#F5F5F0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C2C2C',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8E8E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
  },
});
