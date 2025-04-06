import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type InventoryItem = {
  name: string;
  initlQuantity: number;
  defaultUnit: string;
};

type InventoryContextType = {
  inventoryItems: InventoryItem[];
  setInventoryItems: React.Dispatch<React.SetStateAction<InventoryItem[]>>;
};

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);
const STORAGE_KEY = '@inventory_items';

export const InventoryProvider = ({ children }: { children: ReactNode }) => {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);

  // Load inventory on mount
  useEffect(() => {
    (async () => {
      try {
        const storedItems = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedItems) {
          setInventoryItems(JSON.parse(storedItems));
        } else {
          setInventoryItems([
            { name: 'Apples', initlQuantity: 0, defaultUnit: 'unit(s)' },
            { name: 'Carrots', initlQuantity: 0, defaultUnit: 'unit(s)' },
            { name: 'Eggs', initlQuantity: 0, defaultUnit: 'unit(s)' },
          ]);
        }
      } catch (e) {
        console.error('🔴 Failed to load inventory:', e);
      }
    })();
  }, []);

  // Save on change
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(inventoryItems)).catch(err =>
      console.error('🔴 Failed to save inventory:', err)
    );
  }, [inventoryItems]);

  return (
    <InventoryContext.Provider value={{ inventoryItems, setInventoryItems }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) throw new Error('useInventory must be used within InventoryProvider');
  return context;
};
