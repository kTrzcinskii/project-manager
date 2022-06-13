import { Text, Divider, Box, BoxProps } from "@chakra-ui/react";
import { ReactNode } from "react";

type InputWithLabelProps = BoxProps & {
  input: ReactNode;
  header: string;
  dontShowDivider?: boolean;
};

const InputWithLabel: React.FC<InputWithLabelProps> = ({
  input,
  header,
  dontShowDivider = false,
  ...props
}) => {
  return (
    <Box {...props}>
      <Text fontSize='md' fontWeight='semibold' color='teal.800' mb={2}>
        {header}
      </Text>
      {input}
      {!dontShowDivider && <Divider my={3} />}
    </Box>
  );
};

export default InputWithLabel;
