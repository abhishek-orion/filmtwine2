import React from "react";
import { useFilmViewContext } from "../../context/FilmViewContext";
import { Flex, Button, Text } from "@chakra-ui/react";

const SortColumnOption = (props) => {
  const { onSortFieldChange } = useFilmViewContext();
  const { innerProps, innerRef } = props;
  const { closeColumnFilter } = props.selectProps;

  const onOptionClick = (e) => {
    e.stopPropagation();
    closeColumnFilter();
    if (props.data.value !== "close") {
      onSortFieldChange({ value: props.data.value, label: props.data.label });
    }
  };
  return (
    <Flex
      key={props.data.value}
      ref={innerRef}
      {...innerProps}
      h="40px"
      alignItems="center"
      justifyContent={props.data.value === "close" ? "center" : "left"}
      p={2}
      onClick={onOptionClick}
    >
      {props.data.value === "close" ? (
        <Button w="100%" onClick={closeColumnFilter}>
          <Text isTruncated>Close</Text>
        </Button>
      ) : (
        <>
          <Text marginLeft={4}>{props.data.label}</Text>
        </>
      )}
    </Flex>
  );
};

export default SortColumnOption;
