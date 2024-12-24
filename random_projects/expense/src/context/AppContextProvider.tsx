import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// Types
type Transaction = {
  price: number;
  category: string;
  type: "cash" | "bank";
};

type ExpensesState = Transaction[];

type IncomeState = Transaction[];

type AppContextType = {
  expenses: ExpensesState;
  income: IncomeState;
  addExpense: (expense: Transaction) => void;
  addIncome: (income: Transaction) => void;
  totalBalance: number;
  setTotalBalance: (totalBalance: number) => void;
  cashBlanace: number;
  bankBalance: number;
};

// Create context with default value
const AppContext = createContext<AppContextType | undefined>(undefined);

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [expenses, setExpenses] = useState<ExpensesState>([]);
  const [income, setIncome] = useState<IncomeState>([]);
  const [cashBalance, setCashBalance] = useState(0);
  const [bankBalance, setBankBalance] = useState(0);
  const [totalBalance, setTotalBalance] = useState(3000);

  const addExpense = (expense: Transaction) => {
    setExpenses((prevExpenses) => [...prevExpenses, expense]);
    setTotalBalance((prev) => prev - expense.price);
  };

  const addIncome = (income: Transaction) => {
    setIncome((prevIncome) => [...prevIncome, income]);
  };

  useEffect(() => {
    expenses.forEach((expense) => {
      if (expense.type === "cash") {
        setCashBalance((prev) => prev - expense.price);
      } else {
        setBankBalance((prev) => prev - expense.price);
      }
    });
  }, [expenses, cashBalance, bankBalance]);

  //   useEffect(()=>{
  //     setTotalBalance(cashBalance + bankBalance)
  //   },[totalBalance,cashBalance,bankBalance])

  return (
    <AppContext.Provider
      value={{
        expenses,
        income,
        addExpense,
        addIncome,
        totalBalance,
        setTotalBalance,
        cashBlanace,
        bankBalance,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
