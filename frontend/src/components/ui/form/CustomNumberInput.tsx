import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputProps,
} from "@chakra-ui/number-input";

type CustomNumberInputProps = NumberInputProps & {
  color?: string;
};

const CustomNumberInput: React.FC<CustomNumberInputProps> = ({
  color = "teal",
  ...props
}) => {
  return (
    <NumberInput
      {...props}
      bgColor='gray.100'
      borderColor='gray.100'
      borderRadius='md'
      _hover={{ bgColor: "gray.200", borderColor: "gray.200" }}
      maxH='38px'
      role='group'
      focusBorderColor={`${color}.500`}
    >
      <NumberInputField
        maxH='38px'
        _hover={{ bgColor: "gray.200", borderColor: "gray.200" }}
      />

      <NumberInputStepper>
        <NumberIncrementStepper
          borderColor='gray.100'
          _hover={{ color: `${color}.400` }}
          _groupHover={{ borderColor: "gray.200" }}
          _groupFocusWithin={{ color: `${color}.500` }}
          _active={{}}
        />
        <NumberDecrementStepper
          borderColor='gray.100'
          _groupHover={{ borderColor: "gray.200" }}
          _hover={{ color: `${color}.400` }}
          _groupFocusWithin={{ color: `${color}.500` }}
          _active={{}}
        />
      </NumberInputStepper>
    </NumberInput>
  );
};

export default CustomNumberInput;
