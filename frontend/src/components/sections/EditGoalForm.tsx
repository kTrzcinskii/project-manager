import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { Form, Formik } from "formik";
import { RefObject, Dispatch, SetStateAction } from "react";
import { AiOutlineFileText } from "react-icons/ai";
import { useQueryClient } from "react-query";
import useEditGoal from "../../hooks/mutation/useEditGoal";
import IEditGoalValues from "../../interfaces/IEditGoalValues";
import getColorsForProjectStats from "../../utils/getColorsForProjectStats";
import CreateGoalFormSchema from "../../utils/schemas/CreateGoalFormSchema";
import networkErrorToastOptions from "../../utils/toasts/networkErrorToastOptions";
import InputField from "../ui/form/InputField";
import transfromAPIErrors from "../../utils/transformAPIErrors";

interface EditGoalFormProps {
  id: number;
  content: string;
  initialRef: RefObject<HTMLInputElement>;
  onClose: () => void;
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
  color?: string;
  projectId: number;
}

const EditGoalForm: React.FC<EditGoalFormProps> = ({
  id,
  content,
  color = "teal",
  onClose,
  initialRef,
  setIsSubmitting,
  projectId,
}) => {
  const initialValues: IEditGoalValues = { content };

  const myColor = getColorsForProjectStats(color).primaryColor;

  const mutation = useEditGoal(id);
  const queryClient = useQueryClient();

  const toast = useToast();
  const toastNetworError = networkErrorToastOptions();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, action) => {
        setIsSubmitting(true);
        mutation.mutate(values, {
          onSuccess: () => {
            setIsSubmitting(false);
            queryClient.invalidateQueries(["project", projectId]);
            onClose();
          },
          onError: (error) => {
            if (axios.isAxiosError(error)) {
              if (!error.response) {
                toast(toastNetworError);
                onClose();
              }
              action.setErrors(transfromAPIErrors(error, ["content"]));
            }
            setIsSubmitting(false);
          },
        });
      }}
      validationSchema={CreateGoalFormSchema}
    >
      {({ values, handleSubmit }) => (
        <Form onSubmit={handleSubmit} id='edit-goal-form'>
          <InputField
            name='content'
            type='text'
            placeholder='Edit Goal'
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

export default EditGoalForm;
