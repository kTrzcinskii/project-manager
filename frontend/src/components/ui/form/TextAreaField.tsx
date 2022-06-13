import {
  FormControl,
  FormErrorMessage,
  Textarea,
  TextareaProps,
} from "@chakra-ui/react";
import { useField } from "formik";
import { ReactNode, TextareaHTMLAttributes } from "react";

type TextAreaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
  TextareaProps & {
    name: string;
    icon?: ReactNode;
  };

const TextAreaField: React.FC<TextAreaFieldProps> = ({ icon, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <FormControl isInvalid={meta.touched && !!meta.error}>
      <Textarea
        {...field}
        {...props}
        id={field.name}
        variant='filled'
        _focus={{ borderColor: "teal.500", borderWidth: 2 }}
      />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default TextAreaField;
