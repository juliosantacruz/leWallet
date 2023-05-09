// import MapViewer from '@/components/MapViewer/MapViewer'
import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useExpensesStore } from "@/store/expenses-store";
import { useRouter } from "next/router";
import { Expense } from "@/types/expense";
import { setFormat } from "@/hooks/useUtils";
import useGetData from "@/hooks/useGetData";

const MapViewer = dynamic(
  () => import("../../../components/MapViewer/MapViewer"),
  { ssr: false }
);

export default function ExpenseDetails() {
  const [coordenadas, setCoordenadas] = useState<any>([22.509, -126.8726]);
  const [item, setItem] = useState<Expense>({
    id: "",
    description: "",
    category: "",
    date: "",
    amount: 0,
    latitud: null,
    longitud: null,
  });
  const router = useRouter();
  const expenseId: any = router.query.id;
  const { expenses } = useExpensesStore();

  // Total Expenses
  const getDataExpenses = useGetData(expenses, item.date);
  const totalExpenses = getDataExpenses.totalAmount;

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
        <ul>
          <li>Category: {item?.category}</li>
          <li>Date: {item?.date}</li>
          <li>Amount: {setFormat(item?.amount)}</li>
          <li>Total Expenses: {setFormat(totalExpenses)}</li>
          <li>% : {((Number(item?.amount)/totalExpenses )*100).toFixed(3)}</li>
        </ul>
        {item?.latitud} | {item?.longitud}
      </div>
      {item?.latitud && (
        <MapViewer coordinates={[item.latitud, item.longitud]} />
      )}
    </div>
  );
}
