import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
} from "@chakra-ui/react";
import { useField } from "formik";
import { InputHTMLAttributes, useState } from "react";

type PasswordInputFieldProps = InputHTMLAttributes<HTMLInputElement> &
  InputProps & {
    label: string;
    name: string;
  };

const PasswordInputField: React.FC<PasswordInputFieldProps> = ({
  label,
  ...props
}) => {
  const [field, meta] = useField(props);

  const [show, setShow] = useState(false);

  return (
    <FormControl isInvalid={meta.touched && !!meta.error}>
      <FormLabel htmlFor='password'>{label}</FormLabel>
      <InputGroup>
        <Input
          {...field}
          {...props}
          id='passwword'
          type={show ? "text" : "password"}
        />
        <InputRightElement>
          <Button onClick={() => setShow(!show)}>
            change me to an eye icon
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default PasswordInputField;
