import {
  ComponentWithAs,
  FormControl,
  FormErrorMessage,
  IconProps,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
} from "@chakra-ui/react";
import { useField } from "formik";
import { InputHTMLAttributes, ReactNode } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> &
  InputProps & {
    name: string;
    icon?: ReactNode;
  };

const InputField: React.FC<InputFieldProps> = ({ icon, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <FormControl isInvalid={meta.touched && !!meta.error}>
      <InputGroup>
        {icon && <InputLeftElement>{icon}</InputLeftElement>}
        <Input {...field} {...props} id={field.name} />
      </InputGroup>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default InputField;
