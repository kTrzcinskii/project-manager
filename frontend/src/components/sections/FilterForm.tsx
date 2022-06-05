import { Form, Formik } from "formik";
import { Dispatch, RefObject, SetStateAction } from "react";
import { IFilterFormValues } from "../../interfaces/IFilterFormValues";
import InputField from "../ui/form/InputField";
import InputWithLabel from "../ui/form/InputWithLabel";
import SelectPriority from "../ui/form/SelectPriority";
import { MdTitle } from "react-icons/md";
import ProgressBarSlider from "../ui/form/ProgressBarSlider";
import FavoriteRadio from "../ui/form/FavoriteRadio";
import DateInput from "../ui/form/DateInput";
import InputWrapper from "../ui/form/InputWrapper";
import getInitialFilterFormValues from "../../utils/getInitialFilterFromValues";

interface FilterFormProps {
  initialRef: RefObject<HTMLInputElement>;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  setIsFiltering: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
}

const FilterForm: React.FC<FilterFormProps> = ({
  initialRef,
  query,
  setIsFiltering,
  setQuery,
  onClose,
}) => {
  const initialValues: IFilterFormValues = getInitialFilterFormValues(
    query
  ) || {
    priority: "all",
    favorite: undefined,
  };

  console.log(initialValues);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, action) => {
        setIsFiltering(true);
        setQuery((previousQuery: string) => {
          let newQuery = previousQuery;
          for (let key in values) {
            if (newQuery.includes(key)) {
              const regexp = new RegExp(`&${key}=[^&]+`, "igm");
              //@ts-ignore
              if (values[key] === null || values[key] === undefined) {
                newQuery = newQuery.replace(newQuery.match(regexp)![0], "");
              } else {
                newQuery = newQuery.replace(
                  newQuery.match(regexp)![0],
                  //@ts-ignore
                  `&${key}=${values[key]}`
                );
              }
              //@ts-ignore
            } else if (values[key] !== null && values[key] !== undefined) {
              //@ts-ignore
              newQuery += `&${key}=${values[key]}`;
            }
          }
          return newQuery;
        });
        const timeout = setTimeout(() => setIsFiltering(false), 1500);
        onClose();
      }}
    >
      {({ values, handleSubmit, setFieldValue }) => (
        <Form id='filter-form' onSubmit={handleSubmit}>
          <InputWithLabel
            input={
              <InputField
                name='title'
                placeholder='Enter title'
                icon={<MdTitle color='#285E61' />}
                value={values.title}
                myRef={initialRef}
              />
            }
            header='Search for title'
          />
          <InputWithLabel
            input={
              <SelectPriority
                setFieldValue={setFieldValue}
                defaultValue={initialValues.priority}
              />
            }
            header='Choose priority level'
          />
          <InputWithLabel
            input={
              <ProgressBarSlider
                setFieldValue={setFieldValue}
                minValueDefault={initialValues.progressBarFrom}
                maxValueDefault={initialValues.progressBarTo}
              />
            }
            header='Set the progress range'
          />
          <InputWithLabel
            input={
              <FavoriteRadio
                setFieldValue={setFieldValue}
                defaultValue={initialValues.favorite}
              />
            }
            header='Filter based on your favorites'
          />
          <InputWrapper title='Creation Date Filters'>
            <InputWithLabel
              input={
                <DateInput
                  field='createdFrom'
                  setFieldValue={setFieldValue}
                  defaultValue={initialValues.createdFrom}
                />
              }
              header='Choose the date of creation to filter from'
            />
            <InputWithLabel
              input={
                <DateInput
                  setFieldValue={setFieldValue}
                  field='createdTo'
                  defaultValue={initialValues.createdTo}
                />
              }
              header='Choose the date of creation to filter to'
            />
          </InputWrapper>
          <InputWrapper title='Deadline Date Filters'>
            <InputWithLabel
              input={
                <DateInput
                  setFieldValue={setFieldValue}
                  field='deadlineFrom'
                  defaultValue={initialValues.deadlineFrom}
                />
              }
              header='Choose the date of deadline to filter from'
            />
            <InputWithLabel
              input={
                <DateInput
                  setFieldValue={setFieldValue}
                  field='deadlineTo'
                  defaultValue={initialValues.deadlineTo}
                />
              }
              header='Choose the date of deadline to filter to'
            />
          </InputWrapper>
          <InputWrapper title='Update Date Filters'>
            <InputWithLabel
              input={
                <DateInput
                  setFieldValue={setFieldValue}
                  field='updatedFrom'
                  defaultValue={initialValues.updatedFrom}
                />
              }
              header='Choose the date of updating to filter from'
            />
            <InputWithLabel
              input={
                <DateInput
                  setFieldValue={setFieldValue}
                  field='updatedTo'
                  defaultValue={initialValues.updatedTo}
                />
              }
              header='Choose the date of udpating to filter to'
            />
          </InputWrapper>
          <InputWrapper title='Completing Date Filters' dontShowDivider={true}>
            <InputWithLabel
              input={
                <DateInput
                  setFieldValue={setFieldValue}
                  field='completedFrom'
                  defaultValue={initialValues.completedFrom}
                />
              }
              header='Choose the date of completing to filter from'
            />
            <InputWithLabel
              input={
                <DateInput
                  setFieldValue={setFieldValue}
                  field='completedTo'
                  defaultValue={initialValues.completedTo}
                />
              }
              header='Choose the date of completing to filter to'
              dontShowDivider={true}
            />
          </InputWrapper>
        </Form>
      )}
    </Formik>
  );
};

export default FilterForm;
