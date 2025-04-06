import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, Button, View } from 'react-native';
import InventoryItem from './components/InventoryItem';
import Recipe from './components/Recipe';

function App(): React.JSX.Element {
  const [inventoryItems, setInventoryItems] = useState([
    { name: 'Apples', initlQuantity: 1, defaultUnit: 'kg' },
    { name: 'Carrots', initlQuantity: 0.5, defaultUnit: 'kg' },
    { name: 'Eggs', initlQuantity: 2, defaultUnit: 'dozen' },
  ]);

  const handleAddItem = () => {
    setInventoryItems(prevItems => {
      const newItems = [
        ...prevItems,
        { name: `Item ${prevItems.length + 1}`, initlQuantity: 0, defaultUnit: 'kg' }
      ];

      console.log(newItems);
      return newItems;
    });
  };

  const sampleRecipe = {
    name: 'Hearty Vegetable Stew',
    ingredients: [
      'Carrots',
      'Potatoes',
      'Onions',
      'Celery',
      'Tomato Paste',
      'Vegetable Broth',
      'Garlic',
      'Bay Leaf',
      'Salt',
      'Pepper',
    ],
    steps: `
1. Chop all vegetables.
2. Sauté onions, garlic, and celery until fragrant.
3. Add carrots and potatoes, cook for 5 minutes.
4. Stir in tomato paste, then pour in vegetable broth.
5. Add bay leaf, salt, and pepper.
6. Bring to a boil, then simmer for 30–40 minutes.
7. Remove bay leaf and serve hot.`,
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Button title="Add Produce Item" onPress={handleAddItem} />
      </View>

      {inventoryItems.map((item, index) => (
        <InventoryItem
          key={index}
          name={item.name}
          initlQuantity={item.initlQuantity}
          defaultUnit={item.defaultUnit}
        />
      ))}

      <Text style={styles.sectionTitle}>Suggested Recipe</Text>
      <Recipe
        name={sampleRecipe.name}
        ingredients={sampleRecipe.ingredients}
        steps={sampleRecipe.steps}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 12,
  },
});

export default App;