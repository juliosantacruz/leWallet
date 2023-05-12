import React from "react";
import { List, Modal, Popover } from "antd";
import { useExpensesStore } from "@/store/expenses-store";
import { useRouter } from "next/router";
import useGetData from "@/hooks/useGetData";
import { Expense } from "@/types/expense";
import { Income } from "@/types/income";
import { MoreOutlined } from "@ant-design/icons";
import ChartSummary from "@/components/ChartSummary/ChartSummary";
import { setFormat } from "@/hooks/useUtils";
import AddButton from "@/components/AddButton/AddButton";
import { useStateStore } from "@/store/state-store";
import AddIncomeForm from "@/components/AddIncomeForm/AddIncomeForm";
import AddExpenseForm from "@/components/AddExpenseForm/AddExpenseForm";
import { CSVLink } from "react-csv";

type DataType = Expense | Income;

const months: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function Details() {
  // stateStore
  const openModal = useStateStore((state) => state.openModal);
  const addExpense = useStateStore((state) => state.addExpense);
  const addIncome = useStateStore((state) => state.addIncome);
  const setOpenModal = useStateStore((state) => state.setOpenModal);
  const setAddExpense = useStateStore((state) => state.setAddExpense);
  const setAddIncome = useStateStore((state) => state.setAddIncome);

  const router = useRouter();
  const dateQuery: any = router.query.id;
  const { expenses, incomes } = useExpensesStore();

  const expenseMonth = (element: string) => {
    if (typeof element === "string") {
      return parseInt(element.split("-", 2)[1]) - 1;
    } else {
      console.log("posible error ");
    }
  };
  const expenseYear = (element: string) => {
    if (typeof element === "string") {
      return parseInt(element.split("-", 2)[0]);
    } else {
      console.log("posible error ");
    }
  };

  const monthTitle: any = expenseMonth(dateQuery);
  const yearTitle = expenseYear(dateQuery);

  const cardTitle = `${months[monthTitle]} - ${yearTitle}`;

  const getDataExpenses = useGetData(expenses, dateQuery);
  const getDataIncome = useGetData(incomes, dateQuery);

  const dataExpense: DataType[] = getDataExpenses.monthData;
  const dataIncome: DataType[] = getDataIncome.monthData;

  const totalExpenses = getDataExpenses.totalAmount;
  const totalIncome = getDataIncome.totalAmount;

  const footer = (totalAmount: number) => {
    return <div className="list-footer">Total {setFormat(totalAmount)}</div>;
  };

  const { deleteExpense, updateExpense, deleteIncome } = useExpensesStore();

  const onDeleteExpese = (data: DataType) => {
    deleteExpense(data.id);
  };
  const onDeleteIncome = (data: DataType) => {
    deleteIncome(data.id);
  };

  function toDelete(item: any) {
    if (item.category) {
      onDeleteExpese(item);
    } else {
      onDeleteIncome(item);
    }
  }
  function toEdit(item: any) {
    if (item.category) {
      updateExpense(item);
    } else {
      console.log("editar", item);
    }
  }
  // const showModalExpense = (item: any) => {
  //   if (addIncome) {
  //     setAddIncome(false);
  //   }
  //   toEdit(item);
  //   setOpenModal(true);
  //   setAddExpense(true);
  // };
  const popoverContent = (item: any) => (
    <div className="form-buttons">
      <button
        className="add-button-form add-income"
        disabled
        onClick={() => router.push(`itemDetail/${item.id}`)}
      >
        {" "}
        More Info{" "}
      </button>
      <button
        className="add-button-form add-expense"
        onClick={() => toDelete(item)}
      >
        {" "}
        Delete{" "}
      </button>
    </div>
  );

  // const dataToExcel = [...dataIncome, ...dataExpense]

  return (
    <>
      <section className="details-main">
        <h2>{cardTitle} </h2>
        {/* <CSVLink
        data={dataToExcel}
        >
          Download Info
        </CSVLink> */}
        <div className="chart-summary">
          <ChartSummary Expenses={totalExpenses} Income={totalIncome} />
        </div>
        <div className="dataset">
          <div className="tableHeader">
            <h3 className="list-title">Expenses</h3>
            <CSVLink data={dataExpense} filename={`Expenses_${cardTitle}`} >Download Expenses Info</CSVLink>
          </div>

          <List
            itemLayout="horizontal"
            dataSource={dataExpense}
            footer={<div>{footer(totalExpenses)}</div>}
            renderItem={(item: any) => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <div className="list-item">
                      {" "}
                      <div> {item.description} </div>
                      <div className="list-item-right">
                        <div className="list-item-amount">
                          {setFormat(item.amount)}{" "}
                        </div>
                        <Popover
                          placement="topRight"
                          content={popoverContent(item)}
                          trigger="click"
                        >
                          <button className="options-btn">
                            <MoreOutlined />
                          </button>
                        </Popover>
                      </div>{" "}
                    </div>
                  }
                  description={
                    <div className="list-item-description">{`date: ${item.date} - category: ${item.category}`}</div>
                  }
                />
              </List.Item>
            )}
          />
        </div>

        <div className="dataset">
          <div className="tableHeader">
            <h3 className="list-title">Income</h3>
            <CSVLink data={dataIncome} filename={`Income_${cardTitle}`}>Download Income Info</CSVLink>
          </div>

          <List
            itemLayout="horizontal"
            dataSource={dataIncome}
            footer={<div>{footer(totalIncome)}</div>}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <div className="list-item">
                      {" "}
                      <div> {item.description} </div>
                      <div className="list-item-right">
                        <div className="list-item-amount">
                          {setFormat(item.amount)}{" "}
                        </div>
                        <Popover
                          placement="topRight"
                          content={popoverContent(item)}
                          trigger="click"
                        >
                          <button className="options-btn">
                            <MoreOutlined />
                          </button>
                        </Popover>
                      </div>{" "}
                    </div>
                  }
                  description={
                    <div className="list-item-description">{`date: ${item.date}`}</div>
                  }
                />
              </List.Item>
            )}
          />
        </div>
      </section>

      <Modal
        open={openModal}
        onOk={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
        footer={null}
      >
        {addExpense && <AddExpenseForm setOpenModal={setOpenModal} />}
        {addIncome && <AddIncomeForm setOpenModal={setOpenModal} />}
      </Modal>

      <AddButton />
    </>
  );
}
