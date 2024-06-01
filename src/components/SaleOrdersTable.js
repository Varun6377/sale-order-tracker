import React, { useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue,
} from "@chakra-ui/react";
import SaleOrderEditForm from "./SaleOrderEditForm";

const SaleOrdersTable = ({ orders, editable, onEdit }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const openEditModal = (order) => {
    setSelectedOrder(order);
  };

  const closeEditModal = () => {
    setSelectedOrder(null);
  };
  const filter = useColorModeValue("none", "invert(1)");

  return (
    <Box width="100%">
      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Customer Name</Th>
            <Th>Price</Th>
            <Th>Last Modified</Th>
            <Th>Edit/View</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders.map((order) => (
            <Tr key={order.id}>
              <Td>{order.id}</Td>
              <Td>{order.customerName}</Td>
              <Td>{order.price}</Td>
              <Td>{new Date(order.lastModified).toLocaleString()}</Td>
              <Td>
                <img
                  src="/dots.png"
                  width={25}
                  height={20}
                  alt="Edit"
                  onClick={() => openEditModal(order)}
                  style={{ cursor: "pointer", filter }}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {selectedOrder && (
        <SaleOrderEditForm
          isOpen={true}
          onClose={closeEditModal}
          order={selectedOrder}
          editable={editable}
          onEdit={onEdit}
        />
      )}
    </Box>
  );
};

export default SaleOrdersTable;
