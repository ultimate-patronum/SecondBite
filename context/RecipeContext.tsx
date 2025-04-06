import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Ingredient = {
  name: string;
  quantity: number;
};

type Recipe = {
  name: string;
  ingredients: Ingredient[];
  steps: string;
};

type RecipeContextType = {
  recipes: Recipe[];
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
};

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

const STORAGE_KEY = '@recipe_list';

export const RecipeProvider = ({ children }: { children: ReactNode }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  // Clear recipes on app startup
  useEffect(() => {
    (async () => {
      try {
        // Clear AsyncStorage upon refresh or app start
        await AsyncStorage.removeItem(STORAGE_KEY);
        // Ensure state is set to an empty array
        setRecipes([]);
      } catch (e) {
        console.error('🔴 Failed to clear recipes:', e);
      }
    })();
  }, []); // Empty dependency ensures this only happens on first load

  // Save recipes when the state changes
  useEffect(() => {
    const saveRecipes = async () => {
      try {
        if (recipes.length > 0) {
          // Only save to AsyncStorage if there are recipes to save
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
        }
      } catch (e) {
        console.error('🔴 Failed to save recipes:', e);
      }
    };
    saveRecipes();
  }, [recipes]);

  return (
    <RecipeContext.Provider value={{ recipes, setRecipes }}>
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipes must be used within a RecipeProvider');
  }
  return context;
};
