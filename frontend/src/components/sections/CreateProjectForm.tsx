import { Button, Flex, useBreakpointValue, VStack } from "@chakra-ui/react";
import { format } from "date-fns";
import add from "date-fns/add";
import { Form, Formik } from "formik";
import useCreateProject from "../../hooks/mutation/useCreateProject";
import ICreateProjectValues from "../../interfaces/ICreateProjectValues";
import DateInputWithNoBth from "../ui/form/DateInputWithNoBtn";
import FavoriteCheckbox from "../ui/form/FavoriteCheckbox";
import InputField from "../ui/form/InputField";
import InputWithLabel from "../ui/form/InputWithLabel";
import SelectPriorityCreateProject from "../ui/form/SelectPriorityCreateProject";
import TextAreaField from "../ui/form/TextAreaField";

const CreateProjectForm: React.FC = () => {
  const tomorrow = add(new Date(), { days: 1 });
  const initialDeadline = format(tomorrow, "y-MM-dd");

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
        console.log(values);
      }}
      // validationSchema={CreateProjectSchema}
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
            <FavoriteCheckbox setFieldValue={setFieldValue} />
            <Flex w='full' justifyContent='center' alignItems='center'>
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
