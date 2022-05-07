import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import IChangeUsernameValues from "../../interfaces/IChangeUsernameValues";
import ChangeUsernameFormSchema from "../../utils/schemas/ChangeUsernameFormSchema";
import InputField from "../ui/form/InputField";
import { FaUser } from "react-icons/fa";
import { RefObject, Dispatch, SetStateAction } from "react";

interface ChangeUsernameFormProps {
  initialRef: RefObject<HTMLInputElement>;
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
}

const ChangeUsernameForm: React.FC<ChangeUsernameFormProps> = ({
  initialRef,
  setIsSubmitting,
}) => {
  const initialValues: IChangeUsernameValues = { username: "" };

  //const  mutation =

  const router = useRouter();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, action) => {
        console.log(values);
        setIsSubmitting(true);
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
