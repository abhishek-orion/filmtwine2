import React from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/react";

const SortingIcon = (props) => {
  return (
    <Flex flexDirection="column">
      <ChevronUpIcon
        fontSize="16px"
        color={props.isActive && props.order === "ASC" ? "#FF6C61" : null}
      />
      <ChevronDownIcon
        fontSize="16px"
        color={props.isActive && props.order === "DESC" ? "#FF6C61" : null}
      />
    </Flex>
  );
};

export default SortingIcon;
