import React from "react";
import { List, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useExpensesStore } from "@/store/expenses-store";
import { useRouter } from "next/router";
import useGetData from "@/hooks/useGetData";
import { Expense } from "@/types/expense";
import { Income } from "@/types/income";
import { CloseCircleOutlined } from "@ant-design/icons";
import ChartSummary from "@/components/ChartSummary/ChartSummary";

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
  const router = useRouter();
  const dateQuery: any = router.query.id;
  const { expenses, incomes } = useExpensesStore();

  const expenseMonth = (element: string) => {
    if (typeof element === "string") {
      return parseInt(element.split("-", 2)[1]) - 1;
    } else {
      console.log("valor no string == error improbable");
    }
  };
  const expenseYear = (element: string) => {
    if (typeof element === "string") {
      return parseInt(element.split("-", 2)[0]);
    } else {
      console.log("valor no string == error improbable");
    }
  };

  const monthTitle:any = expenseMonth(dateQuery);
  const yearTitle = expenseYear(dateQuery);

  const cardTitle = `${months[monthTitle]} - ${yearTitle}`;

  const getDataExpenses = useGetData(expenses, dateQuery);
  const getDataIncome = useGetData(incomes, dateQuery);

  const dataExpense: DataType[] = getDataExpenses.monthData;
  const dataIncome: DataType[] = getDataIncome.monthData;

  const totalExpenses = getDataExpenses.totalAmount;
  const totalIncome = getDataIncome.totalAmount;

  const footer = (totalAmount: number) => {
    return <div className="list-footer">Total ${totalAmount}</div>;
  };

  const { deleteExpense, deleteIncome } = useExpensesStore();

  const onDeleteExpese = (data: DataType) => {
    deleteExpense(data.id);
  };
  const onDeleteIncome = (data: DataType) => {
    deleteIncome(data.id);
  };

  return (
    <section className="details-main">
      <h2>{cardTitle} </h2>
      <div className="chart-summary">
        <ChartSummary Expenses={totalExpenses} Income={totalIncome} />
      </div>
      <div className="dataset">
        <h3 className="list-title">Expenses</h3>

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
                      <div className="list-item-amount">${item.amount} </div>
                      <button
                        className="delete-btn"
                        onClick={() => onDeleteExpese(item)}
                      >
                        <CloseCircleOutlined />
                      </button>
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
        <h3 className="list-title">Income</h3>
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
                      <div className="list-item-amount">${item.amount} </div>
                      <button
                        className="delete-btn"
                        onClick={() => onDeleteIncome(item)}
                      >
                        <CloseCircleOutlined />
                      </button>
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
  );
}
