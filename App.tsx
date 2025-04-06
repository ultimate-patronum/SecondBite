import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InventoryScreen from './screens/InventoryScreen.tsx';
import RecipesScreen from './screens/RecipeScreen.tsx';
//import { useInventory } from '../context/InventoryContext.tsx';
import { RecipeProvider } from './context/RecipeContext.tsx';
import { InventoryProvider } from './context/InventoryContext.tsx';
import HomeScreen from './screens/HomeScreen.tsx';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <InventoryProvider>
      <RecipeProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home Page" component={HomeScreen} />
          <Stack.Screen name="Inventory" component={InventoryScreen} />
          <Stack.Screen name="Recipes" component={RecipesScreen} />
        </Stack.Navigator>
      </NavigationContainer>

      </RecipeProvider>
      
    </InventoryProvider>
  );
}

export default App;