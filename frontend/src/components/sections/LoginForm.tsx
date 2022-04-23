import { Form, Formik } from "formik";
import LoginFormSchema from "../../utils/loginFormSchema";
import InputField from "../ui/InputField";
import PasswordInputField from "../ui/PasswordInputField";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const initialVaules: LoginFormValues = { email: "", password: "" };

  return (
    <Formik
      initialValues={initialVaules}
      onSubmit={(values, action) => {
        console.log(values);
      }}
      validationSchema={LoginFormSchema}
    >
      {({ isSubmitting }) => (
        <Form>
          <InputField
            label='Email'
            name='email'
            type='email'
            placeholder='Enter email'
          />
          <PasswordInputField
            label='Password'
            name='password'
            placeholder='Enter password'
          />
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
