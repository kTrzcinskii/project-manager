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

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, action) => {
        setIsSubmitting(true);
        mutation.mutate(values, {
          onSuccess: () => {
            setIsSubmitting(false);
            router.reload();
          },
          onError: (error) => {
            setIsSubmitting(false);
            if (axios.isAxiosError(error)) {
              console.log(error.response?.data);
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
            placeholder='Username'
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
