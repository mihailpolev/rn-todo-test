import React from 'react';
import {ActivityIndicator, StyleSheet, View, Dimensions} from 'react-native';

const FullScreenLoader = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    position: 'absolute',
    height: Dimensions.get('window').height,
    width:  Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    top: 0,
  },
});

export default FullScreenLoader;