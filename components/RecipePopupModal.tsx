import React from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';

interface Props {
  visible: boolean;
  onClose: () => void;
  onDone: () => void;
  recipeName: string;
  setRecipeName: (val: string) => void;
  recipeIngredients: string;
  setRecipeIngredients: (val: string) => void;
  recipeInstructions: string;
  setRecipeInstructions: (val: string) => void;
}

const RecipePopupModal: React.FC<Props> = ({
  visible,
  onClose,
  onDone,
  recipeName,
  setRecipeName,
  recipeIngredients,
  setRecipeIngredients,
  recipeInstructions,
  setRecipeInstructions,
}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>New Recipe</Text>

          <TextInput
            placeholder="Recipe Name"
            value={recipeName}
            onChangeText={setRecipeName}
            style={styles.input}
          />

          <TextInput
            placeholder="Ingredients"
            value={recipeIngredients}
            onChangeText={setRecipeIngredients}
            style={styles.input}
            multiline
          />

          <TextInput
            placeholder="Instructions"
            value={recipeInstructions}
            onChangeText={setRecipeInstructions}
            style={styles.input}
            multiline
          />

          <View style={styles.buttonRow}>
            <Button title="Cancel" onPress={onClose} color="#888" />
            <Button title="Done Editing" onPress={onDone} color="#228B22" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
});

export default RecipePopupModal;
