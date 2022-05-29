import { AtSignIcon } from "@chakra-ui/icons";
import { Button, useBreakpointValue, useToast, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import RegisterFormSchema from "../../utils/schemas/RegisterFormSchema";
import InputField from "../ui/form/InputField";
import PasswordInputField from "../ui/form/PasswordInputField";
import { FaUser } from "react-icons/fa";
import IRegisterFormValues from "../../interfaces/IRegisterFormValues";
import useRegister from "../../hooks/mutation/useRegister";
import axios from "axios";
import { useRouter } from "next/router";
import transfromAPIErrors from "../../utils/transformAPIErrors";
import networkErrorToastOptions from "../../utils/toasts/networkErrorToastOptions";
import { motion } from "framer-motion";

const RegisterForm: React.FC = () => {
  const router = useRouter();

  const initialValues: IRegisterFormValues = {
    username: "",
    email: "",
    password: "",
  };

  const formSpacing = useBreakpointValue({ base: 4, md: 6, lg: 8 });

  const mutation = useRegister();

  const toast = useToast();
  const toastOptions = networkErrorToastOptions();

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
              if (!error.response) {
                toast(toastOptions);
              }
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
