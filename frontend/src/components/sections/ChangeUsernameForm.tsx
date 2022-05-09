import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import IChangeUsernameValues from "../../interfaces/IChangeUsernameValues";
import ChangeUsernameFormSchema from "../../utils/schemas/ChangeUsernameFormSchema";
import InputField from "../ui/form/InputField";
import { FaUser } from "react-icons/fa";
import { RefObject, Dispatch, SetStateAction } from "react";
import useChangeUsername from "../../hooks/mutation/useChangeUsername";
import axios from "axios";
import transfromAPIErrors from "../../utils/transformAPIErrors";
import { useToast } from "@chakra-ui/react";
import updateProfileToastOptions from "../../utils/toasts/updateProileToastOptions";
import networkErrorToastOptions from "../../utils/toasts/networkErrorToastOptions";

interface ChangeUsernameFormProps {
  initialRef: RefObject<HTMLInputElement>;
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
}

const ChangeUsernameForm: React.FC<ChangeUsernameFormProps> = ({
  initialRef,
  setIsSubmitting,
}) => {
  const initialValues: IChangeUsernameValues = { username: "" };

  const mutation = useChangeUsername();

  const router = useRouter();

  const time = 3000;

  const toast = useToast();
  const toastOptions = updateProfileToastOptions("username", time);

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
              action.setErrors(transfromAPIErrors(error, ["username"]));
            }
          },
        });
      }}
      validationSchema={ChangeUsernameFormSchema}
    >
      {({ values, handleSubmit }) => (
        <Form id='change-username-form' onSubmit={handleSubmit}>
          <InputField
            name='username'
            type='text'
            placeholder='New username'
            icon={<FaUser color='#285E61' />}
            value={values.username}
            myRef={initialRef}
          />
        </Form>
      )}
    </Formik>
  );
};

export default ChangeUsernameForm;
