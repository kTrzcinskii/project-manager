import { AtSignIcon } from "@chakra-ui/icons";
import { Button, useBreakpointValue, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import RegisterFormSchema from "../../utils/RegisterFormSchema";
import InputField from "../ui/InputField";
import PasswordInputField from "../ui/PasswordInputField";
import { FaUser } from "react-icons/fa";
import IRegisterFormValues from "../../interfaces/IRegisterFormValues";
import useRegister from "../../hooks/mutation/useRegister";
import axios from "axios";
import { useRouter } from "next/router";
import transfromAPIErrors from "../../utils/transformAPIErrors";

const RegisterForm: React.FC = () => {
  const router = useRouter();

  const initialValues: IRegisterFormValues = {
    username: "",
    email: "",
    password: "",
  };

  const formSpacing = useBreakpointValue({ base: 4, md: 6, lg: 8 });

  const mutation = useRegister();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, action) => {
        mutation.mutate(values, {
          onSuccess: () => {
            router.push("/home");
          },
          onError: (error) => {
            action.setSubmitting(false);
            if (axios.isAxiosError(error)) {
              action.setErrors(
                transfromAPIErrors(error, ["username", "email", "password"])
              );
            }
          },
        });
      }}
      validationSchema={RegisterFormSchema}
    >
      {({ isSubmitting, values, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <VStack w='full' align='flex-start' spacing={formSpacing}>
            <InputField
              name='username'
              type='text'
              placeholder='Username'
              icon={<FaUser color='#285E61' />}
              value={values.username}
            />
            <InputField
              name='email'
              type='email'
              placeholder='Email'
              icon={<AtSignIcon color='teal.700' />}
              value={values.email}
            />
            <PasswordInputField
              name='password'
              placeholder='Password'
              value={values.password}
            />
            <Button
              type='submit'
              colorScheme='teal'
              w='full'
              _focus={{ ring: 3, ringColor: "teal.800" }}
              isLoading={isSubmitting}
              loadingText='Register'
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