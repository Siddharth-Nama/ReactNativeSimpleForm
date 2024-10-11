import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const SplashScreen: React.FC = React.memo(() => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')} // Ensure this is the correct path
        style={styles.logo}
        resizeMode="contain" // Set resize mode to contain to maintain aspect ratio
      />
      <Text style={styles.loadingText}>Siddharth First Project</Text>
    </View>
  );
});

const LOGO_SIZE = 150;
const TEXT_COLOR = '#000000';
const BG_COLOR = '#CDE9ED';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BG_COLOR,
  },
  logo: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    // Add these properties if needed to optimize rendering
    // resizeMode: 'contain',
  },
  loadingText: {
    marginTop: 30,
    fontSize: 20,
    fontWeight: 'bold',
    color: TEXT_COLOR,
    letterSpacing: 1.2,
    textAlign: 'center',
  },
});

export default SplashScreen;
