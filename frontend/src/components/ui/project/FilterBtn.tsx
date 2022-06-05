import { Button, HStack, Text, useDisclosure } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useRef } from "react";
import { BsFilterLeft } from "react-icons/bs";
import shouldShowClearFiltersBtns from "../../../utils/shouldShowClearFiltersBtn";
import FilterForm from "../../sections/FilterForm";
import ModalContainer from "../utils/ModalContainer";
import FilterFooter from "./FilterFooter";
import FilterModalHeader from "./FilterModalHeader";

interface FilterBtnProps {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  setIsFiltering: Dispatch<SetStateAction<boolean>>;
  setIsClearingFilters: Dispatch<SetStateAction<boolean>>;
  showFavoriteFilter: boolean;
}

const FilterBtn: React.FC<FilterBtnProps> = ({
  query,
  setIsFiltering,
  setQuery,
  setIsClearingFilters,
  showFavoriteFilter,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef<HTMLInputElement>(null);

  const shoudlShowBtn = shouldShowClearFiltersBtns(query);

  return (
    <>
      <Button _focus={{ ring: 3, ringColor: "teal.700" }} onClick={onOpen}>
        <HStack spacing={2}>
          <BsFilterLeft fontSize='26' color='#285E61' />{" "}
          <Text color='teal.700'>Filter</Text>
        </HStack>
      </Button>
      <ModalContainer
        isCentered={false}
        isOpen={isOpen}
        header={
          <FilterModalHeader
            showBtn={shoudlShowBtn}
            onClose={onClose}
            setIsClearingFilters={setIsClearingFilters}
            setQuery={setQuery}
          />
        }
        body={
          <FilterForm
            initialRef={initialRef}
            setIsFiltering={setIsFiltering}
            setQuery={setQuery}
            query={query}
            onClose={onClose}
            showFavoriteFiler={showFavoriteFilter}
          />
        }
        footer={<FilterFooter onClose={onClose} />}
        onClose={onClose}
        initialRef={initialRef}
        size={{ base: "xs", md: "md", lg: "md" }}
      />
    </>
  );
};

export default FilterBtn;
