import { ArrowUpIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const ScrollToTopBtn: React.FC = () => {
  const [isVisilbe, setIsVisible] = useState(false);

  const checkVisibility = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setIsVisible(true);
    } else if (scrolled <= 300) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkVisibility);
  }, []);

  const handleClick = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <IconButton
      aria-label='scroll to top'
      onClick={handleClick}
      display={isVisilbe ? "block" : "none"}
      icon={<ArrowUpIcon boxSize={6} />}
      size='lg'
      colorScheme='teal'
      _focus={{ ring: 3, ringColor: "teal.800" }}
      pos='fixed'
      bottom={0}
      right={0}
      mb={{ base: 2, md: 4, lg: 10, xl: 16 }}
      mr={{ base: 2, md: 4, lg: 10, xl: 16 }}
    />
  );
};

export default ScrollToTopBtn;
