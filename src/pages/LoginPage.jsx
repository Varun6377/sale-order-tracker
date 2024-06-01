import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  VStack,
  useToast,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "../components/ThemeToggle";

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const onSubmit = ({ username, password }) => {
    if (login(username, password)) {
      navigate("/");
    } else {
      toast({
        title: "Invalid credentials",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const bgColor = useColorModeValue("gray.100", "gray.900");
  const boxBgColor = useColorModeValue("white", "gray.800");

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bg={bgColor}
    >
      <Box
        width="100%"
        maxW="md"
        bg={boxBgColor}
        p={6}
        rounded="lg"
        shadow="lg"
      >
        <Flex justify="space-between" mb={4}>
          <Heading as="h1" size="lg">
            Login
          </Heading>
          <ThemeToggle />
        </Flex>
        <VStack as="form" onSubmit={handleSubmit(onSubmit)} spacing={4}>
          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              placeholder="Enter your username"
              {...register("username")}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              {...register("password")}
            />
          </FormControl>
          <Button type="submit" colorScheme="blue" width="full" mt={4}>
            Login
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default LoginPage;
