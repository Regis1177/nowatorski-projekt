import React, { createContext, useContext, useState } from "react";

type BalanceContextType = {
  balance: number;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
};

const BalanceContext = createContext<BalanceContextType | undefined>(undefined);

export const BalanceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [balance, setBalance] = useState<number>(1000); // Domyślne saldo

  return (
    <BalanceContext.Provider value={{ balance, setBalance }}>
      {children}
    </BalanceContext.Provider>
  );
};

export const useBalance = () => {
  const context = useContext(BalanceContext);
  if (!context) {
    throw new Error("useBalance must be used within a BalanceProvider");
  }
  return context;
};
