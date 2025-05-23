import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Modal,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useInventory } from '../context/InventoryContext';
import { useRecipes } from '../context/RecipeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Ingredient {
  name: string;
  quantity: number;
}

interface Recipe {
  name: string;
  ingredients: Ingredient[];
  instructions?: string;
  steps: string;
}

const RecipesScreen = () => {
  const { inventoryItems } = useInventory();
  const { recipes, setRecipes } = useRecipes();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [recipeName, setRecipeName] = useState('');
  const [recipeIngredients, setRecipeIngredients] = useState<Ingredient[]>([{ name: '', quantity: 1 }]);
  const [recipeInstructions, setRecipeInstructions] = useState('');

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const savedRecipes = await AsyncStorage.getItem('recipes');
        if (savedRecipes) {
          setRecipes(JSON.parse(savedRecipes));
        }
      } catch (error) {
        console.error('Error loading recipes', error);
      }
    };
    loadRecipes();
  }, []);

  useEffect(() => {
    const saveRecipes = async () => {
      try {
        await AsyncStorage.setItem('recipes', JSON.stringify(recipes));
      } catch (error) {
        console.error('Error saving recipes', error);
      }
    };
    saveRecipes();
  }, [recipes]);

  const handleAddRecipe = () => {
    if (recipeName.trim() === '') return;
  
    const newRecipe: Recipe = {
      name: recipeName,
      ingredients: recipeIngredients.filter(ing => ing.name.trim() !== ''),
      instructions: recipeInstructions,
      steps: '', // Optional field, adjust accordingly
    };
  
    if (editingRecipe) {
      // Editing an existing recipe
      const updatedRecipes = recipes.map((recipe) =>
        recipe.name === editingRecipe.name ? newRecipe : recipe
      );
      setRecipes(updatedRecipes);
    } else {
      // Adding a new recipe
      setRecipes((prev) => [...prev, newRecipe]);
    }
  
    resetForm();
    setModalVisible(false);
  };
  

  const resetForm = () => {
    setRecipeName('');
    setRecipeIngredients([{ name: '', quantity: 1 }]);
    setRecipeInstructions('');
  };

  const deleteRecipe = (recipeToDelete: Recipe) => {
    const updatedRecipes = recipes.filter((recipe) => recipe.name !== recipeToDelete.name);
    setRecipes(updatedRecipes);
  };

  const calculateServings = (ingredients: Ingredient[]) => {
    const servingsPerIngredient = ingredients.map(({ name, quantity }) => {
      const matchedInventory = inventoryItems.find(
        item => item.name.toLowerCase().trim() === name.toLowerCase().trim()
      );
      if (!matchedInventory || quantity <= 0) return 0;
      return Math.floor(matchedInventory.initlQuantity / quantity);
    });
    return servingsPerIngredient.length > 0 ? Math.min(...servingsPerIngredient) : 0;
  };

  const updateIngredient = (index: number, field: 'name' | 'quantity', value: string) => {
    const updated = [...recipeIngredients];
    if (field === 'name') {
      updated[index].name = value;
    } else {
      updated[index].quantity = parseInt(value) || 1;
    }
    setRecipeIngredients(updated);
  };

  const addIngredientField = () => {
    setRecipeIngredients(prev => [...prev, { name: '', quantity: 0 }]);
  };

  const handleEditButtonClick = (recipe: Recipe) => {
    setEditingRecipe(recipe);
    setRecipeName(recipe.name);
    setRecipeIngredients(recipe.ingredients);
    setRecipeInstructions(recipe.instructions || ''); // Ensure it's always a string
    setModalVisible(true);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Add Recipe Button */}
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>Add Recipe</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{editingRecipe ? 'Edit Recipe' : 'New Recipe'}</Text>

            <TextInput
              placeholder="Recipe Name"
              value={recipeName}
              onChangeText={setRecipeName}
              style={styles.input}
            />

            <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>Ingredients</Text>
            {recipeIngredients.map((ingredient, index) => (
              <View key={index} style={styles.ingredientRow}>
                <TextInput
                  placeholder="Ingredient Name"
                  value={ingredient.name}
                  onChangeText={text => updateIngredient(index, 'name', text)}
                  style={[styles.input, { flex: 2, marginRight: 8 }]}/>
                <TextInput
                  placeholder="Qty"
                  value={ingredient.quantity.toString()}
                  keyboardType="numeric"
                  onChangeText={text => updateIngredient(index, 'quantity', text)}
                  style={[styles.input, { flex: 1 }]}/>
              </View>
            ))}

            <TouchableOpacity onPress={addIngredientField} style={styles.addIngredientButton}>
              <Text style={styles.addIngredientText}>+ Add Ingredient</Text>
            </TouchableOpacity>

            <TextInput
              placeholder="Instructions"
              value={recipeInstructions}
              onChangeText={setRecipeInstructions}
              style={[styles.input, { height: 80 }]}
              multiline
            />

            <View style={styles.buttonRow}>
              <Button title="Cancel" color="#888" onPress={() => setModalVisible(false)} />
              <Button title="Done" onPress={handleAddRecipe} color="#228B22" />
            </View>
          </View>
        </View>
      </Modal>

      {recipes.map((recipe, index) => (
        <View key={index} style={styles.recipeCard}>
          <Text style={styles.recipeTitle}>{recipe.name}</Text>
          <Text style={styles.servingText}>
            Servings: {calculateServings(recipe.ingredients)}
          </Text>
          <Text style={styles.subtitle}>Ingredients:</Text>
          {recipe.ingredients.map((ing, i) => (
            <Text key={i} style={styles.ingredientText}>
              - {ing.name} ({ing.quantity})
            </Text>
          ))}

          {/* Delete Button */}
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteRecipe(recipe)}
          >
            <Text style={styles.deleteText}>X</Text>
          </TouchableOpacity>

          {/* Edit Button */}
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => handleEditButtonClick(recipe)}
          >
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  recipeCard: {
    backgroundColor: '#e8f5e9',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  servingText: {
    marginTop: 4,
    fontStyle: 'italic',
  },
  subtitle: {
    marginTop: 8,
    fontWeight: 'bold',
  },
  ingredientText: {
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 16,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    padding: 8,
    borderRadius: 6,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  addIngredientButton: {
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  addIngredientText: {
    color: '#228B22',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#fd3a2d',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  editButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#228B22', // Green color
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
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
});

export default RecipesScreen;
