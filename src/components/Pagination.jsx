import React from "react";
import { Flex, Button, HStack } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

const PaginationButton = (props) => {
  const { setSelectedPage, value, selectedPage } = props;
  const onButtonClick = () => {
    setSelectedPage(value);
  };

  return (
    <Button
      onClick={onButtonClick}
      borderRadius="1px solid #DADBE0"
      bg={selectedPage === value ? "#FF6C61" : "#FFFFFF"}
      color={selectedPage === value ? "#FFFFFF" : "#9BA4B0"}
    >
      {value}
    </Button>
  );
};

const Pagination = (props) => {
  const [start, setStart] = React.useState(1);
  const [end, setEnd] = React.useState(5);
  const { total_pages } = props.paginationInfo;
  const { currentPage } = props.paginationInfo;
  const { setSelectedPage } = props;

  const onNextArrowClick = () => {
    const newStart = start + 5;
    const newEnd = end + 5 <= total_pages ? end + 5 : total_pages;
    setStart(newStart);
    setEnd(newEnd);
    if (currentPage < newStart) {
      setSelectedPage(newStart);
    }
  };
  const onPrevArrowClick = () => {
    const newStart = start - 5 < 1 ? 1 : start - 5;
    const newEnd = end - 5;
    setStart(newStart);
    setEnd(newEnd);
    if (currentPage > newEnd) {
      setSelectedPage(newEnd);
    }
  };

  const onNextClick = () => {
    setSelectedPage(currentPage + 1);
  };

  const onPreviousClick = () => {
    setSelectedPage(currentPage - 1);
  };

  const PaginationButtons = function () {
    let Buttons = [];
    for (let i = start; i <= end; i++) {
      Buttons.push(
        <PaginationButton
          value={i}
          key={`button-${i}`}
          selectedPage={currentPage}
          setSelectedPage={setSelectedPage}
        />
      );
    }
    return Buttons;
  };

  return (
    <Flex
      w="100%"
      justifyContent={{
        base: "center",
        sm: "center",
        md: "center",
        lg: "end",
      }}
    >
      <HStack>
        <Button
          bg="#F7F7F7"
          color="#9BA4B0"
          onClick={onPrevArrowClick}
          disabled={start === 1}
        >
          <ArrowLeftIcon />
        </Button>
        <Button
          bg="#F7F7F7"
          color="#9BA4B0"
          onClick={onPreviousClick}
          disabled={currentPage === 1}
        >
          Prev
        </Button>
        {PaginationButtons()}
        <Button
          bg="#F7F7F7"
          color="#9BA4B0"
          onClick={onNextClick}
          disabled={currentPage === total_pages}
        >
          Next
        </Button>
        <Button
          bg="#F7F7F7"
          color="#9BA4B0"
          onClick={onNextArrowClick}
          disabled={end === total_pages}
        >
          <ArrowRightIcon />
        </Button>
      </HStack>
    </Flex>
  );
};

export default Pagination;
