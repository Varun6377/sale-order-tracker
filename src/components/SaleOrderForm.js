import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  HStack,
  Box,
  Text,
  Alert,
  AlertIcon,
  CloseButton,
} from "@chakra-ui/react";
import CustomSelect from "../theme/CustomSelect";
import { useForm, useFieldArray } from "react-hook-form";
import { products } from "../mockData/products";
import { customers } from "../mockData/customers";

const generateRandomInvoiceNumber = () => {
  return Math.floor(1000000 + Math.random() * 9000000).toString();
};

const SaleOrderModal = ({ isOpen, onClose, onCreate }) => {
  const { register, handleSubmit, control, reset } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const [warningMessage, setWarningMessage] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const onSubmit = (data) => {
    const saleOrderData = {
      customer_id: selectedCustomer,
      items: data.items.map((item) => ({
        sku_id: item.productId,
        price: parseFloat(item.price),
        quantity: parseInt(item.quantity, 10),
      })),
      paid: true,
      invoice_no: generateRandomInvoiceNumber(),
      invoice_date: new Date().toISOString().split("T")[0],
    };

    onCreate(saleOrderData);

    reset({ items: [] });
    setSelectedOptions([]);
    setSelectedCustomer(null);
    onClose();
  };

  const handleProductSelect = (options) => {
    const newOptions = options || [];
    const newOptionIds = newOptions.map((option) => parseInt(option.value, 10));
    const currentOptionIds = selectedOptions.map((option) =>
      parseInt(option.value, 10)
    );

    newOptionIds.forEach((optionId) => {
      if (!currentOptionIds.includes(optionId)) {
        const selectedProduct = products.find(
          (product) => product.id === optionId
        );

        if (selectedProduct) {
          const firstSku = selectedProduct.sku[0];
          append({
            productId: selectedProduct.id,
            productName: selectedProduct.name,
            productPrice: firstSku ? firstSku.selling_price.toFixed(2) : "N/A",
            price: "",
            quantity: "",
          });
          setWarningMessage("");
        }
      }
    });

    currentOptionIds.forEach((optionId, index) => {
      if (!newOptionIds.includes(optionId)) {
        remove(index);
      }
    });

    setSelectedOptions(newOptions);
  };

  const handleSelect = (value) => {
    setSelectedCustomer(value?.value || null);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sale Order</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {warningMessage && (
            <Alert status="warning">
              <AlertIcon />
              {warningMessage}
              <CloseButton
                position="absolute"
                right="8px"
                top="8px"
                onClick={() => setWarningMessage("")}
              />
            </Alert>
          )}
          <VStack
            as="form"
            onSubmit={handleSubmit(onSubmit)}
            spacing={4}
            width="full"
          >
            <FormControl id="select">
              <FormLabel>Select Customer</FormLabel>
              <CustomSelect
                options={customers.map((customer) => ({
                  value: customer.customer_profile.id,
                  label: customer.customer_profile.name,
                }))}
                placeholder="Select Customer"
                onChange={handleSelect}
                required
              />
            </FormControl>

            <FormControl id="productSelect">
              <FormLabel>Select Products</FormLabel>
              <CustomSelect
                isClearable={false}
                isMulti
                options={products.map((product) => ({
                  value: product.id,
                  label: product.name,
                }))}
                onChange={handleProductSelect}
                value={selectedOptions}
                placeholder="All Products"
              />
            </FormControl>

            {fields.map((item, index) => (
              <Box
                key={item.id}
                borderWidth="1px"
                borderRadius="lg"
                p={4}
                width="full"
                position="relative"
              >
                <Text fontWeight="bold" mb={2}>
                  {item.productName}
                </Text>
                <Text position="absolute" top={4} right={4} color="green.300">
                  Price: ${item.productPrice}
                </Text>
                <HStack spacing={4}>
                  <FormControl id={`items[${index}].price`} isRequired>
                    <FormLabel>Selling Price</FormLabel>
                    <Input
                      type="number"
                      placeholder="Enter selling price"
                      onKeyDown={(e) => {
                        if (e.key === "-") {
                          e.preventDefault();
                        }
                      }}
                      step="0.01"
                      {...register(`items[${index}].price`, { required: true })}
                    />
                  </FormControl>

                  <FormControl id={`items[${index}].quantity`} isRequired>
                    <FormLabel>Total items</FormLabel>
                    <Input
                      type="number"
                      placeholder="Enter quantity"
                      {...register(`items[${index}].quantity`, {
                        required: true,
                      })}
                      onKeyDown={(e) => {
                        if (e.key === "-") {
                          e.preventDefault();
                        }
                      }}
                    />
                  </FormControl>
                </HStack>
              </Box>
            ))}

            <Button type="submit" colorScheme="blue" width="full">
              Create Sale Order
            </Button>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SaleOrderModal;
