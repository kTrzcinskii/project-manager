import { AtSignIcon } from "@chakra-ui/icons";
import { useToast, VStack } from "@chakra-ui/react";
import axios from "axios";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { Dispatch, RefObject, SetStateAction } from "react";
import useDeleteAccount from "../../hooks/mutation/useDeleteAccount";
import IDeleteAccountValues from "../../interfaces/IDeleteAccountValues";
import DeleteAccountFormSchema from "../../utils/schemas/DeleteAccountFormSchema";
import networkErrorToastOptions from "../../utils/toasts/networkErrorToastOptions";
import transfromAPIErrors from "../../utils/transformAPIErrors";
import InputField from "../ui/form/InputField";
import PasswordInputField from "../ui/form/PasswordInputField";

interface DeleteAccountFormProps {
  initialRef: RefObject<HTMLInputElement>;
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
}

const DeleteAccountForm: React.FC<DeleteAccountFormProps> = ({
  initialRef,
  setIsSubmitting,
}) => {
  const initialValues: IDeleteAccountValues = { email: "", password: "" };

  const mutation = useDeleteAccount();

  const router = useRouter();

  const errorToast = useToast();
  const errorToastOptions = networkErrorToastOptions();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, action) => {
        console.log(values);
        setIsSubmitting(true);
        mutation.mutate(values, {
          onSuccess: () => {
            setIsSubmitting(false);
            router.push("/account-deleted");
          },
          onError: (error) => {
            setIsSubmitting(false);
            if (axios.isAxiosError(error)) {
              if (!error.response) {
                errorToast(errorToastOptions);
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
      validationSchema={DeleteAccountFormSchema}
    >
      {({ values, handleSubmit }) => (
        <Form id='delete-account-form' onSubmit={handleSubmit}>
          <VStack w='full' align='flex-start' spacing={4} mt={6}>
            <InputField
              name='email'
              type='email'
              placeholder='Email'
              icon={<AtSignIcon color='teal.700' />}
              value={values.email}
              myRef={initialRef}
            />
            <PasswordInputField
              name='password'
              placeholder='Password'
              value={values.password}
            />
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

export default DeleteAccountForm;
