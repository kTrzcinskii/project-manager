import * as Yup from "yup";

const RegisterFormSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Provided email is incorrect")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default RegisterFormSchema;
