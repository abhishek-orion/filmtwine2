import React from "react";
import {
  Box,
  Flex,
  VStack,
  Text,
  HStack,
  Select,
  Button,
} from "@chakra-ui/react";
import { useFilmViewContext } from "../../context/FilmViewContext";
import SelectComponent from "../../components/SelectComponent";
import {
  ColumnOptions,
  SortColumnOptions,
} from "../../constants/tableConstants";
import EditColumnOption from "./EditColumnOption";
import SortColumnOption from "./SortColumnOption";
import { CloseIcon } from "@chakra-ui/icons";
import FilmListTable from "./FilmListTable";

const TableActions = ({ data }) => {
  const { onSortOrderChange, sortingData, onSortFieldChange } =
    useFilmViewContext();
  const [columnFilterOpen, setColumnFilterOpen] = React.useState(false);
  const [sortSelectOpen, setSortSelectOpen] = React.useState(false);
  const openColumnFilter = () => {
    setColumnFilterOpen(true);
  };
  const closeColumnFilter = () => {
    setColumnFilterOpen(false);
  };

  const openSortSelect = () => {
    setSortSelectOpen(true);
  };
  const closeSortSelect = () => {
    setSortSelectOpen(false);
  };

  const onAscClick = () => {
    onSortOrderChange("ASC");
  };
  const onDescClick = () => {
    onSortOrderChange("DESC");
  };
  const clearSortingData = () => {
    onSortOrderChange(null);
    onSortFieldChange(null);
  };
  return (
    <VStack w="100%" p={4} marginTop="0px">
      <Flex w="100%" p={2}>
        <Text fontWeight={800} fontSize="20px" textColor="black" isTruncated>
          Film Submissions
        </Text>
      </Flex>
      <Flex
        id="flex"
        w="100%"
        p={2}
        justifyContent={{
          base: "start",
          sm: "start",
          md: "space-between",
          lg: "space-between",
        }}
        alignItems={{ base: "start", sm: "start", md: "center", lg: "center" }}
        flexDirection={{ base: "column", sm: "column", md: "row", lg: "row" }}
      >
        <HStack
          spacing={2}
          w={{ base: "100%", sm: "100%", md: "25%", lg: "25%" }}
          p={2}
          justifyContent={{
            base: "start",
            sm: "start",
            md: "space-between",
            lg: "space-between",
          }}
          alignItems="center"
        >
          <Select w="160px">
            <option>
              <Text fontSize="14px" isTruncated>
                Last 30 Days
              </Text>
            </option>
          </Select>
          <Button bg="#FF6C61" color="white">
            <Text>Modify Filters</Text>
          </Button>
        </HStack>
        <Flex
          w={{ base: "100%", sm: "100%", md: "60%", lg: "60%" }}
          p={2}
          justifyContent={{
            base: "space-evenly",
            sm: "space-evenly",
            md: "right",
            lg: "right",
          }}
          alignItems="center"
        >
          <SelectComponent
            openColumnFilter={openColumnFilter}
            options={ColumnOptions}
            optionComponent={EditColumnOption}
            closeColumnFilter={closeColumnFilter}
            includeSelectAll
            includeCheckbox
            columnFilterOpen={columnFilterOpen}
          />
          <Text p={2} isTruncated>
            Sort By
          </Text>
          <SelectComponent
            value={sortingData.field}
            openColumnFilter={openSortSelect}
            options={SortColumnOptions}
            optionComponent={SortColumnOption}
            closeColumnFilter={closeSortSelect}
            columnFilterOpen={sortSelectOpen}
          />
          <Button
            variant="link"
            onClick={onAscClick}
            color={sortingData.order === "ASC" ? "#FF6C61" : null}
            margin={2}
          >
            <Text fontSize="14px">ASC</Text>
          </Button>
          <Button
            variant="link"
            onClick={onDescClick}
            color={sortingData.order === "DESC" ? "#FF6C61" : null}
            margin={2}
          >
            <Text fontSize="14px">DESC</Text>
          </Button>
          <Button variant="ghost" onClick={clearSortingData}>
            <CloseIcon w={2} h={2} />
          </Button>
        </Flex>
      </Flex>
      <Box w="100%" bg="#FFFFFF" p={2}>
        <FilmListTable data={data} />
      </Box>
    </VStack>
  );
};

export default TableActions;
