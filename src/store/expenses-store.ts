import { Expense } from "@/types/expense";
import { Income } from "@/types/income";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
interface MonthExpenses {
  month: string;
  expenses: Expense[];
}

interface Expenses {
  expenses: Expense[];
  // monthExpenses: Object[];
  addExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (expense: Expense) => void;
  incomes: Income[];
  addIncome: (income: Income) => void;
  deleteIncome: (id: string) => void;
}


export const useExpensesStore = create<Expenses>()(
  persist(
    (set) => ({
      expenses: [],
      addExpense: (expense: Expense) =>
        set((state) => ({
          expenses: [...state.expenses, expense],
        })),
      deleteExpense: (id: string) => {
        set((state) => ({
          expenses: state.expenses.filter((expense) => expense.id !== id),
        }));
      },
      updateExpense: (newExpense: Expense)=>{
        set((state)=> ({
          expenses: state.expenses.map((expense)=>{
            if(expense.id===newExpense.id){
              return{
                ...expense, 
                description:newExpense.description,
                amount: newExpense.amount,
                date: newExpense.date,
                category: newExpense.category
                }
            }else{
              return expense
            }
          })
        }))
      },
      incomes: [],
      addIncome: (income: Income) =>
        set((state) => ({
          incomes: [...state.incomes, income],
        })),
      deleteIncome: (id: string) => {
        set((state) => ({
          incomes: state.incomes.filter((income) => income.id !== id),
        }));
      },
    }),
    {
      name: "expenses-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
