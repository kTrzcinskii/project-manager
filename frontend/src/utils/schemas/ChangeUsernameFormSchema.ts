import * as Yup from "yup";

const ChangeUsernameFormSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
});

export default ChangeUsernameFormSchema;
