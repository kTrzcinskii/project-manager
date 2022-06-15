import { Button, Flex, useBreakpointValue, VStack } from "@chakra-ui/react";
import { format } from "date-fns";
import add from "date-fns/add";
import { Form, Formik } from "formik";
import { useState } from "react";
import useCreateProject from "../../hooks/mutation/useCreateProject";
import ICreateProjectValues from "../../interfaces/ICreateProjectValues";
import CreateProjectSchema from "../../utils/schemas/CreateProjectFormSchema";
import DateInputWithNoBth from "../ui/form/DateInputWithNoBtn";
import FavoriteCheckbox from "../ui/form/FavoriteCheckbox";
import GoalsContainer from "../ui/form/GoalsContainer";
import InputField from "../ui/form/InputField";
import InputWithLabel from "../ui/form/InputWithLabel";
import SelectPriorityCreateProject from "../ui/form/SelectPriorityCreateProject";
import TextAreaField from "../ui/form/TextAreaField";

const CreateProjectForm: React.FC = () => {
  const tomorrow = add(new Date(), { days: 1 });
  const initialDeadline = format(tomorrow, "y-MM-dd");
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingError, setIsEditingError] = useState(false);

  const initialValues: ICreateProjectValues = {
    deadline: initialDeadline,
    description: "",
    goals: [],
    priority: "medium",
    title: "",
  };
  const formSpacing = useBreakpointValue({ base: 4, md: 6, lg: 8 });
  const mutation = useCreateProject();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, action) => {
        if (isEditing) {
          setIsEditingError(true);
          action.setSubmitting(false);
        }
      }}
      validationSchema={CreateProjectSchema}
    >
      {({ isSubmitting, values, handleSubmit, setFieldValue }) => (
        <Form onSubmit={handleSubmit}>
          <VStack
            w={{ base: "300px", md: "380px", lg: "470px", xl: "500px" }}
            align='flex-start'
            spacing={formSpacing}
            pt={{ base: 6, md: 10, lg: 14 }}
          >
            <InputWithLabel
              input={
                <InputField
                  name='title'
                  placeholder='Enter title'
                  value={values.title}
                  w='full'
                />
              }
              header='Title'
              dontShowDivider={true}
              w='full'
            />
            <InputWithLabel
              input={
                <TextAreaField
                  name='description'
                  placeholder='Enter description'
                  value={values.description}
                  w='full'
                />
              }
              header='Description'
              dontShowDivider={true}
              w='full'
            />
            <InputWithLabel
              header='Priority'
              input={
                <SelectPriorityCreateProject setFieldValue={setFieldValue} />
              }
              dontShowDivider={true}
              w='full'
            />
            <InputWithLabel
              header='Deadline'
              input={
                <DateInputWithNoBth
                  field='deadline'
                  setFieldValue={setFieldValue}
                  defaultValue={initialDeadline}
                />
              }
              dontShowDivider={true}
              w='full'
            />
            <InputWithLabel
              header='Goals'
              input={
                <GoalsContainer
                  setFieldValue={setFieldValue}
                  setIsEditing={setIsEditing}
                  isEditingError={isEditingError}
                  setIsEditingError={setIsEditingError}
                  name='goals'
                />
              }
              dontShowDivider={true}
              w='full'
            />
            <FavoriteCheckbox setFieldValue={setFieldValue} />
            <Flex w='full' justifyContent='center' alignItems='center' pb={5}>
              <Button
                type='submit'
                colorScheme='teal'
                w='200px'
                _focus={{ ring: 3, ringColor: "teal.800" }}
                isLoading={isSubmitting}
                loadingText='Create'
              >
                Create
              </Button>
            </Flex>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

export default CreateProjectForm;
