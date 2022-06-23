import { Form, Formik } from "formik";
import { RefObject } from "react";
import ICreateGoalValues from "../../interfaces/ICreateGoalValues";
import CreateGoalFormSchema from "../../utils/schemas/CreateGoalFormSchema";
import { AiOutlineFileText } from "react-icons/ai";
import InputField from "../ui/form/InputField";
import getColorsForProjectStats from "../../utils/getColorsForProjectStats";

interface CreateGoalFormProps {
  projectId: number;
  initialRef: RefObject<HTMLInputElement>;
  onClose: () => void;
  color?: string;
}

const CreateGoalForm: React.FC<CreateGoalFormProps> = ({
  projectId,
  color = "teal",
  initialRef,
  onClose,
}) => {
  const initialValues: ICreateGoalValues = { content: "" };

  const myColor = getColorsForProjectStats(color).primaryColor;

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, action) => {
        console.log(values);
      }}
      validationSchema={CreateGoalFormSchema}
    >
      {({ isSubmitting, values, handleSubmit }) => (
        <Form onSubmit={handleSubmit} id='create-goal-form'>
          <InputField
            name='content'
            type='text'
            placeholder='New Goal'
            icon={<AiOutlineFileText color={myColor} />}
            value={values.content}
            myRef={initialRef}
            color={color}
          />
        </Form>
      )}
    </Formik>
  );
};

export default CreateGoalForm;
