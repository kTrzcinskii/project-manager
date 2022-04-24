import { AtSignIcon } from "@chakra-ui/icons";
import { Button, useBreakpointValue, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import RegisterFormSchema from "../../utils/RegisterFormSchema";
import InputField from "../ui/InputField";
import PasswordInputField from "../ui/PasswordInputField";
import { FaUser } from "react-icons/fa";
import IRegisterFormValues from "../../lib/interfaces/IRegisterFormValues";

const RegisterForm: React.FC = () => {
  const initialValues: IRegisterFormValues = {
    username: "",
    email: "",
    password: "",
  };

  const formSpacing = useBreakpointValue({ base: 4, md: 6, lg: 8 });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, action) => {
        console.log(values);
      }}
      validationSchema={RegisterFormSchema}
    >
      {({ isSubmitting }) => (
        <Form>
          <VStack w='full' align='flex-start' spacing={formSpacing}>
            <InputField
              name='username'
              type='text'
              placeholder='Username'
              icon={<FaUser color='#285E61' />}
            />
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
              Register
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
