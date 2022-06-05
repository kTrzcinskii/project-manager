import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { useState, memo } from "react";
import transformBoolValueToString from "../../../utils/transformBoolValueToString";

interface FavoriteRadioProps {
  setFieldValue: (field: string, value?: boolean | null) => void;
  defaultValue: boolean | undefined | null;
}

const FavoriteRadio: React.FC<FavoriteRadioProps> = ({
  setFieldValue,
  defaultValue,
}) => {
  const initialValue = transformBoolValueToString(defaultValue);

  const [value, setValue] = useState<string>(initialValue);

  return (
    <RadioGroup
      onChange={(value) => {
        setValue(value);
        if (value === "true") {
          setFieldValue("favorite", true);
        }
        if (value === "false") {
          setFieldValue("favorite", false);
        }
        if (value === "all") {
          setFieldValue("favorite", null);
        }
      }}
      value={value}
    >
      <Stack
        w='full'
        justifyContent='space-between'
        direction={{ base: "column", md: "row" }}
        spacing={{ base: 3, md: 0 }}
      >
        <Radio
          value='all'
          colorScheme='teal'
          _focus={{}}
          style={{ touchAction: "none" }}
        >
          All
        </Radio>
        <Radio
          value='true'
          colorScheme='teal'
          _focus={{}}
          style={{ touchAction: "none" }}
        >
          Only favorite
        </Radio>
        <Radio
          value='false'
          colorScheme='teal'
          _focus={{}}
          style={{ touchAction: "none" }}
        >
          Only unfavorite
        </Radio>
      </Stack>
    </RadioGroup>
  );
};

export default memo(FavoriteRadio);
