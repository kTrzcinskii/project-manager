import { useBreakpointValue, VStack, Button, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import LoginFormSchema from "../../utils/schemas/LoginFormSchema";
import InputField from "../ui/form/InputField";
import PasswordInputField from "../ui/form/PasswordInputField";
import { AtSignIcon } from "@chakra-ui/icons";
import ILoginFormValues from "../../interfaces/ILoginFormValues";
import useLogin from "../../hooks/mutation/useLogin";
import { useRouter } from "next/router";
import axios from "axios";
import transfromAPIErrors from "../../utils/transformAPIErrors";

const LoginForm: React.FC = () => {
  const router = useRouter();

  const initialValues: ILoginFormValues = { email: "", password: "" };

  const formSpacing = useBreakpointValue({ base: 4, md: 6, lg: 8 });

  const mutation = useLogin();

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
                transfromAPIErrors(error, ["email", "password"])
              );
              if (
                typeof error.response?.data.message === "string" &&
                error.response.data.message.includes("credentials")
              ) {
                action.setErrors({
                  email: error.response.data.message,
                  password: error.response.data.message,
                });
              }
            }
          },
        });
      }}
      validationSchema={LoginFormSchema}
    >
      {({ isSubmitting, values, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <VStack w='full' align='flex-start' spacing={formSpacing}>
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
              loadingText='Login'
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
