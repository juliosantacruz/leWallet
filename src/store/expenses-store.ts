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
  incomes: Income[];
  addIncome: (income: Income) => void;
}

const months: MonthExpenses[] = [
  { month: "January", expenses: [] },
  { month: "February", expenses: [] },
  { month: "March", expenses: [] },
  { month: "April", expenses: [] },
  { month: "May", expenses: [] },
  { month: "June", expenses: [] },
  { month: "July", expenses: [] },
  { month: "August", expenses: [] },
  { month: "September", expenses: [] },
  { month: "October", expenses: [] },
  { month: "November", expenses: [] },
  { month: "December", expenses: [] },
];

const expenseMonth = (element: Expense) =>
  parseInt(element.date.split("-", 2)[1]) - 1;
const expenseYear = (element: Expense) =>
  parseInt(element.date.split("-", 2)[0]);
const setExpense = (element: Expense) => {
  const year = expenseYear(element);
  const monthIndex = expenseMonth(element);
  const expenseElement = months[monthIndex];
  const monthTitle = expenseElement.month + "-" + year;
  expenseElement.month = monthTitle;
  expenseElement.expenses.push(element);
  return expenseElement;
};

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
      incomes: [],
      addIncome: (income: Income) =>
        set((state) => ({
          incomes: [...state.incomes, income],
        })),
    }),
    {
      name: "expenses-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
