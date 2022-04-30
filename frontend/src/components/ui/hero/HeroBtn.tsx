import { Button, useBreakpointValue } from "@chakra-ui/react";
import NextLink from "next/link";

interface HeroBtnProps {
  type: "primary" | "secondary";
  children: React.ReactNode;
  href: string;
}

const HeroBtn: React.FC<HeroBtnProps> = ({ type, children, href }) => {
  const colorScheme = type === "primary" ? "teal" : "whiteAlpha";
  const ringColor = type === "primary" ? "teal.700" : "white";

  return (
    <NextLink href={href} passHref>
      <Button
        as='a'
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
    </NextLink>
  );
};

export default HeroBtn;
