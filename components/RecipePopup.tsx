import React from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface Props {
  visible: boolean;
  onClose: () => void;
  onAdd: (name: string, ingredients: number, steps: string) => void;
  newRecipeName: string;
  setNewRecipeName: (name: string) => void;
  newRecipeIngredients: string[];
  setNewRecipeIngredients: (quantity: string[]) => void;
  newRecipeSteps: string;
  setNewRecipeSteps: (unit: string) => void;
}

export default function RecipePopup({
  visible,
  onClose,
  onAdd,
  newRecipeName,
  setNewRecipeName,
  newRecipeIngredients,
  setNewRecipeIngredients,
  newRecipeSteps,
  setNewRecipeSteps,
}: Props) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add New Recipe</Text>
          <TextInput
            style={styles.input}
            placeholder="Recipe Name"
            value={newRecipeName}
            onChangeText={setNewRecipeName}
          />
          <Picker
              selectedValue={newRecipeIngredients}
              onValueChange={setNewRecipeIngredients}
              style={styles.picker}
          >
          {inventoryItems.map((item, index) => (
            <Picker.Item key={index} label={item.name} value={item.name} />
          ))}
            <Picker.Item label="➕ Add new ingredient..." value="__add__" />
            </Picker>
          <TextInput
            style={styles.input}
            placeholder="Steps"
            value={newRecipeSteps}
            onChangeText={setNewRecipeSteps}
          />
          <View style={styles.buttonRow}>
            <Button title="Cancel" onPress={onClose} color="#e57373" />
            <Button title="Add Recipe" onPress={() => {
              const quantity = parseFloat(newItemQuantity);
              if (!isNaN(quantity)) {
                onAdd(newRecipeName, newRecipeIngredients, newRecipeSteps);
              }
            }} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
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
    width: '100%',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
