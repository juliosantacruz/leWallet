// import MapViewer from '@/components/MapViewer/MapViewer'
import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useExpensesStore } from "@/store/expenses-store";
import { useRouter } from "next/router";
import { Expense } from "@/types/expense";

const MapViewer = dynamic(
  () => import("../../../components/MapViewer/MapViewer"),
  { ssr: false }
);

export default function ExpenseDetails() {
  const [coordenadas, setCoordenadas] = useState<any>([22.509, -126.8726]);
  const [item, setItem] = useState<Expense>();
  const router = useRouter();
  const expenseId: any = router.query.id;
  const { expenses } = useExpensesStore();

  console.log("expenses", expenses);
  console.log("expensesID", expenseId);

  console.log("item", item);

  useEffect(() => {
    const itemFilter: Expense[] = expenses.filter(
      (item) => item.id === expenseId
    );
    setItem(itemFilter[0]);
  }, []);

   

  return (
    <div>
      <h2> {item?.description} </h2>
      <div>
        {item?.category} | {item?.amount} | {item?.date}
        
      </div>
      {item?.latitud && (
        <MapViewer coordinates={[item.latitud, item.longitud]} />
      )}
    </div>
  );
}
