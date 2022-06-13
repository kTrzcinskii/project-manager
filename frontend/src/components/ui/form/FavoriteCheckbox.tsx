import { Checkbox } from "@chakra-ui/react";
import { useState } from "react";

interface FavoriteCheckboxProps {
  setFieldValue: (field: string, value?: boolean) => void;
}

const FavoriteCheckbox: React.FC<FavoriteCheckboxProps> = ({
  setFieldValue,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Checkbox
      isChecked={isChecked}
      onChange={(e) => {
        setIsChecked(e.target.checked);
        setFieldValue("favorite", e.target.checked);
      }}
      colorScheme='teal'
      css={`
        > span:first-of-type {
          box-shadow: unset;
        }
      `}
    >
      Add this project to favorites
    </Checkbox>
  );
};

export default FavoriteCheckbox;
