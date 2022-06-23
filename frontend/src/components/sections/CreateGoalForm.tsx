import { Form, Formik } from "formik";
import { Dispatch, RefObject, SetStateAction } from "react";
import ICreateGoalValues from "../../interfaces/ICreateGoalValues";
import CreateGoalFormSchema from "../../utils/schemas/CreateGoalFormSchema";
import { AiOutlineFileText } from "react-icons/ai";
import InputField from "../ui/form/InputField";
import getColorsForProjectStats from "../../utils/getColorsForProjectStats";
import useCreateGoal from "../../hooks/mutation/useCreateGoal";
import { useQueryClient } from "react-query";
import { useToast } from "@chakra-ui/react";
import networkErrorToastOptions from "../../utils/toasts/networkErrorToastOptions";
import axios from "axios";

interface CreateGoalFormProps {
  projectId: number;
  initialRef: RefObject<HTMLInputElement>;
  onClose: () => void;
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
  color?: string;
}

const CreateGoalForm: React.FC<CreateGoalFormProps> = ({
  projectId,
  color = "teal",
  initialRef,
  onClose,
  setIsSubmitting,
}) => {
  const initialValues: ICreateGoalValues = { content: "" };

  const myColor = getColorsForProjectStats(color).primaryColor;

  const mutation = useCreateGoal(projectId);
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
            queryClient.invalidateQueries(["project", projectId]);
            queryClient.invalidateQueries(["projectStats", projectId]);
            onClose();
            setIsSubmitting(false);
          },
          onError: (error) => {
            if (axios.isAxiosError(error)) {
              if (!error.response) {
                toast(toastNetworError);
              }
              toast(toastNetworError);
            }
          },
        });
      }}
      validationSchema={CreateGoalFormSchema}
    >
      {({ values, handleSubmit }) => (
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
