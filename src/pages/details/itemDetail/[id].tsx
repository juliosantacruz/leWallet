// import MapViewer from '@/components/MapViewer/MapViewer'
import React from "react";
import dynamic from "next/dynamic";
import { useExpensesStore } from "@/store/expenses-store";
import { useRouter } from "next/router";
import { Expense } from "@/types/expense"; 

const MapViewer = dynamic(
  () => import("../../../components/MapViewer/MapViewer"),
  { ssr: false }
);

export default function ExpenseDetails() {
  
  const router = useRouter();
  const expenseId: any = router.query.id;
  const { expenses } = useExpensesStore();

  // Total Expenses
  const itemFilter: Expense[] = expenses.filter(
    (item) => item.id === expenseId
  );
  

  return (
    <div>
      <h2> I&apos;m expense title </h2>
      <div>
        <ul>
          <li>Category: test</li>
          <li>Date:  test</li>
          <li>Amount: </li>
          <li>Total Expenses:  </li>
           
        </ul> 
      </div>
      {false && (
        <MapViewer coordinates={[100, 20]} />
      )}
    </div>
  );
}
