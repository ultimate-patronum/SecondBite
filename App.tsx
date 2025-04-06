import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InventoryScreen from './screens/InventoryScreen.tsx';
import RecipesScreen from './screens/RecipeScreen.tsx';
import { InventoryProvider } from './context/InventoryContext.tsx';
import HomeScreen from './screens/HomeScreen.tsx';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <InventoryProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home Page" component={HomeScreen} />
          <Stack.Screen name="Inventory" component={InventoryScreen} />
          <Stack.Screen name="Recipes" component={RecipesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </InventoryProvider>
  );
}
