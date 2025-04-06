import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Ingredient = {
  name: string;
  quantity: number;
};

type Recipe = {
  name: string;
  ingredients: Ingredient[];
  instructions: string;
};

type RecipeContextType = {
  recipes: Recipe[];
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
};

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

const STORAGE_KEY = '@recipes';
const DEFAULT_RECIPES: Recipe[] = [];

export const RecipeProvider = ({ children }: { children: ReactNode }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setRecipes(JSON.parse(stored));
        } else {
          setRecipes(DEFAULT_RECIPES); // fallback
        }
      } catch (err) {
        console.error('🔴 Failed to load recipes:', err);
      }
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(recipes)).catch(err =>
      console.error('🔴 Failed to save recipes:', err)
    );
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
