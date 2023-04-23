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
import { useStateStore } from "@/store/state-store";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter(); 

  // stateStore
  const openModal = useStateStore(state=>state.openModal)
  const addExpense = useStateStore(state=>state.addExpense)
  const addIncome = useStateStore(state=>state.addIncome)
  const setOpenModal=   useStateStore(state => state.setOpenModal)
  const setAddExpense=   useStateStore(state => state.setAddExpense)
  const setAddIncome=   useStateStore(state => state.setAddIncome)

 

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
    setOpenModal(false);
  };

  const handleCancel = () => {
    setOpenModal(false);
    setAddExpense(false);
    setAddIncome(false);
  };

  return (
    <>
      <section className="">
        <h1 style={{ textAlign: "center", marginBottom: "25px", fontSize:'28px'}}>
          Le Wallet... <br/><small>take control of your money</small>
        </h1>

        {monthExpenses?.sort().map((element: string) => {
          return (
            <div key={v4()} onClick={() => router.push(`/details/${element}`)}>
              <CardSummary dateCard={element} />
            </div>
          );
        })}

        <Modal
          open={openModal}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          {addExpense && <AddExpenseForm setOpenModal={setOpenModal} />}
          {addIncome && <AddIncomeForm setOpenModal={setOpenModal} />}
        </Modal>

        <AddButton />
        {/* <AddIncomeForm /> */}
      </section>
    </>
  );
}
