// components/PopupModal.tsx
import React from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface Props {
  visible: boolean;
  onClose: () => void;
  onAdd: (name: string, quantity: number, unit: string) => void;
  newItemName: string;
  setNewItemName: (name: string) => void;
  newItemQuantity: string;
  setNewItemQuantity: (quantity: string) => void;
  newItemUnit: string;
  setNewItemUnit: (unit: string) => void;
}

export default function PopupModal({
  visible,
  onClose,
  onAdd,
  newItemName,
  setNewItemName,
  newItemQuantity,
  setNewItemQuantity,
  newItemUnit,
  setNewItemUnit,
}: Props) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add New Item</Text>
          <TextInput
            style={styles.input}
            placeholder="Item Name"
            value={newItemName}
            onChangeText={setNewItemName}
          />
          <TextInput
            style={styles.input}
            placeholder="Quantity"
            keyboardType="numeric"
            value={newItemQuantity}
            onChangeText={setNewItemQuantity}
          />
          <Picker
            selectedValue={newItemUnit}
            onValueChange={setNewItemUnit}
            style={styles.picker}
          >
            <Picker.Item label="kg" value="kg" />
            <Picker.Item label="g" value="g" />
            <Picker.Item label="dozen" value="dozen" />
          </Picker>
          <View style={styles.buttonRow}>
            <Button title="Cancel" onPress={onClose} color="#e57373" />
            <Button title="Add Item" onPress={() => {
              const quantity = parseFloat(newItemQuantity);
              if (!isNaN(quantity)) {
                onAdd(newItemName, quantity, newItemUnit);
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
