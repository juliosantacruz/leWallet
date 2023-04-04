import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";

export default function AddButton({isModalOpen, setIsModalOpen}:any) {
  const showModal = () => {
    setIsModalOpen(true);
  };
  return (
    <div className="add-button">
      <Button 
      type="primary" 
      shape="circle" 
      className="add-button-button" 
      onClick={showModal}>
        <PlusOutlined className="add-button-icon" />
      </Button>
    </div>
  );
}
