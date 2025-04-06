
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, Button, View, TextInput, TouchableOpacity } from 'react-native';
import InventoryItem from '../components/InventoryItem';
import PopupModal from '../components/PopupModal';
import { useInventory } from '../context/InventoryContext';

import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';


import Recipe from '../components/Recipe';
import { Picker } from '@react-native-picker/picker';

function App(): React.JSX.Element {
  // const [inventoryItems, setInventoryItems] = useState([
  //   { name: 'Apples', initlQuantity: 0, defaultUnit: 'unit(s)' },
  //   { name: 'Carrots', initlQuantity: 0, defaultUnit: 'unit(s)' },
  //   { name: 'Eggs', initlQuantity: 0, defaultUnit: 'unit(s)' },
  // ]);

  const {inventoryItems, setInventoryItems} = useInventory();

  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState('');
  const [newItemUnit, setNewItemUnit] = useState('unit');
  const [modalVisible, setModalVisible] = useState(false);

const handleDelete = (name: string) => {
  setInventoryItems(prevItems => 
    prevItems.filter(item=> item.name !== name)
  );
};
//   const sampleRecipe = {
//     name: 'Hearty Vegetable Stew',
//     ingredients: [
//       'Carrots',
//       'Potatoes',
//       'Onions',
//       'Celery',
//       'Tomato Paste',
//       'Vegetable Broth',
//       'Garlic',
//       'Bay Leaf',
//       'Salt',
//       'Pepper',
//     ],
//     steps: `
// 1. Chop all vegetables.
// 2. Sauté onions, garlic, and celery until fragrant.
// 3. Add carrots and potatoes, cook for 5 minutes.
// 4. Stir in tomato paste, then pour in vegetable broth.
// 5. Add bay leaf, salt, and pepper.
// 6. Bring to a boil, then simmer for 30–40 minutes.
// 7. Remove bay leaf and serve hot.`,
//   };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity 
          style={styles.addButton} 
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>Add Produce Item</Text>
        </TouchableOpacity>
      </View>

        <PopupModal
          visible={modalVisible}
          onClose={() => {
            setModalVisible(false);
            setNewItemName('');
            setNewItemQuantity('');
            setNewItemUnit('unit(s)'); // or your default unit
          }}

          onAdd={(name: string, quantity: number, unit: string) => {
            // Normalize the name to remove extra spaces and ensure lowercase comparison
            const normalizedName = name.toLowerCase().replace(/\s+/g, '').trim();
          
            setInventoryItems(prevItems => {
              // Check if the item exists in the inventory
              const existingItemIndex = prevItems.findIndex(item => 
                item.name.toLowerCase().replace(/\s+/g, '').trim() === normalizedName
              );
          
              if (existingItemIndex !== -1) {
                // Item found, update the quantity
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex].initlQuantity += quantity;
                return updatedItems;
              } else {
                // Item not found, create a new entry
                return [
                  ...prevItems,
                  {
                    name: name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(),
                    initlQuantity: quantity,
                    defaultUnit: unit,
                  },
                ];
              }
            });
          
            // Reset modal and form states after adding the item
            setModalVisible(false);
            setNewItemName('');
            setNewItemQuantity('');
            setNewItemUnit('unit(s)');
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
          onDelete={() => handleDelete(item.name)}
        />
      ))}

      {/* <Text style={styles.sectionTitle}>Suggested Recipe</Text>
      <Recipe
        name={sampleRecipe.name}
        ingredients={sampleRecipe.ingredients}
        steps={sampleRecipe.steps}
      /> */}
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
  addButton: {
    backgroundColor: '#228B22',  // Darker green shade
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
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