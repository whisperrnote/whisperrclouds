import React, { createContext, useContext, useState } from 'react';

type TabsContextType = {
  value: string;
  onValueChange: (value: string) => void;
};

const TabsContext = createContext<TabsContextType | undefined>(undefined);

interface TabsProps {
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export function Tabs({ defaultValue, value, onValueChange, children, className = '' }: TabsProps) {
  const [selectedTab, setSelectedTab] = useState(defaultValue);
  const activeValue = value !== undefined ? value : selectedTab;
  
  const handleTabChange = (tabValue: string) => {
    if (onValueChange) {
      onValueChange(tabValue);
    } else {
      setSelectedTab(tabValue);
    }
  };

  return (
    <TabsContext.Provider value={{ value: activeValue, onValueChange: handleTabChange }}>
      <div className={`tabs ${className}`}>{children}</div>
    </TabsContext.Provider>
  );
}

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

export function TabsList({ children, className = '' }: TabsListProps) {
  return <div className={`flex mb-4 border-b ${className}`}>{children}</div>;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export function TabsTrigger({ value, children, className = '' }: TabsTriggerProps) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsTrigger must be used within a Tabs component');
  
  const isSelected = context.value === value;
  
  return (
    <button
      className={`px-4 py-2 ${isSelected ? 'border-b-2 border-blue-500 font-medium' : 'text-gray-500 hover:text-gray-700'} ${className}`}
      onClick={() => context.onValueChange(value)}
    >
      {children}
    </button>
  );
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export function TabsContent({ value, children, className = '' }: TabsContentProps) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsContent must be used within a Tabs component');
  
  if (context.value !== value) return null;
  
  return <div className={`py-4 ${className}`}>{children}</div>;
}
