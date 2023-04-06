import React from "react";
import { List, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useExpensesStore } from "@/store/expenses-store";
import { useRouter } from "next/router";
import useGetData from "@/hooks/useGetData";
import { Expense } from "@/types/expense";
import { Income } from "@/types/income";
import { CloseCircleOutlined, FileAddOutlined } from "@ant-design/icons";
import ChartSummary from "@/components/ChartSummary/ChartSummary";

type DataType = Expense | Income;

const dateFormat = (date: any) => {
  const month = date.split("-", 3)[1];
  const day = date.split("-", 3)[2];

  return `${month}-${day}`;
};

export default function Details() {
  const router = useRouter();
  const dateQuery = router.query.id;
  const { expenses, incomes } = useExpensesStore();

  const getDataExpenses = useGetData(expenses, dateQuery);
  const getDataIncome = useGetData(incomes, dateQuery);

  const dataExpense: DataType[] = getDataExpenses.monthData;
  const dataIncome: DataType[] = getDataIncome.monthData;

  const totalExpenses = getDataExpenses.totalAmount;
  const totalIncome = getDataIncome.totalAmount;

  const expenseColumns: ColumnsType<DataType> = [
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => <a>{text}</a>,
      width: "25%",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      ellipsis: true,
      width: "20%",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: "20%",
      render: (_, record) => <span>{dateFormat(record.date)}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      width: "20%",
      render: (_, record) => <span>${record.amount}</span>,
    },
    {
      // title: () => (
      //   <button
      //     style={{ width: "100%" }}
      //     onClick={() => {
      //       console.log("agregar");
      //     }}
      //   >
      //     <FileAddOutlined />
      //   </button>
      // ),
      key: "action",
      render: (_, record) => (
        <button className="delete-btn" onClick={() => onDeleteExpese(record)}>
          <CloseCircleOutlined />
        </button>
      ),
      width: "10%",
    },
  ];
  const incomeColumns: ColumnsType<DataType> = [
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: "20%",
      render: (_, record) => <span>{dateFormat(record.date)}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      width: "20%",
      render: (_, record) => <span>${record.amount}</span>,
    },
    {
      // title: () => (
      //   <button
      //     style={{ width: "100%" }}
      //     onClick={() => {
      //       console.log("agregar");
      //     }}
      //   >
      //     <FileAddOutlined />
      //   </button>
      // ),
      key: "action",
      render: (_, record) => (
        <button className="delete-btn" onClick={() => onDeleteIncome(record)}>
          <CloseCircleOutlined />
        </button>
      ),
      width: "10%",
    },
  ];
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
      <h2>Title {router.query.id} </h2>
        <div className="chart-summary">
          <ChartSummary Expenses={totalExpenses} Income={totalIncome} />
        </div>
      <div className="dataset">
        <h3 className="list-title">Expenses</h3>

        <List
          itemLayout="horizontal"
          dataSource={dataExpense}
          footer={<div>{footer(totalExpenses)}</div>}
          renderItem={(item, index) => (
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
                  <div className="list-item-description">{`date: ${item.date}`}</div>
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
          renderItem={(item, index) => (
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
