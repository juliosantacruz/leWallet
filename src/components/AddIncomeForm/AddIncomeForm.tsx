import { Col, Row } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useExpensesStore } from "@/store/expenses-store";
import { v4 } from "uuid";

import useTime from "@/hooks/useTime";
import { Income } from "@/types/income";

export default function AddIncomeForm() {
  const { incomes, addIncome } = useExpensesStore();
  const { getToday } = useTime();
  const today: any = getToday(dayjs());
  const defaultExpenseValue = {
    id: v4(),
    description: "",
    date: today,
    amount: "",
  };
  const [formData, setFormData] = useState<Income>(defaultExpenseValue);
  
  const onSubmit = (event: any) => {
    event.preventDefault();
    if (formData.description.length === 0) {
      addIncome({
        ...formData,
        description: "Generic Income",
      });
      onClear();
    } else {
        addIncome(formData);
      onClear();
    }
  };

  const onChange = (event: any) => {
    const dato = event?.target.value;
    setFormData({
      ...formData,
      [event.target.name]: dato,
    });
  };
  const onClear = () => {
    setFormData(defaultExpenseValue);
  };

  return (
    <div className="form-card">
    <h2>Add Income</h2>
    
    <form className="AddForm" onSubmit={(event) => onSubmit(event)}>
      <div className="form-content">
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <div className="inputElement">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                name="description"
                placeholder="Income"
                onChange={(event) => onChange(event)}
                value={formData.description}
              />
            </div>
          </Col>
          <Col span={12}>
            <div className="inputElement">
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                name="amount"
                placeholder="$?"
                required
                onChange={(event) => onChange(event)}
                value={formData.amount}
              />
            </div>
          </Col>
          <Col span={12}>
            <div className="inputElement">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                name="date"
                id="date"
                required
                onChange={(event) => onChange(event)}
                value={formData.date}
              />
            </div>
          </Col>
          <Col span={24}>
            
          </Col>
        </Row>
      </div>
      <div className="form-footer">
        <Row justify={"space-between"}>
          <button type="button" className="formButton  clear" onClick={onClear}>
            Clear
          </button>
          <button type="submit" className="formButton success">
            Save
          </button>
        </Row>
      </div>
    </form></div>
  );
}
