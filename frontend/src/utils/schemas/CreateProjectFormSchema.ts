import * as Yup from "yup";

const CreateProjectSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  goals: Yup.array(
    Yup.object().shape({
      content: Yup.string().required("Content is required"),
    })
  ).min(1, "Your project must contain at least one goal"),
});

export default CreateProjectSchema;
