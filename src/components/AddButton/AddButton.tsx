import { useStateStore } from "@/store/state-store";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Popover } from "antd";
import React from "react";

export default function AddButton() {
  // stateStore
  const openModal = useStateStore((state) => state.openModal);
  const addExpense = useStateStore((state) => state.addExpense);
  const addIncome = useStateStore((state) => state.addIncome);
  const setOpenModal = useStateStore((state) => state.setOpenModal);
  const setAddExpense = useStateStore((state) => state.setAddExpense);
  const setAddIncome = useStateStore((state) => state.setAddIncome);

  const showModalExpense = () => {
    if (addIncome) {
      setAddIncome(false);
    }
    setOpenModal(true);
    setAddExpense(true);
  };
  const showModalIncome = () => {
    if(addExpense){setAddExpense(false)}
    setOpenModal(true);
    setAddIncome(true);
  };
  const popoverContent = (
    <div className="form-buttons">
      <button className="add-button-form add-income" onClick={showModalIncome}>
        add Income
      </button>
      <button
        className="add-button-form add-expense"
        onClick={showModalExpense}
      >
        add Expense
      </button>
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
