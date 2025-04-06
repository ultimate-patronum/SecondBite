import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet, 
  TouchableOpacity
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface InventoryItemProps {
  name: string;
  initlQuantity: number;
  defaultUnit: string;
  onDelete: (name: string) => void;
}

const InventoryItem: React.FC<InventoryItemProps> = ({ name, initlQuantity, defaultUnit, onDelete}) => {
  const isEggs = name.toLowerCase() === 'eggs';
  const validUnit =  ('unit');
  const [quantity, setQuantity] = useState(initlQuantity); 
  const [amountToAdd, setAmountToAdd] = useState('');
  const [unit, setUnit] = useState(validUnit);

  const handleAdd = () => {
    const toAdd = parseFloat(amountToAdd);

    if (!isNaN(toAdd)) {
      setQuantity(prev => prev + toAdd);
      setAmountToAdd('');
    }
  };

  const handleDelete = () => {
    onDelete(name);
  }

  return (
    <View style={styles.card}>

    <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
    <Text style={styles.deleteText}>X</Text>
    </TouchableOpacity>


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
          <Picker.Item label="units" value="units" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleAdd}>
            <Text style={styles.buttonText}>Add to Inventory</Text>
    </TouchableOpacity> 
    </View>
  );
};

const styles = StyleSheet.create({

    card: {
        padding: 20,
        backgroundColor: '#e8f5e9',
        marginBottom: 20,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
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

  button: {
    backgroundColor: '#9ABF8E',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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

// import React, { useState } from 'react';
// import {
//   ScrollView,
//   View,
//   Text,
//   TextInput,
//   Button,
//   StyleSheet
// } from 'react-native';
// import { Picker } from '@react-native-picker/picker';

// interface InventoryItemProps {
//   name: string;
//   initlQuantity: number;
//   defaultUnit: string;
// }

// const InventoryItem: React.FC<InventoryItemProps> = ({ name, initlQuantity, defaultUnit }) => {
//   const [quantity, setQuantity] = useState(initlQuantity); 
//   const [amountToAdd, setAmountToAdd] = useState('');
//   const [unit, setUnit] = useState(defaultUnit || 'kg');

//   const handleAdd = () => {
//     const toAdd = parseFloat(amountToAdd);

//     if (!isNaN(toAdd)) {
//       setQuantity(prev => prev + toAdd);
//       setAmountToAdd('');
//     }
//   };

//   return (
//     <View style={styles.card}>
//       <Text style={styles.title}>{name}</Text>
//       <Text style={styles.qty}>
//         Quantity: {quantity} {unit}
//       </Text>

//       <View style={styles.inputRow}>
//         <TextInput
//           style={styles.input}
//           placeholder="Add amount"
//           keyboardType="numeric"
//           value={amountToAdd}
//           onChangeText={setAmountToAdd}
//         />
//         <Picker
//           selectedValue={unit}
//           onValueChange={setUnit}
//           style={styles.picker}
//         >
//           {name.toLowerCase() === 'eggs' ? (
//             <Picker.Item label="dozen" value="dozen" />
//           ) : (
//             <>
//               <Picker.Item label="kg" value="kg" />
//               <Picker.Item label="g" value="g" />
//             </>
//           )}
//         </Picker>
//       </View>

//       <Button title="Add to Inventory" onPress={handleAdd} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     padding: 20,
//     backgroundColor: '#f4f4f4',
//     marginBottom: 20,
//     borderRadius: 10,
//     shadowColor: '#000',
//     elevation: 2,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: '600',
//   },
//   qty: {
//     fontSize: 16,
//     marginVertical: 10,
//   },
//   inputRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 10,
//     marginBottom: 10,
//   },
//   input: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 8,
//     borderRadius: 5,
//   },
//   picker: {
//     flex: 1,
//   },
// });

// export default InventoryItem;
