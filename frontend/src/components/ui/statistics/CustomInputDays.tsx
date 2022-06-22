import { HStack, Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import CustomNumberInput from "../form/CustomNumberInput";

interface CustomInputDaysProps {
  setQuery: Dispatch<SetStateAction<string>>;
  color?: string;
}

const CustomInputDays: React.FC<CustomInputDaysProps> = ({
  setQuery,
  color = "teal",
}) => {
  const [currentValue, setCurrentValue] = useState(1);

  useEffect(() => {
    setQuery(`?customFrom=${1}`);
  }, [setQuery]);

  return (
    <HStack justifyContent='center'>
      <Text>Last</Text>
      <CustomNumberInput
        color={color}
        defaultValue={currentValue}
        min={1}
        onChange={(value) => {
          setQuery(`?customFrom=${value}`);
          setCurrentValue(Number(value));
        }}
        w={currentValue < 1000 ? "80px" : "auto"}
      />
      <Text>{currentValue === 1 ? "day" : "days"}</Text>
    </HStack>
  );
};

export default CustomInputDays;
