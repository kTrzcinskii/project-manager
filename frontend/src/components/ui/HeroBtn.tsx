import { Button, useBreakpointValue } from "@chakra-ui/react";

interface HeroBtnProps {
  type: "primary" | "secondary";
  children: React.ReactNode;
}

const HeroBtn: React.FC<HeroBtnProps> = ({ type, children }) => {
  const colorScheme = type === "primary" ? "teal" : "whiteAlpha";
  const ringColor = type === "primary" ? "teal.700" : "white";

  return (
    <Button
      rounded={"lg"}
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
      _focus={{ ring: 3, ringColor: ringColor }}
    >
      {children}
    </Button>
  );
};

export default HeroBtn;
