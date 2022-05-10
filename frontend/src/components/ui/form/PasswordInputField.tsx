import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
} from "@chakra-ui/react";
import { useField } from "formik";
import { InputHTMLAttributes, LegacyRef, useState } from "react";
import { LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

type PasswordInputFieldProps = InputHTMLAttributes<HTMLInputElement> &
  InputProps & {
    name: string;
    myRef?: LegacyRef<HTMLInputElement> | undefined;
  };

const PasswordInputField: React.FC<PasswordInputFieldProps> = ({
  myRef,
  ...props
}) => {
  const [field, meta] = useField(props);

  const [show, setShow] = useState(false);

  return (
    <FormControl isInvalid={meta.touched && !!meta.error}>
      <InputGroup>
        <InputLeftElement>
          <LockIcon color='teal.700' />
        </InputLeftElement>
        <Input
          {...field}
          {...props}
          id='passwword'
          type={show ? "text" : "password"}
          variant='filled'
          _focus={{ borderColor: "teal.500", borderWidth: 2 }}
          ref={myRef}
        />
        <InputRightElement>
          <Button onClick={() => setShow(!show)} variant='unstyled' _focus={{}}>
            {show ? (
              <ViewOffIcon color='teal.700' />
            ) : (
              <ViewIcon color='teal.700' />
            )}
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default PasswordInputField;
