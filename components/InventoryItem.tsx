import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface InventoryItemProps {
  name: string;
  initlQuantity: number;
  defaultUnit: string;
}

const InventoryItem: React.FC<InventoryItemProps> = ({ name, initlQuantity, defaultUnit }) => {
  const [quantity, setQuantity] = useState(initlQuantity); 
  const [amountToAdd, setAmountToAdd] = useState('');
  const [unit, setUnit] = useState(defaultUnit);

  const handleAdd = () => {
    const toAdd = parseFloat(amountToAdd);

    if (!isNaN(toAdd)) {
      setQuantity(prev => prev + toAdd);
      setAmountToAdd('');
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.qty}>
        Quantity: {quantity} {unit}
      </Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Add amount"
          keyboardType="numeric"
          value={amountToAdd}
          onChangeText={setAmountToAdd}
        />
        <Picker
          selectedValue={unit}
          onValueChange={setUnit}
          style={styles.picker}
        >
          {name.toLowerCase() === 'eggs' ? (
            <Picker.Item label="dozen" value="dozen" />
          ) : (
            <>
              <Picker.Item label="kg" value="kg" />
              <Picker.Item label="g" value="g" />
            </>
          )}
        </Picker>
      </View>

      <Button title="Add to Inventory" onPress={handleAdd} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    backgroundColor: '#f4f4f4',
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  qty: {
    fontSize: 16,
    marginVertical: 10,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 5,
  },
  picker: {
    flex: 1,
  },
});

export default InventoryItem;
