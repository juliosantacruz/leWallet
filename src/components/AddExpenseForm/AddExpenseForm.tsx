import { Col, Row } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useExpensesStore } from "@/store/expenses-store";
import { v4 } from "uuid";
import { Expense } from "@/types/expense";
import useTime from "@/hooks/useTime";

export default function AddExpenseForm({setOpenModal}:any) {
  const { addExpense } = useExpensesStore();
  const { getToday } = useTime();
  const today: any = getToday(dayjs());

  const defaultExpenseValue = {
    id: v4(),
    description: "",
    category: "alimentosBebidas",
    date: today,
    amount: "",
    latitud: null,
    longitud: null,
  };
  const [formData, setFormData] = useState<Expense>(defaultExpenseValue);

  const onSubmit = (event: any) => {
    event.preventDefault();

    navigator.geolocation.getCurrentPosition(
      position => {
        setFormData({
          ...formData,
          latitud: position.coords.latitude,
          longitud: position.coords.longitude,
        });
      },
      error => {
        console.log(error.message)
      }
    );
    
    if (formData.description.length === 0) {
      addExpense({
        ...formData,
        description: "Generic Expense",
      });
      onClear();
      setOpenModal(false);
    } else {
      addExpense(formData);
      onClear();
      setOpenModal(false);

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
    <h2>Add Expense</h2>
    <form className="AddForm" onSubmit={(event) => onSubmit(event)}>
      <div className="form-content">
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <div className="inputElement">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                name="description"
                placeholder="Expense"
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
            <div className="inputElement">
              <label htmlFor="category">Category</label>
              <select
                name="category"
                id="category"
                required
                onChange={(event) => onChange(event)}
                value={formData.category}
              >
                <option value="alimentosBebidas">Alimentos y Bebidas</option>
                <option value="transporte">Transporte</option>
                <option value="educacion">Educacion</option>
                <option value="hogar">Hogar</option>
                <option value="salud">Salud y Cuidado personal</option>
                <option value="gastosPersonales">Gastos Personales</option>
              </select>
            </div>
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
