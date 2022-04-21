import { Button, useBreakpointValue } from "@chakra-ui/react";

interface HeroBtnProps {
  type: "primary" | "secondary";
  children: React.ReactNode;
}

const HeroBtn: React.FC<HeroBtnProps> = ({ type, children }) => {
  const colorScheme = type === "primary" ? "teal" : "whiteAlpha";

  return (
    <Button
      rounded={"full"}
      colorScheme={colorScheme}
      size={useBreakpointValue({
        base: "sm",
        md: "md",
        lg: "lg",
      })}
      width={useBreakpointValue({
        base: "97px",
        md: "115px",
        lg: "141px",
      })}
    >
      {children}
    </Button>
  );
};

export default HeroBtn;
