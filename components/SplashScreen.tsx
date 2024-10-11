import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const CustomSplashScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Add your custom splash content here, e.g., a logo */}
      <Text style={styles.text}>Loading...</Text>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default CustomSplashScreen;
