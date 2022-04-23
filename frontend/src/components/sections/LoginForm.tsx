import { useBreakpointValue, VStack } from "@chakra-ui/react";
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
  const initialVaules: LoginFormValues = { email: "", password: "" };

  const formSpacing = useBreakpointValue({ base: 4, md: 6, lg: 8 });

  return (
    <Formik
      initialValues={initialVaules}
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
              icon={<AtSignIcon />}
            />
            <PasswordInputField name='password' placeholder='Password' />
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
