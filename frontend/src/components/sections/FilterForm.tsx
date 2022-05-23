import { Form, Formik } from "formik";
import { RefObject } from "react";
import { IFilterFormValues } from "../../interfaces/IFilterFormValues";
import InputField from "../ui/form/InputField";
import InputWithLabel from "../ui/form/InputWithLabel";
import SelectPriority from "../ui/form/SelectPriority";
import { MdTitle } from "react-icons/md";
import ProgressBarSlider from "../ui/form/ProgressBarSlider";
import FavoriteRadio from "../ui/form/FavoriteRadio";

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
        </Form>
      )}
    </Formik>
  );
};

export default FilterForm;