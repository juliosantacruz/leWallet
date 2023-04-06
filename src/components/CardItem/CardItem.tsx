import { Col, Row } from "antd";
import { Expense } from "@/types/expense";
import React from "react";
import { useExpensesStore } from "@/store/expenses-store";


export default function CardItem({ data, type }: any) {
  const { deleteExpense, deleteIncome } = useExpensesStore();

  const onDelete = () => {
    console.log(data.id);
    if(type === 'income'){
      deleteIncome(data.id);
    }else{
      deleteExpense(data.id);
    }
    
  };
  return (
    <article className="card-item">
      {/* <div className="item-header">
      </div> */}
      <div className="item-content">
        <Row justify={"space-between"} align={"middle"}>
          <Col>
            <small>{data?.category}</small>
          </Col>
          <Col>
            <small>{data?.date}</small>
          </Col>
          <Col></Col>
        </Row>
        <Row justify={"space-between"} align={"middle"}>
          <Col>
            <p>{data?.description}</p>
          </Col>
          <Col>
            <p>${data?.amount}</p>
          </Col>
          <Col>
            <button onClick={onDelete}>Delete</button>
          </Col>
        </Row>
      </div>
    </article>
  );
}
