import React from "react";
import {
  Box,
  VStack,
  Flex,
  Spacer,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
} from "@chakra-ui/react";
import ThemeToggle from "../components/ThemeToggle";
import SaleOrdersTable from "../components/SaleOrdersTable";
import SaleOrderForm from "../components/SaleOrderForm";
import { useAuth } from "../context/AuthContext";
import { customers } from "../mockData/customers";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchOrders, fetchCompletedOrders } from "../mockData/order";

const Dashboard = () => {
  const { logout } = useAuth();
  const queryClient = useQueryClient();

  const { data: activeOrders, isLoading: isLoadingActiveOrders } = useQuery({
    queryKey: ["activeOrders"],
    queryFn: fetchOrders,
  });

  const { data: completedOrders, isLoading: isLoadingCompletedOrders } =
    useQuery({
      queryKey: ["completedOrders"],
      queryFn: fetchCompletedOrders,
    });

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingOrder, setEditingOrder] = React.useState(null);
  const [isEditMode, setIsEditMode] = React.useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingOrder(null);
    setIsEditMode(false);
  };

  const findCustomerById = (id) => {
    return customers.find(
      (customer) => customer.customer_profile.id === parseInt(id)
    );
  };

  const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleNewSaleOrder = (newOrder) => {
    const matchedCustomer = findCustomerById(newOrder.customer_id);
    if (matchedCustomer) {
      const totalPrice = calculateTotalPrice(newOrder.items);
      const newActiveOrder = {
        id: activeOrders.length + 1,
        customerName: matchedCustomer.customer_profile.name,
        price: totalPrice,
        lastModified: newOrder.invoice_date,
      };

      queryClient.setQueryData(["activeOrders"], (oldOrders) => [
        ...oldOrders,
        newActiveOrder,
      ]);
    } else {
      console.log("No matched customer found for ID:", newOrder.customer_id);
    }

    closeModal();
  };

  const handleEditOrder = (editedOrder) => {
    queryClient.setQueryData(["activeOrders"], (oldOrders) =>
      oldOrders.map((order) =>
        order.id === editedOrder.id
          ? { ...editedOrder, lastModified: new Date().toISOString() }
          : order
      )
    );
    closeModal();
  };

  return (
    <Box p={4}>
      <Flex mb={6}>
        <Button colorScheme="blue" onClick={logout}>
          Logout
        </Button>
        <Spacer />
        <ThemeToggle />
      </Flex>
      <Flex mb={4} justify="flex-end">
        <Button colorScheme="blue" onClick={openModal}>
          + Sale Order
        </Button>
      </Flex>
      <Tabs variant="enclosed">
        <TabList>
          <Tab>Active Sale Orders</Tab>
          <Tab>Completed Sale Orders</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {isLoadingActiveOrders ? (
              <div>Loading active orders...</div>
            ) : (
              <VStack spacing={4} align="stretch">
                <SaleOrdersTable
                  orders={activeOrders}
                  editable
                  onEdit={handleEditOrder}
                  editingOrder={editingOrder}
                  isEditMode={isEditMode}
                />
              </VStack>
            )}
          </TabPanel>
          <TabPanel>
            {isLoadingCompletedOrders ? (
              <div>Loading completed orders...</div>
            ) : (
              <VStack spacing={4} align="stretch">
                <SaleOrdersTable orders={completedOrders} />
              </VStack>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
      <SaleOrderForm
        isOpen={isModalOpen}
        onClose={closeModal}
        onCreate={handleNewSaleOrder}
      />
    </Box>
  );
};

export default Dashboard;
