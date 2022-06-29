import {
  useBreakpointValue,
  VStack,
  Button,
  Text,
  useToast,
} from "@chakra-ui/react";
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
import networkErrorToastOptions from "../../utils/toasts/networkErrorToastOptions";
import { motion } from "framer-motion";
import { setCookies } from "cookies-next";

const LoginForm: React.FC = () => {
  const router = useRouter();

  const initialValues: ILoginFormValues = { email: "", password: "" };

  const formSpacing = useBreakpointValue({ base: 4, md: 6, lg: 8 });

  const mutation = useLogin();

  const toast = useToast();
  const toastOptions = networkErrorToastOptions();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, action) => {
        mutation.mutate(values, {
          onSuccess: (response) => {
            setCookies("at", response.data.tokens.access_token);
            setCookies("rt", response.data.tokens.refresh_token);
            router.push("/home");
          },
          onError: (error) => {
            action.setSubmitting(false);
            if (axios.isAxiosError(error)) {
              if (!error.response) {
                toast(toastOptions);
              }
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
          <VStack
            w='full'
            align='flex-start'
            spacing={formSpacing}
            as={motion.div}
            initial={{
              opacity: 0,
              translateX: "150%",
            }}
            animate={{
              opacity: 1,
              translateX: "0%",
              transition: {
                duration: 0.3,
                ease: "easeInOut",
                delay: 0.85,
              },
            }}
          >
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
