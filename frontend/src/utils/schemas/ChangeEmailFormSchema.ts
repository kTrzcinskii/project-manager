import * as Yup from "yup";

const ChangeEmailFormSchema = Yup.object().shape({
  email: Yup.string()
    .email("Provided email is incorrect")
    .required("Email is required"),
});

export default ChangeEmailFormSchema;
