import { PlusOutlined } from "@ant-design/icons";
import { Button, Popover } from "antd";
import React from "react";

export default function AddButton({ openModal, setOpenModal,setAddExpense, setAddIncome }: any) {
  const showModalExpense = () => {
    setOpenModal(true);
    setAddExpense(true)
  };
  const showModalIncome = () => {
    setOpenModal(true);
    setAddIncome(true)
  };
  const popoverContent = (
    <div className="form-buttons">
      <button className="add-button-form add-income" onClick={showModalIncome}>add Income</button>
      <button className="add-button-form add-expense" onClick={showModalExpense}>add Expense</button>
    </div>
  );
  return (
    <div className="add-button">
      <Popover placement="topRight" content={popoverContent} trigger="click">
        <Button type="primary" shape="circle" className="add-button-button">
          <PlusOutlined className="add-button-icon" />
        </Button>
      </Popover>
    </div>
  );
}
