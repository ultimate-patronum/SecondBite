import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Button title="Go to Inventory" onPress={() => navigation.navigate('Inventory')} />
      <View style={{ height: 20 }} />
      <Button title="Go to Recipes" onPress={() => navigation.navigate('Recipes')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
});

export default HomeScreen;
