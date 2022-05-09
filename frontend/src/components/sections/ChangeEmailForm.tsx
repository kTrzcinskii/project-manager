import { AtSignIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import { RefObject, Dispatch, SetStateAction } from "react";
import useChangeEmail from "../../hooks/mutation/useChangeEmail";
import IChangeEmailValues from "../../interfaces/IChangeEmailValues";
import ChangeEmailFormSchema from "../../utils/schemas/ChangeEmailFormSchema";
import transfromAPIErrors from "../../utils/transformAPIErrors";
import updateProfileToastOptions from "../../utils/toasts/updateProileToastOptions";
import InputField from "../ui/form/InputField";
import networkErrorToastOptions from "../../utils/toasts/networkErrorToastOptions";

interface ChangeEmailFormProps {
  initialRef: RefObject<HTMLInputElement>;
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
}

const ChangeEmailForm: React.FC<ChangeEmailFormProps> = ({
  initialRef,
  setIsSubmitting,
}) => {
  const initialValues: IChangeEmailValues = { email: "" };

  const mutation = useChangeEmail();

  const router = useRouter();

  const time = 3000;

  const toast = useToast();
  const toastOptions = updateProfileToastOptions("email", time);

  const errorToast = useToast();
  const errorToastOptions = networkErrorToastOptions();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, action) => {
        setIsSubmitting(true);
        mutation.mutate(values, {
          onSuccess: () => {
            setIsSubmitting(false);
            toast(toastOptions);
            setTimeout(() => router.reload(), time);
          },
          onError: (error) => {
            setIsSubmitting(false);
            if (axios.isAxiosError(error)) {
              if (!error.response) {
                errorToast(errorToastOptions);
              }
              action.setErrors(transfromAPIErrors(error, ["email"]));
            }
          },
        });
      }}
      validationSchema={ChangeEmailFormSchema}
    >
      {({ values, handleSubmit }) => (
        <Form id='change-email-form' onSubmit={handleSubmit}>
          <InputField
            name='email'
            type='email'
            placeholder='New email'
            icon={<AtSignIcon color='teal.700' />}
            value={values.email}
            myRef={initialRef}
          />
        </Form>
      )}
    </Formik>
  );
};

export default ChangeEmailForm;
