import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface FooterProps {
  text?: string;
}

const Footer: React.FC<FooterProps> = ({ text = '© 2025 Meu App' }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 12,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#DDD',
  },
  text: {
    color: '#666',
    fontSize: 14,
  },
});
