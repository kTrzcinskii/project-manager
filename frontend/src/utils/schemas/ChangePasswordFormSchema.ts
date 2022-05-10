import * as Yup from "yup";

const ChangePasswordFormSchema = Yup.object().shape({
  password: Yup.string().required("Password is required"),
});

export default ChangePasswordFormSchema;
