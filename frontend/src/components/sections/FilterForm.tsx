import { Form, Formik } from "formik";
import { RefObject } from "react";
import { IFilterFormValues } from "../../interfaces/IFilterFormValues";
import InputField from "../ui/form/InputField";
import InputWithLabel from "../ui/form/InputWithLabel";
import SelectPriority from "../ui/form/SelectPriority";
import { MdTitle } from "react-icons/md";
import ProgressBarSlider from "../ui/form/ProgressBarSlider";
import FavoriteRadio from "../ui/form/FavoriteRadio";
import DateInput from "../ui/form/DateInput";

interface FilterFormProps {
  initialRef: RefObject<HTMLInputElement>;
}

const FilterForm: React.FC<FilterFormProps> = ({ initialRef }) => {
  const initialValues: IFilterFormValues = { priority: "all" };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, action) => {
        console.log(values);
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
            input={<SelectPriority setFieldValue={setFieldValue} />}
            header='Choose priority level'
          />
          <InputWithLabel
            input={<ProgressBarSlider setFieldValue={setFieldValue} />}
            header='Set the progress range'
          />
          <InputWithLabel
            input={<FavoriteRadio setFieldValue={setFieldValue} />}
            header='Filter based on your favorites'
          />
          <InputWithLabel
            input={
              <DateInput field='createdFrom' setFieldValue={setFieldValue} />
            }
            header='Choose the date of creation to filter from'
          />
          <InputWithLabel
            input={
              <DateInput setFieldValue={setFieldValue} field='createdTo' />
            }
            header='Choose the date of creation to filter to'
          />
          <InputWithLabel
            input={
              <DateInput setFieldValue={setFieldValue} field='deadlineFrom' />
            }
            header='Choose the date of deadline to filter from'
          />
          <InputWithLabel
            input={
              <DateInput setFieldValue={setFieldValue} field='deadlineTo' />
            }
            header='Choose the date of deadline to filter to'
          />
          <InputWithLabel
            input={
              <DateInput setFieldValue={setFieldValue} field='updatedFrom' />
            }
            header='Choose the date of updating to filter from'
          />
          <InputWithLabel
            input={
              <DateInput setFieldValue={setFieldValue} field='updatedTo' />
            }
            header='Choose the date of udpating to filter to'
          />
          <InputWithLabel
            input={
              <DateInput setFieldValue={setFieldValue} field='completedFrom' />
            }
            header='Choose the date of completing to filter from'
          />
          <InputWithLabel
            input={
              <DateInput setFieldValue={setFieldValue} field='completedTo' />
            }
            header='Choose the date of completing to filter to'
          />
        </Form>
      )}
    </Formik>
  );
};

export default FilterForm;
