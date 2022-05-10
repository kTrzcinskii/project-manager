import { useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { RefObject, Dispatch, SetStateAction } from "react";
import useChangePassword from "../../hooks/mutation/useChangePassword";
import IChangePasswordValues from "../../interfaces/IChangePasswordValues";
import changePasswordToastOptions from "../../utils/toasts/changePasswordToastOptions";
import networkErrorToastOptions from "../../utils/toasts/networkErrorToastOptions";
import ChangePasswordFormSchema from "../../utils/schemas/ChangePasswordFormSchema";
import PasswordInputField from "../ui/form/PasswordInputField";
import transfromAPIErrors from "../../utils/transformAPIErrors";
import axios from "axios";

interface ChangePasswordFormProps {
  initialRef: RefObject<HTMLInputElement>;
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({
  initialRef,
  setIsSubmitting,
  onClose,
}) => {
  const initialValues: IChangePasswordValues = { password: "" };

  const mutation = useChangePassword();

  const router = useRouter();

  const toast = useToast();
  const toastOptions = changePasswordToastOptions();
  const errorToastOptions = networkErrorToastOptions();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, action) => {
        mutation.mutate(values, {
          onSuccess: () => {
            setIsSubmitting(false);
            toast(toastOptions);
            onClose();
          },
          onError: (error) => {
            setIsSubmitting(false);
            if (axios.isAxiosError(error)) {
              if (!error.response) {
                toast(errorToastOptions);
              }
              action.setErrors(transfromAPIErrors(error, ["password"]));
            }
          },
        });
      }}
      validationSchema={ChangePasswordFormSchema}
    >
      {({ values, handleSubmit }) => (
        <Form id='change-password-form' onSubmit={handleSubmit}>
          <PasswordInputField
            name='password'
            placeholder='New password'
            value={values.password}
            myRef={initialRef}
          />
        </Form>
      )}
    </Formik>
  );
};

export default ChangePasswordForm;
