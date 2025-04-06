import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
} from 'react-native';

interface RecipeProps {
  name: string;
  ingredients: string[];
  steps: string;
}

const Recipe: React.FC<RecipeProps> = ({ name, ingredients, steps }) => {
  const handlePrepBox = () => {
    // You can expand this to handle prepping logic
    console.log(`Prepping box for: ${name}`);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{name}</Text>

      <Text style={styles.sectionTitle}>Ingredients:</Text>
      {ingredients.map((item, index) => (
        <Text key={index} style={styles.ingredient}>• {item}</Text>
      ))}

      <Text style={styles.sectionTitle}>Instructions:</Text>
      <ScrollView style={styles.instructionsBox}>
        <Text style={styles.instructions}>{steps}</Text>
      </ScrollView>

      <Button title="Prep This Box" onPress={handlePrepBox} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    backgroundColor: '#e8f5e9',
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    elevation: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 4,
  },
  ingredient: {
    fontSize: 16,
    marginLeft: 10,
  },
  instructionsBox: {
    maxHeight: 150,
    marginVertical: 8,
  },
  instructions: {
    fontSize: 15,
    lineHeight: 22,
  },
});

export default Recipe;
