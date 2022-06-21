import {
  Button,
  Flex,
  useBreakpointValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { format } from "date-fns";
import { Form, Formik } from "formik";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import useEditProject from "../../hooks/mutation/useEditProject";
import useGetSingleProject from "../../hooks/query/useGetSingleProject";
import IEditProjectValues from "../../interfaces/IEditProjectValues";
import CreateProjectSchema from "../../utils/schemas/CreateProjectFormSchema";
import networkErrorToastOptions from "../../utils/toasts/networkErrorToastOptions";
import transfromAPIErrors from "../../utils/transformAPIErrors";
import DateInputWithNoBth from "../ui/form/DateInputWithNoBtn";
import FavoriteCheckbox from "../ui/form/FavoriteCheckbox";
import InputField from "../ui/form/InputField";
import InputWithLabel from "../ui/form/InputWithLabel";
import SelectPriorityCreateProject from "../ui/form/SelectPriorityCreateProject";
import TextAreaField from "../ui/form/TextAreaField";
import ErrorMessage from "../ui/utils/ErrorMessage";
import LoadingSpinner from "../ui/utils/LoadingSpinner";

const EditProjectForm: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const formSpacing = useBreakpointValue({ base: 4, md: 6, lg: 8 });
  const mutation = useEditProject(Number(id));

  const { data, isLoading, isError, error } = useGetSingleProject(Number(id));

  const toast = useToast();
  const toastOptions = networkErrorToastOptions();

  if (isError && axios.isAxiosError(error)) {
    if (error.response?.data.statusCode === 404) router.push("/404");
  }

  if (isLoading || isError || !data) {
    return (
      <Flex
        w='full'
        mx='auto'
        justifyContent='center'
        alignItems='center'
        flexDirection='column'
      >
        {isLoading && <LoadingSpinner />}
        {!data || (isError && <ErrorMessage />)}
      </Flex>
    );
  }

  const deadlineDate = new Date(data?.deadline);
  const initialValues: IEditProjectValues = {
    title: data?.title,
    deadline: format(deadlineDate, "y-MM-dd"),
    description: data.description,
    favorite: data.favorite,
    priority: data.priority,
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, action) => {
        mutation.mutate(values, {
          onSuccess: () => router.push(`/project/${id}`),
          onError: (error) => {
            action.setSubmitting(false);
            if (axios.isAxiosError(error)) {
              if (!error.response) {
                toast(toastOptions);
              }
              action.setErrors(
                transfromAPIErrors(error, [
                  "deadline",
                  "description",
                  "priority",
                  "title",
                ])
              );
            }
          },
        });
      }}
      validationSchema={CreateProjectSchema}
    >
      {({ isSubmitting, values, handleSubmit, setFieldValue }) => (
        <Form onSubmit={handleSubmit}>
          <VStack
            w={{ base: "300px", md: "380px", lg: "440px", xl: "500px" }}
            align='flex-start'
            spacing={formSpacing}
            pt={{ base: 6, md: 10, lg: 14 }}
          >
            <VStack
              w='full'
              align='flex-start'
              spacing={formSpacing}
              as={motion.div}
              initial={{
                opacity: 0,
                translateX: "-150%",
              }}
              animate={{
                opacity: 1,
                translateX: "0%",
                transition: {
                  duration: 0.3,
                  ease: "easeInOut",
                  delay: 0.35,
                },
              }}
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
                    defaultValue={initialValues.deadline}
                  />
                }
                dontShowDivider={true}
                w='full'
              />
              <FavoriteCheckbox
                setFieldValue={setFieldValue}
                defaultValue={initialValues.favorite}
              />
            </VStack>
            <Flex
              w='full'
              justifyContent='center'
              alignItems='center'
              pb={5}
              as={motion.div}
              initial={{
                opacity: 0,
                translateY: "150%",
              }}
              animate={{
                opacity: 1,
                translateY: "0%",
                transition: {
                  duration: 0.3,
                  ease: "easeInOut",
                  delay: 0.65,
                },
              }}
            >
              <Button
                type='submit'
                colorScheme='teal'
                w='200px'
                _focus={{ ring: 3, ringColor: "teal.800" }}
                isLoading={isSubmitting}
                loadingText='Edit'
              >
                Edit
              </Button>
            </Flex>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

export default EditProjectForm;
