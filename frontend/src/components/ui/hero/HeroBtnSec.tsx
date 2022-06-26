import { Button, useBreakpointValue } from "@chakra-ui/react";
import { RefObject } from "react";

interface HeroBtnSecProps {
  divRef: RefObject<HTMLDivElement>;
}

const HeroBtnSec: React.FC<HeroBtnSecProps> = ({ divRef }) => {
  const handleClick = () => {
    divRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  return (
    <Button
      colorScheme='whiteAlpha'
      _focus={{ ring: 3, ringColor: "white" }}
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
      rounded='lg'
      onClick={handleClick}
    >
      Learn More
    </Button>
  );
};

export default HeroBtnSec;
