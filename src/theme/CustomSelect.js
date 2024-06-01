import React from "react";
import { chakraComponents } from "chakra-react-select";
import Select from "react-select";
import { useTheme } from "@chakra-ui/react";

const CustomSelect = (props) => {
  const theme = useTheme();

  const customChakraStyles = {
    dropdownIndicator: (provided) => ({
      ...provided,
      bg: theme.colors.brand[400],
      px: 2,
      cursor: "pointer",
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: "none",
    }),
    menu: (provided) => ({
      ...provided,
      bg: theme.colors.brand[50],
    }),
    option: (provided, state) => ({
      ...provided,
      bg: state.isSelected ? theme.colors.brand[100] : "white",
      color: "black",
      _hover: {
        bg: theme.colors.brand[200],
      },
    }),
    control: (provided) => ({
      ...provided,
      bg: "white",
      borderColor: theme.colors.brand[400],
      _hover: {
        borderColor: theme.colors.brand[500],
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "black",
    }),
  };

  return (
    <Select
      {...props}
      components={chakraComponents}
      styles={customChakraStyles}
      isSearchable={false}
    />
  );
};

export default CustomSelect;
