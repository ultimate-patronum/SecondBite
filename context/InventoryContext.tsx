import React, { createContext, useContext, useState, ReactNode } from 'react';

type InventoryItem = {
  name: string;
  initlQuantity: number;
  defaultUnit: string;
};

type InventoryContextType = {
  inventoryItems: InventoryItem[];
  setInventoryItems: React.Dispatch<React.SetStateAction<InventoryItem[]>>;
};

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const InventoryProvider = ({ children }: { children: ReactNode }) => {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([
    { name: 'Apples', initlQuantity: 0, defaultUnit: 'unit(s)' },
    { name: 'Carrots', initlQuantity: 0, defaultUnit: 'unit(s)' },
    { name: 'Eggs', initlQuantity: 0, defaultUnit: 'unit(s)' },
  ]);

  return (
    <InventoryContext.Provider value={{ inventoryItems, setInventoryItems }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};
