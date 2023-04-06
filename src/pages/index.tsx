import Head from "next/head";
import { Inter } from "next/font/google";
import CardSummary from "../components/CardSummary/CardSummary";
import AddButton from "@/components/AddButton/AddButton";
import AddExpenseForm from "@/components/AddExpenseForm/AddExpenseForm";
import { useExpensesStore } from "@/store/expenses-store";
import { Expense } from "@/types/expense";
import useGetStore from "@/hooks/useGetStore";
import { CardSummaryProps } from "@/types/CardSummary";
import { v4 } from "uuid";
import AddIncomeForm from "@/components/AddIncomeForm/AddIncomeForm";
import { useState } from "react";
import { Button, Modal, Popover } from "antd";
import { Router, useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addExpense, setAddExpense] = useState(false);
  const [addIncome, setAddIncome] = useState(false);
  const expensesList: any = useGetStore(
    useExpensesStore,
    (state: any) => state.expenses
  );
  const setMonthYear = (element: Expense) => {
    const expenseMonth = parseInt(element.date.split("-", 2)[1]);
    const expenseYear = parseInt(element.date.split("-", 2)[0]);
    return expenseYear + "-" + expenseMonth;
  };
  const monthExpenses: string[] = [];
  expensesList?.forEach((element: Expense) => {
    if (!monthExpenses.includes(setMonthYear(element))) {
      monthExpenses.push(setMonthYear(element));
    }
  });

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setAddExpense(false);
    setAddIncome(false);
  };

  return (
    <>
      <section className="">
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
          Gastos y Presupuestos
        </h1>

        {monthExpenses?.sort().map((element: string) => {
          return (
            <div key={v4()} onClick={() => router.push(`/details/${element}`)}>
              <CardSummary dateCard={element} />
            </div>
          );
        })}

        <Modal
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          {addExpense && <AddExpenseForm setOpenModal={setIsModalOpen} />}
          {addIncome && <AddIncomeForm setOpenModal={setIsModalOpen} />}
        </Modal>

        <AddButton
          openModal={isModalOpen}
          setOpenModal={setIsModalOpen}
          setAddExpense={setAddExpense}
          setAddIncome={setAddIncome}
        />
        {/* <AddIncomeForm /> */}
      </section>
    </>
  );
}
