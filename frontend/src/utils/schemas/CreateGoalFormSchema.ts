import * as Yup from "yup";

const CreateGoalFormSchema = Yup.object().shape({
  content: Yup.string().required("Content is required"),
});

export default CreateGoalFormSchema;
