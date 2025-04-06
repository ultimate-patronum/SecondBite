import React, { createContext, useContext, useState, ReactNode } from 'react';

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

// Remove the defaultInventory array entirely if you don't want any default items
// const defaultInventory: InventoryItem[] = [
//   { name: 'Apples', initlQuantity: 0, defaultUnit: 'unit(s)' },
//   { name: 'Carrots', initlQuantity: 0, defaultUnit: 'unit(s)' },
//   { name: 'Eggs', initlQuantity: 0, defaultUnit: 'unit(s)' },
// ];

export const InventoryProvider = ({ children }: { children: ReactNode }) => {
  // Initialize with an empty array
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);

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
