import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { useState } from "react";

interface FavoriteRadioProps {
  setFieldValue: (field: string, value?: boolean | null) => void;
}

const FavoriteRadio: React.FC<FavoriteRadioProps> = ({ setFieldValue }) => {
  const [value, setValue] = useState<string>("all");

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

export default FavoriteRadio;
