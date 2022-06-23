import {
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
} from "@chakra-ui/react";
import { useField } from "formik";
import { InputHTMLAttributes, LegacyRef, ReactNode } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> &
  InputProps & {
    name: string;
    icon?: ReactNode;
    myRef?: LegacyRef<HTMLInputElement> | undefined;
    color?: string;
  };

const InputField: React.FC<InputFieldProps> = ({
  icon,
  myRef,
  color = "teal",
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <FormControl isInvalid={meta.touched && !!meta.error}>
      <InputGroup>
        {icon && <InputLeftElement>{icon}</InputLeftElement>}
        <Input
          {...field}
          {...props}
          id={field.name}
          variant='filled'
          _focus={{ borderColor: `${color}.500`, borderWidth: 2 }}
          ref={myRef}
        />
      </InputGroup>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default InputField;
