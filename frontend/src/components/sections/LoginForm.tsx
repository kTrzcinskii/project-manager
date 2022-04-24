import { useBreakpointValue, VStack, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import LoginFormSchema from "../../utils/LoginFormSchema";
import InputField from "../ui/InputField";
import PasswordInputField from "../ui/PasswordInputField";
import { AtSignIcon } from "@chakra-ui/icons";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const initialValues: LoginFormValues = { email: "", password: "" };

  const formSpacing = useBreakpointValue({ base: 4, md: 6, lg: 8 });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, action) => {
        console.log(values);
      }}
      validationSchema={LoginFormSchema}
    >
      {({ isSubmitting }) => (
        <Form>
          <VStack w='full' align='flex-start' spacing={formSpacing}>
            <InputField
              name='email'
              type='email'
              placeholder='Email'
              icon={<AtSignIcon color='teal.700' />}
            />
            <PasswordInputField name='password' placeholder='Password' />
            <Button
              type='submit'
              colorScheme='teal'
              w='full'
              _focus={{ ring: 3, ringColor: "teal.800" }}
            >
              Login
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
