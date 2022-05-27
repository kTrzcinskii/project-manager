import { Spinner } from "@chakra-ui/spinner";

const LoadingSpinner: React.FC = () => {
  return (
    <Spinner
      thickness='5px'
      speed='0.65s'
      emptyColor='gray.200'
      color='teal.500'
      boxSize={100}
    />
  );
};

export default LoadingSpinner;
