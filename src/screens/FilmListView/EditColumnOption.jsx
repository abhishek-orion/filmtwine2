import React from "react";
import { Flex, Button, Text, Checkbox } from "@chakra-ui/react";
import { useFilmViewContext } from "../../context/FilmViewContext";

const EditColumnOption = (props) => {
  const { columnVisibilityMap, setColumnVisibilityMap } = useFilmViewContext();
  const { innerProps, innerRef } = props;
  const { closeColumnFilter, includeCheckbox } = props.selectProps;
  const onSelectToggle = (e) => {
    let updatedVisbilityMap = {};
    if (props.data.value === "all") {
      for (let key in columnVisibilityMap) {
        updatedVisbilityMap[key] = e.target.checked;
      }
    } else {
      let allChecked = true;
      for (let key in columnVisibilityMap) {
        if (
          key !== "all" &&
          key !== props.data.value &&
          !columnVisibilityMap[key]
        ) {
          allChecked = false;
        }
      }
      updatedVisbilityMap = {
        ...columnVisibilityMap,
        [props.data.value]: !columnVisibilityMap[props.data.value],
        all: allChecked && e.target.checked,
      };
    }
    setColumnVisibilityMap(updatedVisbilityMap);
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
      onClick={(e) => e.stopPropagation()}
    >
      {props.data.value === "close" ? (
        <Button w="100%" onClick={closeColumnFilter}>
          <Text isTruncated>Close</Text>
        </Button>
      ) : (
        <>
          {includeCheckbox ? (
            <Checkbox
              onChange={onSelectToggle}
              isChecked={columnVisibilityMap[props.data.value]}
            />
          ) : null}
          <Text marginLeft={4}>{props.data.label}</Text>
        </>
      )}
    </Flex>
  );
};

export default EditColumnOption;
