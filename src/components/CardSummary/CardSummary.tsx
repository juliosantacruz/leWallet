import { Col, Progress, Row } from "antd";
import React from "react";
import { useExpensesStore } from "@/store/expenses-store";
import { Income } from "@/types/income";
import { Expense } from "@/types/expense";
import { setFormat } from "../../hooks/useUtils";

const setMonthYear = (element: Expense | Income) => {
  const expenseMonth = parseInt(element.date.split("-", 2)[1]);
  const expenseYear = parseInt(element.date.split("-", 2)[0]);
  return expenseYear + "-" + expenseMonth;
};
const expenseMonth = (element: string) =>
  parseInt(element.split("-", 2)[1]) - 1;
const expenseYear = (element: string) => parseInt(element.split("-", 2)[0]);
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
export default function CardSummary({ dateCard }: any) {
  const { expenses, incomes } = useExpensesStore();

  const monthExpenses: Expense[] = [];
  expenses.forEach((expense: Expense) => {
    if (setMonthYear(expense) === dateCard) {
      monthExpenses.push(expense);
    }
  });
  const arrayExpensesAmount: number[] = [];
  monthExpenses.forEach((expense) =>
    arrayExpensesAmount.push(Number(expense.amount))
  );
  const expensesAmount = arrayExpensesAmount.reduce((a, b) => a + b, 0);

  const monthIncomes: Income[] = [];
  incomes.forEach((income: Income) => {
    if (setMonthYear(income) === dateCard) {
      monthIncomes.push(income);
    }
  });
  const arrayIncomesAmount: number[] = [];
  monthIncomes.forEach((expense) =>
    arrayIncomesAmount.push(Number(expense.amount))
  );
  const incomeAmount = arrayIncomesAmount.reduce((a, b) => a + b, 0);

  const monthTitle = expenseMonth(dateCard);
  const yearTitle = expenseYear(dateCard);
  const cardTitle = `${months[monthTitle]} - ${yearTitle}`;

  const GastoPorcentaje = (expensesAmount / incomeAmount) * 100;

const balanceStyle=(amount:any) =>{
  if(amount>0){
    return 'amount'
  }else{
    return `amount broke`
  }
}

  return (
    <article className="card-summary">
      <div className="card-title">
        <h2> {cardTitle}</h2>
      </div>
      <div className="card-content">
        <Row justify={"space-between"}>
          <Col>
            <p>Expenses: </p>
          </Col>
          <Col>
            <div className="amount">
              <p>{setFormat(expensesAmount)}</p>
            </div>
          </Col>
        </Row>
        <Row justify={"space-between"}>
          <Col>
            <p>Income: </p>
          </Col>
          <Col>
            <div className="amount">
              <p>{setFormat(incomeAmount)}</p>
            </div>
          </Col>
        </Row>
        <Row justify={"space-between"}>
          <Col>
            <p>Balance: </p>
          </Col>
          <Col>
            <div className={balanceStyle(incomeAmount - expensesAmount)}>
              <p>{setFormat(incomeAmount - expensesAmount)}</p>
            </div>
          </Col>
        </Row>
      </div>

      <div className="card-footer">
        <Progress
          type="line"
          percent={GastoPorcentaje}
          status={ProgressBarColor(GastoPorcentaje)}
          showInfo={false}
        />
      </div>
    </article>
  );
}
const ProgressBarColor = (number: number) => {
  if (number === 100) {
    return "success";
  }
  if (number > 100) {
    return "exception";
  }
  if (number < 100) {
    return "active";
  }
};
