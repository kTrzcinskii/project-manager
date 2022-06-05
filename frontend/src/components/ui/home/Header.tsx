import { Heading, chakra, useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface HeaderProps {
  username: string;
  constantText?: string;
}

const texts = [
  "how are you today?",
  "ready for productive time?",
  "keep your goals high!",
  "have a great day!",
  "what's on your mind?",
];

const Header: React.FC<HeaderProps> = ({ username, constantText }) => {
  const defaultText = constantText || "";

  const [text, setText] = useState(defaultText);
  useEffect(() => {
    if (!constantText) {
      const randomNumber = Math.floor(Math.random() * texts.length);
      setText(texts[randomNumber]);
    }
  }, [constantText]);

  return (
    <Heading
      size={useBreakpointValue({ base: "md", md: "lg" })}
      mt={{ base: 3, md: 5, lg: 8 }}
      color='gray.700'
      textAlign='center'
    >
      Welcome <chakra.span color='teal.600'>{username}</chakra.span>, {text}
    </Heading>
  );
};

export default Header;
