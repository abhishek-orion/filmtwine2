import React from "react";
import Select from "react-select";
import "./SelectComponent.css";
import { Box } from "@chakra-ui/react";

const SelectComponent = ({
  options,
  optionComponent,
  columnFilterOpen,
  closeColumnFilter,
  openColumnFilter,
  includeSelectAll,
  includeCheckbox,
  value,
}) => {
  const selectRef = React.useRef();
  const optionsWithSelectAll = React.useMemo(
    () =>
      includeSelectAll
        ? [
            { label: "Select All", value: "all" },
            ...options,
            { label: "Close", value: "close" },
          ]
        : [...options, { label: "Close", value: "close" }],
    [includeSelectAll, options]
  );

  const onSelectClick = (e) => {
    openColumnFilter();
  };

  return (
    <Box onClick={onSelectClick} width="200px">
      <Select
        ref={selectRef}
        id="selectComponent"
        className="select"
        name="filters"
        value={value || { label: "Edit columns", value: "columnValues" }}
        removeSelected={false}
        components={{
          Option: optionComponent,
        }}
        includeCheckbox={includeCheckbox}
        closeMenuOnSelect={false}
        options={optionsWithSelectAll}
        closeColumnFilter={closeColumnFilter}
        menuIsOpen={columnFilterOpen}
      />
    </Box>
  );
};

export default SelectComponent;
