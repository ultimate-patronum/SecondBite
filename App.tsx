
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, Button, View, TextInput } from 'react-native';
import InventoryItem from './components/InventoryItem';
import PopupModal from './components/PopupModal';

import Recipe from './components/Recipe';
import { Picker } from '@react-native-picker/picker';

function App(): React.JSX.Element {
  const [inventoryItems, setInventoryItems] = useState([
    { name: 'Apples', initlQuantity: 1, defaultUnit: 'kg' },
    { name: 'Carrots', initlQuantity: 0.5, defaultUnit: 'kg' },
    { name: 'Eggs', initlQuantity: 2, defaultUnit: 'dozen' },
  ]);

  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState('');
  const [newItemUnit, setNewItemUnit] = useState('');
  const [modalVisible, setModalVisible] = useState(false);


  


  const handleAddItem = () => {
    if(newItemName && newItemQuantity){
      const quantity = parseFloat(newItemQuantity);
      if(!isNaN(quantity)){
        const newItem = {
          name: newItemName,
          initlQuantity: quantity,
          defaultUnit: newItemUnit,
        };

        setInventoryItems(prevItems => {
          const updateItems = [...prevItems, newItem];
    
          console.log(updateItems);
          return updateItems;
        });
      }
    }

    setNewItemName('');
    setNewItemQuantity('');
    setNewItemUnit('');
    
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
        <Button title="Add Produce Item" onPress={() => setModalVisible(true)} />
      </View>

        <PopupModal
          visible={modalVisible}
          onClose={() => {
            setModalVisible(false);
            setNewItemName('');
            setNewItemQuantity('');
            setNewItemUnit('kg'); // or your default unit
          }}
          onAdd={(name, quantity, unit) => {
            setInventoryItems(prev => [...prev, { name, initlQuantity: quantity, defaultUnit: unit }]);
            setModalVisible(false);
            setNewItemName('');
            setNewItemQuantity('');
            setNewItemUnit('kg');
          }}
          newItemName={newItemName}
          setNewItemName={setNewItemName}
          newItemQuantity={newItemQuantity}
          setNewItemQuantity={setNewItemQuantity}
          newItemUnit={newItemUnit}
          setNewItemUnit={setNewItemUnit}
        />



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
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 8,
    borderRadius: 5,
  },
  picker: {
    height: 50,
    width: 150,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 12,
  },
});

export default App;