import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './src/routes/Navigation.js';
import {SafeAreaView, StyleSheet} from 'react-native';
import FlashMessage from "react-native-flash-message";

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Navigation />
        <FlashMessage position="top" /> 

      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
