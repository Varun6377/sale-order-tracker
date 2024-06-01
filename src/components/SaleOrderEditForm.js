import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";

const SaleOrderEditForm = ({ isOpen, onClose, order, onEdit, editable }) => {
  const [editedOrder, setEditedOrder] = useState({ ...order });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedOrder({
      ...editedOrder,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    onEdit(editedOrder);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {editable ? "Edit Sale Order" : "Completed Sale Order"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Customer Name</FormLabel>
            <Input
              type="text"
              name="customerName"
              value={editedOrder.customerName}
              onChange={handleChange}
              isReadOnly={!editable}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Price</FormLabel>
            <Input
              type="number"
              name="price"
              value={editedOrder.price}
              onChange={handleChange}
              isReadOnly={!editable}
            />
          </FormControl>
          {editable && (
            <Button colorScheme="blue" mt={4} onClick={handleSubmit}>
              Save Changes
            </Button>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SaleOrderEditForm;
