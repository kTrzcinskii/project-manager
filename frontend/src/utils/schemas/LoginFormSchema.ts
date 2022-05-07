import * as Yup from "yup";

const LoginFormSchema = Yup.object().shape({
  email: Yup.string()
    .email("Provided email is incorrect")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default LoginFormSchema;
